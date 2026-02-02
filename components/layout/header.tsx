'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
// import { useDebounce } from '@/hooks/use-debounce';
// import { useCart } from '@/lib/cart-context';
import { cn } from '@/lib/utils';
import { useCart } from '@/providers/cart/cart-context';
import { useFilters } from '@/providers/filters/filter-context';
import { SortOption, ViewMode } from '@/types/products.type';
import { GridIcon, ListIcon, SearchIcon, ShoppingCartIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useDebounce } from '@/hooks/use-debounce';
import dynamic from 'next/dynamic';

const CartBadge = dynamic(() => import('../cart/cart-badge'), {
  ssr: false,
});

export function Header() {
  const { search, setSearch, sort, setSort, view, setView } = useFilters();
  const { setIsOpen, isBouncing } = useCart();

  const [localSearch, setLocalSearch] = useState(search);
  const debouncedSearch = useDebounce(localSearch, 300);

  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  return (
    <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/60">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />

      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <SearchIcon className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Search products..."
          className="pl-8 h-9"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Sort */}
        <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
          <SelectTrigger className="w-37.5 hidden sm:flex" size="sm">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="name-asc">Name: A-Z</SelectItem>
            <SelectItem value="name-desc">Name: Z-A</SelectItem>
          </SelectContent>
        </Select>

        {/* View Toggle */}
        <ToggleGroup
          type="single"
          value={view}
          onValueChange={(v) => v && setView(v as ViewMode)}
          variant="outline"
          className="hidden sm:flex"
        >
          <ToggleGroupItem value="grid" aria-label="Grid view" className="px-2">
            <GridIcon className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view" className="px-2">
            <ListIcon className="size-4" />
          </ToggleGroupItem>
        </ToggleGroup>

        {/* Cart Button */}
        <div
          className="relative border size-9 flex items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer p-2"
          onClick={() => setIsOpen(true)}
        >
          <ShoppingCartIcon className={cn('size-4', isBouncing && 'animate-cart-pop')} />
          <CartBadge />
        </div>
      </div>
    </header>
  );
}
