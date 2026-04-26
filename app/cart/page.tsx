"use client";

import { useCart } from "@/components/CartContext";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    Razorpay: RazorpayConstructor;
  }
}

type RazorpayConstructor = new (options: RazorpayOptions) => RazorpayInstance;

interface RazorpayOptions {
  key: string | undefined;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: () => void;
  theme: {
    color: string;
  };
}

interface RazorpayInstance {
  open(): void;
}

export default function CartPage() {
  const { cartItems, removeFromCart, cartTotal, isLoaded } = useCart();
  const router = useRouter();

  const initializeRazorpay = () => {
    return new Promise<boolean>((resolve) => {
      if (typeof window === "undefined") return resolve(false);

      const existingScript = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );

      if (existingScript) {
        return resolve(true);
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    try {
      if (cartTotal === 0) {
        alert("Your bag is empty.");
        return;
      }

      const res = await initializeRazorpay();

      if (!res) {
        alert("Razorpay failed to load.");
        return;
      }

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: cartTotal }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to create order");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: cartTotal * 100,
        currency: "INR",
        name: "7HOUSES",
        description: "Syndicate Exclusive Drop",
        order_id: data.orderId,
        handler: function () {
          router.push("/success");
        },
        theme: {
          color: "#dc2626",
        },
      };

      if (typeof window !== "undefined" && window.Razorpay) {
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Checkout failed. Check console (F12).");
    }
  };

  if (!isLoaded) return null;

  return (
    <main className="min-h-screen pt-32 px-6 lg:px-20 max-w-7xl mx-auto text-white">
      <Reveal>
        <h1 className="text-5xl font-black font-syncopate uppercase tracking-tighter mb-12">
          YOUR_BAG
        </h1>
      </Reveal>

      {cartItems.length === 0 ? (
        <Reveal>
          <div className="border border-zinc-800 bg-zinc-900/50 p-12 text-center">
            <p className="text-zinc-500 font-bold uppercase tracking-widest mb-6">
              NO_INTEL_FOUND
            </p>
            <Link
              href="/shop"
              className="bg-white text-black px-8 py-3 font-black uppercase hover:bg-red-600 hover:text-white transition-all"
            >
              Return to Shop
            </Link>
          </div>
        </Reveal>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item, index) => (
              <Reveal key={`${item.id}-${index}`}>
                <div className="flex gap-6 border border-zinc-800 bg-zinc-900/30 p-4 relative group">
                  <div className="relative w-24 h-32 shrink-0 bg-zinc-900 border border-zinc-800 overflow-hidden">
                    <Image
                      src={
                        item.images && item.images.length > 0
                          ? item.images[0]
                          : "/shadyblue.jpg"
                      }
                      alt={item.name}
                      fill
                      unoptimized
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>

                  <div className="flex flex-col justify-between py-2">
                    <div>
                      <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] mb-1">
                        / {item.category}
                      </p>
                      <h3 className="text-xl font-black uppercase tracking-tighter">
                        {item.name}
                      </h3>
                    </div>
                    <p className="font-syncopate font-bold text-lg">
                      ₹{item.price}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-4 right-4 text-zinc-600 hover:text-red-600 uppercase text-xs font-bold tracking-widest transition-colors"
                  >
                    [REMOVE]
                  </button>
                </div>
              </Reveal>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-1">
            <Reveal>
              <div className="border border-zinc-800 bg-zinc-900/30 p-8 sticky top-32">
                <h3 className="text-xl font-black font-syncopate uppercase tracking-tighter mb-6 border-b border-zinc-800 pb-4">
                  SUMMARY
                </h3>

                <div className="flex justify-between items-center mb-4 text-sm font-bold uppercase tracking-widest text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-white">₹{cartTotal}</span>
                </div>

                <div className="flex justify-between items-center mb-8 text-sm font-bold uppercase tracking-widest text-zinc-400">
                  <span>Shipping</span>
                  <span className="text-white">CALCULATED_LATER</span>
                </div>

                <div className="flex justify-between items-center mb-8 pt-4 border-t border-zinc-800">
                  <span className="font-black font-syncopate uppercase tracking-tighter">
                    TOTAL
                  </span>
                  <span className="font-black font-syncopate text-2xl text-red-600">
                    ₹{cartTotal}
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-white text-black py-4 font-black uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all"
                >
                  INITIALIZE_CHECKOUT
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      )}
    </main>
  );
}