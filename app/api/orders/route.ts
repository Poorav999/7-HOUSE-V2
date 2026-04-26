import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(orders);
  } catch {
    return NextResponse.json({ error: "FAILED_TO_FETCH_MANIFEST" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate required syndicate data
    if (!body.razorpayOrderId) {
      return NextResponse.json({ error: "MISSING_ORDER_ID" }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        razorpayOrderId: body.razorpayOrderId,
        amount: Number(body.amount),
        customerName: body.customerName,
        email: body.email,
        address: body.address,
        items: body.items || {},
        status: "PAID",
      },
    });
    
    return NextResponse.json(order);
  } catch {
    return NextResponse.json({ error: "FAILED_TO_LOG_ORDER" }, { status: 500 });
  }
}