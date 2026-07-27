"use client";

import { ExternalLinkIcon } from "@/components/Icons";
import { useToast } from "@/components/ToastProvider";

export function ShareJobButton({ title }: { title: string }) {
  const { toast } = useToast();

  async function share() {
    const shareData = {
      title,
      text: `Take a look at this opportunity: ${title}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
      await navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link copied", description: "The opportunity link is ready to share." });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      toast({ title: "Could not share this job", tone: "error" });
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className="focus-ring inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-4 text-sm font-bold text-ink-soft transition hover:border-brand/25 hover:text-brand"
    >
      <ExternalLinkIcon size={17} /> Share
    </button>
  );
}
