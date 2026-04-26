import { Truck, RefreshCcw, ShieldCheck, Headphones } from "lucide-react";

// We store the features in an array so it is easy to update later
const features = [
  {
    icon: <Truck className="w-8 h-8 mb-4 text-black" strokeWidth={1.5} />,
    title: "Fast Shipping",
    description: "Get your order delivered quickly, straight to your door. 3-5 business days.",
  },
  {
    icon: <RefreshCcw className="w-8 h-8 mb-4 text-black" strokeWidth={1.5} />,
    title: "Easy Returns",
    description: "Return your items hassle-free. Our flexible policy makes it simple. 7 days from delivery.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 mb-4 text-black" strokeWidth={1.5} />,
    title: "Secure Payments",
    description: "Pay for your order with confidence. Your details are always protected with bank-grade SSL.",
  },
  {
    icon: <Headphones className="w-8 h-8 mb-4 text-black" strokeWidth={1.5} />,
    title: "Customer Support",
    description: "Get the help you need, fast. Our dedicated team is here for you. hello@7h.example",
  },
];

export default function Why7H() {
  return (
    <section className="bg-white py-20 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500 mb-2">why</h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">7H?</h3>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-start p-8 bg-gray-50 hover:bg-gray-100 transition duration-300 border border-gray-100"
            >
              {feature.icon}
              <h4 className="text-lg font-black uppercase tracking-wider mb-3">{feature.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}