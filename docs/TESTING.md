# Testing Strategy

## Current automated validation

The repository currently includes:

- ESLint through `npm run lint`;
- TypeScript validation through `npm run typecheck`;
- production compilation through `npm run build`;
- GitHub Actions execution on pushes and pull requests.

## Required pre-submission checks

Run:

```bash
npm ci
npx prisma generate
npm run lint
npm run typecheck
npm run build
```

## Manual functional test plan

### Homepage

- Hero renders without layout shift.
- Search controls are visible.
- Statistics and ticker render.
- Curated jobs load.
- Company cards navigate correctly.
- Career-resource links are visible.

### Search and filtering

- Keyword search updates the URL.
- Debounced search does not navigate on every keystroke.
- Location filter works.
- Work-mode pills work.
- Employment-type filter works.
- Salary slider updates results.
- Date-posted filter works.
- Multiple tags are preserved in the URL.
- Sort order changes results.
- Clear-all removes active parameters.
- Browser Back restores the previous search state.

### Pagination

- Page links preserve filters.
- Previous and Next controls disable at boundaries.
- Invalid or oversized page values resolve safely.
- The page scrolls to the results anchor.

### Command palette

- `Ctrl + K` opens the palette.
- `Command + K` opens the palette on macOS.
- Two-character searches call the API.
- Arrow keys change the selected item.
- Enter opens the result.
- Escape closes the dialog.
- Recent searches appear after reopening.

### Saved jobs

- Saving a job changes the bookmark state.
- Navbar saved count updates.
- `/saved` resolves complete records.
- Removing a job updates the page.
- Changes synchronize across tabs.
- Saved jobs remain after refresh.

### Theme and view preferences

- Theme changes between light and dark.
- Theme remains after refresh.
- The first paint uses the correct theme.
- List/grid preference persists.
- Text and controls remain readable in dark mode.
- Job cards do not display unwanted pseudo-element notches.

### Job details

- Dynamic metadata uses the current job.
- Company link works.
- Save and share actions work.
- Apply action opens a pre-filled email.
- Application safety content is readable in both themes.
- Related opportunities render when available.

### Job publishing

- Required-field validation works.
- Description shorter than 30 characters is rejected.
- Invalid salary ranges are rejected.
- Successful submission creates a job.
- Successful submission redirects to the new job.
- The new job appears in search.
- The company profile displays the new job.

### Company directory

- Directory loads companies.
- Company cards display open-job counts.
- Company profile routes work.
- Company metadata is generated.

### Responsive and accessible behavior

- Desktop navigation works.
- Mobile menu opens and closes.
- Keyboard focus is visible.
- Dialog controls have accessible names.
- Reduced-motion mode suppresses major animations.
- Cards and forms are usable on narrow screens.

## Recommended future automated tests

### Unit tests

- Date threshold calculation
- Search parameter normalization
- Salary formatting
- Initial generation
- Recent-search deduplication
- Job-schema validation

### API integration tests

- Search result limits
- Invalid saved IDs
- Saved-order preservation
- Valid job creation
- Invalid job creation
- Company upsert behavior

### End-to-end tests

- Search → open job → save → view saved
- Grid/list persistence
- Theme persistence
- Publish job → verify listing
- Command palette keyboard flow

## Acceptance checklist

```text
[ ] npm ci passes
[ ] Prisma generation passes
[ ] ESLint passes
[ ] TypeScript passes
[ ] Production build passes
[ ] CI workflow is green
[ ] Preview deployment works
[ ] Production deployment works
[ ] No runtime console errors
[ ] No secret files are committed
```
