import { z } from "zod";

export const jobSchema = z
  .object({
    title: z.string().trim().min(3, "Title must be at least 3 characters").max(120),
    companyName: z.string().trim().min(2, "Company name is required").max(80),
    location: z.string().trim().min(2, "Location is required").max(80),
    employmentType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"]),
    workMode: z.enum(["REMOTE", "HYBRID", "ONSITE"]),
    description: z.string().trim().min(30, "Description must be at least 30 characters").max(6000),
    salaryMin: z.coerce.number().int().positive().optional().or(z.literal("").transform(() => undefined)),
    salaryMax: z.coerce.number().int().positive().optional().or(z.literal("").transform(() => undefined)),
    tags: z.string().optional(),
  })
  .refine(
    (d) => !(d.salaryMin && d.salaryMax) || d.salaryMax >= d.salaryMin,
    { message: "Maximum salary must be greater than minimum", path: ["salaryMax"] }
  );

export type JobInput = z.infer<typeof jobSchema>;
