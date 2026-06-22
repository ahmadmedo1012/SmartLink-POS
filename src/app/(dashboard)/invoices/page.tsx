"use client"

import { useState, useEffect, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { FileText, Search, Download, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { PageHeader, PageShell } from "@/components/page-shell"
import { EmptyState } from "@/components/empty-state"
import { downloadCSV } from "@/lib/csv"
import { formatCurrency } from "@/lib/currency"

const STATUS_BADGE: Record<string, { label: string; variant: "success" | "danger" | "warning" }> = {
  completed: { label: "مكتملة", variant: "success" },
  refunded: { label: "مسترجع", variant: "danger" },
  partial: { label: "جزئية", variant: "warning" },
}

export default function InvoicesPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const { data: invoices, isLoading, error, refetch } = useQuery({
    queryKey: ["invoices", search, page],
    queryFn: () => fetch(`/api/invoices?search=${search}&page=${page}&pageSize=20`).then((r) => r.json()),
    refetchInterval: 10000,
  })

  useEffect(() => setPage(1), [search])

  const totalPages = invoices?.pages || 1

  const pageNumbers = useMemo(() => {
    const pages: (number | "ellipsis")[] = []
    const maxVisible = 5
    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      let start = Math.max(2, page - 1)
      let end = Math.min(totalPages - 1, page + 1)
      if (start > 2) pages.push("ellipsis")
      for (let i = start; i <= end; i++) pages.push(i)
      if (end < totalPages - 1) pages.push("ellipsis")
      pages.push(totalPages)
    }
    return pages
  }, [totalPages, page])

  return (
    <PageShell>
      <PageHeader
        title={<span className="text-gradient-amber">الفواتير</span>}
        subtitle={`${invoices?.total || 0} فاتورة`}
        action={
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled={!invoices?.invoices?.length}
              onClick={() => {
                if (!invoices?.invoices) return
                downloadCSV(
                  ["رقم الفاتورة", "العميل", "الإجمالي", "الحالة", "التاريخ"],
                  invoices.invoices.map((inv: any) => [
                    inv.invoiceNo,
                    inv.customer?.name || "نقدي",
                    inv.grandTotal,
                    STATUS_BADGE[inv.status]?.label || inv.status,
                    new Date(inv.createdAt).toLocaleDateString("ar-SA"),
                  ]),
                  "invoices.csv",
                )
              }}
            >
              <Download className="w-4 h-4 ml-1" /> CSV
            </Button>
          </div>
        }
      />

      <div className="relative max-w-xs">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="بحث في الفواتير..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pr-10"
        />
      </div>

      {error ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <AlertCircle className="w-12 h-12 mb-3 text-destructive" />
          <p className="text-sm font-medium text-foreground mb-2">فشل التحميل</p>
          <Button variant="secondary" size="sm" onClick={() => refetch()}>إعادة المحاولة</Button>
        </div>
      ) : isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-12 rounded-lg shimmer" />
          ))}
        </div>
      ) : invoices?.invoices?.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="لا توجد فواتير"
          description={search ? "لا توجد نتائج مطابقة للبحث" : "لم يتم إنشاء أي فواتير بعد"}
          action={
            !search
              ? { label: "بدء فاتورة جديدة", onClick: () => router.push("/pos") }
              : undefined
          }
        />
      ) : (
        <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم الفاتورة</TableHead>
                <TableHead>العميل</TableHead>
                <TableHead>المستخدم</TableHead>
                <TableHead>الإجمالي</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>التاريخ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices?.invoices?.map((inv: any) => {
                const badge = STATUS_BADGE[inv.status]
                return (
                  <TableRow
                    key={inv.id}
                    tabIndex={0}
                    className="cursor-pointer group focus-visible:outline-2 focus-visible:outline-[var(--ring)]/50 focus-visible:outline-offset-2"
                    onClick={() => router.push(`/invoices/${inv.id}`)}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); router.push(`/invoices/${inv.id}`); } }}
                  >
                    <TableCell>
                      <span className="text-primary hover:underline font-medium text-sm group-hover:text-primary-hover transition-colors">
                        #{inv.invoiceNo}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm">
                      {inv.customer?.name || "—"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {inv.user?.name}
                    </TableCell>
                    <TableCell className="font-semibold tabular-nums">
                      {formatCurrency(Number(inv.grandTotal))}
                    </TableCell>
                    <TableCell>
                      {badge ? (
                        <Badge variant={badge.variant} size="sm">
                          {badge.label}
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">{inv.status}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(inv.createdAt).toLocaleDateString("ar-SA")}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/30">
              <span className="text-xs text-muted-foreground">
                الصفحة {page} من {totalPages}
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  aria-label="الصفحة السابقة"
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                {pageNumbers.map((p, i) =>
                  p === "ellipsis" ? (
                    <span key={`e-${i}`} className="px-1 text-xs text-muted-foreground">...</span>
                  ) : (
                    <Button
                      key={p}
                      variant={p === page ? "default" : "ghost"}
                      size="sm"
                      className={`h-8 min-w-8 px-0 text-xs ${p === page ? "" : ""}`}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </Button>
                  ),
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  aria-label="الصفحة التالية"
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </PageShell>
  )
}
