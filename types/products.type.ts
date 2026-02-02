export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type ViewMode = 'grid' | 'list';

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

export interface PriceRange {
  label: string;
  min: number;
  max: number;
  value: string;
}

export interface FilterState {
  search: string;
  priceRange: string;
  category: string;
  sort: SortOption;
  view: ViewMode;
}
