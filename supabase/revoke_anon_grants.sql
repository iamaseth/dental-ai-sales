-- Security hardening: these admin/tenant tables are never intended for anonymous browser access.
-- RLS remains the authorization boundary for authenticated users; explicit grants are removed for anon.

revoke all privileges on table
  public.campaign_recipients,
  public.campaigns,
  public.email_queue,
  public.import_batches,
  public.outbound_settings,
  public.platform_admins,
  public.practice_ingestion_runs,
  public.practice_knowledge_conflicts,
  public.practice_knowledge_items,
  public.practice_knowledge_reviews,
  public.practice_knowledge_versions,
  public.practice_sources,
  public.prospects,
  public.suppressions,
  public.tenants
from anon;
