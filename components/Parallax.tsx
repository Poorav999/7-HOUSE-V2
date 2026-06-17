"use client";

import { ReactNode, useRef, useSyncExternalStore } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

// Returns false on the server and during the first client render, then true
// once hydration is complete — without a setState-in-effect. Used to defer
// framer-motion's scroll tracking until the target element is hydrated.
const subscribe = () => () => {};
function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}

/**
 * Parallax — wraps children and drifts them vertically as the section scrolls
 * through the viewport. Keep `speed` small (0.1–0.4) for a premium, subtle feel.
 *
 *   <Parallax speed={0.2}>…</Parallax>          // drifts up as you scroll
 *   <Parallax speed={-0.15}>…</Parallax>         // drifts down (negative depth)
 *
 * Honors prefers-reduced-motion (renders a plain wrapper, no transform).
 */
interface ParallaxProps {
  children: ReactNode;
  /** Drift strength. Positive = moves up on scroll; negative = moves down. */
  speed?: number;
  className?: string;
}

export default function Parallax({
  children,
  speed = 0.2,
  className = "",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const hydrated = useHydrated();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Map scroll progress (0→1) to a vertical offset in percent.
  const range = speed * 100;
  const yRaw = useTransform(scrollYProgress, [0, 1], [`${range}%`, `${-range}%`]);
  const y = useSpring(yRaw, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Render a plain, ref'd wrapper during SSR + first client render so the markup
  // matches and framer-motion never reads the ref before it's hydrated.
  if (reduceMotion || !hydrated) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
