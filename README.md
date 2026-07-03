# Multilingual Construction Intelligence Landing Page (MHP)

MHP is an enterprise-grade, high-performance, and privacy-first landing page with an early-access waitlist built specifically for India’s multilingual construction workforce. 

Site supervisors, foremen, and vendors naturally communicate via mixed regional languages (e.g., Hinglish, Kannada, Tamil) on WhatsApp. MHP automatically processes these conversational messages and structures them into real-time operational insights, procurement RFQs, and predictive cost logs without requiring complex software training.

---

## 🚀 Key Architectural & Security Design

This project is built under a **Zero Trust security architecture** designed for robust production deployments on both cloud containers (e.g., Cloud Run) and serverless hosting platforms (e.g., Vercel):

1. **Zero Client-Side Credentials & Writes**: The browser never initializes Firebase Admin SDK or performs direct writes to Firestore. All state mutation is handled strictly via secure, rate-limited server-side endpoints.
2. **Double Shield Abuse Protection**:
   - **Strict Rate Limiting**: Limit-bound in-memory checks mitigate spam registration attempts.
   - **Invisible Honeypot**: Embedded `faxNumber` fields completely hidden from standard users instantly filter programmatic spam bots.
3. **Data Security & Privacy Compliance**: 
   - Strict server-side Zod validation and sanitization prevent XSS or DB injection.
   - Global Firestore Security Rules are set to **default-deny**, blocking any direct browser read/write bypass.
   - Project telemetry and debug statements are disabled in production, preventing credential or structural leakage.

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.x or later)
- **npm** (v9.x or later)
- A **Firebase Project** with Firestore Database enabled

---

## ⚙️ Environment Variables Setup

Create a `.env` file in the root directory for local development (copy from `.env.example`).

### Client-Side Variables (Injected via Vite Build)
```env
NEXT_PUBLIC_FIREBASE_API_KEY="your_api_key_here"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_auth_domain_here"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_project_id_here"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your_storage_bucket_here"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your_messaging_sender_id_here"
NEXT_PUBLIC_FIREBASE_APP_ID="your_app_id_here"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="your_measurement_id_here"
```

### Server-Side Variables (Admin SDK - Keep Highly Secure)
```env
FIREBASE_PROJECT_ID="your_project_id_here"
FIREBASE_CLIENT_EMAIL="your_client_email_here"
FIREBASE_PRIVATE_KEY="your_private_key_here"
```

> **Security Note**: Never commit actual credentials to Git. The `.gitignore` file is pre-configured to ignore all `.env*` credential files (excluding `.env.example`).

---

## 🔥 Firebase Setup Guide

1. **Create Firebase Project**: Navigate to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. **Enable Firestore Database**:
   - Select **Firestore Database** from the sidebar and click **Create Database**.
   - Set the Rules to "Start in production mode" (this project deploys strict security rules).
3. **Download Service Account Credentials**:
   - Navigate to **Project Settings** -> **Service Accounts**.
   - Click **Generate New Private Key** to download the JSON credential file.
   - Extract `project_id`, `client_email`, and `private_key` from this JSON, then add them to your environment variables.
4. **Deploy Firestore Security Rules**:
   - Run standard firebase rules deployment or use pre-configured files.
   - Ensure `firestore.rules` is locked down to block client-side access.

---

## 💻 Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
The server will boot on `http://localhost:3000`. This mode utilizes a fast-reloading, local Express server with integrated Vite middleware.

### 3. Build & Test Production Locally
To verify the bundle and compile the unified full-stack Node serverless bundle:
```bash
npm run build
npm run start
```

---

## ⚡ Deploying to Vercel

MHP is fully optimized to compile and deploy on **Vercel** with zero custom server overhead.

### Step 1: Connect GitHub Repository
1. Push your local codebase to a private GitHub repository.
2. Log into the [Vercel Dashboard](https://vercel.com/) and click **Add New** -> **Project**.
3. Import your MHP repository.

### Step 2: Configure Environment Variables
Expand the **Environment Variables** panel in Vercel and paste all variables defined in your local setup (both `NEXT_PUBLIC_*` and `FIREBASE_*`).

### Step 3: Trigger Build
Click **Deploy**. Vercel will automatically:
- Build the client-side SPA statically.
- Compile `/api/waitlist.ts` as a high-performance, edge-proxied **Serverless Function**.
- Route operations according to `vercel.json` rules.

---

## 🔧 Troubleshooting Vercel Deployments

### 1. Firestore Connection Errors
* **Symptom**: Waitlist registrations fail with a `500 Server Error` after deployment.
* **Fix**: Ensure the `FIREBASE_PRIVATE_KEY` is pasted correctly into Vercel. Private keys must preserve newline characters (`\n`). If copy-pasting strips newlines, replace them with literal `\n` sequences or wrap the entire key in double quotes.

### 2. Static Asset Loading 404s
* **Symptom**: Subpages or assets result in a Vercel 404 page.
* **Fix**: The pre-configured `vercel.json` file ensures that all non-API paths redirect to `/index.html`. Do not remove or alter this configuration.

### 3. Serverless Execution Timeouts
* **Symptom**: Submissions hang and result in execution timeouts.
* **Fix**: Ensure your Firebase project location is topologically close to your Vercel deployment region. This reduces latency between the serverless execution context and Firebase's Firestore database servers.

---

## 📄 License
This project is proprietary and confidential. Built with high-security standards for India's leading builders and contractors.
