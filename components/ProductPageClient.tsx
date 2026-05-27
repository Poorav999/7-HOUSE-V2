"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/CartContext";
import { useWishlist } from "@/components/WishlistContext";
import type { Product } from "@/components/CartContext";

interface Props {
  product: Product & { description?: string | null };
  imageUrl: string;
}

const SIZES = ["S", "M", "L", "XL"];
const SIZE_GUIDE = [
  { size: "S",  chest: "58", sleeve: "60", length: "70" },
  { size: "M",  chest: "60", sleeve: "62", length: "72" },
  { size: "L",  chest: "62", sleeve: "64", length: "74" },
  { size: "XL", chest: "64", sleeve: "66", length: "76" },
];
const CARE = [
  "100% HEAVYWEIGHT COTTON",
  "COLD MACHINE WASH INSIDE OUT",
  "DO NOT TUMBLE DRY",
  "AVOID IRONING ON PRINTS",
  "LAY FLAT TO DRY",
];

export default function ProductPageClient({ product, imageUrl }: Props) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const wishlisted = isInWishlist(product.id);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 18;
    setTilt({ x: -y, y: x });
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      const btn = document.getElementById("size-error");
      if (btn) { btn.classList.remove("opacity-0"); setTimeout(() => btn.classList.add("opacity-0"), 2000); }
      return;
    }
    setIsAdding(true);
    setTimeout(() => {
      for (let i = 0; i < quantity; i++) {
        addToCart({ ...product, name: `${product.name} (SIZE: ${selectedSize})` });
      }
      setIsAdding(false);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 2000);
    }, 400);
  };

  const handleWishlist = () => {
    if (wishlisted) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  return (
    <main className="relative min-h-screen bg-black text-white pb-24 overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-red-600/8 blur-[120px]" />
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-indigo-600/6 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-red-900/8 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-32">
        {/* Back nav */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors"
          >
            <span>←</span> Back to Shop
          </Link>
        </motion.div>

        {/* Hero grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">

          {/* ─── LEFT: Image panel ─── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              ref={imageRef}
              className="relative w-full aspect-square cursor-pointer select-none"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => { setHovering(false); setTilt({ x: 0, y: 0 }); }}
              style={{
                transform: hovering
                  ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02,1.02,1.02)`
                  : "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
                transition: hovering ? "transform 0.08s ease" : "transform 0.6s cubic-bezier(0.23,1,0.32,1)",
              }}
            >
              {/* Glass panel */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-sm shadow-[0_0_80px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)]">
                {/* Glow behind image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2/3 h-2/3 rounded-full bg-red-600/15 blur-[60px]" />
                </div>

                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-red-600/50 z-10" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/20 z-10" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/20 z-10" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-red-600/50 z-10" />

                <Image
                  src={imageUrl}
                  alt={product.name}
                  fill
                  unoptimized
                  priority
                  className="object-contain p-8 drop-shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Glass shine overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>

          {/* ─── RIGHT: Product info ─── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="flex flex-col gap-6"
          >
            {/* Brand label */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/40 px-3 py-1.5 border border-white/10 rounded-full bg-white/[0.03] backdrop-blur-sm">
                ⭐ 7HOUSES SYNDICATE
              </span>
              {(product.isSoldOut) && (
                <span className="text-[10px] font-black tracking-widest uppercase text-red-400 px-3 py-1.5 border border-red-600/30 rounded-full bg-red-600/10">
                  SOLD OUT
                </span>
              )}
            </div>

            {/* Product name */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-white">
              {product.name}
            </h1>

            {/* Price glass card */}
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-1">Price</p>
                <p className="text-4xl font-black text-white tracking-tighter">
                  ₹{product.price.toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-400 bg-red-600/10 border border-red-600/30 px-3 py-1.5 rounded-lg">
                  LIMITED STOCK
                </span>
                <div className="flex gap-3 text-[10px] font-bold uppercase tracking-widest text-white/30">
                  <span>100% Cotton</span>
                  <span>·</span>
                  <span>Oversized Fit</span>
                </div>
              </div>
            </div>

            {/* Size selector */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/60">Select Size</p>
                <p
                  id="size-error"
                  className="text-[10px] font-black uppercase tracking-widest text-red-400 opacity-0 transition-opacity duration-300"
                >
                  ⚡ Pick a size first
                </p>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                    className={`py-3 text-sm font-black uppercase tracking-wider rounded-lg border transition-all duration-200 ${
                      selectedSize === size
                        ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                        : "bg-white/[0.04] border-white/15 text-white/60 hover:bg-white/10 hover:border-white/40 hover:text-white backdrop-blur-sm"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/60 w-28">Quantity</p>
              <div className="flex items-center rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-12 h-12 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all text-lg font-black"
                >
                  −
                </button>
                <span className="w-12 text-center font-black text-white text-lg select-none border-l border-r border-white/10 h-12 flex items-center justify-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="w-12 h-12 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all text-lg font-black"
                >
                  +
                </button>
              </div>
              <p className="text-sm font-black text-white/40 ml-auto">
                Total: <span className="text-white">₹{(product.price * quantity).toLocaleString()}</span>
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 mt-2">
              <motion.button
                onClick={handleAddToCart}
                disabled={isAdding || product.isSoldOut}
                whileTap={{ scale: 0.97 }}
                className={`relative w-full py-4 font-black uppercase tracking-[0.3em] text-sm rounded-xl overflow-hidden transition-all duration-300 disabled:opacity-50 ${
                  addedSuccess
                    ? "bg-green-600 text-white"
                    : "bg-red-600 hover:bg-red-500 text-white shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:shadow-[0_0_50px_rgba(220,38,38,0.5)]"
                }`}
              >
                <span className="relative z-10">
                  {product.isSoldOut ? "SOLD OUT" : isAdding ? "ADDING..." : addedSuccess ? "✓ ADDED TO CART" : `ADD TO CART${selectedSize ? ` — ${selectedSize}` : ""}`}
                </span>
                {/* Glass shine */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              </motion.button>

              <motion.button
                onClick={handleWishlist}
                whileTap={{ scale: 0.97 }}
                className={`w-full py-3.5 font-black uppercase tracking-[0.3em] text-sm rounded-xl border transition-all duration-300 backdrop-blur-sm ${
                  wishlisted
                    ? "border-red-600/60 bg-red-600/10 text-red-400"
                    : "border-white/15 bg-white/[0.04] text-white/60 hover:border-white/40 hover:text-white"
                }`}
              >
                {wishlisted ? "♥ SAVED TO WISHLIST" : "♡ ADD TO WISHLIST"}
              </motion.button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2 mt-1">
              {[
                { icon: "🚚", label: "Free Shipping", sub: "Above ₹500" },
                { icon: "🔄", label: "7-Day Return", sub: "Hassle-free" },
                { icon: "💯", label: "Authentic", sub: "Hologram" },
              ].map((b) => (
                <div key={b.label} className="flex flex-col items-center gap-1 py-3 rounded-xl border border-white/8 bg-white/[0.03] backdrop-blur-sm">
                  <span className="text-xl">{b.icon}</span>
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/60 text-center">{b.label}</p>
                  <p className="text-[8px] font-bold text-white/30 text-center">{b.sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ─── Details section ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="border-t border-white/8 pt-16 grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* About + Care */}
          <div className="space-y-8">
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-sm p-8">
              <h2 className="text-lg font-black uppercase tracking-[0.3em] mb-5 flex items-center gap-3">
                <span className="w-5 h-px bg-red-600 inline-block" />
                About This Drop
              </h2>
              <p className="text-sm leading-relaxed text-white/60 font-bold uppercase tracking-wide">
                {product.description ||
                  "HEAVYWEIGHT COTTON BLEND. RELAXED DROPPED SHOULDER FIT. SIGNATURE SYNDICATE WASH. DESIGNED IN THE UNDERGROUND. CRAFTED FOR THE CULTURE."}
              </p>
            </div>

            <div className="rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-sm p-8">
              <h3 className="text-lg font-black uppercase tracking-[0.3em] mb-5 flex items-center gap-3">
                <span className="w-5 h-px bg-red-600 inline-block" />
                Care Instructions
              </h3>
              <ul className="space-y-3">
                {CARE.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/50 font-bold text-xs uppercase tracking-wide">
                    <span className="text-red-600/50 text-xs">★</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Size Guide */}
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-sm p-8">
            <h2 className="text-lg font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
              <span className="w-5 h-px bg-red-600 inline-block" />
              Size Guide
            </h2>
            <div className="overflow-hidden rounded-xl border border-white/8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/8 bg-white/[0.04]">
                    {["Size", "Chest (cm)", "Sleeve (cm)", "Length (cm)"].map((h) => (
                      <th key={h} className="py-3 px-4 text-left text-[10px] font-black uppercase tracking-widest text-white/40">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SIZE_GUIDE.map((row, i) => (
                    <tr
                      key={row.size}
                      className={`border-b border-white/5 transition-colors cursor-pointer hover:bg-white/[0.04] ${
                        selectedSize === row.size ? "bg-red-600/10" : i % 2 === 0 ? "bg-white/[0.02]" : ""
                      }`}
                      onClick={() => setSelectedSize(row.size)}
                    >
                      <td className={`py-4 px-4 font-black text-sm ${selectedSize === row.size ? "text-red-400" : "text-white"}`}>
                        {row.size}
                      </td>
                      <td className="py-4 px-4 text-center font-bold text-white/50 text-sm">{row.chest}</td>
                      <td className="py-4 px-4 text-center font-bold text-white/50 text-sm">{row.sleeve}</td>
                      <td className="py-4 px-4 text-center font-bold text-white/50 text-sm">{row.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest mt-4">
              Click a row to select size above
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
