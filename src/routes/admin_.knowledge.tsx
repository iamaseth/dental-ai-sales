import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Database, RefreshCw, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/knowledge")({
  head: () => ({ meta: [{ title: "Practice Knowledge · Dental AI" }] }),
  component: KnowledgeAdmin,
});

const TENANT_ID = "ac096728-fde5-46b3-b2f1-c9c09d5c9fbe";
const SOURCE_ID = "8549d40e-f6f3-44d2-97cc-d3559c9000ef";
const db = () => supabase as any;

type Run = {
  id: string;
  status: string;
  pages_seen: number;
  items_extracted: number;
  items_changed: number;
  conflicts_found: number;
  error_text: string | null;
  created_at: string;
};

type KnowledgeItem = {
  id: string;
  category: string;
  key: string;
  value_text: string;
  verification_status: string;
  evidence_type: string;
  source_url: string | null;
};

function KnowledgeAdmin() {
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState("");
  const [runs, setRuns] = useState<Run[]>([]);
  const [items, setItems] = useState<KnowledgeItem[]>([]);

  async function refresh() {
    const [{ data: runRows, error: runError }, { data: itemRows, error: itemError }] = await Promise.all([
      db().from("practice_ingestion_runs").select("id,status,pages_seen,items_extracted,items_changed,conflicts_found,error_text,created_at").eq("tenant_id", TENANT_ID).order("created_at", { ascending: false }).limit(10),
      db().from("practice_knowledge_items").select("id,category,key,value_text,verification_status,evidence_type,source_url").eq("tenant_id", TENANT_ID).order("created_at", { ascending: false }).limit(200),
    ]);
    if (runError) setMessage(runError.message);
    else if (itemError) setMessage(itemError.message);
    setRuns((runRows ?? []) as Run[]);
    setItems((itemRows ?? []) as KnowledgeItem[]);
  }

  useEffect(() => { void refresh(); }, []);

  async function runIngestion() {
    setRunning(true);
    setMessage("Starting Firecrawl review-only ingestion…");
    try {
      const { data, error } = await supabase.functions.invoke("ingest-practice", {
        body: { tenant_id: TENANT_ID, source_id: SOURCE_ID },
      });
      if (error) throw error;
      setMessage(data?.message ?? `Completed. ${data?.candidates_added ?? 0} candidates added for review.`);
      await refresh();
    } catch (error: any) {
      setMessage(error?.message ?? "Ingestion failed. Check Edge Function logs and the Firecrawl secret.");
      await refresh();
    } finally {
      setRunning(false);
    }
  }

  const reviewCount = items.filter((item) => item.verification_status === "needs_review").length;
  const verifiedCount = items.filter((item) => item.verification_status === "verified").length;

  return (
    <main className="min-h-screen bg-[#f4f7f6] text-[#123f3b]">
      <header className="border-b bg-white">
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <div>
            <strong className="text-lg">Dental AI · Practice Knowledge</strong>
            <small className="block text-[#607772]">LaBelle Dental Clinic · review-only ingestion</small>
          </div>
          <Link to="/admin" className="text-sm font-semibold text-[#1686d9]">Back to CRM</Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-8">
        {message && <div role="status" className="mb-5 rounded-xl border bg-white px-4 py-3 text-sm">{message}</div>}

        <div className="grid gap-4 sm:grid-cols-3">
          <Metric label="Needs review" value={reviewCount} />
          <Metric label="Verified" value={verifiedCount} />
          <Metric label="Recent runs" value={runs.length} />
        </div>

        <div className="mt-6 rounded-2xl bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <Database className="mb-3" />
              <h1 className="text-xl font-bold">Firecrawl website ingestion</h1>
              <p className="mt-1 max-w-2xl text-sm text-[#607772]">Source: https://www.cambodiadentist.com/. Extracted facts are inserted as needs_review only. Nothing is automatically trusted by the patient chatbot.</p>
            </div>
            <button disabled={running} onClick={() => void runIngestion()} className="rounded-xl bg-[#123f3b] px-4 py-3 text-sm font-bold text-white disabled:opacity-50">
              <RefreshCw className={`mr-2 inline h-4 w-4 ${running ? "animate-spin" : ""}`} />
              {running ? "Running…" : "Run review-only crawl"}
            </button>
          </div>
          <div className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">
            <ShieldCheck className="h-5 w-5 shrink-0" />
            Verification gate is active: only verified, current knowledge may be used as authoritative patient information.
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl bg-white">
          <div className="border-b p-5"><h2 className="font-bold">Latest ingestion runs</h2></div>
          {runs.length === 0 ? <div className="p-8 text-sm text-[#607772]">No ingestion run yet.</div> : (
            <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-[#f4f7f6] text-xs uppercase text-[#607772]"><tr><th className="p-3">Status</th><th>Pages</th><th>Facts</th><th>Changed</th><th>Conflicts</th><th>Error</th></tr></thead><tbody>{runs.map((run) => <tr key={run.id} className="border-t"><td className="p-3 font-semibold">{run.status}</td><td>{run.pages_seen}</td><td>{run.items_extracted}</td><td>{run.items_changed}</td><td>{run.conflicts_found}</td><td className="max-w-xs truncate pr-3 text-red-700">{run.error_text ?? "—"}</td></tr>)}</tbody></table></div>
          )}
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl bg-white">
          <div className="border-b p-5"><h2 className="font-bold">Knowledge review queue</h2><p className="text-sm text-[#607772]">Approval controls come next; this page currently exposes the candidates and provenance.</p></div>
          {items.length === 0 ? <div className="p-8 text-sm text-[#607772]">Run the first crawl to populate the review queue.</div> : (
            <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-[#f4f7f6] text-xs uppercase text-[#607772]"><tr><th className="p-3">Category</th><th>Key</th><th>Value</th><th>Status</th><th>Evidence</th><th>Source</th></tr></thead><tbody>{items.map((item) => <tr key={item.id} className="border-t align-top"><td className="p-3 font-semibold">{item.category}</td><td>{item.key}</td><td className="max-w-md p-3">{item.value_text}</td><td>{item.verification_status}</td><td>{item.evidence_type}</td><td className="pr-3">{item.source_url ? <a className="text-[#1686d9] underline" href={item.source_url} target="_blank" rel="noreferrer">source</a> : "—"}</td></tr>)}</tbody></table></div>
          )}
        </div>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="rounded-2xl bg-white p-5"><small className="text-[#607772]">{label}</small><strong className="mt-1 block text-3xl">{value}</strong></div>;
}
