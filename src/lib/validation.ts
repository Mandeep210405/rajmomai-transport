import { z } from "zod";

export const enquiryTypes = ["Transportation", "Material Supply", "Both"] as const;

const optionalText = (max: number) => z.string().trim().max(max, `Please keep this under ${max} characters`).optional().default("");

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100, "Name is too long"),
  company: optionalText(120),
  mobile: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s()-]/g, ""))
    .pipe(z.string().regex(/^\+?\d{10,13}$/, "Enter a valid mobile number (10–13 digits)")),
  email: z
    .string()
    .trim()
    .max(160)
    .refine((v) => v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "Enter a valid email address")
    .optional()
    .default(""),
  enquiryType: z.enum(enquiryTypes, { message: "Select an enquiry type" }),
  material: optionalText(80),
  quantity: optionalText(80),
  pickup: optionalText(160),
  delivery: optionalText(160),
  requirements: optionalText(1500),
  /** Honeypot: real users never fill this. */
  website: z.string().optional().default(""),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
export type EnquiryFormValues = z.input<typeof enquirySchema>;

/** Returns a { field: message } map from a failed parse. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
