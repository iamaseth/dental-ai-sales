import { createClient } from "npm:@supabase/supabase-js@2";

const FIRECRAWL_API = "https://api.firecrawl.dev/v2";
const MAX_PAGES = 20;
const POLL_DELAY_MS = 1500;
const MAX_POLLS = 40;

const categories = [
  "practice",
  "location",
  "hours",
  "provider",
  "service",
  "insurance",
  "pricing",
  "policy",
  "appointment",
  "preparation",
  "emergency_guidance",
  "contact",
  "faq",
] as const;

const extractionPrompt = `Extract factual information about this dental practice for a patient-facing knowledge review queue.
Use only information explicitly supported by this page. Never invent prices, insurance acceptance, provider credentials, office hours, appointment availability, medical advice, or policies. Keep one atomic fact per item. Do not turn general educational content into practice-specific policy. Emergency guidance is evidence only and requires separate safety review. Return concise facts with a short supporting excerpt where possible.`;

const extractionSchema = {
  type: "object",
  properties: {
    facts: {
      type: "array",
      maxItems: 100,
      items: {
        type: "object",
        properties: {
          category: { type: "string", enum: categories },
          key: { type: "string" },
          value_text: { type: "string" },
          source_excerpt: { type: "string" },
          confidence: { type: "number", minimum: 0, maximum: 1 },
          evidence_type: { type: "string", enum: ["observed", "inferred"] },
        },
        required: ["category", "key", "value_text"],
      },
    },
  },
  required: ["facts"],
};

type Fact = {
  category: string;
  key: string;
  value_text: string;
  source_excerpt?: string;
  confidence?: number;
  evidence_type?: "observed" | "inferred";
  source_url: string;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function normalizeKey(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 160);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function firecrawl(path: string, apiKey: string, init?: RequestInit) {
  const response = await fetch(`${FIRECRAWL_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`Firecrawl ${response.status}: ${body?.error ?? body?.message ?? "request failed"}`);
  }
  return body;
}

async function waitForCrawl(jobId: string, apiKey: string) {
  for (let attempt = 0; attempt < MAX_POLLS; attempt++) {
    const result = await firecrawl(`/crawl/${jobId}`, apiKey, { method: "GET" });
    if (result.status === "completed") return result;
    if (result.status === "failed" || result.status === "cancelled") {
      throw new Error(`Firecrawl crawl ${result.status}: ${result.error ?? "unknown error"}`);
    }
    await sleep(POLL_DELAY_MS);
  }
  throw new Error("Firecrawl crawl timed out while waiting for completion");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405, headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const firecrawlKey = Deno.env.get("FIRECRAWL_API_KEY");
  const authorization = req.headers.get("Authorization");

  if (!supabaseUrl || !anonKey || !serviceRoleKey || !firecrawlKey) {
    return Response.json({ error: "Server configuration is incomplete" }, { status: 500, headers: corsHeaders });
  }
  if (!authorization) {
    return Response.json({ error: "Authentication required" }, { status: 401, headers: corsHeaders });
  }

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authorization } },
    auth: { persistSession: false },
  });
  const { data: authData, error: authError } = await userClient.auth.getUser();
  if (authError || !authData.user) {
    return Response.json({ error: "Invalid session" }, { status: 401, headers: corsHeaders });
  }

  // Temporary internal-only authorization boundary. Replace with platform_admins before tenant rollout.
  const db = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });

  let runId: string | null = null;
  let sourceId: string | null = null;
  try {
    const body = await req.json();
    const tenantId = String(body?.tenant_id ?? "");
    sourceId = body?.source_id ? String(body.source_id) : null;
    const requestedUrl = body?.source_url ? String(body.source_url) : null;

    if (!tenantId || (!sourceId && !requestedUrl)) {
      return Response.json({ error: "tenant_id and source_id or source_url are required" }, { status: 400, headers: corsHeaders });
    }

    let source: any = null;
    if (sourceId) {
      const { data, error } = await db
        .from("practice_sources")
        .select("id,tenant_id,source_url,status")
        .eq("id", sourceId)
        .eq("tenant_id", tenantId)
        .single();
      if (error || !data) throw new Error("Practice source was not found for this tenant");
      source = data;
    } else {
      const { data, error } = await db
        .from("practice_sources")
        .insert({ tenant_id: tenantId, source_type: "website", source_url: requestedUrl, title: requestedUrl, status: "active", fetch_status: "queued" })
        .select("id,tenant_id,source_url,status")
        .single();
      if (error) throw error;
      source = data;
      sourceId = source.id;
    }

    if (source.status !== "active" || !source.source_url) throw new Error("Practice source is not active or has no URL");

    const { data: run, error: runError } = await db
      .from("practice_ingestion_runs")
      .insert({ tenant_id: tenantId, source_id: source.id, status: "running", provider: "firecrawl", started_at: new Date().toISOString(), metadata: { mode: "review_only", requested_by: authData.user.id } })
      .select("id")
      .single();
    if (runError) throw runError;
    runId = run.id;

    await db.from("practice_sources").update({ fetch_status: "running", last_error: null, updated_at: new Date().toISOString() }).eq("id", source.id);

    const crawlStart = await firecrawl("/crawl", firecrawlKey, {
      method: "POST",
      body: JSON.stringify({
        url: source.source_url,
        limit: MAX_PAGES,
        maxDiscoveryDepth: 3,
        crawlEntireDomain: false,
        allowExternalLinks: false,
        allowSubdomains: false,
        ignoreRobotsTxt: false,
        scrapeOptions: {
          formats: [
            {
              type: "json",
              schema: extractionSchema,
              prompt: extractionPrompt,
            },
          ],
          onlyMainContent: true,
          blockAds: true,
          removeBase64Images: true,
          timeout: 60000,
        },
        zeroDataRetention: true,
      }),
    });

    const jobId = crawlStart.id;
    if (!jobId) throw new Error("Firecrawl did not return a crawl job id");
    await db.from("practice_ingestion_runs").update({ provider_job_id: jobId }).eq("id", runId);

    const crawl = await waitForCrawl(jobId, firecrawlKey);
    const pages: any[] = Array.isArray(crawl.data) ? crawl.data : [];
    const facts: Fact[] = [];
    const seen = new Set<string>();

    for (const page of pages) {
      const pageUrl = page?.metadata?.sourceURL ?? page?.metadata?.url ?? source.source_url;
      const pageFacts = Array.isArray(page?.json?.facts) ? page.json.facts : [];
      for (const raw of pageFacts) {
        if (!raw?.category || !categories.includes(raw.category) || !raw?.key || !raw?.value_text) continue;
        const fact: Fact = {
          category: raw.category,
          key: normalizeKey(String(raw.key)),
          value_text: String(raw.value_text).trim(),
          source_excerpt: raw.source_excerpt ? String(raw.source_excerpt).slice(0, 1200) : undefined,
          confidence: typeof raw.confidence === "number" ? Math.max(0, Math.min(1, raw.confidence)) : undefined,
          evidence_type: raw.evidence_type === "inferred" ? "inferred" : "observed",
          source_url: String(pageUrl),
        };
        if (!fact.key || !fact.value_text) continue;
        const identity = `${fact.category}:${fact.key}:${fact.value_text.toLowerCase()}`;
        if (!seen.has(identity)) {
          seen.add(identity);
          facts.push(fact);
        }
      }
    }

    const { data: existing, error: existingError } = await db
      .from("practice_knowledge_items")
      .select("id,category,key,value_text,verification_status,valid_to")
      .eq("tenant_id", tenantId)
      .is("valid_to", null);
    if (existingError) throw existingError;

    let inserted = 0;
    let changed = 0;
    let conflicts = 0;
    let unchanged = 0;

    for (const fact of facts) {
      const sameKey = (existing ?? []).filter((item: any) => item.category === fact.category && item.key === fact.key);
      if (sameKey.some((item: any) => item.value_text.trim() === fact.value_text)) {
        unchanged++;
        continue;
      }

      const { data: candidate, error: candidateError } = await db
        .from("practice_knowledge_items")
        .insert({
          tenant_id: tenantId,
          source_id: source.id,
          category: fact.category,
          key: fact.key,
          value_text: fact.value_text,
          verification_status: "needs_review",
          evidence_type: fact.evidence_type ?? "observed",
          source_url: fact.source_url,
          source_excerpt: fact.source_excerpt ?? null,
          confidence: fact.confidence ?? null,
        })
        .select("id")
        .single();
      if (candidateError) throw candidateError;
      inserted++;

      await db.from("practice_knowledge_versions").insert({
        knowledge_item_id: candidate.id,
        tenant_id: tenantId,
        value_text: fact.value_text,
        source_url: fact.source_url,
        source_excerpt: fact.source_excerpt ?? null,
        evidence_type: fact.evidence_type ?? "observed",
        change_type: "created",
        created_by: authData.user.id,
      });

      const verified = sameKey.find((item: any) => item.verification_status === "verified");
      if (verified) {
        changed++;
        const { error: conflictError } = await db.from("practice_knowledge_conflicts").insert({
          tenant_id: tenantId,
          knowledge_key: `${fact.category}:${fact.key}`,
          first_item_id: verified.id,
          second_item_id: candidate.id,
          status: "open",
        });
        if (conflictError) throw conflictError;
        conflicts++;
      }
    }

    const completedAt = new Date().toISOString();
    await db.from("practice_ingestion_runs").update({
      status: "completed",
      completed_at: completedAt,
      pages_seen: pages.length,
      items_extracted: facts.length,
      items_changed: changed,
      conflicts_found: conflicts,
      metadata: { mode: "review_only", requested_by: authData.user.id, inserted, unchanged },
    }).eq("id", runId);

    await db.from("practice_sources").update({
      fetch_status: "completed",
      last_fetched_at: completedAt,
      last_changed_at: inserted > 0 ? completedAt : undefined,
      last_error: null,
      raw_metadata: { provider: "firecrawl", job_id: jobId, pages_seen: pages.length, items_extracted: facts.length },
      updated_at: completedAt,
    }).eq("id", source.id);

    return Response.json({
      ok: true,
      review_only: true,
      run_id: runId,
      source_id: source.id,
      firecrawl_job_id: jobId,
      pages_seen: pages.length,
      facts_extracted: facts.length,
      candidates_added: inserted,
      unchanged,
      changed,
      conflicts,
      message: "No extracted fact was auto-verified. Review is required before patient-facing use.",
    }, { headers: corsHeaders });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (runId) {
      const dbUrl = Deno.env.get("SUPABASE_URL")!;
      const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const db = createClient(dbUrl, serviceRoleKey, { auth: { persistSession: false } });
      await db.from("practice_ingestion_runs").update({ status: "failed", completed_at: new Date().toISOString(), error_text: message }).eq("id", runId);
      if (sourceId) await db.from("practice_sources").update({ fetch_status: "failed", last_error: message, updated_at: new Date().toISOString() }).eq("id", sourceId);
    }
    return Response.json({ error: message, run_id: runId }, { status: 500, headers: corsHeaders });
  }
});
