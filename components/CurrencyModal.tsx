"use client";

import { useState } from "react";
import Image from "next/image";

const currencies = [
  { name: "United Arab Emirates", code: "AED" },
  { name: "Australia", code: "AUD" },
  { name: "Germany", code: "EUR" },
  { name: "France", code: "EUR" },
  { name: "United Kingdom", code: "GBP" },
  { name: "India", code: "INR" },
  { name: "Japan", code: "JPY" },
  { name: "Singapore", code: "SGD" },
  { name: "United States", code: "USD" },
];

export default function CurrencyModal() {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window === 'undefined') return false;
    const hasSelected = localStorage.getItem("7h_currency_selected");
    return !hasSelected;
  });
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [hoveredCurrency, setHoveredCurrency] = useState("AED");

  const handleSelect = (code: string) => {
    setSelectedCurrency(code);
    localStorage.setItem("7h_currency_selected", "true");
    setIsOpen(false); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-[2px] p-4">
      <div className="w-full max-w-[340px] bg-white flex flex-col font-sans shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-[#222]">
        
        {/* Header */}
        <div className="bg-[#111] text-white flex justify-between items-center px-4 py-3">
          <h2 className="text-[14px] font-bold tracking-[0.05em] uppercase">Select Your Currency</h2>
          <button onClick={() => setIsOpen(false)} className="text-white hover:text-red-500 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Image Section */}
        <div className="relative h-[180px] w-full overflow-hidden border-b-2 border-[#fffbea]">
          <Image 
            src="/hero-cartoon.png" 
            alt="Landscape" 
            fill 
            className="object-cover filter contrast-125 saturate-150"
            sizes="340px"
          />
          {/* Glitch Overlay Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none" />
          <div className="absolute top-[20%] left-0 right-0 h-[10px] bg-white/20 backdrop-blur-sm -translate-x-4 mix-blend-overlay" />
          <div className="absolute top-[60%] left-0 right-0 h-[20px] bg-green-500/20 backdrop-blur-sm translate-x-4 mix-blend-overlay" />
          <div className="absolute top-[80%] left-0 right-0 h-[5px] bg-red-500/20 backdrop-blur-sm -translate-x-2 mix-blend-overlay" />
        </div>

        {/* Selected Currency Row (Simulating Dropdown Header) */}
        <div className="bg-[#fcfaeb] text-[#e02020] flex justify-between items-center px-4 py-3 cursor-pointer border-b border-black/5">
           <span className="font-black text-[15px] uppercase tracking-wide">
             {currencies.find(c => c.code === selectedCurrency)?.name || "United States"}
           </span>
           <span className="flex items-center gap-1 font-black text-[15px]">
             ({selectedCurrency}) 
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5">
               <path d="m6 9 6 6 6-6"/>
             </svg>
           </span>
        </div>

        {/* Dropdown List */}
        <div className="flex flex-col bg-white overflow-hidden py-1">
           {currencies.map(currency => (
             <button 
               key={currency.name}
               onClick={() => handleSelect(currency.code)}
               onMouseEnter={() => setHoveredCurrency(currency.code)}
               className={`w-full text-left px-3 py-1.5 text-[14px] transition-colors font-medium border-l-[3px]
               ${hoveredCurrency === currency.code 
                  ? "bg-[#2563eb] text-white border-[#2563eb]" 
                  : "bg-white text-black border-transparent hover:border-black/10"
               }`}
             >
               {currency.name} ({currency.code})
             </button>
           ))}
        </div>

      </div>
    </div>
  );
}
