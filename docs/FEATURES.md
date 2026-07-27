# Feature Catalogue

## 1. Search and discovery

### Free-text search

The jobs query supports matching against:

- job title;
- job description;
- job location;
- an exact tag value;
- company names found in a preliminary company query.

The main search input is debounced to reduce unnecessary navigation and server requests.

### URL-driven state

The following query parameters represent the current search state:

| Parameter | Example | Purpose |
|---|---|---|
| `q` | `react` | Free-text search |
| `location` | `Mumbai` | Location filter |
| `mode` | `REMOTE` | Work-mode filter |
| `type` | `FULL_TIME` | Employment-type filter |
| `salary` | `1800000` | Minimum annual salary |
| `date` | `7` | Jobs posted within the last N days |
| `tags` | `React,TypeScript` | Required tags |
| `sort` | `salary-high` | Result ordering |
| `page` | `2` | Pagination |

URL state makes searches shareable and compatible with the browser back and forward buttons.

### Filtering

- Remote, hybrid, and on-site pills
- Full-time, part-time, contract, and internship options
- Minimum annual salary slider
- Date-posted filter
- Multi-select skills and tags
- Clear-all action

### Sorting

- Newest first
- Salary high to low
- Salary low to high
- Job title A–Z

### Pagination

Pagination is performed at the database level with Prisma `skip` and `take`. The configured page size is eight jobs.

The interface displays a compact page window containing the first page, last page, current-page neighbors, and ellipses where needed.

## 2. Command palette

The command palette opens using:

- `Ctrl + K` on Windows and Linux;
- `Command + K` on macOS;
- the Search button in the navigation bar.

Supported interactions:

- debounced API search;
- job and company results;
- Arrow Up and Arrow Down navigation;
- Enter to open the active result;
- Escape or backdrop click to close;
- recent-search memory;
- fallback to a complete jobs search when no exact item is selected.

## 3. Saved jobs

Jobs are stored as MongoDB object IDs in browser `localStorage`.

The `/saved` page calls `GET /api/jobs?ids=` to convert saved IDs into complete records while preserving the saved order.

The application listens for both:

- a custom `nexahire:saved-change` event;
- the browser `storage` event.

This keeps the saved count and saved page synchronized within the current tab and across multiple tabs.

## 4. Theme and view preferences

Browser storage keys:

| Preference | Storage key |
|---|---|
| Theme | `nexahire:theme` |
| Job layout | `nexahire:job-view` |
| Saved jobs | `nexahire:saved-jobs` |
| Recent searches | `nexahire:recent-searches` |

An inline script in the root layout applies the theme and view preference before hydration, preventing a visible theme flash on first paint.

## 5. Job cards

Job cards provide:

- company initials and brand color;
- company verification indicator;
- job title;
- location;
- work mode;
- employment type;
- salary range;
- skill tags;
- relative posting time;
- save control;
- complete-card navigation.

The card system supports list and grid layouts and uses a permanent gradient accent line.

## 6. Job details

The job detail page contains:

- job and company identity;
- posting freshness;
- location, employment, and work-mode information;
- compensation summary;
- tags;
- complete job description;
- save and share controls;
- email-based apply action;
- application safety guidance;
- company summary;
- related job recommendations.

## 7. Company discovery

The company directory displays available companies and open-job counts.

Company profile pages include:

- company identity;
- location and website where available;
- company description;
- open roles;
- dynamic metadata.

## 8. Job publishing

The guided job form captures:

- job title;
- company name;
- location;
- employment type;
- work mode;
- minimum salary;
- maximum salary;
- comma-separated tags;
- job description.

The server validates input through Zod, creates or reuses a company, creates the job, and revalidates affected pages.

## 9. Toast notifications

The custom toast system communicates:

- save and unsave success;
- job-publishing success;
- validation problems;
- network and API errors;
- newsletter actions.

## 10. Visual and motion features

- Hero animations
- Sticky blurred navbar
- Shrinking navbar behavior
- Active navigation underline
- Responsive mobile menu
- Split-flap statistics
- Auto-scrolling latest-postings ticker
- Loading skeletons
- Empty states
- Back-to-top button

The global stylesheet disables or minimizes animation when `prefers-reduced-motion` is enabled.

## 11. SEO

- Root metadata
- Per-job metadata
- Per-company metadata
- Open Graph information
- Canonical routes
- Server-rendered page content
