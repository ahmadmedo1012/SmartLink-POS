import { prisma } from "@/lib/prisma"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search")

    if (search) {
      const customers = await prisma.customer.findMany({
        where: {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { phone: { contains: search } },
          ],
        },
        orderBy: { createdAt: "desc" },
        take: 10,
      })
      return Response.json(customers)
    }

    const customers = await prisma.customer.findMany({ orderBy: { createdAt: "desc" }, take: 100 })
    return Response.json(customers)
  } catch (error) {
    return Response.json({ error: "Failed to fetch customers" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (!body.name || typeof body.name !== "string" || !body.name.trim()) {
      return Response.json({ error: "Name is required" }, { status: 400 })
    }
    const customer = await prisma.customer.create({ data: body })
    return Response.json(customer)
  } catch (error: any) {
    return Response.json({ error: error?.message || "Failed to create customer" }, { status: 500 })
  }
}
