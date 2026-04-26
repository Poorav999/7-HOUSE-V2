"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { staggerContainerVariants, staggerItemVariants } from "@/lib/animations";

interface GridProduct {
  id: string;
  name: string;
  price: number;
  images: string[];
  isSoldOut?: boolean;
}

interface ProductGridProps {
  products: GridProduct[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <section className="py-24 px-6 max-w-[1600px] mx-auto w-full">
      {/* Header with stagger animation */}
      <motion.div 
        className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      >
        <div className="flex items-end gap-3 tracking-widest uppercase">
          <motion.span 
            className="text-3xl md:text-5xl font-serif italic text-white leading-none"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            all
          </motion.span>
          <motion.span 
            className="text-4xl md:text-6xl font-black font-syncopate text-red-600 leading-none"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            DROPS
          </motion.span>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            href="/shop"
            className="group text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 hover:text-white transition-colors relative"
          >
            VIEW ALL{" "}
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              ↗
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Product Grid with stagger animations */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-0"
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {products.length === 0 ? (
          <p className="text-zinc-500 font-bold uppercase tracking-widest col-span-full py-12">
            No Drops Currently Available
          </p>
        ) : (
          products.map((product) => (
            <motion.div
              key={`alldrops-${product.id}`}
              variants={staggerItemVariants}
            >
              <Link
                href={`/product/${product.id}`}
                className="group border border-zinc-800 bg-black flex flex-col hover:border-zinc-500 transition-all duration-300 h-full"
              >
                {/* Image Box */}
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#050505]">
                  {/* Top Bar absolute indicators */}
                  <motion.div 
                    className="absolute top-3 left-3 z-10"
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Heart className="text-zinc-600 hover:text-white transition-colors cursor-pointer w-5 h-5" />
                  </motion.div>
                  
                  <div className="absolute top-3 right-3 z-10 bg-red-600 text-white font-black text-[10px] px-2 py-1 tracking-widest">
                    35% OFF
                  </div>

                  <motion.div
                    className="relative w-full h-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <Image
                      src={!product.images?.[0] ? "/shadyblue.jpg" : (product.images[0].startsWith("http") || product.images[0].startsWith("/") ? product.images[0] : `/${product.images[0]}`)}
                      alt={product.name}
                      fill
                      unoptimized
                      className="object-cover p-6"
                    />
                  </motion.div>

                  {/* Hover gradient overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  {product.isSoldOut && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <span className="text-white font-syncopate font-bold text-xs tracking-widest border border-white px-2 py-1">
                        SOLD OUT
                      </span>
                    </div>
                  )}
                </div>

                {/* Bottom Text Area */}
                <div className="border-t border-zinc-800 p-4 flex flex-col gap-2 group-hover:bg-zinc-950 transition-colors duration-300">
                  <h4 className="text-sm font-black uppercase tracking-tight text-white group-hover:text-red-600 transition-colors duration-300">
                    {product.name}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-syncopate font-bold text-white">
                      ₹{product.price}
                    </span>
                    <span className="text-[10px] font-syncopate font-bold text-zinc-500 line-through">
                      ₹{Math.floor(product.price * 1.35)}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        )}
      </motion.div>
    </section>
  );
}
