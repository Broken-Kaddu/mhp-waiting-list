export interface WaitlistFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  city: string;
  
  // Optional collapsible fields
  activeProjects?: string;
  companySize?: string;
  currentSoftware?: string;
  biggestChallenge?: string;
  
  // Consent
  consent: boolean;

  // Honeypot field for bot prevention (must remain empty)
  faxNumber?: string;

  // UTM Tracking and metadata
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  referrer?: string;
}

export interface RealityCard {
  id: string;
  icon: string;
  message: string;
  author: string;
  role: string;
  timestamp: string;
  extractedData: {
    title: string;
    items: { label: string; value: string; highlight?: boolean }[];
  };
}

export interface MetricCard {
  label: string;
  value: string;
  sub: string;
  change: string;
}
