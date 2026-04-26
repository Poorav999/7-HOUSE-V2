import { Dispatch, SetStateAction } from "react";

export interface Product {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  images: string[];
  category: string;
  stock: number;
  isSoldOut: boolean;
}

export interface CartContextType {
  cartItems: Product[];
  isLoaded: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  cartTotal: number;
  setCartItems: Dispatch<SetStateAction<Product[]>>;
}