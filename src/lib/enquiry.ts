import type { EnquiryType } from "@/data/services";

export interface EnquiryPrefill {
  enquiryType?: EnquiryType;
  material?: string;
}

export const PREFILL_EVENT = "rajmomai:prefill";

/** Pre-fills the enquiry form (if mounted) and scrolls to it. */
export function openEnquiry(prefill: EnquiryPrefill = {}) {
  window.dispatchEvent(new CustomEvent<EnquiryPrefill>(PREFILL_EVENT, { detail: prefill }));
  document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
