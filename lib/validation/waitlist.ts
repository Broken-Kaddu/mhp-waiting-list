import { z } from "zod";

export const waitlistSchema = z.object({
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters"),
  companyName: z.string().trim().min(2, "Company name must be at least 2 characters"),
  email: z.string().trim().toLowerCase().email("Please enter a valid work email"),
  phone: z.string().trim().min(8, "Please enter a valid phone number (minimum 8 digits)"),
  city: z.string().trim().min(2, "Please select or enter your city"),
  
  // Optional expandable fields
  activeProjects: z.string().or(z.number()).optional().transform((val) => {
    if (val === undefined || val === "" || val === null) return undefined;
    const num = Number(val);
    return isNaN(num) ? undefined : num;
  }),
  companySize: z.string().trim().optional(),
  currentSoftware: z.string().trim().optional(),
  biggestChallenge: z.string().trim().optional(),
  
  // Consent checkbox
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to be contacted to join the waitlist",
  }),

  // Honeypot field for bot/abuse protection (must remain empty)
  faxNumber: z.string().optional(),

  // Optional UTM and tracking fields
  utmSource: z.string().trim().optional(),
  utmMedium: z.string().trim().optional(),
  utmCampaign: z.string().trim().optional(),
  utmTerm: z.string().trim().optional(),
  utmContent: z.string().trim().optional(),
  referrer: z.string().trim().optional(),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
