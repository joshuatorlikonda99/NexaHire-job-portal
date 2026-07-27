import type { ReactNode } from "react";

type StatItem = {
  value: number;
  suffix?: string;
  label: string;
  icon: ReactNode;
};

export function SplitFlapStats({ items }: { items: StatItem[] }) {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-2 pt-10 lg:px-8" aria-label="Marketplace statistics">
      <div className="grid gap-3 rounded-xl2 border border-line bg-surface p-4 shadow-card sm:grid-cols-3 sm:p-5">
        {items.map((item, itemIndex) => (
          <article key={item.label} className="flex items-center gap-4 rounded-xl bg-paper/70 px-4 py-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-light text-brand">
              {item.icon}
            </span>
            <div>
              <div className="split-flap flex items-center gap-0.5" aria-label={`${item.value}${item.suffix ?? ""}`}>
                {String(item.value)
                  .split("")
                  .map((digit, digitIndex) => (
                    <span
                      key={`${digit}-${digitIndex}`}
                      className="split-flap-digit"
                      style={{ animationDelay: `${itemIndex * 90 + digitIndex * 55}ms` }}
                      aria-hidden="true"
                    >
                      {digit}
                    </span>
                  ))}
                {item.suffix && <span className="ml-1 font-display text-xl font-extrabold text-ink">{item.suffix}</span>}
              </div>
              <p className="mt-1 text-xs font-semibold text-ink-muted">{item.label}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
