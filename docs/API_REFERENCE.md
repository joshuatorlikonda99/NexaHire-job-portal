# API Reference

## General response format

API routes return JSON. Error responses include a human-readable `message` where appropriate.

## GET `/api/search`

Lightweight command-palette search.

### Query parameters

| Parameter | Required | Description |
|---|---:|---|
| `q` | Yes | Search text. Trimmed to 80 characters. Minimum two characters. |

### Request

```http
GET /api/search?q=frontend
```

### Successful response

```json
{
  "results": [
    {
      "id": "66f000000000000000000001",
      "kind": "job",
      "title": "Senior Frontend Engineer",
      "subtitle": "Meridian Labs · Remote (India)",
      "href": "/jobs/66f000000000000000000001"
    },
    {
      "id": "66f000000000000000000010",
      "kind": "company",
      "title": "Meridian Labs",
      "subtitle": "Bengaluru, India",
      "href": "/companies/meridian-labs"
    }
  ]
}
```

### Behavior

- Returns an empty list when `q` contains fewer than two characters.
- Returns up to six jobs and four companies.
- Uses `cache: no-store` from the command-palette client.

### Error response

```json
{
  "results": []
}
```

Status: `500`

## GET `/api/jobs?ids=`

Resolves saved job IDs into complete records.

### Query parameters

| Parameter | Required | Description |
|---|---:|---|
| `ids` | Yes | Comma-separated MongoDB ObjectId strings. Limited to 100 IDs. |

### Request

```http
GET /api/jobs?ids=66f000000000000000000001,66f000000000000000000002
```

### Successful response

```json
{
  "jobs": [
    {
      "id": "66f000000000000000000001",
      "title": "Senior Frontend Engineer",
      "location": "Remote (India)",
      "workMode": "REMOTE",
      "employmentType": "FULL_TIME",
      "salaryMin": 1800000,
      "salaryMax": 2800000,
      "tags": ["React", "TypeScript"],
      "createdAt": "2026-07-27T00:00:00.000Z",
      "company": {
        "name": "Meridian Labs",
        "slug": "meridian-labs",
        "logoColor": "#0F766E"
      }
    }
  ]
}
```

The API preserves the order of IDs supplied in the request.

### Empty response

```json
{
  "jobs": []
}
```

## POST `/api/jobs`

Creates a new job and creates or reuses its company.

### Request body

```json
{
  "title": "Senior Backend Engineer",
  "companyName": "Cobalt Studio",
  "location": "Pune, India",
  "employmentType": "FULL_TIME",
  "workMode": "HYBRID",
  "salaryMin": "2800000",
  "salaryMax": "4500000",
  "tags": "Java, Spring Boot, Microservices",
  "description": "A complete description with at least thirty characters."
}
```

### Validation rules

| Field | Rule |
|---|---|
| `title` | 3–120 characters |
| `companyName` | 2–80 characters |
| `location` | 2–80 characters |
| `employmentType` | `FULL_TIME`, `PART_TIME`, `CONTRACT`, or `INTERNSHIP` |
| `workMode` | `REMOTE`, `HYBRID`, or `ONSITE` |
| `description` | 30–6000 characters |
| `salaryMin` | Optional positive integer |
| `salaryMax` | Optional positive integer and not less than `salaryMin` |
| `tags` | Optional comma-separated string |

### Successful response

Status: `201`

```json
{
  "id": "66f000000000000000000001"
}
```

### Validation response

Status: `422`

```json
{
  "message": "Please fix the highlighted fields.",
  "fieldErrors": {
    "title": "Title must be at least 3 characters",
    "salaryMax": "Maximum salary must be greater than minimum"
  }
}
```

### Invalid JSON response

Status: `400`

```json
{
  "message": "Invalid request body."
}
```

### Server error response

Status: `500`

```json
{
  "message": "We couldn't save this job. Please try again."
}
```

## Security note

The current assessment implementation does not require authentication for `POST /api/jobs`. Protect this endpoint with employer authentication, role authorization, rate limiting, and moderation before public production use.
