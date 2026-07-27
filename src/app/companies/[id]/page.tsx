import type { Metadata } from "next";
import { cache } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { JobCard } from "@/components/JobCard";
import { initials } from "@/lib/format";
import {
  ArrowLeftIcon,
  BriefcaseIcon,
  BuildingIcon,
  CheckCircleIcon,
  ExternalLinkIcon,
  MapPinIcon,
  SparklesIcon,
  UsersIcon,
} from "@/components/Icons";

export const dynamic = "force-dynamic";

const getCompany = cache(async (slug: string) =>
  prisma.company.findUnique({
    where: { slug },
    include: { jobs: { include: { company: true }, orderBy: { createdAt: "desc" } } },
  })
);

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const company = await getCompany(params.id);
  if (!company) return { title: "Company not found" };
  const title = `${company.name} careers`;
  const description = `Explore open roles, company details, and work opportunities at ${company.name}.`;
  const url = `/companies/${company.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
  };
}

export default async function CompanyPage({ params }: { params: { id: string } }) {
  const company = await getCompany(params.id);
  if (!company) notFound();

  const remoteRoles = company.jobs.filter((job) => job.workMode === "REMOTE").length;
  const skillCount = new Set(company.jobs.flatMap((job) => job.tags)).size;

  return (
    <>
      <section className="relative overflow-hidden bg-midnight py-12 text-white sm:py-16">
        <div className="hero-grid absolute inset-0 opacity-45" />
        <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-accent/20 blur-[100px]" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <Link href="/companies" className="focus-ring inline-flex items-center gap-2 rounded-lg text-sm font-bold text-white/60 transition hover:text-white"><ArrowLeftIcon size={17} /> Back to companies</Link>
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
            <span className="grid h-24 w-24 shrink-0 place-items-center rounded-3xl text-3xl font-extrabold text-white shadow-2xl" style={{ backgroundColor: company.logoColor }}>{initials(company.name)}</span>
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-white/55"><BuildingIcon size={17} /> Company profile <CheckCircleIcon size={16} className="text-accent" /></div>
              <h1 className="mt-2 font-display text-4xl font-extrabold tracking-[-.04em] sm:text-5xl">{company.name}</h1>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm font-semibold text-white/65">
                {company.location && <span className="inline-flex items-center gap-2"><MapPinIcon size={17} /> {company.location}</span>}
                <span className="inline-flex items-center gap-2"><BriefcaseIcon size={17} /> {company.jobs.length} open {company.jobs.length === 1 ? "role" : "roles"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[minmax(0,1fr)_330px] lg:px-8 lg:py-14">
        <main>
          <section className="rounded-xl3 border border-line bg-surface p-6 shadow-card sm:p-8">
            <p className="text-xs font-extrabold uppercase tracking-[.16em] text-brand">About the company</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight">Building meaningful products with talented people</h2>
            <p className="mt-5 text-[15px] leading-7 text-ink-soft">{company.about || `${company.name} is a growing organization focused on building useful products, solving meaningful problems, and creating an environment where talented people can do their best work.`}</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <CompanyStat icon={<BriefcaseIcon size={19} />} value={String(company.jobs.length)} label="Open roles" />
              <CompanyStat icon={<UsersIcon size={19} />} value={String(remoteRoles)} label="Remote roles" />
              <CompanyStat icon={<SparklesIcon size={19} />} value={String(skillCount)} label="Skills hiring" />
            </div>
            {company.website && <a href={company.website} target="_blank" rel="noopener noreferrer" className="focus-ring mt-7 inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-extrabold text-brand transition hover:border-brand/25 hover:bg-brand-light">Visit company website <ExternalLinkIcon size={16} /></a>}
          </section>

          <section id="open-roles" className="mt-9 scroll-mt-28">
            <div><p className="text-xs font-extrabold uppercase tracking-[.16em] text-accent-dark">Join the team</p><h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight">Open opportunities at {company.name}</h2><p className="mt-2 text-sm text-ink-muted">Browse every currently active listing from this employer.</p></div>
            {company.jobs.length === 0 ? (
              <div className="mt-6 rounded-xl3 border border-dashed border-line bg-surface px-6 py-14 text-center shadow-card"><h3 className="font-display text-lg font-extrabold">No roles are open right now</h3><p className="mt-2 text-sm text-ink-muted">Check back soon for new opportunities from {company.name}.</p></div>
            ) : (
              <div className="mt-6 grid gap-4">{company.jobs.map((job, index) => <JobCard key={job.id} job={job} featured={index === 0} />)}</div>
            )}
          </section>
        </main>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl3 border border-line bg-surface p-6 shadow-card">
            <p className="text-xs font-extrabold uppercase tracking-[.15em] text-brand">Company snapshot</p>
            <dl className="mt-5 space-y-4">
              <Snapshot label="Headquarters" value={company.location || "Global"} />
              <Snapshot label="Open positions" value={String(company.jobs.length)} />
              <Snapshot label="Work flexibility" value={remoteRoles > 0 ? "Remote-friendly" : "Location-based"} />
              <Snapshot label="Profile status" value="Verified employer" accent />
            </dl>
          </div>
          <div className="overflow-hidden rounded-xl3 bg-gradient-to-br from-brand to-[#34426f] p-6 text-white shadow-glow">
            <SparklesIcon size={22} className="text-[#B9B1FF]" />
            <h3 className="mt-5 font-display text-xl font-extrabold">See something that fits?</h3>
            <p className="mt-2 text-sm leading-6 text-white/68">Open the role, review the details, save it for later, or apply directly.</p>
            <Link href="#open-roles" className="focus-ring mt-5 inline-flex rounded-xl bg-surface px-4 py-2.5 text-sm font-extrabold text-midnight">Explore roles</Link>
          </div>
        </aside>
      </div>
    </>
  );
}

function CompanyStat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return <div className="rounded-xl2 bg-paper p-4"><span className="text-brand">{icon}</span><p className="mt-3 font-display text-xl font-extrabold">{value}</p><p className="text-xs font-semibold text-ink-muted">{label}</p></div>;
}

function Snapshot({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return <div className="flex items-center justify-between gap-3 border-b border-line pb-4 last:border-0 last:pb-0"><dt className="text-sm font-semibold text-ink-muted">{label}</dt><dd className={`text-right text-sm font-extrabold ${accent ? "text-accent-dark" : "text-ink"}`}>{value}</dd></div>;
}