import { ProductSkeleton } from '@/components/home/_components/product-skeleton';
import { Homepage } from '@/components/home/homepage';
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <Homepage />
    </Suspense>
  );
}
