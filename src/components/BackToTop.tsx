"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon } from "@/components/Icons";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 700);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`focus-ring fixed bottom-5 left-5 z-40 grid h-11 w-11 place-items-center rounded-2xl border border-line bg-surface text-ink-soft shadow-float transition duration-300 hover:-translate-y-1 hover:border-brand/25 hover:text-brand ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      aria-label="Back to top"
      title="Back to top"
    >
      <ArrowUpIcon size={18} />
    </button>
  );
}
