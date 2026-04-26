"use client";

import { useCart, type Product } from "./CartContext";
import { useState } from "react";

export default function AddToCartBtn({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button 
      onClick={handleAdd}
      className={`w-full py-6 font-black uppercase tracking-[0.3em] transition-all duration-300 ${
        added ? "bg-red-600 text-white" : "bg-white text-black hover:bg-red-600 hover:text-white shadow-2xl"
      }`}
    >
      {added ? "DEPLOYED_TO_BAG" : "Acquire_Piece"}
    </button>
  );
}