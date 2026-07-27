"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  EMPLOYMENT_LABELS,
  EMPLOYMENT_TYPES,
  WORK_MODE_LABELS,
  WORK_MODES,
} from "@/lib/format";
import {
  BriefcaseIcon,
  ChevronDownIcon,
  ClockIcon,
  MapPinIcon,
  SearchIcon,
  SlidersIcon,
  TagIcon,
  WalletIcon,
  XIcon,
} from "@/components/Icons";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import {
  MAX_SALARY,
  MIN_SALARY,
  SALARY_STEP,
  SEARCH_TAGS,
} from "@/lib/search-config";

const DATE_OPTIONS = [
  { value: "", label: "Any time" },
  { value: "1", label: "Past 24 hours" },
  { value: "3", label: "Past 3 days" },
  { value: "7", label: "Past week" },
  { value: "30", label: "Past month" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "salary-high", label: "Salary: high to low" },
  { value: "salary-low", label: "Salary: low to high" },
  { value: "title", label: "Role title A–Z" },
];

type SearchFiltersProps = {
  actionPath?: string;
};

export function SearchFilters({ actionPath = "/jobs" }: SearchFiltersProps) {
  const router = useRouter();
  const params = useSearchParams();
  const paramsString = params.toString();
  const [isPending, startTransition] = useTransition();
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [q, setQ] = useState(params.get("q") ?? "");
  const [location, setLocation] = useState(params.get("location") ?? "");
  const [salary, setSalary] = useState(params.get("salary") ?? "0");
  const debouncedQ = useDebouncedValue(q.trim(), 350);
  const debouncedSalary = useDebouncedValue(salary, 350);
  const qReady = useRef(false);
  const salaryReady = useRef(false);

  const buildHref = useCallback(
    (updates: Record<string, string>) => {
      const next = new URLSearchParams(paramsString);

      Object.entries(updates).forEach(([key, value]) => {
        if (value && value !== "0" && value !== "newest") next.set(key, value);
        else next.delete(key);
      });

      next.delete("page");
      const query = next.toString();
      return `${actionPath}${query ? `?${query}` : ""}#job-results`;
    },
    [actionPath, paramsString],
  );

  const updateParams = useCallback(
    (updates: Record<string, string>, history: "push" | "replace" = "push") => {
      const href = buildHref(updates);
      startTransition(() => {
        if (history === "replace") router.replace(href, { scroll: false });
        else router.push(href);
      });
    },
    [buildHref, router],
  );

  useEffect(() => {
    const current = new URLSearchParams(paramsString);
    setQ(current.get("q") ?? "");
    setLocation(current.get("location") ?? "");
    setSalary(current.get("salary") ?? "0");
  }, [paramsString]);

  useEffect(() => {
    if (!qReady.current) {
      qReady.current = true;
      return;
    }

    const currentQ = new URLSearchParams(paramsString).get("q") ?? "";
    if (debouncedQ !== currentQ) updateParams({ q: debouncedQ }, "replace");
  }, [debouncedQ, paramsString, updateParams]);

  useEffect(() => {
    if (!salaryReady.current) {
      salaryReady.current = true;
      return;
    }

    const currentSalary = new URLSearchParams(paramsString).get("salary") ?? "0";
    if (debouncedSalary !== currentSalary) {
      updateParams({ salary: debouncedSalary }, "replace");
    }
  }, [debouncedSalary, paramsString, updateParams]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateParams({ q: q.trim(), location: location.trim(), salary });
  }

  function clearAll() {
    setQ("");
    setLocation("");
    setSalary("0");
    startTransition(() => router.push(`${actionPath}#job-results`));
  }

  const selectedTags = (params.get("tags") ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  const activeCount = ["q", "location", "mode", "type", "salary", "date", "tags"].filter(
    (key) => params.get(key),
  ).length;

  return (
    <div className="relative z-20 mx-auto max-w-7xl px-5 lg:px-8">
      <div className="glass-panel -mt-2 overflow-visible rounded-xl3 border border-white/70 shadow-float">
        <form
          onSubmit={handleSubmit}
          className="grid gap-3 p-4 sm:p-5 lg:grid-cols-[1.35fr_1fr_.72fr_auto] lg:items-end"
        >
          <TextField
            label="Job title or keyword"
            value={q}
            onChange={setQ}
            placeholder="Frontend engineer, React, AI..."
            icon={<SearchIcon size={19} />}
          />
          <TextField
            label="Location"
            value={location}
            onChange={setLocation}
            placeholder="Mumbai, Bengaluru, Remote"
            icon={<MapPinIcon size={19} />}
          />
          <SelectField
            label="Job type"
            value={params.get("type") ?? ""}
            onChange={(value) => updateParams({ type: value })}
            icon={<BriefcaseIcon size={18} />}
            options={[
              { value: "", label: "All job types" },
              ...EMPLOYMENT_TYPES.map((type) => ({
                value: type,
                label: EMPLOYMENT_LABELS[type],
              })),
            ]}
          />
          <button
            type="submit"
            disabled={isPending}
            className="focus-ring inline-flex h-[50px] items-center justify-center gap-2 rounded-xl bg-brand px-6 text-sm font-extrabold text-white shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-brand-dark disabled:cursor-wait disabled:opacity-70"
          >
            <SearchIcon size={18} />
            {isPending ? "Updating…" : "Search jobs"}
          </button>
        </form>

        <div className="border-t border-line/80 bg-surface px-4 py-3 sm:px-5">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setAdvancedOpen((value) => !value)}
              className="focus-ring inline-flex h-9 items-center gap-2 rounded-lg border border-line bg-surface px-3 text-xs font-bold text-ink-soft transition hover:border-brand/25 hover:text-brand"
              aria-expanded={advancedOpen}
            >
              <SlidersIcon size={16} />
              More filters
              {activeCount > 0 && (
                <span className="grid min-w-5 place-items-center rounded-full bg-brand px-1.5 py-0.5 text-[10px] text-white">
                  {activeCount}
                </span>
              )}
              <ChevronDownIcon
                size={14}
                className={`transition-transform ${advancedOpen ? "rotate-180" : ""}`}
              />
            </button>

            {WORK_MODES.map((mode) => (
              <QuickFilter
                key={mode}
                active={params.get("mode") === mode}
                onClick={() =>
                  updateParams({ mode: params.get("mode") === mode ? "" : mode })
                }
              >
                {WORK_MODE_LABELS[mode]}
              </QuickFilter>
            ))}

            <QuickFilter
              active={params.get("date") === "1"}
              onClick={() =>
                updateParams({ date: params.get("date") === "1" ? "" : "1" })
              }
            >
              Posted today
            </QuickFilter>

            {activeCount > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="focus-ring ml-auto inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs font-bold text-ink-muted transition hover:bg-red-50 hover:text-red-600"
              >
                <XIcon size={14} />
                Clear all
              </button>
            )}
          </div>

          {advancedOpen && (
            <div className="mt-3 grid gap-3 border-t border-line/70 pt-4 sm:grid-cols-2 lg:grid-cols-4 animate-rise">
              <SalarySlider value={salary} onChange={setSalary} />
              <TagPopover
                selected={selectedTags}
                onChange={(tags) => updateParams({ tags: tags.join(",") })}
              />
              <SelectField
                label="Date posted"
                value={params.get("date") ?? ""}
                onChange={(value) => updateParams({ date: value })}
                icon={<ClockIcon size={17} />}
                compact
                options={DATE_OPTIONS}
              />
              <SelectField
                label="Sort results"
                value={params.get("sort") ?? "newest"}
                onChange={(value) => updateParams({ sort: value })}
                icon={<SlidersIcon size={17} />}
                compact
                options={SORT_OPTIONS}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  icon,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-extrabold uppercase tracking-[.11em] text-ink-muted">
        {label}
      </span>
      <span className="relative block">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted">
          {icon}
        </span>
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="focus-ring h-[50px] w-full rounded-xl border border-line bg-surface pl-11 pr-4 text-sm font-semibold text-ink placeholder:font-normal placeholder:text-ink-muted/75 transition hover:border-brand/25"
        />
      </span>
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  icon,
  compact = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  icon: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <label className="block">
      <span className={`${compact ? "mb-1.5" : "mb-2"} block text-xs font-extrabold uppercase tracking-[.11em] text-ink-muted`}>
        {label}
      </span>
      <span className="relative block">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted">
          {icon}
        </span>
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`focus-ring w-full appearance-none rounded-xl border border-line bg-surface pl-10 pr-9 text-sm font-semibold text-ink transition hover:border-brand/25 ${compact ? "h-11" : "h-[50px]"}`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          size={15}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted"
        />
      </span>
    </label>
  );
}

function SalarySlider({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const numeric = Number(value) || 0;
  return (
    <label className="block rounded-xl border border-line bg-surface px-3.5 py-2.5">
      <span className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.11em] text-ink-muted">
          <WalletIcon size={16} /> Minimum pay
        </span>
        <span className="text-xs font-extrabold text-brand">
          {numeric > 0 ? formatMinimumPay(numeric) : "Any"}
        </span>
      </span>
      <input
        type="range"
        min={MIN_SALARY}
        max={MAX_SALARY}
        step={SALARY_STEP}
        value={numeric}
        onChange={(event) => onChange(event.target.value)}
        className="salary-range mt-2 w-full accent-brand"
        aria-label="Minimum annual salary"
      />
    </label>
  );
}

function TagPopover({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (selected: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeOnOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", closeOnOutside);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutside);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  function toggle(tag: string) {
    onChange(selected.includes(tag) ? selected.filter((item) => item !== tag) : [...selected, tag]);
  }

  return (
    <div ref={containerRef} className="relative">
      <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-[.11em] text-ink-muted">
        Skills and tags
      </span>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="focus-ring flex h-11 w-full items-center gap-2 rounded-xl border border-line bg-surface px-3.5 text-left text-sm font-semibold text-ink transition hover:border-brand/25"
        aria-expanded={open}
      >
        <TagIcon size={17} className="text-ink-muted" />
        <span className="min-w-0 flex-1 truncate">
          {selected.length ? `${selected.length} selected` : "Any skills"}
        </span>
        <ChevronDownIcon size={15} className={`text-ink-muted transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-50 w-[min(88vw,320px)] rounded-2xl border border-line bg-surface p-3 shadow-float">
          <div className="flex items-center justify-between px-1 pb-2">
            <p className="text-xs font-extrabold text-ink">Choose multiple skills</p>
            {selected.length > 0 && (
              <button type="button" onClick={() => onChange([])} className="text-xs font-bold text-brand">
                Clear
              </button>
            )}
          </div>
          <div className="grid max-h-64 gap-1 overflow-y-auto">
            {SEARCH_TAGS.map((tag) => (
              <label key={tag} className="flex cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 text-sm font-semibold text-ink-soft transition hover:bg-paper">
                <input
                  type="checkbox"
                  checked={selected.includes(tag)}
                  onChange={() => toggle(tag)}
                  className="h-4 w-4 rounded border-line accent-brand"
                />
                {tag}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function QuickFilter({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`focus-ring h-9 rounded-full border px-3 text-xs font-bold transition ${
        active
          ? "border-brand/20 bg-brand text-white shadow-sm"
          : "border-line bg-surface text-ink-muted hover:border-brand/25 hover:text-brand"
      }`}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}

function formatMinimumPay(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    notation: "compact",
    maximumFractionDigits: 0,
  }).format(value);
}
