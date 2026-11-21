import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { clients, clientsDisclaimer } from "@/data/clients";

export default function Clients() {
  return (
    <section id="clients" className="section bg-charcoal !py-20" aria-labelledby="clients-title">
      <div className="container-x">
        <SectionHeading id="clients-title" eyebrow="Businesses We Serve" title="Businesses We Have Transported For" />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((c, i) => (
            <li key={c.name}>
              <Reveal delay={0.08 * i}>
                <div className="flex h-28 items-center justify-center rounded-2xl border border-white/10 bg-ink/60 px-6 text-center font-display text-2xl font-semibold uppercase tracking-[0.12em] text-offwhite/90 transition duration-500 hover:border-gold/50 hover:text-gold">
                  {c.name}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-muted">{clientsDisclaimer}</p>
      </div>
    </section>
  );
}
