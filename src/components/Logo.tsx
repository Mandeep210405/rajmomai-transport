interface LogoProps {
  /** "onDark" for dark backgrounds (default), "onLight" for light ones. */
  tone?: "onDark" | "onLight";
  /** Show only the icon mark (favicon / compact mobile use). */
  iconOnly?: boolean;
  className?: string;
}

export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect x="1.5" y="1.5" width="45" height="45" rx="11" fill="#101010" stroke="#D4AF37" strokeWidth="2.5" />
      <path d="M15 35V13h10.5a6.8 6.8 0 0 1 0 13.6H15" fill="none" stroke="#F5F3EF" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 26.6 34 35" fill="none" stroke="#D4AF37" strokeWidth="3.6" strokeLinecap="round" />
      <path d="M29 36h6v-6" fill="none" stroke="#D4AF37" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Logo({ tone = "onDark", iconOnly = false, className = "" }: LogoProps) {
  const main = tone === "onDark" ? "text-offwhite" : "text-ink";
  const sub = tone === "onDark" ? "text-gold" : "text-[#9a7a14]";
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark />
      {!iconOnly && (
        <span className="flex flex-col leading-none">
          <span className={`font-display text-[1.35rem] font-bold tracking-[0.14em] ${main}`}>RAJMOMAI</span>
          <span className={`mt-1 font-display text-[0.62rem] font-medium tracking-[0.5em] ${sub}`}>TRANSPORT</span>
        </span>
      )}
      <span className="sr-only">Rajmomai Transport</span>
    </span>
  );
}
