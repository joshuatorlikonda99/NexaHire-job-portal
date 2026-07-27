# Assessment Submission Guide

## Assessment requirements mapping

| Requirement | NexaHire evidence |
|---|---|
| Build a business-value application using AI | NexaHire job marketplace and AI usage documentation |
| Push code to Git | GitHub repository URL |
| Write CI/CD using AI | GitHub Actions workflow and AI disclosure |
| Deploy to Vercel using CI/CD | Production workflow run and Vercel URL |
| Write documentation using AI | README and `/docs` package |
| Send the completed work | Submission email with all links |

## Final items to prepare

1. GitHub repository URL
2. Vercel production URL
3. GitHub Actions workflow URL
4. README URL
5. AI usage disclosure URL
6. Optional preview deployment URL
7. Contact details

## Replace documentation placeholders

Before submission, replace:

```text
<YOUR_GITHUB_USERNAME>
<YOUR_REPOSITORY_NAME>
<YOUR_GITHUB_REPOSITORY_URL>
<YOUR_GITHUB_ACTIONS_URL>
<YOUR_VERCEL_PRODUCTION_URL>
<YOUR_NAME>
<YOUR_EMAIL>
<YOUR_GITHUB_PROFILE>
```

## Repository checklist

```text
[ ] Repository is public or reviewer access is granted
[ ] main branch contains the final project
[ ] README displays correctly
[ ] docs directory is committed
[ ] .env is not committed
[ ] node_modules is not committed
[ ] .next is not committed
[ ] CI workflow is green
[ ] Production deployment workflow is green
[ ] Live URL loads successfully
[ ] Database contains sample records
[ ] No browser-console errors are visible
```

## Recommended final commit

```bash
git add README.md docs .github/workflows
git commit -m "docs: add complete project and deployment documentation"
git push origin main
```

## Submission email

```text
Subject: AI Development Assessment Submission – NexaHire – <YOUR_NAME>

Dear Team,

Please find my completed AI Development Assessment submission.

Project:
NexaHire – Intelligent Career Marketplace

Business value:
NexaHire helps candidates search, compare, save, and explore structured job opportunities while providing employers with a guided job-publishing workflow.

GitHub repository:
<YOUR_GITHUB_REPOSITORY_URL>

Live Vercel application:
<YOUR_VERCEL_PRODUCTION_URL>

GitHub Actions CI/CD:
<YOUR_GITHUB_ACTIONS_URL>

Documentation:
<YOUR_GITHUB_REPOSITORY_URL>/blob/main/README.md

AI usage disclosure:
<YOUR_GITHUB_REPOSITORY_URL>/blob/main/docs/AI_USAGE.md

Technology stack:
Next.js, React, TypeScript, Tailwind CSS, Prisma, MongoDB, GitHub Actions, and Vercel.

AI tools were used to assist with product planning, UI development, implementation, debugging, CI/CD preparation, code review, and documentation. All generated output was manually reviewed and tested before integration.

Regards,
<YOUR_NAME>
<YOUR_PHONE>
<YOUR_EMAIL>
```

## Demo walkthrough

A concise demonstration can follow this order:

1. Explain the business problem and value.
2. Show the homepage and responsive design.
3. Search and apply filters.
4. Demonstrate URL-driven state and pagination.
5. Open the command palette with `Ctrl + K`.
6. Save a job and open `/saved`.
7. Switch theme and list/grid view.
8. Open a job details page.
9. Open a company profile.
10. Publish a sample job.
11. Show GitHub commit history.
12. Show the GitHub Actions run.
13. Open the Vercel production deployment.
14. Show the documentation and AI disclosure.
