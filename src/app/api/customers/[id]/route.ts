import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const customer = await prisma.customer.findUnique({ where: { id } })
    if (!customer) return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    return Response.json(customer)
  } catch (error) {
    return Response.json({ error: "Failed to fetch customer" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()
    const customer = await prisma.customer.update({ where: { id }, data: body })
    return Response.json(customer)
  } catch (error: any) {
    if (error?.code === "P2025") return Response.json({ error: "Customer not found" }, { status: 404 })
    return Response.json({ error: "Failed to update customer" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const existing = await prisma.customer.findUnique({ where: { id } })
    if (!existing) return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    await prisma.customer.delete({ where: { id } })
    return Response.json({ success: true })
  } catch (error: any) {
    if (error?.code === "P2025") return Response.json({ error: "Customer not found" }, { status: 404 })
    return Response.json({ error: "Failed to delete customer" }, { status: 500 })
  }
}
