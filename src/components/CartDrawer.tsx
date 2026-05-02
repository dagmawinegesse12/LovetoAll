import type { CartItem } from '../types';
import GarmentMock from './GarmentMock';
import Ornament from './Ornament';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  removeFromCart: (index: number) => void;
}

export default function CartDrawer({ open, onClose, cart, removeFromCart }: CartDrawerProps) {
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const donated = cart.reduce((sum, i) => sum + (i.donates ?? 0) * i.qty, 0);
  const shipping = total >= 80 ? 0 : 8;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`cart-overlay${open ? ' open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`cart-drawer${open ? ' open' : ''}`}
        aria-label="Shopping cart"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--line)',
          flexShrink: 0,
        }}>
          <div className="eyebrow">Your bag · {cart.length} {cart.length === 1 ? 'item' : 'items'}</div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 20,
              color: 'var(--ink)',
              minHeight: 44,
              minWidth: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 24px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--ink-mute)' }}>
              <Ornament width={120} style={{ margin: '0 auto 24px', opacity: 0.4 }} />
              <p className="serif-italic" style={{ fontSize: 22 }}>Your bag is empty.</p>
              <p style={{ fontSize: 14, marginTop: 8 }}>Wear love. Give love.</p>
            </div>
          ) : (
            cart.map((item, i) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                style={{
                  display: 'flex',
                  gap: 16,
                  padding: '20px 0',
                  borderBottom: '1px solid var(--line-soft)',
                }}
              >
                <div style={{
                  width: 80,
                  height: 100,
                  background: 'var(--paper-deep)',
                  flexShrink: 0,
                  overflow: 'hidden',
                }}>
                  {item.photo ? (
                    <img
                      src={item.photo}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <GarmentMock product={item} height={100} />
                  )}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 className="serif" style={{ fontSize: 18, fontWeight: 500, lineHeight: 1.2 }}>{item.name}</h4>
                  <p style={{ fontSize: 12, color: 'var(--ink-mute)', marginTop: 4 }}>
                    {item.color} · Size {item.size}
                  </p>
                  {item.donates != null && (
                    <p style={{
                      fontSize: 11,
                      color: 'var(--rose-deep)',
                      marginTop: 4,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}>
                      ♡ ${item.donates} donated
                    </p>
                  )}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 12,
                  }}>
                    <span className="serif" style={{ fontSize: 18, fontWeight: 500 }}>${item.price}</span>
                    <button
                      onClick={() => removeFromCart(i)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: 11,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: 'var(--ink-mute)',
                        textDecoration: 'underline',
                        minHeight: 44,
                        padding: '0 4px',
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding: '20px 24px', borderTop: '1px solid var(--line)', flexShrink: 0 }}>
            {donated > 0 && (
              <div style={{
                background: '#FBE7EE',
                padding: '12px 16px',
                marginBottom: 18,
                fontSize: 13,
                color: 'var(--rose-deep)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>♡</span>
                <span>
                  <strong>${donated}</strong> from this order goes to a single mother household this week.
                </span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 14 }}>
              <span style={{ color: 'var(--ink-mute)' }}>Subtotal</span>
              <span>${total}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18, fontSize: 14 }}>
              <span style={{ color: 'var(--ink-mute)' }}>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 20,
              paddingTop: 14,
              borderTop: '1px solid var(--line)',
            }}>
              <span className="serif" style={{ fontSize: 22, fontWeight: 500 }}>Total</span>
              <span className="serif" style={{ fontSize: 22, fontWeight: 500 }}>${total + shipping}</span>
            </div>

            <button className="btn" style={{ width: '100%', padding: '18px' }}>
              Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
