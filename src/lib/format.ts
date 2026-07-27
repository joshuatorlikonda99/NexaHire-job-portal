import type { EmploymentType, WorkMode } from "@prisma/client";

export const EMPLOYMENT_LABELS: Record<EmploymentType, string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACT: "Contract",
  INTERNSHIP: "Internship",
};

export const WORK_MODE_LABELS: Record<WorkMode, string> = {
  REMOTE: "Remote",
  HYBRID: "Hybrid",
  ONSITE: "On-site",
};

export const EMPLOYMENT_TYPES = Object.keys(EMPLOYMENT_LABELS) as EmploymentType[];
export const WORK_MODES = Object.keys(WORK_MODE_LABELS) as WorkMode[];

export function formatSalary(min?: number | null, max?: number | null): string | null {
  if (!min && !max) return null;
  const fmt = (n: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
      notation: "compact",
    }).format(n);
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  return `Up to ${fmt(max!)}`;
}

export function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  const table: [number, string][] = [
    [60, "just now"],
    [3600, "m"],
    [86400, "h"],
    [604800, "d"],
    [2592000, "w"],
  ];
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return `${Math.floor(seconds / 604800)}w ago`;
}

export function initials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
