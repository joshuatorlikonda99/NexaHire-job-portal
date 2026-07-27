import type { Metadata } from "next";
import Link from "next/link";
import { SavedJobsList } from "@/components/SavedJobsList";
import { ArrowLeftIcon, BookmarkIcon } from "@/components/Icons";

export const metadata: Metadata = { title: "Saved jobs", description: "Review opportunities saved on this device." };

export default function SavedJobsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-midnight py-12 text-white sm:py-16">
        <div className="hero-grid absolute inset-0 opacity-45" />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-brand/25 blur-[90px]" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <Link href="/" className="focus-ring inline-flex items-center gap-2 rounded-lg text-sm font-bold text-white/60 transition hover:text-white"><ArrowLeftIcon size={17} /> Back to jobs</Link>
          <div className="mt-8 flex items-center gap-4"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-[#B9B1FF]"><BookmarkIcon size={25} /></span><div><p className="text-xs font-extrabold uppercase tracking-[.16em] text-white/45">Your opportunity shortlist</p><h1 className="mt-1 font-display text-4xl font-extrabold tracking-[-.04em] sm:text-5xl">Saved jobs</h1></div></div>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/62">Keep promising opportunities in one place. Saved roles stay on this device and can be removed at any time.</p>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-5 py-10 lg:px-8 lg:py-14"><SavedJobsList /></section>
    </>
  );
}