import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import ProductClientActions from "@/components/ProductClientActions";
import type { Product } from "@/components/CartContext";
import { motion } from "framer-motion";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;

  const product = await prisma.product.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!product) {
    notFound();
  }

  const typedProduct = product as Product;

  let rawImage = Array.isArray(typedProduct.images)
    ? typedProduct.images[0]
    : (typeof typedProduct.images === 'string' ? typedProduct.images : '/fallback.jpg');

  if (rawImage && !rawImage.startsWith('/') && !rawImage.startsWith('http')) {
    rawImage = `/${rawImage}`;
  }

  const imageUrl = rawImage || '/fallback.png';
  
  // Log for debugging (remove in production if needed)
  console.log('Product Image URL:', imageUrl, 'Raw Images:', typedProduct.images);

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-16">
      {/* Decorative background */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-600/10 via-transparent to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/2 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-600/10 via-transparent to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Back Navigation */}
        <div className="mb-12">
          <a 
            href="/shop" 
            className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
          >
            ← BACK TO SHOP
          </a>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          
          {/* Left: Product Image */}
          <div className="flex items-center justify-center">
            <div className="relative w-full aspect-square">
              {/* Background glow effect */}
              <div className="absolute -inset-8 bg-gradient-to-br from-red-600/20 to-cyan-600/20 rounded-3xl blur-3xl opacity-40"></div>
              
              {/* Image container */}
              <div className="relative w-full h-full bg-zinc-900/50 border border-zinc-700 rounded-2xl overflow-hidden backdrop-blur-sm">
                <Image
                  src={imageUrl}
                  alt={typedProduct.name}
                  fill
                  unoptimized
                  className="object-contain p-8"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                
                {/* Corner accent lines */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-red-600/50"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-cyan-600/50"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-cyan-600/50"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-red-600/50"></div>
              </div>
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col gap-8">
            {/* Brand Label */}
            <div>
              <span className="text-xs font-black tracking-[0.3em] uppercase text-zinc-400 mb-3 inline-block px-4 py-2 border border-zinc-700 rounded">
                ⭐ 7HOUSES SYNDICATE
              </span>
              
              {/* Product Name */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none mt-6 break-words">
                {typedProduct.name}
              </h1>
            </div>

            {/* Price Section */}
            <div className="flex items-center gap-6 bg-gradient-to-r from-zinc-900 to-zinc-800 p-6 rounded-lg border border-zinc-700">
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-wide text-zinc-400">Price</span>
                <span className="text-4xl md:text-5xl font-black text-white">
                  ₹{typedProduct.price}
                </span>
              </div>
              <div className="ml-auto bg-red-600/20 border border-red-600/50 text-red-400 font-black text-sm px-4 py-2 rounded">
                LIMITED
              </div>
            </div>

            {/* Quick Features */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-zinc-900 border border-zinc-700 p-3 rounded text-center">
                <p className="text-xs font-black text-zinc-400 uppercase tracking-wide">Material</p>
                <p className="text-sm font-bold text-white mt-1">100% Cotton</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-700 p-3 rounded text-center">
                <p className="text-xs font-black text-zinc-400 uppercase tracking-wide">Status</p>
                <p className="text-sm font-bold text-green-400 mt-1">In Stock</p>
              </div>
            </div>

            {/* Main CTA */}
            <ProductClientActions product={typedProduct} />
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-zinc-800 pt-16">
          
          {/* Left: Description & Specs */}
          <div className="space-y-8">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 flex items-center gap-3">
                <span className="text-cyan-600">✦</span>
                About This Drop
              </h2>
              <p className="text-zinc-300 font-bold text-sm leading-relaxed uppercase tracking-wide">
                {typedProduct.description || "HEAVYWEIGHT COTTON BLEND. RELAXED DROPPED SHOULDER FIT. SIGNATURE SYNDICATE WASH. DESIGNED IN THE UNDERGROUND. ✦ CRAFTED FOR THE CULTURE."}
              </p>
            </div>

            {/* Care Instructions */}
            <div>
              <h3 className="text-xl font-black uppercase tracking-tighter mb-6 flex items-center gap-3">
                <span className="text-red-600">⚡</span>
                Care Instructions
              </h3>
              <ul className="list-none space-y-3">
                {[
                  '100% HEAVYWEIGHT COTTON',
                  'COLD MACHINE WASH INSIDE OUT',
                  'DO NOT TUMBLE DRY',
                  'AVOID IRONING ON PRINTS',
                  'LAY FLAT TO DRY'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-zinc-400 font-bold text-sm uppercase tracking-wide">
                    <span className="text-red-600/60 font-black">★</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Size Guide */}
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 flex items-center gap-3">
              <span className="text-cyan-600">📏</span>
              Size Guide
            </h2>
            
            <div className="bg-zinc-900/30 border border-zinc-700 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-700">
                    <th className="py-4 px-4 font-black text-left text-xs uppercase tracking-wider text-zinc-400">Size</th>
                    <th className="py-4 px-4 font-black text-center text-xs uppercase tracking-wider text-zinc-400">Chest (CM)</th>
                    <th className="py-4 px-4 font-black text-center text-xs uppercase tracking-wider text-zinc-400">Sleeve (CM)</th>
                    <th className="py-4 px-4 font-black text-center text-xs uppercase tracking-wider text-zinc-400">Length (CM)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { size: 'S', chest: '58', sleeve: '60', length: '70' },
                    { size: 'M', chest: '60', sleeve: '62', length: '72' },
                    { size: 'L', chest: '62', sleeve: '64', length: '74' },
                    { size: 'XL', chest: '64', sleeve: '66', length: '76' }
                  ].map((row, idx) => (
                    <tr key={idx} className={`border-b border-zinc-800 ${idx % 2 === 0 ? 'bg-zinc-900/20' : ''}`}>
                      <td className="py-4 px-4 font-black text-white">{row.size}</td>
                      <td className="py-4 px-4 text-center font-bold text-zinc-300">{row.chest}</td>
                      <td className="py-4 px-4 text-center font-bold text-zinc-300">{row.sleeve}</td>
                      <td className="py-4 px-4 text-center font-bold text-zinc-300">{row.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-zinc-900/30 border border-zinc-700 rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">🚚</div>
            <h4 className="font-black uppercase tracking-wider mb-2">Free Shipping</h4>
            <p className="text-sm text-zinc-400 font-bold">On orders above ₹500</p>
          </div>
          <div className="bg-zinc-900/30 border border-zinc-700 rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">🔄</div>
            <h4 className="font-black uppercase tracking-wider mb-2">Easy Returns</h4>
            <p className="text-sm text-zinc-400 font-bold">7 days hassle-free returns</p>
          </div>
          <div className="bg-zinc-900/30 border border-zinc-700 rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">💯</div>
            <h4 className="font-black uppercase tracking-wider mb-2">Authentic</h4>
            <p className="text-sm text-zinc-400 font-bold">100% genuine with hologram</p>
          </div>
        </div>
      </div>
    </main>
  );
}