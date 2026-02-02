'use client';

import { cn } from '@/lib/utils';
import { useCart } from '@/providers/cart/cart-context';
import { Badge } from '../ui/badge';

type Props = {};

const CartBadge = (props: Props) => {
  const { totalItems } = useCart();
  if (totalItems <= 0) return null;

  return (
    <Badge
      className={cn(
        'absolute -top-2 -right-2 text-[10px] px-1.5',
        totalItems > 0 ? 'scale-100' : 'scale-0',
      )}
    >
      {totalItems}
    </Badge>
  );
};

export default CartBadge;
