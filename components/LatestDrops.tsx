import Link from "next/link";
import Image from "next/image";
import { prisma } from "../lib/prisma";

// Notice we added 'async' here because we have to wait for the database to respond
export default async function LatestDrops() {
  
  // FETCH REAL DATA: Grab the 4 most recently added products from PostgreSQL
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc', // 'desc' means newest first
    },
    take: 4, // Only grab 4 to fit nicely in the carousel
  });

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500 mb-2">latest</h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Drops</h3>
        </div>
        <Link href="/shop" className="hidden md:block text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition">
          View All
        </Link>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scroll-smooth" style={{ scrollbarWidth: 'none' }}>
        
        {/* If the database is empty, show a message */}
        {products.length === 0 ? (
          <p className="text-gray-500 italic">More drops coming soon...</p>
        ) : (
          /* Map through your REAL database products */
          products.map((product) => (
            <Link 
              href={`/product/${product.id}`} 
              key={product.id} 
              className="min-w-[280px] md:min-w-[320px] snap-start group block cursor-pointer"
            >
              
              <div className="relative h-[400px] w-full bg-gray-100 overflow-hidden mb-4">
                <Image 
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover w-full h-full group-hover:scale-105 transition duration-500"
                />
                
                {/* Show Sale badge if you gave it a discount price */}
                {product.discountPrice && (
                  <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                    Sale
                  </div>
                )}
              </div>

              <h4 className="text-lg font-bold mb-1 group-hover:underline decoration-2 underline-offset-4">
                {product.name}
              </h4>
              
              <div className="flex items-center gap-3">
                <span className="text-black font-medium">${product.price.toFixed(2)}</span>
                {product.discountPrice && (
                  <span className="text-gray-400 line-through text-sm">${product.discountPrice.toFixed(2)}</span>
                )}
              </div>

            </Link>
          ))
        )}
      </div>

    </section>
  );
}