'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { CartItem } from './cart-item';
// import { ExportDialog } from './export-dialog';
import { useCart } from '@/providers/cart/cart-context';
import { ShoppingCartIcon } from 'lucide-react';

export function CartSheet() {
  const { items, isOpen, setIsOpen, totalPrice, clearCart } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCartIcon className="size-5" />
            Cart ({items.length})
          </SheetTitle>
          <SheetDescription className="sr-only">
            Review your items before checkout.
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
            <ShoppingCartIcon className="size-12 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-4">
            <div className="divide-y">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          </div>
        )}

        {items.length > 0 && (
          <SheetFooter className="flex-col gap-3 border-t pt-4">
            <div className="flex items-center justify-between w-full">
              <span className="font-semibold">Total</span>
              <span className="text-lg font-bold">${totalPrice.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex gap-2 w-full">
              <Button variant="outline" size="sm" onClick={clearCart} className="flex-1">
                Clear Cart
              </Button>
              {/* <ExportDialog /> */}
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
