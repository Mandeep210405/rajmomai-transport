import Icon from "./Icon";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { advantages } from "@/data/advantages";

export default function WhyChoose() {
  return (
    <section id="why" className="section" aria-labelledby="why-title">
      <div className="container-x">
        <SectionHeading id="why-title" eyebrow="Why Choose Us" title="Why Choose Rajmomai Transport?" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a, i) => (
            <Reveal key={a.title} delay={0.06 * i} className={i === 0 ? "lg:col-span-1" : ""}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-charcoal p-7 transition duration-500 hover:-translate-y-1 hover:border-gold/50">
                <span className="absolute right-5 top-4 font-display text-6xl font-bold text-white/[0.04]" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <Icon name={a.icon} size={24} />
                </div>
                <h3 className="text-xl font-semibold uppercase leading-snug">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{a.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
