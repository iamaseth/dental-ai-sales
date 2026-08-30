import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Clipboard, Download, Mail, Search, ShieldAlert, Upload } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Dental AI Sales CRM" }] }),
  component: Admin,
});

type Tab = "prospects" | "research" | "import" | "campaigns" | "queue";
type Prospect = { name: string; location: string; stage: string; source: string; score?: number; email?: string };

const demoProspects: Prospect[] = [];
const tabs: { id: Tab; label: string }[] = [
  { id: "prospects", label: "Prospects" },
  { id: "research", label: "AI Research" },
  { id: "import", label: "Import" },
  { id: "campaigns", label: "Campaigns" },
  { id: "queue", label: "Email Queue" },
];

const sources = ["ChatGPT", "Perplexity", "Google Maps", "CSV", "Manual"];

function buildResearchPrompt(city: string, state: string, count: string) {
  return `Find up to ${count || "25"} independent dental practices in ${city || "the selected city"}${state ? `, ${state}` : ""} that could be prospects for an AI front desk and website improvement service.\n\nReturn ONLY a JSON array. Do not add markdown or commentary. Do not invent missing information. Use null when not verified. Each object must use these keys:\npractice_name, website, domain, phone, email, address, city, state, postal_code, google_rating, google_reviews, contact_name, contact_title, source_url, notes.\n\nPrefer independent/local practices rather than large national chains. Preserve a source URL for verification. If a field is inferred rather than directly supported, leave it null.`;
}

function Admin() {
  const [tab, setTab] = useState<Tab>("prospects");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [count, setCount] = useState("25");
  const [paste, setPaste] = useState("");
  const [message, setMessage] = useState("");
  const [outbound, setOutbound] = useState(false);
  const prompt = useMemo(() => buildResearchPrompt(city, state, count), [city, state, count]);

  async function copyPrompt(provider: string) {
    await navigator.clipboard.writeText(prompt);
    setMessage(`${provider} research prompt copied.`);
  }

  function validatePaste() {
    try {
      const parsed = JSON.parse(paste);
      if (!Array.isArray(parsed)) throw new Error("Expected an array");
      const valid = parsed.filter((x) => x && typeof x.practice_name === "string");
      setMessage(`${valid.length} records validated. Database import will activate after the reviewed CRM migration is applied.`);
    } catch {
      setMessage("Could not validate. Paste the JSON array returned by ChatGPT or Perplexity.");
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f7f6] text-[#123f3b]">
      <header className="border-b bg-white">
        <div className="mx-auto flex min-h-20 max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div><strong className="text-lg">Dental AI · Platform Admin</strong><small className="block text-[#607772]">Sales CRM · tenant data stays separate</small></div>
          <div className="flex items-center gap-3"><span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">Outbound OFF</span><Link to="/for-dentists" className="text-sm font-semibold text-[#1686d9]">Sales demo</Link></div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-8">
        <nav className="mb-7 flex gap-2 overflow-x-auto" aria-label="Sales CRM sections">
          {tabs.map((x) => <button key={x.id} onClick={() => setTab(x.id)} className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold ${tab === x.id ? "bg-[#123f3b] text-white" : "bg-white text-[#45635f]"}`}>{x.label}</button>)}
        </nav>

        {message && <div role="status" className="mb-5 rounded-xl border border-[#d8e3e0] bg-white px-4 py-3 text-sm">{message}</div>}

        {tab === "prospects" && <Prospects />}
        {tab === "research" && <Research city={city} state={state} count={count} paste={paste} setCity={setCity} setState={setState} setCount={setCount} setPaste={setPaste} copyPrompt={copyPrompt} validatePaste={validatePaste} />}
        {tab === "import" && <ImportPanel />}
        {tab === "campaigns" && <Campaigns />}
        {tab === "queue" && <Queue outbound={outbound} setOutbound={setOutbound} />}
      </section>
    </main>
  );
}

function Prospects() {
  return <><div className="grid gap-4 sm:grid-cols-4">{[["Prospects","0"],["Qualified","0"],["Replied","0"],["Demos","0"]].map(([a,b])=><div key={a} className="rounded-2xl bg-white p-5"><small className="text-[#607772]">{a}</small><strong className="mt-1 block text-3xl">{b}</strong></div>)}</div><div className="mt-6 rounded-2xl bg-white"><div className="flex flex-wrap items-center justify-between gap-3 border-b p-5"><div><h2 className="font-bold">Prospect pipeline</h2><p className="text-sm text-[#607772]">New → Researching → Qualified → Contacted → Replied → Demo → Proposal → Won/Lost</p></div><button className="rounded-xl bg-[#123f3b] px-4 py-2 text-sm font-semibold text-white">+ Add manually</button></div>{demoProspects.length === 0 && <div className="p-10 text-center"><Search className="mx-auto mb-3 text-[#8aa09c]"/><strong>No prospects yet</strong><p className="mt-1 text-sm text-[#607772]">Use AI Research or Import to add the first practices.</p></div>}</div></>;
}

function Research(p: {city:string;state:string;count:string;paste:string;setCity:(v:string)=>void;setState:(v:string)=>void;setCount:(v:string)=>void;setPaste:(v:string)=>void;copyPrompt:(v:string)=>void;validatePaste:()=>void}) {
  return <div className="grid gap-6 lg:grid-cols-2"><div className="rounded-2xl bg-white p-6"><h2 className="text-xl font-bold">1. Create research prompt</h2><p className="mt-1 text-sm text-[#607772]">No API. Copy this task into ChatGPT or Perplexity.</p><div className="mt-5 grid gap-4 sm:grid-cols-2"><Field label="City" value={p.city} set={p.setCity} placeholder="Tampa"/><Field label="State" value={p.state} set={p.setState} placeholder="Florida"/><Field label="How many" value={p.count} set={p.setCount} placeholder="25"/></div><div className="mt-5 flex flex-wrap gap-3"><button onClick={()=>p.copyPrompt("ChatGPT")} className="rounded-xl bg-[#123f3b] px-4 py-3 text-sm font-semibold text-white"><Clipboard className="mr-2 inline h-4 w-4"/>Copy ChatGPT Prompt</button><button onClick={()=>p.copyPrompt("Perplexity")} className="rounded-xl border px-4 py-3 text-sm font-semibold"><Clipboard className="mr-2 inline h-4 w-4"/>Copy Perplexity Prompt</button></div></div><div className="rounded-2xl bg-white p-6"><h2 className="text-xl font-bold">2. Paste results</h2><p className="mt-1 text-sm text-[#607772]">Paste the JSON array. We validate before anything enters the CRM.</p><textarea value={p.paste} onChange={(e)=>p.setPaste(e.target.value)} className="mt-5 min-h-64 w-full rounded-xl border p-4 font-mono text-xs" placeholder='[{"practice_name":"..."}]'/><button onClick={p.validatePaste} className="mt-3 rounded-xl bg-[#1686d9] px-4 py-3 text-sm font-semibold text-white">Validate Results</button></div></div>;
}

function ImportPanel(){return <div className="rounded-2xl bg-white p-6"><Upload className="mb-3"/><h2 className="text-xl font-bold">Import prospects</h2><p className="mt-1 max-w-2xl text-sm text-[#607772]">Google Maps/local scripts, OpenDirectories, DataForge and spreadsheets should all use the same CSV/JSON import contract. Imports will preview duplicates and rejected rows before saving.</p><div className="mt-5 rounded-xl border-2 border-dashed p-10 text-center"><Download className="mx-auto mb-2 text-[#8aa09c]"/><strong>CSV / JSON importer</strong><p className="mt-1 text-sm text-[#607772]">UI ready; database write activates after the reviewed migration.</p></div><div className="mt-5 flex flex-wrap gap-2">{sources.map(x=><span key={x} className="rounded-full bg-[#eef4f2] px-3 py-1 text-xs font-semibold">{x}</span>)}</div></div>}

function Campaigns(){return <div className="rounded-2xl bg-white p-6"><Mail className="mb-3"/><h2 className="text-xl font-bold">Campaigns</h2><p className="mt-1 text-sm text-[#607772]">Qualified prospects can be staged here before entering the outbound queue. Discovery never authorizes sending automatically.</p><div className="mt-6 rounded-xl border p-8 text-center text-sm text-[#607772]">No campaigns yet.</div></div>}

function Queue({outbound,setOutbound}:{outbound:boolean;setOutbound:(v:boolean)=>void}){return <div className="rounded-2xl bg-white p-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><ShieldAlert className="mb-3"/><h2 className="text-xl font-bold">Email Queue Safety</h2><p className="mt-1 text-sm text-[#607772]">Minimum spacing: 60 seconds · suppression checked · duplicate recipient blocked.</p></div><button onClick={()=>setOutbound(!outbound)} className={`rounded-xl px-4 py-3 text-sm font-bold ${outbound?"bg-red-600 text-white":"bg-[#123f3b] text-white"}`}>{outbound?"STOP ALL OUTBOUND":"Outbound remains OFF"}</button></div><div className="mt-6 grid gap-3 sm:grid-cols-3">{[["Queued","0"],["Sent today","0"],["Suppressed","0"]].map(([a,b])=><div key={a} className="rounded-xl bg-[#f4f7f6] p-4"><small>{a}</small><strong className="block text-2xl">{b}</strong></div>)}</div><p className="mt-5 text-xs text-[#607772]">This screen does not send email. A trusted server worker/provider must be configured and tested before outbound can be enabled.</p></div>}

function Field({label,value,set,placeholder}:{label:string;value:string;set:(v:string)=>void;placeholder:string}){return <label className="text-sm font-semibold">{label}<input value={value} onChange={(e)=>set(e.target.value)} placeholder={placeholder} className="mt-1 block w-full rounded-xl border px-3 py-2 font-normal"/></label>}
