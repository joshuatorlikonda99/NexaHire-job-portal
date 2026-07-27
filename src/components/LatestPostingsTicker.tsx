import { prisma, withPrismaFallback } from "@/lib/prisma";
import { PostingsTicker } from "@/components/PostingsTicker";

const TICKER_JOB_LIMIT = 7;

export async function LatestPostingsTicker() {
  const latestJobs = await withPrismaFallback(
    () =>
      prisma.job.findMany({
        select: {
          id: true,
          title: true,
          location: true,
          company: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: TICKER_JOB_LIMIT,
      }),
    [],
    "latest jobs ticker",
  );

  if (latestJobs.length === 0) {
    return null;
  }

  return (
    <PostingsTicker
      items={latestJobs.map((job) => ({
        id: job.id,
        title: job.title,
        company: job.company.name,
        location: job.location,
      }))}
    />
  );
}

export function LatestPostingsTickerSkeleton() {
  return (
    <div
      className="h-[43px] animate-pulse border-y border-line bg-surface"
      aria-hidden="true"
    />
  );
}