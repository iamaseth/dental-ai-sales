# Platform Sales CRM — KISS v1

## Boundary
This CRM belongs to the platform operator. Dental tenants must never see it. LabelleBelle is tenant #1, not the owner of platform prospect data.

## Principle
Automate deterministic work. Avoid paid AI APIs in v1. Use copy/paste only where ChatGPT or Perplexity intelligence is useful. Local/GitHub tools emit the same import contract.

## Discovery paths
1. AI research: CRM generates a structured research prompt -> copy to ChatGPT or Perplexity -> paste returned JSON into CRM -> validate -> preview -> import.
2. Local/open-source discovery: Google Maps scraper or other approved local tool -> CSV/JSON -> CRM importer.
3. Manual entry for edge cases.

Candidates retained for controlled evaluation under AI OS governance:
- gosom/google-maps-scraper — primary local discovery candidate.
- Nuclear-Marmalade/dataforge — later enrichment candidate.
- BigJai/opendirectories-mcp — secondary discovery/verification candidate.
- Mahanaicoach/google-maps-scraper-kit — research/reference; likely redundant.
- asiifdev/business-leads-ai-automation — research/reference for scoring/outreach UX.
- zubair-trabzada/geo-seo-claude — downstream website/GEO cross-check, not lead discovery authority.

Do not treat third-party marketing claims as verified facts. Re-verify before adoption and preserve source provenance.

## Standard prospect import contract
```json
{
  "practice_name": "Example Dental",
  "website": "https://example.com",
  "domain": "example.com",
  "phone": "+1...",
  "email": "office@example.com",
  "address": "...",
  "city": "...",
  "state": "...",
  "postal_code": "...",
  "google_rating": 4.8,
  "google_reviews": 120,
  "contact_name": "...",
  "contact_title": "...",
  "source": "chatgpt|perplexity|google_maps|opendirectories|dataforge|csv|manual|other",
  "source_url": "...",
  "notes": "..."
}
```

## Pipeline
New -> Researching -> Qualified -> Email Queue -> Contacted -> Replied -> Demo -> Proposal -> Won / Lost

## Import rules
- Normalize domain, email and phone before matching.
- Domain is the strongest v1 practice duplicate key when present.
- Never silently upgrade inferred data to verified.
- Preview new/duplicate/rejected/missing-contact counts before committing an import.
- Preserve batch/source provenance.

## Qualification
Keep scores explainable. Store observations separately from inference. Useful signals include website/mobile quality, online booking, chatbot/front desk availability, conversion path, SEO/local/GEO opportunity, contactability and practice fit. Do not invent performance metrics.

## Email campaign safety
- Default outbound is OFF.
- Queue sends; browser never loops over recipients.
- Minimum interval is 60 seconds (1/minute).
- Configurable daily cap.
- Pause/resume campaign.
- Global outbound kill switch.
- Suppression list for unsubscribe, bounce, complaint, invalid and manual blocks.
- Unique campaign/prospect/email recipient key prevents duplicate campaign sends.
- Atomic worker lock before send.
- Immutable-ish event trail for queued/sent/delivered/replied/bounced/failed/unsubscribed/suppressed.
- Outreach permission is separate from discovery/qualification.

## Build sequence
1. Review/apply `supabase/platform_sales_crm.sql` as a migration.
2. Seed the first platform owner/admin only after the authenticated user ID is known.
3. Build admin-only Prospect list/detail and pipeline views.
4. Build Copy ChatGPT Prompt / Copy Perplexity Prompt and paste JSON validation/import preview.
5. Build CSV/JSON importer for local discovery tools.
6. Build campaign editor + recipient selection + queue preview.
7. Connect an approved email provider only after credentials/permissions are intentionally configured.
8. Implement trusted queue worker with 60-second minimum interval and safety controls.
9. Test tenant isolation, dedupe, suppression, idempotency and kill switch before any real campaign.

## Change-control
GitHub is the implementation path. Connected Lovable sync should receive commits from GitHub. Do not use Lovable AI credits for this workflow unless explicitly approved first.
