import { prisma } from "@/lib/prisma"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const page = Math.max(1, Number(req.nextUrl.searchParams.get("page")) || 1)
    const pageSize = Math.min(100, Math.max(1, Number(req.nextUrl.searchParams.get("pageSize")) || 20))
    const [returns, total] = await Promise.all([
      prisma.return.findMany({
        include: {
          invoice: { select: { invoiceNo: true } },
          user: { select: { name: true } },
          items: { include: { product: { select: { name: true, nameAr: true } } } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.return.count(),
    ])
    return Response.json({ returns, total, page, pageSize, pages: Math.ceil(total / pageSize) })
  } catch {
    return Response.json({ error: "Failed to fetch returns" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { invoiceId, userId, reason, items } = body

    if (!invoiceId || !userId || !items?.length) {
      return Response.json({ error: "invoiceId, userId, and items are required" }, { status: 400 })
    }

    for (const item of items) {
      if (!item.productId || !item.quantity || item.quantity <= 0) {
        return Response.json({ error: "Each item must have a productId and positive quantity" }, { status: 400 })
      }
    }

    const returnR = await prisma.$transaction(async (tx) => {
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { increment: item.quantity } },
        })
      }

      const total = items.reduce((sum: number, i: any) => sum + Number(i.total), 0)

      return tx.return.create({
        data: {
          invoiceId,
          userId,
          reason,
          total,
          items: {
            create: items.map((i: any) => ({
              productId: i.productId,
              quantity: i.quantity,
              price: i.price,
              total: i.total,
            })),
          },
        },
        include: {
          invoice: { select: { invoiceNo: true } },
          user: { select: { name: true } },
          items: { include: { product: { select: { name: true, nameAr: true } } } },
        },
      })
    })

    return Response.json(returnR)
  } catch (error: any) {
    if (error?.code === "P2025") {
      return Response.json({ error: "One or more products not found" }, { status: 404 })
    }
    console.error("Failed to create return:", error)
    return Response.json({ error: "Failed to create return" }, { status: 500 })
  }
}
