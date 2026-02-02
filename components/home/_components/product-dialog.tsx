'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCart } from '@/providers/cart/cart-context';
import type { Product } from '@/types/products.type';
import { ShoppingCartIcon, StarIcon } from 'lucide-react';
import Image from 'next/image';

interface ProductDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDialog({ product, open, onOpenChange }: ProductDialogProps) {
  const { addItem } = useCart();

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="line-clamp-2">{product.title}</DialogTitle>
          <DialogDescription>
            <Badge variant="secondary" className="capitalize">
              {product.category}
            </Badge>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="relative aspect-square">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, 250px"
            />
          </div>
          <div className="flex flex-col justify-between space-y-3">
            <p className="text-sm text-muted-foreground line-clamp-6">{product.description}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-sm">
                <StarIcon className="size-4 fill-yellow-400 text-yellow-400" />
                <span>{product.rating.rate}</span>
                <span className="text-muted-foreground">({product.rating.count} reviews)</span>
              </div>
              <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            className="w-full"
            onClick={() => {
              addItem(product);
              onOpenChange(false);
            }}
          >
            <ShoppingCartIcon className="size-4 mr-2" />
            Add to Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
