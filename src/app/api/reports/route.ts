import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const reports = await prisma.invoice.findMany({
    select: { grandTotal: true, createdAt: true, status: true },
    orderBy: { createdAt: "desc" },
    take: 500,
  })
  return Response.json(reports)
}
