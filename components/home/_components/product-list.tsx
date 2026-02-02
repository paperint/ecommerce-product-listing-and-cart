'use client';

import type { Product } from '@/types/products.type';
import { ProductCard } from './product-card';

interface ProductListProps {
  products: Product[];
  onQuickView: (product: Product) => void;
}

export function ProductList({ products, onQuickView }: ProductListProps) {
  return (
    <div className="flex flex-col gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} view="list" onQuickView={onQuickView} />
      ))}
    </div>
  );
}
