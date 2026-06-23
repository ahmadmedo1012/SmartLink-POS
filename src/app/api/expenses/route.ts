import { prisma } from "@/lib/prisma"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const page = Math.max(1, Number(req.nextUrl.searchParams.get("page")) || 1)
    const pageSize = Math.min(100, Math.max(1, Number(req.nextUrl.searchParams.get("pageSize")) || 20))
    const category = req.nextUrl.searchParams.get("category")
    const startDate = req.nextUrl.searchParams.get("startDate")
    const endDate = req.nextUrl.searchParams.get("endDate")

    const where: Record<string, unknown> = {}
    if (category) where.category = category
    if (startDate || endDate) {
      where.date = {}
      if (startDate) (where.date as Record<string, Date>).gte = new Date(startDate)
      if (endDate) (where.date as Record<string, Date>).lte = new Date(endDate)
    }

    const [expenses, total] = await Promise.all([
      prisma.expense.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.expense.count({ where }),
    ])
    return Response.json({ expenses, total, page, pageSize, pages: Math.ceil(total / pageSize) })
  } catch (error) {
    return Response.json({ error: "Failed to fetch expenses" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (!body.description || typeof body.description !== "string" || !body.description.trim()) {
      return Response.json({ error: "Description is required" }, { status: 400 })
    }
    if (body.amount === undefined || body.amount === null || isNaN(Number(body.amount))) {
      return Response.json({ error: "Valid amount is required" }, { status: 400 })
    }
    const expense = await prisma.expense.create({ data: { ...body, amount: Number(body.amount) } })
    return Response.json(expense)
  } catch (error: any) {
    console.error("Failed to create expense:", error)
    return Response.json({ error: "Failed to create expense" }, { status: 500 })
  }
}
