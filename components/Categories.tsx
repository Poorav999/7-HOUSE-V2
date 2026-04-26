import Link from "next/link";
import Image from "next/image";

// Dummy data for our categories with different grid spans to make it look dynamic
const categories = [
  {
    id: 1,
    name: "Shoes",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop",
    className: "md:col-span-2 md:row-span-2 min-h-[300px] md:min-h-[600px]", 
  },
  {
    id: 2,
    name: "T-Shirts",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
    className: "col-span-1 min-h-[300px]",
  },
  {
    id: 3,
    name: "Hoodies",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop",
    className: "col-span-1 min-h-[300px]",
  },
  {
    id: 4,
    name: "Jackets",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop",
    className: "col-span-1 min-h-[300px]",
  },
  {
    id: 5,
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=800&auto=format&fit=crop",
    className: "col-span-1 min-h-[300px]",
  },
];

export default function Categories() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500 mb-2">Shop by</h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Categories</h3>
          </div>
          <Link href="/shop" className="hidden md:block text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition">
            Shop All
          </Link>
        </div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-min">
          {categories.map((category) => (
            <Link 
              href={`/category/${category.name.toLowerCase()}`} 
              key={category.id} 
              className={`relative group overflow-hidden bg-gray-100 ${category.className}`}
            >
              {/* Background Image */}
              <Image 
                src={category.image} 
                alt={category.name}
                fill
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out"
              />
              
              {/* Dark Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition duration-500"></div>

              {/* Category Name */}
              <div className="absolute bottom-6 left-6">
                <h4 className="text-white text-2xl font-black uppercase tracking-wider">
                  {category.name}
                </h4>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}