"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";
import { ReactNode } from "react";
import SmoothScroll from "./SmoothScroll";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        <WishlistProvider>
          <SmoothScroll />
          {children}
        </WishlistProvider>
      </CartProvider>
    </SessionProvider>
  );
}