"use client"

import { useQuery } from "@tanstack/react-query"
import { Package, AlertTriangle, CheckCircle2, Box, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PageShell, PageHeader } from "@/components/page-shell"
import { EmptyState } from "@/components/empty-state"
import { motion } from "framer-motion"

interface Product {
  id: string
  name: string
  nameAr: string
  stock: number
  minStock: number
  price: number
  category: { id: string; name: string; nameAr: string } | null
}

interface InventoryResponse {
  lowStock: Product[]
  totalProducts: number
  activeProducts: number
  outOfStock: number
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.8, 0.25, 1] as const } },
}

export default function InventoryPage() {
  const { data, isLoading, error, refetch } = useQuery<InventoryResponse>({
    queryKey: ["inventory"],
    queryFn: () =>
      fetch("/api/inventory").then((r) => {
        if (!r.ok) throw new Error("Failed to load inventory")
        return r.json()
      }),
    refetchInterval: 15000,
  })

  const lowCount = data?.lowStock?.length ?? 0
  const showAlert = lowCount > 0

  return (
    <PageShell>
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        {/* Header */}
        <motion.div variants={itemVariants}>
          <PageHeader
            title="المخزون"
            subtitle={`${data?.activeProducts ?? 0} منتج نشط`}
            action={
              <div className="flex items-center gap-3">
                <div className="text-sm text-muted-foreground">
                  إجمالي المنتجات: <span className="font-semibold text-foreground">{data?.totalProducts ?? 0}</span>
                </div>
              </div>
            }
          />
        </motion.div>

        {/* Alert banner */}
        <motion.div variants={itemVariants}>
          {error ? null : isLoading ? (
            <div className="h-14 rounded-2xl shimmer" />
          ) : showAlert ? (
            <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-warning/10 dark:bg-warning/20 border border-warning/30 dark:border-warning/50">
              <div className="w-9 h-9 rounded-xl bg-warning/20 dark:bg-warning/30 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-warning" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-warning">
                  {lowCount === 1 ? "منتج واحد بحاجة لإعادة تزويد" : `${lowCount} منتجات بحاجة لإعادة تزويد`}
                </p>
                <p className="text-xs text-warning/80 mt-0.5">
                  المخزون الحالي أقل من الحد الأدنى. يرجى مراجعة المنتجات أدناه.
                </p>
              </div>
              <Badge variant="warning" size="lg" className="shrink-0">
                {lowCount}
              </Badge>
            </div>
          ) : (
            <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-success/10 dark:bg-success/20 border border-success/30 dark:border-success/50">
              <div className="w-9 h-9 rounded-xl bg-success/20 dark:bg-success/30 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <p className="text-sm font-semibold text-success">
                جميع المنتجات متوفرة
              </p>
            </div>
          )}
        </motion.div>

        {/* Quick stats */}
        <motion.div className="grid gap-4 grid-cols-1 sm:grid-cols-3" variants={itemVariants}>
          {[
            { label: "إجمالي المنتجات", value: data?.totalProducts ?? 0, icon: Box, color: "from-primary to-accent" },
            { label: "المنتجات النشطة", value: data?.activeProducts ?? 0, icon: Package, color: "from-success to-accent" },
            { label: "نفد من المخزون", value: data?.outOfStock ?? 0, icon: AlertCircle, color: "from-destructive to-warning" },
          ].map((stat) => (
            <Card key={stat.label} className="p-5 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br ${stat.color} text-white shadow-sm`}>
                  <stat.icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </Card>
          ))}
        </motion.div>

        {/* Error state */}
        {error && (
          <motion.div variants={itemVariants} className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <AlertCircle className="w-12 h-12 mb-3 text-destructive" />
            <p className="text-sm font-medium text-foreground mb-2">فشل تحميل المخزون</p>
            <Button variant="secondary" size="sm" onClick={() => refetch()}>إعادة المحاولة</Button>
          </motion.div>
        )}

        {/* Loading skeleton */}
        {isLoading && (
          <motion.div variants={itemVariants} className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-44 rounded-2xl shimmer" />
            ))}
          </motion.div>
        )}

        {/* Empty state (loaded, no low stock) */}
        {!isLoading && !error && !showAlert && (
          <motion.div variants={itemVariants}>
            <EmptyState
              icon={CheckCircle2}
              title="جميع المنتجات متوفرة"
              description="لا توجد منتجات تحتاج إلى إعادة تزويد حالياً"
            />
          </motion.div>
        )}

        {/* Low stock cards grid */}
        {!isLoading && !error && showAlert && (
          <motion.div variants={itemVariants} className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {data?.lowStock?.map((product) => (
              <Card key={product.id} className="p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-foreground truncate">
                      {product.nameAr || product.name}
                    </h3>
                    {product.nameAr && product.name && (
                      <p className="text-xs text-muted-foreground truncate">{product.name}</p>
                    )}
                  </div>
                  <Badge variant={product.stock === 0 ? "danger" : "warning"} size="sm" className="shrink-0 mr-2">
                    {product.stock === 0 ? "نفد" : "منخفض"}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <p className="text-[10px] text-muted-foreground">المخزون الحالي</p>
                    <p className={`text-lg font-bold tabular-nums ${product.stock === 0 ? "text-destructive" : "text-warning"}`}>
                      {product.stock}
                    </p>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div>
                    <p className="text-[10px] text-muted-foreground">الحد الأدنى</p>
                    <p className="text-lg font-bold tabular-nums text-muted-foreground">{product.minStock}</p>
                  </div>
                  {product.category && (
                    <>
                      <div className="w-px h-8 bg-border" />
                      <div className="min-w-0">
                        <p className="text-[10px] text-muted-foreground">الفئة</p>
                        <p className="text-sm font-medium text-foreground truncate">
                          {product.category.nameAr || product.category.name}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <Button
                  variant="default"
                  size="sm"
                  className="w-full"
                  onClick={() => window.location.href = `/products`}
                >
                  <Package className="w-4 h-4 ml-1.5" />
                  إدارة المنتج
                </Button>
              </Card>
            ))}
          </motion.div>
        )}

        {/* Summary */}
        {!isLoading && !error && showAlert && (
          <motion.div variants={itemVariants}>
            <p className="text-xs text-muted-foreground text-center">
              {lowCount} {lowCount === 1 ? "منتج" : "منتجات"} بحاجة إلى إعادة تزويد
            </p>
          </motion.div>
        )}
        </motion.div>
      </PageShell>
  )
}
