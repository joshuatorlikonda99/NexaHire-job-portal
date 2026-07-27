"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  ArrowRightIcon,
  BookmarkIcon,
  BriefcaseIcon,
  ClockIcon,
  MapPinIcon,
  WalletIcon,
} from "@/components/Icons";
import { SaveJobButton } from "@/components/SaveJobButton";
import { useToast } from "@/components/ToastProvider";
import { STORAGE_KEYS } from "@/lib/preferences";

type SavedJob = {
  id: string;
  title: string;
  location: string;
  workMode: string;
  employmentType: string;
  salaryMin: number | null;
  salaryMax: number | null;
  tags: string[];
  createdAt: string;
  company: {
    name: string;
    slug: string;
    logoColor: string;
  };
};

const workModeLabels: Record<string, string> = {
  REMOTE: "Remote",
  HYBRID: "Hybrid",
  ONSITE: "On-site",
};

const typeLabels: Record<string, string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACT: "Contract",
  INTERNSHIP: "Internship",
};

function readIds(): string[] {
  try {
    const parsed: unknown = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.savedJobs) ?? "[]",
    );

    return Array.isArray(parsed)
      ? parsed.filter(
          (id): id is string => typeof id === "string",
        )
      : [];
  } catch {
    return [];
  }
}

export function SavedJobsList() {
  const [jobs, setJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const load = useCallback(async () => {
    try {
      const ids = readIds();

      if (!ids.length) {
        setJobs([]);
        return;
      }

      const response = await fetch(
        `/api/jobs?ids=${encodeURIComponent(ids.join(","))}`,
        {
          cache: "no-store",
        },
      );

      if (!response.ok) {
        throw new Error("Saved jobs request failed");
      }

      const payload = (await response.json()) as {
        jobs?: SavedJob[];
      };

      setJobs(
        Array.isArray(payload.jobs)
          ? payload.jobs
          : [],
      );
    } catch {
      setJobs([]);

      toast({
        title: "Could not load saved jobs",
        description: "Please refresh and try again.",
        tone: "error",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    void load();

    const refresh = () => {
      void load();
    };

    window.addEventListener(
      "nexahire:saved-change",
      refresh,
    );

    window.addEventListener(
      "storage",
      refresh,
    );

    return () => {
      window.removeEventListener(
        "nexahire:saved-change",
        refresh,
      );

      window.removeEventListener(
        "storage",
        refresh,
      );
    };
  }, [load]);

  if (loading) {
    return (
      <div className="grid gap-4">
        {Array.from(
          {
            length: 3,
          },
          (_, index) => (
            <div
              key={index}
              className="h-48 rounded-xl3 skeleton"
            />
          ),
        )}
      </div>
    );
  }

  if (!jobs.length) {
    return (
      <div className="rounded-xl3 border border-dashed border-brand/25 bg-surface px-6 py-16 text-center shadow-card">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-light text-brand">
          <BookmarkIcon size={28} />
        </span>

        <h2 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-ink">
          Your shortlist is ready when you are
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink-muted">
          Save roles from the job board and they will appear
          here for easy comparison and follow-up.
        </p>

        <Link
          href="/jobs"
          className="focus-ring mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-brand/20"
        >
          Explore opportunities
          <ArrowRightIcon size={17} />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {jobs.map((job) => (
        <article
          key={job.id}
          className="group relative overflow-hidden rounded-2xl border border-line bg-surface p-5 pl-7 shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-brand/25 hover:shadow-glow sm:p-6 sm:pl-8"
        >
          <div
            className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brand via-[#7B68EE] to-accent"
            aria-hidden="true"
          />

          <Link
            href={`/jobs/${job.id}`}
            className="focus-ring absolute inset-0 z-10 rounded-2xl"
            aria-label={`View ${job.title}`}
          />

          <div className="relative flex items-start gap-4">
            <span
              className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl font-display font-extrabold text-white shadow-md"
              style={{
                backgroundColor:
                  job.company.logoColor || "#6757E8",
              }}
              aria-hidden="true"
            >
              {initials(job.company.name)}
            </span>

            <div className="min-w-0 flex-1 pr-12">
              <p className="text-xs font-bold text-ink-muted">
                {job.company.name}
              </p>

              <h2 className="mt-1 truncate font-display text-xl font-extrabold tracking-tight text-ink transition group-hover:text-brand">
                {job.title}
              </h2>

              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-ink-muted">
                <span className="inline-flex items-center gap-1.5">
                  <MapPinIcon size={16} />
                  {job.location}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <BriefcaseIcon size={16} />
                  {workModeLabels[job.workMode] ??
                    job.workMode}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <ClockIcon size={16} />
                  {typeLabels[job.employmentType] ??
                    job.employmentType}
                </span>

                <span className="inline-flex items-center gap-1.5 font-extrabold text-ink-soft">
                  <WalletIcon size={16} />
                  {formatSalary(
                    job.salaryMin,
                    job.salaryMax,
                  )}
                </span>
              </div>

              {job.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.tags.slice(0, 5).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-line/90 bg-paper px-2.5 py-1 text-[11px] font-bold text-ink-soft"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
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
      ))}
    </div>
  );
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatSalary(
  minimum: number | null,
  maximum: number | null,
): string {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
    notation: "compact",
  });

  if (minimum !== null && maximum !== null) {
    return `${formatter.format(minimum)} – ${formatter.format(maximum)}`;
  }

  if (minimum !== null) {
    return `From ${formatter.format(minimum)}`;
  }

  if (maximum !== null) {
    return `Up to ${formatter.format(maximum)}`;
  }

  return "Competitive";
}