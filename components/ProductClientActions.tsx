"use client";

import { useState } from "react";
import { useCart } from "@/components/CartContext";
import type { Product } from "@/components/CartContext";
import { motion } from "framer-motion";

export default function ProductClientActions({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);

    const sizes = ["S", "M", "L", "XL"];

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("⚡ PLEASE SELECT A SIZE!");
            return;
        }

        setIsAdding(true);
        setTimeout(() => {
            for (let i = 0; i < quantity; i++) {
                addToCart({
                    ...product,
                    name: `${product.name} (SIZE: ${selectedSize})`,
                });
            }

            alert(`✦ ADDED ${quantity}x ${product.name} TO CART!`);
            setIsAdding(false);
        }, 500);
    };

    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Size Selector */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-zinc-300 uppercase tracking-wider">Select Size</span>
                    <span className="text-cyan-600 text-lg">✦</span>
                </div>
                <div className="grid grid-cols-4 gap-3">
                    {sizes.map((size) => (
                        <motion.button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.92 }}
                            className={`py-3 px-2 font-black text-lg transition-all border border-zinc-700 rounded ${
                                selectedSize === size
                                    ? "bg-gradient-to-br from-red-600 to-cyan-600 text-white border-red-600"
                                    : "bg-zinc-900 text-white hover:bg-zinc-800 border-zinc-600"
                            }`}
                        >
                            {size}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex gap-4 w-full">
                {/* Quantity Selector */}
                <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded shrink-0 overflow-hidden">
                    <motion.button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-14 h-14 flex items-center justify-center text-red-600 hover:bg-zinc-800 transition-colors text-2xl font-black"
                    >
                        −
                    </motion.button>
                    <div className="w-16 text-center font-black text-xl select-none text-white bg-zinc-800 border-l border-r border-zinc-700">
                        {quantity}
                    </div>
                    <motion.button
                        onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-14 h-14 flex items-center justify-center text-cyan-600 hover:bg-zinc-800 transition-colors text-2xl font-black"
                    >
                        +
                    </motion.button>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    whileHover={!isAdding ? { scale: 1.05 } : {}}
                    whileTap={!isAdding ? { scale: 0.95 } : {}}
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black uppercase text-lg tracking-wider transition-all border border-red-700 rounded disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    <motion.span
                        animate={isAdding ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        {isAdding ? "🎉" : "★"}
                    </motion.span>
                    {selectedSize ? `ADD TO CART (${quantity})` : "SELECT SIZE"}
                </motion.button>
            </div>

            {/* Total Price */}
            <div className="flex items-center justify-between bg-zinc-900 border border-zinc-700 p-4 rounded gap-4">
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Total Price</span>
                    <span className="text-3xl font-black text-white">
                        ₹{product.price * quantity}
                    </span>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-black text-red-600">LIMITED</div>
                    <p className="text-xs font-bold text-zinc-400 uppercase">Stock</p>
                </div>
            </div>

            {/* Trust Badges */}
            <div className="flex gap-2 flex-wrap justify-center bg-zinc-900 border border-zinc-700 rounded p-3">
                <span className="text-xs font-bold uppercase text-zinc-400 flex items-center gap-1">✓ Secured</span>
                <span className="text-xs font-bold uppercase text-zinc-400 flex items-center gap-1">✓ 7 Days Return</span>
                <span className="text-xs font-bold uppercase text-zinc-400 flex items-center gap-1">✓ Authentic</span>
            </div>
        </div>
    );
}
