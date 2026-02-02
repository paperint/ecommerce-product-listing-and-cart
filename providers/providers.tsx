'use client';

import { Toaster } from '@/components/ui/sonner';
import { Suspense } from 'react';
import { CartProvider } from './cart/cart-context';
import { FilterProvider } from './filters/filter-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Suspense>
        <FilterProvider>{children}</FilterProvider>
      </Suspense>
      <Toaster />
    </CartProvider>
  );
}
