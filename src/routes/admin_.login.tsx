import { createFileRoute } from "@tanstack/react-router";
import { FormEvent, useEffect, useState } from "react";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { isPlatformAdmin } from "@/lib/platform-admin";

export const Route = createFileRoute("/admin_/login")({
  head: () => ({ meta: [{ title: "Platform Admin Login | Dental AI" }] }),
  component: AdminLogin,
});

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<"google" | "apple" | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("error") === "unauthorized") {
      setMessage("This account is not authorized for platform administration.");
    }
    void (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) return;
      if (await isPlatformAdmin(data.session.user.id)) window.location.replace("/admin");
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

  async function signInWithProvider(provider: "google" | "apple") {
    setOauthLoading(provider);
    setMessage("");

    const result = await lovable.auth.signInWithOAuth(provider, {
      redirect_uri: `${window.location.origin}/auth/callback`,
    });

    if (result.error) {
      setMessage(result.error.message || `Unable to sign in with ${provider}.`);
      setOauthLoading(null);
      return;
    }

    if (result.redirected) {
      // Full-page redirect to the provider; /auth/callback completes the flow.
      return;
    }

    // Preview popup flow: tokens already set the session. Enforce the same
    // platform-admins gate as the email path.
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      setMessage("Sign-in did not complete. Please try again.");
      setOauthLoading(null);
      return;
    }

    if (!(await isPlatformAdmin(data.session.user.id))) {
      await supabase.auth.signOut();
      setMessage("This account is not authorized for platform administration.");
      setOauthLoading(null);
      return;
    }

    window.location.replace("/admin");
  }

  const oauthBusy = oauthLoading !== null || loading;

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

        <div className="grid gap-3">
          <button
            type="button"
            disabled={oauthBusy}
            onClick={() => void signInWithProvider("google")}
            className="inline-flex h-12 items-center justify-center gap-3 rounded-xl border border-[#dbe7e3] bg-white font-semibold text-[#3c4f4a] transition-colors hover:bg-[#f4f7f6] disabled:opacity-60"
          >
            <GoogleIcon /> {oauthLoading === "google" ? "Redirecting…" : "Continue with Google"}
          </button>
          <button
            type="button"
            disabled={oauthBusy}
            onClick={() => void signInWithProvider("apple")}
            className="inline-flex h-12 items-center justify-center gap-3 rounded-xl bg-[#1d1d1f] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            <AppleIcon /> {oauthLoading === "apple" ? "Redirecting…" : "Continue with Apple"}
          </button>
        </div>

        <div className="my-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[.14em] text-[#8aa09c]">
          <span className="h-px flex-1 bg-[#dbe7e3]" />or<span className="h-px flex-1 bg-[#dbe7e3]" />
        </div>

        <form onSubmit={login} className="grid gap-4">
          <label className="text-sm font-semibold">Email<input autoComplete="email" required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-1.5 h-12 w-full rounded-xl border px-3 font-normal outline-none focus:border-[#1686d9]" /></label>
          <label className="text-sm font-semibold">Password<input autoComplete="current-password" required type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-1.5 h-12 w-full rounded-xl border px-3 font-normal outline-none focus:border-[#1686d9]" /></label>
          {message && <div role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">{message}</div>}
          <button disabled={oauthBusy} className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#123f3b] font-bold text-white disabled:opacity-60"><LockKeyhole className="size-4" />{loading ? "Signing in…" : "Sign in"}</button>
        </form>
        <a href="/" className="mt-6 block text-center text-sm font-semibold text-[#1686d9]">Return to website</a>
      </div>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52Z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 384 512" className="size-5 fill-current" aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}