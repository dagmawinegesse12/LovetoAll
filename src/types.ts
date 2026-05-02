export type PageId = 'home' | 'shop' | 'product' | 'mission' | 'story';

export interface Swatch {
  name: string;
  hex: string;
}

export interface ProductPalette {
  bg: string;
  ink: string;
  accent?: string;
}

export type ProductType = 'tee' | 'raglan' | 'hoodie' | 'sweatpants';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  tag: string | null;
  palette: ProductPalette;
  photo: string | null;
  swatches: Swatch[];
  sizes: string[];
  type: ProductType;
  blurb: string;
  donates?: number;
}

export interface CartItem extends Product {
  size: string;
  color: string;
  qty: number;
}

export interface TweakValues {
  accentColor: string;
  missionRibbon: boolean;
  headlineCopy: string;
}
