"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import type { CartItem, Product } from "@/types/products.type";
import { createContext, useCallback, useContext, useState } from "react";
import { toast } from "sonner";

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isBouncing: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems, localStageLoading] = useLocalStorage<CartItem[]>(
    "cart-items",
    [],
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  const triggerBounce = useCallback(() => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 300);
  }, []);

  const addItem = useCallback(
    (product: Product) => {
      setItems((prev) => {
        const existing = prev.find((item) => item.product.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        }
        return [...prev, { product, quantity: 1 }];
      });
      triggerBounce();
      toast.success(`Added "${product.title}" to cart`);
    },
    [setItems, triggerBounce],
  );

  const removeItem = useCallback(
    (productId: number) => {
      setItems((prev) => prev.filter((item) => item.product.id !== productId));
    },
    [setItems],
  );

  const updateQuantity = useCallback(
    (productId: number, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId);
        return;
      }
      setItems((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item,
        ),
      );
    },
    [setItems, removeItem],
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, [setItems]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  if (!localStageLoading) {
    return (
      <CartContext.Provider
        value={{
          items: [],
          addItem: () => {},
          removeItem: () => {},
          updateQuantity: () => {},
          clearCart: () => {},
          totalItems: 0,
          totalPrice: 0,
          isOpen: false,
          setIsOpen: () => {},
          isBouncing: false,
        }}
      >
        {children}
      </CartContext.Provider>
    );
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isOpen,
        setIsOpen,
        isBouncing,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
