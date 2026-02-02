import { useEffect, useRef, useState } from 'react';

export function useInfiniteSroll({
  threshold = 0,
  rootMargin = '0px',
}: { threshold?: number; rootMargin?: string } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isIntersecting };
}
