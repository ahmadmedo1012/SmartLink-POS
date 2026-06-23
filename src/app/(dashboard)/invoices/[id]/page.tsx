"use client"

import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowRight, Printer, Download, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useCurrency } from "@/lib/currency"

const statusConfig: Record<string, { label: string; variant: "success" | "warning" | "danger" }> = {
  completed: { label: "مكتملة", variant: "success" },
  refunded: { label: "مسترجع", variant: "danger" },
  partial: { label: "جزئية", variant: "warning" },
}

const metaRows = (inv: any) => [
  { label: "رقم الفاتورة", value: `#${inv.invoiceNo}` },
  { label: "التاريخ", value: new Date(inv.createdAt).toLocaleDateString("ar-SA") },
  { label: "البائع", value: inv.user?.name },
  { label: "العميل", value: inv.customer?.name || "نقدي" },
]

export default function InvoiceDetailPage() {
  const { id } = useParams() as { id: string }
  const { formatCurrency } = useCurrency()

  const { data: invoice, isLoading } = useQuery({
    queryKey: ["invoice", id],
    queryFn: () => fetch(`/api/invoices/${id}`).then((r) => r.json()),
  })

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-6">
        <div className="h-96 bg-muted rounded-2xl animate-pulse" />
      </div>
    )
  }

  if (!invoice) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-6 text-center text-muted-foreground text-sm">
        الفاتورة غير موجودة
      </div>
    )
  }

  const remaining = Number(invoice.grandTotal) - Number(invoice.paid)
  const st = statusConfig[invoice.status] || { label: invoice.status, variant: "default" as const }

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 space-y-8" dir="rtl">
      {/* Back + actions */}
      <div className="flex items-center justify-between">
        <Link
          href="/invoices"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          العودة إلى الفواتير
        </Link>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => window.open(`/api/invoices/pdf?id=${id}`, "_blank", "noopener,noreferrer")}
          >
            <Printer className="w-4 h-4" />
            طباعة
            <span className="sr-only">(يفتح في نافذة جديدة)</span>
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => window.open(`/api/invoices/pdf?id=${id}`, "_blank", "noopener,noreferrer")}
          >
            <Download className="w-4 h-4" />
            PDF
            <span className="sr-only">(يفتح في نافذة جديدة)</span>
          </Button>
        </div>
      </div>

      {/* Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
          <FileText className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gradient-amber">
            #{invoice.invoiceNo}
          </h1>
          <p className="text-sm text-muted-foreground">فاتورة</p>
        </div>
      </div>

      {/* Meta card */}
      <Card>
        <CardContent className="p-0 divide-y divide-border">
          {metaRows(invoice).map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-4 px-6 py-3.5 first:rounded-t-2xl last:rounded-b-2xl"
            >
              <span className="w-28 shrink-0 text-sm text-muted-foreground">
                {item.label}
              </span>
              <span className="text-sm font-medium text-foreground">{item.value}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Items */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-4 rounded-full bg-primary" />
          المنتجات
        </h2>
        <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">#</TableHead>
                <TableHead>المنتج</TableHead>
                <TableHead className="text-right">الكمية</TableHead>
                <TableHead className="text-right">السعر</TableHead>
                <TableHead className="text-right">الإجمالي</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoice.items?.map((item: any, i: number) => (
                <TableRow key={item.id}>
                  <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                  <TableCell className="font-medium">
                    {item.product?.nameAr || item.product?.name}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {item.quantity}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatCurrency(Number(item.price))}
                  </TableCell>
                  <TableCell className="text-right font-semibold tabular-nums">
                    {formatCurrency(Number(item.total))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Totals */}
      <div className="flex justify-end">
        <div className="w-72 space-y-1.5">
          {[
            { label: "الإجمالي", value: invoice.total },
            { label: "الخصم", value: invoice.discount },
            { label: "الضريبة", value: invoice.tax },
          ].map((item) => (
            <div key={item.label} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{item.label}</span>
              <span className="tabular-nums">{formatCurrency(Number(item.value))}</span>
            </div>
          ))}
          <div className="border-t border-border pt-2 mt-1.5 flex justify-between text-sm font-bold">
            <span>الصافي</span>
            <span className="text-primary tabular-nums">
              {formatCurrency(Number(invoice.grandTotal))}
            </span>
          </div>

          {/* Payments */}
          <div className="border-t border-border pt-2 mt-3 space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">المدفوع</span>
              <span className="tabular-nums">{formatCurrency(Number(invoice.paid))}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">المتبقي</span>
              <span className="tabular-nums">{formatCurrency(remaining)}</span>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-sm text-muted-foreground">الحالة</span>
              <Badge variant={st.variant}>{st.label}</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
