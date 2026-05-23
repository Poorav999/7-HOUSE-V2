import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const seed = searchParams.get("seed");

  // Seed all products endpoint
  if (seed === "true") {
    const products = [
      {
        name: "White Syndicate Hoodie",
        price: 1999,
        category: "Hoodies",
        description: "Clean white heavyweight hoodie with signature 7H branding. A wardrobe essential.",
        images: ["/white_hoodie.png"],
        stock: 32,
      },
      {
        name: "Blue Gradient Hoodie",
        price: 2499,
        category: "Hoodies",
        description: "Stunning blue gradient hoodie with premium heavyweight construction. Limited edition colorway.",
        images: ["/blueGradint_hoodie.png"],
        stock: 15,
      },
      {
        name: "Black Syndicate Hoodie",
        price: 2299,
        category: "Hoodies",
        description: "Bold black heavyweight hoodie with 7H signature branding. The ultimate streetwear staple.",
        images: ["/black_hoodie.png"],
        stock: 20,
      },
      {
        name: "Pink Syndicate Hoodie",
        price: 2299,
        category: "Hoodies",
        description: "Statement pink hoodie with 7H chrome script. Bold colorway for the fearless.",
        images: ["/pink_hoodie.png"],
        stock: 18,
      },
      {
        name: "Cyan Syndicate Hoodie",
        price: 2299,
        category: "Hoodies",
        description: "Vibrant cyan hoodie with premium construction. A head-turning drop from the 7H vault.",
        images: ["/cyan_hoodie.png"],
        stock: 22,
      },
      {
        name: "Brown Syndicate Hoodie",
        price: 2299,
        category: "Hoodies",
        description: "Rich brown heavyweight hoodie with 7H branding. Earthy tones meet underground culture.",
        images: ["/brown_hoodie.png"],
        stock: 20,
      },
      {
        name: "Sky Blue Syndicate Hoodie",
        price: 2299,
        category: "Hoodies",
        description: "Fresh sky blue hoodie with 7H signature. Light, clean, and undeniably premium.",
        images: ["/skyblue_hoodie.png"],
        stock: 18,
      },
      {
        name: "7H Blue T-Shirt",
        price: 999,
        category: "T-Shirts",
        description: "Organic 75% cotton blend tee in blue with 7H signature branding. Perfect casual wear for everyday.",
        images: ["/7H_Blue_tshirt.png"],
        stock: 50,
      },
      {
        name: "7H Green T-Shirt",
        price: 999,
        category: "T-Shirts",
        description: "Organic 75% cotton blend tee in green with 7H signature branding. Sustainable and comfortable.",
        images: ["/7H_green_tshirt.png"],
        stock: 48,
      },
      {
        name: "7H Pink T-Shirt",
        price: 999,
        category: "T-Shirts",
        description: "Organic 75% cotton blend tee in pink with 7H signature branding. Cool and crisp aesthetic.",
        images: ["/7H_pink_tshirt.png"],
        stock: 45,
      },
      {
        name: "7H Red T-Shirt",
        price: 999,
        category: "T-Shirts",
        description: "Organic 75% cotton blend tee in red with 7H signature branding. Bold and vibrant staple piece.",
        images: ["/7H_red_tshirt.png"],
        stock: 52,
      },
      {
        name: "7H White T-Shirt",
        price: 999,
        category: "T-Shirts",
        description: "Organic 75% cotton blend tee in white with 7H signature branding. The essential clean base layer.",
        images: ["/7H_white_tshirt.png"],
        stock: 55,
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
    const { name, price, discountPrice, description, category, stock, image, images } = body;

    const product = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        discountPrice: discountPrice ? Number(discountPrice) : null,
        description,
        category,
        stock: Number(stock),
        images: images || [image],
        isSoldOut: false,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }

    const body = await req.json();
    const { name, price, discountPrice, description, category, stock, images, isSoldOut } = body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        price: price ? Number(price) : undefined,
        discountPrice: discountPrice ? Number(discountPrice) : null,
        description,
        category,
        stock: stock !== undefined ? Number(stock) : undefined,
        images: images && images.length > 0 ? images : undefined,
        isSoldOut: isSoldOut !== undefined ? isSoldOut : undefined,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}