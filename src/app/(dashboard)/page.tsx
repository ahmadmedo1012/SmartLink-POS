"use client"

import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import {
  ShoppingCart, Package, FileText, DollarSign, TrendingUp, Users, Wallet, Receipt, AlertCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PageShell } from "@/components/page-shell"
import {
  Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts"
import { useRouter } from "next/navigation"
import { motion, useReducedMotion } from "framer-motion"
import { AnimatedCounter } from "@/components/animated-counter"
import { useCurrency } from "@/lib/currency"
import { LowStockBanner } from "@/components/dashboard/low-stock-banner"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { TopProducts } from "@/components/dashboard/top-products"

const WARM_PIE = ["var(--primary)","var(--accent)","var(--primary-hover)","var(--warning)","var(--destructive)"]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25,0.8,0.25,1] as const } },
}

const quickActions = [
  { href: "/pos", label: "نقطة البيع", icon: ShoppingCart, desc: "فاتورة جديدة", amber: true },
  { href: "/products", label: "منتج جديد", icon: Package, desc: "إضافة منتج", amber: false },
  { href: "/invoices", label: "الفواتير", icon: FileText, desc: "عرض الفواتير", amber: false },
]

const stats = [
  { key: "totalSales", title: "إجمالي المبيعات", icon: DollarSign, gradient: "from-primary to-accent", currency: true, sub: null },
  { key: "estimatedProfit", title: "صافي الربح", icon: TrendingUp, gradient: "from-success to-accent", currency: true, sub: null },
  { key: "productCount", title: "المنتجات", icon: Package, gradient: "from-primary-hover to-accent-hover", currency: false, sub: "في المخزون" },
  { key: "customerCount", title: "العملاء", icon: Users, gradient: "from-primary to-accent", currency: false, sub: "مسجلون" },
]

function SummaryItems(dash: any, fmt: (v: number) => string) {
  return [
    { icon: Wallet, label: "إجمالي المبيعات", value: fmt(Number(dash?.totalSales || 0)), color: "var(--primary)" },
    { icon: TrendingUp, label: "الربح المقدر", value: fmt(Number(dash?.estimatedProfit || 0)), color: "var(--success)" },
    { icon: Receipt, label: "المصروفات", value: fmt(Number(dash?.totalExpenses || 0)), color: "var(--destructive)" },
    { icon: ShoppingCart, label: "الفواتير", value: String(dash?.invoiceCount || 0), color: "var(--accent)" },
    { icon: Package, label: "المنتجات", value: String(dash?.productCount || 0), color: "var(--primary)" },
    { icon: Users, label: "العملاء", value: String(dash?.customerCount || 0), color: "var(--primary)" },
  ]
}

function SkeletonCard() {
  return (
    <div className="bg-card text-card-foreground border-border rounded-2xl p-4 border shimmer">
      <div className="flex items-center justify-between mb-3">
        <div className="h-3 w-20 rounded bg-muted-foreground/20" />
        <div className="w-9 h-9 rounded-lg bg-muted-foreground/10" />
      </div>
      <div className="h-7 w-28 rounded bg-muted-foreground/20" />
    </div>
  )
}

function SkeletonBar() {
  return <div className="h-[250px] rounded-2xl shimmer" />
}

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <div className="h-5 w-[3px] rounded-full bg-gradient-to-b from-primary to-accent" />
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.08em]">{label}</span>
      <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
    </div>
  )
}

export default function DashboardPage() {
  const router = useRouter()
  const { formatCurrency } = useCurrency()
  const prefersReduced = useReducedMotion()
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)

  const { data: dash, error, refetch, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => fetch("/api/dashboard").then((r) => r.json()),
    refetchInterval: 60000,
    staleTime: 30000,
  })

  // Update last-updated timestamp on data arrival — wrapped in useEffect to avoid render-body setState
  useEffect(() => {
    if (dash && !lastUpdated) {
      setLastUpdated(new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }))
    }
  }, [dash, lastUpdated])

  const chartData = dash?.recentInvoices?.reduce((acc: any[], inv: any) => {
    const date = new Date(inv.createdAt).toLocaleDateString("ar-SA")
    const existing = acc.find((d) => d.date === date)
    if (existing) existing.total += Number(inv.grandTotal)
    else acc.push({ date, total: Number(inv.grandTotal) })
    return acc
  }, []).slice(-14) || []

  const pieData = [
    { name: "المبيعات", value: Number(dash?.totalSales || 0) },
    { name: "المصروفات", value: Number(dash?.totalExpenses || 0) },
    { name: "الأرباح", value: Math.max(0, Number(dash?.estimatedProfit || 0)) },
  ].filter((d) => d.value > 0)

  const MotionShell = prefersReduced ? "div" : motion.div

  if (error)
    return (
      <MotionShell>
        <PageShell>
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <AlertCircle className="w-12 h-12 mb-3 text-destructive" />
            <p className="text-sm font-medium text-foreground mb-2">فشل التحميل</p>
            <p className="text-xs mb-4">{error.message}</p>
            <Button variant="secondary" size="sm" onClick={() => refetch()}>إعادة المحاولة</Button>
          </div>
        </PageShell>
      </MotionShell>
    )

  if (isLoading)
    return (
      <MotionShell>
        <PageShell>
          <div className="flex items-center justify-between">
            <div>
              <div className="h-8 w-36 rounded shimmer" />
              <div className="h-4 w-48 rounded mt-2 shimmer" />
            </div>
          </div>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 min-w-0">
            {[1,2,3,4].map(n => <SkeletonCard key={n} />)}
          </div>
          <div className="grid gap-6 lg:grid-cols-3 min-w-0">
            <div className="lg:col-span-2"><SkeletonBar /></div>
            <SkeletonBar />
          </div>
        </PageShell>
      </MotionShell>
    )

  return (
    <MotionShell>
      <PageShell>
        {/* Header */}
        <motion.div className="flex items-center justify-between" variants={itemVariants}>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground">لوحة التحكم</h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold leading-4 bg-primary-light dark:bg-primary/20 text-primary-hover dark:text-primary border border-primary/30 dark:border-primary/50">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block relative">
                  <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-60" />
                </span>
                مباشر
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-sm text-muted-foreground">نظرة عامة على أداء المنظومة</p>
              {lastUpdated && (
                <span className="text-[11px] text-muted-foreground/60" dir="ltr">&middot; آخر تحديث {lastUpdated}</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => { refetch(); setLastUpdated(new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })) }}
              className="text-xs text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-muted cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--ring)]/50 focus-visible:outline-offset-2">
              تحديث
            </button>
          </div>
        </motion.div>

        {/* Alert banner */}
        <motion.div variants={itemVariants}>
          <LowStockBanner />
        </motion.div>

        {/* Welcome banner for new users */}
        {(!dash || (dash.invoiceCount === 0 && dash.productCount === 0 && dash.customerCount === 0)) && (
          <motion.div variants={itemVariants} className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border border-primary/20 rounded-2xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shrink-0 shadow-md">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-foreground">مرحباً بك في الربط الذكي!</h2>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  ابدأ بإضافة منتجاتك الأولى، ثم أنشئ فاتورة بيع. يمكنك أيضاً تصفح
                  لوحة التحكم والتعرف على المؤشرات والتقارير.
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <a href="/products" className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground hover:bg-primary-hover transition-colors shadow-sm cursor-pointer">
                    <Package className="w-3.5 h-3.5" />
                    إضافة منتجات
                  </a>
                  <a href="/pos" className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-white border border-border px-4 text-xs font-semibold text-foreground hover:bg-muted transition-colors shadow-sm cursor-pointer">
                    <ShoppingCart className="w-3.5 h-3.5" />
                    تجربة نقطة البيع
                  </a>
                  <a href="/customers" className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-white border border-border px-4 text-xs font-semibold text-foreground hover:bg-muted transition-colors shadow-sm cursor-pointer">
                    <Users className="w-3.5 h-3.5" />
                    إضافة عملاء
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Quick Action Cards */}
        <motion.div variants={itemVariants}>
          <SectionHeader label="إجراءات سريعة" />
          <div className="grid grid-cols-3 gap-4 min-w-0">
          {quickActions.map((action) => (
            <motion.button
              key={action.href}
              onClick={() => router.push(action.href)}
              className={`relative flex items-center gap-4 text-card-foreground border-border rounded-2xl px-5 py-4 text-right cursor-pointer border shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[var(--ring)]/50 focus-visible:outline-offset-2 before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] min-h-[80px] ${
                action.amber
                  ? "bg-gradient-to-br from-primary/10 to-accent/5 hover:from-primary/20 hover:to-accent/10 border-primary/20 dark:border-primary/50"
                  : "bg-muted/50 hover:bg-muted border-border"
              }`}
              whileHover={{ y: -2, scale: 1.01 }}
              transition={{ duration: 0.2, ease: "easeOut" as const }}
            >
              <div className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${
                action.amber
                  ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30"
                  : "bg-primary-light dark:bg-primary/20 text-primary-hover dark:text-primary"
              }`}>
                <action.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">{action.label}</div>
                <div className="text-xs text-muted-foreground">{action.desc}</div>
              </div>
            </motion.button>
          ))}
          </div>
        </motion.div>

        {/* KPI Stats */}
        <motion.div variants={itemVariants}>
          <SectionHeader label="المؤشرات الرئيسية" />
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 min-w-0">
          {stats.map((card) => {
            const raw = Number(dash?.[card.key as keyof typeof dash] ?? 0)
            return (
              <motion.div
                key={card.key}
                className="relative bg-card text-card-foreground border-border shadow-sm rounded-2xl p-4 cursor-default border overflow-hidden transition-all duration-200 hover:shadow-lg hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2, ease: "easeOut" as const }}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-muted-foreground truncate">{card.title}</span>
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-gradient-to-br ${card.gradient} text-primary-foreground shadow-sm`}>
                      <card.icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-foreground tracking-tight leading-none">
                    {card.currency ? formatCurrency(raw) : <AnimatedCounter value={raw} />}
                  </div>
                  {card.sub && <div className="text-xs text-muted-foreground mt-2">{card.sub}</div>}
                </div>
              </motion.div>
            )
          })}
            </div>
          </motion.div>

          {/* Charts */}
          <motion.div variants={itemVariants}>
          <SectionHeader label="التحليلات" />
          <div className="grid gap-6 lg:grid-cols-3 min-w-0">
          <Card className="lg:col-span-2 p-0 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
            <div className="p-4 pb-3 border-b border-border/50">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                المبيعات اليومية
              </h3>
            </div>
            <div className="p-4 bg-muted/20 overflow-hidden">
            {chartData.length === 0 ? (
              <div className="h-[250px] flex flex-col items-center justify-center text-muted-foreground">
                <ShoppingCart className="w-10 h-10 mb-2 opacity-30" />
                <p className="text-sm font-medium">قم بإضافة منتجات وبدء البيع لرؤية الإحصائيات</p>
                <p className="text-xs mt-1">ستظهر المبيعات هنا عند إنشاء أول فاتورة</p>
                <Button variant="secondary" size="sm" className="mt-3" onClick={() => router.push("/pos")}>فتح نقطة البيع</Button>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData} barCategoryGap="25%">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} axisLine={{ stroke: "var(--color-border)" }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid var(--color-border)", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)" }} formatter={(value: any) => [formatCurrency(Number(value)), "المبيعات"]} />
                  <Bar dataKey="total" fill="var(--primary)" radius={[4, 4, 0, 0]} maxBarSize={32} />
                </BarChart>
              </ResponsiveContainer>
            )}
            </div>
          </Card>
          <Card className="p-0 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden min-w-0">
            <div className="p-4 pb-3 border-b border-border/50">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                توزيع الإيرادات
              </h3>
            </div>
            <div className="p-4 bg-muted/20 overflow-hidden">
            {pieData.length === 0 ? (
              <div className="h-[250px] flex flex-col items-center justify-center text-muted-foreground">
                <DollarSign className="w-10 h-10 mb-2 opacity-30" />
                <p className="text-sm font-medium">ابدأ بإنشاء فاتورة جديدة</p>
                <p className="text-xs mt-1">يظهر التوزيع عند توفر مبيعات ومصروفات</p>
                <Button variant="secondary" size="sm" className="mt-3" onClick={() => router.push("/pos")}>فتح نقطة البيع</Button>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name }) => name}>
                    {pieData.map((_, i) => <Cell key={i} fill={WARM_PIE[i % WARM_PIE.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid var(--color-border)" }} formatter={(value: any) => formatCurrency(Number(value))} />
                </PieChart>
              </ResponsiveContainer>
            )}
            </div>
          </Card>
          </div>
        </motion.div>

      {/* Activity + Top Products */}
        <motion.div variants={itemVariants}>
          <SectionHeader label="النشاط" />
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-6 lg:grid-cols-2 min-w-0">
          <motion.div variants={itemVariants}><ActivityFeed /></motion.div>
          <motion.div variants={itemVariants}><TopProducts /></motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom 3-col: Recent Invoices + Quick Summary + Today Sales */}
        <motion.div variants={itemVariants}>
          <SectionHeader label="ملخص" />
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-6 lg:grid-cols-3 min-w-0">
          <motion.div variants={itemVariants}>
            <Card className="p-0 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
              <div className="p-4 pb-3 border-b border-border/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">آخر الفواتير</h3>
                  <button onClick={() => router.push("/invoices")} className="text-xs text-primary hover:text-primary-hover hover:underline font-medium cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--ring)]/50 focus-visible:outline-offset-2 rounded-sm">عرض الكل</button>
                </div>
              </div>
              <div className="p-4">
              {dash?.recentInvoices?.length ? (
                <div className="space-y-1">
                  {dash.recentInvoices.slice(0, 5).map((inv: any) => (
                    <div key={inv.id} tabIndex={0} role="button" onClick={() => router.push(`/invoices/${inv.id}`)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); router.push(`/invoices/${inv.id}`); } }} className="flex items-center justify-between py-2.5 px-2 -mx-2 rounded-lg cursor-pointer transition-all duration-200 ease-out hover:bg-muted focus-visible:outline-2 focus-visible:outline-[var(--ring)]/50 focus-visible:outline-offset-2 active:scale-[0.98]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary/10">
                          <ShoppingCart className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-foreground">فاتورة #{inv.invoiceNo}</div>
                          <div className="text-xs text-muted-foreground">{inv.user?.name} &bull; {new Date(inv.createdAt).toLocaleDateString("ar-SA")}</div>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-foreground">{formatCurrency(Number(inv.grandTotal))}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-medium">ابدأ بإنشاء فاتورة جديدة</p>
                  <p className="text-xs mt-1">أنشئ فاتورة جديدة من نقطة البيع لعرضها هنا</p>
                  <Button variant="secondary" size="sm" className="mt-3" onClick={() => router.push("/pos")}>فتح نقطة البيع</Button>
                </div>
              )}
              </div>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card className="p-4 md:p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
              <h3 className="text-sm font-semibold text-foreground mb-4">ملخص سريع</h3>
              <div className="space-y-1.5">
                {SummaryItems(dash, formatCurrency).map((s) => (
                  <div key={s.label} className="flex items-center justify-between px-4 py-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                    <div className="flex items-center gap-3">
                      <s.icon className="w-4 h-4" style={{ color: s.color }} />
                      <span className="text-sm text-foreground">{s.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-foreground">{s.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card className="p-4 md:p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success" />
                مبيعات اليوم
              </h3>
              <div className="flex flex-col items-center justify-center py-6">
                <div className="text-3xl font-bold text-foreground tracking-tight">{formatCurrency(Number(dash?.totalSales || 0))}</div>
                <div className="flex items-center gap-1.5 mt-2 text-sm" style={{ color: "var(--success)" }}>
                  <TrendingUp className="w-4 h-4" />
                  <span>{dash?.margin ?? 0}% هامش ربح</span>
                </div>
                <div className="mt-4 w-full grid grid-cols-2 gap-3">
                  <div className="flex flex-col items-center p-3 rounded-xl bg-muted">
                    <span className="text-xs text-muted-foreground">الفواتير</span>
                    <span className="text-lg font-bold text-foreground">{dash?.invoiceCount || 0}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-xl bg-muted">
                    <span className="text-xs text-muted-foreground">المصروفات</span>
                    <span className="text-lg font-bold text-foreground">{formatCurrency(Number(dash?.totalExpenses || 0))}</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>
      </PageShell>
    </MotionShell>
  )
}
