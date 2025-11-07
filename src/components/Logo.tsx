import React, { forwardRef } from "react";

export type LogoProps = {
  fill?: string;
  accent?: string;
  size?: number;
  withText?: boolean;
};

export const Logo = forwardRef<SVGSVGElement, LogoProps>(
  (
    { fill = "#111827", accent = "#2dd4bf", size = 260, withText = true },
    ref
  ) => {
    const width = size;
    const height = withText ? Math.round(size * 0.55) : Math.round(size * 0.35);

    return (
      <svg
        ref={ref}
        width={width}
        height={height}
        viewBox="0 0 1000 550"
        role="img"
        aria-label="North Star Roofing logo"
      >
        <defs>
          <linearGradient id="roofGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={accent} />
            <stop offset="100%" stopColor={fill} stopOpacity="0.9" />
          </linearGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Roof mark */}
        <g transform="translate(60,30)">
          <polygon points="0,220 220,60 440,220" fill="url(#roofGrad)" />
          <rect x="170" y="210" width="260" height="28" rx="14" fill={fill} />
          <rect x="80" y="170" width="90" height="70" rx="8" fill={fill} />
          <rect x="105" y="190" width="40" height="36" rx="4" fill={accent} />

          {/* North star */}
          <g transform="translate(220,0)">
            <g transform="translate(220,40)" filter="url(#softGlow)">
              <path d="M0 -34 L6 -6 L34 0 L6 6 L0 34 L-6 6 L-34 0 L-6 -6 Z" fill={accent} />
              <circle cx="0" cy="0" r="6" fill={fill} />
            </g>
          </g>
        </g>

        {withText && (
          <g transform="translate(540,155)" fill={fill}>
            <text x="0" y="0" fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Ubuntu, Cantarell, 'Noto Sans', sans-serif" fontWeight="700" fontSize="72" letterSpacing="1">
              NORTH STAR
            </text>
            <text x="0" y="76" fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Ubuntu, Cantarell, 'Noto Sans', sans-serif" fontWeight="500" fontSize="44" letterSpacing="4">
              ROOFING
            </text>
          </g>
        )}
      </svg>
    );
  }
);

Logo.displayName = "Logo";

export default Logo;
