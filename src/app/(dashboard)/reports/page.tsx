"use client"

import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { BarChart3, TrendingUp, Download, AlertCircle } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageHeader, PageShell } from "@/components/page-shell"
import { downloadCSV } from "@/lib/csv"
import { useCurrency } from "@/lib/currency"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.8, 0.25, 1] as const },
  },
}

export default function ReportsPage() {
  const { formatCurrency } = useCurrency()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["reports"],
    queryFn: () => fetch("/api/reports").then((r) => r.json()),
    refetchInterval: 30000,
  })

  // Group invoices by date, last 30 days for the chart
  const invoices: any[] = data?.data ?? []
  const chartData = invoices
    .reduce((acc: any[], inv: any) => {
      const date = new Date(inv.createdAt).toLocaleDateString("ar-SA")
      const existing = acc.find((d) => d.date === date)
      if (existing) existing.total += Number(inv.grandTotal)
      else acc.push({ date, total: Number(inv.grandTotal) })
      return acc
    }, [])
    .slice(-30)

  if (error)
    return (
      <PageShell>
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <AlertCircle className="w-12 h-12 mb-3 text-destructive" />
          <p className="text-sm font-medium text-foreground mb-2">فشل التحميل</p>
          <Button variant="secondary" size="sm" onClick={() => refetch()}>
            إعادة المحاولة
          </Button>
        </div>
      </PageShell>
    )

  const totalSales =
    data?.reduce((s: number, i: any) => s + Number(i.grandTotal), 0) || 0
  const count = data?.length || 0
  const average = count ? Math.round(totalSales / count) : 0

  // Top revenue day from chart data
  const topDay = chartData.length
    ? chartData.reduce((best: any, d: any) => (d.total > best.total ? d : best), chartData[0])
    : null

  const handleExport = () => {
    if (!data?.length) return
    downloadCSV(
      ["رقم الفاتورة", "الإجمالي", "التاريخ"],
      data.map((inv: any) => [
        inv.invoiceNo || inv.id,
        inv.grandTotal,
        new Date(inv.createdAt).toLocaleDateString("ar-SA"),
      ]),
      "sales-report.csv",
    )
  }

  return (
    <PageShell>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <PageHeader
            title="التقارير"
            subtitle="تحليل المبيعات والإحصائيات"
            action={
              <Button
                onClick={handleExport}
                disabled={!data?.length || isLoading}
              >
                <Download className="w-4 h-4 ml-1" />
                تصدير CSV
              </Button>
            }
          />
        </motion.div>

        {/* Grid: chart (2 cols) + sidebar (1 col) */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Chart Card */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <Card>
              <CardHeader>
                <BarChart3 className="w-4 h-4 text-primary" />
                <CardTitle>المبيعات اليومية</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[300px] rounded-xl animate-pulse bg-muted" />
                ) : chartData.length === 0 ? (
                  <div className="h-[300px] flex flex-col items-center justify-center text-muted-foreground">
                    <BarChart3 className="w-10 h-10 mb-2 opacity-30" />
                    <p className="text-sm">لا توجد بيانات مبيعات بعد</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData} barCategoryGap="25%">
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--color-border)"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                        axisLine={{ stroke: "var(--color-border)" }}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: 8,
                          border: "1px solid var(--color-border)",
                          boxShadow: "var(--shadow-lg)",
                          backgroundColor: "var(--card)",
                        }}
                        formatter={(value: any) => [
                          formatCurrency(Number(value)),
                          "المبيعات",
                        ]}
                        cursor={{ fill: "var(--color-primary-light)" }}
                      />
                      <Bar
                        dataKey="total"
                        fill="var(--color-primary)"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={40}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Total Sales — amber gradient card */}
            <motion.div variants={itemVariants}>
              <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-hover text-primary-foreground shadow-sm p-6 text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-3 opacity-90" />
                <div className="text-sm font-medium mb-1 opacity-80">
                  إجمالي المبيعات
                </div>
                <div className="text-3xl font-bold">
                  {isLoading ? "..." : formatCurrency(totalSales)}
                </div>
              </div>
            </motion.div>

            {/* Stats Card */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-5 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">عدد الفواتير</span>
                    <span className="font-medium text-card-foreground">
                      {isLoading ? "..." : count}
                    </span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">متوسط الفاتورة</span>
                    <span className="font-medium text-card-foreground">
                      {isLoading ? "..." : formatCurrency(average)}
                    </span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">أيام التقرير</span>
                    <span className="font-medium text-card-foreground">
                      آخر 500 فاتورة
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Quick Stats Row */}
        <motion.div variants={itemVariants}>
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Total Revenue */}
            <Card>
              <CardContent className="p-5">
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  إجمالي الإيرادات
                </p>
                <p className="text-xl font-bold text-card-foreground">
                  {isLoading ? "..." : formatCurrency(totalSales)}
                </p>
              </CardContent>
            </Card>
            {/* Avg Invoice */}
            <Card>
              <CardContent className="p-5">
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  متوسط الفاتورة
                </p>
                <p className="text-xl font-bold text-card-foreground">
                  {isLoading ? "..." : formatCurrency(average)}
                </p>
              </CardContent>
            </Card>
            {/* Top Day */}
            <Card>
              <CardContent className="p-5">
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  أعلى يوم مبيعات
                </p>
                <p className="text-xl font-bold text-card-foreground">
                  {isLoading
                    ? "..."
                    : topDay
                      ? `${topDay.date} — ${formatCurrency(topDay.total)}`
                      : "—"}
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </motion.div>
    </PageShell>
  )
}
