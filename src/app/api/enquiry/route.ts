import { NextResponse } from "next/server";
import { site } from "@/data/site";
import { buildEnquiryText } from "@/lib/message";
import { enquirySchema, fieldErrors, type EnquiryInput } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Simple in-memory rate limit (per server instance): 5 enquiries / 10 min / IP.
// For multi-instance production traffic, swap for a shared store (e.g. Upstash Redis).
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_HITS) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function buildHtml(d: EnquiryInput) {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;white-space:pre-wrap">${esc(value || "—")}</td></tr>`;
  return `<div style="font-family:Arial,sans-serif;max-width:620px">
<h2 style="margin:0 0 12px;color:#101010">New website enquiry</h2>
<table style="border-collapse:collapse;width:100%;font-size:14px">
${row("Name", d.name)}${row("Company", d.company)}${row("Mobile", d.mobile)}${row("Email", d.email)}
${row("Enquiry type", d.enquiryType)}${row("Material", d.material)}${row("Quantity", d.quantity)}
${row("Pickup", d.pickup)}${row("Delivery", d.delivery)}${row("Requirements", d.requirements)}
</table></div>`;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Please check the highlighted fields.", fieldErrors: fieldErrors(parsed.error) }, { status: 422 });
  }
  const data = parsed.data;

  // Honeypot filled: pretend success so bots learn nothing.
  if (data.website) return NextResponse.json({ ok: true });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many enquiries. Please wait a few minutes or contact us on WhatsApp." }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[enquiry] RESEND_API_KEY is not configured. See README.md → Email setup.");
    return NextResponse.json(
      { ok: false, code: "EMAIL_NOT_CONFIGURED", error: "Email enquiries are temporarily unavailable. Please send your enquiry via WhatsApp or call us." },
      { status: 503 },
    );
  }

  const to = process.env.ENQUIRY_TO_EMAIL || site.email;
  const from = process.env.ENQUIRY_FROM_EMAIL || "Rajmomai Transport <onboarding@resend.dev>";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email || undefined,
        subject: `New enquiry: ${data.enquiryType} – ${data.name}${data.company ? ` (${data.company})` : ""}`,
        html: buildHtml(data),
        text: buildEnquiryText(data).replace(/\*/g, ""),
      }),
    });
    if (!res.ok) {
      console.error("[enquiry] Resend error", res.status, await res.text());
      return NextResponse.json({ ok: false, error: "We could not send your enquiry right now. Please try WhatsApp or call us." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[enquiry] send failed", err);
    return NextResponse.json({ ok: false, error: "We could not send your enquiry right now. Please try WhatsApp or call us." }, { status: 502 });
  }
}
