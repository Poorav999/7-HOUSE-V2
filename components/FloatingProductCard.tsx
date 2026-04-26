"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { type Product } from "./CartContext";

export default function FloatingProductCard({ product }: { product: Product }) {
  if (!product) return null;

  // Helper to ensure valid image path for Next.js Image component
  const getImageUrl = (src?: string) => {
    if (!src) return "/placeholder.png";
    if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:") || src.startsWith("/")) {
      return src;
    }
    return `/${src}`;
  };

  const imageSrc = getImageUrl(product?.images?.[0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
      className="hidden md:flex absolute right-12 bottom-12 w-64 bg-[#030604]/80 backdrop-blur-xl border border-[#e5ecd9]/20 shadow-[0_0_30px_rgba(181,255,179,0.15)] p-3 flex-col gap-4 z-[50] rounded-sm relative overflow-hidden group"
    >
      {/* Mystical glow effect inside card */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#8fff8a]/5 to-transparent pointer-events-none group-hover:from-[#8fff8a]/10 transition-colors duration-500" />
      
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#080d0a] border border-white/5">
        {product?.images && product.images.length > 0 ? (
          <Image
            src={imageSrc}
            alt={product?.name || "Product"}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:brightness-110"
          />
        ) : (
          <Image
            src="/placeholder.png"
            alt="Placeholder"
            fill
            className="object-cover opacity-30 mix-blend-luminosity"
          />
        )}
      </div>
      <div className="flex justify-between items-center px-1 relative z-10">
        <div className="overflow-hidden w-2/3">
          <h3 className="text-[#e5ecd9]/90 font-syncopate uppercase tracking-[0.1em] text-[10px] truncate">{product?.name}</h3>
          <p className="text-[#a288ff] spooky-text text-[10px] mt-1 tracking-widest">${product?.price?.toString() || "0"}</p>
        </div>
        <Link href={`/product/${product.id}`} className="block">
          <button className="px-4 py-2 bg-[#8fff8a]/10 border border-[#8fff8a]/40 text-[#8fff8a] font-syncopate text-[9px] uppercase tracking-[0.1em] hover:bg-[#8fff8a] hover:text-black transition-all duration-300 shadow-[0_0_10px_rgba(143,255,138,0.2)]">
            Acquire
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
