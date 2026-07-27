import { Suspense } from "react";
import { SearchFilters } from "@/components/SearchFilters";
import { HomeResults } from "@/components/HomeResults";
import { JobResultsSkeleton } from "@/components/JobResultsSkeleton";
import {
  LatestPostingsTicker,
  LatestPostingsTickerSkeleton,
} from "@/components/LatestPostingsTicker";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  SparklesIcon,
  UsersIcon,
  ZapIcon,
} from "@/components/Icons";
import type { JobSearchParams } from "@/lib/jobs";

export const dynamic = "force-dynamic";

type HomePageProps = {
  searchParams: JobSearchParams;
};

export default function HomePage({
  searchParams,
}: HomePageProps) {
  const suspenseKey = JSON.stringify(searchParams);

  return (
    <>
      <section className="relative overflow-hidden bg-midnight pb-24 pt-16 text-white sm:pb-28 sm:pt-20">
        <div className="hero-grid absolute inset-0 opacity-70" />

        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-brand/35 blur-[90px] animate-drift" />

        <div className="absolute -right-20 top-8 h-80 w-80 rounded-full bg-accent/25 blur-[100px] animate-drift [animation-delay:-4s]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[1.18fr_.82fr] lg:px-8">
          <div className="animate-rise">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/7 px-3.5 py-1.5 text-xs font-bold text-white/80 backdrop-blur">
              <SparklesIcon
                size={15}
                className="text-[#A99EFF]"
              />

              Smart discovery for ambitious careers
            </div>

            <h1 className="text-balance max-w-4xl font-display text-4xl font-extrabold leading-[1.06] tracking-[-.045em] sm:text-6xl lg:text-[68px]">
              Find work that moves your{" "}
              <span className="bg-gradient-to-r from-[#A99EFF] via-white to-[#68E0DA] bg-clip-text text-transparent">
                career forward.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/64 sm:text-lg">
              Explore verified roles from forward-thinking
              teams. Search smarter, compare opportunities
              clearly, and save the ones worth pursuing.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold text-white/65">
              <span className="inline-flex items-center gap-2">
                <CheckCircleIcon
                  size={18}
                  className="text-accent"
                />
                Verified companies
              </span>

              <span className="inline-flex items-center gap-2">
                <CheckCircleIcon
                  size={18}
                  className="text-accent"
                />
                Transparent salary bands
              </span>

              <span className="inline-flex items-center gap-2">
                <CheckCircleIcon
                  size={18}
                  className="text-accent"
                />
                No account required
              </span>
            </div>
          </div>

          <div
            className="relative hidden min-h-[360px] lg:block"
            aria-hidden="true"
          >
            <div className="absolute right-4 top-2 w-[330px] rounded-xl3 border border-white/12 bg-white/9 p-5 shadow-2xl backdrop-blur-xl animate-float">
              <div className="flex items-start gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand to-[#8C7CFF] font-display font-extrabold">
                  AL
                </span>

                <div>
                  <p className="text-xs font-bold text-white/45">
                    Aster Labs
                  </p>

                  <p className="mt-1 font-display text-lg font-extrabold">
                    Senior AI Engineer
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <DemoTag>Remote</DemoTag>
                <DemoTag>₹35L – ₹52L</DemoTag>
                <DemoTag>RAG</DemoTag>
              </div>

              <div className="mt-5 h-2 rounded-full bg-white/8">
                <div className="h-2 w-[78%] rounded-full bg-gradient-to-r from-accent to-[#82EFEA]" />
              </div>

              <p className="mt-2 text-[11px] font-semibold text-white/45">
                Strong profile match · 78%
              </p>
            </div>

            <div className="absolute bottom-4 left-2 w-[285px] rounded-xl3 border border-white/12 bg-surface p-5 text-ink shadow-float animate-float [animation-delay:-2.5s]">
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-light text-accent-dark">
                  <ZapIcon size={20} />
                </span>

                <span className="rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-green-700">
                  New today
                </span>
              </div>

              <p className="mt-4 text-xs font-bold text-ink-muted">
                Opportunity pulse
              </p>

              <p className="mt-1 font-display text-2xl font-extrabold">
                24 fresh roles
              </p>

              <p className="mt-2 text-xs leading-5 text-ink-muted">
                Across product, engineering, data, and design.
              </p>
            </div>

            <div className="absolute bottom-16 right-0 rounded-2xl border border-white/12 bg-white/9 px-4 py-3 backdrop-blur-xl animate-float [animation-delay:-4s]">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/20 text-accent">
                  <UsersIcon size={18} />
                </span>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                    Talent community
                  </p>

                  <p className="text-sm font-extrabold">
                    12k+ professionals
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest postings ticker is now above the search form. */}
      <Suspense fallback={<LatestPostingsTickerSkeleton />}>
        <LatestPostingsTicker />
      </Suspense>

      <SearchFilters actionPath="/jobs" />

      <Suspense
        key={suspenseKey}
        fallback={<JobResultsSkeleton />}
      >
        <HomeResults searchParams={searchParams} />
      </Suspense>

      <section
        id="career-resources"
        className="mx-auto max-w-7xl scroll-mt-28 px-5 py-12 lg:px-8"
      >
        <div className="mb-6">
          <p className="text-xs font-extrabold uppercase tracking-[.16em] text-brand">
            Career toolkit
          </p>

          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink">
            Move from browsing to hired
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <ResourceCard
            number="01"
            title="Build a sharper profile"
            text="Turn your experience into a focused story that helps recruiters understand your value quickly."
          />

          <ResourceCard
            number="02"
            title="Compare offers clearly"
            text="Evaluate role scope, growth, salary, work mode, and company context—not only the job title."
          />

          <ResourceCard
            number="03"
            title="Prepare with confidence"
            text="Use the skills and role details in every listing to guide practical, targeted interview preparation."
          />
        </div>
      </section>
    </>
  );
}

function DemoTag({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="rounded-lg bg-white/8 px-2.5 py-1 text-[11px] font-bold text-white/75">
      {children}
    </span>
  );
}

function ResourceCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <article className="group rounded-xl3 border border-line bg-surface p-6 shadow-card transition hover:-translate-y-1 hover:border-brand/20">
      <span className="font-mono text-xs font-bold text-brand">
        {number}
      </span>

      <h3 className="mt-8 font-display text-lg font-extrabold tracking-tight text-ink">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-ink-muted">
        {text}
      </p>

      <span className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-brand">
        Learn the approach

        <ArrowRightIcon
          size={15}
          className="transition group-hover:translate-x-1"
        />
      </span>
    </article>
  );
}