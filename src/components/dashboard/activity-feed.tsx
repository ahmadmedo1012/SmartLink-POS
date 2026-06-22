"use client"

import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { Clock, Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"

const ACTION_LABELS: Record<string, string> = {
  create: "إنشاء",
  update: "تعديل",
  delete: "حذف",
}
const ENTITY_LABELS: Record<string, string> = {
  product: "منتج",
  invoice: "فاتورة",
  customer: "عميل",
  expense: "مصروف",
  supplier: "مورد",
  category: "تصنيف",
  return: "مرتجع",
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35 } },
}

export function ActivityFeed() {
  const { data, isLoading } = useQuery({
    queryKey: ["activity-feed"],
    queryFn: () => fetch("/api/activity?limit=5").then((r) => r.json()),
    refetchInterval: 15000,
  })

  const logs = data?.data ?? []

  return (
    <Card className="p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">آخر النشاطات</h3>
        <Clock className="w-4 h-4 text-muted-foreground" />
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
        </div>
      ) : !logs.length ? (
        <div className="text-center py-10 text-muted-foreground">
          <Clock className="w-10 h-10 mx-auto mb-2 opacity-30" />
          <p className="text-sm">لا توجد نشاطات بعد</p>
        </div>
      ) : (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-1">
          {logs.map((log: any) => (
            <motion.div
              key={log.id}
              variants={itemVariants}
              className="flex items-center gap-3 py-2.5 px-2 -mx-2 rounded-lg"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary-light/50 dark:bg-primary/20 shrink-0">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate">
                  <span className="font-medium">{log.user?.name}</span>
                  {" "}{ACTION_LABELS[log.action] || log.action}{" "}
                  <span className="font-medium">{ENTITY_LABELS[log.entity] || log.entity}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(log.createdAt).toLocaleDateString("ar-SA", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </Card>
  )
}
