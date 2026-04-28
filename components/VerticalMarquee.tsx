"use client";

import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import MagneticButton from "@/components/MagneticButton";

interface MarqueeProduct {
  id: string;
  name: string;
  price: number;
  images: string[];
  isSoldOut?: boolean;
}

interface VerticalMarqueeProps {
  products: MarqueeProduct[];
}

export default function VerticalMarquee({ products }: VerticalMarqueeProps) {
  const [isPaused, setIsPaused] = useState(false);
  const y = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Duplicate for smooth infinite scroll
  const scrollProducts = [...products, ...products, ...products];

  // Smooth continuous animation with pause capability
  useAnimationFrame((time, delta) => {
    if (!isPaused && scrollProducts.length > 0) {
      // Move at a constant speed (pixels per millisecond)
      const speed = 0.05; // Faster marquee pace
      const newY = y.get() - (delta * speed);
      
      // Reset when we've scrolled one full cycle
      // Since we have 3x the products, reset at -33.333%
      const containerHeight = containerRef.current?.scrollHeight || 1000;
      const resetPoint = -(containerHeight / 3);
      
      if (newY <= resetPoint) {
        y.set(newY - resetPoint);
      } else {
        y.set(newY);
      }
    }
  });

  const handleItemHover = () => {
    setIsPaused(true);
  };

  const handleItemLeave = () => {
    setIsPaused(false);
  };

  return (
    <section className="col-span-1 relative bg-[#130a20] flex flex-col h-screen overflow-hidden border-l-[6px] border-[#2e1b46] retro-panel">
      <div className="flex-1 relative overflow-hidden">
        <motion.div 
          ref={containerRef}
          className="absolute w-full flex flex-col gap-12 py-8"
          style={{ y }}
        >
          {scrollProducts.length === 0 ? (
            <div className="text-[#ff8f3f] font-bold uppercase tracking-widest text-center mt-20 cartoon-text">
              No Intel Yet ★
            </div>
          ) : (
            scrollProducts.map((product, idx) => (
              <Link
                href={`/product/${product.id}`}
                key={`${product.id}-${idx}`}
                className="block group px-4 md:px-6 h-[520px] flex flex-col"
                onMouseEnter={() => handleItemHover()}
                onMouseLeave={handleItemLeave}
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotate: -1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative w-full flex-1 bg-[#1b1030] overflow-hidden mb-4 cartoon-border comic-shadow"
                >
                  <Image
                    src={!product.images?.[0] ? "/shadyblue.jpg" : (product.images[0].startsWith("http") || product.images[0].startsWith("/") ? product.images[0] : `/${product.images[0]}`)}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-cover transition-all duration-500 group-hover:brightness-110 cartoon-filter"
                  />
                  
                  {/* Comic halftone overlay */}
                  <div className="absolute inset-0 halftone-texture opacity-20 pointer-events-none"></div>
                  
                  {/* Hover overlay with vibrant gradient */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-[#ff7a1a]/45 via-[#5f2a8a]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  {/* Comic burst corner decoration */}
                  <motion.div 
                    className="absolute top-2 right-2 bg-[#ffb347] text-[#1a1026] text-xs font-black px-2 py-1 rotate-12 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ 
                      border: '2px solid #1a1a2e',
                      boxShadow: '2px 2px 0 #1a1a2e'
                    }}
                  >
                    POW!
                  </motion.div>

                  {product.isSoldOut && (
                    <div className="absolute inset-0 bg-[#09050f]/90 flex items-center justify-center">
                      <span className="text-[#f6ecff] font-syncopate font-bold text-sm tracking-widest border-4 border-[#2e1b46] px-4 py-2 bg-[#ff7a1a] rotate-[-5deg] comic-shadow">
                        SOLD OUT!
                      </span>
                    </div>
                  )}
                </motion.div>
                
                {/* Product Info with fixed height */}
                <div className="flex flex-col gap-2 bg-[#1a1026] border-3 border-[#2e1b46] p-3 rounded-sm h-[120px]" style={{ boxShadow: '3px 3px 0 #2e1b46' }}>
                  <h4 className="text-xs md:text-sm font-black uppercase tracking-wide text-[#f6ecff] group-hover:text-[#ff8f3f] transition-colors duration-300 leading-tight h-[2.5rem] flex items-center overflow-hidden line-clamp-2">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2 flex-wrap pt-1 border-t-2 border-[#ff7a1a] flex-1">
                    <span className="text-sm md:text-base font-syncopate font-bold text-white bg-[#5f2a8a] px-3 py-1 border-2 border-[#2e1b46] whitespace-nowrap" style={{ boxShadow: '2px 2px 0 #2e1b46' }}>
                      ₹{product.price}
                    </span>
                    <span className="text-xs font-syncopate font-bold text-[#f6ecff]/50 line-through whitespace-nowrap">
                      ₹{Math.floor(product.price * 1.35)}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </motion.div>

        {/* Enhanced gradient masks with retro feel */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#130a20] via-[#130a20]/95 to-transparent z-10 pointer-events-none retro-fade"></div>
        <div className="absolute bottom-[5rem] left-0 w-full h-48 bg-gradient-to-t from-[#130a20] via-[#130a20]/95 to-transparent z-10 pointer-events-none retro-fade"></div>
      </div>

      {/* Shop Now Button with Enhanced Retro Cartoon styling */}
      <div className="absolute bottom-0 left-0 w-full z-20">
        <MagneticButton
          href="/shop"
          strength={0.2}
          className="group relative flex items-center justify-between w-full bg-[#ff7a1a] text-white font-black uppercase tracking-[0.25em] px-8 py-7 overflow-hidden retro-button text-lg"
        >
          <motion.div
            className="absolute inset-0 bg-[#5f2a8a]"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          />
          <span className="relative z-10" style={{ textShadow: '2px 2px 0px rgba(26, 26, 46, 0.5)' }}>
            Shop Now ✦
          </span>
          <motion.span 
            className="relative z-10 text-2xl"
            animate={{ 
              x: [0, 5, 0],
              rotate: [0, 15, 0]
            }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </MagneticButton>
      </div>
    </section>
  );
}
