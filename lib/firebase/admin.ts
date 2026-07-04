import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";
import { join } from "path";

// Safely read firebase-applet-config.json using fs to prevent ESM compile/runtime issues on Vercel
let firebaseConfig: any = {};
try {
  const configPath = join(process.cwd(), "firebase-applet-config.json");
  const rawData = readFileSync(configPath, "utf8");
  firebaseConfig = JSON.parse(rawData);
} catch (err) {
  // Silent fallback to prevent console clutter in production
}

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY;

let adminApp: App | null = null;

if (projectId && clientEmail && privateKey) {
  try {
    // Format the private key to handle multiline newlines correctly
    const formattedPrivateKey = privateKey.replace(/\\n/g, "\n");

    const apps = getApps();
    if (apps.length === 0) {
      adminApp = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey: formattedPrivateKey,
        }),
      });
      console.log(`Firebase Admin SDK initialized with environment cert for project: ${projectId}`);
    } else {
      adminApp = apps[0]!;
    }
  } catch (error) {
    console.error("Error initializing Firebase Admin with env credentials:", error);
  }
} else {
  try {
    const apps = getApps();
    if (apps.length === 0) {
      adminApp = initializeApp({
        projectId: firebaseConfig.projectId,
      });
      console.log(`Firebase Admin SDK initialized using Application Default Credentials for project: ${firebaseConfig.projectId}`);
    } else {
      adminApp = apps[0]!;
    }
  } catch (error) {
    console.warn("Firebase Admin SDK could not initialize with Application Default Credentials (missing variables):", error);
  }
}

export const adminDb: Firestore | null = adminApp ? getFirestore(adminApp, firebaseConfig.firestoreDatabaseId) : null;
