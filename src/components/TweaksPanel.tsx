import { useState, useRef, useCallback, useEffect } from 'react';
import type { TweakValues } from '../types';

interface TweaksPanelProps {
  tweaks: TweakValues;
  onChange: (key: keyof TweakValues, value: TweakValues[keyof TweakValues]) => void;
}

export default function TweaksPanel({ tweaks, onChange }: TweaksPanelProps) {
  const [open, setOpen] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 16, y: 16 });
  const PAD = 16;

  const clampToViewport = useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth;
    const h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y)),
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);

  useEffect(() => {
    if (!open) return;
    clampToViewport();
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);

  const onDragStart = (e: React.MouseEvent) => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX;
    const sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = (ev: MouseEvent) => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy),
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed',
          left: 16,
          bottom: 80,
          zIndex: 2147483645,
          background: 'rgba(250,249,247,0.9)',
          border: '0.5px solid rgba(255,255,255,0.6)',
          borderRadius: 10,
          padding: '8px 14px',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          color: '#29261b',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        }}
      >
        ✦ Tweaks
      </button>
    );
  }

  return (
    <div
      ref={dragRef}
      className="twk-panel"
      style={{ right: offsetRef.current.x, bottom: offsetRef.current.y }}
    >
      <div className="twk-hd" onMouseDown={onDragStart}>
        <b>Tweaks</b>
        <button
          className="twk-x"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => setOpen(false)}
          aria-label="Close tweaks"
        >
          ✕
        </button>
      </div>

      <div className="twk-body">
        <div className="twk-sect">Brand</div>

        {/* Accent color */}
        <div className="twk-row twk-row-h">
          <div className="twk-lbl"><span>Mission accent</span></div>
          <input
            type="color"
            className="twk-swatch"
            value={tweaks.accentColor}
            onChange={(e) => onChange('accentColor', e.target.value)}
          />
        </div>

        {/* Hero headline */}
        <div className="twk-row">
          <div className="twk-lbl"><span>Hero headline</span></div>
          <input
            className="twk-field"
            type="text"
            value={tweaks.headlineCopy}
            onChange={(e) => onChange('headlineCopy', e.target.value)}
          />
        </div>

        <div className="twk-sect">Layout</div>

        {/* Mission ribbon toggle */}
        <div className="twk-row twk-row-h">
          <div className="twk-lbl"><span>Mission marquee</span></div>
          <button
            type="button"
            className="twk-toggle"
            data-on={tweaks.missionRibbon ? '1' : '0'}
            role="switch"
            aria-checked={tweaks.missionRibbon}
            onClick={() => onChange('missionRibbon', !tweaks.missionRibbon)}
          >
            <i />
          </button>
        </div>
      </div>
    </div>
  );
}
