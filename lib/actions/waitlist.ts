import { adminDb } from "../firebase/admin.js";
import { FieldValue } from "firebase-admin/firestore";
import { WaitlistInput } from "../validation/waitlist.js";

export interface SubmitResult {
  success: boolean;
  message: string;
  firebaseSynced: boolean;
  localBackup: boolean;
  error?: string;
  details?: any;
}

// Simple HTML/script tag sanitizer
function sanitizeString(str: string): string {
  return str.replace(/<[^>]*>/g, "").trim();
}

export async function submitToWaitlist(
  data: WaitlistInput,
  metadata: { ip?: string; userAgent?: string }
): Promise<SubmitResult> {
  if (!adminDb) {
    throw new Error("Firebase Admin SDK Firestore is not initialized.");
  }

  const emailLower = data.email.trim().toLowerCase();

  try {
    // 1. Prevent duplicate submissions using the same email address
    const duplicateCheck = await adminDb
      .collection("waitlist")
      .where("email", "==", emailLower)
      .limit(1)
      .get();

    if (!duplicateCheck.empty) {
      return {
        success: false,
        message: "You're already on our waitlist.",
        firebaseSynced: false,
        localBackup: false,
        error: "ALREADY_EXISTS"
      };
    }

    // 2. Construct entry exactly matching specified schema with sanitization
    const firestoreEntry: Record<string, any> = {
      fullName: sanitizeString(data.fullName),
      companyName: sanitizeString(data.companyName),
      email: emailLower,
      phone: sanitizeString(data.phone),
      city: sanitizeString(data.city),
      consent: data.consent,
      source: "website",
      status: "new",
      createdAt: FieldValue.serverTimestamp(),
    };

    // Add optional expanded fields if present with sanitization
    if (data.activeProjects !== undefined) {
      firestoreEntry.activeProjects = data.activeProjects;
    }
    if (data.companySize) {
      firestoreEntry.companySize = sanitizeString(data.companySize);
    }
    if (data.currentSoftware) {
      firestoreEntry.currentSoftware = sanitizeString(data.currentSoftware);
    }
    if (data.biggestChallenge) {
      firestoreEntry.biggestChallenge = sanitizeString(data.biggestChallenge);
    }

    // Add UTM and tracking metadata
    if (data.utmSource) firestoreEntry.utmSource = sanitizeString(data.utmSource);
    if (data.utmMedium) firestoreEntry.utmMedium = sanitizeString(data.utmMedium);
    if (data.utmCampaign) firestoreEntry.utmCampaign = sanitizeString(data.utmCampaign);
    if (data.utmTerm) firestoreEntry.utmTerm = sanitizeString(data.utmTerm);
    if (data.utmContent) firestoreEntry.utmContent = sanitizeString(data.utmContent);
    if (data.referrer) firestoreEntry.referrer = sanitizeString(data.referrer);

    // Add server-side metadata
    if (metadata.userAgent) firestoreEntry.userAgent = sanitizeString(metadata.userAgent);
    if (metadata.ip) firestoreEntry.ipAddress = sanitizeString(metadata.ip);

    // 3. Save to waitlist collection
    const docRef = await adminDb.collection("waitlist").add(firestoreEntry);
    console.log(`Document written to Firestore waitlist with ID: ${docRef.id}`);

    return {
      success: true,
      message: "Successfully registered on MHP waitlist!",
      firebaseSynced: true,
      localBackup: false,
    };
  } catch (error: any) {
    console.error("Firestore write failed:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
      firebaseSynced: false,
      localBackup: false,
      error: error.message || "DATABASE_ERROR"
    };
  }
}
