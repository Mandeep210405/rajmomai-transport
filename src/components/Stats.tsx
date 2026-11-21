"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { stats, type Stat } from "@/data/stats";

function Counter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? stat.value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(stat.value);
      return;
    }
    const controls = animate(0, stat.value, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, stat.value]);

  return (
    <span ref={ref}>
      {n}
      {stat.suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="relative overflow-hidden border-y border-white/10 bg-charcoal py-20" aria-label="Business statistics">
      <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-[60rem] -translate-x-1/2 bg-gold/10 blur-3xl" aria-hidden="true" />
      <div className="container-x relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center lg:border-l lg:border-white/10 lg:first:border-0">
            <p className="gold-text font-display text-6xl font-bold sm:text-7xl">
              <Counter stat={s} />
            </p>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-offwhite">{s.label}</p>
            {s.caption && <p className="mx-auto mt-2 max-w-[14rem] text-xs text-muted">{s.caption}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
