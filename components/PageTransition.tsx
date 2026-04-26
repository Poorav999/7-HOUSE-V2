/**
 * Page Transition Component
 * Wraps page content with smooth transitions between routes
 */

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { pageVariants, pageFadeVariants } from "@/lib/animations";

interface PageTransitionProps {
  children: ReactNode;
  variant?: "fade" | "slide" | "slideUp";
  className?: string;
}

export default function PageTransition({ 
  children, 
  variant = "slideUp",
  className = "",
}: PageTransitionProps) {
  const pathname = usePathname();

  const variants = variant === "fade" 
    ? pageFadeVariants 
    : pageVariants;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Simpler fade-only transition
 */
export function FadeTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Slide transition (horizontal)
 */
export function SlideTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ 
          duration: 0.4, 
          ease: [0.33, 1, 0.68, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
