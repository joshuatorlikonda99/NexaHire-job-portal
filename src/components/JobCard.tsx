import Link from "next/link";
import type {
  Company,
  Job,
} from "@prisma/client";
import {
  EMPLOYMENT_LABELS,
  WORK_MODE_LABELS,
  formatSalary,
  initials,
  timeAgo,
} from "@/lib/format";
import { SaveJobButton } from "@/components/SaveJobButton";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  ClockIcon,
  MapPinIcon,
  WalletIcon,
} from "@/components/Icons";

export type JobWithCompany = Job & {
  company: Company;
};

type JobCardProps = {
  job: JobWithCompany;
  featured?: boolean;
};

export function JobCard({
  job,
  featured = false,
}: JobCardProps) {
  const salary = formatSalary(
    job.salaryMin,
    job.salaryMax,
  );

  return (
    <article
      className={[
        "job-card-performance group relative h-full",
        "min-h-[184px] w-full overflow-hidden rounded-2xl",
        "border bg-surface p-5 pl-7 shadow-card",
        "transition duration-300",
        "hover:-translate-y-0.5 hover:border-brand/25",
        "hover:shadow-glow sm:p-6 sm:pl-8",
        featured
          ? "border-brand/20 ring-1 ring-brand/5"
          : "border-line",
      ].join(" ")}
    >
      {/* Permanent gradient accent shown on every job card. */}
      <div
        className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brand via-[#7B68EE] to-accent"
        aria-hidden="true"
      />

      {/* Makes the complete card clickable. */}
      <Link
        href={`/jobs/${job.id}`}
        className="focus-ring absolute inset-0 z-10 rounded-2xl"
        aria-label={`View ${job.title} at ${job.company.name}`}
      />

      <div className="relative flex h-full min-w-0 items-start gap-4">
        <span
          className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-lg font-extrabold text-white shadow-md"
          style={{
            backgroundColor:
              job.company.logoColor || "#6757E8",
          }}
          aria-hidden="true"
        >
          {initials(job.company.name)}
        </span>

        <div className="flex min-h-[132px] min-w-0 flex-1 flex-col pr-11">
          <div className="min-w-0">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              {featured && (
                <span className="rounded-full bg-brand-light px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[.12em] text-brand">
                  Featured
                </span>
              )}

              <span className="inline-flex min-w-0 items-center gap-1 text-xs font-bold text-ink-muted">
                <span className="truncate">
                  {job.company.name}
                </span>

                <CheckCircleIcon
                  size={14}
                  className="shrink-0 text-accent"
                />
              </span>
            </div>

            <h3 className="truncate font-display text-lg font-extrabold tracking-tight text-ink transition group-hover:text-brand sm:text-xl">
              {job.title}
            </h3>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-muted">
            <Meta
              icon={<MapPinIcon size={16} />}
            >
              {job.location}
            </Meta>

            <Meta
              icon={<BriefcaseIcon size={16} />}
            >
              {WORK_MODE_LABELS[job.workMode]}
            </Meta>

            <Meta
              icon={<ClockIcon size={16} />}
            >
              {
                EMPLOYMENT_LABELS[
                  job.employmentType
                ]
              }
            </Meta>

            {salary && (
              <Meta
                icon={<WalletIcon size={16} />}
                strong
              >
                {salary}
              </Meta>
            )}
          </div>

          {job.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {job.tags
                .slice(0, 5)
                .map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-line/90 bg-paper px-2.5 py-1 text-[11px] font-bold text-ink-soft"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          )}

          <div className="mt-auto flex items-center justify-between border-t border-dashed border-line/90 pt-4">
            <span className="text-xs font-semibold text-ink-muted">
              Posted {timeAgo(job.createdAt)}
            </span>

            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-brand opacity-80 transition group-hover:gap-2.5 group-hover:opacity-100">
              View opportunity

              <ArrowRightIcon size={15} />
            </span>
          </div>
        </div>
      </div>

      <div className="absolute right-5 top-5 z-20">
        <SaveJobButton
          jobId={job.id}
          compact
        />
      </div>

      <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-brand/0 blur-3xl transition duration-500 group-hover:bg-brand/10" />
    </article>
  );
}

type MetaProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
  strong?: boolean;
};

function Meta({
  icon,
  children,
  strong = false,
}: MetaProps) {
  return (
    <span
      className={[
        "inline-flex min-w-0 items-center gap-1.5",
        strong
          ? "font-extrabold text-ink-soft"
          : "font-semibold",
      ].join(" ")}
    >
      <span className="shrink-0 text-ink-muted">
        {icon}
      </span>

      <span className="truncate">
        {children}
      </span>
    </span>
  );
}