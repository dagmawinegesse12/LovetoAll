import { useState } from 'react';
import type { Product } from '../types';
import GarmentMock from './GarmentMock';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  large?: boolean;
}

export default function ProductCard({ product, onClick, large = false }: ProductCardProps) {
  const [hover, setHover] = useState(false);
  const [touched, setTouched] = useState(false);
  const imageHeight = large ? 520 : 420;

  // On mobile, tapping shows the overlay then navigates
  const handleTap = () => {
    if ('ontouchstart' in window) {
      if (touched) {
        onClick();
      } else {
        setTouched(true);
        setTimeout(() => setTouched(false), 1400);
      }
    }
  };

  const showOverlay = hover || touched;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onTouchStart={handleTap}
      style={{ cursor: 'pointer' }}
    >
      {/* Image / mock */}
      <div style={{
        position: 'relative',
        height: imageHeight,
        overflow: 'hidden',
        background: 'var(--paper-deep)',
      }}>
        {product.photo ? (
          <img
            src={product.photo}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 800ms ease',
              transform: hover ? 'scale(1.04)' : 'scale(1)',
              filter: 'saturate(0.95)',
              display: 'block',
            }}
          />
        ) : (
          <GarmentMock product={product} height={imageHeight} />
        )}

        {/* Tag badge */}
        {product.tag != null && (
          <div style={{
            position: 'absolute',
            top: 16,
            left: 16,
            background: product.tag === 'Mothers Edition' ? 'var(--rose-deep)' : 'var(--ink)',
            color: 'var(--paper)',
            fontSize: 10,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            padding: '6px 12px',
            fontWeight: 500,
          }}>
            {product.tag}
          </div>
        )}

        {/* Hover / tap overlay */}
        {showOverlay && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingBottom: 24,
            background: 'linear-gradient(to top, rgba(14,14,14,0.5) 0%, transparent 50%)',
          }}>
            <button
              className="btn"
              style={{
                background: 'var(--paper)',
                color: 'var(--ink)',
                borderColor: 'var(--paper)',
              }}
              onClick={(e) => { e.stopPropagation(); onClick(); }}
            >
              Quick view
            </button>
          </div>
        )}
      </div>

      {/* Info row */}
      <div style={{
        padding: '18px 4px 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 16,
      }}>
        <div style={{ minWidth: 0 }}>
          <h3 className="serif" style={{ fontSize: 20, lineHeight: 1.15, marginBottom: 4 }}>
            {product.name}
          </h3>
          <p style={{ fontSize: 12, color: 'var(--ink-mute)', letterSpacing: '0.05em' }}>
            {product.subtitle}
          </p>
          {product.donates != null && (
            <p style={{
              fontSize: 11,
              color: 'var(--rose-deep)',
              marginTop: 6,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}>
              ${product.donates} donated per tee
            </p>
          )}
        </div>

        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div className="serif" style={{ fontSize: 20 }}>${product.price}</div>
          <div style={{ display: 'flex', gap: 4, marginTop: 6, justifyContent: 'flex-end' }}>
            {product.swatches.map((s) => (
              <span
                key={s.hex}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: s.hex,
                  border: '1px solid var(--line)',
                  display: 'inline-block',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
