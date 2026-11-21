import Logo from "./Logo";
import { materials } from "@/data/materials";
import { services } from "@/data/services";
import { site, whatsappLink } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-charcoal pt-16" aria-label="Site footer">
      <div className="container-x grid gap-12 pb-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <a href="#home" aria-label="Rajmomai Transport – back to top">
            <Logo />
          </a>
          <p className="mt-5 font-display text-sm uppercase tracking-[0.2em] text-gold">{site.tagline}</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">{site.description}</p>
        </div>

        <nav aria-label="Quick links">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest">Quick Links</h3>
          <ul className="space-y-2 text-sm text-muted">
            {site.nav.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition hover:text-gold">{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest">Services</h3>
          <ul className="space-y-2 text-sm text-muted">
            {services.map((s) => (
              <li key={s.id}><a href="#services" className="transition hover:text-gold">{s.title}</a></li>
            ))}
          </ul>
          <h3 className="mb-4 mt-8 text-sm font-semibold uppercase tracking-widest">Materials</h3>
          <ul className="space-y-2 text-sm text-muted">
            {materials.map((m) => (
              <li key={m.id}><a href="#materials" className="transition hover:text-gold">{m.name}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest">Contact</h3>
          <address className="space-y-3 text-sm not-italic text-muted">
            <p>{site.location.label}</p>
            <p><a href={`mailto:${site.email}`} className="break-all hover:text-gold">{site.email}</a></p>
            {site.contacts.map((c) => (
              <p key={c.id}>
                {c.name}
                <br />
                <a href={`tel:${c.tel}`} className="hover:text-gold">{c.phone}</a>
                {" · "}
                <a href={whatsappLink(c.whatsapp)} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:underline">WhatsApp</a>
              </p>
            ))}
          </address>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-muted">{site.copyright}</div>
    </footer>
  );
}
