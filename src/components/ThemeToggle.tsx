"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@/components/Icons";
import { STORAGE_KEYS, type ThemePreference } from "@/lib/preferences";

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemePreference>("light");

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  function toggleTheme() {
    const next: ThemePreference = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    window.localStorage.setItem(STORAGE_KEYS.theme, next);
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="focus-ring grid h-10 w-10 place-items-center rounded-xl text-white/75 transition hover:bg-white/10 hover:text-white"
      aria-label={theme === "dark" ? "Use light theme" : "Use dark theme"}
      title={theme === "dark" ? "Light theme" : "Dark theme"}
    >
      {theme === "dark" ? <SunIcon size={18} /> : <MoonIcon size={18} />}
    </button>
  );
}
