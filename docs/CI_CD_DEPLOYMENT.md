# CI/CD and Vercel Deployment

## Current repository workflow

The project contains `.github/workflows/ci.yml`.

It runs on:

- pushes to `main`;
- pull requests targeting `main`.

Current validation stages:

1. Repository checkout
2. Node.js 20 setup
3. Dependency installation with `npm ci`
4. Prisma Client generation
5. ESLint
6. TypeScript validation
7. Next.js production build

This is a CI quality pipeline. To satisfy the assessment’s deployment requirement, add Vercel preview and production deployment stages.

## Required GitHub secrets

Add these secrets under:

```text
GitHub repository
→ Settings
→ Secrets and variables
→ Actions
```

| Secret | Purpose |
|---|---|
| `VERCEL_TOKEN` | Vercel API token |
| `VERCEL_ORG_ID` | Vercel account or team identifier |
| `VERCEL_PROJECT_ID` | Linked Vercel project identifier |
| `DATABASE_URL` | MongoDB connection used during build/runtime where required |

## Link the Vercel project

```bash
npm install --global vercel@latest
vercel login
vercel link
```

After linking, read:

```text
.vercel/project.json
```

Copy `orgId` and `projectId` into the GitHub secrets. Do not commit `.vercel` unless the team intentionally chooses to version it.

## Add environment variables in Vercel

In the Vercel project dashboard, add:

```text
DATABASE_URL
NEXT_PUBLIC_APP_URL
```

Apply the variables to Preview and Production environments as appropriate.

## Recommended full workflow

Create or replace `.github/workflows/ci-cd.yml`:

```yaml
name: NexaHire CI/CD

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

permissions:
  contents: read

concurrency:
  group: nexahire-${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  quality:
    name: Lint · Typecheck · Build
    runs-on: ubuntu-latest
    env:
      DATABASE_URL: ${{ secrets.DATABASE_URL }}
      NEXT_TELEMETRY_DISABLED: "1"

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Generate Prisma Client
        run: npx prisma generate

      - name: Lint
        run: npm run lint

      - name: Type check
        run: npm run typecheck

      - name: Build
        run: npm run build

  preview:
    name: Deploy preview
    if: github.event_name == 'pull_request'
    needs: quality
    runs-on: ubuntu-latest
    env:
      VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
      VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Install Vercel CLI
        run: npm install --global vercel@latest

      - name: Pull preview configuration
        run: vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}

      - name: Build preview
        run: vercel build --token=${{ secrets.VERCEL_TOKEN }}

      - name: Deploy preview
        run: vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }}

  production:
    name: Deploy production
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    needs: quality
    runs-on: ubuntu-latest
    environment: production
    env:
      VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
      VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Install Vercel CLI
        run: npm install --global vercel@latest

      - name: Pull production configuration
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}

      - name: Build production
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}

      - name: Deploy production
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## Expected behavior

### Pull request

```text
Pull request
→ Install dependencies
→ Generate Prisma Client
→ Lint
→ Typecheck
→ Build
→ Vercel preview deployment
```

### Push or merge to `main`

```text
Push to main
→ Install dependencies
→ Generate Prisma Client
→ Lint
→ Typecheck
→ Build
→ Vercel production deployment
```

## Avoid duplicate deployment

If the GitHub repository is connected to Vercel’s automatic Git deployment and GitHub Actions also deploys with Vercel CLI, the same commit may be deployed twice.

For the assessment, clearly use one deployment path or disable the redundant automatic deployment behavior.

## Deployment verification checklist

- GitHub Actions is green.
- Pull requests create preview deployments.
- Merging into `main` creates a production deployment.
- The production URL loads jobs from MongoDB.
- Search and filters work on the deployed domain.
- Dynamic job and company routes work after refresh.
- Environment variables are configured for Preview and Production.
- `.env` is not committed.
- The README contains the live deployment URL.
