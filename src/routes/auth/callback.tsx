import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { isPlatformAdmin } from "@/lib/platform-admin";

export const Route = createFileRoute("/auth/callback")({
  head: () => ({
    meta: [
      { title: "Signing you in | Dental AI Platform" },
      { name: "description", content: "Completing sign-in to the Dental AI platform admin CRM." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthCallback,
});

// Public landing spot for the OAuth full-page redirect. Verifies platform
// admin membership, then routes to /admin or signs out unauthorized users.
function AuthCallback() {
  useEffect(() => {
    void (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        window.location.replace("/admin/login");
        return;
      }
      if (await isPlatformAdmin(data.session.user.id)) {
        window.location.replace("/admin");
        return;
      }
      await supabase.auth.signOut();
      window.location.replace("/admin/login?error=unauthorized");
    })();
  }, []);

  return (
    <main className="grid min-h-screen place-items-center bg-[#f4f7f6] px-4 text-[#123f3b]">
      <div className="text-center">
        <span className="mx-auto mb-4 grid size-12 place-items-center rounded-2xl bg-[#123f3b] text-white">
          <ShieldCheck className="size-6" />
        </span>
        <p className="font-semibold">Completing sign-in…</p>
      </div>
    </main>
  );
}