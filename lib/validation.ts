import { jobTypes, locationTypes } from "@/constant/jobConstant";
import { z } from "zod";

const requiredString = z.string().min(1, "Required");
const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number");

const companyLogoSchema = z
  .custom<File | undefined>()
  .refine(
    (file) =>
      !file || (file instanceof File && file?.type.startsWith("image/")),
    "Must be an image file",
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "File must be less than 2MB");

const applicationSchema = z
  .object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(100).url().optional().or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Email or Url is required",
    path: ["applicationEmail"],
  });

const locationSchema = z
  .object({
    locationType: requiredString.refine((value) => {
      locationTypes.includes(value),
        "Invalid location. Must be one of: " + locationTypes;
    }),
    location: z.string().max(100).optional(),
  })
  .refine((data) => !data.locationType || data.locationType || data.location, {
    message: "Location is required for on-site jobs",
    path: ["location"],
  });

export const createJobSchema = z
  .object({
    title: requiredString.max(100),
    type: requiredString.refine((value) => {
      jobTypes.includes(value), "Invalid type. Must be one of: " + jobTypes;
    }),
    companyName: requiredString.max(100),
    companyLogo: companyLogoSchema,
    location: requiredString,
    description: z.string().max(5000).optional(),
    salary: numericRequiredString.max(
      9,
      "Must be less than or equal to 9 digits",
    ),
  })
  .and(applicationSchema)
  .and(locationSchema);

export type CreateJobSchema = z.infer<typeof createJobSchema>;

export const jobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

export type JobFilterSchema = z.infer<typeof jobFilterSchema>;
