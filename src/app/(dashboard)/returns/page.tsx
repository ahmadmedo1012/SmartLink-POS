"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { RotateCcw, Search, AlertCircle, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageShell, PageHeader } from "@/components/page-shell"
import { EmptyState } from "@/components/empty-state"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { formatCurrency } from "@/lib/currency"

export default function ReturnsPage() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedInvoiceId, setSelectedInvoiceId] = useState("")
  const [reason, setReason] = useState("")
  const [returnItems, setReturnItems] = useState<Record<string, { quantity: number; price: number; total: number }>>({})

  const { data: returns, isLoading, error, refetch } = useQuery({
    queryKey: ["returns", search],
    queryFn: () => fetch(`/api/returns?search=${search}&pageSize=100`).then((r) => r.json()),
    refetchInterval: 10000,
  })

  const { data: invoices } = useQuery({
    queryKey: ["invoices", "list"],
    queryFn: () => fetch("/api/invoices?pageSize=100").then((r) => r.json()),
    enabled: dialogOpen,
  })

  const { data: selectedInvoice } = useQuery({
    queryKey: ["invoice", selectedInvoiceId],
    queryFn: () => fetch(`/api/invoices/${selectedInvoiceId}`).then((r) => r.json()),
    enabled: !!selectedInvoiceId,
  })

  const { data: session } = useSession()

  const createMutation = useMutation({
    mutationFn: (body: any) =>
      fetch("/api/returns", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).then((r) => {
        if (!r.ok) return r.json().then((e) => Promise.reject(e))
        return r.json()
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["returns"] })
      resetDialog()
      setDialogOpen(false)
    },
  })

  function resetDialog() {
    setSelectedInvoiceId("")
    setReason("")
    setReturnItems({})
  }

  function handleInvoiceSelect(invoiceId: string) {
    setSelectedInvoiceId(invoiceId)
    setReturnItems({})
  }

  function toggleItem(productId: string, price: number) {
    setReturnItems((prev) => {
      if (prev[productId]) {
        const next = { ...prev }
        delete next[productId]
        return next
      }
      return { ...prev, [productId]: { quantity: 1, price, total: price } }
    })
  }

  function updateReturnQty(productId: string, qty: number, price: number) {
    setReturnItems((prev) => ({
      ...prev,
      [productId]: { quantity: qty, price, total: qty * price },
    }))
  }

  const returnTotal = Object.values(returnItems).reduce((s, i) => s + i.total, 0)

  function handleSubmit() {
    const items = Object.entries(returnItems).map(([productId, data]) => ({
      productId,
      quantity: data.quantity,
      price: data.price,
      total: data.total,
    }))
    createMutation.mutate({
      invoiceId: selectedInvoiceId,
      userId: session?.user?.id,
      reason,
      items,
    })
  }

  return (
    <PageShell>
      <PageHeader
        title={<span className="text-gradient-amber">المرتجعات</span>}
        subtitle={`${returns?.total || 0} مرتجع`}
        action={
          <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetDialog() }}>
            <DialogTrigger render={<Button variant="accent" size="sm"><Plus className="w-4 h-4 ml-1" />إرجاع</Button>} />
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>إرجاع منتجات</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">اختر الفاتورة</label>
                  <select
                    className="w-full bg-background text-foreground rounded-xl px-4 py-2.5 text-sm border border-input focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/35"
                    value={selectedInvoiceId}
                    onChange={(e) => handleInvoiceSelect(e.target.value)}
                  >
                    <option value="">-- اختر فاتورة --</option>
                    {invoices?.invoices?.map((inv: any) => (
                      <option key={inv.id} value={inv.id}>
                        #{inv.invoiceNo} - {formatCurrency(Number(inv.grandTotal))} - {inv.customer?.name || "نقدي"}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedInvoice && (
                  <>
                    <div className="border border-border rounded-xl p-4 bg-muted/30">
                      <p className="text-sm text-muted-foreground mb-2">
                        فاتورة #{selectedInvoice.invoiceNo} &bull; {new Date(selectedInvoice.createdAt).toLocaleDateString("ar-SA")}
                      </p>
                      <div className="space-y-2">
                        {selectedInvoice.items?.map((item: any) => {
                          const productName = item.product?.nameAr || item.product?.name || item.productId
                          const checked = !!returnItems[item.productId]
                          const maxQty = item.quantity
                          return (
                            <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleItem(item.productId, Number(item.price))}
                                className="w-4 h-4 rounded border-input accent-primary"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">{productName}</p>
                                <p className="text-xs text-muted-foreground">
                                  {formatCurrency(Number(item.price))} &times; {item.quantity}
                                </p>
                              </div>
                              {checked && (
                                <div className="flex items-center gap-2 shrink-0">
                                  <input
                                    type="number"
                                    min={1}
                                    max={maxQty}
                                    value={returnItems[item.productId]?.quantity || 1}
                                    onChange={(e) => updateReturnQty(item.productId, Math.min(maxQty, Math.max(1, Number(e.target.value))), Number(item.price))}
                                    className="w-16 bg-background text-foreground rounded-lg px-2 py-1 text-sm border border-input text-center"
                                  />
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">سبب الإرجاع</label>
                      <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        rows={2}
                        className="w-full bg-background text-foreground rounded-xl px-4 py-2.5 text-sm border border-input focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/35 resize-none"
                        placeholder="اختياري"
                      />
                    </div>

                    <div className="text-left">
                      <span className="text-sm text-muted-foreground">الإجمالي: </span>
                      <span className="text-lg font-bold text-foreground">{formatCurrency(returnTotal)}</span>
                    </div>
                  </>
                )}
              </div>
              <DialogFooter>
                <Button variant="secondary" size="sm" onClick={() => { setDialogOpen(false); resetDialog() }}>إلغاء</Button>
                <Button
                  variant="default"
                  size="sm"
                  disabled={!selectedInvoiceId || Object.keys(returnItems).length === 0 || createMutation.isPending}
                  loading={createMutation.isPending}
                  onClick={handleSubmit}
                >
                  تأكيد الإرجاع
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="relative max-w-xs">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="بحث في المرتجعات..."
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
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-12 rounded-lg shimmer" />
          ))}
        </div>
      ) : returns?.returns?.length === 0 ? (
        <EmptyState
          icon={RotateCcw}
          title="لا توجد مرتجعات"
          description="لم يتم تسجيل أي مرتجعات بعد"
          action={{ label: "إضافة مرتجع", onClick: () => setDialogOpen(true) }}
        />
      ) : (
        <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>الفاتورة</TableHead>
                <TableHead>السبب</TableHead>
                <TableHead>عدد المنتجات</TableHead>
                <TableHead>الإجمالي</TableHead>
                <TableHead>المستخدم</TableHead>
                <TableHead>التاريخ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {returns?.returns?.map((ret: any) => (
                <TableRow key={ret.id}>
                  <TableCell>
                    <span className="text-primary font-medium text-sm">#{ret.id.slice(0, 8)}</span>
                  </TableCell>
                  <TableCell className="text-sm">
                    <span className="font-medium">#{ret.invoice?.invoiceNo}</span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                    {ret.reason || "—"}
                  </TableCell>
                  <TableCell className="text-sm">{ret.items?.length || 0}</TableCell>
                  <TableCell className="font-semibold tabular-nums">{formatCurrency(Number(ret.total))}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{ret.user?.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(ret.createdAt).toLocaleDateString("ar-SA")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </PageShell>
  )
}
