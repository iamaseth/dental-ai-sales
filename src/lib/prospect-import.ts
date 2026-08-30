import { z } from "zod";

export const prospectImportSchema = z.object({
  practice_name: z.string().trim().min(1),
  website: z.string().trim().nullable().optional(),
  domain: z.string().trim().nullable().optional(),
  phone: z.string().trim().nullable().optional(),
  email: z.string().trim().nullable().optional(),
  address: z.string().trim().nullable().optional(),
  city: z.string().trim().nullable().optional(),
  state: z.string().trim().nullable().optional(),
  postal_code: z.string().trim().nullable().optional(),
  google_rating: z.number().min(0).max(5).nullable().optional(),
  google_reviews: z.number().int().min(0).nullable().optional(),
  contact_name: z.string().trim().nullable().optional(),
  contact_title: z.string().trim().nullable().optional(),
  source_url: z.string().trim().nullable().optional(),
  notes: z.string().trim().nullable().optional(),
});

export type ProspectImport = z.infer<typeof prospectImportSchema>;

export function normalizeDomain(input?: string | null) {
  if (!input) return null;
  const raw = input.trim().toLowerCase();
  try {
    const url = new URL(raw.startsWith("http") ? raw : `https://${raw}`);
    return url.hostname.replace(/^www\./, "");
  } catch {
    return raw.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0] || null;
  }
}

export function normalizeEmail(input?: string | null) {
  const value = input?.trim().toLowerCase();
  return value || null;
}

export function parseProspectJson(raw: string) {
  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed)) throw new Error("Expected a JSON array");
  const accepted: ProspectImport[] = [];
  const rejected: { row: number; reason: string }[] = [];
  parsed.forEach((record, index) => {
    const result = prospectImportSchema.safeParse(record);
    if (result.success) accepted.push({ ...result.data, domain: normalizeDomain(result.data.domain || result.data.website), email: normalizeEmail(result.data.email) });
    else rejected.push({ row: index + 1, reason: result.error.issues[0]?.message || "Invalid record" });
  });
  return { accepted, rejected };
}
