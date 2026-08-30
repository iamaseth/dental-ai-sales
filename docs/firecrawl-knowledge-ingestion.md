# Firecrawl -> Verified Practice Knowledge

## Goal
Ingest a dental practice's public website into the review queue without allowing scraped or AI-extracted content to become patient-facing truth automatically.

## Boundary
Firecrawl is an ingestion provider, not the knowledge authority. `practice_knowledge_items.verification_status = verified` is the authority used by chat/voice.

## Secure runtime
`FIRECRAWL_API_KEY` must be a server-side secret. Never put it in a `VITE_*` variable, browser bundle, Git commit, database row, or client request.

The deployed worker should receive only:
- authenticated platform-admin request
- tenant_id
- source_id / source_url
- refresh mode

## Pipeline
1. Validate authenticated platform-admin permission.
2. Load the active `practice_sources` row and verify it belongs to tenant_id.
3. Create `practice_ingestion_runs` row with status `running`.
4. Fetch/crawl approved public pages through Firecrawl.
5. Use the extraction contract in `src/lib/practice-knowledge-ingestion.ts`.
6. Validate returned JSON with Zod.
7. Normalize keys and deduplicate identical facts.
8. Compare each `(tenant_id, category, key)` with current knowledge.
9. Unchanged fact: record run count; do not create noise.
10. New fact: insert `needs_review` item + version.
11. Changed fact: insert a new `needs_review` candidate and open a conflict against the current verified item. Never overwrite verified truth silently.
12. Missing previously verified fact: do NOT delete it. Flag for human review because a crawl can be incomplete.
13. Finish run with counts and update source fetch/hash metadata.
14. On failure, retain error metadata and leave existing verified knowledge untouched.

## Dental extraction categories
- practice
- location
- hours
- provider
- service
- insurance
- pricing
- policy
- appointment
- preparation
- emergency_guidance
- contact
- faq

## Approval gate
Only a human review action may move a candidate to `verified`. Approval should append `practice_knowledge_versions` and `practice_knowledge_review_events` records.

## Change detection
Do not use an LLM to decide whether two exact normalized values changed. Use deterministic comparison first. Semantic review can later assist a human when wording changes but meaning may be equivalent.

## Chat/voice query rule
Patient-facing retrieval must include:

`tenant_id = active tenant AND verification_status = 'verified' AND valid_to IS NULL`

Never retrieve `needs_review`, `rejected`, `superseded`, or `inferred` content as authoritative patient answers.

## What remains before live Firecrawl execution
1. Add `FIRECRAWL_API_KEY` to the server secret store for the Dental AI Sales deployment.
2. Implement the authenticated server endpoint/worker using the hosting environment supported by the project.
3. Run the first crawl against tenant #1 in dry-run/review mode.
4. Inspect every extracted fact before approving any patient-facing knowledge.

No paid/secret Firecrawl call should be made from the browser.
