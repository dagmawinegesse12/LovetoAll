import { useState } from 'react';
import type { PageId } from '../types';
import Ornament from './Ornament';
import Wordmark from './Wordmark';

interface HeaderProps {
  page: PageId;
  setPage: (p: PageId) => void;
  cartCount: number;
  openCart: () => void;
}

const NAV_LINKS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'shop', label: 'Shop' },
  { id: 'mission', label: 'Our Mission' },
  { id: 'story', label: 'Story' },
];

export default function Header({ page, setPage, cartCount, openCart }: HeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigate = (p: PageId) => {
    setPage(p);
    setDrawerOpen(false);
  };

  return (
    <>
      <header className="header-root">
        {/* Announcement bar */}
        <div className="header-announcement">
          100% of profits support single mother households · free shipping over $80
        </div>

        {/* Main header row */}
        <div className="header-inner">
          {/* Hamburger (mobile) */}
          <button
            className="header-hamburger"
            aria-label="Open navigation"
            onClick={() => setDrawerOpen(true)}
          >
            <svg width="22" height="18" viewBox="0 0 22 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="0" y1="2" x2="22" y2="2" />
              <line x1="0" y1="9" x2="22" y2="9" />
              <line x1="0" y1="16" x2="22" y2="16" />
            </svg>
          </button>

          {/* Desktop nav (left) */}
          <nav className="header-nav">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => navigate(l.id)}
                className={`header-nav-btn${page === l.id ? ' active' : ''}`}
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Centered wordmark */}
          <button
            onClick={() => navigate('home')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              justifySelf: 'center',
            }}
          >
            <Wordmark size={22} />
            <Ornament width={90} />
          </button>

          {/* Desktop right tools */}
          <div className="header-right">
            <IconBtn label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </IconBtn>
            <IconBtn label="Account">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </IconBtn>
            <CartButton cartCount={cartCount} openCart={openCart} />
          </div>

          {/* Mobile cart button */}
          <div className="header-cart-mobile" style={{ justifyContent: 'flex-end' }}>
            <CartButton cartCount={cartCount} openCart={openCart} compact />
          </div>
        </div>
      </header>

      {/* Mobile nav drawer */}
      <div
        className={`nav-drawer-overlay${drawerOpen ? ' open' : ''}`}
        onClick={() => setDrawerOpen(false)}
      />
      <div className={`nav-drawer${drawerOpen ? ' open' : ''}`}>
        <div className="nav-drawer-header">
          <Wordmark size={20} />
          <button
            onClick={() => setDrawerOpen(false)}
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
            aria-label="Close navigation"
          >
            ✕
          </button>
        </div>
        <nav className="nav-drawer-links">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              className="nav-drawer-link"
              onClick={() => navigate(l.id)}
            >
              {l.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}

function IconBtn({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <button
      aria-label={label}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--ink)',
        padding: 4,
        display: 'flex',
        minHeight: 44,
        minWidth: 44,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </button>
  );
}

function CartButton({
  cartCount,
  openCart,
  compact = false,
}: {
  cartCount: number;
  openCart: () => void;
  compact?: boolean;
}) {
  return (
    <button
      onClick={openCart}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: compact ? 0 : 8,
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--ink)',
        padding: 0,
        minHeight: 44,
        minWidth: 44,
        justifyContent: 'center',
        position: 'relative',
      }}
      aria-label={`Open cart, ${cartCount} items`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M5 7h14l-1.5 12a2 2 0 0 1-2 1.8h-7a2 2 0 0 1-2-1.8L5 7Z" />
        <path d="M9 7V5a3 3 0 0 1 6 0v2" />
      </svg>
      {!compact && <span>Bag ({cartCount})</span>}
      {compact && cartCount > 0 && (
        <span style={{
          position: 'absolute',
          top: 4,
          right: 2,
          background: 'var(--rose-deep)',
          color: '#fff',
          borderRadius: '50%',
          width: 16,
          height: 16,
          fontSize: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          letterSpacing: 0,
        }}>
          {cartCount}
        </span>
      )}
    </button>
  );
}
