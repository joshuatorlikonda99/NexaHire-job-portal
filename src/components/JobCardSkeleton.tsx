export function JobCardSkeleton() {
  return (
    <div className="ticket-card rounded-2xl border border-line bg-surface p-5 pl-7 shadow-card sm:p-6 sm:pl-8">
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 shrink-0 rounded-2xl skeleton" />
        <div className="min-w-0 flex-1">
          <div className="h-3 w-32 rounded skeleton" />
          <div className="mt-3 h-6 w-3/5 rounded-lg skeleton" />
          <div className="mt-4 h-4 w-4/5 rounded skeleton" />
          <div className="mt-4 flex gap-2">
            <div className="h-7 w-20 rounded-lg skeleton" />
            <div className="h-7 w-24 rounded-lg skeleton" />
            <div className="h-7 w-16 rounded-lg skeleton" />
          </div>
          <div className="mt-5 h-px bg-line" />
          <div className="mt-4 h-3 w-28 rounded skeleton" />
        </div>
      </div>
    </div>
  );
}
