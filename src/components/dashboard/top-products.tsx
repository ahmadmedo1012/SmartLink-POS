"use client"

import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { ShoppingCart, Star, TrendingUp } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useCurrency } from "@/lib/currency"

export function TopProducts() {
  const { formatCurrency } = useCurrency()
  const { data, isLoading } = useQuery({
    queryKey: ["top-products"],
    queryFn: () => fetch("/api/products?top=true").then(r => r.json()),
    refetchInterval: 30000,
  })

  const sorted = [...(data?.products || [])]
    .map((p: any) => ({
      name: p.nameAr || p.name,
      sold: p.totalSold || 0,
      revenue: Number(p.price) * (p.totalSold || 0),
    }))
    .slice(0, 5)

  const maxSold = Math.max(...sorted.map(p => p.sold), 1)
  const c = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }
  const i = { hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0, transition: { duration: 0.35 } } }

  return (
    <Card className="p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">أفضل المنتجات مبيعاً</h3>
        <TrendingUp className="w-4 h-4 text-primary" />
      </div>
      {isLoading ? (
        <div className="space-y-3 py-4">{[1,2,3,4,5].map(n => <div key={n} className="h-12 shimmer rounded-lg" />)}</div>
      ) : !sorted.length ? (
        <div className="text-center py-10 text-muted-foreground">
          <ShoppingCart className="w-10 h-10 mx-auto mb-2 opacity-30" />
          <p className="text-sm">لا توجد منتجات بعد</p>
        </div>
      ) : (
        <motion.div variants={c} initial="hidden" animate="visible" className="space-y-0.5">
          {sorted.map((p, idx) => (
            <motion.div key={p.name} variants={i}
              className="flex items-center gap-3 py-2.5 px-2 -mx-2 rounded-lg hover:bg-muted/50 transition-colors">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${idx === 0 ? "bg-primary-light/50 dark:bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                {idx === 0 ? <Star className="w-4 h-4" /> : <span className="text-xs font-bold">{idx + 1}</span>}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${(p.sold / maxSold) * 100}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{p.sold}</span>
                </div>
              </div>
              <span className="text-sm font-semibold text-foreground shrink-0">{formatCurrency(p.revenue)}</span>
            </motion.div>
          ))}
        </motion.div>
      )}
    </Card>
  )
}
