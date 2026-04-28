"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  description?: string;
  category: string;
  stock: number;
  images: string[];
  isSoldOut: boolean;
  createdAt: string;
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [view, setView] = useState<"list" | "add">("list");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discountPrice: "",
    description: "",
    category: "Hoodies",
    stock: "10",
    images: ["/shadyblue.jpg"],
    isSoldOut: false,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [editData, setEditData] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          discountPrice: formData.discountPrice ? Number(formData.discountPrice) : null,
          stock: Number(formData.stock),
        }),
      });

      if (res.ok) {
        alert("✅ Product added successfully!");
        setFormData({
          name: "",
          price: "",
          discountPrice: "",
          description: "",
          category: "Hoodies",
          stock: "10",
          images: ["/shadyblue.jpg"],
          isSoldOut: false,
        });
        setView("list");
        fetchProducts();
      }
    } catch (error) {
      alert("❌ Failed to add product");
    }
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editData) return;

    try {
      const res = await fetch(`/api/products?id=${editData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editData.name,
          price: editData.price,
          discountPrice: editData.discountPrice || null,
          description: editData.description,
          category: editData.category,
          stock: editData.stock,
          images: editData.images,
          isSoldOut: editData.isSoldOut,
        }),
      });

      if (res.ok) {
        alert("✅ Product updated successfully!");
        setEditingId(null);
        setEditData(null);
        fetchProducts();
      }
    } catch (error) {
      alert("❌ Failed to update product");
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`⚠️ Delete "${name}"? This action cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("✅ Product deleted!");
        fetchProducts();
      }
    } catch (error) {
      alert("❌ Failed to delete product");
    }
  };

  const handleSeedProducts = async () => {
    if (!confirm("⚠️ This will REPLACE ALL products. Continue?")) return;

    try {
      const res = await fetch("/api/products?seed=true");
      const data = await res.json();
      if (data.success) {
        alert(`✅ ${data.message}`);
        fetchProducts();
      }
    } catch {
      alert("❌ Seed failed");
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-xl font-bold">Loading inventory...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-2">
              <span className="text-red-600">ADMIN</span> VAULT
            </h1>
            <p className="text-zinc-400 font-bold">Control all products, prices & availability</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setView("list")}
              className={`px-6 py-3 font-black uppercase tracking-wider transition-all ${
                view === "list"
                  ? "bg-red-600 text-white"
                  : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
              }`}
            >
              📋 Inventory
            </button>
            <button
              onClick={() => setView("add")}
              className={`px-6 py-3 font-black uppercase tracking-wider transition-all ${
                view === "add"
                  ? "bg-red-600 text-white"
                  : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
              }`}
            >
              ➕ Add New
            </button>
          </div>
        </div>

        {/* Add/Edit Product Form */}
        {view === "add" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900/50 border-2 border-zinc-800 p-8 rounded mb-12"
          >
            <h2 className="text-3xl font-black uppercase mb-6">Add New Drop</h2>
            <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">Product Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-black border border-zinc-700 text-white p-3 focus:border-red-600 outline-none"
                  placeholder="e.g., Black Chrome Logo Hoodie"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">Category *</label>
                <input
                  type="text"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-black border border-zinc-700 text-white p-3 focus:border-red-600 outline-none"
                  placeholder="e.g., Hoodies, T-Shirts"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">Price (₹) *</label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full bg-black border border-zinc-700 text-white p-3 focus:border-red-600 outline-none"
                  placeholder="1999"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">Discount Price (₹)</label>
                <input
                  type="number"
                  value={formData.discountPrice}
                  onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
                  className="w-full bg-black border border-zinc-700 text-white p-3 focus:border-red-600 outline-none"
                  placeholder="Optional"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">Stock *</label>
                <input
                  type="number"
                  required
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full bg-black border border-zinc-700 text-white p-3 focus:border-red-600 outline-none"
                  placeholder="50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">Image URL *</label>
                <input
                  type="text"
                  value={formData.images[0]}
                  onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                  className="w-full bg-black border border-zinc-700 text-white p-3 focus:border-red-600 outline-none"
                  placeholder="/product-image.png"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-black border border-zinc-700 text-white p-3 focus:border-red-600 outline-none resize-none"
                  rows={4}
                  placeholder="Product description..."
                />
              </div>

              <div className="md:col-span-2 flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 font-black uppercase tracking-wider transition-all"
                >
                  Deploy Drop
                </button>
                <button
                  type="button"
                  onClick={() => setView("list")}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-4 font-black uppercase tracking-wider transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Inventory List */}
        {view === "list" && (
          <div>
            {/* Controls */}
            <div className="mb-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-3 pl-10 focus:border-red-600 outline-none"
                />
                <span className="absolute left-3 top-3 text-zinc-500">🔍</span>
              </div>
              <button
                onClick={handleSeedProducts}
                className="bg-green-700 hover:bg-green-600 text-white px-6 py-3 font-black uppercase tracking-wider transition-all whitespace-nowrap"
              >
                🌱 Seed All
              </button>
            </div>

            <p className="text-zinc-400 font-bold mb-6">
              Total: <span className="text-red-600">{filteredProducts.length}</span> products
            </p>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 gap-6">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  className="bg-zinc-900/50 border border-zinc-800 p-6 rounded hover:border-red-600 transition-all"
                >
                  {editingId === product.id && editData ? (
                    // Edit Mode
                    <form onSubmit={handleUpdateProduct} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input
                          type="text"
                          value={editData.name}
                          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                          className="md:col-span-2 bg-black border border-zinc-700 text-white p-2 focus:border-red-600 outline-none"
                          placeholder="Product name"
                        />
                        <input
                          type="number"
                          value={editData.price}
                          onChange={(e) => setEditData({ ...editData, price: Number(e.target.value) })}
                          className="bg-black border border-zinc-700 text-white p-2 focus:border-red-600 outline-none"
                          placeholder="Price"
                        />
                        <input
                          type="number"
                          value={editData.stock}
                          onChange={(e) => setEditData({ ...editData, stock: Number(e.target.value) })}
                          className="bg-black border border-zinc-700 text-white p-2 focus:border-red-600 outline-none"
                          placeholder="Stock"
                        />
                      </div>

                      <textarea
                        value={editData.description || ""}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                        className="w-full bg-black border border-zinc-700 text-white p-2 focus:border-red-600 outline-none resize-none"
                        rows={3}
                        placeholder="Description"
                      />

                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editData.isSoldOut}
                            onChange={(e) => setEditData({ ...editData, isSoldOut: e.target.checked })}
                            className="w-4 h-4 cursor-pointer"
                          />
                          <span className="text-sm font-bold uppercase">Sold Out</span>
                        </label>
                      </div>

                      <div className="flex gap-3">
                        <button
                          type="submit"
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 font-bold uppercase transition-all"
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(null);
                            setEditData(null);
                          }}
                          className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white py-2 font-bold uppercase transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    // View Mode
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      {/* Image */}
                      <div className="w-32 h-40 relative flex-shrink-0 bg-black rounded overflow-hidden">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-black uppercase tracking-tight mb-2">
                              {product.name}
                            </h3>
                            <p className="text-xs font-bold uppercase text-zinc-500 mb-3">
                              {product.category}
                            </p>
                            <p className="text-sm text-zinc-400 mb-4 max-w-md">
                              {product.description}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            {product.isSoldOut && (
                              <span className="bg-red-600 text-white text-xs font-black px-3 py-1 uppercase">
                                SOLD OUT
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-6 bg-black/50 p-4 rounded">
                          <div>
                            <p className="text-xs text-zinc-500 uppercase font-bold">Price</p>
                            <p className="text-2xl font-black text-green-400">₹{product.price}</p>
                          </div>
                          <div>
                            <p className="text-xs text-zinc-500 uppercase font-bold">Stock</p>
                            <p className={`text-2xl font-black ${product.stock > 10 ? "text-blue-400" : "text-orange-400"}`}>
                              {product.stock}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-zinc-500 uppercase font-bold">Added</p>
                            <p className="text-sm text-zinc-400">
                              {new Date(product.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                          <button
                            onClick={() => {
                              setEditingId(product.id);
                              setEditData(product);
                            }}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 font-bold uppercase transition-all"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id, product.name)}
                            className="flex-1 bg-red-700 hover:bg-red-800 text-white py-2 font-bold uppercase transition-all"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-zinc-500 font-bold uppercase">No products found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
