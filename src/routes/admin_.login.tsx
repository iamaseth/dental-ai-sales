import { createFileRoute } from "@tanstack/react-router";
import { FormEvent, useEffect, useState } from "react";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin_/login")({
  head: () => ({ meta: [{ title: "Platform Admin Login | Dental AI" }] }),
  component: AdminLogin,
});

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) return;
      const { data: membership } = await (supabase as any)
        .from("platform_admins")
        .select("user_id")
        .eq("user_id", data.session.user.id)
        .maybeSingle();
      if (membership) window.location.replace("/admin");
    })();
  }, []);

  async function login(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) {
      setMessage(error?.message || "Unable to sign in.");
      setLoading(false);
      return;
    }

    const { data: membership, error: membershipError } = await (supabase as any)
      .from("platform_admins")
      .select("user_id")
      .eq("user_id", data.user.id)
      .maybeSingle();

    if (membershipError || !membership) {
      await supabase.auth.signOut();
      setMessage("This account is not authorized for platform administration.");
      setLoading(false);
      return;
    }

    window.location.replace("/admin");
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#f4f7f6] px-4 text-[#123f3b]">
      <div className="w-full max-w-md rounded-3xl border border-[#dbe7e3] bg-white p-7 shadow-[0_20px_60px_rgba(30,67,62,.12)] sm:p-9">
        <div className="mb-7 flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-2xl bg-[#123f3b] text-white"><ShieldCheck className="size-6" /></span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#1686d9]">Dental AI</p>
            <h1 className="text-2xl font-bold">Platform Admin</h1>
          </div>
        </div>
        <p className="mb-6 text-sm leading-6 text-[#607772]">Authorized platform staff only. Dental-practice accounts do not use this login.</p>
        <form onSubmit={login} className="grid gap-4">
          <label className="text-sm font-semibold">Email<input autoComplete="email" required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-1.5 h-12 w-full rounded-xl border px-3 font-normal outline-none focus:border-[#1686d9]" /></label>
          <label className="text-sm font-semibold">Password<input autoComplete="current-password" required type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-1.5 h-12 w-full rounded-xl border px-3 font-normal outline-none focus:border-[#1686d9]" /></label>
          {message && <div role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">{message}</div>}
          <button disabled={loading} className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#123f3b] font-bold text-white disabled:opacity-60"><LockKeyhole className="size-4" />{loading ? "Signing in…" : "Sign in"}</button>
        </form>
        <a href="/" className="mt-6 block text-center text-sm font-semibold text-[#1686d9]">Return to website</a>
      </div>
    </main>
  );
}
