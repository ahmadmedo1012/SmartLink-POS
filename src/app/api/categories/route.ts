import { prisma } from "@/lib/prisma"
import { NextRequest } from "next/server"

export async function GET() {
  try {
    const categories = await prisma.category.findMany({ include: { _count: { select: { products: true } } }, orderBy: { name: "asc" } })
    return Response.json(categories)
  } catch (error) {
    return Response.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (!body.name || typeof body.name !== "string" || !body.name.trim()) {
      return Response.json({ error: "Name is required" }, { status: 400 })
    }
    const category = await prisma.category.create({ data: body })
    return Response.json(category)
  } catch (error: any) {
    if (error?.code === "P2002") return Response.json({ error: "Category with this name already exists" }, { status: 409 })
    console.error("Failed to create category:", error)
    return Response.json({ error: "Failed to create category" }, { status: 500 })
  }
}
