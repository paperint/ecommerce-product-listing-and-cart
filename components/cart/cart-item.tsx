'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/providers/cart/cart-context';
import type { CartItem as CartItemType } from '@/types/products.type';
import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import Image from 'next/image';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex gap-3 py-3">
      <div className="relative size-16 shrink-0 rounded-md border bg-muted">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-1"
          sizes="64px"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div>
          <h4 className="text-sm font-medium line-clamp-1">{product.title}</h4>
          <p className="text-sm font-semibold">${product.price.toFixed(2)}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="size-7"
              onClick={() => updateQuantity(product.id, quantity - 1)}
            >
              <MinusIcon className="size-3" />
            </Button>
            <span className="w-8 text-center text-sm">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="size-7"
              onClick={() => updateQuantity(product.id, quantity + 1)}
            >
              <PlusIcon className="size-3" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-7 text-destructive hover:text-destructive"
            onClick={() => removeItem(product.id)}
          >
            <Trash2Icon className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
