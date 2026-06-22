import { prisma } from "@/lib/prisma"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"))
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") ?? "20")))
    const entity = searchParams.get("entity")
    const search = searchParams.get("search")?.trim()

    const where: any = {}
    if (entity) where.entity = entity
    if (search) {
      where.OR = [
        { details: { contains: search, mode: "insensitive" } },
        { action: { contains: search, mode: "insensitive" } },
        { user: { name: { contains: search, mode: "insensitive" } } },
      ]
    }

    const [logs, total] = await Promise.all([
      prisma.activityLog.findMany({
        where,
        include: { user: { select: { id: true, name: true } } },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.activityLog.count({ where }),
    ])

    return Response.json({ data: logs, total, page, limit, totalPages: Math.ceil(total / limit) })
  } catch (error) {
    return Response.json({ error: "Failed to fetch activity logs" }, { status: 500 })
  }
}
