# Project Overview

## Product name

**NexaHire — Intelligent Career Marketplace**

## Product category

Job discovery and employer job-publishing platform.

## Problem statement

Job seekers often need to move between multiple platforms to compare salary, work mode, employment type, skills, company information, and posting freshness. Search state is often lost when navigating backward, and saved opportunities may require account creation.

Employers also need a clear way to publish structured job information that can be searched and filtered immediately.

## Proposed solution

NexaHire provides a modern job marketplace where:

- candidates can search and compare jobs using structured filters;
- search state is represented in the URL and can be shared or revisited;
- candidates can save jobs without creating an account;
- job and company pages are server-rendered and search-engine friendly;
- employers can publish validated opportunities through a guided form;
- the interface supports responsive layouts, dark mode, keyboard navigation, and reduced-motion preferences.

## Target users

### Candidates

Candidates looking for technology, business, design, data, and product opportunities, including remote, hybrid, on-site, full-time, part-time, contract, and internship roles.

### Employers

Small and medium-sized companies that need a simple structured job-publishing workflow.

### Reviewers and administrators

Technical evaluators reviewing product value, code quality, architecture, CI/CD, accessibility, and deployment readiness.

## Business value

### Candidate value

- Faster discovery through searchable structured data
- Clear salary and work-mode information
- Shareable search URLs
- Saved-job persistence without mandatory registration
- Improved comparison through consistent job cards
- Company discovery alongside job discovery

### Employer value

- Structured listing creation
- Immediate visibility in job search
- Automatic company creation or reuse
- Consistent validation of required fields
- Searchable skills and salary metadata

### Platform value

- Server-rendered and SEO-oriented content
- Reusable components and centralized query logic
- Database-level pagination for scale
- Clear extension path toward authentication, internal applications, and an ATS

## Product success indicators

The current assessment version does not include analytics, but future product success could be measured using:

- job-search-to-detail-view conversion;
- saved-job rate;
- application-link click rate;
- search result latency;
- job-form completion rate;
- job-posting success rate;
- repeat visits;
- company-profile engagement.

## Scope included

- Homepage
- Job-search page
- Job details
- Saved jobs
- Company directory and profiles
- Job-posting workflow
- Search API for the command palette
- Saved-job resolution API
- Prisma and MongoDB data model
- CI quality checks
- Vercel deployment documentation

## Scope excluded from the current version

- Authentication and role-based authorization
- Internal candidate applications
- Resume upload and parsing
- Employer applicant tracking
- Payments and subscriptions
- Email notification service
- Cross-device preference synchronization
- Moderation dashboard
