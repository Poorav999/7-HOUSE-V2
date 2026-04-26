"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
}

function RetroCardSkeleton() {
  return (
    <div className="w-full shrink-0 bg-[#d1d5db] p-4 rounded-xl border-b-[10px] border-r-[10px] border-[#9ca3af] shadow-2xl animate-pulse">
      <div className="bg-[#111] rounded-t-lg rounded-b-3xl p-6 border-4 border-zinc-700 h-[350px] flex items-center justify-center">
        <div className="w-48 h-48 bg-zinc-800/50 rounded-lg" />
      </div>
      <div className="flex items-center justify-between px-2 pt-2">
        <div className="h-6 w-32 bg-zinc-400/50 rounded" />
        <div className="flex gap-2">
          <div className="w-5 h-5 rounded-full bg-zinc-400/50" />
          <div className="w-5 h-5 rounded-full bg-zinc-400/50" />
        </div>
      </div>
    </div>
  );
}

export default function HomeClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Smooth scroll progress for potential visual effects
  const { scrollYProgress } = useScroll({
    container: scrollRef
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setTimeout(() => setIsLoading(false), 800);
      }
    }
    fetchProducts();
  }, []);

  return (
    <main className="hide-scrollbar w-full overflow-y-auto overflow-x-hidden bg-black selection:bg-red-500 selection:text-white">
      {/* ═══════════ Full-Screen Blurred Hero ═══════════ */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Blurred Background Image */}
        <Image
          src="/hero-cartoon.png"
          alt="7H Campaign"
          fill
          priority
          className="object-cover scale-110"
          style={{ filter: "blur(12px)" }}
        />

        {/* Dark overlays for contrast */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />

        {/* Content Container */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 text-sm font-bold tracking-[0.4em] uppercase text-white/80"
          >
            DRESS THE UNCONVENTIONAL
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-7xl md:text-9xl lg:text-[12rem] font-black text-white uppercase leading-[0.85] tracking-tighter drop-shadow-2xl"
          >
            WEAR
            <br />
            THE
            <br />
            HYPE
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12"
          >
            <Link 
              href="/shop"
              className="border-2 border-white px-12 py-5 font-black uppercase tracking-[0.3em] text-white transition-all duration-300 hover:bg-white hover:text-black hover:shadow-[0_0_50px_rgba(255,255,255,0.2)]"
            >
              Enter The Syndicate
            </Link>
          </motion.div>

          {/* Scroll Progress Indicator */}
          <motion.div 
            className="absolute bottom-0 left-0 h-1 bg-red-600 origin-left z-20"
            style={{ scaleX, width: "100%" }}
          />
        </div>
      </section>

      {/* ═══════════ Product Grid — Below Hero ═══════════ */}
      <section 
        ref={scrollRef}
        className="relative w-full bg-[#050505] py-24 px-8 md:px-16 lg:px-24"
      >
        <motion.div 
          className="mx-auto max-w-7xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-20 text-center">
            <h2 className="text-sm font-bold tracking-[0.5em] text-red-600 uppercase mb-4">New Arrivals</h2>
            <h3 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter">The Collection</h3>
            <div className="w-24 h-1 bg-red-600 mx-auto mt-6" />
          </div>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
              >
                {[1, 2, 3].map((i) => <RetroCardSkeleton key={i} />)}
              </motion.div>
            ) : error || products.length === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="font-mono text-red-600 text-lg tracking-[0.3em] animate-pulse uppercase">
                  {">"} NO_INVENTORY_FOUND
                </div>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {products.map((product) => {
                  const imgSrc = product.images && product.images[0]
                    ? product.images[0].startsWith("http") || product.images[0].startsWith("/")
                      ? product.images[0]
                      : `/${product.images[0]}`
                    : null;

                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      <Link href={`/product/${product.id}`} className="group block">
                        <div className="bg-[#e2e4e7] p-5 rounded-xl border-b-[12px] border-r-[12px] border-[#b0b5bd] shadow-2xl flex flex-col gap-4 relative transition-all duration-500 group-hover:-translate-y-4 group-hover:translate-x-2 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
                          <div className="bg-[#111111] rounded-t-lg rounded-b-[2rem] p-6 border-4 border-[#222] shadow-[inset_0_0_50px_rgba(0,0,0,0.9)] relative h-[400px] flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-10 pointer-events-none" />
                            {imgSrc ? (
                              <Image
                                src={imgSrc}
                                alt={product.name}
                                fill
                                className="object-contain p-10 group-hover:scale-110 transition-transform duration-700 ease-out z-0"
                              />
                            ) : (
                              <div className="text-zinc-800 font-mono text-xs uppercase tracking-[0.5em]">MISSING_IMAGE</div>
                            )}
                          </div>

                          <div className="flex items-center justify-between px-3 pt-2">
                            <div className="font-mono text-zinc-900 font-black tracking-[0.1em] text-xl uppercase truncate pr-4">
                              {product.name}
                            </div>
                            <div className="flex gap-2">
                              <div className="w-6 h-6 rounded-full bg-red-600 border border-red-700" />
                              <div className="w-6 h-6 rounded-full bg-zinc-600 border border-zinc-700" />
                            </div>
                          </div>
                          
                          <div className="absolute top-8 right-8 bg-red-600 text-white font-mono font-bold text-xs px-4 py-2 rounded-sm z-20 shadow-xl border border-red-700 rotate-3">
                            ${product.price}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    </main>
  );
}
