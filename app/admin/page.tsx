"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

export default function AdminPage() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "T-SHIRT",
    stock: "10",
    image: "/shadyblue.jpg",
  });
  const [loading, setLoading] = useState(false);
  const [seedLoading, setSeedLoading] = useState(false);
  const [seedResult, setSeedResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Drop Added to Vault!");
        setFormData({ ...formData, name: "", price: "", description: "" });
      } else {
        alert("Upload failed.");
      }
    } catch {
      alert("Connection error.");
    } finally {
      setLoading(false);
    }
  };

  const handleSeed = async () => {
    if (!window.confirm("⚠️ This will replace ALL existing products. Continue?")) {
      return;
    }

    setSeedLoading(true);
    try {
      const res = await fetch("/api/products?seed=true");
      const data = await res.json();
      setSeedResult(data);
      if (data.success) {
        alert(`✅ ${data.message}`);
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      alert("Error seeding products: " + String(error));
    } finally {
      setSeedLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 lg:px-20 max-w-3xl mx-auto text-white">
      <Reveal>
        <h1 className="text-5xl font-black font-syncopate uppercase tracking-tighter mb-12">
          SYNDICATE_ADMIN
        </h1>
      </Reveal>

      {/* Seed Products Section */}
      <Reveal>
        <div className="mb-16 p-8 bg-gradient-to-br from-green-900/20 to-transparent border border-green-700 rounded">
          <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 text-green-300">
            🌱 BULK SEED PRODUCTS
          </h2>
          <p className="text-zinc-300 font-bold text-sm mb-4">
            Quickly add all 17 clothing items from public folder to database.
          </p>
          <button
            onClick={handleSeed}
            disabled={seedLoading}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 disabled:opacity-50 text-white font-black uppercase tracking-widest py-4 rounded transition-all mb-4"
          >
            {seedLoading ? "SEEDING..." : "SEED ALL 17 PRODUCTS"}
          </button>

          {seedResult && (
            <div className={`p-4 rounded border text-sm ${seedResult.success ? 'bg-green-900/40 border-green-600' : 'bg-red-900/40 border-red-600'}`}>
              <p className={seedResult.success ? 'text-green-300 font-bold' : 'text-red-300 font-bold'}>
                {seedResult.message || seedResult.error}
              </p>
              {seedResult.count && (
                <p className="text-zinc-300 mt-2">
                  ✓ Total products added: {seedResult.count}
                </p>
              )}
            </div>
          )}
        </div>
      </Reveal>

      {/* Manual Add Product Section */}
      <Reveal>
        <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">ADD SINGLE DROP</h2>
      </Reveal>

      <Reveal>
        <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900/50 p-8 border border-zinc-800">
          <div>
            <label className="block text-zinc-500 font-bold uppercase tracking-widest text-xs mb-2">Product Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-black border border-zinc-800 text-white p-3 focus:border-red-600 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-zinc-500 font-bold uppercase tracking-widest text-xs mb-2">Price (₹)</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-black border border-zinc-800 text-white p-3 focus:border-red-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-zinc-500 font-bold uppercase tracking-widest text-xs mb-2">Stock</label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full bg-black border border-zinc-800 text-white p-3 focus:border-red-600 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-zinc-500 font-bold uppercase tracking-widest text-xs mb-2">Category</label>
            <input
              type="text"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-black border border-zinc-800 text-white p-3 focus:border-red-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-zinc-500 font-bold uppercase tracking-widest text-xs mb-2">Image Filename (e.g., /shadyblue.jpg)</label>
            <input
              type="text"
              required
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full bg-black border border-zinc-800 text-white p-3 focus:border-red-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-zinc-500 font-bold uppercase tracking-widest text-xs mb-2">Description</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-black border border-zinc-800 text-white p-3 focus:border-red-600 outline-none resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-4 font-black uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all disabled:opacity-50"
          >
            {loading ? "UPLOADING..." : "DEPLOY DROP"}
          </button>
        </form>
      </Reveal>
    </main>
  );
}