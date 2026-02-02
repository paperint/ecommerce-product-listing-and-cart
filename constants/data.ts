import { PriceRange } from '@/types/products.type';

export const PRICE_RANGES: PriceRange[] = [
  { label: 'All Prices', min: 0, max: Infinity, value: 'all' },
  { label: 'Under $50', min: 0, max: 50, value: '0-50' },
  { label: '$50 - $100', min: 50, max: 100, value: '50-100' },
  { label: 'Over $100', min: 100, max: Infinity, value: '100+' },
];

export const PAGE_SIZE = 8;
