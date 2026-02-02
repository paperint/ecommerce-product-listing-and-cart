'use client';

import type { FilterState, SortOption, ViewMode } from '@/types/products.type';
import { useRouter, useSearchParams } from 'next/navigation';
import { createContext, useCallback, useContext, useRef } from 'react';

interface FilterContextValue extends FilterState {
  setSearch: (search: string) => void;
  setPriceRange: (range: string) => void;
  setCategory: (category: string) => void;
  setSort: (sort: SortOption) => void;
  setView: (view: ViewMode) => void;
  clearAll: () => void;
}

const FilterContext = createContext<FilterContextValue | null>(null);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchParamsRef = useRef(searchParams);
  searchParamsRef.current = searchParams;

  const search = searchParams.get('q') ?? '';
  const priceRange = searchParams.get('price') ?? 'all';
  const category = searchParams.get('category') ?? 'all';
  const sort = (searchParams.get('sort') as SortOption) ?? 'default';
  const view = (searchParams.get('view') as ViewMode) ?? 'grid';

  const updateParam = useCallback(
    (key: string, value: string, defaultValue: string) => {
      const params = new URLSearchParams(searchParamsRef.current.toString());
      if (value === defaultValue) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      const qs = params.toString();
      router.replace(qs ? `?${qs}` : '/', { scroll: false });
    },
    [router],
  );

  const setSearch = useCallback((v: string) => updateParam('q', v, ''), [updateParam]);
  const setPriceRange = useCallback((v: string) => updateParam('price', v, 'all'), [updateParam]);
  const setCategory = useCallback((v: string) => updateParam('category', v, 'all'), [updateParam]);
  const setSort = useCallback((v: SortOption) => updateParam('sort', v, 'default'), [updateParam]);
  const setView = useCallback((v: ViewMode) => updateParam('view', v, 'grid'), [updateParam]);

  const clearAll = useCallback(() => {
    router.replace('/', { scroll: false });
  }, [router]);

  return (
    <FilterContext.Provider
      value={{
        search,
        priceRange,
        category,
        sort,
        view,
        setSearch,
        setPriceRange,
        setCategory,
        setSort,
        setView,
        clearAll,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) throw new Error('useFilters must be used within FilterProvider');
  return context;
}
