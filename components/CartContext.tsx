"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Product {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  images: string[];
  category?: string;
  stock?: number;
  isSoldOut?: boolean;
}

interface CartContextType {
  cartItems: Product[];
  isLoaded: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  cartTotal: number;
  setCartItems: (items: Product[]) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItemsState] = useState<Product[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem("7h_cart");
    try {
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? (parsed as Product[]) : [];
    } catch {
      return [];
    }
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 0);
    return () => clearTimeout(t);
  }, []);

  const setCartItems = (items: Product[]) => {
    setCartItemsState(items);
    if (typeof window !== 'undefined') {
      localStorage.setItem("7h_cart", JSON.stringify(items));
    }
  };

  const addToCart = (product: Product) => {
    setCartItemsState((prev) => {
      const updated = [...prev, product];
      localStorage.setItem("7h_cart", JSON.stringify(updated));
      return updated;
    });
    // Fire a global "unlock" event so the arcade toast can react anywhere.
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("7h:unlock", {
          detail: { name: product.name, image: product.images?.[0] ?? null },
        })
      );
    }
  };

  const removeFromCart = (id: string) => {
    setCartItemsState((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem("7h_cart", JSON.stringify(updated));
      return updated;
    });
  };

  const cartTotal = cartItems.reduce((total, item) => total + (Number(item.price) || 0), 0);

  return (
    <CartContext.Provider value={{ cartItems, isLoaded, addToCart, removeFromCart, cartTotal, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}