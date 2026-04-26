import { prisma } from "@/lib/prisma";
import ShopClient from "@/components/ShopClient";

export const revalidate = 0;

interface ProductData {
  id: string;
  name: string;
  price: number;
  description?: string | null;
  category?: string;
  stock?: number;
  images: string[];
  isSoldOut?: boolean;
  createdAt: string;
  discountPrice?: number | null;
}

export default async function ShopPage() {
  let products: ProductData[] = [];
  let categories: string[] = [];

  try {
    const rawProducts = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    
    // @ts-ignore - rawProducts from prisma might have slight differences in property optionality
    products = rawProducts.map((p: any) => ({
      ...p,
      createdAt: p.createdAt instanceof Date ? p.createdAt.toISOString() : p.createdAt,
      price: Number(p.price),
      discountPrice: p.discountPrice ? Number(p.discountPrice) : null,
      isSoldOut: Boolean(p.isSoldOut),
    }));

    const rawCategories = await prisma.category.findMany();
    categories = rawCategories.map(c => c.name);

  } catch (error) {
    console.error("Database connection error:", error);
  }

  return (
    <ShopClient 
      products={products as any} 
      categories={categories} 
    />
  );
}