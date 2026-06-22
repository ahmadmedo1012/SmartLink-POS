"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus, Receipt, Wallet, Search, AlertCircle } from "lucide-react"
import { useState, useMemo } from "react"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useCurrency } from "@/lib/currency"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import { PageShell, PageHeader } from "@/components/page-shell"

// ---------------------------------------------------------------------------
// Category tags
// ---------------------------------------------------------------------------
const categories = [
  "عام", "إيجار", "كهرباء", "مياه", "مرتبات", "صيانة", "تسويق", "نقل",
]

const categoryVariant: Record<string, "default" | "secondary" | "success" | "warning" | "danger"> = {
  عام:    "secondary",
  إيجار:  "danger",
  كهرباء: "default",
  مياه:   "success",
  مرتبات: "warning",
  صيانة:  "secondary",
  تسويق:  "danger",
  نقل:    "default",
}

const categoryDot: Record<string, string> = {
  عام:    "bg-muted-foreground",
  إيجار:  "bg-destructive",
  كهرباء: "bg-primary",
  مياه:   "bg-success",
  مرتبات: "bg-warning",
  صيانة:  "bg-muted-foreground",
  تسويق:  "bg-destructive",
  نقل:    "bg-primary",
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ExpensesPage() {
  const qc = useQueryClient()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const init = { description: "", amount: "", category: "عام" }
  const [form, setForm] = useState(init)
  const { formatCurrency } = useCurrency()

  const { data: expenses, isLoading, error, refetch } = useQuery({
    queryKey: ["expenses"],
    queryFn: () => fetch("/api/expenses").then((r) => r.json()),
  })

  const save = useMutation({
    mutationFn: (d: any) =>
      fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(d),
      }).then((r) => r.json()),
    onSuccess: () => {
      toast.success("تمت الإضافة")
      setOpen(false)
      setForm(init)
      qc.invalidateQueries({ queryKey: ["expenses"] })
    },
  })

  const total =
    expenses?.reduce((s: number, e: any) => s + Number(e.amount), 0) || 0

  const filtered = useMemo(() => {
    if (!expenses) return []
    if (!search.trim()) return expenses
    const q = search.toLowerCase()
    return expenses.filter(
      (e: any) =>
        e.description?.toLowerCase().includes(q) ||
        e.category?.toLowerCase().includes(q),
    )
  }, [expenses, search])

  return (
    <PageShell>
      <PageHeader
        title="المصروفات"
        subtitle={`${expenses?.length || 0} عملية`}
        action={
          <Button onClick={() => setOpen(true)}>
            <Plus className="w-4 h-4" />
            إضافة مصروف
          </Button>
        }
      />

      {/* ── Summary Card (Amber Theme) ── */}
      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
            <Wallet className="w-6 h-6 text-primary" />
          </div>
          <div>
            <div className="text-xs font-medium text-muted-foreground tracking-wide">
              إجمالي المصروفات
            </div>
            <div className="text-2xl font-bold text-foreground tracking-tight mt-0.5">
              {formatCurrency(total)}
            </div>
            <div className="text-xs text-muted-foreground/70 mt-0.5">
              جميع المصروفات المسجلة
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Search ── */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="بحث في المصروفات..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pr-10"
        />
      </div>

      {/* ── Expenses Table ── */}
      {error ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <AlertCircle className="w-12 h-12 mb-3 text-destructive" />
          <p className="text-sm font-medium text-foreground mb-2">فشل التحميل</p>
          <Button variant="secondary" size="sm" onClick={() => refetch()}>إعادة المحاولة</Button>
        </div>
      ) : isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-12 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>البيان</TableHead>
                <TableHead>التصنيف</TableHead>
                <TableHead className="text-left">المبلغ</TableHead>
                <TableHead>التاريخ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-16 text-muted-foreground">
                    <Receipt className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">
                      {search ? "لا توجد نتائج" : "لا توجد مصروفات"}
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((e: any) => (
                  <TableRow key={e.id}>
                    <TableCell className="font-medium text-foreground">
                      {e.description}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={categoryVariant[e.category] || "secondary"}
                        className="gap-1.5 rounded-full px-3 py-0.5 text-xs font-medium"
                      >
                        <span
                          className={`inline-block w-2 h-2 rounded-full shrink-0 ${categoryDot[e.category] || "bg-muted-foreground"}`}
                        />
                        {e.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-left">
                      <span className="text-sm font-semibold text-destructive">
                        {formatCurrency(Number(e.amount))}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(e.createdAt).toLocaleDateString("ar-EG", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* ── Add Expense Dialog ── */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle>إضافة مصروف</DialogTitle>
            <DialogDescription>
              أدخل بيانات المصروف الجديد
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                البيان
              </label>
              <Input
                placeholder="وصف المصروف"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                المبلغ
              </label>
              <Input
                placeholder="0.00"
                type="number"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                التصنيف
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="flex h-10 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors duration-150 focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" className="flex-1" onClick={() => setOpen(false)}>
              إلغاء
            </Button>
            <Button
              onClick={() => save.mutate({ ...form, amount: Number(form.amount) })}
              disabled={save.isPending || !form.description || !form.amount}
              className="flex-1"
            >
              {save.isPending ? "جاري الحفظ..." : "حفظ المصروف"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </PageShell>
  )
}
