import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import EnquiryForm from "./EnquiryForm";
import Reveal from "./Reveal";
import { site, whatsappLink } from "@/data/site";

export default function Contact() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container-x grid gap-14 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            <span className="h-px w-8 bg-gold/70" aria-hidden="true" /> Contact &amp; Enquiry
          </p>
          <h2 id="contact-title" className="text-4xl font-bold uppercase leading-[1.05] sm:text-5xl lg:text-6xl">
            Let&rsquo;s Move Your Business Forward.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Looking for reliable transportation or bulk industrial material supply? Get in touch with Rajmomai Transport and discuss your requirements.
          </p>

          <ul className="mt-10 space-y-6">
            <li className="flex gap-4">
              <MapPin className="mt-1 shrink-0 text-gold" size={22} aria-hidden="true" />
              <div>
                <p className="text-xs uppercase tracking-widest text-muted">Business Location</p>
                <p>{site.location.label}</p>
              </div>
            </li>
            <li className="flex gap-4">
              <Mail className="mt-1 shrink-0 text-gold" size={22} aria-hidden="true" />
              <div>
                <p className="text-xs uppercase tracking-widest text-muted">Email</p>
                <a href={`mailto:${site.email}`} className="break-all hover:text-gold">{site.email}</a>
              </div>
            </li>
            {site.contacts.map((c, i) => (
              <li key={c.id} className="flex gap-4">
                <Phone className="mt-1 shrink-0 text-gold" size={22} aria-hidden="true" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted">Contact {i + 1}</p>
                  <p className="font-semibold">{c.name}</p>
                  <a href={`tel:${c.tel}`} className="hover:text-gold">{c.phone}</a>
                  <div className="mt-3">
                    <a href={whatsappLink(c.whatsapp)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/50 px-4 py-2 text-xs font-semibold text-[#25D366] transition hover:bg-[#25D366]/10">
                      <MessageCircle size={16} /> WhatsApp {c.name.split(" ")[0]}
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-3">
          <div id="enquiry" className="scroll-mt-24">
            <EnquiryForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
