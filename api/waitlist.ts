import { waitlistSchema } from "../lib/validation/waitlist";
import { submitToWaitlist } from "../lib/actions/waitlist";
import { z } from "zod";

// Simple in-memory rate limiting for serverless instance (per container instance)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const requests = rateLimitMap.get(ip) || [];
  const validRequests = requests.filter((time) => now - time < RATE_LIMIT_WINDOW);
  if (validRequests.length >= MAX_REQUESTS) {
    return true;
  }
  validRequests.push(now);
  rateLimitMap.set(ip, validRequests);
  return false;
}

export default async function handler(req: any, res: any) {
  // Only allow POST
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  // Security Headers for API responses
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  const ip = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "127.0.0.1";
  const userAgent = req.headers["user-agent"] || "unknown";

  // Check rate limit
  if (isRateLimited(ip)) {
    return res.status(429).json({
      success: false,
      error: "Too many submission attempts. Please try again in a minute.",
    });
  }

  try {
    const validatedData = waitlistSchema.parse(req.body);

    // Honeypot check (bot prevention)
    if (validatedData.faxNumber) {
      return res.status(201).json({
        success: true,
        message: "Successfully registered on MHP waitlist!",
        supabaseSynced: true,
        firebaseSynced: true,
      });
    }

    const result = await submitToWaitlist(validatedData, { ip, userAgent });

    if (result.success) {
      return res.status(201).json({
        success: true,
        message: result.message,
        supabaseSynced: true,
        firebaseSynced: true,
      });
    } else {
      const status = result.error === "ALREADY_EXISTS" ? 409 : 500;
      return res.status(status).json({
        success: false,
        error: result.message,
      });
    }
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: "Validation error",
        details: err.issues.map((e) => ({ field: e.path.join("."), message: e.message })),
      });
    } else {
      console.error("Internal waitlist submission error on Vercel API:", err);
      return res.status(500).json({
        success: false,
        error: "Something went wrong. Please try again.",
      });
    }
  }
}
