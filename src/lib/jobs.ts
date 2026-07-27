import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const JOBS_PAGE_SIZE = 8;

export type JobSearchParams = {
  q?: string;
  location?: string;
  mode?: string;
  type?: string;
  salary?: string;
  date?: string;
  sort?: string;
  tags?: string;
  page?: string;
};

function getDateThreshold(days?: string) {
  const value = Number(days);
  if (![1, 3, 7, 30].includes(value)) return undefined;
  return new Date(Date.now() - value * 24 * 60 * 60 * 1000);
}

export async function getJobsData(searchParams: JobSearchParams) {
  const where: Prisma.JobWhereInput = {};
  const query = searchParams.q?.trim();
  const location = searchParams.location?.trim();
  const tags = (searchParams.tags ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 8);

  if (query) {
    const matchingCompanies = await prisma.company.findMany({
      where: { name: { contains: query, mode: "insensitive" } },
      select: { id: true },
      take: 30,
    });
    const companyIds = matchingCompanies.map((company) => company.id);

    where.OR = [
      { title: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
      { location: { contains: query, mode: "insensitive" } },
      { tags: { has: query } },
      ...(companyIds.length ? [{ companyId: { in: companyIds } }] : []),
    ];
  }

  if (location) where.location = { contains: location, mode: "insensitive" };

  if (searchParams.mode && ["REMOTE", "HYBRID", "ONSITE"].includes(searchParams.mode)) {
    where.workMode = searchParams.mode as Prisma.JobWhereInput["workMode"];
  }

  if (
    searchParams.type &&
    ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"].includes(searchParams.type)
  ) {
    where.employmentType = searchParams.type as Prisma.JobWhereInput["employmentType"];
  }

  if (tags.length) where.tags = { hasEvery: tags };

  const salary = Number(searchParams.salary);
  if (Number.isFinite(salary) && salary > 0) where.salaryMax = { gte: salary };

  const dateThreshold = getDateThreshold(searchParams.date);
  if (dateThreshold) where.createdAt = { gte: dateThreshold };

  const orderBy: Prisma.JobOrderByWithRelationInput[] =
    searchParams.sort === "salary-high"
      ? [{ salaryMax: "desc" }, { createdAt: "desc" }]
      : searchParams.sort === "salary-low"
        ? [{ salaryMin: "asc" }, { createdAt: "desc" }]
        : searchParams.sort === "title"
          ? [{ title: "asc" }, { createdAt: "desc" }]
          : [{ createdAt: "desc" }];

  const requestedPage = Math.max(
    1,
    Number.parseInt(searchParams.page ?? "1", 10) || 1,
  );

  const total = await prisma.job.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / JOBS_PAGE_SIZE));
  const currentPage = Math.min(requestedPage, totalPages);

  const jobs = await prisma.job.findMany({
    where,
    include: { company: true },
    orderBy,
    skip: (currentPage - 1) * JOBS_PAGE_SIZE,
    take: JOBS_PAGE_SIZE,
  });

  return { jobs, total, totalPages, currentPage };
}

export function hasActiveJobFilters(searchParams: JobSearchParams) {
  return Boolean(
    searchParams.q ||
      searchParams.location ||
      searchParams.mode ||
      searchParams.type ||
      searchParams.salary ||
      searchParams.date ||
      searchParams.tags,
  );
}
