import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST() {
  const hash = await bcrypt.hash("admin123", 10)
  const admin = await prisma.user.upsert({
    where: { email: "admin@pos.com" },
    update: {},
    create: { name: "مدير النظام", email: "admin@pos.com", passwordHash: hash, role: "admin" },
  })
  const cat = await prisma.category.create({
    data: { name: "عام", nameAr: "عام", description: "منتجات عامة" },
  })
  const products = [
    { name: "Product 1", nameAr: "منتج 1", price: 50, cost: 30, stock: 100, minStock: 10, barcode: "1001" },
    { name: "Product 2", nameAr: "منتج 2", price: 100, cost: 70, stock: 50, minStock: 5, barcode: "1002" },
    { name: "Product 3", nameAr: "منتج 3", price: 25, cost: 15, stock: 200, minStock: 20, barcode: "1003" },
  ]
  for (const p of products) {
    await prisma.product.upsert({
      where: { barcode: p.barcode },
      update: {},
      create: { ...p, categoryId: cat.id },
    })
  }
  return Response.json({ admin: admin.email, password: "admin123", products: products.length })
}
