import type { CSSProperties } from 'react';

interface OrnamentProps {
  width?: number;
  color?: string;
  style?: CSSProperties;
  className?: string;
}

export default function Ornament({
  width = 220,
  color = 'currentColor',
  style = {},
  className = '',
}: OrnamentProps) {
  return (
    <svg
      className={className}
      style={{ width, height: 'auto', display: 'block', ...style }}
      viewBox="0 0 400 60"
      fill="none"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 30 Q 60 8, 110 30 T 200 30 T 290 30 T 380 30" />
      <path d="M20 30 Q 60 52, 110 30 T 200 30 T 290 30 T 380 30" />
      <path d="M70 18 Q 100 30, 70 42 Q 50 30, 70 18 Z" />
      <path d="M150 18 Q 180 30, 150 42 Q 130 30, 150 18 Z" />
      <path d="M250 18 Q 280 30, 250 42 Q 230 30, 250 18 Z" />
      <path d="M330 18 Q 360 30, 330 42 Q 310 30, 330 18 Z" />
      <circle cx="200" cy="30" r="2.5" fill={color} stroke="none" />
    </svg>
  );
}
