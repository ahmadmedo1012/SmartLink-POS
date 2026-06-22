import { prisma } from "@/lib/prisma"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const top = req.nextUrl.searchParams.get("top")
    if (top === "true") {
      const topProducts = await prisma.invoiceItem.groupBy({
        by: ["productId"],
        _sum: { quantity: true },
        orderBy: { _sum: { quantity: "desc" } },
        take: 5,
      })
      const productIds = topProducts.map(t => t.productId)
      const products = await prisma.product.findMany({
        where: { id: { in: productIds }, isActive: true },
        include: { category: true },
      })
      const result = topProducts.map(t => ({
        ...products.find(p => p.id === t.productId),
        totalSold: t._sum.quantity,
      })).filter(p => p.id)
      return Response.json({ products: result })
    }
    const search = req.nextUrl.searchParams.get("search") || ""
    const categoryId = req.nextUrl.searchParams.get("categoryId")
    const page = Math.max(1, Number(req.nextUrl.searchParams.get("page")) || 1)
    const pageSize = Math.min(100, Math.max(1, Number(req.nextUrl.searchParams.get("pageSize")) || 20))
    const where: any = { isActive: true }
    if (search) where.OR = [{ name: { contains: search } }, { nameAr: { contains: search } }, { barcode: { contains: search } }]
    if (categoryId) where.categoryId = categoryId
    const [products, total] = await Promise.all([
      prisma.product.findMany({ where, include: { category: true }, orderBy: { name: "asc" }, skip: (page - 1) * pageSize, take: pageSize }),
      prisma.product.count({ where }),
    ])
    return Response.json({ products, total, page, pageSize, pages: Math.ceil(total / pageSize) })
  } catch (error) {
    return Response.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (!body.name || typeof body.name !== "string" || !body.name.trim()) {
      return Response.json({ error: "Name is required" }, { status: 400 })
    }
    if (body.price !== undefined && body.price !== null && isNaN(Number(body.price))) {
      return Response.json({ error: "Price must be a valid number" }, { status: 400 })
    }
    if (body.stock !== undefined && body.stock !== null && isNaN(Number(body.stock))) {
      return Response.json({ error: "Stock must be a valid number" }, { status: 400 })
    }
    const product = await prisma.product.create({ data: body })
    return Response.json(product)
  } catch (error: any) {
    return Response.json({ error: error?.message || "Failed to create product" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, ...data } = body
    if (!id) {
      return Response.json({ error: "Product ID is required" }, { status: 400 })
    }
    if (data.price !== undefined && data.price !== null && isNaN(Number(data.price))) {
      return Response.json({ error: "Price must be a valid number" }, { status: 400 })
    }
    if (data.stock !== undefined && data.stock !== null && isNaN(Number(data.stock))) {
      return Response.json({ error: "Stock must be a valid number" }, { status: 400 })
    }
    const product = await prisma.product.update({ where: { id }, data })
    return Response.json(product)
  } catch (error: any) {
    if (error?.code === "P2025") return Response.json({ error: "Product not found" }, { status: 404 })
    return Response.json({ error: error?.message || "Failed to update product" }, { status: 500 })
  }
}
