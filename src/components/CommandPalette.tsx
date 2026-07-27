"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BriefcaseIcon,
  BuildingIcon,
  ChevronRightIcon,
  CommandIcon,
  HistoryIcon,
  SearchIcon,
  XIcon,
} from "@/components/Icons";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import {
  getRecentSearches,
  rememberSearch,
  type RecentSearch,
} from "@/lib/preferences";

type PaletteResult = {
  id: string;
  kind: "job" | "company";
  title: string;
  subtitle: string;
  href: string;
};

export function CommandPalette() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PaletteResult[]>([]);
  const [recent, setRecent] = useState<RecentSearch[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const debouncedQuery = useDebouncedValue(query.trim(), 220);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    }

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    if (!open) return;
    setRecent(getRecentSearches());
    setActiveIndex(0);
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    document.body.style.overflow = "hidden";

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open || debouncedQuery.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`, {
      signal: controller.signal,
      cache: "no-store",
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Search failed");
        return (await response.json()) as { results?: PaletteResult[] };
      })
      .then((payload) => setResults(Array.isArray(payload.results) ? payload.results : []))
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) setResults([]);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [debouncedQuery, open]);

  const visibleItems = useMemo(
    () => (query.trim().length >= 2 ? results : recent),
    [query, recent, results],
  );

  function close() {
    setOpen(false);
    setQuery("");
    setResults([]);
  }

  function navigate(item: PaletteResult | RecentSearch) {
    const label = "title" in item ? item.title : item.label;
    rememberSearch({ label, href: item.href });
    close();
    router.push(item.href);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }

    if (!visibleItems.length) {
      if (event.key === "Enter" && query.trim()) {
        event.preventDefault();
        const href = `/jobs?q=${encodeURIComponent(query.trim())}#job-results`;
        rememberSearch({ label: query.trim(), href });
        close();
        router.push(href);
      }
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % visibleItems.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + visibleItems.length) % visibleItems.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      navigate(visibleItems[activeIndex]);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="focus-ring hidden h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 text-sm font-semibold text-white/70 transition hover:bg-white/10 hover:text-white md:inline-flex"
        aria-label="Open search command palette"
      >
        <SearchIcon size={16} />
        <span className="hidden xl:inline">Search</span>
        <kbd className="ml-1 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-white/45">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-[90] flex items-start justify-center bg-midnight/70 px-4 pt-[10vh] backdrop-blur-sm" onMouseDown={close}>
          <section
            className="command-panel w-full max-w-2xl overflow-hidden rounded-3xl border border-line bg-surface shadow-float"
            role="dialog"
            aria-modal="true"
            aria-label="Search jobs and companies"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-line px-4 sm:px-5">
              <SearchIcon size={21} className="shrink-0 text-brand" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search roles, companies, or locations…"
                className="h-16 min-w-0 flex-1 bg-transparent text-base font-semibold text-ink outline-none placeholder:text-ink-muted/70"
                aria-controls="command-results"
              />
              <button
                type="button"
                onClick={close}
                className="focus-ring grid h-9 w-9 place-items-center rounded-xl text-ink-muted transition hover:bg-paper hover:text-ink"
                aria-label="Close search"
              >
                <XIcon size={17} />
              </button>
            </div>

            <div id="command-results" className="max-h-[52vh] overflow-y-auto p-2 sm:p-3">
              <div className="flex items-center justify-between px-2 pb-2 pt-1">
                <p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-ink-muted">
                  {query.trim().length >= 2 ? "Search results" : "Recent searches"}
                </p>
                {loading && <span className="text-xs font-semibold text-brand">Searching…</span>}
              </div>

              {!loading && visibleItems.length === 0 && (
                <div className="rounded-2xl bg-paper px-5 py-9 text-center">
                  <CommandIcon size={25} className="mx-auto text-brand" />
                  <p className="mt-3 text-sm font-extrabold text-ink">
                    {query.trim().length >= 2 ? "No exact matches" : "Start typing to search"}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-ink-muted">
                    Press Enter to search all jobs using the current phrase.
                  </p>
                </div>
              )}

              <div className="grid gap-1">
                {visibleItems.map((item, index) => {
                  const result = "title" in item ? item : null;
                  const title = "title" in item ? item.title : item.label;
                  const subtitle = "subtitle" in item ? item.subtitle : "Recent search";

                  return (
                    <button
                      key={`${item.href}-${index}`}
                      type="button"
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => navigate(item)}
                      className={`focus-ring flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
                        activeIndex === index ? "bg-brand-light text-brand" : "hover:bg-paper"
                      }`}
                    >
                      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${activeIndex === index ? "bg-white/70" : "bg-paper text-ink-muted"}`}>
                        {result?.kind === "company" ? (
                          <BuildingIcon size={18} />
                        ) : result?.kind === "job" ? (
                          <BriefcaseIcon size={18} />
                        ) : (
                          <HistoryIcon size={18} />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-extrabold text-ink">{title}</span>
                        <span className="mt-0.5 block truncate text-xs font-semibold text-ink-muted">{subtitle}</span>
                      </span>
                      <ChevronRightIcon size={17} className="shrink-0 text-ink-muted" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line bg-paper/65 px-5 py-3 text-[10px] font-semibold text-ink-muted">
              <span>↑↓ Navigate</span>
              <span>↵ Open</span>
              <span>Esc Close</span>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
