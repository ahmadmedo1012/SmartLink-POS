import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, email: true } },
      customer: true,
      items: { include: { product: { select: { name: true, nameAr: true, cost: true } } } },
    },
  })
  if (!invoice) return NextResponse.json({ error: "not found" }, { status: 404 })
  return Response.json(invoice)
}
