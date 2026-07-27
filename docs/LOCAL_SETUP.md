# Local Setup and Operations

## Requirements

- Node.js 20+
- npm 10+
- MongoDB Atlas or another replica-set deployment
- Git

## Environment configuration

Create `.env` in the project root:

```env
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

The current application directly requires `DATABASE_URL`. `NEXT_PUBLIC_APP_URL` is recommended for production metadata and future integrations.

## Installation

```bash
npm install
npx prisma generate
npm run db:push
npm run db:seed
npm run dev
```

## Production-style local verification

```bash
npm ci
npx prisma generate
npm run lint
npm run typecheck
npm run build
npm run start
```

## Database operations

### Push the schema

```bash
npm run db:push
```

### Seed sample data

```bash
npm run db:seed
```

### Inspect records

```bash
npm run db:studio
```

## Common issues

### Prisma cannot connect

Verify:

- the MongoDB connection string;
- database user permissions;
- network access settings in MongoDB Atlas;
- that the deployment supports replica-set behavior.

### Prisma Client is missing or outdated

```bash
npx prisma generate
```

Restart the development server afterward.

### Port 3000 is already in use

```bash
npm run dev -- -p 3001
```

### Environment changes are not reflected

Restart the Next.js process after modifying `.env`.

### Saved jobs disappear

Saved jobs are browser-local. They will not be available in another browser, browser profile, device, or after clearing site storage.

### Theme or view preference appears incorrect

Clear these local-storage keys in browser developer tools:

```text
nexahire:theme
nexahire:job-view
nexahire:saved-jobs
nexahire:recent-searches
```

## Recommended development workflow

```bash
git checkout -b feature/<feature-name>
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
git add .
git commit -m "feat: describe the change"
git push -u origin feature/<feature-name>
```
