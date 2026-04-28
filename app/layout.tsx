import type { Metadata } from "next";
import { Space_Grotesk, Syncopate, VT323 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import Footer from "@/components/Footer";
import CurrencyModal from "@/components/CurrencyModal";
import PromoBar from "@/components/PromoBar";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const syncopate = Syncopate({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-syncopate" });
const vt323 = VT323({ weight: "400", subsets: ["latin"], variable: "--font-vt323" });

export const metadata: Metadata = {
  title: "7HOUSES | SYNDICATE",
  description: "Premium editorial streetwear brand — Enter the world of 7H",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${syncopate.variable} ${vt323.variable} antialiased text-white bg-black`}
        suppressHydrationWarning
      >
        <Providers>
          <CurrencyModal />
          <PromoBar />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
