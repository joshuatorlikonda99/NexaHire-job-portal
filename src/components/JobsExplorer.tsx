import Link from "next/link";
import type { JobSearchParams } from "@/lib/jobs";
import { JOBS_PAGE_SIZE } from "@/lib/jobs";
import type { JobWithCompany } from "@/components/JobCard";
import { JobCard } from "@/components/JobCard";
import { Pagination } from "@/components/Pagination";
import { ArrowRightIcon } from "@/components/Icons";
import { ViewModeToggle } from "@/components/ViewModeToggle";

type JobsExplorerProps = {
  jobs: JobWithCompany[];
  total: number;
  totalPages: number;
  currentPage: number;
  searchParams: JobSearchParams;
  basePath: string;
  eyebrow: string;
  title: string;
  emptyTitle?: string;
  emptyText?: string;
  showSavedLink?: boolean;
  featuredCount?: number;
};

export function JobsExplorer({
  jobs,
  total,
  totalPages,
  currentPage,
  searchParams,
  basePath,
  eyebrow,
  title,
  emptyTitle = "No roles match those filters",
  emptyText = "Try a broader keyword, reduce the minimum salary, or clear a filter to discover more opportunities.",
  showSavedLink = true,
  featuredCount = 0,
}: JobsExplorerProps) {
  const startResult = total === 0 ? 0 : (currentPage - 1) * JOBS_PAGE_SIZE + 1;
  const endResult = Math.min(currentPage * JOBS_PAGE_SIZE, total);

  return (
    <section id="job-results" className="mx-auto max-w-7xl scroll-mt-28 px-5 py-10 lg:px-8 lg:py-14">
      <div className="flex flex-col gap-5 border-b border-line/80 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[.16em] text-brand">{eyebrow}</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-[-.035em] text-ink sm:text-4xl">{title}</h2>
          <p className="mt-2 text-sm font-medium text-ink-muted">
            Showing {startResult}–{endResult} of {total} opportunities
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <ViewModeToggle />
          {showSavedLink && (
            <Link
              href="/saved"
              className="focus-ring inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-bold text-ink-soft shadow-sm transition hover:-translate-y-0.5 hover:border-brand/25 hover:text-brand"
            >
              <span className="hidden sm:inline">View saved jobs</span>
              <ArrowRightIcon size={16} />
            </Link>
          )}
        </div>
      </div>

      {jobs.length === 0 ? (
        <EmptyState title={emptyTitle} text={emptyText} resetHref={basePath} />
      ) : (
        <div className="job-results-grid mt-6 grid gap-4">
          {jobs.map((job, index) => (
            <JobCard key={job.id} job={job} featured={index < featuredCount && currentPage === 1} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        searchParams={searchParams}
        basePath={basePath}
        hash="job-results"
      />
    </section>
  );
}

function EmptyState({ title, text, resetHref }: { title: string; text: string; resetHref: string }) {
  return (
    <div className="mt-6 rounded-xl3 border border-dashed border-brand/25 bg-surface px-6 py-16 text-center shadow-card">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-light text-brand">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" /><path d="m20 20-3.6-3.6" />
        </svg>
      </span>
      <h3 className="mt-5 font-display text-xl font-extrabold">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink-muted">{text}</p>
      <Link href={resetHref} className="focus-ring mt-5 inline-flex rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white">
        Reset search
      </Link>
    </div>
  );
}
