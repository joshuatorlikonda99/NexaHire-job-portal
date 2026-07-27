# AI Usage Disclosure

## Summary

AI-assisted tools were used during the planning, implementation, review, debugging, CI/CD preparation, and documentation of NexaHire.

AI was used as a development assistant. Final technical decisions, source integration, validation, and project ownership remained with the human developer.

## Areas where AI was used

### Product planning

AI helped refine:

- the job marketplace business value;
- candidate and employer user journeys;
- feature prioritization;
- information architecture;
- route planning;
- reusable component boundaries.

### User interface development

AI supported the design and implementation of:

- the responsive navigation bar;
- job search and filter controls;
- list and grid job layouts;
- saved-job views;
- job details;
- company cards and directory;
- employer job-posting form;
- footer and call-to-action sections;
- loading and empty states;
- light and dark themes;
- responsive behavior;
- keyboard focus and reduced-motion support.

### Application logic

AI assisted with:

- URL-driven search state;
- debounced search behavior;
- Prisma filtering and sorting;
- database-level pagination;
- local-storage preference handling;
- saved-job synchronization;
- command-palette keyboard navigation;
- Zod validation;
- route revalidation after mutations.

### Debugging and review

AI was used to identify and correct issues involving:

- missing or incorrect exports;
- path aliases and component imports;
- dark-mode contrast;
- job card layout consistency;
- unwanted ticket-card pseudo-elements;
- route behavior;
- filter and pagination preservation;
- component separation.

### CI/CD

AI helped draft:

- GitHub Actions quality checks;
- Prisma generation steps;
- TypeScript, ESLint, and production-build stages;
- Vercel preview deployment design;
- Vercel production deployment design;
- required secrets and deployment documentation.

### Documentation

AI was used to draft:

- the project README;
- architecture documentation;
- setup instructions;
- API documentation;
- testing procedures;
- CI/CD and Vercel deployment instructions;
- security limitations;
- assessment submission guidance.

## Human review and verification

The developer:

- reviewed generated code before integration;
- tested the application in the browser;
- corrected visual and functional defects;
- validated route behavior;
- ran linting, type checking, and build checks;
- retained responsibility for credentials, deployment, and final submission.

## AI tools declaration template

Use this text in the assessment submission if required:

> AI tools were used to assist with product planning, interface development, React and TypeScript implementation, Prisma query design, debugging, accessibility improvements, CI/CD workflow preparation, and project documentation. All AI-generated output was manually reviewed, modified where necessary, tested, and integrated by the developer. No AI-generated code was accepted without human verification.

## Responsible-use notes

- No production secret should be shared in an AI prompt.
- Generated code must be reviewed for security and correctness.
- AI match scoring or automated candidate rejection is not part of this project.
- AI was not used to fabricate deployment or test results.
