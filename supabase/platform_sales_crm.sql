-- Platform Sales CRM blueprint
-- Separate from tenant/patient operational data. Apply through a reviewed migration.
-- KISS v1: no paid AI APIs required; supports copy/paste research and CSV/local-tool imports.

create type public.prospect_stage as enum ('new','researching','qualified','email_queue','contacted','replied','demo','proposal','won','lost');
create type public.research_source as enum ('chatgpt','perplexity','google_maps','opendirectories','dataforge','csv','manual','other');
create type public.email_queue_status as enum ('draft','queued','sending','sent','failed','cancelled','suppressed');

create table public.platform_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'sales' check (role in ('owner','admin','sales','viewer')),
  created_at timestamptz not null default now()
);

create or replace function public.is_platform_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.platform_admins a where a.user_id = (select auth.uid())) $$;

create table public.platform_prospects (
  id uuid primary key default gen_random_uuid(),
  practice_name text not null,
  website text,
  domain text,
  phone text,
  email text,
  address text,
  city text,
  state text,
  postal_code text,
  google_rating numeric(2,1),
  google_reviews integer,
  stage public.prospect_stage not null default 'new',
  source public.research_source not null default 'manual',
  source_url text,
  source_reference text,
  verification_status text not null default 'unverified' check (verification_status in ('unverified','needs_review','verified','rejected')),
  chatbot_present boolean,
  online_booking_present boolean,
  website_score smallint check (website_score between 0 and 100),
  seo_geo_score smallint check (seo_geo_score between 0 and 100),
  opportunity_score smallint check (opportunity_score between 0 and 100),
  notes text,
  next_follow_up_at timestamptz,
  assigned_user_id uuid references auth.users(id) on delete set null,
  won_tenant_id uuid references public.clinics(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index platform_prospects_domain_unique on public.platform_prospects(lower(domain)) where domain is not null;
create index platform_prospects_stage_idx on public.platform_prospects(stage, created_at desc);
create index platform_prospects_followup_idx on public.platform_prospects(next_follow_up_at) where next_follow_up_at is not null;

create table public.platform_contacts (
  id uuid primary key default gen_random_uuid(),
  prospect_id uuid not null references public.platform_prospects(id) on delete cascade,
  name text,
  title text,
  email text,
  phone text,
  is_primary boolean not null default false,
  verification_status text not null default 'unverified' check (verification_status in ('unverified','needs_review','verified','rejected')),
  source public.research_source not null default 'manual',
  source_url text,
  created_at timestamptz not null default now()
);

create table public.platform_sales_activities (
  id uuid primary key default gen_random_uuid(),
  prospect_id uuid not null references public.platform_prospects(id) on delete cascade,
  contact_id uuid references public.platform_contacts(id) on delete set null,
  actor_user_id uuid references auth.users(id) on delete set null,
  activity_type text not null check (activity_type in ('note','email','call','reply','status_change','demo','proposal','import','research')),
  summary text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.platform_campaigns (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  subject_template text,
  body_template text,
  status text not null default 'draft' check (status in ('draft','active','paused','completed','cancelled')),
  send_interval_seconds integer not null default 60 check (send_interval_seconds >= 60),
  daily_limit integer check (daily_limit is null or daily_limit > 0),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.platform_campaign_recipients (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.platform_campaigns(id) on delete cascade,
  prospect_id uuid not null references public.platform_prospects(id) on delete cascade,
  contact_id uuid references public.platform_contacts(id) on delete set null,
  email text not null,
  created_at timestamptz not null default now(),
  unique(campaign_id, prospect_id, email)
);

create table public.platform_email_queue (
  id uuid primary key default gen_random_uuid(),
  campaign_recipient_id uuid not null unique references public.platform_campaign_recipients(id) on delete cascade,
  status public.email_queue_status not null default 'draft',
  scheduled_for timestamptz,
  locked_at timestamptz,
  sent_at timestamptz,
  attempt_count integer not null default 0,
  last_error text,
  provider_message_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index platform_email_queue_ready_idx on public.platform_email_queue(status, scheduled_for);

create table public.platform_email_events (
  id uuid primary key default gen_random_uuid(),
  queue_id uuid references public.platform_email_queue(id) on delete set null,
  event_type text not null check (event_type in ('queued','sent','delivered','replied','bounced','failed','unsubscribed','suppressed')),
  provider_event_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.platform_suppressions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  normalized_email text generated always as (lower(trim(email))) stored,
  reason text not null check (reason in ('unsubscribe','bounce','manual','complaint','invalid')),
  source text,
  created_at timestamptz not null default now(),
  unique(normalized_email)
);

create table public.platform_outbound_settings (
  singleton boolean primary key default true check (singleton),
  outbound_enabled boolean not null default false,
  send_interval_seconds integer not null default 60 check (send_interval_seconds >= 60),
  daily_limit integer,
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now()
);
insert into public.platform_outbound_settings(singleton, outbound_enabled, send_interval_seconds) values (true,false,60);

-- Raw import staging allows ChatGPT/Perplexity JSON and local/CSV tools to share one importer.
create table public.platform_import_batches (
  id uuid primary key default gen_random_uuid(),
  source public.research_source not null,
  label text,
  raw_payload jsonb,
  imported_by uuid references auth.users(id) on delete set null,
  total_rows integer not null default 0,
  new_rows integer not null default 0,
  duplicate_rows integer not null default 0,
  rejected_rows integer not null default 0,
  created_at timestamptz not null default now()
);

-- Platform CRM is intentionally inaccessible to tenant clinic members.
alter table public.platform_admins enable row level security;
alter table public.platform_prospects enable row level security;
alter table public.platform_contacts enable row level security;
alter table public.platform_sales_activities enable row level security;
alter table public.platform_campaigns enable row level security;
alter table public.platform_campaign_recipients enable row level security;
alter table public.platform_email_queue enable row level security;
alter table public.platform_email_events enable row level security;
alter table public.platform_suppressions enable row level security;
alter table public.platform_outbound_settings enable row level security;
alter table public.platform_import_batches enable row level security;

create policy "platform admins read admins" on public.platform_admins for select to authenticated using (public.is_platform_admin());
create policy "platform admins manage prospects" on public.platform_prospects for all to authenticated using (public.is_platform_admin()) with check (public.is_platform_admin());
create policy "platform admins manage contacts" on public.platform_contacts for all to authenticated using (public.is_platform_admin()) with check (public.is_platform_admin());
create policy "platform admins manage activities" on public.platform_sales_activities for all to authenticated using (public.is_platform_admin()) with check (public.is_platform_admin());
create policy "platform admins manage campaigns" on public.platform_campaigns for all to authenticated using (public.is_platform_admin()) with check (public.is_platform_admin());
create policy "platform admins manage recipients" on public.platform_campaign_recipients for all to authenticated using (public.is_platform_admin()) with check (public.is_platform_admin());
create policy "platform admins manage email queue" on public.platform_email_queue for all to authenticated using (public.is_platform_admin()) with check (public.is_platform_admin());
create policy "platform admins manage email events" on public.platform_email_events for all to authenticated using (public.is_platform_admin()) with check (public.is_platform_admin());
create policy "platform admins manage suppressions" on public.platform_suppressions for all to authenticated using (public.is_platform_admin()) with check (public.is_platform_admin());
create policy "platform admins manage outbound settings" on public.platform_outbound_settings for all to authenticated using (public.is_platform_admin()) with check (public.is_platform_admin());
create policy "platform admins manage imports" on public.platform_import_batches for all to authenticated using (public.is_platform_admin()) with check (public.is_platform_admin());

-- Sending must happen in a trusted server worker, never directly from the browser.
-- Worker requirements: honor outbound_enabled, >=60s spacing, daily limit, campaign pause,
-- suppression list, idempotent recipient key, and atomic queue locking before provider send.
