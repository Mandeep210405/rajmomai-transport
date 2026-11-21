"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useRef } from "react";
import SmartImage from "./SmartImage";
import { site } from "@/data/site";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);

  const fade = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const } };

  return (
    <section id="home" ref={ref} className="relative flex min-h-screen items-center overflow-hidden" aria-labelledby="hero-title">
      <motion.div style={{ y }} className="absolute inset-0 -z-10 scale-110">
        <SmartImage src={site.heroImage} alt="" fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-transparent to-ink/60" />

      <div className="container-x pb-24 pt-36">
        <motion.p {...fade(0.1)} className="mb-6 inline-flex items-center gap-3 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
          {site.yearsExperience}+ Years of Industry Experience
        </motion.p>

        <motion.h1 {...fade(0.2)} id="hero-title" className="max-w-4xl text-5xl font-bold uppercase leading-[1.02] sm:text-6xl lg:text-7xl xl:text-8xl">
          Powering Industries Through <span className="gold-text">Reliable Logistics</span> &amp; Material Supply.
        </motion.h1>

        <motion.p {...fade(0.35)} className="mt-8 max-w-2xl text-lg leading-relaxed text-offwhite/80 sm:text-xl">
          Your trusted partner for industrial transportation, bulk material sourcing, and supply solutions across Gujarat and India.
        </motion.p>

        <motion.p {...fade(0.45)} className="mt-6 font-display text-sm uppercase tracking-[0.25em] text-gold sm:text-base">
          {site.tagline}
        </motion.p>

        <motion.div {...fade(0.55)} className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a href="#services" className="btn-gold">
            Explore Our Services <ArrowRight size={18} />
          </a>
          <a href="#enquiry" className="btn-ghost">
            Request a Quote
          </a>
        </motion.div>
      </div>

      <a href="#about" aria-label="Scroll to About" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-gold/80 sm:block">
        <ChevronDown className={reduce ? "" : "animate-bounce"} />
      </a>
    </section>
  );
}
