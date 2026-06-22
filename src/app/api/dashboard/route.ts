import { prisma } from "@/lib/prisma"

export async function GET() {
  const [stats, invoices, expenses] = await Promise.all([
    Promise.all([
      prisma.invoice.aggregate({ _sum: { grandTotal: true }, _count: true }),
      prisma.product.count({ where: { isActive: true } }),
      prisma.product.aggregate({ _sum: { stock: true } }),
      prisma.customer.count(),
      prisma.invoice.findMany({ orderBy: { createdAt: "desc" }, take: 5, include: { user: { select: { name: true } }, items: true } }),
    ]),
    prisma.invoice.findMany({
      select: { id: true, total: true, grandTotal: true, discount: true, tax: true, createdAt: true },
      take: 500, orderBy: { createdAt: "desc" },
    }),
    prisma.expense.findMany({
      select: { amount: true, createdAt: true },
      take: 500, orderBy: { createdAt: "desc" },
    }),
  ])

  // ponytail: estimated profit — upgrade to per-item cost tracking when accuracy matters
  const totalSales = invoices.reduce((s, i) => s + Number(i.grandTotal), 0)
  const totalExpenses = expenses.reduce((s, e) => s + Number(e.amount), 0)
  const estimatedProfit = totalSales * 0.3 - totalExpenses

  return Response.json({
    totalSales: stats[0]._sum.grandTotal || 0,
    invoiceCount: stats[0]._count,
    productCount: stats[1],
    totalStock: stats[2]._sum.stock || 0,
    customerCount: stats[3],
    recentInvoices: stats[4],
    totalDiscounts: invoices.reduce((s, i) => s + Number(i.discount), 0),
    totalTax: invoices.reduce((s, i) => s + Number(i.tax), 0),
    totalExpenses,
    estimatedProfit,
    margin: totalSales > 0 ? Math.round((estimatedProfit / totalSales) * 100) : 0,
  })
}
