"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BookmarkIcon,
  BriefcaseIcon,
  MenuIcon,
  XIcon,
} from "@/components/Icons";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CommandPalette } from "@/components/CommandPalette";
import { STORAGE_KEYS } from "@/lib/preferences";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    function updateSavedCount() {
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.savedJobs) ?? "[]");
        setSavedCount(Array.isArray(saved) ? saved.length : 0);
      } catch {
        setSavedCount(0);
      }
    }

    updateSavedCount();
    window.addEventListener("nexahire:saved-change", updateSavedCount);
    window.addEventListener("storage", updateSavedCount);

    return () => {
      window.removeEventListener("nexahire:saved-change", updateSavedCount);
      window.removeEventListener("storage", updateSavedCount);
    };
  }, []);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-white/10 bg-midnight/92 text-white shadow-[0_8px_30px_rgba(8,10,25,.16)] backdrop-blur-xl transition-all duration-300 ${
        scrolled ? "nav-compact" : ""
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-300 lg:px-8 ${
          scrolled ? "h-[60px]" : "h-[72px]"
        }`}
      >
        <Link
          href="/"
          className="focus-ring flex items-center gap-3 rounded-xl"
          aria-label="NexaHire home"
        >
          <span
            className={`relative grid shrink-0 place-items-center overflow-hidden rounded-xl bg-[#fff] text-brand shadow-lg shadow-brand/30 transition-all duration-300 ${
              scrolled ? "h-9 w-9" : "h-10 w-10"
            }`}
          >
            <BriefcaseIcon size={scrolled ? 19 : 21} className="relative" />
          </span>
          <span>
            <span className={`block font-display font-extrabold tracking-tight transition-all ${scrolled ? "text-base" : "text-lg"}`}>
              NexaHire
            </span>
            <span className={`hidden text-[9px] font-semibold uppercase tracking-[.22em] text-white/45 transition-all sm:block ${scrolled ? "sm:hidden" : ""}`}>
              Careers, reimagined
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          <NavLink href="/jobs" active={pathname === "/jobs" || (pathname.startsWith("/jobs/") && pathname !== "/jobs/new")}>
            Find jobs
          </NavLink>
          <NavLink href="/companies" active={pathname.startsWith("/companies")}>
            Companies
          </NavLink>
          <NavLink href="/#career-resources" active={false}>
            Career resources
          </NavLink>
        </nav>

        <div className="hidden items-center gap-1 sm:flex">
          <CommandPalette />
          <ThemeToggle />
          <Link
            href="/saved"
            className={`focus-ring relative inline-flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold transition ${
              pathname === "/saved"
                ? "bg-white/10 text-white"
                : "text-white/78 hover:bg-white/8 hover:text-white"
            }`}
          >
            <BookmarkIcon size={18} />
            <span className="hidden xl:inline">Saved</span>
            {savedCount > 0 && (
              <span className="grid min-w-5 place-items-center rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-bold text-white">
                {savedCount > 99 ? "99+" : savedCount}
              </span>
            )}
          </Link>
          <Link
            href="/jobs/new"
            className="focus-ring ml-1 inline-flex h-10 items-center rounded-xl bg-[#fff] px-4 text-sm font-bold text-midnight shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-brand-light"
          >
            Post a job
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="focus-ring grid h-10 w-10 place-items-center rounded-xl bg-white/8 sm:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          {open ? <XIcon size={20} /> : <MenuIcon size={20} />}
        </button>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-midnight/55 backdrop-blur-sm transition sm:hidden ${scrolled ? "top-[60px]" : "top-[72px]"} ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`fixed right-0 z-50 ${scrolled ? "top-[60px] h-[calc(100dvh-60px)]" : "top-[72px] h-[calc(100dvh-72px)]"} w-[min(86vw,340px)] border-l border-white/10 bg-midnight p-5 shadow-2xl transition-transform duration-300 sm:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <p className="font-display text-lg font-extrabold">Explore NexaHire</p>
          <ThemeToggle />
        </div>
        <nav className="mt-4 grid gap-1">
          <MobileLink href="/jobs" onClick={() => setOpen(false)}>Find jobs</MobileLink>
          <MobileLink href="/companies" onClick={() => setOpen(false)}>Companies</MobileLink>
          <MobileLink href="/#career-resources" onClick={() => setOpen(false)}>Career resources</MobileLink>
          <MobileLink href="/saved" onClick={() => setOpen(false)}>Saved jobs ({savedCount})</MobileLink>
          <MobileLink href="/jobs/new" onClick={() => setOpen(false)}>Post a job</MobileLink>
        </nav>
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/60">
          Use <span className="font-mono text-white">Ctrl/⌘ + K</span> on desktop to search roles and companies instantly.
        </div>
      </aside>
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`focus-ring group relative rounded-xl px-4 py-2 text-sm font-semibold transition ${
        active ? "text-white" : "text-white/68 hover:bg-white/8 hover:text-white"
      }`}
    >
      {children}
      <span
        className={`absolute inset-x-4 -bottom-1 h-0.5 origin-left rounded-full bg-gradient-to-r from-brand to-accent transition-transform duration-300 ${
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
      />
    </Link>
  );
}

function MobileLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="focus-ring rounded-xl px-3 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/8 hover:text-white"
    >
      {children}
    </Link>
  );
}
