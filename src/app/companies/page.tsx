import type { Metadata } from "next";
import { prisma, withPrismaFallback } from "@/lib/prisma";
import { CompanyCard } from "@/components/CompanyCard";
import { BuildingIcon, CheckCircleIcon, SparklesIcon } from "@/components/Icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Companies",
  description: "Explore verified companies, their culture, locations, and current job opportunities.",
  alternates: { canonical: "/companies" },
  openGraph: {
    title: "Companies hiring on NexaHire",
    description: "Explore verified employers and their open opportunities.",
    url: "/companies",
  },
};

export default async function CompaniesPage() {
  const companies = await withPrismaFallback(
    () =>
      prisma.company.findMany({
        include: { _count: { select: { jobs: true } } },
        orderBy: [{ createdAt: "desc" }, { name: "asc" }],
      }),
    [],
    "companies directory",
  );

  return (
    <>
      <section className="relative overflow-hidden bg-midnight py-16 text-white sm:py-20">
        <div className="hero-grid absolute inset-0 opacity-55" />
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-brand/30 blur-[90px]" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-accent/20 blur-[100px]" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/7 px-3.5 py-1.5 text-xs font-bold text-white/80">
            <SparklesIcon size={15} className="text-[#A99EFF]" /> Verified employer directory
          </div>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-extrabold tracking-[-.045em] sm:text-6xl">Meet teams doing work worth joining.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/64 sm:text-lg">Compare company missions, locations, work flexibility, and every currently open opportunity in one clear directory.</p>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-white/65">
            <span className="inline-flex items-center gap-2"><CheckCircleIcon size={18} className="text-accent" /> Verified profiles</span>
            <span className="inline-flex items-center gap-2"><BuildingIcon size={18} className="text-accent" /> {companies.length} growing teams</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
        <div className="flex items-end justify-between gap-4 border-b border-line pb-6">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[.16em] text-brand">Company directory</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink">Explore every hiring company</h2>
          </div>
          <p className="hidden text-sm font-semibold text-ink-muted sm:block">{companies.length} profiles</p>
        </div>
        {companies.length ? (
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => <CompanyCard key={company.id} company={company} />)}
          </div>
        ) : (
          <div className="mt-7 rounded-3xl border border-dashed border-line bg-surface px-6 py-16 text-center shadow-card">
            <h2 className="font-display text-xl font-extrabold">No company profiles yet</h2>
            <p className="mt-2 text-sm text-ink-muted">Published employers will appear here automatically.</p>
          </div>
        )}
      </section>
    </>
  );
}
