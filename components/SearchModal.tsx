"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  category?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    setIsLoading(true);
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]))
      .finally(() => setIsLoading(false));
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const results = query.trim().length < 1
    ? products.slice(0, 8)
    : products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          (p.category ?? "").toLowerCase().includes(query.toLowerCase())
      );

  const getImageSrc = (img?: string) => {
    if (!img) return "/shadyblue.jpg";
    if (img.startsWith("http") || img.startsWith("/")) return img;
    return `/${img}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex flex-col bg-black/95 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full border-b border-white/10 px-6 md:px-12 py-6 flex items-center gap-6"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 shrink-0">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH PRODUCTS..."
              className="flex-1 bg-transparent text-white text-xl md:text-2xl font-black uppercase tracking-widest outline-none placeholder:text-white/20"
            />
            <button
              onClick={onClose}
              className="text-white/40 hover:text-white transition-colors font-black text-sm uppercase tracking-widest"
            >
              ESC
            </button>
          </motion.div>

          <div className="flex-1 overflow-y-auto px-6 md:px-12 py-8">
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-[3/4] bg-white/5 animate-pulse rounded" />
                ))}
              </div>
            ) : results.length === 0 ? (
              <p className="text-white/30 font-black uppercase tracking-widest text-center mt-20">
                No results for &quot;{query}&quot;
              </p>
            ) : (
              <>
                {query.trim().length < 1 && (
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-6">
                    All Products
                  </p>
                )}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      onClick={onClose}
                      className="group flex flex-col border border-white/10 hover:border-red-600/60 transition-colors overflow-hidden"
                    >
                      <div className="relative aspect-[3/4] bg-[#0c0c0c] overflow-hidden">
                        <Image
                          src={getImageSrc(product.images?.[0])}
                          alt={product.name}
                          fill
                          unoptimized
                          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-3 bg-[#0a0a0a]">
                        <p className="text-[11px] font-black uppercase tracking-wider text-white group-hover:text-red-500 transition-colors line-clamp-1">
                          {product.name}
                        </p>
                        <p className="text-[11px] font-bold text-white/50 mt-1">
                          ₹{product.price.toLocaleString()}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
