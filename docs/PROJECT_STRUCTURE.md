# Project Structure

```text
jobs-board/
├── .github/
│   └── workflows/
│       └── ci.yml
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── jobs/
│   │   │   │   └── route.ts
│   │   │   └── search/
│   │   │       └── route.ts
│   │   ├── companies/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── jobs/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   ├── saved/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── BackToTop.tsx
│   │   ├── CommandPalette.tsx
│   │   ├── CompanyCard.tsx
│   │   ├── Footer.tsx
│   │   ├── HomeResults.tsx
│   │   ├── Icons.tsx
│   │   ├── JobCard.tsx
│   │   ├── JobCardSkeleton.tsx
│   │   ├── JobForm.tsx
│   │   ├── JobResults.tsx
│   │   ├── JobResultsSkeleton.tsx
│   │   ├── JobsExplorer.tsx
│   │   ├── Navbar.tsx
│   │   ├── NewsletterForm.tsx
│   │   ├── Pagination.tsx
│   │   ├── PostingsTicker.tsx
│   │   ├── SaveJobButton.tsx
│   │   ├── SavedJobsList.tsx
│   │   ├── SearchFilters.tsx
│   │   ├── ShareJobButton.tsx
│   │   ├── SplitFlapStats.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── ToastProvider.tsx
│   │   └── ViewModeToggle.tsx
│   ├── hooks/
│   │   └── useDebouncedValue.ts
│   └── lib/
│       ├── format.ts
│       ├── jobs.ts
│       ├── preferences.ts
│       ├── prisma.ts
│       ├── search-config.ts
│       └── validation.ts
├── .env.example
├── .eslintrc.json
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## Important modules

### `src/lib/jobs.ts`

Central job-query service responsible for filters, sort order, date thresholds, tag requirements, counts, and pagination.

### `src/lib/prisma.ts`

Prisma Client singleton used by server components and route handlers.

### `src/lib/validation.ts`

Zod schema for job-publishing validation.

### `src/lib/preferences.ts`

Browser-storage keys and safe read/write helpers.

### `src/components/SearchFilters.tsx`

Client-side URL search controls with debouncing and advanced filters.

### `src/components/JobResults.tsx`

Async result component used inside Suspense boundaries.

### `src/components/CommandPalette.tsx`

Keyboard-driven global search experience.

### `src/app/api/jobs/route.ts`

Saved-job resolution and job creation.

### `src/app/api/search/route.ts`

Lightweight job and company lookup for the command palette.
