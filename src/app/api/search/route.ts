import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type PaletteResult = {
  id: string;
  kind: "job" | "company";
  title: string;
  subtitle: string;
  href: string;
};

export async function GET(request: NextRequest) {
  const query = (request.nextUrl.searchParams.get("q") ?? "").trim().slice(0, 80);

  if (query.length < 2) {
    return NextResponse.json({ results: [] satisfies PaletteResult[] });
  }

  try {
    const [jobs, companies] = await Promise.all([
      prisma.job.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { location: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
        include: { company: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
        take: 6,
      }),
      prisma.company.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { location: { contains: query, mode: "insensitive" } },
          ],
        },
        orderBy: { createdAt: "desc" },
        take: 4,
      }),
    ]);

    const results: PaletteResult[] = [
      ...jobs.map((job) => ({
        id: job.id,
        kind: "job" as const,
        title: job.title,
        subtitle: `${job.company.name} · ${job.location}`,
        href: `/jobs/${job.id}`,
      })),
      ...companies.map((company) => ({
        id: company.id,
        kind: "company" as const,
        title: company.name,
        subtitle: company.location || "Company profile",
        href: `/companies/${company.slug}`,
      })),
    ];

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Command palette search failed:", error);
    return NextResponse.json({ results: [] satisfies PaletteResult[] }, { status: 500 });
  }
}
