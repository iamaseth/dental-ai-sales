# Dental AI implementation plan

## Decision

Keep the existing TanStack patient and sales experiences. Integrate four bounded capabilities instead of importing another full application:

1. **Krispy AI pattern** for website chat, Telegram mirroring and human takeover.
2. **Existing guarded intent engine** for deterministic dental routing and emergency escalation.
3. **Supabase** for multi-clinic CRM data, approved knowledge, appointment requests and auditability.
4. **Cal.com embed/API** only for clients who need live availability; the trial keeps appointment requests.

## Why this combination

Krispy is MIT licensed and its dependency-free widget works without changing our React stack. Its Cloudflare Worker and Durable Object maintain the handoff state, while one Telegram forum topic represents one website visitor. The AI stops once a human replies.

The Supabase starter is useful for schema and RLS patterns, but its complete app shell should not replace our TanStack project. We take only its multi-tenant principles.

Cal.com is a mature scheduling product. Forking or self-hosting the whole repository would create unnecessary operational work; embedding a clinic-owned event type is the efficient paid-tier path.

CopilotKit and RAG remain later options. Neither is needed to validate the LaBelle trial.

## Data boundaries

- Krispy/Cloudflare: live browser session, WebSocket and Telegram handoff state.
- Supabase: clinic accounts, staff membership, CRM records, normalized conversation history, approved answers and appointment requests.
- Cal.com: live availability and external booking identifiers for paid clients.
- Browser: publishable configuration only. Telegram tokens, webhook secrets and Supabase service credentials never use a `VITE_` variable.

## Delivery stages

### Stage 1 — current free trial

- Guarded 57-intent patient Q&A.
- Appointment-request form; no claim of real booking.
- Configure one Krispy tenant for LaBelle.
- Mirror chats into a Telegram supergroup with Topics.
- Human reply pauses the AI.
- Keep the existing local chatbot as fallback until the Worker passes an end-to-end test.

### Stage 2 — CRM foundation

- Create a Supabase project and link it locally.
- Convert `supabase/schema.sql` into a migration using the Supabase CLI.
- Run RLS tests and database advisors before deployment.
- Connect the admin page to clinics, leads, conversations and appointment requests.
- Add authenticated clinic staff; patient visitors still need no login.
- Synchronize Krispy conversation events through a server-side connector.

### Stage 3 — paid scheduling

- Add a per-clinic `booking_provider`.
- Embed the clinic’s Cal.com event type.
- Store only the external booking ID and necessary appointment details.
- Support confirmation, rescheduling and cancellation through server-side tools.
- Fall back to an appointment request whenever the provider is unavailable.

### Stage 4 — richer AI

- Move approved answers into `knowledge_items`.
- Require explicit clinic approval before an answer becomes active.
- Add LLM phrasing around retrieved approved answers, preserving hard emergency rules.
- Add document retrieval only for sufficiently large, clinic-approved knowledge sets.

## Credentials still required

- A Cloudflare account.
- A Telegram bot token from BotFather.
- A Telegram supergroup with Topics and the bot as an administrator.
- A deployed Krispy Worker URL.
- A Supabase project URL and publishable key for Stage 2.
- A clinic-owned Cal.com event link for the paid booking tier.

## Acceptance test for Stage 1

1. A patient opens the LaBelle site without logging in.
2. A website message appears in a unique Telegram topic.
3. The guarded bot answers an approved clinic question.
4. “Talk to a human” marks the conversation for handoff.
5. A staff reply in Telegram appears in the same browser chat.
6. The AI remains silent after takeover.
7. Refreshing or reconnecting retains the session state.
8. No Telegram, Cloudflare or Supabase secret is present in browser source.
