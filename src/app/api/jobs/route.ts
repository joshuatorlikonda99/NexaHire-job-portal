import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { jobSchema } from "@/lib/validation";

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function GET(request: NextRequest) {
  const ids = (request.nextUrl.searchParams.get("ids") ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter((id) => /^[a-f\d]{24}$/i.test(id))
    .slice(0, 100);

  if (!ids.length) return NextResponse.json({ jobs: [] });

  try {
    const jobs = await prisma.job.findMany({
      where: { id: { in: ids } },
      include: { company: { select: { name: true, slug: true, logoColor: true } } },
    });
    const order = new Map(ids.map((id, index) => [id, index]));
    jobs.sort((a, b) => (order.get(a.id) ?? 999) - (order.get(b.id) ?? 999));
    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("Failed to read saved jobs:", error);
    return NextResponse.json({ message: "Could not load saved jobs." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const parsed = jobSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json({ message: "Please fix the highlighted fields.", fieldErrors }, { status: 422 });
  }

  const data = parsed.data;
  const tags = (data.tags ?? "").split(",").map((tag) => tag.trim()).filter(Boolean);

  try {
    const slug = slugify(data.companyName);
    const company = await prisma.company.upsert({
      where: { slug },
      update: {},
      create: { name: data.companyName, slug, location: data.location },
    });
    const job = await prisma.job.create({
      data: {
        title: data.title,
        description: data.description,
        location: data.location,
        employmentType: data.employmentType,
        workMode: data.workMode,
        salaryMin: data.salaryMin ?? null,
        salaryMax: data.salaryMax ?? null,
        tags,
        companyId: company.id,
      },
    });
    revalidatePath("/");
    revalidatePath("/jobs");
    revalidatePath("/companies");
    revalidatePath(`/companies/${company.slug}`);
    return NextResponse.json({ id: job.id }, { status: 201 });
  } catch (error) {
    console.error("Failed to create job:", error);
    return NextResponse.json({ message: "We couldn't save this job. Please try again." }, { status: 500 });
  }
}