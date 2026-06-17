/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

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

async function main() {
  console.log('🌱 Starting to seed products...');
  
  try {
    // Clear existing products and categories
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});
    console.log('✓ Cleared existing products and categories');

    // Create Categories first
    const categoryNames = [...new Set(products.map(p => p.category))];
    const categoryMap = {};
    for (const name of categoryNames) {
      const cat = await prisma.category.create({
        data: { name }
      });
      categoryMap[name] = cat.id;
      console.log(`✓ Created Category: ${name}`);
    }

    // Create products
    for (const product of products) {
      const created = await prisma.product.create({
        data: {
          name: product.name,
          price: product.price,
          category: product.category,
          categoryId: categoryMap[product.category],
          description: product.description,
          images: product.images,
          stock: product.stock,
          isSoldOut: false,
        },
      });
      console.log(`✓ Created: ${created.name}`);
    }

    console.log('✅ Seeding completed successfully!');
    console.log(`📦 Total products added: ${products.length}`);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
