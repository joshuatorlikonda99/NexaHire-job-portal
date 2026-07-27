import type { Metadata } from "next";
import Link from "next/link";
import { JobForm } from "@/components/JobForm";
import { ArrowLeftIcon, CheckCircleIcon, ShieldIcon, SparklesIcon, ZapIcon } from "@/components/Icons";

export const metadata: Metadata = { title: "Post an opportunity", description: "Publish a new role on NexaHire." };

export default function NewJobPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-midnight py-12 text-white sm:py-16">
        <div className="hero-grid absolute inset-0 opacity-50" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-brand/25 blur-[100px]" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <Link href="/" className="focus-ring inline-flex items-center gap-2 rounded-lg text-sm font-bold text-white/60 transition hover:text-white"><ArrowLeftIcon size={17} /> Back to jobs</Link>
          <div className="mt-8 max-w-3xl"><div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/7 px-3 py-1.5 text-xs font-bold text-white/75"><SparklesIcon size={15} /> Employer workspace</div><h1 className="mt-5 font-display text-4xl font-extrabold tracking-[-.04em] sm:text-5xl">Publish a role people want to join.</h1><p className="mt-4 max-w-2xl text-base leading-7 text-white/62">Create a clear, high-quality opportunity with transparent details. Your listing appears immediately in search and on your company profile.</p></div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8 lg:py-14">
        <JobForm />
        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl3 border border-line bg-surface p-6 shadow-card"><h2 className="font-display text-lg font-extrabold">A stronger listing gets stronger applicants</h2><div className="mt-5 space-y-4"><Tip icon={<CheckCircleIcon size={18} />} text="Use a specific, searchable role title." /><Tip icon={<ZapIcon size={18} />} text="Lead with impact and ownership." /><Tip icon={<ShieldIcon size={18} />} text="Include realistic salary information." /></div></div>
          <div className="rounded-xl3 bg-gradient-to-br from-brand to-[#34426f] p-6 text-white shadow-glow"><SparklesIcon size={21} className="text-[#B9B1FF]" /><h3 className="mt-5 font-display text-lg font-extrabold">Designed for clarity</h3><p className="mt-2 text-sm leading-6 text-white/65">Every field maps directly to filtering, search, and the opportunity detail page.</p></div>
        </aside>
      </div>
    </>
  );
}

function Tip({ icon, text }: { icon: React.ReactNode; text: string }) {
  return <div className="flex items-start gap-3 text-sm font-semibold leading-6 text-ink-soft"><span className="mt-0.5 shrink-0 text-accent-dark">{icon}</span>{text}</div>;
}