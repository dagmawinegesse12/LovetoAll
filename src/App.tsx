import { useState, useEffect } from 'react';
import type { CartItem, PageId, TweakValues } from './types';
import { PRODUCTS } from './data/products';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import TweaksPanel from './components/TweaksPanel';
import HomePage from './components/pages/HomePage';
import ShopPage from './components/pages/ShopPage';
import ProductPage from './components/pages/ProductPage';
import MissionPage from './components/pages/MissionPage';
import StoryPage from './components/pages/StoryPage';

const TWEAK_DEFAULTS: TweakValues = {
  accentColor: '#C97B8E',
  missionRibbon: true,
  headlineCopy: 'Wear love. Give love.',
};

export default function App() {
  const [tweaks, setTweaks] = useState<TweakValues>(TWEAK_DEFAULTS);
  const [page, setPage] = useState<PageId>('home');
  const [productId, setProductId] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Apply accent color to CSS variable
  useEffect(() => {
    document.documentElement.style.setProperty('--rose-deep', tweaks.accentColor);
  }, [tweaks.accentColor]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [page, productId]);

  const setTweak = (key: keyof TweakValues, value: TweakValues[keyof TweakValues]) => {
    setTweaks((prev) => ({ ...prev, [key]: value }));
  };

  const navigate = (p: PageId) => setPage(p);

  const viewProduct = (id: string) => {
    setProductId(id);
    setPage('product');
  };

  const addToCart = (item: CartItem) => {
    setCart((c) => {
      const existingIdx = c.findIndex(
        (x) => x.id === item.id && x.size === item.size && x.color === item.color,
      );
      if (existingIdx >= 0) {
        const copy = [...c];
        copy[existingIdx] = { ...copy[existingIdx]!, qty: copy[existingIdx]!.qty + 1 };
        return copy;
      }
      return [...c, item];
    });
    setCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart((c) => c.filter((_, i) => i !== index));
  };

  const cartCount = cart.reduce((n, i) => n + i.qty, 0);

  const renderPage = () => {
    switch (page) {
      case 'home':
        return (
          <HomePage
            setPage={navigate}
            viewProduct={viewProduct}
            addToCart={(p) => addToCart({ ...p, size: '', color: p.swatches[0]?.name ?? '', qty: 1 })}
            headline={tweaks.headlineCopy}
            showRibbon={tweaks.missionRibbon}
          />
        );
      case 'shop':
        return <ShopPage viewProduct={viewProduct} setPage={navigate} />;
      case 'product':
        return (
          <ProductPage
            productId={productId ?? PRODUCTS[0]!.id}
            addToCart={addToCart}
            setPage={navigate}
          />
        );
      case 'mission':
        return <MissionPage setPage={navigate} />;
      case 'story':
        return <StoryPage setPage={navigate} />;
    }
  };

  return (
    <div>
      <Header
        page={page}
        setPage={navigate}
        cartCount={cartCount}
        openCart={() => setCartOpen(true)}
      />

      <main>{renderPage()}</main>

      <Footer setPage={navigate} />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        removeFromCart={removeFromCart}
      />

      <TweaksPanel tweaks={tweaks} onChange={setTweak} />
    </div>
  );
}
