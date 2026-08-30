import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, MessageCircle, Send, Star, Sparkles, ArrowRight, Phone, Tooth, Megaphone, MonitorSmartphone } from "lucide-react";
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
  ["Checkups & cleaning", "Routine examinations, scaling, polishing and preventive care."],
  ["Orthodontics", "Braces consultations and treatment for tooth alignment."],
  ["Dental implants", "Implant consultations, records review and treatment planning."],
  ["Fillings & repairs", "Assessment of cavities, chips, broken teeth and existing fillings."],
  ["Crowns & root-canal care", "Consultations for crowns, posts and root-canal treatment."],
  ["Cosmetic consultations", "Questions about veneers and smile-improvement options."],
];

const salesQuestions = ["I need a better dental website", "How can AI chat help my practice?", "Can you connect appointments?", "Can you help promote my services?"];

function PatientSite() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("សួស្តី! Hi, I’m LaBelle Front Desk. Patients can ask about dental care and appointments. Dental practice owners can ask how we can build this system for their practice.");
  const [salesMode, setSalesMode] = useState(false);

  function ask(next = question) {
    const q = next.trim();
    if (!q) return;
    const lower = q.toLowerCase();
    const business = ["website","practice","chat","appointment","book","promot","marketing","system","cost","price"].some(x => lower.includes(x));
    if (business) {
      setSalesMode(true);
      let response = "We can review your current practice, website and booking workflow, then build a live demo using your own clinic information.";
      if (lower.includes("website")) response = "Yes. We can rebuild or improve your dental website for mobile, local search and conversion, then add the AI front desk directly to it.";
      else if (lower.includes("chat")) response = "Yes. This AI chat can be installed on your website and trained only on verified practice information so patients get immediate answers 24/7.";
      else if (lower.includes("appointment") || lower.includes("book")) response = "Yes. The AI front desk can collect the reason for the visit and patient details, then connect to your calendar or practice-management booking workflow.";
      else if (lower.includes("promot") || lower.includes("marketing")) response = "Yes. We can create service pages and patient campaigns for treatments you want to grow, while the chatbot converts questions into appointment requests.";
      else if (lower.includes("cost") || lower.includes("price")) response = "We can package website improvement, AI chat, booking, voice and promotions separately or together. A simple pilot can start with the website and chat.";
      setAnswer(response);
    } else {
      setSalesMode(false);
      setAnswer(answerDentalQuestion(q).answer);
    }
    setQuestion("");
  }

  function focusChat(q?: string) {
    document.getElementById("ask-labelle")?.scrollIntoView({ behavior: "smooth", block: "center" });
    if (q) setTimeout(() => ask(q), 450);
  }

  return <main className="min-h-screen bg-[#f7f9ff] pb-20 text-[#141c24] md:pb-0">
    <header className="sticky top-0 z-40 border-b border-[#dce5ef] bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-4 md:px-8 lg:px-12">
        <a href="#top" className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-full border-2 border-[#006098] text-[#006098]"><Tooth className="size-6"/></span><div><strong className="font-display block text-2xl text-[#006098]">LaBelle Dental Clinic</strong><small className="text-[#5d6670]">Hygiene, quality and service</small></div></a>
        <nav className="hidden gap-8 text-sm font-semibold text-[#33414d] md:flex"><a href="#services">Services</a><a href="#reviews">Reviews</a><a href="#appointments">Appointments</a><a href="#ask-labelle">Ask LaBelle</a><a href="#contact">Contact</a></nav>
        <a href="tel:+855236767897" className="hidden items-center gap-2 text-sm font-bold text-[#006098] lg:flex"><Phone className="size-5"/> Call clinic<br/>023 67 67 897</a>
      </div>
    </header>

    <section id="top" className="relative overflow-hidden border-b border-[#e3ebf2] bg-white">
      <div className="absolute inset-0 md:hidden"><img src={HERO_IMAGE} alt="Young female dental professional in a modern clinic" className="h-full w-full object-cover opacity-15"/><div className="absolute inset-0 bg-gradient-to-r from-[#f7f9ff] via-[#f7f9ff]/90 to-transparent"/></div>
      <div className="relative mx-auto grid max-w-[1280px] gap-8 px-4 py-16 md:grid-cols-2 md:px-8 md:py-20 lg:px-12">
        <div className="self-center"><p className="mb-4 text-sm font-bold uppercase tracking-[.2em] text-[#00639b]">Serving Phnom Penh</p><h1 className="font-display text-5xl font-bold leading-[1.03] tracking-[-.035em] text-[#0a2e58] sm:text-6xl">Healthy smiles.<br/><span className="italic text-[#0072bd]">Warm welcome.</span></h1><p className="mt-6 max-w-xl text-lg leading-8 text-[#394b5a]">Trusted dental care in Daun Penh, with a multilingual front desk ready to help patients quickly.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="#appointments" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#006098] px-6 py-4 font-semibold text-white shadow-sm"><CalendarDays className="size-5"/> Request appointment</a><button onClick={()=>focusChat()} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#9ec7e2] bg-white px-6 py-4 font-semibold text-[#006098]"><MessageCircle className="size-5"/> Ask LaBelle</button></div></div>
        <div className="hidden overflow-hidden rounded-2xl border border-[#dce5ef] bg-white shadow-2xl md:block"><img src={HERO_IMAGE} alt="Young female dental professional smiling in a modern clinic" className="h-[520px] w-full object-cover"/></div>
      </div>
    </section>

    <section className="border-b border-[#cfe0ea] bg-[#edf6fb]"><div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 px-4 py-5 text-center md:flex-row md:px-8 md:text-left lg:px-12"><div><strong className="font-display text-xl text-[#073d64]">Own a dental practice?</strong><p className="mt-1 text-sm text-[#536875]">This entire site is a live example. Test the AI front desk and ask about our website, chatbot, booking or promotion services.</p></div><button onClick={()=>focusChat("How can you build this for my dental practice?")} className="sales-pointer inline-flex items-center gap-2 rounded-full bg-[#006098] px-5 py-3 font-bold text-white shadow-lg">Ask about your practice <ArrowRight className="pointer-icon size-5"/></button></div></section>

    <section id="services" className="bg-[#edf4ff] px-4 py-16 md:px-8 lg:px-12"><div className="mx-auto max-w-[1280px]"><div className="mx-auto max-w-3xl text-center"><h2 className="font-display text-4xl font-bold text-[#123b64]">Dental care starts with the right questions.</h2><p className="mt-4 leading-7 text-[#52616e]">Ask about treatment, previous dental work or records. LaBelle’s team confirms availability, suitability and pricing.</p></div><div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{services.map(([title,text])=><article key={title} className="rounded-2xl border border-white/70 bg-white/80 p-7 text-center shadow-[0_10px_30px_rgba(0,96,152,.06)] backdrop-blur"><span className="mx-auto grid size-16 place-items-center rounded-full bg-[#e7effa] text-[#00639b]"><Tooth className="size-8"/></span><h3 className="mt-5 font-display text-2xl font-semibold">{title}</h3><p className="mt-3 leading-6 text-[#5b6975]">{text}</p></article>)}</div></div></section>

    <section id="reviews" className="bg-white px-4 py-16 md:px-8 lg:px-12"><div className="mx-auto grid max-w-[1280px] gap-10 md:grid-cols-[.7fr_1.3fr] md:items-center"><div><p className="text-sm font-bold uppercase tracking-[.18em] text-[#00639b]">Patient reviews</p><h2 className="mt-3 font-display text-4xl font-bold text-[#123b64]">Care people recommend.</h2><div className="mt-6 flex items-center gap-4"><Star className="size-9 fill-[#2d9cdb] text-[#2d9cdb]"/><strong className="font-display text-5xl">4.5</strong></div><p className="mt-2 text-sm text-[#5b6975]">50+ publicly listed reviews</p></div><div className="grid gap-5 sm:grid-cols-2"><Review text="“Good dental services” from a patient who reports visiting LaBelle for about 15 years." source="Long-term patient · Cambodia Expats Online"/><Review text="A recent recommendation describes LaBelle as good quality, friendly and more affordable than premium alternatives." source="Phnom Penh patient recommendation · Reddit"/></div></div></section>

    <section id="ask-labelle" className="bg-[#e7effa] px-4 py-16 md:px-8 lg:px-12"><div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><p className="text-sm font-bold uppercase tracking-[.18em] text-[#00639b]">AI front desk</p><h2 className="mt-3 font-display text-4xl font-bold text-[#123b64]">Ask LaBelle before your visit.</h2><p className="mt-5 text-lg leading-8 text-[#52616e]">Patients can ask dental questions. Dental practice owners can ask about our services and test the same system at the same time.</p><div className="sales-pointer mt-7 inline-flex items-center gap-3 rounded-2xl bg-[#fff4d8] px-5 py-4 font-bold text-[#735000] shadow-sm">Dentist? Try it here <ArrowRight className="pointer-icon size-7 text-[#006098]"/></div></div><div className="rounded-3xl border border-[#c7d8e4] bg-white p-6 shadow-[0_20px_60px_rgba(0,72,115,.12)]"><div className="flex items-center gap-3 border-b pb-4"><span className="grid size-11 place-items-center rounded-full bg-[#006098] text-white"><Sparkles className="size-5"/></span><div><strong>LaBelle AI Front Desk</strong><p className="text-xs text-[#69747e]">Patient help + live business demo</p></div></div><div className={`mt-5 min-h-28 rounded-2xl p-4 text-sm leading-6 ${salesMode?"bg-[#fff8e8]":"bg-[#f4f9fc]"}`}>{answer}</div><div className="mt-4 flex flex-wrap gap-2">{salesQuestions.map(q=><button key={q} onClick={()=>ask(q)} className="rounded-full border border-[#cddde8] px-3 py-2 text-xs font-medium text-[#006098]">{q}</button>)}</div><form onSubmit={e=>{e.preventDefault();ask()}} className="mt-4 flex gap-2 rounded-xl border border-[#cddde8] p-2"><input value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Patient question or ask about our services…" className="min-w-0 flex-1 bg-transparent px-2 text-sm outline-none"/><button aria-label="Send" className="grid size-10 place-items-center rounded-lg bg-[#006098] text-white"><Send className="size-4"/></button></form></div></div></section>

    <section id="appointments" className="bg-[#e7effa] px-4 py-16 md:px-8 lg:px-12"><div className="mx-auto max-w-3xl rounded-3xl border border-white/70 bg-white/80 p-7 shadow-[0_10px_30px_rgba(0,96,152,.08)] backdrop-blur md:p-9"><div className="text-center"><h2 className="font-display text-4xl font-bold text-[#123b64]">Request a preferred visit time.</h2><p className="mt-3 text-[#5b6975]">No login is required. LaBelle confirms every appointment by phone.</p></div><div className="mt-8 grid gap-4 sm:grid-cols-2"><select className="h-12 rounded-xl border bg-white px-3"><option>Checkup & cleaning</option><option>Orthodontics consultation</option><option>Dental implant consultation</option><option>Tooth pain or broken tooth</option></select><input type="date" className="h-12 rounded-xl border bg-white px-3"/><input placeholder="Name" className="h-12 rounded-xl border bg-white px-3"/><input placeholder="Phone or Telegram" className="h-12 rounded-xl border bg-white px-3"/></div><button className="mt-5 w-full rounded-full bg-[#006098] py-4 font-semibold text-white">Request this time</button><p className="mt-3 text-center text-xs text-[#69747e]">The clinic will call to confirm availability.</p></div></section>

    <section className="bg-[#071f3d] px-4 py-14 text-white md:px-8 lg:px-12"><div className="mx-auto grid max-w-[1180px] gap-8 md:grid-cols-2 md:items-center"><div><h2 className="font-display text-3xl font-bold">Want this for your dental practice?</h2><p className="mt-3 text-white/70">Website, AI chat, appointment workflows and patient promotions can work together instead of as separate tools.</p></div><div className="grid grid-cols-2 gap-3 text-sm">{[[MonitorSmartphone,"Website"],[MessageCircle,"AI chat"],[CalendarDays,"Appointments"],[Megaphone,"Promotions"]].map(([Icon,label]:any)=><button key={label} onClick={()=>focusChat(`Tell me about your ${label} service`)} className="flex items-center gap-2 rounded-xl bg-white/10 p-3 text-left hover:bg-white/15"><Icon className="size-5"/>{label}</button>)}</div></div></section>

    <footer id="contact" className="bg-white px-4 py-12 text-center text-[#4f5e69] md:px-8"><strong className="font-display text-xl text-[#006098]">LaBelle Dental Clinic</strong><p className="mt-3">#77 Street 110, Sangkat Wat Phnom, Khan Daun Penh, Phnom Penh</p><p className="mt-2 font-semibold text-[#006098]">023 67 67 897</p></footer>
    <button onClick={()=>focusChat("How can you build this for my dental practice?")} className="fixed bottom-5 right-5 z-40 hidden items-center gap-2 rounded-full bg-[#006098] px-5 py-3.5 font-semibold text-white shadow-2xl md:flex"><MessageCircle className="size-5"/> Ask us</button>
  </main>;
}

function Review({text,source}:{text:string;source:string}){return <article className="rounded-2xl border border-[#e1e8ef] bg-[#fbfdff] p-6 shadow-sm"><Star className="size-5 fill-[#2d9cdb] text-[#2d9cdb]"/><p className="mt-4 leading-7">{text}</p><p className="mt-4 text-sm font-semibold text-[#5b6975]">{source}</p></article>}
