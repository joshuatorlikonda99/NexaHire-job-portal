import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/Icons";
import type { JobSearchParams } from "@/lib/jobs";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  searchParams: JobSearchParams;
  basePath: string;
  hash?: string;
};

export function Pagination({ currentPage, totalPages, searchParams, basePath, hash }: PaginationProps) {
  if (totalPages <= 1) return null;
  const pages = getVisiblePages(currentPage, totalPages);

  function hrefFor(page: number) {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && key !== "page") params.set(key, value);
    });
    if (page > 1) params.set("page", String(page));
    const query = params.toString();
    return `${basePath}${query ? `?${query}` : ""}${hash ? `#${hash}` : ""}`;
  }

  return (
    <nav
      className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-3 shadow-card sm:flex-row sm:px-4"
      aria-label="Job results pagination"
    >
      <PageLink href={hrefFor(Math.max(1, currentPage - 1))} disabled={currentPage === 1} direction="previous" />
      <div className="flex flex-wrap items-center justify-center gap-1">
        {pages.map((page, index) =>
          page === "ellipsis" ? (
            <span key={`ellipsis-${index}`} className="grid h-10 w-9 place-items-center text-sm text-ink-muted">…</span>
          ) : (
            <Link
              key={page}
              href={hrefFor(page)}
              scroll
              className={`focus-ring grid h-10 min-w-10 place-items-center rounded-xl px-2 text-sm font-bold transition ${
                page === currentPage
                  ? "bg-brand text-white shadow-md shadow-brand/20"
                  : "text-ink-soft hover:bg-brand-light hover:text-brand"
              }`}
              aria-current={page === currentPage ? "page" : undefined}
              aria-label={`Go to jobs page ${page}`}
            >
              {page}
            </Link>
          ),
        )}
      </div>
      <PageLink href={hrefFor(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} direction="next" />
    </nav>
  );
}

function PageLink({ href, disabled, direction }: { href: string; disabled: boolean; direction: "previous" | "next" }) {
  const content = direction === "previous" ? <><ArrowLeftIcon size={17} />Previous</> : <>Next<ArrowRightIcon size={17} /></>;
  if (disabled) return <span className="inline-flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-bold text-ink-muted/40" aria-disabled="true">{content}</span>;
  return <Link href={href} className="focus-ring inline-flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-bold text-ink-soft transition hover:bg-brand-light hover:text-brand">{content}</Link>;
}

function getVisiblePages(currentPage: number, totalPages: number): Array<number | "ellipsis"> {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, index) => index + 1);
  const result: Array<number | "ellipsis"> = [1];
  if (currentPage > 4) result.push("ellipsis");
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);
  for (let page = start; page <= end; page += 1) result.push(page);
  if (currentPage < totalPages - 3) result.push("ellipsis");
  result.push(totalPages);
  return result;
}
