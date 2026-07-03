import { RealityCard } from "./types";

export const REALITY_CARDS: RealityCard[] = [
  {
    id: "rc-1",
    icon: "🎤",
    message: "Need 40 bags of cement before 10 AM. Ground floor plastering is stuck.",
    author: "Ramesh Kumar",
    role: "Site Supervisor • Bangalore South Site",
    timestamp: "08:15 AM",
    extractedData: {
      title: "Material Purchase Request Generated",
      items: [
        { label: "Material", value: "OPC Cement (53 Grade)", highlight: true },
        { label: "Quantity", value: "40 Bags", highlight: true },
        { label: "Delivery Site", value: "Project Meadows, Block B Ground Floor" },
        { label: "Deadline", value: "Today, 10:00 AM" },
        { label: "Status Trigger", value: "Auto-matched to Vendor JSW & Drafted Invoice" }
      ]
    }
  },
  {
    id: "rc-2",
    icon: "📸",
    message: "[Photo Attachment] Slab reinforcement for Tower C completed. Please review.",
    author: "Shubham Patil",
    role: "Quality Engineer • Pune Vista",
    timestamp: "11:32 AM",
    extractedData: {
      title: "Visual Progress & Quality Audit",
      items: [
        { label: "Task Identified", value: "Slab Reinforcement Grid", highlight: true },
        { label: "Spacing Accuracy", value: "98% Compliant (150mm c/c spacing detected)", highlight: true },
        { label: "Rebar Spec Match", value: "12mm & 16mm TMT Steel bars verified" },
        { label: "Action Taken", value: "Auto-approved quality standard, sent to Project Director for casting sign-off" }
      ]
    }
  },
  {
    id: "rc-3",
    icon: "🧾",
    message: "[Bill Scan Photo] GST Invoice from Balaji Aggregates for Coarse aggregate supply.",
    author: "Sanjay Dev",
    role: "Procurement Head • Hyderabad Hub",
    timestamp: "02:45 PM",
    extractedData: {
      title: "Invoice Extracted & Accounted",
      items: [
        { label: "Vendor", value: "Balaji Aggregates Ltd", highlight: true },
        { label: "Amount", value: "₹2,84,500 (incl. 18% GST)", highlight: true },
        { label: "Material", value: "20mm Coarse Aggregate - 4 Brass" },
        { label: "Budget Match", value: "Within Approved Cost Code (7.4% under estimated limit)" }
      ]
    }
  },
  {
    id: "rc-4",
    icon: "👷",
    message: "Attendance check: 23 workers present, 4 absent today. We finished 70% of concrete casting on Tower B, but we will need 2 tons of structural steel by tomorrow afternoon or casting will pause.",
    author: "Jagdish Naidu",
    role: "Project Manager • Mumbai Heights",
    timestamp: "05:10 PM",
    extractedData: {
      title: "Daily Progress & Resource Alert",
      items: [
        { label: "Labor Strength", value: "23 Present / 4 Absent (85% efficiency)", highlight: true },
        { label: "Task Completed", value: "Concrete Casting (70% accomplished)" },
        { label: "Critical Delay Threat", value: "Structural Steel Shortage (Needs 2 Tons)", highlight: true },
        { label: "Auto-Action", value: "Generated emergency PO draft, compared 3 vendors, flagged to MD" }
      ]
    }
  },
  {
    id: "rc-5",
    icon: "📍",
    message: "[Location Pin Shared] Pothole area and excavation base reached.",
    author: "Vikram Sen",
    role: "Surveyor • Chennai IT Park",
    timestamp: "09:05 AM",
    extractedData: {
      title: "Geotagged Survey Point Saved",
      items: [
        { label: "Project", value: "Ascendas IT Park Phase-3" },
        { label: "Coordinates", value: "12.9814° N, 80.2458° E (Chennai)", highlight: true },
        { label: "Structural Grid", value: "Tower C - Grid Line 8-D" },
        { label: "Soil Condition", value: "Silty sand, stable, ready for excavation audit" }
      ]
    }
  }
];

export const TESTIMONIALS = [
  {
    quote: "Our site engineers are excellent at building but refused to use complex ERP apps. They live on WhatsApp. MHP let us digitize 100% of our daily reports and purchase requests on Day 1 without a single hour of software training.",
    author: "Amitabh Choudhury",
    role: "Managing Director, Choudhury Infrastructure",
    location: "Bengaluru (Managing 14 active projects)",
    avatarColor: "bg-orange-500"
  },
  {
    quote: "With ₹70 lakh of leakage per project from unrecorded complaints, verbal changes, and billing confusion, we were losing massive margins. MHP's voice transcription pulls every commitment out of WhatsApp chats and builds audit trails.",
    author: "Rajeev Singhania",
    role: "Founder & CEO, Singhania Developers",
    location: "Mumbai (Residential and commercial builders)",
    avatarColor: "bg-blue-500"
  },
  {
    quote: "Approvals that used to take 3 to 4 days of phone calling are now completed in 10 minutes. The AI reads the supervisor's site voice note, validates the budget, drafts a Purchase Order, and pings my WhatsApp for a click approval.",
    author: "Manoj Reddi",
    role: "Director of Projects, Reddi & Sons Construction",
    location: "Hyderabad (Infrastructure & Highways)",
    avatarColor: "bg-green-500"
  }
];

export const OPERATIONAL_CHALLENGES = [
  "Site supervisors don't log reports on Excel/ERP",
  "Material theft or unapproved purchases at sites",
  "Delay in management approvals halting material delivery",
  "High billing inaccuracies and GST calculation issues",
  "Difficulty tracking worker attendance and labor payouts",
  "Lack of clear daily progress photos and concrete curing logs",
  "Other operational leaks"
];

export const CITIES = [
  "Bengaluru",
  "Mumbai",
  "Pune",
  "Hyderabad",
  "Chennai",
  "Delhi NCR",
  "Kolkata",
  "Ahmedabad",
  "Other Tier 2 / Tier 3 City"
];

export const COMPANY_SIZES = [
  "1-5 employees (Small builder)",
  "6-20 employees (Mid-sized contractor)",
  "21-50 employees (Established developer)",
  "51-200 employees (Enterprise infrastructure)",
  "More than 200 employees"
];

export const ACTIVE_PROJECTS_OPTS = [
  "1 to 4 active projects",
  "5 to 10 active projects",
  "11 to 25 active projects",
  "26 to 50 active projects",
  "More than 50 active projects"
];

export const ANNUAL_VALUES = [
  "Under ₹5 Crore",
  "₹5 Crore - ₹20 Crore",
  "₹20 Crore - ₹50 Crore",
  "₹50 Crore - ₹200 Crore",
  "Over ₹200 Crore"
];

export const SOFTWARE_OPTIONS = [
  "Mainly Excel / Google Sheets",
  "Zoho Projects / Zoho Books",
  "MS Project / Primavera",
  "Generic Construction ERP",
  "No software, everything on physical diaries & paper",
  "WhatsApp Groups only"
];
