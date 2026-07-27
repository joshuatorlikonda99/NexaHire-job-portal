import Link from "next/link";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  ShieldIcon,
  SparklesIcon,
} from "@/components/Icons";
import { NewsletterForm } from "@/components/NewsletterForm";

export function Footer() {
  return (
    <footer className="mt-24 bg-midnight text-white">
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <div className="relative overflow-hidden rounded-xl3 border border-white/10 bg-gradient-to-br from-brand via-[#5144bf] to-[#243366] px-6 py-9 shadow-glow sm:px-10 lg:flex lg:items-center lg:justify-between">
          <div className="absolute -right-14 -top-24 h-56 w-56 rounded-full bg-accent/30 blur-3xl" />
          <div className="relative max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[.16em] text-white/85"><SparklesIcon size={14} /> Build your team faster</div>
            <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">Great candidates are already looking.</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/72 sm:text-base">Publish your opportunity in minutes and reach focused candidates across engineering, product, design, data, and business.</p>
          </div>
          <Link href="/jobs/new" className="focus-ring relative mt-6 inline-flex items-center gap-2 rounded-xl bg-[#fff] px-5 py-3 text-sm font-bold text-midnight shadow-lg transition hover:-translate-y-0.5 lg:mt-0">Post a job <ArrowRightIcon size={18} /></Link>
        </div>

        <div className="grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr_1.15fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3 rounded-xl">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#fff] text-brand"><BriefcaseIcon size={20} /></span>
              <span className="font-display text-xl font-extrabold">NexaHire</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/55">A modern talent marketplace designed to make discovering meaningful work feel faster, clearer, and more human.</p>
            <div className="mt-5 flex items-center gap-2 text-xs text-white/45"><ShieldIcon size={16} /> Verified listings and privacy-first browsing</div>
          </div>

          <FooterColumn
            title="For talent"
            links={[
              ["Browse jobs", "/jobs"],
              ["Saved jobs", "/saved"],
              ["Remote roles", "/jobs?mode=REMOTE#job-results"],
              ["Internships", "/jobs?type=INTERNSHIP#job-results"],
            ]}
          />

          <FooterColumn
            title="For employers"
            links={[
              ["Post a job", "/jobs/new"],
              ["Hiring guide", "/#career-resources"],
              ["Explore companies", "/companies"],
              ["Contact support", "mailto:hello@nexahire.example"],
            ]}
          />

          <div>
            <h3 className="text-sm font-bold">Stay in the loop</h3>
            <p className="mt-3 text-sm leading-6 text-white/55">Weekly role drops and practical career insights.</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-white/42 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} NexaHire. Built for ambitious careers.</p>
          <p>Next.js · React · Prisma · MongoDB</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h3 className="text-sm font-bold">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link href={href} className="text-sm text-white/55 transition hover:text-white">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
