"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/CartContext";

export default function Header() {
  const pathname = usePathname();
  const { cartItems, isLoaded } = useCart();
  const cartCount = isLoaded ? cartItems.length : 0;

  return (
    <header className="fixed top-0 left-0 w-full z-[100] bg-mc-cobblestone border-b-4 border-mc-oak">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
        
        {/* LEFT: 7H Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="7H Logo"
              width={96}
              height={96}
              className="object-contain w-24 h-24 transition-transform hover:scale-110 active:scale-95 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              priority
            />
          </Link>
        </div>

        {/* CENTER: Pixelated Hotbar Navigation */}
        <nav className="flex items-center gap-2">
          <HotbarLink 
            href="/shop" 
            isActive={pathname === "/shop"}
            icon="⛏️"
            label="SHOP"
          />
          <HotbarLink 
            href="/wishlist" 
            isActive={pathname === "/wishlist"}
            icon="❤️"
            label="WISH LIST"
          />
          <HotbarLink 
            href="/cart" 
            isActive={pathname === "/cart"}
            icon="📦"
            label="CART"
            badge={cartCount}
          />
        </nav>

        {/* RIGHT: Spacer for balance */}
        <div className="flex-shrink-0 w-24" />
      </div>
    </header>
  );
}

interface HotbarLinkProps {
  href: string;
  isActive: boolean;
  icon: string;
  label: string;
  badge?: number;
}

function HotbarLink({ href, isActive, icon, label, badge }: HotbarLinkProps) {
  return (
    <Link
      href={href}
      className={`
        relative inline-flex items-center gap-2 px-4 py-2 border-3 transition-all duration-200
        ${isActive 
          ? "bg-mc-diamond text-mc-cobblestone border-mc-diamond-dark shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),0_4px_0_rgba(0,0,0,0.2)]" 
          : "bg-mc-oak text-mc-sand border-mc-oak-dark hover:bg-mc-oak-light hover:border-mc-oak shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_3px_0_rgba(0,0,0,0.2)]"
        }
        active:translate-y-1 active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.4),0_1px_0_rgba(0,0,0,0.1)]
        font-minecraft text-xs md:text-sm uppercase tracking-wider whitespace-nowrap
        select-none
      `}
    >
      {/* Block Icon */}
      <span className="text-lg md:text-xl leading-none">{icon}</span>
      
      {/* Label */}
      <span className="hidden sm:inline">{label}</span>
      
      {/* Badge (for cart count) */}
      {badge !== undefined && badge > 0 && (
        <span className={`
          absolute -top-3 -right-3 w-6 h-6 flex items-center justify-center
          font-minecraft text-xs font-bold
          ${isActive 
            ? "bg-mc-grass text-mc-cobblestone border-2 border-mc-grass" 
            : "bg-mc-gold text-mc-cobblestone border-2 border-mc-gold"
          }
        `}>
          {badge}
        </span>
      )}
    </Link>
  );
}
