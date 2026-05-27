import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Product } from "@/components/CartContext";
import ProductPageClient from "@/components/ProductPageClient";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let product: Product | null = null;

  try {
    const raw = await prisma.product.findUnique({ where: { id } });
    if (raw) {
      product = {
        ...raw,
        price: Number(raw.price),
        images: Array.isArray(raw.images) ? (raw.images as string[]) : [],
        isSoldOut: Boolean(raw.isSoldOut),
        description: raw.description ?? null,
        stock: raw.stock ?? undefined,
      } as Product;
    }
  } catch (err) {
    console.error("[ProductPage] DB error:", err);
  }

  if (!product) notFound();

  const rawImg = Array.isArray(product.images) ? product.images[0] : "";
  const imageUrl =
    rawImg
      ? rawImg.startsWith("/") || rawImg.startsWith("http")
        ? rawImg
        : `/${rawImg}`
      : "/shadyblue.jpg";

  return <ProductPageClient product={product} imageUrl={imageUrl} />;
}
