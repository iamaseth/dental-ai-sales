import { z } from "zod";

export const DentalKnowledgeCategory = z.enum([
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
]);

export const ExtractedKnowledgeFact = z.object({
  category: DentalKnowledgeCategory,
  key: z.string().min(1).max(160),
  value_text: z.string().min(1).max(8000),
  source_url: z.string().url(),
  source_excerpt: z.string().max(1200).optional(),
  confidence: z.number().min(0).max(1).optional(),
  evidence_type: z.enum(["observed", "inferred"]).default("observed"),
});

export const FirecrawlKnowledgePayload = z.object({
  facts: z.array(ExtractedKnowledgeFact).max(500),
});

export type ExtractedKnowledgeFact = z.infer<typeof ExtractedKnowledgeFact>;

/**
 * Extraction contract for the Firecrawl worker.
 * Facts are evidence, not approved answers. All imported facts enter needs_review.
 */
export const dentalKnowledgeExtractionPrompt = `
Extract factual information about this dental practice for a verified patient-facing knowledge base.

Rules:
- Use ONLY information directly supported by the supplied website pages.
- Never invent prices, insurance acceptance, provider credentials, office hours, availability, medical advice, or policies.
- Do not infer appointment availability.
- Keep one atomic fact per item.
- Preserve the exact page URL supporting every fact.
- Include a short supporting excerpt when available.
- Mark evidence_type=observed when explicitly stated. Use inferred only when a harmless structural inference is unavoidable; inferred facts will never be auto-approved.
- Do not turn general educational dental content into practice-specific policy.
- Emergency/triage content is informational evidence only and requires separate safety review.
- Return only the requested structured data.
`;

export function normalizeKnowledgeKey(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 160);
}

export function normalizeFact(fact: ExtractedKnowledgeFact): ExtractedKnowledgeFact {
  return {
    ...fact,
    key: normalizeKnowledgeKey(fact.key),
    value_text: fact.value_text.trim(),
    source_excerpt: fact.source_excerpt?.trim(),
  };
}

export function factIdentity(fact: ExtractedKnowledgeFact) {
  return `${fact.category}:${normalizeKnowledgeKey(fact.key)}`;
}

export function dedupeFacts(facts: ExtractedKnowledgeFact[]) {
  const seen = new Map<string, ExtractedKnowledgeFact>();
  for (const raw of facts) {
    const fact = normalizeFact(raw);
    const identity = `${factIdentity(fact)}:${fact.value_text.toLowerCase()}`;
    if (!seen.has(identity)) seen.set(identity, fact);
  }
  return [...seen.values()];
}

export function classifyFactChange(
  existing: { category: string; key: string; value_text: string } | undefined,
  incoming: ExtractedKnowledgeFact,
) {
  if (!existing) return "new" as const;
  return existing.value_text.trim() === incoming.value_text.trim() ? "unchanged" as const : "changed" as const;
}
