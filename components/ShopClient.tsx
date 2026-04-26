"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ChevronDown, Filter } from "lucide-react";

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
    if (cat) {
      const match = categories.find(c => c.toLowerCase() === cat.toLowerCase());
      if (match) {
        setSelectedCategory(match);
      }
    }
  }, [searchParams, categories]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category Filter
    if (selectedCategory !== "ALL") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Gender Filter (Mock logic as schema doesn't have gender field, usually categorized in name or category)
    if (selectedGender) {
      result = result.filter((p) => 
        p.name.toLowerCase().includes(selectedGender.toLowerCase()) || 
        p.category.toLowerCase().includes(selectedGender.toLowerCase())
      );
    }

    // Price Range Filter
    if (selectedPriceRanges.length > 0) {
      result = result.filter((p) => {
        const price = p.price;
        return selectedPriceRanges.some((range) => {
          if (range === "<$100") return price < 100;
          if (range === "$101-$200") return price >= 101 && price <= 200;
          if (range === "$201-$300") return price >= 201 && price <= 300;
          if (range === ">$300") return price > 300;
          return true;
        });
      });
    }

    // Sale Filter
    if (onSaleOnly) {
      result = result.filter((p) => p.discountPrice && p.discountPrice < p.price);
    }

    // Status Filter (New Arrivals - last 30 days)
    if (newArrivalsOnly) {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      result = result.filter((p) => p.createdAt && new Date(p.createdAt) > thirtyDaysAgo);
    }

    // Sorting
    if (sortBy === "PRICE: LOW TO HIGH") result.sort((a, b) => a.price - b.price);
    if (sortBy === "PRICE: HIGH TO LOW") result.sort((a, b) => b.price - a.price);
    if (sortBy === "NEWEST") result.sort((a, b) => (b.createdAt ? new Date(b.createdAt).getTime() : 0) - (a.createdAt ? new Date(a.createdAt).getTime() : 0));

    return result;
  }, [products, selectedCategory, selectedGender, selectedPriceRanges, onSaleOnly, newArrivalsOnly, sortBy]);

  const togglePriceRange = (range: string) => {
    setSelectedPriceRanges(prev => 
      prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
    );
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
        <div className="border-t border-b border-white/5 py-4 mb-8 flex items-center">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-widest hover:text-red-500 transition-colors"
          >
            <Filter className={`w-4 h-4 transition-transform ${isFilterOpen ? "rotate-90" : ""}`} />
            FILTERS {isFilterOpen ? "−" : "+"}
          </button>
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
                    <button 
                      onClick={() => setSelectedGender(selectedGender === "MEN" ? null : "MEN")}
                      className={`px-8 py-3 text-[10px] font-black uppercase tracking-widest border transition-all ${selectedGender === "MEN" ? "bg-white text-black border-white" : "border-white/20 hover:border-white"}`}
                    >
                      MEN
                    </button>
                    <button 
                      onClick={() => setSelectedGender(selectedGender === "WOMEN" ? null : "WOMEN")}
                      className={`px-8 py-3 text-[10px] font-black uppercase tracking-widest border transition-all ${selectedGender === "WOMEN" ? "bg-white text-black border-white" : "border-white/20 hover:border-white"}`}
                    >
                      WOMEN
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="flex flex-col gap-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">PRICE</h4>
                  <div className="flex flex-wrap gap-x-6 gap-y-4">
                    {["<$100", "$101-$200", "$201-$300", ">$300"].map((range) => (
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
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div 
                        onClick={() => setOnSaleOnly(!onSaleOnly)}
                        className={`w-4 h-4 border border-white/30 flex items-center justify-center transition-all ${onSaleOnly ? "bg-white border-white" : "group-hover:border-white"}`}
                      >
                        {onSaleOnly && <div className="w-2 h-2 bg-black" />}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#999] group-hover:text-white transition-colors">ON SALE</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div 
                        onClick={() => setNewArrivalsOnly(!newArrivalsOnly)}
                        className={`w-4 h-4 border border-white/30 flex items-center justify-center transition-all ${newArrivalsOnly ? "bg-white border-white" : "group-hover:border-white"}`}
                      >
                        {newArrivalsOnly && <div className="w-2 h-2 bg-black" />}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#999] group-hover:text-white transition-colors">NEW ARRIVALS</span>
                    </label>
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
        </div>        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-x-1 md:gap-y-1">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full py-40 text-center flex flex-col items-center gap-4">
               <span className="text-white/20 font-black uppercase text-4xl tracking-widest">No Items Found</span>
               <button onClick={() => {
                  setSelectedGender(null);
                  setSelectedPriceRanges([]);
                  setOnSaleOnly(false);
                  setNewArrivalsOnly(false);
               }} className="text-red-500 text-[10px] font-bold uppercase tracking-widest hover:underline">Reset All Filters</button>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <motion.div 
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={product.id}
                className="group relative flex flex-col bg-black border border-white/10 overflow-hidden"
              >
                <Link href={`/product/${product.id}`} className="flex flex-col h-full">
                  {/* Image Container */}
                  <div className="relative aspect-square bg-[#0c0c0c] flex items-center justify-center p-12 overflow-hidden border-b border-white/5">
                    {/* Icons */}
                    <div className="absolute top-4 left-4 z-20">
                      <button className="text-white/20 hover:text-red-600 transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
 
                    {/* Sale Tag */}
                    {product.discountPrice && product.discountPrice < product.price && (
                      <div className="absolute top-4 right-4 z-20 bg-red-600 text-white font-black text-[9px] px-2 py-1 uppercase tracking-widest">
                        {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                      </div>
                    )}
 
                    {/* Product Image */}
                    {(() => {
                      const getImageUrl = (src?: string) => {
                        if (!src) return "/shadyblue.jpg";
                        if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:") || src.startsWith("/")) {
                          return src;
                        }
                        return `/${src}`;
                      };
                      const imageSrc = getImageUrl(product.images[0]);
                      
                      return (
                        <div className="relative w-full h-full transform transition-transform duration-700 group-hover:scale-110">
                          <Image
                            src={imageSrc}
                            alt={product.name}
                            fill
                            unoptimized
                            className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                          />
                        </div>
                      );
                    })()}
                  </div>
 
                  {/* Info */}
                  <div className="flex flex-col p-6 gap-6 bg-black group-hover:bg-zinc-950 transition-colors">
                    <h3 className="font-black text-xs uppercase tracking-wider text-white group-hover:text-red-600 transition-colors line-clamp-2 leading-tight min-h-[2rem]">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        {product.discountPrice ? (
                          <div className="flex flex-col gap-1">
                            <span className="text-sm font-black tracking-tight text-white">${product.discountPrice.toFixed(2)}</span>
                            <span className="text-[10px] text-white/30 line-through font-bold">${product.price.toFixed(2)}</span>
                          </div>
                        ) : (
                          <span className="text-sm font-black tracking-tight text-white">${product.price.toFixed(2)}</span>
                        )}
                      </div>
                      
                      {product.isSoldOut && (
                        <span className="text-[10px] font-black uppercase text-red-600 border border-red-600 px-2 py-0.5">SOLD OUT</span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
