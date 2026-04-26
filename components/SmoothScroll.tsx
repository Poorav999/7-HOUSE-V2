"use client";

import { useEffect, useRef } from "react";

type LenisType = {
  raf(time: number): void;
  destroy(): void;
};

export default function SmoothScroll() {
  const lenisRef = useRef<LenisType | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Dynamically import Lenis to avoid SSR issues
    const initLenis = async () => {
      try {
        const { default: Lenis } = await import("@studio-freight/lenis");
        
        const lenis = new Lenis();

        lenisRef.current = lenis;

        const raf = (time: number) => {
          lenis.raf(time);
          rafRef.current = requestAnimationFrame(raf);
        };

        rafRef.current = requestAnimationFrame(raf);
      } catch (error) {
        console.warn("Lenis smooth scroll failed to initialize:", error);
      }
    };

    initLenis();

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  return null;
}
