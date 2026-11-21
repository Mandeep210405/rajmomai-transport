import type { EnquiryInput } from "./validation";

const dash = (v?: string) => (v && v.trim() ? v.trim() : "—");

/** Plain-text enquiry (WhatsApp-formatted with *bold* labels). */
export function buildEnquiryText(d: EnquiryInput): string {
  return [
    "*New Enquiry – Rajmomai Transport*",
    "",
    `*Name:* ${d.name}`,
    `*Company:* ${dash(d.company)}`,
    `*Mobile:* ${d.mobile}`,
    `*Email:* ${dash(d.email)}`,
    `*Enquiry Type:* ${d.enquiryType}`,
    `*Material:* ${dash(d.material)}`,
    `*Required Quantity:* ${dash(d.quantity)}`,
    `*Pickup Location:* ${dash(d.pickup)}`,
    `*Delivery Location:* ${dash(d.delivery)}`,
    `*Additional Requirements:* ${dash(d.requirements)}`,
  ].join("\n");
}

export const whatsappUrl = (number: string, text: string) => `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
