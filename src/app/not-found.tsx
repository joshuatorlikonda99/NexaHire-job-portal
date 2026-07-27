import Link from "next/link";
import { ArrowLeftIcon, BriefcaseIcon } from "@/components/Icons";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-light text-brand"><BriefcaseIcon size={28} /></span>
      <p className="mt-6 font-mono text-xs font-extrabold uppercase tracking-[.22em] text-brand">404 · Opportunity unavailable</p>
      <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">This page has moved on</h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink-muted">The role or company may have been filled, removed, or the link may be incorrect.</p>
      <Link href="/" className="focus-ring mt-7 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-brand/20"><ArrowLeftIcon size={17} /> Back to job search</Link>
    </div>
  );
}