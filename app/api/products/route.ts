import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const seed = searchParams.get("seed");

  // Seed all products endpoint
  if (seed === "true") {
    const products = [
      {
        name: "Green Syndicate Hoodie",
        price: 1999,
        category: "Hoodies",
        description: "Premium heavyweight green hoodie with signature syndicate wash and green Z/A logo. Perfect for the underground culture.",
        images: ["/Greenhoodie.png"],
        stock: 30,
      },
      {
        name: "Purple Syndicate Hoodie",
        price: 1999,
        category: "Hoodies",
        description: "Bold purple hoodie with pink/purple Z/A logo designed for the 7HOUSES syndicate. Limited edition colorway.",
        images: ["/PurplehoodieOG.png"],
        stock: 25,
      },
      {
        name: "Red Syndicate Hoodie",
        price: 1999,
        category: "Hoodies",
        description: "Iconic red hoodie with gold Z/A logo and premium construction. Part of the exclusive syndicate collection.",
        images: ["/RedhoodieOG.png"],
        stock: 28,
      },
      {
        name: "Cream Floral Syndicate Hoodie",
        price: 1999,
        category: "Hoodies",
        description: "Clean cream hoodie with colorful floral Z/A logo. Premium quality with reinforced stitching.",
        images: ["/Whitehoodie.png"],
        stock: 32,
      },
      {
        name: "Blue Chrome Logo Hoodie",
        price: 2499,
        category: "Hoodies",
        description: "Light blue hoodie featuring a cyan dripping chrome 7Houses logo. Premium limited edition.",
        images: ["/SVN_Hoodie_Chrome7Houses_Blue.png"],
        stock: 15,
      },
      {
        name: "Red Chrome Logo Hoodie",
        price: 2499,
        category: "Hoodies",
        description: "Red hoodie featuring a silver dripping chrome 7Houses logo. Ultra-premium limited edition.",
        images: ["/SVN_Hoodie_Chrome7Houses_Red.png"],
        stock: 15,
      },
      {
        name: "Black SVN Lips Hoodie",
        price: 2299,
        category: "Hoodies",
        description: "Bold red lips and gold SVN HOUSES teeth logo on a black hoodie. Eye-catching streetwear piece.",
        images: ["/SVN_Hoodie_LipsLogo_Black.png"],
        stock: 20,
      },
      {
        name: "Teal Pink Script Hoodie",
        price: 2299,
        category: "Hoodies",
        description: "Unique pink chrome script logo on a teal hoodie. Exclusive syndicate collab.",
        images: ["/SVN_Hoodie_PinkScript_Green.png"],
        stock: 18,
      },
      {
        name: "Cream Snake Logo Hoodie",
        price: 2299,
        category: "Hoodies",
        description: "Intricate black snake and red 7HOUSES text on a cream hoodie. Premium artwork.",
        images: ["/SVN_Hoodie_Snake_White.png"],
        stock: 22,
      },
      {
        name: "Organic 75 Navy T-Shirt",
        price: 999,
        category: "T-Shirts",
        description: "Organic 75% cotton blend t-shirt in navy with a cyan liquid logo. Perfect casual tee for everyday wear.",
        images: ["/SVN_Tshirt_Organic75_Blue.png"],
        stock: 50,
      },
      {
        name: "Organic 75 Olive T-Shirt",
        price: 999,
        category: "T-Shirts",
        description: "Organic 75% cotton blend t-shirt in olive with a green liquid logo. Sustainable and comfortable.",
        images: ["/SVN_Tshirt_Organic75_Green.png"],
        stock: 48,
      },
      {
        name: "Organic 75 Rose T-Shirt",
        price: 999,
        category: "T-Shirts",
        description: "Organic 75% cotton blend t-shirt in rose pink with a light blue liquid logo. Cool and crisp aesthetic.",
        images: ["/SVN_Tshirt_Organic75_Pink_Ice.png"],
        stock: 45,
      },
      {
        name: "Organic 75 Burgundy T-Shirt",
        price: 999,
        category: "T-Shirts",
        description: "Organic 75% cotton blend t-shirt in burgundy with a red liquid logo. Bold and vibrant staple piece.",
        images: ["/SVN_Tshirt_Organic75_Red.png"],
        stock: 52,
      },
      {
        name: "Organic 75 Ice Blue T-Shirt",
        price: 999,
        category: "T-Shirts",
        description: "Organic 75% cotton blend t-shirt in ice blue with an orange liquid logo. Premium quality basics.",
        images: ["/SVN_Tshirt_Organic75_White_Fusion.png"],
        stock: 55,
      },
      {
        name: "Black Limited Edition 7",
        price: 3999,
        category: "Archive",
        description: "Ultra-exclusive black limited edition piece from the 7HOUSES archive. Only 7 made.",
        images: ["/Black_limited_7h.png"],
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