import type { Metadata } from "next";
import { Suspense } from "react";
import { JobResults } from "@/components/JobResults";
import { JobResultsSkeleton } from "@/components/JobResultsSkeleton";
import { SearchFilters } from "@/components/SearchFilters";
import {
  LatestPostingsTicker,
  LatestPostingsTickerSkeleton,
} from "@/components/LatestPostingsTicker";
import {
  CheckCircleIcon,
  SparklesIcon,
} from "@/components/Icons";
import type { JobSearchParams } from "@/lib/jobs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Find jobs",
  description:
    "Search verified full-time, part-time, contract, internship, remote, hybrid, and on-site opportunities.",
  alternates: {
    canonical: "/jobs",
  },
  openGraph: {
    title: "Find jobs on NexaHire",
    description:
      "Search verified roles using shareable filters for salary, work mode, skills, and date posted.",
    url: "/jobs",
  },
};

type JobsPageProps = {
  searchParams: JobSearchParams;
};

export default function JobsPage({
  searchParams,
}: JobsPageProps) {
  const suspenseKey = JSON.stringify(searchParams);

  return (
    <>
      <section className="relative overflow-hidden bg-midnight pb-24 pt-14 text-white sm:pb-28 sm:pt-16">
        <div className="hero-grid absolute inset-0 opacity-55" />

        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-brand/30 blur-[90px]" />

        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-accent/20 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/7 px-3.5 py-1.5 text-xs font-bold text-white/80">
              <SparklesIcon
                size={15}
                className="text-[#A99EFF]"
              />

              Verified opportunities, thoughtfully organized
            </div>

            <h1 className="mt-5 font-display text-4xl font-extrabold tracking-[-.045em] sm:text-6xl">
              Find your next standout role.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/64 sm:text-lg">
              Search by role, skill, location, work
              arrangement, salary, and date posted. Every
              result is structured to help you compare faster.
            </p>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-white/65">
              <span className="inline-flex items-center gap-2">
                <CheckCircleIcon
                  size={18}
                  className="text-accent"
                />
                Clear salary information
              </span>

              <span className="inline-flex items-center gap-2">
                <CheckCircleIcon
                  size={18}
                  className="text-accent"
                />
                Flexible work filters
              </span>

              <span className="inline-flex items-center gap-2">
                <CheckCircleIcon
                  size={18}
                  className="text-accent"
                />
                Save jobs locally
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Latest postings ticker is above the search controls. */}
      <Suspense fallback={<LatestPostingsTickerSkeleton />}>
        <LatestPostingsTicker />
      </Suspense>

      <SearchFilters actionPath="/jobs" />

      <Suspense
        key={suspenseKey}
        fallback={<JobResultsSkeleton />}
      >
        <JobResults searchParams={searchParams} />
      </Suspense>
    </>
  );
}