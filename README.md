# NexaHire Job Portal

A production-minded job marketplace built with Next.js App Router, React Server Components, Tailwind CSS, Prisma, and MongoDB.

## Advanced product features

- React Server Component data loading with Suspense-streamed job results
- Database-level filtering, sorting, and pagination
- URL-driven search state with 350ms debounced keyword updates
- Work-mode pills, employment filters, salary slider, date filters, and multi-select skills
- Ctrl/Command + K search palette with keyboard navigation and recent-search memory
- Local saved jobs, dark-mode preference, and grid/list preference
- Custom toast system, responsive shrinking navbar, mobile slide-in menu, and back-to-top control
- Pure CSS split-flap counters and latest-postings ticker
- Dynamic job/company metadata and a complete companies directory
- Reduced-motion support, skeleton loading states, ticket-style job cards, and accessible focus states

## Run locally

```bash
npm run db:push
npm run db:seed
npm run dev
```

The project expects `DATABASE_URL` in `.env`.
