import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const seed = searchParams.get("seed");

  // Seed all products endpoint
  if (seed === "true") {
    const products = [
      {
        name: "Green Hoodie",
        price: 1999,
        category: "Hoodies",
        description: "Premium heavyweight green hoodie with signature syndicate wash. Perfect for the underground culture.",
        images: ["/Greenhoodie.png"],
        stock: 30,
      },
      {
        name: "Grey Hoodie",
        price: 1999,
        category: "Hoodies",
        description: "Comfortable grey hoodie with dropped shoulder fit. 100% cotton blend for maximum comfort.",
        images: ["/Greyhoodie.png"],
        stock: 35,
      },
      {
        name: "Purple Hoodie",
        price: 1999,
        category: "Hoodies",
        description: "Bold purple hoodie designed for the 7HOUSES syndicate. Limited edition colorway.",
        images: ["/Purplehoodie.png"],
        stock: 25,
      },
      {
        name: "Red Hoodie",
        price: 1999,
        category: "Hoodies",
        description: "Iconic red hoodie with premium construction. Part of the exclusive syndicate collection.",
        images: ["/Redhoodie.png"],
        stock: 28,
      },
      {
        name: "White Hoodie",
        price: 1999,
        category: "Hoodies",
        description: "Clean white hoodie perfect for layering. Premium quality with reinforced stitching.",
        images: ["/Whitehoodie.png"],
        stock: 32,
      },
      {
        name: "Chrome 7Houses Blue Hoodie",
        price: 2499,
        category: "Hoodies",
        description: "Exclusive chrome design with 7Houses logo in blue. Premium limited edition hoodie.",
        images: ["/SVN_Hoodie_Chrome7Houses_Blue.png"],
        stock: 15,
      },
      {
        name: "Chrome 7Houses Red Hoodie",
        price: 2499,
        category: "Hoodies",
        description: "Exclusive chrome design with 7Houses logo in red. Ultra-premium limited edition.",
        images: ["/SVN_Hoodie_Chrome7Houses_Red.png"],
        stock: 15,
      },
      {
        name: "Lips Logo Black Hoodie",
        price: 2299,
        category: "Hoodies",
        description: "Bold lips logo design on black hoodie. Eye-catching streetwear piece.",
        images: ["/SVN_Hoodie_LipsLogo_Black.png"],
        stock: 20,
      },
      {
        name: "Pink Script Green Hoodie",
        price: 2299,
        category: "Hoodies",
        description: "Unique pink script design on green hoodie. Exclusive syndicate collab.",
        images: ["/SVN_Hoodie_PinkScript_Green.png"],
        stock: 18,
      },
      {
        name: "Snake White Hoodie",
        price: 2299,
        category: "Hoodies",
        description: "Snake motif design on white hoodie. Premium embroidered artwork.",
        images: ["/SVN_Hoodie_Snake_White.png"],
        stock: 22,
      },
      {
        name: "Organic 75 Blue T-Shirt",
        price: 999,
        category: "T-Shirts",
        description: "Organic 75% cotton blend t-shirt in blue. Perfect casual tee for everyday wear.",
        images: ["/SVN_Tshirt_Organic75_Blue.png"],
        stock: 50,
      },
      {
        name: "Organic 75 Green T-Shirt",
        price: 999,
        category: "T-Shirts",
        description: "Organic 75% cotton blend t-shirt in green. Sustainable and comfortable.",
        images: ["/SVN_Tshirt_Organic75_Green.png"],
        stock: 48,
      },
      {
        name: "Organic 75 Pink Ice T-Shirt",
        price: 999,
        category: "T-Shirts",
        description: "Organic 75% cotton blend t-shirt in pink ice. Cool and crisp aesthetic.",
        images: ["/SVN_Tshirt_Organic75_Pink_Ice.png"],
        stock: 45,
      },
      {
        name: "Organic 75 Red T-Shirt",
        price: 999,
        category: "T-Shirts",
        description: "Organic 75% cotton blend t-shirt in red. Bold and vibrant staple piece.",
        images: ["/SVN_Tshirt_Organic75_Red.png"],
        stock: 52,
      },
      {
        name: "Organic 75 White Fusion T-Shirt",
        price: 999,
        category: "T-Shirts",
        description: "Organic 75% cotton blend t-shirt in white fusion. Premium quality basics.",
        images: ["/SVN_Tshirt_Organic75_White_Fusion.png"],
        stock: 55,
      },
      {
        name: "Stripped Shirt",
        price: 1499,
        category: "T-Shirts",
        description: "Classic striped shirt with clean lines. Versatile piece for any occasion.",
        images: ["/Strippedshirt.png"],
        stock: 35,
      },
      {
        name: "Black Limited Edition 7",
        price: 3999,
        category: "Archive",
        description: "Ultra-exclusive black limited edition piece from the 7HOUSES archive. Only 7 made.",
        images: ["/black limited ed 7.png"],
        stock: 2,
      },
    ];

    try {
      // Delete existing products
      await prisma.product.deleteMany({});

      // Create new products
      const createdProducts = await prisma.product.createMany({
        data: products.map((p) => ({
          name: p.name,
          price: p.price,
          category: p.category,
          description: p.description,
          images: p.images,
          stock: p.stock,
          isSoldOut: false,
        })),
      });

      return NextResponse.json({
        success: true,
        message: `✅ Successfully seeded ${createdProducts.count} products!`,
        count: createdProducts.count,
      });
    } catch (error) {
      console.error("Seeding error:", error);
      return NextResponse.json(
        { error: "Failed to seed products", details: String(error) },
        { status: 500 }
      );
    }
  }

  // Normal GET request
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
  } catch {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, price, description, category, stock, image } = body;

    const product = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        description,
        category,
        stock: Number(stock),
        images: [image],
        isSoldOut: false,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}