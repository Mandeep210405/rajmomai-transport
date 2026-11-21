"use client";

import { ArrowRight } from "lucide-react";
import Icon from "./Icon";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import SmartImage from "./SmartImage";
import { openEnquiry } from "@/lib/enquiry";
import { materials } from "@/data/materials";

export default function Materials() {
  return (
    <section id="materials" className="section bg-charcoal" aria-labelledby="materials-title">
      <div className="container-x">
        <SectionHeading
          id="materials-title"
          eyebrow="Materials We Supply"
          title="Raw Materials, Sourced to Order."
          intro="All supply is quotation-based. Tell us your requirement and we will come back with a quote."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {materials.map((m, i) => (
            <Reveal key={m.id} delay={0.07 * i} className={i < 3 ? "lg:col-span-2" : "lg:col-span-3"}>
              <article className="group relative h-[26rem] overflow-hidden rounded-3xl border border-white/10">
                <SmartImage
                  src={m.image}
                  alt={m.imageAlt}
                  fill
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
                {m.isPlaceholder && (
                  <span className="absolute right-4 top-4 rounded-full border border-white/15 bg-ink/70 px-3 py-1 text-[0.65rem] uppercase tracking-widest text-muted backdrop-blur">
                    Illustrative image
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <Icon name={m.icon} className="mb-3 text-gold" size={26} />
                  <h3 className="text-3xl font-bold uppercase">{m.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-offwhite/75">{m.description}</p>
                  <p className="mt-3 text-xs uppercase tracking-widest text-copper">Quotation-based pricing</p>
                  <button
                    type="button"
                    onClick={() => openEnquiry({ enquiryType: "Material Supply", material: m.name })}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold transition group-hover:gap-3"
                  >
                    Enquire Now <ArrowRight size={16} />
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
