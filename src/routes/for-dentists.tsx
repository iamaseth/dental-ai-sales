import { createFileRoute, Link } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { ArrowRight, Bot, CalendarDays, Globe2, Search, Sparkles, Send, HeartHandshake, MousePointer2, Check } from "lucide-react";

export const Route = createFileRoute("/for-dentists")({
  head: () => ({ meta: [
    { title: "Dental AI Sales Platform" },
    { name: "description", content: "Clinic websites, AI-compatible content, patient chat, SEO and booking calendars—with personal human support." },
  ] }),
  component: DentistSales,
});

const replies = {
  website: "We build a clinic-specific website around your brand, doctors, treatments, location and approved patient information. It is designed for phones and turns visitors into calls, questions and appointment requests.",
  seo: "We organize your services, location pages, metadata and local-search content so nearby patients can find you. SEO is ongoing work: we measure what people search for, improve useful pages and never promise fake rankings.",
  ai: "AI compatibility means your clinic information is clear, structured and consistent enough for search engines and AI answer tools to understand. We can add service FAQs and structured data, while your chatbot only uses clinic-approved answers.",
  booking: "For a trial, we can begin with a free appointment-request calendar. A paid version can connect live availability through tools such as Cal.com for booking, rescheduling, cancellations and reminders.",
  humans: "Yes, we are real people. We are Americans living and working in Cambodia, where our families and lives are based. Lower operating costs let us offer practical pricing, while every clinic receives personal setup, troubleshooting and human support.",
  support: "Message us whenever something is unclear or not working. A real person will review the issue, reply and help solve it. The AI handles repetitive patient questions; humans remain responsible for setup, corrections and support.",
};

function answerQuestion(question: string) {
  const q = question.toLowerCase();
  if (/human|people|team|cambodia|american|support|trouble|help/.test(q)) return replies.humans + " " + replies.support;
  if (/seo|google|search|rank|patient|lead/.test(q)) return replies.seo;
  if (/ai|compatible|compatibility|answer engine|aeo|geo|chatbot/.test(q)) return replies.ai;
  if (/book|calendar|appointment|cal\.com|schedule/.test(q)) return replies.booking;
  if (/web|site|design|mobile/.test(q)) return replies.website;
  if (/price|cost|cheap|afford/.test(q)) return "We keep pricing accessible because our operating costs in Cambodia are lower. The exact quote depends on your website, chatbot knowledge, calendar connection and ongoing growth needs. A human will review the scope with you before any commitment.";
  return "I can explain our clinic websites, SEO, AI compatibility, booking calendars or human support. Ask about one of those, or tell me what your dental practice needs to improve.";
}

function DentistSales() {
  const [answer, setAnswer] = useState("You are testing the same kind of digital front desk we can build for your practice. Ask about any service or choose a prompt below.");
  const [question, setQuestion] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!question.trim()) return;
    setAnswer(answerQuestion(question));
    setQuestion("");
  }

  const prompt = (label: string, response: string) => <button type="button" onClick={() => setAnswer(response)} className="rounded-full border border-[#c8ddd5] bg-white px-3 py-2 text-xs font-semibold transition-colors hover:border-[#1686d9] hover:text-[#1686d9]">{label}</button>;

  return <main className="min-h-screen bg-[#f7f4ed] text-[#123f3b]">
    <header className="border-b border-[#d7e7df] bg-white"><div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-5 py-4"><Link to="/" className="font-bold">View LaBelle patient site</Link><div className="flex items-center gap-3"><Link to="/admin" className="hidden text-sm font-semibold sm:block">CRM demo</Link><Link to="/for-dentists/telegram" className="rounded-full bg-[#1686d9] px-5 py-3 text-sm font-semibold text-white">Telegram handoff</Link></div></div></header>

    <section className="mx-auto grid min-h-[700px] max-w-7xl items-center gap-16 px-5 py-24 lg:grid-cols-[1.05fr_.95fr]">
      <div><h1 className="max-w-3xl text-6xl font-semibold leading-[.94] tracking-[-.04em] sm:text-7xl">Turn your website into a working front desk.</h1><p className="mt-7 max-w-xl text-lg leading-8 text-[#506d68]">A clinic-specific website, patient chatbot, search visibility and booking calendar—built and supported by real people.</p><div className="mt-10 divide-y divide-[#cddfd8] border-y border-[#cddfd8]">{[
        [Globe2, "Website", "A credible, mobile-first home for your practice."],
        [Search, "SEO", "Help nearby patients discover the right treatment pages."],
        [Bot, "AI compatibility", "Structured clinic answers for chat and AI search."],
        [CalendarDays, "Booking & calendar", "Start free, then connect live scheduling when ready."],
      ].map(([Icon,title,text]) => <button key={String(title)} onClick={() => setAnswer(replies[String(title).startsWith("Web") ? "website" : String(title).startsWith("SEO") ? "seo" : String(title).startsWith("AI") ? "ai" : "booking"])} className="group grid w-full grid-cols-[auto_1fr] gap-x-4 py-4 text-left sm:grid-cols-[auto_10rem_1fr]"><Icon className="size-5 text-[#1686d9]"/><strong>{title}</strong><span className="col-start-2 mt-1 text-sm text-[#607772] sm:col-start-3 sm:mt-0">{text}</span></button>)}</div></div>

      <div className="relative pt-28 lg:pt-0">
        <div className="sales-pointer absolute right-3 top-0 z-10 flex items-end gap-2 lg:-left-36 lg:right-auto lg:top-12">
          <div className="rounded-2xl bg-[#ffce4a] px-4 py-3 shadow-[0_14px_35px_rgba(54,75,67,.2)]"><strong className="block text-sm">Try the chatbot</strong><div className="sales-nudge-words mt-1 h-6 overflow-hidden text-sm"><span>Need a website?</span><span>Need SEO?</span><span>Need AI compatibility?</span><span>Need booking & calendar?</span></div></div>
          <MousePointer2 className="pointer-icon mb-[-12px] size-10 rotate-[105deg] fill-white text-[#123f3b] lg:rotate-[25deg]" aria-hidden="true"/>
        </div>
        <div id="service-chatbot" className="rounded-[2rem] bg-[#103d6a] p-4 shadow-[0_30px_80px_rgba(16,61,106,.25)]"><div className="rounded-3xl bg-white p-6"><div className="flex items-center gap-3 border-b border-[#d7e7df] pb-5"><span className="grid size-11 place-items-center rounded-full bg-[#1686d9] text-white"><Sparkles className="size-5"/></span><div><strong>Dental service guide</strong><small className="block text-[#607772]">AI demo · human-supported</small></div></div><div aria-live="polite" className="mt-6 min-h-44 rounded-2xl rounded-tl-sm bg-[#eef5f1] p-5 text-sm leading-7">{answer}</div><div className="mt-5 flex flex-wrap gap-2">{prompt("Website", replies.website)}{prompt("SEO", replies.seo)}{prompt("AI compatibility", replies.ai)}{prompt("Booking & calendar", replies.booking)}{prompt("Are you human?", replies.humans)}</div><form onSubmit={submit} className="mt-5 flex items-center rounded-full border border-[#c8ddd5] bg-white p-1.5 focus-within:border-[#1686d9]"><label htmlFor="sales-question" className="sr-only">Ask about our services</label><input id="sales-question" value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Ask about our services…" className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none"/><button aria-label="Send question" className="grid size-10 shrink-0 place-items-center rounded-full bg-[#1686d9] text-white transition-colors hover:bg-[#0f6fb8]"><Send className="size-4"/></button></form><button onClick={()=>setAnswer("Tell us your clinic name, current website or Facebook page, preferred contact method and what you want to improve first. A human will review it and prepare the next step.")} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#123f3b] px-5 py-3.5 font-semibold text-white transition-colors hover:bg-[#0b2e2b]">Create a demo for my clinic <ArrowRight className="size-4"/></button></div></div>
      </div>
    </section>

    <section className="bg-[#103d6a] px-5 py-24 text-white"><div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[.9fr_1.1fr]"><div><HeartHandshake className="size-12 text-[#ffce4a]"/><h2 className="mt-7 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">AI service with humans behind it.</h2></div><div className="text-lg leading-8 text-white/80"><p>We are Americans living and working in Cambodia. Our wives, children and daily lives are here. Because our operating costs are substantially lower, we can offer dental practices practical pricing without removing personal care.</p><p className="mt-6">You can send us a troubleshooting message whenever you need help. A real person will review the problem, answer you and work toward a solution. The AI supports your front desk; it does not replace our responsibility to you.</p><button onClick={()=>{setAnswer(replies.humans + " " + replies.support); document.getElementById("service-chatbot")?.scrollIntoView({behavior:"smooth",block:"center"})}} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#ffce4a] px-6 py-3.5 font-semibold text-[#123f3b]">Ask the chatbot about us <ArrowRight className="size-4"/></button></div></div></section>

    <section className="bg-white px-5 py-20"><div className="mx-auto max-w-5xl"><h2 className="text-4xl font-semibold tracking-[-.04em]">From first conversation to supported launch.</h2><div className="mt-10 grid gap-x-10 gap-y-5 md:grid-cols-2">{["Research your practice and patient needs","Create a clinic-specific demonstration","Connect enquiries, booking and follow-up","Keep improving with human support"].map(x=><div key={x} className="flex items-start gap-3 border-t border-[#cddfd8] py-5"><Check className="mt-0.5 size-5 shrink-0 text-[#1686d9]"/><h3 className="font-semibold">{x}</h3></div>)}</div></div></section>
  </main>;
}
