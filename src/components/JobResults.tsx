import { prisma } from "@/lib/prisma";
import {
  getJobsData,
  hasActiveJobFilters,
  type JobSearchParams,
} from "@/lib/jobs";
import { JobsExplorer } from "@/components/JobsExplorer";
import { SplitFlapStats } from "@/components/SplitFlapStats";
import { BriefcaseIcon, BuildingIcon, MapPinIcon } from "@/components/Icons";

export async function JobResults({ searchParams }: { searchParams: JobSearchParams }) {
  const [jobsData, companyCount, remoteCount] = await Promise.all([
    getJobsData(searchParams),
    prisma.company.count(),
    prisma.job.count({ where: { workMode: "REMOTE" } }),
  ]);
  const filtered = hasActiveJobFilters(searchParams);

  return (
    <>
      <SplitFlapStats
        items={[
          {
            value: jobsData.total,
            suffix: "+",
            label: filtered ? "matching opportunities" : "active opportunities",
            icon: <BriefcaseIcon size={20} />,
          },
          { value: companyCount, suffix: "+", label: "hiring companies", icon: <BuildingIcon size={20} /> },
          { value: remoteCount, suffix: "+", label: "remote-friendly roles", icon: <MapPinIcon size={20} /> },
        ]}
      />
      <JobsExplorer
        jobs={jobsData.jobs}
        total={jobsData.total}
        totalPages={jobsData.totalPages}
        currentPage={jobsData.currentPage}
        searchParams={searchParams}
        basePath="/jobs"
        eyebrow="Find jobs"
        title={filtered ? "Jobs matching your search" : "Browse all opportunities"}
      />
    </>
  );
}
