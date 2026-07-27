type TickerItem = {
  id: string;
  title: string;
  company: string;
  location: string;
};

export function PostingsTicker({ items }: { items: TickerItem[] }) {
  if (!items.length) return null;
  const repeated = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-line bg-surface" aria-label="Latest job postings">
      <div className="ticker-track flex w-max items-center py-3">
        {repeated.map((item, index) => (
          <span key={`${item.id}-${index}`} className="flex items-center gap-3 px-6 text-xs font-semibold text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="font-extrabold text-ink">{item.title}</span>
            <span>at {item.company}</span>
            <span className="text-brand">{item.location}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
