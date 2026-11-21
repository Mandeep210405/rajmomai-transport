"use client";

import { AlertCircle, CheckCircle2, Loader2, Mail, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { materials } from "@/data/materials";
import type { EnquiryType } from "@/data/services";
import { PREFILL_EVENT, type EnquiryPrefill } from "@/lib/enquiry";
import { buildEnquiryText, whatsappUrl } from "@/lib/message";
import { enquirySchema, enquiryTypes, fieldErrors, type EnquiryFormValues } from "@/lib/validation";

const empty: EnquiryFormValues = {
  name: "",
  company: "",
  mobile: "",
  email: "",
  enquiryType: "Transportation",
  material: "",
  quantity: "",
  pickup: "",
  delivery: "",
  requirements: "",
  website: "",
};

type Status = "idle" | "submitting" | "success" | "error";

function Field({ label, error, id, children, required }: { label: string; error?: string; id: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted">
        {label}
        {required && <span className="text-gold"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

export default function EnquiryForm() {
  const [values, setValues] = useState<EnquiryFormValues>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [contactId, setContactId] = useState<string>(site.contacts[0].id);
  const inFlight = useRef(false);

  const contact = site.contacts.find((c) => c.id === contactId) ?? site.contacts[0];

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const p = (e as CustomEvent<EnquiryPrefill>).detail ?? {};
      setValues((v) => ({ ...v, ...(p.enquiryType ? { enquiryType: p.enquiryType } : {}), ...(p.material ? { material: p.material } : {}) }));
      setStatus((s) => (s === "success" ? "idle" : s));
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  const set = (k: keyof EnquiryFormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: "" }));
  };

  const validate = () => {
    const parsed = enquirySchema.safeParse(values);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      setStatus("idle");
      setMessage("");
      return null;
    }
    setErrors({});
    return parsed.data;
  };

  const sendWhatsApp = () => {
    const data = validate();
    if (!data) return;
    window.open(whatsappUrl(contact.whatsapp, buildEnquiryText(data)), "_blank", "noopener,noreferrer");
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inFlight.current || status === "submitting") return; // duplicate-submission guard
    const data = validate();
    if (!data) return;
    inFlight.current = true;
    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fieldErrors?: Record<string, string> };
      if (res.ok && json.ok) {
        setStatus("success");
      } else {
        if (json.fieldErrors) setErrors(json.fieldErrors);
        setStatus("error");
        setMessage(json.error ?? "We could not send your enquiry. Please try WhatsApp or call us.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection, or send your enquiry via WhatsApp.");
    } finally {
      inFlight.current = false;
    }
  };

  const submitting = status === "submitting";
  const showMaterial = values.enquiryType !== "Transportation";
  const aria = (k: string) => ({ "aria-invalid": errors[k] ? (true as const) : undefined, "aria-describedby": errors[k] ? `${k}-error` : undefined });

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-gold/40 bg-charcoal p-10 text-center" role="status">
        <CheckCircle2 className="mx-auto mb-4 text-gold" size={48} />
        <h3 className="text-3xl font-bold uppercase">Enquiry Sent</h3>
        <p className="mx-auto mt-3 max-w-md text-muted">Thank you. Your enquiry has been emailed to our team and we will get back to you shortly.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" className="btn-ghost" onClick={() => { setValues(empty); setStatus("idle"); }}>
            Send Another Enquiry
          </button>
          <button type="button" className="btn-gold" onClick={() => { const d = enquirySchema.safeParse(values); if (d.success) window.open(whatsappUrl(contact.whatsapp, buildEnquiryText(d.data)), "_blank", "noopener,noreferrer"); }}>
            <MessageCircle size={18} /> Also Message {contact.name.split(" ")[0]} on WhatsApp
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={sendEmail} noValidate className="rounded-3xl border border-white/10 bg-charcoal p-6 sm:p-9" aria-label="Business enquiry form">
      <fieldset disabled={submitting} className="grid gap-5 sm:grid-cols-2">
        {/* Honeypot: hidden from real users */}
        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} />
        </div>

        <Field id="name" label="Customer Name" error={errors.name} required>
          <input id="name" className="field" autoComplete="name" value={values.name} onChange={set("name")} {...aria("name")} />
        </Field>
        <Field id="company" label="Company Name" error={errors.company}>
          <input id="company" className="field" autoComplete="organization" value={values.company} onChange={set("company")} {...aria("company")} />
        </Field>
        <Field id="mobile" label="Mobile Number" error={errors.mobile} required>
          <input id="mobile" type="tel" inputMode="tel" className="field" autoComplete="tel" placeholder="+91 98XXXXXXXX" value={values.mobile} onChange={set("mobile")} {...aria("mobile")} />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input id="email" type="email" className="field" autoComplete="email" value={values.email} onChange={set("email")} {...aria("email")} />
        </Field>

        <div className="sm:col-span-2">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted">
            Enquiry Type <span className="text-gold">*</span>
          </span>
          <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Enquiry type">
            {enquiryTypes.map((t) => (
              <button
                key={t}
                type="button"
                role="radio"
                aria-checked={values.enquiryType === t}
                onClick={() => setValues((v) => ({ ...v, enquiryType: t as EnquiryType }))}
                className={`rounded-xl border px-3 py-3 text-xs font-semibold uppercase tracking-wider transition ${
                  values.enquiryType === t ? "border-gold bg-gold/15 text-gold" : "border-white/10 text-muted hover:border-white/30"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <Field id="material" label={showMaterial ? "Material" : "Material to Transport"} error={errors.material}>
          <select id="material" className="field" value={values.material} onChange={set("material")}>
            <option value="">Select a material</option>
            {materials.map((m) => (
              <option key={m.id} value={m.name}>
                {m.name}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </Field>
        <Field id="quantity" label="Required Quantity" error={errors.quantity}>
          <input id="quantity" className="field" placeholder="e.g. 500 tonnes / 10 trucks" value={values.quantity} onChange={set("quantity")} {...aria("quantity")} />
        </Field>
        <Field id="pickup" label="Pickup Location" error={errors.pickup}>
          <input id="pickup" className="field" value={values.pickup} onChange={set("pickup")} {...aria("pickup")} />
        </Field>
        <Field id="delivery" label="Delivery Location" error={errors.delivery}>
          <input id="delivery" className="field" value={values.delivery} onChange={set("delivery")} {...aria("delivery")} />
        </Field>
        <div className="sm:col-span-2">
          <Field id="requirements" label="Additional Requirements" error={errors.requirements}>
            <textarea id="requirements" rows={4} className="field resize-y" value={values.requirements} onChange={set("requirements")} {...aria("requirements")} />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted">WhatsApp this enquiry to</span>
          <div className="grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label="WhatsApp contact">
            {site.contacts.map((c) => (
              <button
                key={c.id}
                type="button"
                role="radio"
                aria-checked={contactId === c.id}
                onClick={() => setContactId(c.id)}
                className={`rounded-xl border px-4 py-3 text-left text-sm transition ${contactId === c.id ? "border-gold bg-gold/15" : "border-white/10 hover:border-white/30"}`}
              >
                <span className="block font-semibold">{c.name}</span>
                <span className="text-xs text-muted">{c.phone}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2" aria-live="polite">
          {status === "error" && (
            <p role="alert" className="flex items-start gap-2 rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-200">
              <AlertCircle size={18} className="mt-0.5 shrink-0" /> {message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
          <button type="submit" className="btn-gold flex-1" disabled={submitting}>
            {submitting ? <Loader2 size={18} className="animate-spin" /> : <Mail size={18} />}
            {submitting ? "Sending…" : "Send Enquiry by Email"}
          </button>
          <button type="button" className="btn-ghost flex-1 !border-[#25D366]/60 !text-[#25D366] hover:!bg-[#25D366]/10" onClick={sendWhatsApp} disabled={submitting}>
            <MessageCircle size={18} /> Send via WhatsApp
          </button>
        </div>
        <p className="text-xs text-muted sm:col-span-2">Pricing is quotation-based. We will respond to your enquiry with a quote.</p>
      </fieldset>
    </form>
  );
}
