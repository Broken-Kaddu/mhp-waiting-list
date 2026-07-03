import { getFirebaseAnalytics } from "./client";
import { logEvent } from "firebase/analytics";

/**
 * Tracks an event across Firebase Analytics, Google Analytics (gtag), and Vercel Analytics (va).
 */
export const trackEvent = async (eventName: string, eventParams?: Record<string, any>) => {
  // 1. Log to Firebase Analytics
  try {
    const analytics = await getFirebaseAnalytics();
    if (analytics) {
      logEvent(analytics, eventName, eventParams);
      console.log(`[Firebase Analytics] Event: ${eventName}`, eventParams);
    }
  } catch (err) {
    console.warn("Firebase Analytics tracking error:", err);
  }

  // 2. Support for standard Google Analytics
  try {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", eventName, eventParams);
      console.log(`[Google Analytics] Event: ${eventName}`, eventParams);
    }
  } catch (err) {
    console.warn("Google Analytics tracking error:", err);
  }

  // 3. Support for Vercel Analytics
  try {
    if (typeof window !== "undefined" && (window as any).va) {
      (window as any).va("event", eventName, eventParams);
      console.log(`[Vercel Analytics] Event: ${eventName}`, eventParams);
    }
  } catch (err) {
    console.warn("Vercel Analytics tracking error:", err);
  }
};

/**
 * Automatic Scroll Depth Tracking for 25%, 50%, 75%, and 100% thresholds.
 */
export const initScrollDepthTracking = () => {
  if (typeof window === "undefined") return () => {};

  const thresholds = [25, 50, 75, 100];
  const trackedThresholds = new Set<number>();

  const handleScroll = () => {
    const scrollTop = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    const limit = documentHeight - windowHeight;
    if (limit <= 0) return;

    const scrollPercent = Math.round((scrollTop / limit) * 100);

    for (const threshold of thresholds) {
      if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
        trackedThresholds.add(threshold);
        trackEvent("scroll_depth", { percentage: threshold });
      }
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
};
