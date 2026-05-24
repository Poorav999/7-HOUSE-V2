"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "@/components/WishlistContext";
import { useCart } from "@/components/CartContext";
import { useState } from "react";

const SIZES = ["S", "M", "L", "XL"];

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, isLoaded } = useWishlist();
  const { addToCart } = useCart();
  const [addedMap, setAddedMap] = useState<Record<string, string>>({});

  const handleAdd = (item: (typeof wishlistItems)[number], size: string) => {
    addToCart({ ...item, name: `${item.name} (SIZE: ${size})` } as Parameters<typeof addToCart>[0]);
    setAddedMap((prev) => ({ ...prev, [item.id]: size }));
    setTimeout(() => setAddedMap((prev) => { const n = { ...prev }; delete n[item.id]; return n; }), 1500);
  };

  const getImageSrc = (img?: string) => {
    if (!img) return "/shadyblue.jpg";
    if (img.startsWith("http") || img.startsWith("/")) return img;
    return `/${img}`;
  };

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="h-px w-12 bg-red-600" />
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-red-600">Your Wishlist</p>
          </div>
          <h1 className="flex items-end gap-3">
            <span className="font-serif italic lowercase font-normal text-4xl md:text-6xl tracking-tight">saved</span>
            <span className="font-black uppercase text-white text-4xl md:text-6xl tracking-tighter">
              {isLoaded ? wishlistItems.length : 0} ITEM{wishlistItems.length !== 1 ? "S" : ""}
            </span>
          </h1>
        </div>

        {/* Empty State */}
        {isLoaded && wishlistItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-40 gap-8"
          >
            <div className="text-white/10">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            </div>
            <p className="font-black uppercase tracking-[0.3em] text-white/20 text-xl text-center">
              Nothing saved yet
            </p>
            <Link
              href="/shop"
              className="border-2 border-white px-8 py-3 font-black uppercase tracking-[0.3em] text-sm text-white transition-all hover:bg-white hover:text-black"
            >
              Browse the Collection
            </Link>
          </motion.div>
        )}

        {/* Wishlist Grid */}
        {isLoaded && wishlistItems.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/5">
            <AnimatePresence>
              {wishlistItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col bg-black border border-white/10 hover:border-red-600/40 transition-colors overflow-hidden"
                >
                  {/* Image */}
                  <Link href={`/product/${item.id}`} className="relative aspect-[3/4] bg-[#0c0c0c] block overflow-hidden group">
                    <Image
                      src={getImageSrc(item.images?.[0])}
                      alt={item.name}
                      fill
                      unoptimized
                      className="object-contain p-6 transition-transform duration-700 group-hover:scale-105 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex flex-col p-4 gap-4">
                    {item.category && (
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30">
                        {item.category}
                      </span>
                    )}
                    <Link href={`/product/${item.id}`}>
                      <h3 className="font-black text-xs uppercase tracking-wider text-white hover:text-red-500 transition-colors line-clamp-2 leading-tight">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-base font-black tracking-tight text-white">
                      ₹{item.price.toLocaleString()}
                    </p>

                    {/* Size selector + Add */}
                    <div className="flex flex-col gap-2">
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30">
                        Select Size &amp; Add
                      </p>
                      <div className="flex gap-1">
                        {SIZES.map((size) => (
                          <button
                            key={size}
                            onClick={() => handleAdd(item, size)}
                            className={`flex-1 py-1.5 text-[9px] font-black uppercase tracking-wider border transition-all duration-150 ${
                              addedMap[item.id] === size
                                ? "bg-red-600 border-red-600 text-white"
                                : "border-white/20 text-white hover:border-white hover:bg-white hover:text-black"
                            }`}
                          >
                            {addedMap[item.id] === size ? "✓" : size}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="text-[9px] font-black uppercase tracking-widest text-white/30 hover:text-red-500 transition-colors text-left mt-1"
                    >
                      REMOVE
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Continue Shopping */}
        {isLoaded && wishlistItems.length > 0 && (
          <div className="mt-16 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 border border-white/20 px-8 py-3 font-black uppercase tracking-[0.3em] text-sm text-white/60 hover:border-white hover:text-white transition-all"
            >
              ← Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
