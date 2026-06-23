import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const product = await prisma.product.findUnique({ where: { id }, include: { category: true } })
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 })
    return Response.json(product)
  } catch (error) {
    return Response.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()
    if (body.price !== undefined && body.price !== null && isNaN(Number(body.price))) {
      return Response.json({ error: "Price must be a valid number" }, { status: 400 })
    }
    if (body.stock !== undefined && body.stock !== null && isNaN(Number(body.stock))) {
      return Response.json({ error: "Stock must be a valid number" }, { status: 400 })
    }
    const product = await prisma.product.update({ where: { id }, data: body })
    return Response.json(product)
  } catch (error: any) {
    if (error?.code === "P2025") return Response.json({ error: "Product not found" }, { status: 404 })
    return Response.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const existing = await prisma.product.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: "Product not found" }, { status: 404 })
    const product = await prisma.product.update({ where: { id }, data: { isActive: false } })
    return Response.json(product)
  } catch (error: any) {
    if (error?.code === "P2025") return Response.json({ error: "Product not found" }, { status: 404 })
    return Response.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
