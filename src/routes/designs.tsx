import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Bot, Crown, LayoutTemplate } from "lucide-react";

export const Route = createFileRoute("/designs")({ component: Designs });

const designs = [
  { n: "01", title: "Original LaBelle", desc: "The current working LaBelle homepage, preserved as the baseline design.", href: "/", icon: LayoutTemplate, accent: "bg-[#0870c8]" },
  { n: "02", title: "Concierge LaBelle", desc: "Premium navy, gold and aqua presentation focused on cosmetic, implant and family dental care.", href: "/concierge", icon: Crown, accent: "bg-[#b88a35]" },
  { n: "03", title: "AI-First LaBelle", desc: "A modern practice website that makes the 24/7 AI front desk, booking and patient assistance the hero.", href: "/ai-first", icon: Bot, accent: "bg-[#0d7d88]" },
];

function Designs() {
  return <main className="min-h-screen bg-[#f6f8fb] px-6 py-14 text-[#0b2347]">
    <div className="mx-auto max-w-6xl">
      <p className="text-xs font-bold uppercase tracking-[.22em] text-[#b88a35]">LaBelle Dental · Homepage concepts</p>
      <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">Choose the direction that feels most like LaBelle.</h1>
      <p className="mt-4 max-w-2xl text-[#53657e]">Three distinct approaches using the same practice. Open each design to compare the patient experience.</p>
      <div className="mt-10 grid gap-5 md:grid-cols-3">{designs.map(d => { const Icon=d.icon; return <a key={d.n} href={d.href} className="group overflow-hidden rounded-2xl border border-[#dde5ee] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
        <div className={`${d.accent} flex h-36 items-center justify-between px-7 text-white`}><Icon className="size-12"/><span className="font-display text-5xl opacity-25">{d.n}</span></div>
        <div className="p-6"><h2 className="font-display text-2xl font-bold">{d.title}</h2><p className="mt-3 min-h-20 text-sm leading-6 text-[#607086]">{d.desc}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold">View design <ArrowRight className="size-4 transition group-hover:translate-x-1"/></span></div>
      </a>})}</div>
    </div>
  </main>;
}
