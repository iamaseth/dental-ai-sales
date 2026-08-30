import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, MessageCircle, Send, Star, Stethoscope, Sparkles, MapPin, Home, HeartPulse, ArrowRight, Megaphone, MonitorSmartphone } from "lucide-react";
import { answerDentalQuestion } from "../lib/dentalChatbot";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "LaBelle Dental Clinic | AI Front Desk Demo" },
    { name: "description", content: "A working dental website and AI front-desk demonstration for dental practices." },
  ] }),
  component: PatientSite,
});

const services = [
  ["Checkups & cleaning", "Routine examinations, scaling, polishing and preventive care."],
  ["Orthodontics", "Braces consultations and treatment for tooth alignment."],
  ["Dental implants", "Implant consultations, records review and treatment planning."],
  ["Fillings & repairs", "Assessment of cavities, chips, broken teeth and fillings."],
  ["Crowns & root-canal care", "Consultations for crowns, posts and root-canal treatment."],
  ["Cosmetic consultations", "Questions about veneers and smile-improvement options."],
];

const salesQuestions = ["I need a better dental website", "How can AI chat help my practice?", "Can you connect appointments?", "Can you help promote my services?"];

function PatientSite() {
  const [question,setQuestion]=useState("");
  const [answer,setAnswer]=useState("Hi, I’m LaBelle’s AI front desk. If you’re a patient, ask me about dental care or appointments. If you own a dental practice, ask me how we can build this system for you.");
  const [salesMode,setSalesMode]=useState(false);

  function ask(next=question){
    const q=next.trim(); if(!q)return; const lower=q.toLowerCase();
    const business = lower.includes("website")||lower.includes("practice")||lower.includes("chat")||lower.includes("appointment")||lower.includes("promot")||lower.includes("marketing")||lower.includes("system")||lower.includes("service")||lower.includes("cost")||lower.includes("price");
    if(business){setSalesMode(true);let r="We can start by reviewing your current dental website and building a demonstration around your own practice information.";
      if(lower.includes("website"))r="Yes. We can improve or rebuild your dental website for mobile, local search and conversion, then make the AI front desk part of the site.";
      else if(lower.includes("chat"))r="Yes. This chat experience can be installed on your dental website and trained on verified information from your practice so patients get immediate answers 24/7.";
      else if(lower.includes("appointment")||lower.includes("book"))r="Yes. The AI front desk can collect the reason for the visit and patient details, then connect to your calendar or practice-management booking workflow.";
      else if(lower.includes("promot")||lower.includes("marketing"))r="Yes. We can create service pages and campaigns for treatments you want to grow, while the chatbot answers questions and converts interest into appointment requests.";
      else if(lower.includes("cost")||lower.includes("price"))r="We can package the website, AI chat, booking, voice and promotions based on what your practice needs. Ask me which parts you want and we can narrow the scope.";
      setAnswer(r);
    } else {setSalesMode(false);setAnswer(answerDentalQuestion(q).answer)} setQuestion("");
  }
  function focusChat(q?:string){document.getElementById("ask-labelle")?.scrollIntoView({behavior:"smooth",block:"center"});if(q)setTimeout(()=>ask(q),450)}

  return <main className="min-h-screen bg-[#f7f9ff] pb-20 text-[#181c20] md:pb-0">
    <header className="sticky top-0 z-30 border-b border-[#dfe5ec] bg-white/95 backdrop-blur"><div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 md:px-8"><a href="#top" className="flex items-center gap-2.5"><span className="grid size-9 place-items-center rounded-full bg-[#006098] text-white"><HeartPulse className="size-5"/></span><strong className="font-display text-xl text-[#006098]">LaBelle Dental</strong></a><nav className="hidden items-center gap-6 text-sm font-semibold md:flex"><a href="#services">Services</a><a href="#appointments">Booking</a><a href="#ask-labelle">Ask LaBelle</a></nav><button onClick={()=>focusChat("How can you build this for my dental practice?")} className="rounded-lg bg-[#006098] px-4 py-2.5 text-sm font-semibold text-white">For dentists</button></div></header>

    <section id="top" className="mx-auto grid max-w-[1200px] gap-8 px-4 py-12 md:grid-cols-2 md:px-8 md:py-20"><div className="self-center"><p className="mb-4 text-sm font-semibold uppercase tracking-[.18em] text-[#006098]">Serving Phnom Penh</p><h1 className="font-display text-5xl font-bold leading-[1.02] tracking-[-.035em] sm:text-6xl">Healthy smiles.<br/><span className="italic text-[#006098]">Warm welcome.</span></h1><p className="mt-6 max-w-lg text-lg leading-8 text-[#404851]">Trusted dental care with a multilingual front desk ready to answer questions and help patients request an appointment.</p><div className="mt-8 flex flex-wrap gap-3"><a href="#appointments" className="rounded-lg bg-[#006098] px-6 py-3.5 font-semibold text-white">Request appointment</a><button onClick={()=>focusChat()} className="rounded-lg border border-[#006098] bg-white px-6 py-3.5 font-semibold text-[#006098]">Ask LaBelle</button></div></div><div className="overflow-hidden rounded-xl border bg-white shadow-lg"><img src="https://harbor-dental-ai-front-desk.blond-titan-1971.chatgpt.site/harbor-dental-hero.png" alt="Dental team speaking with a patient" className="h-[420px] w-full object-cover md:h-[520px]"/></div></section>

    <section className="border-y border-[#cfe1ec] bg-[#eef7fb]"><div className="mx-auto flex max-w-[1200px] flex-col items-center gap-4 px-4 py-5 text-center md:flex-row md:justify-between md:px-8 md:text-left"><div><strong className="font-display text-xl text-[#06385b]">Own a dental practice?</strong><p className="text-sm text-[#526775]">This entire website is a live example. Test the AI front desk and ask it about our website, chatbot, booking or promotion services.</p></div><button onClick={()=>focusChat("How can you build this for my dental practice?")} className="sales-pointer inline-flex shrink-0 items-center gap-2 rounded-full bg-[#006098] px-5 py-3 font-bold text-white shadow-lg">Ask about your practice <ArrowRight className="pointer-icon size-5"/></button></div></section>

    <section id="services" className="mx-auto max-w-[1200px] px-4 py-16 md:px-8 md:py-24"><h2 className="font-display text-4xl font-bold">Dental care starts with the right questions.</h2><div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{services.map(([title,text])=><article key={title} className="rounded-xl border bg-white p-7 shadow-sm"><Stethoscope className="size-7 text-[#006098]"/><h3 className="mt-5 font-display text-2xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#5d6670]">{text}</p></article>)}</div></section>

    <section id="ask-labelle" className="bg-[#eef4f8] px-4 py-16 md:px-8 md:py-24"><div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-sm font-bold uppercase tracking-[.18em] text-[#006098]">Live AI front desk</p><h2 className="mt-3 font-display text-4xl font-bold">Ask LaBelle.</h2><p className="mt-5 text-lg leading-8 text-[#404851]">Patients can ask dental questions. Dental practice owners can use the same box to ask about our services and experience the system at the same time.</p><div className="sales-pointer mt-8 inline-flex items-center gap-3 rounded-2xl bg-[#fff4d8] px-5 py-4 font-bold text-[#735000] shadow-sm"><span>Dental practice? Try it here</span><ArrowRight className="pointer-icon size-7 text-[#006098]"/></div></div><div className="rounded-3xl border border-[#cfdde8] bg-white p-6 shadow-[0_20px_60px_rgba(44,80,112,.14)]"><div className="flex items-center gap-3 border-b pb-4"><span className="grid size-11 place-items-center rounded-full bg-[#006098] text-white"><Sparkles className="size-5"/></span><div><strong>LaBelle AI Front Desk</strong><p className="text-xs text-[#69747e]">Patient help + live business demo</p></div></div><div className={`mt-5 min-h-28 rounded-2xl p-4 text-sm leading-6 ${salesMode?"bg-[#fff8e8]":"bg-[#f4f9fc]"}`}>{answer}</div><div className="mt-4 flex flex-wrap gap-2">{salesQuestions.map(q=><button key={q} onClick={()=>ask(q)} className="rounded-full border px-3 py-2 text-xs font-medium text-[#006098]">{q}</button>)}</div><form onSubmit={e=>{e.preventDefault();ask()}} className="mt-4 flex gap-2 rounded-xl border p-2"><input value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Patient question or ask about our services…" className="min-w-0 flex-1 bg-transparent px-2 text-sm outline-none"/><button aria-label="Send" className="grid size-10 place-items-center rounded-lg bg-[#006098] text-white"><Send className="size-4"/></button></form></div></div></section>

    <section id="appointments" className="mx-auto grid max-w-[1200px] gap-8 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-2"><div><CalendarDays className="size-8 text-[#006098]"/><h2 className="mt-4 font-display text-4xl font-bold">Request an appointment.</h2><p className="mt-4 leading-7 text-[#52606c]">A simple example of how the website can turn patient interest into an appointment request.</p></div><div className="rounded-2xl border bg-white p-6 shadow-sm"><div className="grid gap-3"><input className="h-12 rounded-lg border bg-[#f7f9ff] px-3" placeholder="Patient name"/><input className="h-12 rounded-lg border bg-[#f7f9ff] px-3" placeholder="Phone or Telegram"/><button className="h-12 rounded-lg bg-[#006098] font-semibold text-white">Request preferred time</button></div></div></section>

    <section className="bg-[#071f3d] px-4 py-14 text-white md:px-8"><div className="mx-auto grid max-w-[1200px] gap-8 md:grid-cols-2 md:items-center"><div><h2 className="font-display text-3xl font-bold">Want this for your dental practice?</h2><p className="mt-3 text-white/70">Website, AI chat, appointment workflows and patient promotions can work together instead of as separate tools.</p></div><div className="grid grid-cols-2 gap-3 text-sm">{[[MonitorSmartphone,"Website"],[MessageCircle,"AI chat"],[CalendarDays,"Appointments"],[Megaphone,"Promotions"]].map(([Icon,label]:any)=><button key={label} onClick={()=>focusChat(`Tell me about your ${label} service`)} className="flex items-center gap-2 rounded-xl bg-white/10 p-3 text-left hover:bg-white/15"><Icon className="size-5"/>{label}</button>)}</div></div></section>

    <section className="mx-auto grid max-w-[1200px] gap-10 px-4 py-16 md:grid-cols-2 md:px-8"><div><MapPin className="size-8 text-[#006098]"/><h2 className="mt-4 font-display text-3xl font-bold">LaBelle Dental Clinic</h2><p className="mt-4 text-[#52606c]">#77 Street 110, Sangkat Wat Phnom, Khan Daun Penh, Phnom Penh</p></div><div><div className="flex items-center gap-3"><Star className="fill-[#f6a84b] text-[#f6a84b]"/><strong className="text-2xl">4.5</strong></div><p className="mt-2 text-sm text-[#69747e]">Demo review presentation; clinic information should be verified before production use.</p></div></section>

    <footer className="border-t bg-white px-4 py-9 text-center text-sm text-[#69747e]">LaBelle Dental Clinic · AI Front Desk demonstration</footer>
    <nav className="fixed bottom-0 left-0 z-40 flex w-full items-center justify-around border-t bg-white px-2 pb-3 pt-2 md:hidden"><a href="#top" className="text-[#006098]"><Home className="size-5"/></a><a href="#services"><Stethoscope className="size-5"/></a><a href="#appointments"><CalendarDays className="size-5"/></a><button onClick={()=>focusChat()} className="rounded-full bg-[#006098] p-3 text-white"><MessageCircle className="size-5"/></button></nav>
    <button onClick={()=>focusChat("How can you build this for my dental practice?")} className="fixed bottom-5 right-5 z-40 hidden items-center gap-2 rounded-full bg-[#006098] px-5 py-3.5 font-semibold text-white shadow-2xl md:flex"><MessageCircle className="size-5"/> Ask us</button>
  </main>;
}
