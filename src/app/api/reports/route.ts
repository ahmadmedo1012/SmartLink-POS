import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  // Date range filtering
  const from = searchParams.get("from")
  const to = searchParams.get("to")
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"))
  const pageSize = Math.min(500, Math.max(1, parseInt(searchParams.get("pageSize") ?? "50")))

  const where: { createdAt?: { gte?: Date; lte?: Date } } = {}
  if (from) where.createdAt = { ...where.createdAt, gte: new Date(from) }
  if (to) where.createdAt = { ...where.createdAt, lte: new Date(to) }

  // Aggregation + paginated data in parallel
  const [aggregation, reports, totalCount] = await Promise.all([
    prisma.invoice.aggregate({
      _sum: { grandTotal: true },
      _count: true,
      where,
    }),
    prisma.invoice.findMany({
      select: { grandTotal: true, createdAt: true, status: true },
      orderBy: { createdAt: "desc" },
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.invoice.count({ where }),
  ])

  return Response.json({
    data: reports,
    pagination: {
      page,
      pageSize,
      total: totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
    },
    summary: {
      totalRevenue: aggregation._sum.grandTotal ?? 0,
      totalInvoices: aggregation._count,
    },
  })
}
