import { prisma } from "@/lib/prisma"

export async function GET() {
  const [stats, invoiceAgg, expenseAgg] = await Promise.all([
    Promise.all([
      prisma.invoice.aggregate({ _sum: { grandTotal: true }, _count: true }),
      prisma.product.count({ where: { isActive: true } }),
      prisma.product.aggregate({ _sum: { stock: true } }),
      prisma.customer.count(),
      prisma.invoice.findMany({ orderBy: { createdAt: "desc" }, take: 5, include: { user: { select: { name: true } }, items: true } }),
    ]),
    prisma.invoice.aggregate({
      _sum: { grandTotal: true, discount: true, tax: true },
    }),
    prisma.expense.aggregate({
      _sum: { amount: true },
    }),
  ])

  const totalSales = Number(invoiceAgg._sum.grandTotal || 0)
  const totalExpenses = Number(expenseAgg._sum.amount || 0)
  const grossRevenue = totalSales - totalExpenses

  return Response.json({
    totalSales,
    invoiceCount: stats[0]._count,
    productCount: stats[1],
    totalStock: stats[2]._sum.stock || 0,
    customerCount: stats[3],
    recentInvoices: stats[4],
    totalDiscounts: Number(invoiceAgg._sum.discount || 0),
    totalTax: Number(invoiceAgg._sum.tax || 0),
    totalExpenses,
    grossRevenue,
    margin: totalSales > 0 ? Math.round((grossRevenue / totalSales) * 100) : 0,
  })
}
