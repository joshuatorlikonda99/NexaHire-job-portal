import { JobCardSkeleton } from "@/components/JobCardSkeleton";

export function JobResultsSkeleton({ showStats = true }: { showStats?: boolean }) {
  return (
    <div aria-label="Loading job results" aria-busy="true">
      {showStats && (
        <section className="mx-auto max-w-7xl px-5 pb-2 pt-10 lg:px-8">
          <div className="grid gap-3 rounded-xl2 border border-line bg-surface p-4 shadow-card sm:grid-cols-3 sm:p-5">
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className="h-20 rounded-xl skeleton" />
            ))}
          </div>
        </section>
      )}
      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
        <div className="h-3 w-44 rounded skeleton" />
        <div className="mt-3 h-10 w-80 max-w-full rounded-xl skeleton" />
        <div className="mt-3 h-4 w-52 rounded skeleton" />
        <div className="mt-7 grid gap-4">
          {Array.from({ length: 5 }, (_, index) => <JobCardSkeleton key={index} />)}
        </div>
      </section>
    </div>
  );
}
