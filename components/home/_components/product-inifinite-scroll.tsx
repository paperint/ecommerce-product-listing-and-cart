'use client';

import { Spinner } from '@/components/ui/spinner';
import { useInfiniteSroll } from '@/hooks/use-inifinite-scroll';

import { useEffect } from 'react';

interface ProductInfiniteSrollProps {
  hasMore: boolean;
  onLoadMore: () => void;
}

export function ProductInfiniteSroll({ hasMore, onLoadMore }: ProductInfiniteSrollProps) {
  const { ref, isIntersecting } = useInfiniteSroll({
    threshold: 0,
    rootMargin: '200px',
  });

  useEffect(() => {
    if (isIntersecting && hasMore) {
      onLoadMore();
    }
  }, [isIntersecting, hasMore, onLoadMore]);

  if (!hasMore) return null;

  return (
    <div ref={ref} className="flex justify-center py-8">
      <Spinner className="size-6" />
    </div>
  );
}
