"use client";

import { useEffect, useState } from "react";
import { GridIcon, ListIcon } from "@/components/Icons";
import { STORAGE_KEYS, type JobViewMode } from "@/lib/preferences";

export function ViewModeToggle() {
  const [mode, setMode] = useState<JobViewMode>("list");

  useEffect(() => {
    setMode(document.documentElement.dataset.jobView === "grid" ? "grid" : "list");
  }, []);

  function selectMode(next: JobViewMode) {
    document.documentElement.dataset.jobView = next;
    window.localStorage.setItem(STORAGE_KEYS.viewMode, next);
    setMode(next);
  }

  return (
    <div className="inline-flex rounded-xl border border-line bg-surface p-1 shadow-sm" aria-label="Job card view">
      <ToggleButton active={mode === "list"} label="List view" onClick={() => selectMode("list")}>
        <ListIcon size={17} />
      </ToggleButton>
      <ToggleButton active={mode === "grid"} label="Grid view" onClick={() => selectMode("grid")}>
        <GridIcon size={17} />
      </ToggleButton>
    </div>
  );
}

function ToggleButton({
  active,
  label,
  onClick,
  children,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`focus-ring grid h-8 w-8 place-items-center rounded-lg transition ${
        active ? "bg-brand text-white" : "text-ink-muted hover:bg-paper hover:text-brand"
      }`}
      aria-label={label}
      aria-pressed={active}
      title={label}
    >
      {children}
    </button>
  );
}
