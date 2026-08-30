import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, MessageCircle, Phone, ArrowRight, X, Send, Star } from "lucide-react";
import { answerDentalQuestion } from "../lib/dentalChatbot";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "LaBelle Dental Clinic | Phnom Penh" },
    { name: "description", content: "Patient information, dental services and appointment requests for LaBelle Dental Clinic in Phnom Penh." },
  ] }),
  component: PatientSite,
});

const services = [
  ["Checkups & cleaning", "Routine examinations, scaling, polishing and preventive care."],
  ["Orthodontics", "Braces consultations and treatment for tooth alignment."],
  ["Dental implants", "Implant consultations, records review and treatment planning."],
  ["Fillings & repairs", "Assessment of cavities, chips, broken teeth and existing fillings."],
  ["Crowns & root-canal care", "Consultations for crowns, posts and root-canal treatment."],
  ["Cosmetic consultations", "Questions about veneers and smile-improvement options."],
];

function PatientSite() {
  const [chatOpen, setChatOpen] = useState(false);
  const [answer, setAnswer] = useState("សួស្តី! Hi, I’m LaBelle Front Desk. How can I help with your dental visit?");
  const [question, setQuestion] = useState("");
  const [requested, setRequested] = useState(false);

  function ask(nextQuestion = question) {
    if (!nextQuestion.trim()) return;
    const result = answerDentalQuestion(nextQuestion);
    setAnswer(result.answer);
    setQuestion("");
  }

  return <main className="min-h-screen bg-[#fbfaf7] text-[#123f3b]">
    <div className="bg-[#1686d9] px-5 py-2.5 text-center text-sm text-white">LaBelle Dental Clinic · Phnom Penh</div>
    <header className="sticky top-0 z-30 border-b border-[#d7e7df] bg-[#fbfaf7]/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
        <a href="/" className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-[#1686d9] text-xl font-bold text-white">L</span><span><strong className="block text-lg">LaBelle Dental Clinic</strong><small className="text-[#607772]">Hygiene, quality and service</small></span></a>
        <nav className="hidden gap-7 text-sm font-semibold md:flex"><a href="#services">Services</a><a href="#reviews">Reviews</a><a href="#appointments">Appointments</a><a href="#front-desk">Ask LaBelle</a><a href="#about">Contact</a></nav>
        <a href="tel:+855236767897" className="rounded-full bg-[#1686d9] px-5 py-3 text-sm font-semibold text-white">Call clinic</a>
      </div>
    </header>

    <section className="relative overflow-hidden bg-[#eef5f1]">
      <img src="https://harbor-dental-ai-front-desk.blond-titan-1971.chatgpt.site/harbor-dental-hero.png" alt="Dentist speaking with a patient" className="absolute inset-0 h-full w-full object-cover object-[65%_center]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#eef5f1_0%,rgba(238,245,241,.96)_42%,rgba(238,245,241,.08)_78%)]" />
      <div className="relative mx-auto flex min-h-[650px] max-w-7xl items-center px-5 py-16"><div className="max-w-xl"><p className="mb-5 text-sm font-bold uppercase tracking-[.16em] text-[#1686d9]">Serving Phnom Penh</p><h1 className="text-6xl font-semibold leading-[.92] tracking-[-.055em] sm:text-8xl">Healthy smiles.<br/><em className="text-[#1686d9]">Warm welcome.</em></h1><p className="mt-7 max-w-lg text-lg leading-8 text-[#405c58]">Trusted dental care in Daun Penh, with a multilingual front desk ready to help patients quickly.</p><div className="mt-8 flex flex-wrap gap-3"><a href="#appointments" className="inline-flex items-center gap-2 rounded-full bg-[#1686d9] px-6 py-3.5 font-semibold text-white"><CalendarDays className="size-5"/> Request appointment</a><button onClick={() => setChatOpen(true)} className="inline-flex items-center gap-2 rounded-full border border-[#1686d9]/30 bg-white px-6 py-3.5 font-semibold"><MessageCircle className="size-5"/> Ask LaBelle</button></div></div></div>
    </section>

    <section id="services" className="mx-auto max-w-7xl px-5 py-24"><h2 className="max-w-3xl text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Dental care starts with the right questions.</h2><p className="mt-4 max-w-2xl leading-7 text-[#607772]">Ask about treatment, previous dental work or records. LaBelle’s team confirms availability, suitability and pricing.</p><div className="mt-10 grid border-y border-[#d7e7df] md:grid-cols-2 lg:grid-cols-3">{services.map(([title,text]) => <article key={title} className="border-b border-[#d7e7df] p-6"><h3 className="text-xl font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#607772]">{text}</p></article>)}</div></section>

    <section id="reviews" className="bg-white px-5 py-24"><div className="mx-auto max-w-7xl"><div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr]"><div><p className="text-sm font-bold uppercase tracking-[.16em] text-[#1686d9]">Patient reviews</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Care people recommend.</h2><div className="mt-6 flex items-center gap-3"><strong className="text-4xl">4.5</strong><div><div className="flex text-[#f3b61f]">{[1,2,3,4,5].map(n=><Star key={n} className="size-5 fill-current"/>)}</div><p className="mt-1 text-sm text-[#607772]">50+ publicly listed reviews</p></div></div></div><div className="grid gap-4 sm:grid-cols-2"><article className="rounded-3xl border border-[#d7e7df] bg-[#fbfaf7] p-6"><div className="flex text-[#f3b61f]">{[1,2,3,4,5].map(n=><Star key={n} className="size-4 fill-current"/>)}</div><blockquote className="mt-5 text-lg leading-8">“Good dental services” from a patient who reports visiting LaBelle for about 15 years.</blockquote><p className="mt-5 text-sm font-semibold">Long-term patient · Cambodia Expats Online</p><a href="https://cambodiaexpatsonline.com/ask-the-expats-questions-answers/reasonably-priced-dentist-t60056-10.html" target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-semibold text-[#1686d9]">Read the public comment →</a></article><article className="rounded-3xl border border-[#d7e7df] bg-[#fbfaf7] p-6"><div className="flex text-[#f3b61f]">{[1,2,3,4,5].map(n=><Star key={n} className="size-4 fill-current"/>)}</div><blockquote className="mt-5 text-lg leading-8">A recent recommendation describes LaBelle as good quality, friendly and more affordable than premium alternatives.</blockquote><p className="mt-5 text-sm font-semibold">Phnom Penh patient recommendation · Reddit</p><a href="https://www.reddit.com/r/cambodia/comments/1vlprtx/dentist_recommendation_and_price/" target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-semibold text-[#1686d9]">Read the discussion →</a></article></div></div><p className="mt-8 text-xs text-[#607772]">Public review information is independently sourced and should be confirmed by LaBelle before production launch.</p></div></section>

    <section id="appointments" className="bg-[#eef5f1] px-5 py-24"><div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2"><div><h2 className="text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Request a preferred visit time.</h2><p className="mt-5 text-lg leading-8 text-[#607772]">No login is required. LaBelle confirms every appointment by phone.</p></div><form onSubmit={(e)=>{e.preventDefault();setRequested(true)}} className="rounded-3xl border border-[#d7e7df] bg-white p-7 shadow-xl"><label className="grid gap-2 text-sm font-semibold">Service<select className="h-12 rounded-xl border px-3"><option>Checkup & cleaning</option><option>Orthodontics consultation</option><option>Dental implant consultation</option><option>Tooth pain or broken tooth</option></select></label><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-sm font-semibold">Preferred date<input required type="date" className="h-12 rounded-xl border px-3"/></label><label className="grid gap-2 text-sm font-semibold">Preferred time<select className="h-12 rounded-xl border px-3"><option>8:30 AM</option><option>10:00 AM</option><option>2:00 PM</option><option>5:00 PM</option></select></label><label className="grid gap-2 text-sm font-semibold">Name<input required className="h-12 rounded-xl border px-3"/></label><label className="grid gap-2 text-sm font-semibold">Phone or Telegram<input required className="h-12 rounded-xl border px-3"/></label></div><button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1686d9] px-5 py-3.5 font-semibold text-white">Request this time <ArrowRight className="size-4"/></button>{requested && <p className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">Your demo request is prepared. LaBelle would call to confirm; no real appointment was created.</p>}</form></div></section>

    <section id="front-desk" className="bg-[#103d6a] px-5 py-24 text-white"><div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2"><div><h2 className="text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Ask LaBelle before your visit.</h2><p className="mt-5 text-lg leading-8 text-white/70">The front desk answers approved questions, asks about previous treatment and helps prepare a useful appointment request without diagnosing.</p></div><div className="rounded-3xl bg-white p-6 text-[#123f3b]"><div className="rounded-2xl rounded-tl-sm bg-[#eef5f1] p-4 text-sm leading-6">{answer}</div><div className="mt-5 flex flex-wrap gap-2">{["What services do you offer?","I have X-rays","I have tooth pain","Book an appointment"].map(x=><button key={x} onClick={()=>ask(x)} className="rounded-full border px-3 py-2 text-xs">{x}</button>)}</div><form onSubmit={(e)=>{e.preventDefault();ask()}} className="mt-5 flex rounded-full border p-1.5"><input value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Ask LaBelle…" className="min-w-0 flex-1 bg-transparent px-3 outline-none"/><button aria-label="Send" className="grid size-10 place-items-center rounded-full bg-[#1686d9] text-white"><Send className="size-4"/></button></form></div></div></section>

    <section id="about" className="mx-auto grid max-w-6xl gap-10 px-5 py-24 lg:grid-cols-2"><img src="https://harbor-dental-ai-front-desk.blond-titan-1971.chatgpt.site/labelle-clinic.jpg" alt="LaBelle Dental Clinic storefront" className="h-[420px] w-full rounded-3xl object-cover"/><div className="self-center"><h2 className="text-4xl font-semibold tracking-[-.04em]">Dental care in the heart of Phnom Penh.</h2><p className="mt-5 text-lg leading-8 text-[#607772]">#77 Street 110, Sangkat Wat Phnom, Khan Daun Penh, Phnom Penh</p><p className="mt-4 font-semibold">092 96 31 94 · 023 67 67 897</p><p className="mt-6 text-xs text-[#607772]">Public information requires clinic verification before production use.</p></div></section>
    <footer className="border-t border-[#d7e7df] px-5 py-10 text-center text-sm text-[#607772]">LaBelle Dental Clinic · #77 Street 110, Phnom Penh</footer>

    <button onClick={() => setChatOpen(true)} className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#1686d9] px-5 py-3.5 font-semibold text-white shadow-2xl"><MessageCircle className="size-5"/> Ask LaBelle</button>
    {chatOpen && <div className="fixed inset-0 z-50 grid place-items-end bg-black/30 p-4 sm:place-items-center"><div className="w-full max-w-md rounded-3xl bg-white p-6"><div className="flex justify-between"><div><small className="font-bold uppercase tracking-wider text-[#1686d9]">LaBelle Front Desk</small><h2 className="mt-1 text-2xl font-semibold">How can we help?</h2></div><button onClick={()=>setChatOpen(false)} aria-label="Close" className="grid size-9 place-items-center rounded-full border"><X className="size-4"/></button></div><div className="mt-6 grid gap-3"><a href="#appointments" onClick={()=>setChatOpen(false)} className="rounded-2xl border p-4 font-semibold">Choose an appointment time</a><a href="#front-desk" onClick={()=>setChatOpen(false)} className="rounded-2xl border p-4 font-semibold">Ask a clinic question</a><a href="tel:+855236767897" className="flex items-center gap-2 rounded-2xl border p-4 font-semibold"><Phone className="size-5"/> Call LaBelle Dental Clinic</a></div></div></div>}
  </main>;
}