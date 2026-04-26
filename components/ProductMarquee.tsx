"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
}

interface ProductMarqueeProps {
  products: Product[];
  speed?: number;
}

export default function ProductMarquee({ products, speed = 50 }: ProductMarqueeProps) {
  const [isPaused, setIsPaused] = useState(false);
  
  // Create a doubled array for seamless infinite looping
  // Set 1 + Set 2. We move exactly one set's width to loop perfectly.
  const displayProducts = [...products, ...products];

  return (
    <div className="relative w-full overflow-hidden bg-black py-16">
      {/* Edge Gradients for Luxury Look */}
      <div className="pointer-events-none absolute left-0 top-0 z-[15] h-full w-60 bg-gradient-to-r from-black via-black/40 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-[15] h-full w-60 bg-gradient-to-l from-black via-black/40 to-transparent" />

      <div className="flex w-fit">
        <motion.div
  initial={{ x: 0 }}
  animate={{ 
    x: isPaused ? undefined : "-50%" 
  }}
  transition={{
    duration: products.length * 8, // Constant speed
    ease: "linear",
    repeat: Infinity,
    repeatType: "loop"
  }}
  className="flex gap-16 px-8"
  onMouseEnter={() => setIsPaused(true)}
  onMouseLeave={() => setIsPaused(false)}
>
  {displayProducts.map((product, idx) => (
    <MarqueeItem key={`${product.id}-${idx}`} product={product} />
  ))}
</motion.div>
      </div>
    </div>
  );
}

function MarqueeItem({ product }: { product: Product }) {
  const imgSrc = product.images?.[0]?.startsWith("http") || product.images?.[0]?.startsWith("/") 
    ? product.images[0] 
    : `/${product.images?.[0]}`;

  return (
    <motion.div
      className="relative w-[360px] shrink-0 group"
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative flex flex-col gap-5 rounded-2xl bg-[#e5e7eb] p-5 shadow-2xl transition-all duration-500 group-hover:shadow-[0_40px_80px_rgba(255,255,255,0.08)] group-hover:-translate-y-2">
          {/* Status Badge */}
          <div className="absolute -top-4 left-6 z-20 rotate-[-3deg] rounded-[4px] bg-yellow-300 px-5 py-1.5 font-black uppercase tracking-[0.3em] text-black shadow-[4px_4px_0_#111]">
            drops
          </div>

          <div className="absolute right-6 top-6 z-20 rounded-full bg-white/20 px-3 py-1 font-mono text-[10px] font-bold text-black backdrop-blur-md">
            NEW_ITEM
          </div>

          {/* Optimized Product Container */}
          <div className="relative flex h-[380px] w-full items-center justify-center overflow-hidden rounded-xl bg-[#0a0a0a] shadow-[inset_0_0_60px_rgba(0,0,0,1)]">
             {/* Dynamic Backglow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/5 blur-[60px] group-hover:bg-white/10 transition-colors duration-500" />
             
             {/* Floor Shadow (Grounding) */}
             <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-32 h-6 bg-black/60 blur-xl opacity-80" />

             {/* Digital Grid Overlay */}
             <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:100%_4px] opacity-20" />
             
             {/* Actual Image */}
             {imgSrc ? (
               <div className="relative z-10 h-full w-full p-12 transition-transform duration-700 group-hover:scale-110">
                 <Image
                   src={imgSrc}
                   alt={product.name}
                   fill
                   className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
                   style={{ 
                     imageRendering: "auto",
                     filter: "brightness(1.05) contrast(1.1)"
                   }}
                 />
               </div>
             ) : (
                <div className="font-mono text-xs tracking-widest text-zinc-800">DATA_LOST</div>
             )}
          </div>

          {/* Enhanced Info Row */}
          <div className="flex items-center justify-between px-2 pt-2">
            <div className="flex flex-col">
              <h3 className="font-mono text-xl font-black uppercase tracking-tight text-black max-w-[220px] truncate">
                {product.name}
              </h3>
              <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-500 font-mono">
                sn/{product.id.slice(0, 8)}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className="rounded-lg border-2 border-black bg-black px-3 py-1 font-mono text-sm font-black text-white shadow-[2px_2px_0_rgba(0,0,0,0.2)]">
                ${product.price}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
