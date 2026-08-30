-- Architecture blueprint only. Apply through a reviewed Supabase migration after a
-- project is linked; do not paste unreviewed SQL into a production project.

create extension if not exists pgcrypto;

create type public.clinic_role as enum ('owner', 'admin', 'agent', 'viewer');
create type public.conversation_status as enum ('ai_active', 'human_requested', 'human_active', 'closed');
create type public.lead_status as enum ('new', 'contacted', 'demo_ready', 'trial', 'client', 'lost');

create table public.clinics (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  name text not null,
  timezone text not null default 'Asia/Phnom_Penh',
  created_at timestamptz not null default now()
);

create table public.clinic_members (
  clinic_id uuid not null references public.clinics(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.clinic_role not null default 'viewer',
  created_at timestamptz not null default now(),
  primary key (clinic_id, user_id)
);

create table public.clinic_settings (
  clinic_id uuid primary key references public.clinics(id) on delete cascade,
  phone text,
  address text,
  booking_provider text check (booking_provider in ('request', 'calcom')),
  booking_url text,
  telegram_topic_prefix text,
  updated_at timestamptz not null default now()
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid references public.clinics(id) on delete set null,
  practice_name text not null,
  contact_name text,
  phone text,
  email text,
  source text,
  status public.lead_status not null default 'new',
  next_action text,
  created_at timestamptz not null default now()
);

create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid not null references public.clinics(id) on delete cascade,
  external_session_id text not null,
  channel text not null check (channel in ('website', 'telegram', 'whatsapp')),
  status public.conversation_status not null default 'ai_active',
  assigned_user_id uuid references auth.users(id) on delete set null,
  patient_name text,
  patient_phone text,
  last_message_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (clinic_id, external_session_id)
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_type text not null check (sender_type in ('patient', 'ai', 'human', 'system')),
  sender_user_id uuid references auth.users(id) on delete set null,
  body text not null check (char_length(body) between 1 and 10000),
  external_message_id text,
  created_at timestamptz not null default now()
);

create table public.appointment_requests (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid not null references public.clinics(id) on delete cascade,
  conversation_id uuid references public.conversations(id) on delete set null,
  patient_name text not null,
  patient_phone text not null,
  reason text not null,
  preferred_at timestamptz,
  status text not null default 'requested' check (status in ('requested', 'confirmed', 'rescheduled', 'cancelled')),
  external_booking_id text,
  created_at timestamptz not null default now()
);

create table public.knowledge_items (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid not null references public.clinics(id) on delete cascade,
  intent_tag text not null,
  question_patterns text[] not null default '{}',
  approved_answer text not null,
  approved_by uuid references auth.users(id) on delete set null,
  approved_at timestamptz,
  active boolean not null default false,
  updated_at timestamptz not null default now(),
  unique (clinic_id, intent_tag)
);

alter table public.clinics enable row level security;
alter table public.clinic_members enable row level security;
alter table public.clinic_settings enable row level security;
alter table public.leads enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.appointment_requests enable row level security;
alter table public.knowledge_items enable row level security;

create policy "members can view their clinics" on public.clinics for select to authenticated
using (exists (select 1 from public.clinic_members m where m.clinic_id = id and m.user_id = (select auth.uid())));

create policy "members can view own membership" on public.clinic_members for select to authenticated
using (user_id = (select auth.uid()));

create policy "members can view clinic settings" on public.clinic_settings for select to authenticated
using (exists (select 1 from public.clinic_members m where m.clinic_id = clinic_id and m.user_id = (select auth.uid())));

create policy "members can view clinic conversations" on public.conversations for select to authenticated
using (exists (select 1 from public.clinic_members m where m.clinic_id = clinic_id and m.user_id = (select auth.uid())));

create policy "agents can update clinic conversations" on public.conversations for update to authenticated
using (exists (select 1 from public.clinic_members m where m.clinic_id = clinic_id and m.user_id = (select auth.uid()) and m.role in ('owner','admin','agent')))
with check (exists (select 1 from public.clinic_members m where m.clinic_id = clinic_id and m.user_id = (select auth.uid()) and m.role in ('owner','admin','agent')));

create policy "members can view conversation messages" on public.messages for select to authenticated
using (exists (select 1 from public.conversations c join public.clinic_members m on m.clinic_id = c.clinic_id where c.id = conversation_id and m.user_id = (select auth.uid())));

create policy "agents can add human messages" on public.messages for insert to authenticated
with check (sender_type = 'human' and sender_user_id = (select auth.uid()) and exists (select 1 from public.conversations c join public.clinic_members m on m.clinic_id = c.clinic_id where c.id = conversation_id and m.user_id = (select auth.uid()) and m.role in ('owner','admin','agent')));

create policy "members can view clinic appointments" on public.appointment_requests for select to authenticated
using (exists (select 1 from public.clinic_members m where m.clinic_id = clinic_id and m.user_id = (select auth.uid())));

create policy "members can view approved knowledge" on public.knowledge_items for select to authenticated
using (exists (select 1 from public.clinic_members m where m.clinic_id = clinic_id and m.user_id = (select auth.uid())));

create policy "admins can manage knowledge" on public.knowledge_items for all to authenticated
using (exists (select 1 from public.clinic_members m where m.clinic_id = clinic_id and m.user_id = (select auth.uid()) and m.role in ('owner','admin')))
with check (exists (select 1 from public.clinic_members m where m.clinic_id = clinic_id and m.user_id = (select auth.uid()) and m.role in ('owner','admin')));

-- Public website and channel webhooks must write through a rate-limited server/Edge
-- Function. No anonymous table-write policies are intentionally created.
