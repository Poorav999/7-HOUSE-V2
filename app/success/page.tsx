"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import { useEffect } from "react";
import { useCart } from "@/components/CartContext";

export default function SuccessPage() {
  const { setCartItems } = useCart();

  useEffect(() => {
    localStorage.removeItem("7h_cart");
    if (setCartItems) setCartItems([]);
  }, [setCartItems]);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center pt-32 px-6">
      <Reveal>
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-black font-syncopate uppercase tracking-tighter mb-4 text-red-600">
            CONFIRMED
          </h1>
          <p className="text-zinc-500 font-bold uppercase tracking-[0.5em] mb-12">
            / Order_Processed_By_Syndicate //
          </p>
          <div className="bg-zinc-900 border border-zinc-800 p-8 mb-12 max-w-md mx-auto">
            <p className="text-xs font-bold uppercase leading-relaxed tracking-widest text-zinc-400">
              Your manifest has been logged into the 7H database. A transmission containing your tracking intel will be dispatched to your email shortly.
            </p>
          </div>
          <Link 
            href="/" 
            className="bg-white text-black px-12 py-4 font-black uppercase tracking-[0.3em] hover:bg-red-600 hover:text-white transition-all duration-300"
          >
            Return to Base
          </Link>
        </div>
      </Reveal>
    </main>
  );
}