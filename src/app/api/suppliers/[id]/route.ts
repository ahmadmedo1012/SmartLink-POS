import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supplier = await prisma.supplier.findUnique({ where: { id } })
    if (!supplier) return NextResponse.json({ error: "Supplier not found" }, { status: 404 })
    return Response.json(supplier)
  } catch (error) {
    return Response.json({ error: "Failed to fetch supplier" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()
    const supplier = await prisma.supplier.update({ where: { id }, data: body })
    return Response.json(supplier)
  } catch (error: any) {
    if (error?.code === "P2025") return Response.json({ error: "Supplier not found" }, { status: 404 })
    return Response.json({ error: "Failed to update supplier" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const existing = await prisma.supplier.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: "Supplier not found" }, { status: 404 })
    await prisma.supplier.delete({ where: { id } })
    return Response.json({ success: true })
  } catch (error: any) {
    if (error?.code === "P2025") return Response.json({ error: "Supplier not found" }, { status: 404 })
    return Response.json({ error: "Failed to delete supplier" }, { status: 500 })
  }
}
