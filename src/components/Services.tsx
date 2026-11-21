"use client";

import { ArrowRight, Check } from "lucide-react";
import Icon from "./Icon";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { openEnquiry } from "@/lib/enquiry";
import { services } from "@/data/services";

export default function Services() {
  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="container-x">
        <SectionHeading
          id="services-title"
          eyebrow="Our Services"
          title="Two Divisions. One Dependable Partner."
          intro="From moving bulk cargo to sourcing raw materials, we support industrial businesses end to end."
        />
        <div className="grid gap-8 lg:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={0.1 * i}>
              <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-charcoal to-ink p-8 transition duration-500 hover:border-gold/50 sm:p-10">
                <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/40 bg-gold/10 text-gold">
                  <Icon name={s.icon} size={28} />
                </div>
                <h3 className="text-3xl font-bold uppercase sm:text-4xl">{s.title}</h3>
                <p className="mt-4 leading-relaxed text-muted">{s.description}</p>

                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-gold">{s.listTitle}</p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-offwhite/90">
                      <Check size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>

                {s.note && (
                  <p className="mt-8 rounded-xl border border-copper/30 bg-copper/10 p-4 text-sm leading-relaxed text-offwhite/80">{s.note}</p>
                )}

                <div className="mt-auto pt-8">
                  <button type="button" className="btn-gold" onClick={() => openEnquiry({ enquiryType: s.enquiryType })}>
                    Enquire About {s.enquiryType === "Transportation" ? "Transportation" : "Material Supply"} <ArrowRight size={18} />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
