import { prisma } from "../../../lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type Props = {
  params: Promise<{ name: string }>;
};

export default async function CategoryPage({ params }: Props) {
  // 1. Get the category name from the URL (e.g., "hoodies")
  const resolvedParams = await params;
  const urlCategoryName = decodeURIComponent(resolvedParams.name);

  // 2. Ask the database to find this category (ignoring uppercase/lowercase)
  const category = await prisma.category.findFirst({
    where: {
      name: {
        equals: urlCategoryName,
        mode: "insensitive", // Matches "Hoodies" even if URL is "hoodies"
      },
    },
    include: {
      products: {
        orderBy: {
          createdAt: "desc", // Newest products first
        },
        include: {
          Category: true, // Bring the category info for the cards
        }
      },
    },
  });

  // 3. If the category doesn't exist in the database, show 404
  if (!category) {
    return notFound();
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">

      {/* Back to Shop Button */}
      <div className="mb-8">
        <Link href="/shop" className="text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-black transition">
          ← Back to All Drops
        </Link>
      </div>

      {/* Page Header */}
      <div className="mb-16">
        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4">
          {category.name}
        </h1>
        <p className="text-gray-500 uppercase tracking-widest text-sm">
          {category.products.length} {category.products.length === 1 ? 'Item' : 'Items'}
        </p>
      </div>

      {/* Product Grid */}
      {category.products.length === 0 ? (
        <div className="text-gray-500 py-10 border-t border-gray-200">
          <p>No products in this category yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
          {category.products.map((product) => (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="group block cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] w-full bg-gray-100 overflow-hidden mb-4">
                <Image
                  src={!product.images?.[0] ? "/shadyblue.jpg" : (product.images[0].startsWith("http") || product.images[0].startsWith("/") ? product.images[0] : `/${product.images[0]}`)}
                  alt={product.name}
                  fill
                  className="object-cover w-full h-full group-hover:scale-105 transition duration-500"
                />

                {product.discountPrice && (
                  <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                    Sale
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                  {product.Category?.name}
                </span>
                <h4 className="text-lg font-bold mb-1 group-hover:underline decoration-2 underline-offset-4">
                  {product.name}
                </h4>

                <div className="flex items-center gap-3">
                  <span className="text-black font-medium">${product.price.toFixed(2)}</span>
                  {product.discountPrice && (
                    <span className="text-gray-400 line-through text-sm">${product.discountPrice.toFixed(2)}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}