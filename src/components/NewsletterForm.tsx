"use client";

import { useState } from "react";
import { MailIcon } from "@/components/Icons";
import { useToast } from "@/components/ToastProvider";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = email.trim();
    if (!normalized || !/^\S+@\S+\.\S+$/.test(normalized)) {
      toast({ title: "Enter a valid email address", tone: "error" });
      return;
    }

    toast({
      title: "You’re on the list",
      description: "We’ll send fresh roles and practical career updates.",
    });
    setEmail("");
  }

  return (
    <form onSubmit={submit} className="mt-4 flex max-w-xs gap-2">
      <label className="sr-only" htmlFor="newsletter-email">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@example.com"
        className="focus-ring h-10 min-w-0 flex-1 rounded-xl border border-white/15 bg-white/5 px-3 text-sm text-white placeholder:text-white/35"
      />
      <button
        type="submit"
        className="focus-ring grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/15 text-white/80 transition hover:bg-white/10 hover:text-white"
        aria-label="Join updates"
      >
        <MailIcon size={17} />
      </button>
    </form>
  );
}
