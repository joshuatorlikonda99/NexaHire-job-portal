# Security, Privacy, and Limitations

## Current security controls

- Server-side Zod validation for job creation
- Restricted enum values for employment type and work mode
- Salary-range validation
- MongoDB ObjectId validation for saved-job resolution
- Search input length limit in the command-palette API
- Server-only database access through Prisma
- Environment-based database credentials
- No database credentials exposed to client components
- Basic error responses that avoid returning stack traces

## Required production improvements

### Authentication and authorization

The current project does not authenticate employers. Before production use:

- add employer authentication;
- protect `POST /api/jobs`;
- verify company ownership;
- add role-based authorization;
- add an admin moderation workflow.

### Rate limiting

Apply rate limits to:

- `GET /api/search`;
- `GET /api/jobs?ids=`;
- `POST /api/jobs`.

### Job moderation

Prevent spam, scams, prohibited content, unsafe links, and duplicate listings.

### Application handling

The current apply flow opens an email client. A production internal application flow should include:

- authenticated candidates;
- secure resume storage;
- file-type and file-size validation;
- malware scanning;
- privacy controls;
- audit history.

### Browser storage

Saved jobs, recent searches, theme, and view mode are stored locally. Users should understand that:

- the data is specific to the browser profile;
- clearing site data removes it;
- it is not synchronized across devices;
- shared computers may expose saved preferences to another browser user.

### Security headers

Add and verify:

- Content-Security-Policy;
- Strict-Transport-Security;
- X-Content-Type-Options;
- Referrer-Policy;
- Permissions-Policy;
- frame-ancestor restrictions.

### Logging and observability

Production logs should avoid storing:

- passwords;
- tokens;
- full database URLs;
- private candidate content;
- resume content unless explicitly required and protected.

## Functional limitations

- No authentication
- No internal application records
- No employer dashboard
- No candidate profile
- No email or push notifications
- No cross-device saved jobs
- No relevance-ranked search engine
- No content moderation
- No analytics dashboard
- No automated unit or end-to-end test suite in the current version

## Data model limitation

The current schema contains only Company and Job records. It is intentionally compact for the assessment.

## Deployment limitation

The repository currently includes CI validation. Automated Vercel CD must be configured with repository secrets and a Vercel project before claiming complete CI/CD deployment.
