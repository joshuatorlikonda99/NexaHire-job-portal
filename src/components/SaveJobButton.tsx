"use client";

import { useEffect, useState } from "react";
import { BookmarkIcon } from "@/components/Icons";
import { useToast } from "@/components/ToastProvider";
import { STORAGE_KEYS } from "@/lib/preferences";

type SaveJobButtonProps = {
  jobId: string;
  compact?: boolean;
};

function readSavedJobIds(): string[] {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEYS.savedJobs) ?? "[]");
    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === "string")
      : [];
  } catch {
    return [];
  }
}

export function SaveJobButton({ jobId, compact = false }: SaveJobButtonProps) {
  const [saved, setSaved] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const sync = () => setSaved(readSavedJobIds().includes(jobId));
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("nexahire:saved-change", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("nexahire:saved-change", sync);
    };
  }, [jobId]);

  function toggleSavedJob(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    event.stopPropagation();

    try {
      const savedIds = readSavedJobIds();
      const wasSaved = savedIds.includes(jobId);
      const nextSavedIds = wasSaved
        ? savedIds.filter((id) => id !== jobId)
        : [jobId, ...savedIds];

      window.localStorage.setItem(STORAGE_KEYS.savedJobs, JSON.stringify(nextSavedIds));
      setSaved(!wasSaved);
      window.dispatchEvent(new CustomEvent("nexahire:saved-change", { detail: { jobId, saved: !wasSaved } }));
      toast({
        title: wasSaved ? "Removed from saved jobs" : "Job saved",
        description: wasSaved ? "The opportunity was removed from your shortlist." : "You can review it anytime from Saved jobs.",
        tone: "success",
      });
    } catch {
      toast({ title: "Could not update saved jobs", description: "Browser storage may be unavailable.", tone: "error" });
    }
  }

  return (
    <button
      type="button"
      onClick={toggleSavedJob}
      className={[
        "focus-ring relative z-20 inline-flex items-center justify-center rounded-xl border transition duration-200",
        saved
          ? "border-brand/20 bg-brand-light text-brand"
          : "border-line bg-surface text-ink-muted hover:border-brand/25 hover:bg-brand-light hover:text-brand",
        compact ? "h-9 w-9" : "h-11 gap-2 px-4 text-sm font-bold",
      ].join(" ")}
      aria-label={saved ? "Remove from saved jobs" : "Save this job"}
      aria-pressed={saved}
      title={saved ? "Remove saved job" : "Save job"}
    >
      <BookmarkIcon size={compact ? 17 : 18} fill={saved ? "currentColor" : "none"} />
      {!compact && <span>{saved ? "Saved" : "Save job"}</span>}
    </button>
  );
}
