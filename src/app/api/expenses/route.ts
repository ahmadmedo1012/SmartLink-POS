import { prisma } from "@/lib/prisma"
import { NextRequest } from "next/server"

export async function GET() {
  try {
    const expenses = await prisma.expense.findMany({ orderBy: { createdAt: "desc" }, take: 100 })
    return Response.json(expenses)
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
    return Response.json({ error: error?.message || "Failed to create expense" }, { status: 500 })
  }
}
