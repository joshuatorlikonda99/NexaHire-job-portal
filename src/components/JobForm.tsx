"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  EMPLOYMENT_LABELS,
  EMPLOYMENT_TYPES,
  WORK_MODE_LABELS,
  WORK_MODES,
} from "@/lib/format";
import { ArrowRightIcon, CheckCircleIcon } from "@/components/Icons";
import { useToast } from "@/components/ToastProvider";

type FieldErrors = Record<string, string>;

export function JobForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const { toast } = useToast();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setErrors({});
    setFormError(null);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = await response.json();

      if (!response.ok) {
        if (payload.fieldErrors) setErrors(payload.fieldErrors);
        const message = payload.message ?? "Something went wrong. Please try again.";
        setFormError(message);
        toast({ title: "Please review the form", description: message, tone: "error" });
        setSubmitting(false);
        return;
      }

      toast({ title: "Opportunity published", description: "The new role is now visible across search and the company profile." });
      window.setTimeout(() => {
        router.push(`/jobs/${payload.id}`);
        router.refresh();
      }, 450);
    } catch {
      const message = "Could not reach the server. Check your connection and try again.";
      setFormError(message);
      toast({ title: "Publishing failed", description: message, tone: "error" });
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {formError && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{formError}</div>}

      <FormSection number="01" title="Role essentials" description="Give candidates the key information they use to decide whether a role is relevant.">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Job title" name="title" error={errors.title} className="sm:col-span-2"><input name="title" id="title" type="text" placeholder="e.g. Senior Frontend Engineer" className={inputClass} /></Field>
          <Field label="Company name" name="companyName" error={errors.companyName}><input name="companyName" id="companyName" type="text" placeholder="e.g. Meridian Labs" className={inputClass} /></Field>
          <Field label="Location" name="location" error={errors.location}><input name="location" id="location" type="text" placeholder="e.g. Mumbai, India" className={inputClass} /></Field>
          <Field label="Employment type" name="employmentType" error={errors.employmentType}><select name="employmentType" id="employmentType" className={inputClass} defaultValue="FULL_TIME">{EMPLOYMENT_TYPES.map((type) => <option key={type} value={type}>{EMPLOYMENT_LABELS[type]}</option>)}</select></Field>
          <Field label="Work mode" name="workMode" error={errors.workMode}><select name="workMode" id="workMode" className={inputClass} defaultValue="HYBRID">{WORK_MODES.map((mode) => <option key={mode} value={mode}>{WORK_MODE_LABELS[mode]}</option>)}</select></Field>
        </div>
      </FormSection>

      <FormSection number="02" title="Compensation and skills" description="Transparent salary bands and focused skills improve application quality.">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Minimum salary (₹ / year)" name="salaryMin" error={errors.salaryMin} hint="Optional"><input name="salaryMin" id="salaryMin" type="number" min="0" placeholder="1800000" className={inputClass} /></Field>
          <Field label="Maximum salary (₹ / year)" name="salaryMax" error={errors.salaryMax} hint="Optional"><input name="salaryMax" id="salaryMax" type="number" min="0" placeholder="2800000" className={inputClass} /></Field>
          <Field label="Skills and tags" name="tags" error={errors.tags} hint="Comma-separated" className="sm:col-span-2"><input name="tags" id="tags" type="text" placeholder="React, TypeScript, Next.js, Accessibility" className={inputClass} /></Field>
        </div>
      </FormSection>

      <FormSection number="03" title="Tell the opportunity story" description="Describe the impact, day-to-day work, team, and what success looks like.">
        <Field label="Job description" name="description" error={errors.description} hint="Minimum 30 characters"><textarea name="description" id="description" rows={11} placeholder="Describe the role, responsibilities, expected impact, team culture, and candidate profile..." className={`${inputClass} min-h-[240px] resize-y py-3 leading-6`} /></Field>
      </FormSection>

      <div className="flex flex-col gap-3 rounded-xl2 border border-accent/15 bg-accent-light/50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface text-accent-dark"><CheckCircleIcon size={20} /></span><div><p className="text-sm font-extrabold text-ink">Your listing will publish immediately</p><p className="mt-1 text-xs leading-5 text-ink-muted">Review the details carefully before publishing.</p></div></div>
        <div className="flex gap-3">
          <button type="button" onClick={() => router.push("/")} className="focus-ring h-11 rounded-xl px-4 text-sm font-bold text-ink-soft transition hover:bg-surface">Cancel</button>
          <button type="submit" disabled={submitting} className="focus-ring inline-flex h-11 items-center gap-2 rounded-xl bg-brand px-5 text-sm font-extrabold text-white shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-brand-dark disabled:cursor-wait disabled:opacity-60">{submitting ? "Publishing..." : "Publish opportunity"}<ArrowRightIcon size={17} /></button>
        </div>
      </div>
    </form>
  );
}

const inputClass = "focus-ring h-12 w-full rounded-xl border border-line bg-surface px-3.5 text-sm font-semibold text-ink placeholder:font-normal placeholder:text-ink-muted/70 transition hover:border-brand/25";

function FormSection({ number, title, description, children }: { number: string; title: string; description: string; children: React.ReactNode }) {
  return <section className="rounded-xl3 border border-line bg-surface p-6 shadow-card sm:p-8"><div className="mb-6 flex items-start gap-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-light font-mono text-xs font-extrabold text-brand">{number}</span><div><h2 className="font-display text-xl font-extrabold tracking-tight">{title}</h2><p className="mt-1 text-sm leading-6 text-ink-muted">{description}</p></div></div>{children}</section>;
}

function Field({ label, name, error, hint, className = "", children }: { label: string; name: string; error?: string; hint?: string; className?: string; children: React.ReactNode }) {
  return <div className={className}><label htmlFor={name} className="mb-2 flex items-baseline justify-between gap-3"><span className="text-sm font-extrabold text-ink">{label}</span>{hint && <span className="text-xs font-semibold text-ink-muted">{hint}</span>}</label>{children}{error && <p className="mt-1.5 text-xs font-semibold text-red-600" role="alert">{error}</p>}</div>;
}