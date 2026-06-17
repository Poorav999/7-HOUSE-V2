"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Filter } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { useWishlist } from "@/components/WishlistContext";

interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number | null;
  images: string[];
  isSoldOut: boolean;
  category: string;
  createdAt?: string | Date;
}

interface ShopClientProps {
  products: Product[];
  categories: string[];
}

const SIZES = ["S", "M", "L", "XL"];

function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [addedSize, setAddedSize] = useState<string | null>(null);

  const wishlisted = isInWishlist(product.id);

  const getImageUrl = (src?: string) => {
    if (!src) return "/shadyblue.jpg";
    if (src.startsWith("http") || src.startsWith("https") || src.startsWith("data:") || src.startsWith("/")) return src;
    return `/${src}`;
  };

  const imageSrc = getImageUrl(product.images[0]);
  const isOnSale = !!(product.discountPrice && product.discountPrice < product.price);
  const discountPct = isOnSale
    ? Math.round(((product.price - product.discountPrice!) / product.price) * 100)
    : 0;
  const displayPrice = isOnSale ? product.discountPrice! : product.price;

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (wishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product as Parameters<typeof addToWishlist>[0]);
    }
  };

  const handleQuickAdd = (e: React.MouseEvent, size: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.isSoldOut) return;
    addToCart({ ...product, name: `${product.name} (SIZE: ${size})` } as Parameters<typeof addToCart>[0]);
    setAddedSize(size);
    setTimeout(() => setAddedSize(null), 1400);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="group relative flex flex-col bg-white/[0.02] backdrop-blur-sm border border-white/8 hover:border-red-600/40 hover:bg-white/[0.04] transition-all duration-300 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
    >
      <Link href={`/product/${product.id}`} className="flex flex-col h-full">
        {/* Image Container */}
        <div className="relative aspect-[3/4] bg-black/60 backdrop-blur-sm overflow-hidden">
          {/* Wishlist heart */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 left-3 z-30 p-1.5 rounded-full bg-black/60 backdrop-blur-sm transition-all duration-200 hover:scale-110"
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill={wishlisted ? "#ef4444" : "none"}
              stroke={wishlisted ? "#ef4444" : "rgba(255,255,255,0.5)"}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
          </button>

          {/* Badges */}
          <div className="absolute top-3 right-3 z-30 flex flex-col gap-1.5 items-end">
            {isOnSale && (
              <span className="bg-red-600 text-white font-black text-[9px] px-2 py-0.5 uppercase tracking-widest rounded-sm">
                -{discountPct}%
              </span>
            )}
            {product.isSoldOut && (
              <span className="bg-black/80 text-white/60 font-black text-[9px] px-2 py-0.5 uppercase tracking-widest border border-white/20 rounded-sm">
                SOLD OUT
              </span>
            )}
          </div>

          {/* Product image */}
          <div className="relative w-full h-full transition-transform duration-700 group-hover:scale-105">
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              unoptimized
              className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
            />
          </div>

          {/* Quick-add overlay — slides up on hover */}
          {!product.isSoldOut && (
            <div className="absolute inset-x-0 bottom-0 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
              <div className="bg-black/90 backdrop-blur-sm border-t border-white/10 p-3">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 mb-2 text-center">
                  Quick Add
                </p>
                <div className="flex gap-1.5 justify-center">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={(e) => handleQuickAdd(e, size)}
                      className={`min-w-[36px] px-2 py-1.5 text-[10px] font-black uppercase tracking-wider border transition-all duration-150 ${
                        addedSize === size
                          ? "bg-red-600 border-red-600 text-white"
                          : "border-white/30 text-white hover:border-white hover:bg-white hover:text-black"
                      }`}
                    >
                      {addedSize === size ? "✓" : size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col p-4 gap-3 bg-black/80 backdrop-blur-sm group-hover:bg-white/[0.04] transition-colors">
          {/* Category tag */}
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30">
            {product.category}
          </span>

          <h3 className="font-black text-xs uppercase tracking-wider text-white group-hover:text-red-500 transition-colors line-clamp-2 leading-tight">
            {product.name}
          </h3>

          <div className="flex items-end justify-between mt-auto">
            <div className="flex flex-col">
              <span className="text-base font-black tracking-tight text-white">
                ₹{displayPrice.toLocaleString()}
              </span>
              {isOnSale && (
                <span className="text-[10px] text-white/30 line-through font-bold">
                  ₹{product.price.toLocaleString()}
                </span>
              )}
            </div>
            {isOnSale && (
              <span className="text-[9px] font-black text-green-400 uppercase tracking-wider">
                Save ₹{(product.price - product.discountPrice!).toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ShopClient({ products, categories }: ShopClientProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [newArrivalsOnly, setNewArrivalsOnly] = useState(false);
  const [sortBy, setSortBy] = useState("RELEVANCE");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const searchParams = useSearchParams();

  useEffect(() => {
    const cat = searchParams.get("category");
    const status = searchParams.get("status");
    const t = setTimeout(() => {
      if (cat) {
        const match = categories.find((c) => c.toLowerCase() === cat.toLowerCase());
        if (match) setSelectedCategory(match);
      }
      if (status === "sale") setOnSaleOnly(true);
      if (status === "new") setNewArrivalsOnly(true);
    }, 0);
    return () => clearTimeout(t);
  }, [searchParams, categories]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "ALL") {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (selectedGender) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(selectedGender.toLowerCase()) ||
          p.category.toLowerCase().includes(selectedGender.toLowerCase())
      );
    }
    if (selectedPriceRanges.length > 0) {
      result = result.filter((p) => {
        const price = p.price;
        return selectedPriceRanges.some((range) => {
          if (range === "<₹1000") return price < 1000;
          if (range === "₹1000–₹2000") return price >= 1000 && price <= 2000;
          if (range === "₹2000–₹3000") return price > 2000 && price <= 3000;
          if (range === ">₹3000") return price > 3000;
          return true;
        });
      });
    }
    if (onSaleOnly) {
      result = result.filter((p) => p.discountPrice && p.discountPrice < p.price);
    }
    if (newArrivalsOnly) {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      result = result.filter((p) => p.createdAt && new Date(p.createdAt) > thirtyDaysAgo);
    }
    if (sortBy === "PRICE: LOW TO HIGH") result.sort((a, b) => a.price - b.price);
    if (sortBy === "PRICE: HIGH TO LOW") result.sort((a, b) => b.price - a.price);
    if (sortBy === "NEWEST")
      result.sort(
        (a, b) =>
          (b.createdAt ? new Date(b.createdAt).getTime() : 0) -
          (a.createdAt ? new Date(a.createdAt).getTime() : 0)
      );

    return result;
  }, [products, selectedCategory, selectedGender, selectedPriceRanges, onSaleOnly, newArrivalsOnly, sortBy]);

  const togglePriceRange = (range: string) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  const resetFilters = () => {
    setSelectedGender(null);
    setSelectedPriceRanges([]);
    setOnSaleOnly(false);
    setNewArrivalsOnly(false);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-600 selection:text-white pb-20">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 pt-32">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <h1 className="flex items-end gap-3">
            <span className="font-serif italic lowercase font-normal text-3xl md:text-5xl tracking-tight">shop</span>
            <span className="font-black uppercase text-red-600 text-3xl md:text-5xl tracking-tighter">{selectedCategory}</span>
          </h1>

          <div className="relative group">
            <button className="bg-transparent border border-white/20 px-6 py-2 flex items-center gap-10 text-[10px] md:text-xs font-black uppercase tracking-widest hover:border-white transition-all">
              PRODUCT TYPE
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute top-full right-0 mt-2 bg-[#111] border border-white/10 p-2 min-w-[200px] z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <button
                onClick={() => setSelectedCategory("ALL")}
                className={`w-full text-left px-4 py-2 hover:bg-white/5 text-[10px] uppercase tracking-widest font-bold ${selectedCategory === "ALL" ? "text-red-500" : ""}`}
              >
                ALL
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-4 py-2 hover:bg-white/5 text-[10px] uppercase tracking-widest font-bold ${selectedCategory === cat ? "text-red-500" : ""}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filters Toggle Bar */}
        <div className="border-t border-b border-white/5 py-4 mb-8 flex items-center justify-between">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-widest hover:text-red-500 transition-colors"
          >
            <Filter className={`w-4 h-4 transition-transform ${isFilterOpen ? "rotate-90" : ""}`} />
            FILTERS {isFilterOpen ? "−" : "+"}
          </button>
          <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
            {filteredProducts.length} ITEM{filteredProducts.length !== 1 ? "S" : ""}
          </span>
        </div>

        {/* Expandable Filters Section */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-b border-white/5 mb-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-10 px-2">
                {/* Gender */}
                <div className="flex flex-col gap-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">GENDER</h4>
                  <div className="flex gap-2">
                    {["MEN", "WOMEN"].map((g) => (
                      <button
                        key={g}
                        onClick={() => setSelectedGender(selectedGender === g ? null : g)}
                        className={`px-8 py-3 text-[10px] font-black uppercase tracking-widest border transition-all ${selectedGender === g ? "bg-white text-black border-white" : "border-white/20 hover:border-white"}`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="flex flex-col gap-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">PRICE</h4>
                  <div className="flex flex-wrap gap-x-6 gap-y-4">
                    {["<₹1000", "₹1000–₹2000", "₹2000–₹3000", ">₹3000"].map((range) => (
                      <label key={range} className="flex items-center gap-3 cursor-pointer group">
                        <div
                          onClick={() => togglePriceRange(range)}
                          className={`w-4 h-4 border border-white/30 flex items-center justify-center transition-all ${selectedPriceRanges.includes(range) ? "bg-white border-white" : "group-hover:border-white"}`}
                        >
                          {selectedPriceRanges.includes(range) && <div className="w-2 h-2 bg-black" />}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div className="flex flex-col gap-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">STATUS</h4>
                  <div className="flex flex-col gap-4">
                    {[
                      { label: "ON SALE", value: onSaleOnly, toggle: () => setOnSaleOnly(!onSaleOnly) },
                      { label: "NEW ARRIVALS", value: newArrivalsOnly, toggle: () => setNewArrivalsOnly(!newArrivalsOnly) },
                    ].map(({ label, value, toggle }) => (
                      <label key={label} className="flex items-center gap-3 cursor-pointer group">
                        <div
                          onClick={toggle}
                          className={`w-4 h-4 border border-white/30 flex items-center justify-center transition-all ${value ? "bg-white border-white" : "group-hover:border-white"}`}
                        >
                          {value && <div className="w-2 h-2 bg-black" />}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#999] group-hover:text-white transition-colors">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sorting Bar */}
        <div className="flex flex-col gap-2 mb-10 w-fit">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">SORT BY</span>
          <div className="relative group">
            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest group-hover:text-red-500 transition-colors">
              {sortBy} <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute top-full left-0 mt-2 bg-[#111] border border-white/10 p-2 min-w-[200px] z-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              {["RELEVANCE", "NEWEST", "PRICE: LOW TO HIGH", "PRICE: HIGH TO LOW"].map((option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={`w-full text-left px-4 py-2 hover:bg-white/5 text-[10px] uppercase tracking-widest font-bold ${sortBy === option ? "text-red-500" : ""}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/5">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full bg-black py-40 text-center flex flex-col items-center gap-4">
              <span className="text-white/20 font-black uppercase text-4xl tracking-widest">No Items Found</span>
              <button
                onClick={resetFilters}
                className="text-red-500 text-[10px] font-bold uppercase tracking-widest hover:underline"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
