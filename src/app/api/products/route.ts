import { prisma } from "@/lib/prisma"
import { NextRequest } from "next/server"
import { z } from "zod"

const createProductSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  nameAr: z.string().max(200).optional(),
  barcode: z.string().max(100).optional(),
  description: z.string().optional(),
  imageUrl: z.string().max(500).optional(),
  price: z.number().positive("Price must be positive"),
  cost: z.number().nonnegative("Cost must not be negative").optional(),
  stock: z.number().int("Stock must be an integer").nonnegative("Stock must not be negative").optional(),
  minStock: z.number().int("Min stock must be an integer").nonnegative("Min stock must not be negative").optional(),
  categoryId: z.string().optional(),
  isActive: z.boolean().optional(),
})

const updateProductSchema = z.object({
  name: z.string().min(1, "Name is required").max(200).optional(),
  nameAr: z.string().max(200).optional(),
  barcode: z.string().max(100).optional(),
  description: z.string().optional(),
  imageUrl: z.string().max(500).optional(),
  price: z.number().positive("Price must be positive").optional(),
  cost: z.number().nonnegative("Cost must not be negative").optional(),
  stock: z.number().int("Stock must be an integer").nonnegative("Stock must not be negative").optional(),
  minStock: z.number().int("Min stock must be an integer").nonnegative("Min stock must not be negative").optional(),
  categoryId: z.string().optional(),
  isActive: z.boolean().optional(),
})

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
    const parsed = createProductSchema.parse(body)

    if (parsed.barcode) {
      const existing = await prisma.product.findUnique({ where: { barcode: parsed.barcode } })
      if (existing) {
        return Response.json({ error: "Barcode already exists" }, { status: 409 })
      }
    }

    if (parsed.categoryId) {
      const category = await prisma.category.findUnique({ where: { id: parsed.categoryId } })
      if (!category) {
        return Response.json({ error: "Category not found" }, { status: 404 })
      }
    }

    const product = await prisma.product.create({ data: parsed })
    return Response.json(product)
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: "Validation failed", details: error.issues }, { status: 400 })
    }
    console.error("Failed to create product:", error)
    return Response.json({ error: "Failed to create product" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, ...data } = body
    if (!id) {
      return Response.json({ error: "Product ID is required" }, { status: 400 })
    }

    const parsed = updateProductSchema.parse(data)

    if (parsed.barcode) {
      const existing = await prisma.product.findFirst({
        where: { barcode: parsed.barcode, NOT: { id } },
      })
      if (existing) {
        return Response.json({ error: "Barcode already in use by another product" }, { status: 409 })
      }
    }

    if (parsed.categoryId) {
      const category = await prisma.category.findUnique({ where: { id: parsed.categoryId } })
      if (!category) {
        return Response.json({ error: "Category not found" }, { status: 404 })
      }
    }

    const product = await prisma.product.update({ where: { id }, data: parsed })
    return Response.json(product)
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: "Validation failed", details: error.issues }, { status: 400 })
    }
    if (error?.code === "P2025") return Response.json({ error: "Product not found" }, { status: 404 })
    console.error("Failed to update product:", error)
    return Response.json({ error: "Failed to update product" }, { status: 500 })
  }
}
