"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * PromoBar — sticky top announcement strip.
 *
 * Drop above <Navbar /> in app/layout.tsx, e.g.:
 *   <PromoBar />
 *   <Navbar />
 *
 * Auto-rotates messages every 4s. Dismissible (state held in memory).
 */

const MESSAGES = [
  "FREE SHIPPING ON ORDERS OVER ₹2999",
  "NEW DROP — VAULT 07 LIVE NOW",
  "USE CODE  HYPE15  FOR 15% OFF YOUR FIRST ORDER",
  "MEMBERS GET FIRST ACCESS — JOIN THE SYNDICATE",
];

export default function PromoBar() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!open) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % MESSAGES.length);
    }, 4000);
    return () => clearInterval(id);
  }, [open]);

  if (!open) return null;

  return (
    <div className="relative z-[60] w-full bg-red-600 text-white border-b border-black/20">
      <div className="relative mx-auto flex h-9 max-w-[1500px] items-center justify-between px-4">
        {/* Left chevron */}
        <button
          aria-label="Previous announcement"
          onClick={() =>
            setIndex((i) => (i - 1 + MESSAGES.length) % MESSAGES.length)
          }
          className="hidden text-white/70 transition-colors hover:text-white md:block"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Rotating message */}
        <div className="relative flex flex-1 items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="whitespace-nowrap text-[10px] font-black uppercase tracking-[0.35em] md:text-xs"
            >
              {MESSAGES[index]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Right chevron */}
        <button
          aria-label="Next announcement"
          onClick={() => setIndex((i) => (i + 1) % MESSAGES.length)}
          className="hidden text-white/70 transition-colors hover:text-white md:block"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Close */}
        <button
          aria-label="Dismiss announcement"
          onClick={() => setOpen(false)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 transition-colors hover:text-white"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
