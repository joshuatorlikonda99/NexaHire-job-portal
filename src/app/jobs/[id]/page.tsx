import type { Metadata } from "next";
import { cache } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  EMPLOYMENT_LABELS,
  WORK_MODE_LABELS,
  formatSalary,
  initials,
  timeAgo,
} from "@/lib/format";
import { JobCard } from "@/components/JobCard";
import { SaveJobButton } from "@/components/SaveJobButton";
import { ShareJobButton } from "@/components/ShareJobButton";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  ClockIcon,
  MailIcon,
  MapPinIcon,
  ShieldIcon,
  WalletIcon,
} from "@/components/Icons";

export const dynamic = "force-dynamic";

type JobDetailPageProps = {
  params: {
    id: string;
  };
};

const getJob = cache(async (id: string) => {
  return prisma.job.findUnique({
    where: {
      id,
    },
    include: {
      company: true,
    },
  });
});

export async function generateMetadata({
  params,
}: JobDetailPageProps): Promise<Metadata> {
  const job = await getJob(params.id);

  if (!job) {
    return {
      title: "Opportunity not found",
    };
  }

  const title = `${job.title} at ${job.company.name}`;

  const description =
    `${job.title} opportunity at ${job.company.name} in ` +
    `${job.location}. Review salary, work mode, skills, and application details.`;

  const url = `/jobs/${job.id}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
    },
  };
}

export default async function JobDetailPage({
  params,
}: JobDetailPageProps) {
  const job = await getJob(params.id);

  if (!job) {
    notFound();
  }

  const relatedJobs = await prisma.job.findMany({
    where: {
      id: {
        not: job.id,
      },
      OR:
        job.tags.length > 0
          ? [
              {
                companyId: job.companyId,
              },
              {
                tags: {
                  hasSome: job.tags.slice(0, 2),
                },
              },
            ]
          : [
              {
                companyId: job.companyId,
              },
            ],
    },
    include: {
      company: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  const salary = formatSalary(
    job.salaryMin,
    job.salaryMax,
  );

  const mailSubject = encodeURIComponent(
    `Application: ${job.title} at ${job.company.name}`,
  );

  return (
    <>
      <section className="relative overflow-hidden bg-midnight py-12 text-white sm:py-16">
        <div className="hero-grid absolute inset-0 opacity-50" />

        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-brand/25 blur-[90px]" />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <Link
            href="/jobs"
            className="focus-ring inline-flex items-center gap-2 rounded-lg text-sm font-bold text-white/60 transition hover:text-white"
          >
            <ArrowLeftIcon size={17} />
            Back to jobs
          </Link>

          <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-start gap-5">
              <span
                className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-xl font-extrabold text-white shadow-xl sm:h-20 sm:w-20 sm:text-2xl"
                style={{
                  backgroundColor:
                    job.company.logoColor || "#6757E8",
                }}
                aria-hidden="true"
              >
                {initials(job.company.name)}
              </span>

              <div>
                <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-white/60">
                  <Link
                    href={`/companies/${job.company.slug}`}
                    className="transition hover:text-white"
                  >
                    {job.company.name}
                  </Link>

                  <CheckCircleIcon
                    size={16}
                    className="text-accent"
                  />

                  <span aria-hidden="true">·</span>

                  <span>
                    Posted {timeAgo(job.createdAt)}
                  </span>
                </div>

                <h1 className="text-balance mt-2 max-w-4xl font-display text-3xl font-extrabold leading-tight tracking-[-.035em] sm:text-5xl">
                  {job.title}
                </h1>

                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-white/70">
                  <span className="inline-flex items-center gap-2">
                    <MapPinIcon size={17} />
                    {job.location}
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <BriefcaseIcon size={17} />
                    {WORK_MODE_LABELS[job.workMode]}
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <ClockIcon size={17} />
                    {EMPLOYMENT_LABELS[job.employmentType]}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <ShareJobButton
                title={`${job.title} at ${job.company.name}`}
              />

              <SaveJobButton jobId={job.id} />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-8 lg:py-14">
        <article className="min-w-0 rounded-xl3 border border-line bg-surface p-6 text-ink shadow-card sm:p-9">
          <div className="grid gap-3 sm:grid-cols-3">
            <DetailStat
              icon={<WalletIcon size={19} />}
              label="Compensation"
              value={salary || "Competitive"}
            />

            <DetailStat
              icon={<BriefcaseIcon size={19} />}
              label="Employment"
              value={
                EMPLOYMENT_LABELS[
                  job.employmentType
                ]
              }
            />

            <DetailStat
              icon={<MapPinIcon size={19} />}
              label="Work mode"
              value={
                WORK_MODE_LABELS[job.workMode]
              }
            />
          </div>

          {job.tags.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-2">
              {job.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-brand/20 bg-brand/10 px-3 py-1.5 text-xs font-extrabold text-brand dark:border-brand/30 dark:bg-brand/15 dark:text-[#B9B1FF]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="my-8 h-px bg-line" />

          <section>
            <p className="text-xs font-extrabold uppercase tracking-[.16em] text-brand dark:text-[#A99EFF]">
              About the opportunity
            </p>

            <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink">
              Make an impact from day one
            </h2>

            <div className="prose-jobs mt-6 whitespace-pre-wrap text-[15px] leading-7 text-ink-soft">
              {job.description}
            </div>
          </section>

          <SafetyNotice />
        </article>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl3 border border-line bg-surface p-6 text-ink shadow-card">
            <p className="text-xs font-extrabold uppercase tracking-[.15em] text-brand dark:text-[#A99EFF]">
              Ready to apply?
            </p>

            <h2 className="mt-2 font-display text-xl font-extrabold tracking-tight text-ink">
              Take the next step
            </h2>

            <p className="mt-2 text-sm leading-6 text-ink-muted">
              Introduce yourself, share your resume, and
              mention why this role stands out.
            </p>

            <a
              href={`mailto:jobs@example.com?subject=${mailSubject}`}
              className="focus-ring mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 text-sm font-extrabold text-white shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-brand-dark"
            >
              <MailIcon size={18} />
              Apply for this role
            </a>

            <p className="mt-3 text-center text-[11px] font-semibold text-ink-muted">
              Your email app will open with the role
              pre-filled.
            </p>
          </div>

          <div className="rounded-xl3 border border-line bg-surface p-6 text-ink shadow-card">
            <div className="flex items-center gap-3">
              <span
                className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-base font-extrabold text-white"
                style={{
                  backgroundColor:
                    job.company.logoColor || "#6757E8",
                }}
                aria-hidden="true"
              >
                {initials(job.company.name)}
              </span>

              <div className="min-w-0">
                <p className="text-xs font-bold text-ink-muted">
                  Hiring company
                </p>

                <h3 className="truncate font-display font-extrabold text-ink">
                  {job.company.name}
                </h3>
              </div>
            </div>

            <p className="mt-4 line-clamp-4 text-sm leading-6 text-ink-muted">
              {job.company.about ||
                `${job.company.name} is growing its team and looking for talented people to help build the next chapter.`}
            </p>

            <Link
              href={`/companies/${job.company.slug}`}
              className="focus-ring mt-4 inline-flex items-center gap-2 rounded-lg text-sm font-extrabold text-brand transition hover:text-brand-dark dark:text-[#A99EFF] dark:hover:text-[#C8C2FF]"
            >
              View company profile
              <ArrowRightIcon size={16} />
            </Link>
          </div>
        </aside>
      </div>

      {relatedJobs.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pb-6 pt-4 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[.16em] text-brand dark:text-[#A99EFF]">
                Keep exploring
              </p>

              <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink">
                Similar opportunities
              </h2>
            </div>

            <Link
              href="/jobs"
              className="hidden items-center gap-2 text-sm font-extrabold text-brand transition hover:text-brand-dark dark:text-[#A99EFF] dark:hover:text-[#C8C2FF] sm:inline-flex"
            >
              Browse all jobs
              <ArrowRightIcon size={16} />
            </Link>
          </div>

          <div className="mt-6 grid gap-4">
            {relatedJobs.map((relatedJob) => (
              <JobCard
                key={relatedJob.id}
                job={relatedJob}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function SafetyNotice() {
  return (
    <section
      className={[
        "mt-9 rounded-xl2 border p-5",
        "border-accent/25 bg-accent/10",
        "dark:border-accent/35 dark:bg-accent/10",
      ].join(" ")}
      aria-labelledby="application-safety-title"
    >
      <div className="flex items-start gap-3">
        <span
          className={[
            "grid h-10 w-10 shrink-0 place-items-center rounded-xl",
            "border border-accent/15 bg-surface text-accent-dark",
            "dark:border-accent/25 dark:bg-midnight/70 dark:text-[#5EEAD4]",
          ].join(" ")}
          aria-hidden="true"
        >
          <ShieldIcon size={20} />
        </span>

        <div className="min-w-0">
          <h3
            id="application-safety-title"
            className="font-display font-extrabold text-ink"
          >
            Apply safely
          </h3>

          <p className="mt-1 text-sm leading-6 text-ink-soft">
            NexaHire listings never ask candidates to pay
            application fees. Verify the company and protect
            personal information during your job search.
          </p>
        </div>
      </div>
    </section>
  );
}

function DetailStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl2 border border-line bg-paper/65 p-4">
      <span className="text-brand dark:text-[#A99EFF]">
        {icon}
      </span>

      <p className="mt-3 text-[10px] font-extrabold uppercase tracking-[.13em] text-ink-muted">
        {label}
      </p>

      <p className="mt-1 text-sm font-extrabold text-ink">
        {value}
      </p>
    </div>
  );
}