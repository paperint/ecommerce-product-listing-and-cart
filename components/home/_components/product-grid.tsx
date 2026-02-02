'use client';

import type { Product } from '@/types/products.type';
import { ProductCard } from './product-card';

interface ProductGridProps {
  products: Product[];
  onQuickView: (product: Product) => void;
}

export function ProductGrid({ products, onQuickView }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} view="grid" onQuickView={onQuickView} />
      ))}
    </div>
  );
}
