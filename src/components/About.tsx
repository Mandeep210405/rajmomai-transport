import Icon, { type IconName } from "./Icon";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { site } from "@/data/site";

const highlights: { icon: IconName; title: string; text: string }[] = [
  { icon: "clock", title: `${site.yearsExperience}+ Years`, text: "Of industry experience" },
  { icon: "truck", title: "Own Fleet & Partners", text: "Own fleet plus a network of transport partners" },
  { icon: "boxes", title: "Material Sourcing", text: "Industrial raw material sourcing network" },
  { icon: "globe", title: "Gujarat & Pan-India", text: "Service capabilities across Gujarat and India" },
];

export default function About() {
  return (
    <section id="about" className="section bg-charcoal" aria-labelledby="about-title">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading id="about-title" align="left" eyebrow="About Rajmomai Transport" title="Built on Trust. Driven by Experience." />
          <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-muted">
            <p>
              Rajmomai Transport is an industrial transportation and material trading business based in Bhavnagar, Gujarat. With over {site.yearsExperience} years of industry experience, we connect businesses with reliable transportation solutions and essential industrial raw materials.
            </p>
            <p>
              Through our own fleet, an extended network of transport partners, and material sourcing relationships, we help manufacturers, mining companies, wholesalers, and industrial traders fulfil their requirements.
            </p>
            <p>Our focus is on dependable coordination, business relationships, and practical solutions tailored to each customer&rsquo;s needs.</p>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {highlights.map((h, i) => (
            <Reveal key={h.title} delay={0.08 * i}>
              <div className="group h-full rounded-2xl border border-white/10 bg-ink/60 p-7 transition duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-gold">
                <Icon name={h.icon} className="mb-5 text-gold" size={30} />
                <h3 className="text-xl font-semibold uppercase">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{h.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
