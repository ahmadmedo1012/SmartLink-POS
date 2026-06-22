import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"
import bcrypt from "bcryptjs"

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) })

async function main() {
  const hash = await bcrypt.hash("admin123", 10)
  const admin = await prisma.user.upsert({
    where: { email: "admin@pos.com" },
    update: {},
    create: { name: "مدير النظام", email: "admin@pos.com", passwordHash: hash, role: "admin" },
  })
  const cat = await prisma.category.create({ data: { name: "General", nameAr: "عام", description: "منتجات عامة" } })
  for (const p of [
    { name: "Product 1", nameAr: "منتج 1", price: 50, cost: 30, stock: 100, minStock: 10, barcode: "1001" },
    { name: "Product 2", nameAr: "منتج 2", price: 100, cost: 70, stock: 50, minStock: 5, barcode: "1002" },
    { name: "Product 3", nameAr: "منتج 3", price: 25, cost: 15, stock: 200, minStock: 20, barcode: "1003" },
  ]) {
    await prisma.product.upsert({ where: { barcode: p.barcode }, update: {}, create: { ...p, categoryId: cat.id } })
  }
  console.log("Seeded:", { admin: admin.email, password: "admin123", products: 3 })
}

main().catch(console.error).finally(() => prisma.$disconnect())
