import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, MessageCircle, Send, Star, Sparkles, ArrowRight, Phone, Megaphone, MonitorSmartphone, MapPin, ShieldCheck, CheckCircle2 } from "lucide-react";
import { answerDentalQuestion } from "../lib/dentalChatbot";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "LaBelle Dental Clinic | AI Front Desk Demo" },
    { name: "description", content: "A working dental website and AI front-desk demonstration for dental practices." },
  ] }),
  component: PatientSite,
});

const HERO_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuA0iEVLLRDQ84qokAVdYeqg0Hai9CwXY66T1ZF-3aLCxhCbHiv9PEeaTEM5BsVISk--APEqGrxjdBdB7DS6Ak4pwHW3tmuKSjiTtVKYro7cVkpcwsl8iIvnlUzklynRpYdXw-LyoYrPqmdR7Pm4-oYVh2FRY3kMasqHq2IB2T24ygY6wRnywN1IgioPNFhO9cBUn_Yt2rVU0BW9rQGlM6BwUSKYALNmcLfYszaSol513qJ-uDNRHb70";

const services = [
  ["Checkups & cleaning", "Routine examinations, scaling, polishing and preventive care.", "✦"],
  ["Orthodontics", "Braces consultations and treatment for tooth alignment.", "⌁"],
  ["Dental implants", "Implant consultations, records review and treatment planning.", "◉"],
  ["Fillings & repairs", "Assessment of cavities, chips, broken teeth and existing fillings.", "◌"],
  ["Crowns & root-canal care", "Consultations for crowns, posts and root-canal treatment.", "♢"],
  ["Cosmetic consultations", "Questions about veneers and smile-improvement options.", "✧"],
];

const salesQuestions = ["I need a better dental website", "How can AI chat help my practice?", "Can you connect appointments?", "Can you help promote my services?"];

function ToothLogo({ small = false }: { small?: boolean }) {
  return <svg viewBox="0 0 64 64" aria-hidden="true" className={small ? "size-8" : "size-11"}><path d="M21 7c5 0 7 3 11 3s6-3 11-3c9 0 14 7 14 16 0 7-3 12-6 18-3 6-3 16-8 16-4 0-4-8-6-14-1-4-3-6-5-6s-4 2-5 6c-2 6-2 14-6 14-5 0-5-10-8-16-3-6-6-11-6-18C7 14 12 7 21 7Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

function PatientSite() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("សួស្តី! Hi, I’m LaBelle Front Desk. How can I help with your dental visit?");
  const [salesMode, setSalesMode] = useState(false);

  function ask(next = question) {
    const q = next.trim(); if (!q) return;
    const lower = q.toLowerCase();
    const business = ["website","practice","chat","appointment","book","promot","marketing","system","cost","price"].some(x => lower.includes(x));
    if (business) {
      setSalesMode(true);
      let response = "We can review your current dental website and patient workflow, then build a live demonstration around your own practice information.";
      if (lower.includes("website")) response = "Yes. We can redesign or improve your dental website for mobile, local search and conversion, then make the AI front desk part of the website.";
      else if (lower.includes("chat")) response = "Yes. This chat can be installed on your site and trained on verified practice information so patients can get immediate answers 24/7.";
      else if (lower.includes("appointment") || lower.includes("book")) response = "Yes. We can collect the service, reason for visit and patient details, then connect the workflow to your calendar or practice-management system.";
      else if (lower.includes("promot") || lower.includes("marketing")) response = "Yes. We can build service pages and campaigns around implants, whitening, aligners or other services you want to grow, while the AI converts questions into appointment requests.";
      else if (lower.includes("cost") || lower.includes("price")) response = "Website, AI chat, booking, voice and promotions can be packaged separately or together. We can start with a small pilot using your own practice.";
      setAnswer(response);
    } else {
      setSalesMode(false);
      setAnswer(answerDentalQuestion(q).answer);
    }
    setQuestion("");
  }

  function focusChat(q?: string) {
    document.getElementById("ask-labelle")?.scrollIntoView({ behavior: "smooth", block: "center" });
    if (q) setTimeout(() => ask(q), 400);
  }

  return <main className="min-h-screen bg-[#f7faff] pb-20 text-[#102953] md:pb-0">
    <header className="sticky top-0 z-50 border-b border-[#dce8f4] bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[82px] max-w-[1440px] items-center justify-between px-5 lg:px-8">
        <a href="#top" className="flex items-center gap-3 text-[#0870c8]"><ToothLogo/><div><strong className="font-display block text-[25px] leading-6">LaBelle Dental Clinic</strong><small className="text-[12px] font-medium text-[#53657e]">Hygiene, quality and service</small></div></a>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-[#102953] md:flex"><a href="#top">Home</a><a href="#services">Services⌄</a><a href="#reviews">Reviews</a><a href="#appointments">Appointments</a><a href="#ask-labelle">Ask LaBelle</a><a href="#contact">Contact</a></nav>
        <a href="tel:+855236767897" className="hidden items-center gap-3 font-bold text-[#0870c8] lg:flex"><Phone className="size-6"/><span className="leading-5">Call clinic<br/>023 67 67 897</span></a>
      </div>
    </header>

    <section id="top" className="relative overflow-hidden bg-white">
      <div className="mx-auto grid max-w-[1440px] md:grid-cols-[.82fr_1.18fr]">
        <div className="relative z-10 flex min-h-[510px] items-center bg-[linear-gradient(90deg,#eef8ff_0%,#f8fbff_95%)] px-6 py-14 md:px-10 lg:px-16"><div><p className="mb-5 text-sm font-bold uppercase tracking-[.22em] text-[#0870c8]">Serving Phnom Penh</p><h1 className="font-display text-5xl font-bold leading-[1.03] tracking-[-.035em] text-[#102953] sm:text-6xl">Healthy smiles.<br/><span className="italic text-[#0870c8]">Warm welcome.</span></h1><p className="mt-7 max-w-[510px] text-lg leading-8 text-[#324768]">Trusted dental care in Daun Penh, with a multilingual front desk ready to help patients quickly.</p><div className="mt-8 flex flex-wrap gap-4"><a href="#appointments" className="inline-flex items-center gap-2 rounded-xl bg-[#0870c8] px-6 py-4 font-semibold text-white shadow-sm"><CalendarDays className="size-5"/> Request appointment</a><button onClick={()=>focusChat()} className="inline-flex items-center gap-2 rounded-xl border border-[#b9d4ea] bg-white px-6 py-4 font-semibold text-[#0870c8]"><MessageCircle className="size-5"/> Ask LaBelle</button></div></div></div>
        <div className="relative min-h-[430px] md:min-h-[510px]"><img src={HERO_IMAGE} alt="Young Asian dental professional smiling in a modern clinic" className="absolute inset-0 h-full w-full object-cover object-center"/><div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#f8fbff] to-transparent"/></div>
      </div>
    </section>

    <section id="services" className="border-t border-[#e2edf6] bg-[#f5f9fe] px-5 py-12 lg:px-8"><div className="mx-auto max-w-[1440px]"><div className="text-center"><h2 className="font-display text-3xl font-bold text-[#102953]">Dental care starts with the right questions.</h2><p className="mx-auto mt-2 max-w-2xl text-[#3e526f]">Ask about treatment, previous dental work or records. LaBelle’s team confirms availability, suitability and pricing.</p></div><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">{services.map(([title,text,icon])=><article key={title} className="rounded-xl border border-[#cfe0ef] bg-white p-5 text-center shadow-[0_4px_16px_rgba(38,91,130,.04)]"><div className="mx-auto grid size-14 place-items-center text-3xl font-bold text-[#0870c8]">{icon}</div><h3 className="mt-2 font-display text-[15px] font-bold">{title}</h3><p className="mt-3 text-[12px] leading-5 text-[#3e526f]">{text}</p><a href="#ask-labelle" className="mt-4 inline-block text-xs font-bold text-[#0870c8]">Learn more →</a></article>)}</div></div></section>

    <section className="bg-white px-5 py-12 lg:px-8"><div className="mx-auto grid max-w-[1440px] gap-5 lg:grid-cols-3">
      <div id="reviews" className="rounded-2xl border border-[#e2edf6] bg-white p-6"><p className="text-xs font-bold uppercase tracking-[.15em] text-[#0870c8]">Patient reviews</p><h2 className="mt-2 font-display text-2xl font-bold">Care people recommend.</h2><div className="mt-5 flex items-center gap-3"><Star className="size-7 fill-[#0870c8] text-[#0870c8]"/><strong className="text-4xl">4.5</strong></div><p className="mt-1 text-xs text-[#49617d]">50+ publicly listed reviews</p><Review text="Good dental services from a patient who reports visiting LaBelle for about 15 years."/><Review text="A recent recommendation describes LaBelle as good quality, friendly and more affordable than premium alternatives."/></div>

      <div id="appointments" className="rounded-2xl border border-[#e2edf6] bg-white p-6"><p className="text-xs font-bold uppercase tracking-[.15em] text-[#0870c8]">Request a preferred visit time.</p><p className="mt-2 text-sm leading-6 text-[#3e526f]">No login is required. LaBelle confirms every appointment by phone to make sure the visit is scheduled correctly.</p><label className="mt-5 block text-xs font-bold">Service<select className="mt-1 h-11 w-full rounded-lg border bg-white px-3"><option>Checkup & cleaning</option><option>Orthodontics consultation</option><option>Dental implant consultation</option><option>Tooth pain or broken tooth</option></select></label><label className="mt-4 block text-xs font-bold">Preferred date<input type="date" className="mt-1 h-11 w-full rounded-lg border px-3"/></label><div className="mt-4 grid grid-cols-4 gap-2">{["8:30 AM","10:00 AM","2:00 PM","5:00 PM"].map(t=><button key={t} className="rounded-lg border border-[#b8d3e9] py-2 text-xs font-semibold text-[#0870c8]">{t}</button>)}</div><input className="mt-4 h-11 w-full rounded-lg border px-3 text-sm" placeholder="Your name"/><input className="mt-3 h-11 w-full rounded-lg border px-3 text-sm" placeholder="Phone or Telegram"/><button className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#0870c8] font-semibold text-white"><CalendarDays className="size-4"/> Request this time</button><p className="mt-3 flex items-center justify-center gap-2 text-xs text-[#566d86]"><ShieldCheck className="size-4"/> The clinic will call to confirm availability.</p></div>

      <div id="ask-labelle" className="rounded-2xl border border-[#e2edf6] bg-white p-6"><p className="text-xs font-bold uppercase tracking-[.15em] text-[#0870c8]">AI front desk</p><h2 className="mt-2 font-display text-2xl font-bold">Ask LaBelle before your visit.</h2><p className="mt-2 text-sm leading-6 text-[#3e526f]">The front desk answers approved questions and helps prepare a useful appointment request without diagnosing.</p><div className={`mt-5 rounded-xl p-4 text-sm leading-6 ${salesMode?"bg-[#fff7dc]":"bg-[#edf5ff]"}`}>{answer}</div><div className="mt-4 grid gap-2">{["What services do you offer?","I have X-rays","I have tooth pain","Book an appointment"].map(q=><button key={q} onClick={()=>ask(q)} className="flex items-center justify-between rounded-lg border border-[#cfe0ef] px-3 py-2.5 text-left text-xs font-semibold text-[#15365f]"><span>{q}</span><ArrowRight className="size-4 text-[#0870c8]"/></button>)}</div><form onSubmit={e=>{e.preventDefault();ask()}} className="mt-4 flex gap-2 rounded-lg border p-2"><input value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Ask LaBelle or ask about our services…" className="min-w-0 flex-1 bg-transparent px-2 text-xs outline-none"/><button className="grid size-9 place-items-center rounded-lg bg-[#0870c8] text-white"><Send className="size-4"/></button></form></div>
    </div></section>

    <section id="contact" className="bg-[#f6faff] px-5 pb-12 lg:px-8"><div className="mx-auto grid max-w-[1440px] gap-5 lg:grid-cols-[.65fr_1.35fr]"><div className="rounded-2xl border border-[#e2edf6] bg-white p-6"><p className="text-xs font-bold uppercase tracking-[.13em] text-[#0870c8]">Dental care in the heart of Phnom Penh.</p><div className="mt-5 flex gap-3"><MapPin className="size-5 shrink-0 text-[#0870c8]"/><p className="text-sm leading-6">#77 Street 110, Sangkat Wat Phnom,<br/>Khan Daun Penh, Phnom Penh</p></div><div className="mt-4 flex items-center gap-3 text-sm"><Phone className="size-5 text-[#0870c8]"/>092 96 31 94 · 023 67 67 897</div><p className="mt-7 text-xs leading-5 text-[#61758a]">Public information requires clinic verification before production use.</p></div><div className="relative overflow-hidden rounded-2xl border border-[#cfe0ef] bg-[linear-gradient(110deg,#eaf6ff,#ddecff)] p-7"><div className="max-w-[520px]"><h2 className="font-display text-3xl font-bold">Own a dental practice?</h2><p className="mt-3 leading-7 text-[#38516e]">We help clinics get more appointments with a better website, AI chat front desk and practical growth systems.</p><button onClick={()=>focusChat("How can you build this for my dental practice?")} className="sales-pointer mt-6 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-4 font-bold text-[#0870c8] shadow-lg"><MessageCircle className="size-5"/> Ask about our services <ArrowRight className="pointer-icon size-5"/></button><p className="mt-3 text-xs text-[#516b86]">Try the system and ask us anything.</p></div><div className="pointer-events-none absolute -right-8 bottom-0 hidden h-40 w-64 rotate-[-4deg] rounded-xl border border-[#a9c7df] bg-white shadow-2xl lg:block"><div className="h-5 border-b bg-[#f4f8fc]"/><div className="grid grid-cols-2 gap-2 p-4"><div className="rounded bg-[#eaf4fc] p-2"><MonitorSmartphone className="text-[#0870c8]"/></div><div className="rounded bg-[#eaf4fc] p-2"><MessageCircle className="text-[#0870c8]"/></div><div className="col-span-2 rounded bg-[#0870c8] p-2 text-center text-xs text-white">AI Front Desk</div></div></div></div></div></section>

    <footer className="bg-[#0870c8] px-5 py-7 text-white"><div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-5 md:flex-row"><div className="flex items-center gap-2"><ToothLogo small/><div><strong className="block">LaBelle Dental Clinic</strong><small className="text-white/75">Hygiene, quality and service</small></div></div><nav className="flex flex-wrap justify-center gap-6 text-xs"><a href="#top">Home</a><a href="#services">Services</a><a href="#reviews">Reviews</a><a href="#appointments">Appointments</a><a href="#ask-labelle">Ask LaBelle</a><a href="#contact">Contact</a></nav><small>© LaBelle Dental Clinic</small></div></footer>

    <button onClick={()=>focusChat("How can you build this for my dental practice?")} className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#0870c8] px-5 py-3.5 font-semibold text-white shadow-2xl"><MessageCircle className="size-5"/> Ask us</button>
  </main>;
}

function Review({ text }: { text: string }) { return <div className="mt-5 rounded-xl border border-[#e2edf6] bg-[#fbfdff] p-4"><p className="text-sm leading-6">“{text}”</p><p className="mt-3 text-[11px] text-[#63758a]">Patient recommendation</p><a href="#" className="mt-2 inline-block text-[11px] font-bold text-[#0870c8]">Read source →</a></div>; }
