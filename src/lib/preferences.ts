export const STORAGE_KEYS = {
  theme: "nexahire:theme",
  viewMode: "nexahire:job-view",
  savedJobs: "nexahire:saved-jobs",
  recentSearches: "nexahire:recent-searches",
} as const;

export type ThemePreference = "light" | "dark";
export type JobViewMode = "list" | "grid";

export type RecentSearch = {
  label: string;
  href: string;
};

export function readJsonStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJsonStorage(key: string, value: unknown): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable in strict privacy modes.
  }
}

export function getRecentSearches(): RecentSearch[] {
  const value = readJsonStorage<unknown>(STORAGE_KEYS.recentSearches, []);
  if (!Array.isArray(value)) return [];

  return value
    .filter(
      (item): item is RecentSearch =>
        typeof item === "object" &&
        item !== null &&
        "label" in item &&
        "href" in item &&
        typeof item.label === "string" &&
        typeof item.href === "string",
    )
    .slice(0, 6);
}

export function rememberSearch(search: RecentSearch): void {
  const current = getRecentSearches();
  const next = [search, ...current.filter((item) => item.href !== search.href)].slice(0, 6);
  writeJsonStorage(STORAGE_KEYS.recentSearches, next);
}
