-- Temporary Lovable/Supabase-compatible verified practice knowledge schema.
-- Mirrors the live temporary database so migration later stays straightforward.

create extension if not exists pgcrypto;

create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  status text not null default 'active' check (status in ('active','paused','closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.practice_sources (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  source_type text not null default 'website' check (source_type in ('website','manual','document','api')),
  source_url text,
  title text,
  status text not null default 'active' check (status in ('active','paused','failed')),
  last_fetched_at timestamptz,
  content_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.practice_knowledge_items (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  source_id uuid references public.practice_sources(id) on delete set null,
  category text not null,
  key text not null,
  value_text text not null,
  verification_status text not null default 'needs_review' check (verification_status in ('needs_review','verified','rejected','superseded')),
  evidence_type text not null default 'observed' check (evidence_type in ('observed','inferred','manual')),
  source_url text,
  source_excerpt text,
  confidence numeric(4,3) check (confidence is null or (confidence >= 0 and confidence <= 1)),
  approved_by uuid references auth.users(id) on delete set null,
  approved_at timestamptz,
  valid_from timestamptz not null default now(),
  valid_to timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.practice_knowledge_versions (
  id uuid primary key default gen_random_uuid(),
  knowledge_item_id uuid not null references public.practice_knowledge_items(id) on delete cascade,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  value_text text not null,
  source_url text,
  source_excerpt text,
  evidence_type text not null check (evidence_type in ('observed','inferred','manual')),
  change_type text not null default 'created' check (change_type in ('created','changed','approved','rejected','superseded')),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.practice_knowledge_conflicts (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  knowledge_key text not null,
  first_item_id uuid references public.practice_knowledge_items(id) on delete cascade,
  second_item_id uuid references public.practice_knowledge_items(id) on delete cascade,
  status text not null default 'open' check (status in ('open','resolved','ignored')),
  resolution_note text,
  resolved_by uuid references auth.users(id) on delete set null,
  resolved_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists practice_sources_tenant_idx on public.practice_sources(tenant_id, status);
create index if not exists practice_knowledge_lookup_idx on public.practice_knowledge_items(tenant_id, category, verification_status);
create index if not exists practice_knowledge_versions_item_idx on public.practice_knowledge_versions(knowledge_item_id, created_at desc);
create index if not exists practice_knowledge_conflicts_tenant_idx on public.practice_knowledge_conflicts(tenant_id, status);

alter table public.tenants enable row level security;
alter table public.practice_sources enable row level security;
alter table public.practice_knowledge_items enable row level security;
alter table public.practice_knowledge_versions enable row level security;
alter table public.practice_knowledge_conflicts enable row level security;

-- Temporary KISS policy while only internal authenticated users access the app.
-- Replace with platform-admin + tenant membership policies before tenant rollout.
create policy "authenticated manage tenants" on public.tenants for all to authenticated using (true) with check (true);
create policy "authenticated manage practice sources" on public.practice_sources for all to authenticated using (true) with check (true);
create policy "authenticated manage practice knowledge" on public.practice_knowledge_items for all to authenticated using (true) with check (true);
create policy "authenticated manage knowledge versions" on public.practice_knowledge_versions for all to authenticated using (true) with check (true);
create policy "authenticated manage knowledge conflicts" on public.practice_knowledge_conflicts for all to authenticated using (true) with check (true);
