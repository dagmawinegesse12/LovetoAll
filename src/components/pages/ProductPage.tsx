import { useState } from 'react';
import type { CartItem, PageId, Swatch } from '../../types';
import { PRODUCTS } from '../../data/products';
import GarmentMock from '../GarmentMock';
import Ornament from '../Ornament';

interface ProductPageProps {
  productId: string;
  addToCart: (item: CartItem) => void;
  setPage: (p: PageId) => void;
}

export default function ProductPage({ productId, addToCart, setPage }: ProductPageProps) {
  const product = PRODUCTS.find((p) => p.id === productId) ?? PRODUCTS[0]!;
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<Swatch>(product.swatches[0]!);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!size) return;
    addToCart({ ...product, size, color: color.name, qty: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="page-enter">
      {/* Breadcrumb */}
      <div className="container" style={{ padding: '20px 20px 0', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>
        <button
          onClick={() => setPage('shop')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-mute)', padding: '8px 0', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', minHeight: 44 }}
        >
          Shop
        </button>
        <span> / {product.name}</span>
      </div>

      {/* Content */}
      <div className="container" style={{ padding: '0 20px 80px' }}>
        <div className="product-detail-grid">
          {/* Gallery */}
          <div className="product-gallery">
            <div
              className="product-gallery-main"
              style={{ aspectRatio: '4/5', overflow: 'hidden', background: 'var(--paper-deep)' }}
            >
              {product.photo ? (
                <img
                  src={product.photo}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <GarmentMock product={product} height={600} />
              )}
            </div>
            <div style={{ aspectRatio: '1', background: 'var(--paper-deep)', overflow: 'hidden' }}>
              <GarmentMock product={product} height={300} />
            </div>
            <div style={{
              aspectRatio: '1',
              background: product.palette.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Ornament width={120} color={product.palette.ink} />
            </div>
          </div>

          {/* Details */}
          <div style={{ position: 'sticky', top: 110, alignSelf: 'start' }}>
            {product.tag != null && (
              <div
                className="eyebrow"
                style={{
                  color: product.tag === 'Mothers Edition' ? 'var(--rose-deep)' : 'var(--ink-mute)',
                  marginBottom: 14,
                }}
              >
                {product.tag}
              </div>
            )}
            <h1
              className="serif"
              style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 500, lineHeight: 1, letterSpacing: '-0.02em', marginBottom: 8 }}
            >
              {product.name}
            </h1>
            <p className="serif-italic" style={{ fontSize: 20, color: 'var(--ink-soft)', marginBottom: 16 }}>
              {product.subtitle}
            </p>
            <div className="serif" style={{ fontSize: 28, fontWeight: 500, marginBottom: 20 }}>
              ${product.price}
            </div>

            {/* Donation callout */}
            {product.donates != null && (
              <div style={{
                background: '#FBE7EE',
                border: '1px solid var(--rose)',
                padding: '14px 18px',
                marginBottom: 24,
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}>
                <span style={{ fontSize: 20 }}>♡</span>
                <p style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--ink-soft)' }}>
                  <strong style={{ color: 'var(--rose-deep)' }}>${product.donates} from this tee</strong> goes
                  directly to a single mother household this week.
                </p>
              </div>
            )}

            <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--ink-soft)', marginBottom: 28 }}>
              {product.blurb}
            </p>

            {/* Color picker */}
            <div style={{ marginBottom: 24 }}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Color · {color.name}</div>
              <div style={{ display: 'flex', gap: 10 }}>
                {product.swatches.map((s) => (
                  <button
                    key={s.hex}
                    onClick={() => setColor(s)}
                    aria-label={s.name}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: s.hex,
                      cursor: 'pointer',
                      border: color.name === s.name ? '2px solid var(--ink)' : '1px solid var(--line)',
                      outline: color.name === s.name ? '2px solid var(--paper)' : 'none',
                      outlineOffset: -4,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span className="eyebrow">Size</span>
                <span className="eyebrow" style={{ color: 'var(--ink)', textDecoration: 'underline', cursor: 'pointer' }}>
                  Size guide
                </span>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${product.sizes.length}, 1fr)`,
                gap: 8,
              }}>
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    style={{
                      padding: '12px 0',
                      minHeight: 44,
                      cursor: 'pointer',
                      background: size === s ? 'var(--ink)' : 'transparent',
                      color: size === s ? 'var(--paper)' : 'var(--ink)',
                      border: '1px solid ' + (size === s ? 'var(--ink)' : 'var(--line)'),
                      fontSize: 13,
                      fontWeight: 500,
                      letterSpacing: '0.1em',
                      transition: 'background 150ms, color 150ms',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to bag */}
            <button
              onClick={handleAdd}
              className="btn"
              style={{ width: '100%', padding: '18px 32px', fontSize: 13, opacity: size == null ? 0.5 : 1 }}
              disabled={size == null}
            >
              {added ? '✓ Added to bag' : size != null ? `Add to bag — $${product.price}` : 'Select a size'}
            </button>

            {/* Shipping / care */}
            <div style={{
              marginTop: 32,
              paddingTop: 24,
              borderTop: '1px solid var(--line)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 20,
              fontSize: 12,
              color: 'var(--ink-mute)',
            }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: 6, color: 'var(--ink)' }}>Free shipping</div>
                <div>On orders over $80 in the US</div>
              </div>
              <div>
                <div className="eyebrow" style={{ marginBottom: 6, color: 'var(--ink)' }}>Made to last</div>
                <div>Pre-shrunk, soft-washed, made in Texas</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
