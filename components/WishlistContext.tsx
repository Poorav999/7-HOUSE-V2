"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Product } from "./CartContext";

interface WishlistContextType {
  wishlistItems: Product[];
  isLoaded: boolean;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<Product[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("7h_wishlist");
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

  const addToWishlist = (product: Product) => {
    setWishlistItems((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      const updated = [...prev, product];
      localStorage.setItem("7h_wishlist", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlistItems((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      localStorage.setItem("7h_wishlist", JSON.stringify(updated));
      return updated;
    });
  };

  const isInWishlist = (id: string) => wishlistItems.some((p) => p.id === id);

  return (
    <WishlistContext.Provider value={{ wishlistItems, isLoaded, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
}
