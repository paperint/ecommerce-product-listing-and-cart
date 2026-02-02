"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useCart } from "@/providers/cart/cart-context";
import type { Product, ViewMode } from "@/types/products.type";
import { EyeIcon, ShoppingCartIcon, StarIcon } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  view: ViewMode;
  onQuickView: (product: Product) => void;
}

export function ProductCard({ product, view, onQuickView }: ProductCardProps) {
  const { addItem } = useCart();

  if (view === "list") {
    return (
      <Card className="flex-row overflow-hidden py-0">
        <div className="relative w-36 shrink-0 sm:w-48">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4"
            sizes="(max-width: 640px) 144px, 192px"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between p-4">
          <div className="space-y-1">
            <Badge variant="secondary" className="text-xs capitalize">
              {product.category}
            </Badge>
            <h3 className="line-clamp-1 font-semibold">{product.title}</h3>
            <p className="text-muted-foreground line-clamp-2 text-sm">
              {product.description}
            </p>
            <div className="text-muted-foreground flex items-center gap-1 text-sm">
              <StarIcon className="size-3.5 fill-yellow-400 text-yellow-400" />
              {product.rating.rate} ({product.rating.count})
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 pt-2">
            <span className="text-lg font-bold">
              ${product.price.toFixed(2)}
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onQuickView(product)}
              >
                <EyeIcon className="mr-1 size-4" /> Quick View
              </Button>
              <Button size="sm" onClick={() => addItem(product)}>
                <ShoppingCartIcon className="mr-1 size-4" /> Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="group overflow-hidden py-4">
      <CardHeader className="relative aspect-square p-0">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4 transition-transform group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={() => onQuickView(product)}
        >
          <EyeIcon className="size-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <Badge variant="secondary" className="text-xs capitalize">
          {product.category}
        </Badge>
        <h3 className="line-clamp-1 text-sm font-semibold">{product.title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <div className="text-muted-foreground flex items-center gap-1 text-sm">
            <StarIcon className="size-3.5 fill-yellow-400 text-yellow-400" />
            {product.rating.rate}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button className="w-full" size="lg" onClick={() => addItem(product)}>
          <ShoppingCartIcon className="mr-1 size-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
