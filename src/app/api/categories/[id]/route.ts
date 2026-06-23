import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const category = await prisma.category.findUnique({ where: { id } })
    if (!category) return NextResponse.json({ error: "Category not found" }, { status: 404 })
    return Response.json(category)
  } catch (error) {
    return Response.json({ error: "Failed to fetch category" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()
    const category = await prisma.category.update({ where: { id }, data: body })
    return Response.json(category)
  } catch (error: any) {
    if (error?.code === "P2025") return Response.json({ error: "Category not found" }, { status: 404 })
    if (error?.code === "P2002") return Response.json({ error: "Category with this name already exists" }, { status: 409 })
    return Response.json({ error: "Failed to update category" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const existing = await prisma.category.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: "Category not found" }, { status: 404 })
    const productCount = await prisma.product.count({ where: { categoryId: id, isActive: true } })
    if (productCount > 0) {
      return NextResponse.json({ error: "Cannot delete category with active products. Remove or reassign products first." }, { status: 409 })
    }
    await prisma.category.delete({ where: { id } })
    return Response.json({ success: true })
  } catch (error: any) {
    if (error?.code === "P2025") return Response.json({ error: "Category not found" }, { status: 404 })
    return Response.json({ error: "Failed to delete category" }, { status: 500 })
  }
}
