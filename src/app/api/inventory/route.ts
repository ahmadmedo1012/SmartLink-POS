import { prisma } from "@/lib/prisma"
import { NextRequest } from "next/server"

export async function GET() {
  try {
    const [allActive, totalProducts, activeProducts, outOfStock] = await Promise.all([
      prisma.product.findMany({
        where: { isActive: true },
        include: { category: true },
        orderBy: { stock: "asc" },
      }),
      prisma.product.count(),
      prisma.product.count({ where: { isActive: true } }),
      prisma.product.count({ where: { stock: 0 } }),
    ])
    const lowStock = allActive.filter((p) => p.stock <= p.minStock)
    return Response.json({ lowStock, totalProducts, activeProducts, outOfStock })
  } catch (error) {
    return Response.json({ error: "Failed to fetch inventory" }, { status: 500 })
  }
}
