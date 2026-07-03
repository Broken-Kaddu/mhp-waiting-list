import React, { useState, useEffect } from "react";
import { 
  CheckCircle, 
  AlertCircle, 
  Building, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  HelpCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  Loader2,
  Calendar,
  Check
} from "lucide-react";
import { WaitlistFormData } from "../types";
import { waitlistSchema } from "../../lib/validation/waitlist";
import { trackEvent } from "../../lib/firebase/analytics";

export default function WaitlistForm() {
  const [formData, setFormData] = useState<WaitlistFormData>({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    city: "",
    activeProjects: "",
    companySize: "",
    currentSoftware: "",
    biggestChallenge: "",
    consent: false,
    faxNumber: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof WaitlistFormData, string>>>({});
  const [touchedFields, setTouchedFields] = useState<Partial<Record<keyof WaitlistFormData, boolean>>>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isSynced, setIsSynced] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Capture UTM parameters and Referrer on Mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const utmParams = {
      utmSource: params.get("utm_source") || undefined,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
      utmTerm: params.get("utm_term") || undefined,
      utmContent: params.get("utm_content") || undefined,
      referrer: document.referrer || undefined,
    };

    setFormData((prev) => ({
      ...prev,
      ...utmParams,
    }));
  }, []);

  // Format phone number live
  const formatPhone = (value: string) => {
    // Strip non-numeric characters except +
    const clean = value.replace(/[^\d+]/g, "");
    return clean;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    let finalValue: any = value;

    if (type === "checkbox") {
      finalValue = (e.target as HTMLInputElement).checked;
    } else if (name === "phone") {
      finalValue = formatPhone(value);
    }

    setFormData((prev) => {
      const updated = { ...prev, [name]: finalValue };
      
      // Inline Zod validation on change if already touched
      if (touchedFields[name as keyof WaitlistFormData]) {
        const parsed = waitlistSchema.safeParse(updated);
        if (!parsed.success) {
          const issue = parsed.error.issues.find((i) => i.path[0] === name);
          setFieldErrors((prevErr) => ({
            ...prevErr,
            [name]: issue ? issue.message : "",
          }));
        } else {
          setFieldErrors((prevErr) => ({
            ...prevErr,
            [name]: "",
          }));
        }
      }
      return updated;
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouchedFields((prev) => ({ ...prev, [name]: true }));

    // Run validation on this field immediately on blur
    const parsed = waitlistSchema.safeParse(formData);
    if (!parsed.success) {
      const issue = parsed.error.issues.find((i) => i.path[0] === name);
      setFieldErrors((prevErr) => ({
        ...prevErr,
        [name]: issue ? issue.message : "",
      }));
    } else {
      setFieldErrors((prevErr) => ({
        ...prevErr,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setResponseMessage("");

    // Mark all required fields as touched
    const allTouched: Partial<Record<keyof WaitlistFormData, boolean>> = {
      fullName: true,
      companyName: true,
      email: true,
      phone: true,
      city: true,
      consent: true,
    };
    setTouchedFields(allTouched);

    const parsed = waitlistSchema.safeParse(formData);
    if (!parsed.success) {
      const errors: Partial<Record<keyof WaitlistFormData, string>> = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof WaitlistFormData;
        if (!errors[field]) {
          errors[field] = issue.message;
        }
      });
      setFieldErrors(errors);
      setSubmitError("Please fill in all required fields and accept the contact consent.");
      trackEvent("waitlist_submission", {
        success: false,
        error: "Client-side validation failed"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitSuccess(true);
        setResponseMessage(result.message || "Your early access application is saved.");
        setIsSynced(result.supabaseSynced);
        trackEvent("waitlist_submission", {
          success: true,
          companyName: formData.companyName,
          city: formData.city,
          companySize: formData.companySize
        });
      } else {
        let errorMsg = result.error || "An error occurred. Please try again.";
        if (result.details) {
          const mapErrors: Partial<Record<keyof WaitlistFormData, string>> = {};
          result.details.forEach((det: { field: string; message: string }) => {
            mapErrors[det.field as keyof WaitlistFormData] = det.message;
          });
          setFieldErrors(mapErrors);
          setSubmitError("Server-side validation failed. Check your values.");
          errorMsg = "Server-side validation failed";
        } else {
          setSubmitError(errorMsg);
        }
        trackEvent("waitlist_submission", {
          success: false,
          error: errorMsg
        });
      }
    } catch (err: any) {
      console.error("Waitlist submit error:", err);
      const errMsg = "Could not connect to the waitlist server. Please check your connection.";
      setSubmitError(errMsg);
      trackEvent("waitlist_submission", {
        success: false,
        error: err?.message || errMsg
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div id="waitlist-success" className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 md:p-8 text-center space-y-6 max-w-lg mx-auto shadow-2xl relative overflow-hidden">
        {/* Aesthetic Glowing Backdrop Elements */}
        <div className="absolute -top-12 -left-12 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="w-16 h-16 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <CheckCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-[10px] text-emerald-400 font-bold tracking-widest uppercase bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-500/20">
            APPLICATION RECEIVED
          </span>
          <h3 className="text-xl md:text-2xl font-bold font-display text-white">
            You're on the list!
          </h3>
          <p className="text-slate-300 text-sm max-w-sm mx-auto leading-relaxed">
            Thanks for joining the MHP Early Access Program. We'll reach out as we onboard construction companies for our pilot rollout.
          </p>
        </div>

        {/* Lead Match Box */}
        <div className="bg-slate-950/60 rounded-xl p-4 border border-white/5 text-left max-w-sm mx-auto space-y-2">
          <h4 className="text-[10px] font-mono font-bold text-slate-500 border-b border-white/5 pb-1.5 flex items-center justify-between">
            <span>PRIORITY PILOT ALLOCATION</span>
            <span className="text-brand-orange">HIGH DENSITY</span>
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-300">
            <li className="flex justify-between">
              <span className="text-slate-500">Contact:</span>
              <span className="font-semibold text-slate-200">{formData.fullName}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-slate-500">Company:</span>
              <span className="font-semibold text-slate-200">{formData.companyName}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-slate-500">Pilot Hub:</span>
              <span className="font-semibold text-slate-200 flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-brand-orange" />
                <span>{formData.city}</span>
              </span>
            </li>
          </ul>
        </div>

        {/* WhatsApp Verification Notification */}
        <div className="text-xs text-slate-400 max-w-sm mx-auto space-y-2 pt-2">
          <p className="font-semibold text-slate-300 flex items-center justify-center space-x-1.5">
            <Clock className="w-4 h-4 text-brand-orange" />
            <span>Expected Followup</span>
          </p>
          <p className="leading-relaxed text-[11px]">
            Due to high volume, we are prioritizing builders with active projects in metropolitan hubs. We will contact you at <strong>{formData.phone}</strong> via WhatsApp or direct call within 48 hours.
          </p>
        </div>

        {/* Double Actions for maximum engagement */}
        <div className="flex flex-col space-y-3 pt-4 max-w-sm mx-auto">
          <a
            href="https://calendly.com" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => trackEvent("discovery_call_click", { company: formData.companyName })}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-orange to-orange-600 hover:to-orange-500 text-white font-bold text-xs text-center shadow-lg shadow-orange-600/10 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
          >
            <span>Book a Discovery Call</span>
          </a>

          <button 
            onClick={() => {
              setSubmitSuccess(false);
              setFormData({
                fullName: "",
                companyName: "",
                email: "",
                phone: "",
                city: "",
                activeProjects: "",
                companySize: "",
                currentSoftware: "",
                biggestChallenge: "",
                consent: false,
                faxNumber: "",
              });
              setTouchedFields({});
              setFieldErrors({});
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-white/5 active:scale-[0.98] transition-all"
          >
            ← Back to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 md:p-8 shadow-xl max-w-xl mx-auto backdrop-blur-md relative overflow-hidden">
      {/* Visual Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none"></div>

      <div className="mb-6 text-center md:text-left">
        <h3 className="text-lg md:text-xl font-bold text-white flex items-center justify-center md:justify-start space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-pulse"></span>
          <span>Apply for Pilot Waitlist</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Complete in 30 seconds. Metropolitan spots are limited to 15 active companies.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-left" noValidate>
        {/* Core Inputs (Grid layout on tablet/desktop, vertical stack on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                name="fullName"
                required
                autoComplete="name"
                value={formData.fullName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="e.g. Ramesh Kumar"
                className={`w-full pl-10 pr-4 py-3 bg-slate-950/70 text-sm text-white rounded-xl border focus:outline-none focus:ring-1 transition-all ${
                  fieldErrors.fullName
                    ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                    : touchedFields.fullName
                    ? "border-emerald-500/40 focus:border-emerald-500 focus:ring-emerald-500/20"
                    : "border-slate-800 hover:border-slate-700 focus:border-brand-orange focus:ring-orange-500/20"
                }`}
              />
            </div>
            {fieldErrors.fullName && (
              <p className="text-[10px] text-red-400 flex items-center space-x-1">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                <span>{fieldErrors.fullName}</span>
              </p>
            )}
          </div>

          {/* Company Name */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
              Company Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Building className="w-4 h-4" />
              </span>
              <input
                type="text"
                name="companyName"
                required
                autoComplete="organization"
                value={formData.companyName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="e.g. Singhania Developers"
                className={`w-full pl-10 pr-4 py-3 bg-slate-950/70 text-sm text-white rounded-xl border focus:outline-none focus:ring-1 transition-all ${
                  fieldErrors.companyName
                    ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                    : touchedFields.companyName
                    ? "border-emerald-500/40 focus:border-emerald-500 focus:ring-emerald-500/20"
                    : "border-slate-800 hover:border-slate-700 focus:border-brand-orange focus:ring-orange-500/20"
                }`}
              />
            </div>
            {fieldErrors.companyName && (
              <p className="text-[10px] text-red-400 flex items-center space-x-1">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                <span>{fieldErrors.companyName}</span>
              </p>
            )}
          </div>

          {/* Work Email */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
              Work Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                inputMode="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="e.g. contact@company.com"
                className={`w-full pl-10 pr-4 py-3 bg-slate-950/70 text-sm text-white rounded-xl border focus:outline-none focus:ring-1 transition-all ${
                  fieldErrors.email
                    ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                    : touchedFields.email
                    ? "border-emerald-500/40 focus:border-emerald-500 focus:ring-emerald-500/20"
                    : "border-slate-800 hover:border-slate-700 focus:border-brand-orange focus:ring-orange-500/20"
                }`}
              />
            </div>
            {fieldErrors.email && (
              <p className="text-[10px] text-red-400 flex items-center space-x-1">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                <span>{fieldErrors.email}</span>
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Phone className="w-4 h-4" />
              </span>
              <input
                type="tel"
                name="phone"
                required
                autoComplete="tel"
                inputMode="tel"
                value={formData.phone}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="e.g. +91 9876543210"
                className={`w-full pl-10 pr-4 py-3 bg-slate-950/70 text-sm text-white rounded-xl border focus:outline-none focus:ring-1 transition-all ${
                  fieldErrors.phone
                    ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                    : touchedFields.phone
                    ? "border-emerald-500/40 focus:border-emerald-500 focus:ring-emerald-500/20"
                    : "border-slate-800 hover:border-slate-700 focus:border-brand-orange focus:ring-orange-500/20"
                }`}
              />
            </div>
            {fieldErrors.phone && (
              <p className="text-[10px] text-red-400 flex items-center space-x-1">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                <span>{fieldErrors.phone}</span>
              </p>
            )}
          </div>
        </div>

        {/* City / Location */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
            City / Location <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <MapPin className="w-4 h-4" />
            </span>
            <input
              type="text"
              name="city"
              required
              autoComplete="address-level2"
              value={formData.city}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="e.g. Bengaluru, Karnataka"
              className={`w-full pl-10 pr-4 py-3 bg-slate-950/70 text-sm text-white rounded-xl border focus:outline-none focus:ring-1 transition-all ${
                fieldErrors.city
                  ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                  : touchedFields.city
                  ? "border-emerald-500/40 focus:border-emerald-500 focus:ring-emerald-500/20"
                  : "border-slate-800 hover:border-slate-700 focus:border-brand-orange focus:ring-orange-500/20"
              }`}
            />
          </div>
          {fieldErrors.city && (
            <p className="text-[10px] text-red-400 flex items-center space-x-1">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{fieldErrors.city}</span>
            </p>
          )}
        </div>

        {/* Optional Collapsed Section */}
        <div className="border border-slate-800/60 rounded-2xl bg-slate-950/20 overflow-hidden transition-all">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between p-4 text-xs font-mono font-medium text-slate-300 hover:text-slate-100 transition-colors focus:outline-none"
          >
            <span className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-slate-500" />
              <span>Tell us a little more (Optional)</span>
            </span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {isExpanded && (
            <div className="p-4 pt-0 border-t border-slate-800/40 space-y-4 animate-fadeIn">
              {/* Active Projects */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono text-slate-400">
                  Number of Active Projects
                </label>
                <input
                  type="number"
                  name="activeProjects"
                  value={formData.activeProjects || ""}
                  onChange={handleInputChange}
                  placeholder="e.g. 3"
                  min="0"
                  className="w-full px-4 py-2.5 bg-slate-950/50 text-sm text-white rounded-xl border border-slate-800 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-orange-500/20 transition-all"
                />
              </div>

              {/* Company Size */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono text-slate-400">
                  Company Size (Employees)
                </label>
                <select
                  name="companySize"
                  value={formData.companySize || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-slate-950 text-sm text-white rounded-xl border border-slate-800 focus:border-brand-orange focus:outline-none transition-all"
                >
                  <option value="">Select size...</option>
                  <option value="1-10">1–10 employees</option>
                  <option value="11-50">11–50 employees</option>
                  <option value="51-200">51–200 employees</option>
                  <option value="200+">200+ employees</option>
                </select>
              </div>

              {/* Current Software */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono text-slate-400">
                  Current Software
                </label>
                <select
                  name="currentSoftware"
                  value={formData.currentSoftware || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-slate-950 text-sm text-white rounded-xl border border-slate-800 focus:border-brand-orange focus:outline-none transition-all"
                >
                  <option value="">Select current tool...</option>
                  <option value="Excel">Excel / Google Sheets</option>
                  <option value="WhatsApp Only">WhatsApp Only</option>
                  <option value="Zoho">Zoho</option>
                  <option value="Procore">Procore</option>
                  <option value="Autodesk">Autodesk</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Biggest Operational Challenge */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono text-slate-400">
                  Biggest Operational Challenge
                </label>
                <textarea
                  name="biggestChallenge"
                  value={formData.biggestChallenge || ""}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="e.g. Site supervisors don't log concrete logs, unrecorded material thefts, delay in PM approvals, WhatsApp leakage..."
                  className="w-full px-4 py-2.5 bg-slate-950/50 text-sm text-white rounded-xl border border-slate-800 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-orange-500/20 transition-all resize-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Honeypot Input - Absolute and completely hidden from screen and keyboard */}
        <div className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor="faxNumber">Fax Number (Do not fill)</label>
          <input
            id="faxNumber"
            type="text"
            name="faxNumber"
            value={formData.faxNumber || ""}
            onChange={handleInputChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Required Consent Checkbox */}
        <div className="space-y-1.5">
          <label className="flex items-start space-x-3 cursor-pointer group">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className="mt-0.5 w-4.5 h-4.5 rounded border-slate-800 bg-slate-950 text-brand-orange focus:ring-brand-orange/20 focus:ring-offset-slate-900 cursor-pointer"
            />
            <span className="text-[11px] text-slate-400 group-hover:text-slate-300 transition-colors select-none">
              I agree to be contacted regarding early access to MHP. <span className="text-brand-orange font-bold">*</span>
            </span>
          </label>
          {fieldErrors.consent && (
            <p className="text-[10px] text-red-400 flex items-center space-x-1">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{fieldErrors.consent}</span>
            </p>
          )}
        </div>

        {/* Submit Error */}
        {submitError && (
          <div className="p-3 bg-red-950/40 border border-red-500/20 rounded-xl text-xs text-red-300 flex items-start space-x-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-400" />
            <span className="leading-normal">{submitError}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-brand-orange to-orange-600 hover:to-orange-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-600/10 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Submitting application...</span>
            </>
          ) : (
            <span>Join the Early Access Waitlist</span>
          )}
        </button>

        {/* Subtle security trust message */}
        <p className="text-[10px] text-slate-500 text-center mt-3 font-mono leading-relaxed">
          🔒 Your information is securely stored and will only be used to contact you about MHP Early Access.
        </p>
      </form>
    </div>
  );
}
