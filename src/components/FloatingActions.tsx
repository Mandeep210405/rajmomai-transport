"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { site, whatsappLink } from "@/data/site";

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTop && (
          <motion.a
            href="#home"
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-charcoal/90 text-offwhite backdrop-blur transition hover:border-gold hover:text-gold"
          >
            <ArrowUp size={18} />
          </motion.a>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="glass w-64 rounded-2xl bg-charcoal/95 p-3 shadow-2xl"
          >
            <p className="px-2 pb-2 text-xs uppercase tracking-widest text-muted">Chat on WhatsApp</p>
            {site.contacts.map((c) => (
              <a
                key={c.id}
                href={whatsappLink(c.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl px-3 py-2.5 transition hover:bg-white/5"
              >
                <span className="block text-sm font-semibold">{c.name}</span>
                <span className="text-xs text-muted">{c.phone}</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close WhatsApp contacts" : "Chat on WhatsApp"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 transition hover:scale-105"
      >
        {open ? <X size={24} /> : <MessageCircle size={26} />}
      </button>
    </div>
  );
}
