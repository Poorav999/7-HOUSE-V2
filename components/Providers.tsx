"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "./CartContext";
import { ReactNode } from "react";
import SmoothScroll from "./SmoothScroll";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        <SmoothScroll />
        {children}
      </CartProvider>
    </SessionProvider>
  );
}