type Props = {
  /** Use the light variant on dark backgrounds (footer). */
  inverted?: boolean;
  className?: string;
};

/**
 * LaBelle Dental identity: a lotus-inspired mark in warm gold with a flowing
 * deep-navy "L" flourish, plus the LaBelle wordmark. Pure SVG so it stays crisp.
 */
export function LaBelleLogo({ inverted = false, className = "" }: Props) {
  const navy = inverted ? "#ffffff" : "var(--navy)";
  const gold = "var(--gold)";

  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 64 64" role="img" aria-label="LaBelle Dental lotus emblem" className="size-11 shrink-0">
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* lotus petals */}
          <path d="M32 12c5 7 7 13 7 19 0 7-3 12-7 16-4-4-7-9-7-16 0-6 2-12 7-19Z" stroke={gold} strokeWidth="2.4" />
          <path d="M32 47c-6 0-12-3-15-8-2-4-3-9-3-14 6 2 11 5 14 9" stroke={gold} strokeWidth="2.2" />
          <path d="M32 47c6 0 12-3 15-8 2-4 3-9 3-14-6 2-11 5-14 9" stroke={gold} strokeWidth="2.2" />
          {/* navy L flourish */}
          <path d="M24 24v18c0 4 3 7 7 7h11" stroke={navy} strokeWidth="3" />
        </g>
      </svg>
      <span className="leading-none">
        <span
          className="font-display block text-[26px] font-semibold tracking-tight"
          style={{ color: navy }}
        >
          LaBelle
        </span>
        <span
          className="block text-[10px] font-semibold uppercase tracking-[0.42em]"
          style={{ color: gold }}
        >
          Dental
        </span>
      </span>
    </span>
  );
}
