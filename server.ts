import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { z } from "zod";
import { waitlistSchema } from "./lib/validation/waitlist";
import { submitToWaitlist } from "./lib/actions/waitlist";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Production Security Headers Middleware
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  
  if (process.env.NODE_ENV === "production") {
    // 1 year max-age, include subdomains, preload
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    
    // Strict Content Security Policy (CSP) for Production
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      "img-src 'self' data: https://referrer.vercel.app; " +
      "font-src 'self' https://fonts.gstatic.com; " +
      "connect-src 'self' https://*.googleapis.com https://*.firebaseapp.com wss://*.firebaseapp.com; " +
      "frame-ancestors 'none'; " +
      "object-src 'none';"
    );
  }
  next();
});

// Disable X-Powered-By header to hide Express implementation details
app.disable("x-powered-by");

app.use(express.json());

// In-memory Rate Limiting (Abuse Protection)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3; // Strict: max 3 submissions per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const requests = rateLimitMap.get(ip) || [];
  // Filter out expired timestamps
  const validRequests = requests.filter(time => now - time < RATE_LIMIT_WINDOW);
  if (validRequests.length >= MAX_REQUESTS) {
    return true;
  }
  validRequests.push(now);
  rateLimitMap.set(ip, validRequests);
  return false;
}

// Waitlist Submission Endpoint (Server-Side inserts only, no public reads)
app.post("/api/waitlist", async (req, res) => {
  const ip = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "127.0.0.1";
  const userAgent = req.headers["user-agent"] || "unknown";

  // Check rate limit
  if (isRateLimited(ip)) {
    return res.status(429).json({
      success: false,
      error: "Too many submission attempts. Please try again in a minute."
    });
  }

  try {
    // 1. Validate request payload using Zod
    const validatedData = waitlistSchema.parse(req.body);

    // 2. Honeypot check (bot prevention)
    if (validatedData.faxNumber) {
      console.warn(`Honeypot triggered from IP: ${ip}, Value: ${validatedData.faxNumber}`);
      // Return a successful dummy response to mislead the bot
      return res.status(201).json({
        success: true,
        message: "Successfully registered on MHP waitlist!",
        supabaseSynced: true,
        firebaseSynced: true
      });
    }

    // 3. Save to Firebase via Server-side Admin SDK
    const result = await submitToWaitlist(validatedData, { ip, userAgent });

    if (result.success) {
      res.status(201).json({
        success: true,
        message: result.message,
        supabaseSynced: true, // For front-end success mapping
        firebaseSynced: true
      });
    } else {
      // Map friendly error messages
      const status = result.error === "ALREADY_EXISTS" ? 409 : 500;
      res.status(status).json({
        success: false,
        error: result.message // Friendly user-facing message
      });
    }

  } catch (err: any) {
    if (err instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        error: "Validation error",
        details: err.issues.map((e) => ({ field: e.path.join("."), message: e.message })),
      });
    } else {
      console.error("Internal waitlist submission error:", err);
      res.status(500).json({
        success: false,
        error: "Something went wrong. Please try again.",
      });
    }
  }
});

// Configure Vite or Static Asset Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware.");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode.");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`MHP Fullstack server running on http://localhost:${PORT}`);
  });
}

startServer();
