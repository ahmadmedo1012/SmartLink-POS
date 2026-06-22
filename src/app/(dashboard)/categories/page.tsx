"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { FolderTree, Plus, Package, AlertCircle, Layers } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { PageShell, PageHeader } from "@/components/page-shell"
import { EmptyState } from "@/components/empty-state"

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
}

const AMBER_GRADIENTS = [
  "from-primary/10 via-primary/5 to-transparent",
  "from-primary/10 via-primary/5 to-transparent",
  "from-primary/10 via-primary/5 to-transparent",
  "from-primary/10 via-primary/5 to-transparent",
]

function randomGradient(seed: number) {
  return AMBER_GRADIENTS[seed % AMBER_GRADIENTS.length]
}

export default function CategoriesPage() {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const initForm = { name: "", nameAr: "", description: "" }
  const [form, setForm] = useState(initForm)

  const { data: categories, isLoading, error, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetch("/api/categories").then((r) => r.json()),
  })

  const saveMutation = useMutation({
    mutationFn: (data: any) =>
      fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),
    onSuccess: () => {
      toast.success("تمت إضافة الفئة")
      setOpen(false)
      setForm(initForm)
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
  })

  return (
    <PageShell>
      <PageHeader
        title="الفئات"
        subtitle={`${categories?.length || 0} فئة`}
        action={
          <Button onClick={() => setOpen(true)} className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-sm shadow-primary/25">
            <Plus className="w-4 h-4 ml-1.5" />
            إضافة فئة
          </Button>
        }
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md" dir="rtl">
          <DialogHeader>
            <div className="mx-auto w-12 h-12 rounded-xl bg-primary-light dark:bg-primary/20 flex items-center justify-center mb-2">
              <Layers className="w-6 h-6 text-primary dark:text-primary" />
            </div>
            <DialogTitle className="text-center">إضافة فئة جديدة</DialogTitle>
            <DialogDescription className="text-center">
              أدخل بيانات الفئة الجديدة
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <Input
              placeholder="الاسم (إنجليزي)"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border-border focus-visible:ring-ring"
            />
            <Input
              placeholder="الاسم (عربي)"
              value={form.nameAr}
              onChange={(e) => setForm({ ...form, nameAr: e.target.value })}
              className="border-border focus-visible:ring-ring"
            />
            <textarea
              placeholder="الوصف"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="flex min-h-[60px] w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              rows={3}
            />
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              إلغاء
            </Button>
            <Button
              onClick={() => saveMutation.mutate(form)}
              disabled={saveMutation.isPending || !form.name}
              className="bg-primary hover:bg-primary-hover text-primary-foreground"
            >
              {saveMutation.isPending ? "جاري..." : "حفظ"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {error ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <AlertCircle className="w-12 h-12 mb-3 text-destructive" />
          <p className="text-sm font-medium text-foreground mb-2">فشل التحميل</p>
          <Button variant="secondary" size="sm" onClick={() => refetch()}>
            إعادة المحاولة
          </Button>
        </div>
      ) : isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-[180px] rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : categories?.length === 0 ? (
        <EmptyState
          icon={FolderTree}
          title="لا توجد فئات"
          description="أضف فئة جديدة لتنظيم منتجاتك"
          action={{ label: "إضافة فئة", onClick: () => setOpen(true) }}
        />
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {categories?.map((c: any, idx: number) => (
            <motion.div key={c.id} variants={cardVariants}>
              <Card className="group relative overflow-hidden border-border hover:border-primary/30 dark:hover:border-primary/50 transition-colors">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${randomGradient(idx)} pointer-events-none`}
                />
                <CardContent className="relative p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[10px] bg-primary-light dark:bg-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/30 dark:group-hover:bg-primary/30 transition-colors">
                      <FolderTree className="w-5 h-5 text-primary dark:text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-sm truncate text-foreground">
                        {c.nameAr || c.name}
                      </div>
                      {c.name && (
                        <div className="text-xs text-muted-foreground truncate mt-0.5">
                          {c.name}
                        </div>
                      )}
                    </div>
                    <Badge
                      variant="outline"
                      size="sm"
                      className="shrink-0 flex items-center gap-1 font-medium border-border text-primary bg-card/70"
                    >
                      <Package className="w-3 h-3" />
                      {c._count?.products || 0}
                    </Badge>
                  </div>
                  {c.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {c.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </PageShell>
  )
}
