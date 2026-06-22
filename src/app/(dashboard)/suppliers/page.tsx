"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Truck, Plus, Phone, Mail, MapPin, AlertCircle, User } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { PageShell, PageHeader } from "@/components/page-shell"
import { EmptyState } from "@/components/empty-state"



function getInitials(name: string) {
  return name
    ?.split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0])
    .join("")
    .toUpperCase() || "?"
}

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.8, 0.25, 1] as const },
  },
}

export default function SuppliersPage() {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const initForm = { name: "", phone: "", email: "", address: "" }
  const [form, setForm] = useState(initForm)

  const { data: suppliers, isLoading, error, refetch } = useQuery({
    queryKey: ["suppliers"],
    queryFn: () => fetch("/api/suppliers").then((r) => r.json()),
  })

  const saveMutation = useMutation({
    mutationFn: (data: any) =>
      fetch("/api/suppliers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),
    onSuccess: () => {
      toast.success("تمت إضافة المورد")
      setOpen(false)
      setForm(initForm)
      queryClient.invalidateQueries({ queryKey: ["suppliers"] })
    },
  })

  return (
    <PageShell>
      <PageHeader
        title="الموردين"
        subtitle={`${suppliers?.length || 0} مورد`}
        action={
          <Button onClick={() => setOpen(true)} className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-sm shadow-primary/25">
            <Plus className="w-4 h-4 ml-1.5" />
            إضافة مورد
          </Button>
        }
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle>إضافة مورد جديد</DialogTitle>
            <DialogDescription>أدخل بيانات المورد</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <Input
              placeholder="الاسم"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
              placeholder="رقم الجوال"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <Input
              placeholder="البريد الإلكتروني"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Input
              placeholder="العنوان"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>
          <Button
            onClick={() => saveMutation.mutate(form)}
            disabled={saveMutation.isPending || !form.name}
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"
          >
            {saveMutation.isPending ? "جاري..." : "حفظ"}
          </Button>
        </DialogContent>
      </Dialog>

      {error ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <AlertCircle className="w-12 h-12 mb-3 text-destructive" />
          <p className="text-sm font-medium text-foreground mb-2">فشل التحميل</p>
          <Button variant="secondary" size="sm" onClick={() => refetch()}>إعادة المحاولة</Button>
        </div>
      ) : isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-44 bg-card border border-border rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : suppliers?.length === 0 ? (
        <EmptyState
          icon={Truck}
          title="لا يوجد موردين"
          description="قم بإضافة مورد جديد للبدء"
          action={{ label: "إضافة مورد", onClick: () => setOpen(true) }}
        />
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {suppliers?.map((s: any) => (
            <motion.div key={s.id} variants={cardVariants}>
              <div className="group bg-card text-card-foreground border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:border-primary/30 dark:hover:border-primary/50 cursor-default">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br from-primary to-accent text-primary-foreground text-sm font-bold shadow-sm shadow-primary/25 select-none">
                    {getInitials(s.name)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm truncate text-foreground">{s.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Truck className="w-3 h-3" />
                      مورد
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5 text-sm border-t border-border/50 pt-3">
                  {s.phone && (
                    <div className="flex items-center gap-2.5 text-muted-foreground group-hover:text-foreground/80 transition-colors duration-200">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-primary-light/50 dark:bg-primary/20 shrink-0">
                        <Phone className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span dir="ltr" className="truncate text-xs">{s.phone}</span>
                    </div>
                  )}
                  {s.email && (
                    <div className="flex items-center gap-2.5 text-muted-foreground group-hover:text-foreground/80 transition-colors duration-200">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-primary-light/50 dark:bg-primary/20 shrink-0">
                        <Mail className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="truncate text-xs">{s.email}</span>
                    </div>
                  )}
                  {s.address && (
                    <div className="flex items-center gap-2.5 text-muted-foreground group-hover:text-foreground/80 transition-colors duration-200">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-primary-light/50 dark:bg-primary/20 shrink-0">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="truncate text-xs">{s.address}</span>
                    </div>
                  )}
                  {!s.phone && !s.email && !s.address && (
                    <div className="text-xs text-muted-foreground italic py-1">لا توجد تفاصيل إضافية</div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </PageShell>
  )
}
