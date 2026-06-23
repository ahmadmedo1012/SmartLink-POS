import { prisma } from "@/lib/prisma"
import { NextRequest } from "next/server"

export async function GET() {
  try {
    const suppliers = await prisma.supplier.findMany({ orderBy: { createdAt: "desc" } })
    return Response.json(suppliers)
  } catch (error) {
    return Response.json({ error: "Failed to fetch suppliers" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (!body.name || typeof body.name !== "string" || !body.name.trim()) {
      return Response.json({ error: "Name is required" }, { status: 400 })
    }
    const supplier = await prisma.supplier.create({ data: body })
    return Response.json(supplier)
  } catch (error: any) {
    console.error("Failed to create supplier:", error)
    return Response.json({ error: "Failed to create supplier" }, { status: 500 })
  }
}
