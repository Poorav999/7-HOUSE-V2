"use client";

import { useCart, type Product } from "./CartContext";

export default function AddToCart({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => {
        addToCart({
          ...product,
          images: product.images || [],
        });
        alert("ADDED TO 7H SYNDICATE BAG 🔥");
      }}
      className="w-full bg-white text-black font-black uppercase tracking-[0.3em] py-6 text-xl hover:bg-red-600 hover:text-white transition-all duration-300"
    >
      Add to Cart
    </button>
  );
}