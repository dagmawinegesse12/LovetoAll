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

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ cursor: 'pointer' }}
    >
      {/* Image / mock */}
      <div style={{
        position: 'relative',
        aspectRatio: large ? '3 / 4' : '2 / 3',
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
          <GarmentMock product={product} height={400} />
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

        {/* Hover overlay (desktop only) */}
        {hover && (
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
        padding: '14px 4px 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 8,
      }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <h3 className="serif" style={{ fontSize: 17, lineHeight: 1.2, marginBottom: 3, wordBreak: 'break-word' }}>
            {product.name}
          </h3>
          <p style={{ fontSize: 11, color: 'var(--ink-mute)', letterSpacing: '0.05em' }}>
            {product.subtitle}
          </p>
          {product.donates != null && (
            <p style={{
              fontSize: 10,
              color: 'var(--rose-deep)',
              marginTop: 4,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}>
              ${product.donates} donated per tee
            </p>
          )}
        </div>

        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div className="serif" style={{ fontSize: 17 }}>${product.price}</div>
          <div style={{ display: 'flex', gap: 3, marginTop: 5, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            {product.swatches.map((s) => (
              <span
                key={s.hex}
                style={{
                  width: 10,
                  height: 10,
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
