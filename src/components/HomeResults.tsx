import Link from "next/link";
import { prisma, withPrismaFallback } from "@/lib/prisma";
import {
  getJobsData,
  type JobSearchParams,
} from "@/lib/jobs";
import { JobsExplorer } from "@/components/JobsExplorer";
import { SplitFlapStats } from "@/components/SplitFlapStats";
import { CompanyCard } from "@/components/CompanyCard";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  BuildingIcon,
  MapPinIcon,
} from "@/components/Icons";

type HomeResultsProps = {
  searchParams: JobSearchParams;
};

export async function HomeResults({
  searchParams,
}: HomeResultsProps) {
  const [
    jobsData,
    companyCount,
    remoteCount,
    companies,
  ] = await Promise.all([
    getJobsData(searchParams),

    withPrismaFallback(
      () => prisma.company.count(),
      0,
      "company.count",
    ),

    withPrismaFallback(
      () =>
        prisma.job.count({
          where: {
            workMode: "REMOTE",
          },
        }),
      0,
      "job.count remote",
    ),

    withPrismaFallback(
      () =>
        prisma.company.findMany({
          include: {
            _count: {
              select: {
                jobs: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 6,
        }),
      [],
      "company.findMany home",
    ),
  ]);

  return (
    <>
      <SplitFlapStats
        items={[
          {
            value: jobsData.total,
            suffix: "+",
            label: "active opportunities",
            icon: <BriefcaseIcon size={20} />,
          },
          {
            value: companyCount,
            suffix: "+",
            label: "hiring companies",
            icon: <BuildingIcon size={20} />,
          },
          {
            value: remoteCount,
            suffix: "+",
            label: "remote-friendly roles",
            icon: <MapPinIcon size={20} />,
          },
        ]}
      />

      <JobsExplorer
        jobs={jobsData.jobs}
        total={jobsData.total}
        totalPages={jobsData.totalPages}
        currentPage={jobsData.currentPage}
        searchParams={searchParams}
        basePath="/"
        eyebrow="Curated opportunities"
        title="Explore standout roles"
        featuredCount={2}
      />

      {companies.length > 0 && (
        <section
          id="companies"
          className="mx-auto max-w-7xl scroll-mt-28 px-5 py-14 lg:px-8"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[.16em] text-accent-dark">
                Teams worth knowing
              </p>

              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink">
                Discover companies building what’s next
              </h2>
            </div>

            <Link
              href="/companies"
              className="focus-ring inline-flex items-center gap-2 self-start rounded-xl text-sm font-extrabold text-brand transition hover:text-brand-dark sm:self-auto"
            >
              View company directory
              <ArrowRightIcon size={16} />
            </Link>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              <CompanyCard
                key={company.id}
                company={company}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}