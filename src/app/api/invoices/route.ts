import { prisma } from "@/lib/prisma"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const page = Math.max(1, Number(req.nextUrl.searchParams.get("page")) || 1)
    const pageSize = Math.min(100, Math.max(1, Number(req.nextUrl.searchParams.get("pageSize")) || 20))
    const [invoices, total] = await Promise.all([
      prisma.invoice.findMany({
        include: { user: { select: { name: true } }, customer: { select: { name: true } }, items: { include: { product: { select: { name: true, nameAr: true } } } } },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize, take: pageSize,
      }),
      prisma.invoice.count(),
    ])
    return Response.json({ invoices, total, page, pageSize, pages: Math.ceil(total / pageSize) })
  } catch (error) {
    return Response.json({ error: "Failed to fetch invoices" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { items, ...invoiceData } = body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return Response.json({ error: "At least one item is required" }, { status: 400 })
    }
    for (let i = 0; i < items.length; i++) {
      if (!items[i].productId) {
        return Response.json({ error: `Item ${i + 1}: productId is required` }, { status: 400 })
      }
      if (items[i].quantity === undefined || items[i].quantity === null || isNaN(Number(items[i].quantity)) || Number(items[i].quantity) <= 0) {
        return Response.json({ error: `Item ${i + 1}: valid quantity is required` }, { status: 400 })
      }
    }

    const invoice = await prisma.$transaction(async (tx) => {
      for (const item of items) {
        const product = await tx.product.findUniqueOrThrow({ where: { id: item.productId }, select: { stock: true } })
        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for product ${item.productId}: available ${product.stock}, requested ${item.quantity}`)
        }
        await tx.product.update({ where: { id: item.productId }, data: { stock: { decrement: item.quantity } } })
      }
      return tx.invoice.create({
        data: { ...invoiceData, items: { create: items } },
        include: { items: { include: { product: { select: { name: true, nameAr: true } } } } },
      })
    })
    return Response.json(invoice)
  } catch (error: any) {
    if (error?.code === "P2025") return Response.json({ error: "One or more products not found" }, { status: 404 })
    console.error("Failed to create invoice:", error)
    return Response.json({ error: "Failed to create invoice" }, { status: 500 })
  }
}
