"use client"

import { useQuery } from "@tanstack/react-query"
import {
  Activity,
  Package,
  FileText,
  Users,
  UserCircle,
  ShoppingBag,
  Plus,
  Pencil,
  Trash2,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Clock,
  AlertCircle,
  Filter,
} from "lucide-react"
import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { PageHeader, PageShell } from "@/components/page-shell"
import { EmptyState } from "@/components/empty-state"
import { cn } from "@/lib/utils"

const AMBER = "var(--primary)"

type EntityType = "all" | "product" | "invoice" | "customer" | "user"

const entityFilters: { key: EntityType; label: string }[] = [
  { key: "all", label: "الكل" },
  { key: "product", label: "المنتجات" },
  { key: "invoice", label: "الفواتير" },
  { key: "customer", label: "العملاء" },
  { key: "user", label: "المستخدمين" },
]

const actionIcons: Record<string, typeof Plus> = {
  create: Plus,
  update: Pencil,
  delete: Trash2,
}
const actionColors: Record<string, string> = {
  create: "text-success bg-success/10 dark:bg-success/20 dark:text-success",
  update: "text-warning bg-warning/10 dark:bg-warning/20 dark:text-warning",
  delete: "text-destructive bg-destructive/10 dark:bg-destructive/20 dark:text-destructive",
}
const actionLabels: Record<string, string> = {
  create: "إضافة",
  update: "تعديل",
  delete: "حذف",
}

const entityIcons: Record<string, typeof Package> = {
  product: Package,
  invoice: FileText,
  customer: Users,
  user: UserCircle,
}

const entityLabels: Record<string, string> = {
  product: "منتج",
  invoice: "فاتورة",
  customer: "عميل",
  user: "مستخدم",
}

function timeAgo(date: string): string {
  const diff = Date.now() - new Date(date).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "الآن"
  if (mins < 60) return `منذ ${mins} دقيقة`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `منذ ${hours} ساعة`
  const days = Math.floor(hours / 24)
  if (days < 7) return `منذ ${days} يوم`
  return new Date(date).toLocaleDateString("ar-SA")
}

export default function ActivityPage() {
  const [entity, setEntity] = useState<EntityType>("all")
  const [page, setPage] = useState(1)

  const queryKey = ["activity", entity, page]

  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey,
    queryFn: () => {
      const params = new URLSearchParams()
      if (entity !== "all") params.set("entity", entity)
      params.set("page", String(page))
      return fetch(`/api/activity?${params}`).then((r) => r.json())
    },
    refetchInterval: 30_000,
  })

  const handleFilter = useCallback((key: EntityType) => {
    setEntity(key)
    setPage(1)
  }, [])

  const logs: any[] = data?.data ?? []
  const totalPages = data?.totalPages ?? 1

  return (
    <PageShell>
      <PageHeader
        title="سجل النشاطات"
        subtitle={data?.total != null ? `${data.total} نشاط` : undefined}
        action={
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isRefetching}
          >
            <RefreshCw className={cn("w-4 h-4 ml-1.5", isRefetching && "animate-spin")} />
            تحديث
          </Button>
        }
      />

      {/* Filter tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
        {entityFilters.map((f) => (
          <button
            key={f.key}
            onClick={() => handleFilter(f.key)}
            className={cn(
              "px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200",
              entity === f.key
                ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25"
                : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {error ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <AlertCircle className="w-12 h-12 mb-3 text-destructive" />
          <p className="text-sm font-medium text-foreground mb-2">فشل التحميل</p>
          <Button variant="secondary" size="sm" onClick={() => refetch()}>
            إعادة المحاولة
          </Button>
        </div>
      ) : isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-20 bg-card border border-border rounded-xl animate-pulse" />
          ))}
        </div>
      ) : logs.length === 0 ? (
        <EmptyState
          icon={Activity}
          title="لا توجد نشاطات بعد"
          description="لم يتم تسجيل أي نشاط في النظام بعد"
        />
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-2"
          >
            {logs.map((log: any) => {
              const ActionIcon = actionIcons[log.action] || Pencil
              const EntityIcon = entityIcons[log.entity] || Activity
              return (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="group flex items-start gap-4 bg-card border border-border rounded-xl p-4 hover:shadow-sm transition-all duration-200"
                >
                  {/* Timeline dot with icon */}
                  <div className="relative flex flex-col items-center shrink-0">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center shadow-sm",
                        actionColors[log.action] || "text-gray-600 bg-gray-50"
                      )}
                    >
                      <ActionIcon className="w-4 h-4" />
                    </div>
                    {/* Vertical line connector */}
                    <div className="w-px flex-1 bg-border min-h-[2px] mt-2" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm text-foreground">
                        {log.user?.name || "مستخدم"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {actionLabels[log.action] || log.action}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <EntityIcon className="w-3 h-3" />
                        {entityLabels[log.entity] || log.entity}
                      </span>
                    </div>
                    {log.details && (
                      <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                        {log.details}
                      </p>
                    )}
                  </div>

                  {/* Time */}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0 pt-1 whitespace-nowrap">
                    <Clock className="w-3 h-3" />
                    {timeAgo(log.createdAt)}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronRight className="w-4 h-4 ml-1" />
                السابق
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={cn(
                      "w-8 h-8 rounded-md text-sm font-medium transition-all duration-200",
                      p === page
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                التالي
                <ChevronLeft className="w-4 h-4 mr-1" />
              </Button>
            </div>
          )}
        </>
      )}
    </PageShell>
  )
}
