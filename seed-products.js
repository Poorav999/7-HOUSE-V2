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
];

async function main() {
  console.log('🌱 Starting to seed products...');
  
  try {
    // Clear existing products
    await prisma.product.deleteMany({});
    console.log('✓ Cleared existing products');

    // Create products
    for (const product of products) {
      const created = await prisma.product.create({
        data: {
          name: product.name,
          price: product.price,
          category: product.category,
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
