# Architecture

## Architectural style

NexaHire uses a server-first Next.js App Router architecture.

The project separates:

- server-rendered data access;
- client-side interactions;
- route handlers;
- validation;
- query construction;
- presentation components;
- persistent browser preferences.

## High-level architecture

```text
┌─────────────────────────────────────────────┐
│ Browser                                     │
│                                             │
│ Server-rendered HTML + streamed RSC payload │
│ Client components for interaction          │
│ localStorage for preferences                │
└──────────────────────┬──────────────────────┘
                       │ HTTP
                       ▼
┌─────────────────────────────────────────────┐
│ Next.js App Router                          │
│                                             │
│ Pages and layouts                           │
│ React Server Components                     │
│ Suspense boundaries                         │
│ Route handlers                              │
│ Dynamic metadata                            │
└──────────────────────┬──────────────────────┘
                       │ Typed database calls
                       ▼
┌─────────────────────────────────────────────┐
│ Prisma ORM                                  │
│                                             │
│ Query construction                          │
│ Pagination                                  │
│ Relations                                   │
│ Input persistence                           │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│ MongoDB                                     │
│                                             │
│ Companies                                   │
│ Jobs                                        │
└─────────────────────────────────────────────┘
```

## Rendering strategy

### Server Components

Server Components are used for data-backed pages and result sections. This avoids browser-side database-fetch waterfalls and keeps credentials on the server.

Examples include:

- homepage result section;
- jobs result section;
- job detail page;
- company pages;
- latest posting and statistical data.

### Client Components

Client Components are used where browser APIs or interactive state are required:

- search and filters;
- command palette;
- save buttons;
- saved-job list hydration;
- theme toggle;
- list/grid toggle;
- job form;
- share control;
- toast notifications;
- navbar behavior;
- back-to-top control.

### Suspense and streaming

The homepage and jobs page render the hero and search controls before the asynchronous job-result section resolves.

```tsx
<Suspense fallback={<JobResultsSkeleton />}>
  <JobResults searchParams={searchParams} />
</Suspense>
```

This improves perceived performance while maintaining server-side data access.

## Search request lifecycle

```text
User changes search/filter
        │
        ▼
Client component updates URL query parameters
        │
        ▼
Next.js navigates to the new server-rendered state
        │
        ▼
JobSearchParams are validated and normalized
        │
        ▼
Prisma JobWhereInput and orderBy are generated
        │
        ▼
MongoDB returns count + current page
        │
        ▼
Server Component renders the result cards
```

## Data model

### Company

| Field | Type | Notes |
|---|---|---|
| `id` | ObjectId string | MongoDB primary key |
| `name` | String | Company name |
| `slug` | String | Unique company route identifier |
| `website` | Optional string | Company website |
| `location` | Optional string | Main company location |
| `about` | Optional string | Company description |
| `logoColor` | String | UI brand color |
| `createdAt` | DateTime | Creation timestamp |

### Job

| Field | Type | Notes |
|---|---|---|
| `id` | ObjectId string | MongoDB primary key |
| `title` | String | Job title |
| `description` | String | Full role description |
| `location` | String | Display location |
| `employmentType` | Enum | Full-time, part-time, contract, internship |
| `workMode` | Enum | Remote, hybrid, on-site |
| `salaryMin` | Optional integer | Minimum annual salary |
| `salaryMax` | Optional integer | Maximum annual salary |
| `tags` | String array | Skills and keywords |
| `createdAt` | DateTime | Posting timestamp |
| `companyId` | ObjectId string | Relation to Company |

## Database indexes

The Prisma schema defines indexes for common filters and orderings:

- `createdAt`
- `workMode`
- `employmentType`
- `salaryMax`
- `companyId + createdAt`
- `workMode + createdAt`
- `employmentType + createdAt`

## API boundaries

### Search API

The command-palette API returns a limited combined result set containing jobs and companies. It is intentionally separate from full job search because it must remain lightweight.

### Jobs API

The jobs route supports:

- resolving saved job IDs;
- validating and creating a new job;
- creating or reusing a company;
- revalidating public pages after mutation.

## Preference architecture

Preferences that do not require server persistence are stored in `localStorage`:

- theme;
- job layout;
- saved job IDs;
- recent searches.

These preferences are appropriate for a no-login assessment version. A production account system should move saved jobs and preferences to authenticated server storage while retaining local fallback behavior.

## Error handling

- API routes return meaningful HTTP status codes.
- Zod errors are converted to field-level validation messages.
- Client forms display inline errors and toasts.
- Search requests use `AbortController` to cancel superseded calls.
- Local-storage operations are wrapped in `try/catch` for privacy-mode compatibility.

## Extensibility

The architecture can be extended with:

- authentication and RBAC;
- candidate profiles;
- internal applications;
- resume storage;
- employer ATS workflows;
- background notifications;
- dedicated search infrastructure;
- analytics and observability.
