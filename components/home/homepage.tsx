"use client";

import { PAGE_SIZE, PRICE_RANGES } from "@/constants/data";
import { useFilters } from "@/providers/filters/filter-context";
import { fetchProducts } from "@/services/product-service";
import type { Product, SortOption } from "@/types/products.type";
import { PackageOpenIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ProductDialog } from "./_components/product-dialog";
import { ProductGrid } from "./_components/product-grid";
import { ProductInfiniteSroll } from "./_components/product-inifinite-scroll";
import { ProductList } from "./_components/product-list";
import { ProductSkeleton } from "./_components/product-skeleton";

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "name-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "name-desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return sorted;
  }
}

export function Homepage() {
  const { search, priceRange, category, sort, view } = useFilters();

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null,
  );

  const loadProducts = useCallback(async () => {
    try {
      const data = await fetchProducts();
      setAllProducts(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const filteredProducts = useMemo(() => {
    let products = allProducts;

    if (search) {
      const q = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }

    if (priceRange !== "all") {
      const range = PRICE_RANGES.find((r) => r.value === priceRange);
      if (range) {
        products = products.filter(
          (p) => p.price >= range.min && p.price < range.max,
        );
      }
    }

    if (category !== "all") {
      products = products.filter((p) => p.category === category);
    }

    products = sortProducts(products, sort);

    return products;
  }, [allProducts, search, priceRange, category, sort]);

  useEffect(() => {
    setPage(1);
  }, [search, priceRange, category, sort]);

  const visibleProducts = filteredProducts.slice(0, page * PAGE_SIZE);
  const hasMore = visibleProducts.length < filteredProducts.length;

  const loadMore = useCallback(() => {
    setPage((p) => p + 1);
  }, []);

  if (loading) {
    return <ProductSkeleton />;
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <PackageOpenIcon className="text-muted-foreground size-12" />
        <div>
          <h3 className="text-lg font-semibold">No products found</h3>
          <p className="text-muted-foreground text-sm">
            Try adjusting your search or filters.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between pb-4">
        <p className="text-muted-foreground text-sm">
          Showing {visibleProducts.length} of {filteredProducts.length} products
        </p>
      </div>

      {view === "grid" ? (
        <ProductGrid
          products={visibleProducts}
          onQuickView={setQuickViewProduct}
        />
      ) : (
        <ProductList
          products={visibleProducts}
          onQuickView={setQuickViewProduct}
        />
      )}

      <ProductInfiniteSroll hasMore={hasMore} onLoadMore={loadMore} />

      <ProductDialog
        product={quickViewProduct}
        open={!!quickViewProduct}
        onOpenChange={(open) => !open && setQuickViewProduct(null)}
      />
    </>
  );
}
