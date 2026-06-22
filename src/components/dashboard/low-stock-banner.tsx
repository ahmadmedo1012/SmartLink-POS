"use client"

import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { AlertTriangle, X } from "lucide-react"
import { useState } from "react"

interface LowStockItem {
  id: string
  name: string
  nameAr?: string
  stock: number
  minStock: number
}

export function LowStockBanner() {
  const [dismissed, setDismissed] = useState(false)
  const { data, isLoading } = useQuery({
    queryKey: ["inventory-low-stock"],
    queryFn: () => fetch("/api/inventory").then((r) => r.json()),
    refetchInterval: 30000,
  })

  const items: LowStockItem[] = data?.lowStock ?? []
  if (isLoading || !items.length || dismissed) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="flex items-start gap-3 rounded-2xl border border-warning/30 dark:border-warning/50 bg-warning/10 dark:bg-warning/20 p-4"
    >
      <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-warning">
          تنبيه: مخزون منخفض
        </p>
        <p className="text-xs text-warning/80 mt-1">
          {items.length === 1
            ? `${items[0].nameAr || items[0].name} — تحتاج إلى إعادة توريد`
            : `${items.length} منتجات تحتاج إلى إعادة توريد: ${items.slice(0, 3).map((i) => i.nameAr || i.name).join("، ")}${items.length > 3 ? ` و${items.length - 3} أخرى` : ""}`
          }
        </p>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="shrink-0 p-1 rounded-lg hover:bg-warning/20 transition-colors"
        aria-label="إغلاق"
      >
        <X className="w-4 h-4 text-warning" />
      </button>
    </motion.div>
  )
}
