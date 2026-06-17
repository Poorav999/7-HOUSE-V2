"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Currency {
  name: string;
  code: string;
}

const currencies: Currency[] = [
  { name: "India", code: "INR" },
  { name: "United States", code: "USD" },
  { name: "United Kingdom", code: "GBP" },
  { name: "Germany", code: "EUR" },
  { name: "France", code: "EUR" },
  { name: "United Arab Emirates", code: "AED" },
  { name: "Australia", code: "AUD" },
  { name: "Japan", code: "JPY" },
  { name: "Singapore", code: "SGD" },
];

const DEFAULT_CURRENCY = currencies[0]; // India / INR — store prices are in ₹

export default function CurrencyModal() {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    return !localStorage.getItem("7h_currency_selected");
  });
  // Track the full selection by name so the two EUR rows stay distinct.
  // Restore a previously saved currency on first render.
  const [selected, setSelected] = useState<Currency>(() => {
    if (typeof window === "undefined") return DEFAULT_CURRENCY;
    const savedName = localStorage.getItem("7h_currency_name");
    return currencies.find((c) => c.name === savedName) ?? DEFAULT_CURRENCY;
  });
  const [hoveredName, setHoveredName] = useState<string>(() => selected.name);

  // Allow re-opening the picker from anywhere (e.g. the footer currency button).
  useEffect(() => {
    const open = () => setIsOpen(true);
    window.addEventListener("7h:open-currency", open);
    return () => window.removeEventListener("7h:open-currency", open);
  }, []);

  const handleSelect = (currency: Currency) => {
    setSelected(currency);
    setHoveredName(currency.name);
    localStorage.setItem("7h_currency_selected", "true");
    localStorage.setItem("7h_currency_name", currency.name);
    localStorage.setItem("7h_currency_code", currency.code);
    window.dispatchEvent(new CustomEvent("7h:currency-changed", { detail: currency }));
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
             {selected.name}
           </span>
           <span className="flex items-center gap-1 font-black text-[15px]">
             ({selected.code})
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
               onClick={() => handleSelect(currency)}
               onMouseEnter={() => setHoveredName(currency.name)}
               className={`flex w-full items-center justify-between px-3 py-1.5 text-[14px] transition-colors font-medium border-l-[3px]
               ${hoveredName === currency.name
                  ? "bg-[#2563eb] text-white border-[#2563eb]"
                  : "bg-white text-black border-transparent hover:border-black/10"
               }`}
             >
               <span>{currency.name} ({currency.code})</span>
               {selected.name === currency.name && (
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                   <polyline points="20 6 9 17 4 12" />
                 </svg>
               )}
             </button>
           ))}
        </div>

      </div>
    </div>
  );
}
