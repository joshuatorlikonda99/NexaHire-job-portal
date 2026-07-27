import Link from "next/link";
import type { Company } from "@prisma/client";
import { ArrowRightIcon, BriefcaseIcon, MapPinIcon } from "@/components/Icons";
import { initials } from "@/lib/format";

type CompanyCardProps = {
  company: Company & { _count: { jobs: number } };
};

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Link
      href={`/companies/${company.slug}`}
      className="focus-ring group relative overflow-hidden rounded-3xl border border-line bg-surface p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand/25 hover:shadow-glow"
    >
      <div className="flex items-start gap-4">
        <span
          className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl font-display text-lg font-extrabold text-white shadow-md"
          style={{ backgroundColor: company.logoColor }}
        >
          {initials(company.name)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-display text-lg font-extrabold text-ink transition group-hover:text-brand">
            {company.name}
          </span>
          <span className="mt-1 flex items-center gap-1.5 truncate text-xs font-semibold text-ink-muted">
            <MapPinIcon size={14} /> {company.location || "Global"}
          </span>
        </span>
        <ArrowRightIcon size={18} className="mt-1 shrink-0 text-ink-muted transition group-hover:translate-x-1 group-hover:text-brand" />
      </div>
      <p className="mt-5 line-clamp-3 text-sm leading-6 text-ink-muted">
        {company.about || `${company.name} is building useful products and growing a talented team.`}
      </p>
      <div className="mt-5 flex items-center justify-between border-t border-dashed border-line pt-4">
        <span className="inline-flex items-center gap-2 text-xs font-extrabold text-ink-soft">
          <BriefcaseIcon size={15} /> {company._count.jobs} open {company._count.jobs === 1 ? "role" : "roles"}
        </span>
        <span className="text-xs font-extrabold text-brand">View profile</span>
      </div>
    </Link>
  );
}
