import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, CalendarDays, Check, MessageCircle, Megaphone, MonitorSmartphone, Send, Sparkles } from "lucide-react";
import { answerDentalQuestion } from "../lib/dentalChatbot";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Dental AI Front Desk | Website, Chat, Booking & Promotions" },
    { name: "description", content: "A live demo of an AI front desk for dental practices: website, chat, appointment requests and patient promotions." },
  ] }),
  component: SalesDemo,
});

const offers = [
  { icon: MonitorSmartphone, title: "Need a better website?", text: "We can rebuild or improve your dental website for mobile, SEO and conversion." },
  { icon: MessageCircle, title: "Need an AI chatbox?", text: "Give patients immediate answers from your approved practice information, 24/7." },
  { icon: CalendarDays, title: "Need appointments?", text: "Capture booking requests, qualify the visit and connect to your scheduling workflow." },
  { icon: Megaphone, title: "Need promotions?", text: "Turn services, offers and reminders into useful patient campaigns without adding front-desk work." },
];

const demoQuestions = [
  "Can you improve my dental website?",
  "How would your chatbot work for my practice?",
  "Can patients book appointments through it?",
  "Can you help promote implants or whitening?",
];

function SalesDemo() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("Hi — I’m the Dental AI demo. Ask me how we can improve your website, answer patients, book appointments or promote your services.");

  function ask(next = question) {
    const q = next.trim();
    if (!q) return;
    const lower = q.toLowerCase();
    let response = "We can tailor the system to your practice. The first step is to review your current website, patient questions and appointment workflow, then build a demo using your own information.";
    if (lower.includes("website")) response = "Yes. We can audit your existing dental website, improve the design and mobile experience, strengthen local SEO/AEO, and connect the site directly to the AI front desk.";
    else if (lower.includes("chat") || lower.includes("bot")) response = "The chatbox is trained on your verified practice information. It can answer common patient questions, collect lead details, guide appointment requests and hand off to staff when needed.";
    else if (lower.includes("book") || lower.includes("appointment") || lower.includes("schedule")) response = "Yes. We can collect the service, preferred date/time and patient contact details, then connect the workflow to your calendar or practice-management system. Final booking rules stay deterministic.";
    else if (lower.includes("promot") || lower.includes("implant") || lower.includes("whitening") || lower.includes("marketing")) response = "Yes. We can build service pages, promotions and follow-up campaigns around treatments you want to grow, while the chatbot answers questions and turns interest into appointment requests.";
    else if (lower.includes("cost") || lower.includes("price")) response = "Pricing depends on what you need: website improvement, AI chat, appointment automation, voice receptionist and ongoing marketing can be packaged separately or together. We can start with a simple pilot around your practice.";
    else {
      const dental = answerDentalQuestion(q);
      if (dental?.answer && !dental.answer.toLowerCase().includes("don't know")) response = dental.answer;
    }
    setAnswer(response);
    setQuestion("");
  }

  return <main className="min-h-screen bg-[#f7f9ff] text-[#181c20]">
    <header className="border-b border-[#dfe5ec] bg-white">
      <div className="mx-auto flex min-h-16 max-w-[1200px] items-center justify-between gap-4 px-4 md:px-8">
        <div><strong className="font-display text-xl text-[#006098]">Dental AI Front Desk</strong><span className="ml-3 hidden text-sm text-[#66717d] sm:inline">Live sales demo for dental practices</span></div>
        <button onClick={() => document.getElementById("ask-us")?.scrollIntoView({ behavior: "smooth" })} className="rounded-lg bg-[#006098] px-4 py-2.5 text-sm font-semibold text-white">Ask us</button>
      </div>
    </header>

    <section className="relative overflow-hidden border-b border-[#dfe5ec] bg-white">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-4 py-16 md:px-8 lg:grid-cols-[1fr_.9fr] lg:py-24">
        <div><p className="mb-4 text-sm font-bold uppercase tracking-[.18em] text-[#006098]">Built for independent dental practices</p><h1 className="font-display text-5xl font-bold leading-[1.02] tracking-[-.04em] sm:text-6xl">Your website should do more than look good.</h1><p className="mt-6 max-w-2xl text-xl leading-8 text-[#4a5661]">Turn it into a 24/7 front desk that answers patients, captures appointments and helps sell the services you want to grow.</p><div className="mt-8 grid gap-3 sm:grid-cols-2">{["Website improvement","AI patient chat","Appointment capture","Promotions & follow-up"].map(item => <div key={item} className="flex items-center gap-2 text-sm font-semibold"><span className="grid size-6 place-items-center rounded-full bg-[#eaf5fb] text-[#006098]"><Check className="size-4"/></span>{item}</div>)}</div></div>

        <div id="ask-us" className="relative">
          <div className="sales-pointer pointer-events-none absolute -left-28 top-14 hidden items-center gap-3 lg:flex"><div className="rounded-full bg-[#fff4d8] px-4 py-2 text-sm font-bold text-[#7a5300] shadow-lg">Try the system →</div><ArrowRight className="pointer-icon size-9 text-[#006098]" /></div>
          <div className="rounded-3xl border border-[#cfdde8] bg-white p-5 shadow-[0_24px_70px_rgba(44,80,112,.16)] md:p-6">
            <div className="mb-5 flex items-center gap-3 border-b border-[#e6edf2] pb-4"><span className="grid size-11 place-items-center rounded-full bg-[#006098] text-white"><Sparkles className="size-5"/></span><div><strong className="block">Ask Dental AI</strong><small className="text-[#69747e]">Test the same experience your patients could use</small></div></div>
            <div className="min-h-28 rounded-2xl bg-[#f4f9fc] p-4 text-sm leading-6">{answer}</div>
            <div className="mt-4 flex flex-wrap gap-2">{demoQuestions.map(q => <button key={q} onClick={() => ask(q)} className="rounded-full border border-[#d6e1e9] bg-white px-3 py-2 text-xs font-medium text-[#006098] hover:bg-[#f4f9fc]">{q}</button>)}</div>
            <form onSubmit={e => { e.preventDefault(); ask(); }} className="mt-4 flex gap-2 rounded-xl border border-[#cfdde8] bg-white p-2"><input value={question} onChange={e => setQuestion(e.target.value)} placeholder="Ask about your dental practice…" className="min-w-0 flex-1 bg-transparent px-2 text-sm outline-none"/><button aria-label="Send" className="grid size-10 place-items-center rounded-lg bg-[#006098] text-white"><Send className="size-4"/></button></form>
            <p className="mt-3 text-center text-xs text-[#69747e]">Ask about your website, chatbot, appointments, promotions or pricing.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-[1200px] px-4 py-16 md:px-8 md:py-24"><div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[.18em] text-[#006098]">What do you need?</p><h2 className="mt-3 font-display text-4xl font-bold tracking-[-.03em]">One system, four immediate business problems.</h2></div><div className="mt-10 grid gap-5 md:grid-cols-2">{offers.map(({icon:Icon,title,text}) => <button key={title} onClick={() => { setQuestion(title); document.getElementById("ask-us")?.scrollIntoView({behavior:"smooth"}); }} className="group rounded-2xl border border-[#dfe5ec] bg-white p-6 text-left shadow-[0_4px_24px_rgba(41,72,107,.05)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(41,72,107,.11)]"><span className="grid size-12 place-items-center rounded-xl bg-[#eef7fb] text-[#006098]"><Icon className="size-6"/></span><h3 className="mt-5 font-display text-2xl font-semibold">{title}</h3><p className="mt-2 leading-7 text-[#5a6670]">{text}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#006098]">Ask the demo <ArrowRight className="size-4 transition group-hover:translate-x-1"/></span></button>)}</div></section>

    <section className="bg-[#071f3d] px-4 py-16 text-white md:px-8 md:py-20"><div className="mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center"><div><p className="text-sm font-bold uppercase tracking-[.18em] text-[#8dc9ef]">The point of this demo</p><h2 className="mt-3 font-display text-4xl font-bold tracking-[-.03em]">Don’t just read about our service. Use it.</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">A dentist can ask the chatbot questions about the service while simultaneously experiencing how an AI front desk feels to a patient. That interaction is the sales presentation.</p></div><button onClick={() => document.getElementById("ask-us")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-[#006098]">Ask us about your practice <ArrowRight className="size-5"/></button></div></section>

    <footer className="bg-white px-4 py-8 text-center text-sm text-[#69747e]">Dental AI Front Desk · Website · Chat · Booking · Promotions</footer>
    <button onClick={() => document.getElementById("ask-us")?.scrollIntoView({ behavior: "smooth" })} className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#006098] px-5 py-3.5 font-semibold text-white shadow-2xl"><MessageCircle className="size-5"/> Ask us</button>
  </main>;
}
