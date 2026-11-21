import Icon from "./Icon";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { industries } from "@/data/industries";

export default function Industries() {
  return (
    <section id="industries" className="section" aria-labelledby="industries-title">
      <div className="container-x">
        <SectionHeading id="industries-title" eyebrow="Industries We Serve" title="Supporting the Sectors That Build India." />
        <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal key={ind.name} delay={0.05 * i}>
              <div className="group h-full bg-ink p-8 transition duration-500 hover:bg-charcoal">
                <Icon name={ind.icon} size={34} className="text-gold transition duration-500 group-hover:scale-110" />
                <h3 className="mt-6 text-2xl font-semibold uppercase">{ind.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{ind.blurb}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
