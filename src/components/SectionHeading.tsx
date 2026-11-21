import Reveal from "./Reveal";

interface Props {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  id?: string;
}

export default function SectionHeading({ eyebrow, title, intro, align = "center", id }: Props) {
  const center = align === "center";
  return (
    <Reveal className={`mb-14 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <p className={`mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold ${center ? "justify-center" : ""}`}>
        <span className="h-px w-8 bg-gold/70" aria-hidden="true" />
        {eyebrow}
        {center && <span className="h-px w-8 bg-gold/70" aria-hidden="true" />}
      </p>
      <h2 id={id} className="text-4xl font-bold uppercase leading-[1.05] sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-muted">{intro}</p>}
    </Reveal>
  );
}
