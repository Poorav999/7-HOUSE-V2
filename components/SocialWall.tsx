import { Instagram, Twitter, Facebook } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    quote: "The materials feel premium and the craftsmanship is excellent. I've worn my shirt countless times and it still looks brand new.",
    author: "@ethan_cole",
    platform: <Twitter size={16} />,
    image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    quote: "Every order I've received has been consistent in quality. The attention to detail is what makes 7H stand out in my wardrobe.",
    author: "@J.walker",
    platform: <Instagram size={16} />,
    image: "https://images.unsplash.com/photo-1512353087810-254cb9859f67?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    quote: "From the moment I unpacked my order, I could tell the craftsmanship was on another level. The hoodie feels built to last.",
    author: "@Chloe_bennett",
    platform: <Facebook size={16} />,
    image: "https://images.unsplash.com/photo-1488161628813-04466f87258a?q=80&w=800&auto=format&fit=crop"
  }
];

export default function SocialWall() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500 mb-2">Social</h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Wall</h3>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 p-6 flex flex-col justify-between hover:-translate-y-2 transition duration-300">
              <div>
                <div className="flex items-center text-gray-400 mb-4">
                  {item.platform}
                </div>
                <p className="text-lg font-medium leading-relaxed mb-6">&quot;{item.quote}&quot;</p>
              </div>
              
              <div className="flex items-center gap-4 mt-auto">
                <Image src={item.image} alt={item.author} width={48} height={48} className="rounded-full object-cover" />
                <span className="font-bold text-sm">{item.author}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}