"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import SmartImage from "./SmartImage";
import { gallery, galleryCategories } from "@/data/gallery";

const sizeClass = {
  normal: "",
  wide: "sm:col-span-2",
  tall: "row-span-2",
  large: "sm:col-span-2 row-span-2",
} as const;

export default function Gallery() {
  const [filter, setFilter] = useState<string>("All");
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  // Only show category tabs that actually contain images.
  const categories = useMemo(() => ["All", ...galleryCategories.filter((c) => gallery.some((g) => g.category === c))], []);
  const items = useMemo(() => (filter === "All" ? gallery : gallery.filter((g) => g.category === filter)), [filter]);

  const close = useCallback(() => {
    setActive(null);
    lastFocus.current?.focus();
  }, []);
  const step = useCallback((d: number) => setActive((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (active === null) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, step]);

  const current = active !== null ? items[active] : null;

  return (
    <section id="gallery" className="section bg-charcoal" aria-labelledby="gallery-title">
      <div className="container-x">
        <SectionHeading id="gallery-title" eyebrow="Gallery" title="Industry in Motion." intro="Illustrative imagery for now. Real photographs of our operations will replace these as they are added." />

        <Reveal className="mb-10 flex flex-wrap justify-center gap-2" >
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={`rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-widest transition ${
                filter === c ? "border-gold bg-gold text-ink" : "border-white/15 text-muted hover:border-gold hover:text-gold"
              }`}
            >
              {c}
            </button>
          ))}
        </Reveal>

        <div className="grid auto-rows-[11rem] grid-cols-2 gap-4 sm:auto-rows-[13rem] lg:grid-cols-4" style={{ gridAutoFlow: "dense" }}>
          {items.map((g, i) => (
            <motion.button
              layout
              key={g.id}
              type="button"
              onClick={(e) => {
                lastFocus.current = e.currentTarget;
                setActive(i);
              }}
              aria-label={`Open image: ${g.title}`}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 text-left ${sizeClass[g.size ?? "normal"]} ${g.size === "wide" || g.size === "large" ? "col-span-2" : ""}`}
            >
              <SmartImage src={g.src} alt={g.alt} fill sizes="(min-width:1024px) 25vw, 50vw" loading="lazy" className="object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent opacity-80 transition group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 translate-y-1 transition duration-500 group-hover:translate-y-0">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-widest text-gold">{g.category}</p>
                  <p className="font-display text-lg font-semibold uppercase">{g.title}</p>
                </div>
                <Expand size={18} className="text-offwhite/0 transition group-hover:text-offwhite" aria-hidden="true" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Image preview: ${current.title}`}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button ref={closeRef} type="button" onClick={close} aria-label="Close preview" className="absolute right-4 top-4 rounded-full border border-white/20 p-3 hover:border-gold hover:text-gold">
              <X size={20} />
            </button>
            {items.length > 1 && (
              <>
                <button type="button" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); step(-1); }} className="absolute left-3 rounded-full border border-white/20 p-3 hover:border-gold hover:text-gold sm:left-8">
                  <ChevronLeft size={22} />
                </button>
                <button type="button" aria-label="Next image" onClick={(e) => { e.stopPropagation(); step(1); }} className="absolute right-3 rounded-full border border-white/20 p-3 hover:border-gold hover:text-gold sm:right-8">
                  <ChevronRight size={22} />
                </button>
              </>
            )}
            <figure className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10">
                <SmartImage src={current.src} alt={current.alt} fill sizes="100vw" className="object-cover" priority />
              </div>
              <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm">
                <span>
                  <span className="text-gold">{current.category}</span> &middot; {current.title}
                </span>
                <span className="text-muted">
                  {current.isPlaceholder && "Illustrative placeholder, not an actual Rajmomai Transport photograph · "}
                  {active! + 1} / {items.length}
                </span>
              </figcaption>
            </figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
