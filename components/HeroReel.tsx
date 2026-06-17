"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface ReelProduct {
  id: string;
  name: string;
  images: string[];
}

/**
 * HeroReel — live-cycling, blurred background reel of real product images that
 * sits behind the hero headline. Falls back to the static hero art until
 * products load. Also surfaces a small arcade HUD readout of the current item.
 */
export default function HeroReel({ products }: { products: ReelProduct[] }) {
  const [index, setIndex] = useState(0);

  const pool = products.filter((p) => p.images?.[0]);

  useEffect(() => {
    if (pool.length < 2) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % pool.length);
    }, 3200);
    return () => clearInterval(t);
  }, [pool.length]);

  const getImageUrl = (src?: string) => {
    if (!src) return "/hero-cartoon.png";
    if (src.startsWith("http") || src.startsWith("data:") || src.startsWith("/")) return src;
    return `/${src}`;
  };

  const current = pool[index];

  return (
    <>
      {/* Cycling product images (blurred, behind text) */}
      <div className="absolute inset-0">
        {pool.length === 0 ? (
          <Image
            src="/hero-cartoon.png"
            alt="7H editorial campaign"
            fill
            priority
            className="scale-110 object-cover"
            style={{ filter: "blur(12px)" }}
          />
        ) : (
          <AnimatePresence mode="sync">
            <motion.div
              key={current.id + index}
              initial={{ opacity: 0, scale: 1.18 }}
              animate={{ opacity: 1, scale: 1.1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={getImageUrl(current.images[0])}
                alt={current.name}
                fill
                priority
                unoptimized
                className="object-cover"
                style={{ filter: "blur(14px) brightness(0.8)" }}
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Dark + scanline overlays for contrast */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 3px)",
        }}
      />

      {/* HUD corner brackets */}
      <div className="pointer-events-none absolute left-6 top-24 h-10 w-10 border-l-2 border-t-2 border-red-600/60" />
      <div className="pointer-events-none absolute right-6 top-24 h-10 w-10 border-r-2 border-t-2 border-white/25" />
      <div className="pointer-events-none absolute bottom-6 left-6 h-10 w-10 border-b-2 border-l-2 border-white/25" />
      <div className="pointer-events-none absolute bottom-6 right-6 h-10 w-10 border-b-2 border-r-2 border-red-600/60" />

      {/* Live HUD readout — top-left */}
      <div className="absolute left-8 top-28 z-20 hidden md:flex items-center gap-2.5 border border-white/15 bg-black/40 px-3 py-1.5 backdrop-blur-md">
        <span className="inline-block h-2 w-2 rounded-full bg-red-600 arcade-blink" />
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">
          {pool.length > 0 ? "Now Streaming" : "Booting"}
        </span>
        {current && (
          <span className="max-w-[180px] truncate font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-red-400">
            {current.name}
          </span>
        )}
      </div>

      {/* Reel progress pips — top-right */}
      {pool.length > 1 && (
        <div className="absolute right-8 top-28 z-20 hidden md:flex items-center gap-1.5">
          {pool.slice(0, 8).map((p, i) => (
            <span
              key={p.id}
              className={`h-1 transition-all duration-500 ${
                i === index % Math.min(pool.length, 8)
                  ? "w-6 bg-red-600"
                  : "w-2 bg-white/25"
              }`}
            />
          ))}
        </div>
      )}
    </>
  );
}
