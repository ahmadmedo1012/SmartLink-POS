import { prisma } from "@/lib/prisma"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  const catId = req.nextUrl.searchParams.get("categoryId")
  const where: any = { isActive: true }
  if (catId) where.categoryId = catId
  const products = await prisma.product.findMany({ where, include: { category: true }, orderBy: { name: "asc" } })
  return Response.json(products)
}
