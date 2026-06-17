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
      {
        name: "Crimson Dragon Baggy Jeans",
        price: 2999,
        category: "Pants",
        description: "Washed black baggy denim with hand-detailed crimson dragons climbing each leg and 7 HOUSES embroidery at the waist. Heavyweight, wide-leg fit.",
        images: ["/dragon_jeans.png"],
        stock: 14,
      },
      {
        name: "Violet Bloom Eye Jeans",
        price: 2999,
        category: "Pants",
        description: "Black wide-leg denim with surreal violet bloom-eye artwork and 7 HOUSES manifesto print. A statement pair built for the outliers.",
        images: ["/bloom_eye_jeans.png"],
        stock: 12,
      },
      {
        name: "Monochrome Swirl Jeans",
        price: 2799,
        category: "Pants",
        description: "Acid-washed baggy jeans with a hypnotic black-and-bone swirl wash and 7Houses chrome script. Relaxed wide-leg silhouette.",
        images: ["/swirl_jeans.png"],
        stock: 16,
      },
      {
        name: "Phoenix Flame Baggy Jeans",
        price: 3199,
        category: "Pants",
        description: "Washed black baggy denim painted with a rising phoenix and red spider-lily linework, finished with a 7H emblem. Limited statement piece.",
        images: ["/phoenix_jeans.png"],
        stock: 10,
      },
      {
        name: "SVH Spiked Chrome Watch — Azure",
        price: 4999,
        category: "Accessories",
        description: "Sculptural SVH timepiece wrapped in chrome spikes over an electric azure sunburst dial. A wrist-mounted statement from the 7H vault.",
        images: ["/watch_azure.png", "/watch_azure_2.png", "/watch_azure_3.png", "/watch_azure_wrist.png"],
        stock: 8,
      },
      {
        name: "SVH Spiked Chrome Watch — Crimson",
        price: 4999,
        category: "Accessories",
        description: "Sculptural SVH timepiece wrapped in chrome spikes over a deep crimson sunburst dial. Bold, fearless, and unmistakably 7H.",
        images: ["/watch_crimson.png", "/watch_crimson_2.png", "/watch_crimson_wrist.png"],
        stock: 8,
      },
      {
        name: "SVH Spiked Chrome Watch — Venom",
        price: 4999,
        category: "Accessories",
        description: "Sculptural SVH timepiece wrapped in chrome spikes over a toxic green sunburst dial. Venomous luxury for the underground.",
        images: ["/watch_venom.png", "/watch_venom_2.png", "/watch_venom_wrist.png"],
        stock: 8,
      },
      {
        name: "SVH Spiked Chrome Watch — Bullion",
        price: 5299,
        category: "Accessories",
        description: "Sculptural SVH timepiece wrapped in chrome spikes over a warm bullion-gold dial. Quiet money meets sharp edges.",
        images: ["/watch_bullion.png", "/watch_bullion_2.png", "/watch_bullion_wrist.png"],
        stock: 6,
      },
      {
        name: "SVH Spiked Chrome Watch — Obsidian",
        price: 5299,
        category: "Accessories",
        description: "Sculptural SVH timepiece wrapped in blacked-out chrome spikes over a stealth obsidian dial. The darkest drop in the lineup.",
        images: ["/watch_obsidian.png", "/watch_obsidian_2.png", "/watch_obsidian_3.png", "/watch_obsidian_wrist.png"],
        stock: 6,
      },
    ];

    try {
      // Delete existing products and categories
      await prisma.product.deleteMany({});
      await prisma.category.deleteMany({});

      // Create categories first
      const categoryNames = Array.from(new Set(products.map((p) => p.category)));
      const categoryMap: Record<string, string> = {};
      for (const name of categoryNames) {
        const cat = await prisma.category.create({
          data: { name },
        });
        categoryMap[name] = cat.id;
      }

      // Create new products
      const createdProducts = await prisma.product.createMany({
        data: products.map((p) => ({
          name: p.name,
          price: p.price,
          category: p.category,
          categoryId: categoryMap[p.category] || null,
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

    // Ensure the category exists in the Category table
    let categoryId = undefined;
    if (category) {
      let categoryRecord = await prisma.category.findUnique({
        where: { name: category }
      });
      if (!categoryRecord) {
        categoryRecord = await prisma.category.create({
          data: { name: category }
        });
      }
      categoryId = categoryRecord.id;
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        discountPrice: discountPrice ? Number(discountPrice) : null,
        description,
        category,
        categoryId,
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

    // Ensure the category exists in the Category table if category is updated
    let categoryId = undefined;
    if (category) {
      let categoryRecord = await prisma.category.findUnique({
        where: { name: category }
      });
      if (!categoryRecord) {
        categoryRecord = await prisma.category.create({
          data: { name: category }
        });
      }
      categoryId = categoryRecord.id;
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        price: price ? Number(price) : undefined,
        discountPrice: discountPrice ? Number(discountPrice) : null,
        description,
        category,
        categoryId,
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