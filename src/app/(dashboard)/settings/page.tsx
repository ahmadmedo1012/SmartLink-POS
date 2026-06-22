"use client"

import { useEffect, useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { cn } from "@/lib/utils"
import {
  Palette,
  Sun,
  Moon,
  Monitor,
  Building2,
  Printer,
  Users,
  Shield,
  Edit3,
  Trash2,
  Save,
  Search,
} from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { PageShell, PageHeader } from "@/components/page-shell"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

/* ─── Interfaces ─── */
interface CompanySettings {
  name: string
  address: string
  phone: string
  taxId: string
  printCopies: string
  printSize: string
}

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "cashier"
  isActive: boolean
}

type ThemeMode = "light" | "dark" | "system"

const AMBER = "var(--primary)"

const defaultSettings: CompanySettings = {
  name: "منظومتي",
  address: "",
  phone: "",
  taxId: "",
  printCopies: "1",
  printSize: "A4",
}

const themeOptions: { value: ThemeMode; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "فاتح", icon: Sun },
  { value: "dark", label: "مظلم", icon: Moon },
  { value: "system", label: "النظام", icon: Monitor },
]

/* ─── Animations ─── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.8, 0.25, 1] as const },
  },
}

/* ─── Section Card Wrapper ─── */
function SectionCard({
  icon: Icon,
  title,
  desc,
  children,
  variants,
}: {
  icon: typeof Sun
  title: string
  desc: string
  children: React.ReactNode
  variants?: typeof itemVariants
}) {
  return (
    <motion.div variants={variants || itemVariants}>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-sm shadow-primary/20">
              <Icon className="size-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">{title}</h2>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </motion.div>
  )
}

/* ─── Shimmer rows ─── */
function ShimmerRow() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="shimmer mb-4 h-5 w-32 rounded-lg" />
      <div className="space-y-3">
        <div className="shimmer h-11 w-full rounded-xl" />
        <div className="shimmer h-11 w-full rounded-xl" />
      </div>
    </div>
  )
}

/* ─── Page ─── */
export default function SettingsPage() {
  const queryClient = useQueryClient()
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<ThemeMode>("system")
  const [company, setCompany] = useState<CompanySettings>(defaultSettings)
  const [saving, setSaving] = useState(false)
  const [editUser, setEditUser] = useState<User | null>(null)
  const [editName, setEditName] = useState("")
  const [editRole, setEditRole] = useState("")
  const [deleteConfirm, setDeleteConfirm] = useState<User | null>(null)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("settings")
    if (saved) setCompany(JSON.parse(saved))
    const t = localStorage.getItem("theme") as ThemeMode | null
    if (t) {
      setTheme(t)
      applyTheme(t)
    } else {
      const sys = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      document.documentElement.classList.toggle("dark", sys === "dark")
    }
  }, [])

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetch("/api/users").then((r) => r.json()),
  })

  const applyTheme = (mode: ThemeMode) => {
    if (mode === "system") {
      const sys = window.matchMedia("(prefers-color-scheme: dark)").matches
      document.documentElement.classList.toggle("dark", sys)
    } else {
      document.documentElement.classList.toggle("dark", mode === "dark")
    }
  }

  const saveSettings = () => {
    setSaving(true)
    localStorage.setItem("settings", JSON.stringify(company))
    localStorage.setItem("theme", theme)
    setTimeout(() => {
      setSaving(false)
      toast.success("تم حفظ الإعدادات")
    }, 300)
  }

  const toggleUser = async (user: User) => {
    await fetch("/api/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: user.id, isActive: !user.isActive }),
    })
    queryClient.invalidateQueries({ queryKey: ["users"] })
    toast.success(`تم ${user.isActive ? "تعطيل" : "تفعيل"} المستخدم`)
  }

  if (!mounted) {
    return (
      <div dir="rtl" className="mx-auto max-w-4xl p-6">
        <div className="mb-2">
          <div className="shimmer h-8 w-32 rounded-lg" />
          <div className="shimmer mt-2 h-4 w-48 rounded-md" />
        </div>
        <div className="mt-6 space-y-5">
          {[1, 2, 3, 4].map((i) => (
            <ShimmerRow key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <PageShell>
      <motion.div
        dir="rtl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <PageHeader
          title="الإعدادات"
          subtitle="تخصيص النظام وإدارة الشركة"
        />

        {/* ── Theme ── */}
        <SectionCard icon={Palette} title="المظهر" desc="اختر نمط العرض المناسب">
          <div className="flex gap-1 rounded-xl bg-muted p-1">
            {themeOptions.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setTheme(value)
                  applyTheme(value)
                }}
                className={cn(
                  "flex flex-1 h-10 items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--ring)]/50 focus-visible:outline-offset-2",
                  theme === value
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="size-4" />
                {label}
              </button>
            ))}
          </div>
        </SectionCard>

        {/* ── Company Info ── */}
        <SectionCard
          icon={Building2}
          title="بيانات الشركة"
          desc="تظهر هذه البيانات في الفواتير والتقارير"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="company-name" className="text-xs font-medium text-muted-foreground">اسم الشركة</label>
              <Input
                id="company-name"
                value={company.name}
                onChange={(e) => setCompany({ ...company, name: e.target.value })}
                placeholder="اسم الشركة"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="company-phone" className="text-xs font-medium text-muted-foreground">الهاتف</label>
              <Input
                id="company-phone"
                value={company.phone}
                onChange={(e) => setCompany({ ...company, phone: e.target.value })}
                placeholder="رقم الهاتف"
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label htmlFor="company-address" className="text-xs font-medium text-muted-foreground">العنوان</label>
              <Input
                id="company-address"
                value={company.address}
                onChange={(e) => setCompany({ ...company, address: e.target.value })}
                placeholder="عنوان الشركة"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="company-taxId" className="text-xs font-medium text-muted-foreground">الرقم الضريبي</label>
              <Input
                id="company-taxId"
                value={company.taxId}
                onChange={(e) => setCompany({ ...company, taxId: e.target.value })}
                placeholder="الرقم الضريبي"
              />
            </div>
          </div>
        </SectionCard>

        {/* ── Print Settings ── */}
        <SectionCard
          icon={Printer}
          title="إعدادات الطباعة"
          desc="تخصيص طباعة الفواتير"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="print-size" className="text-xs font-medium text-muted-foreground">حجم الورق</label>
              <select
                id="print-size"
                value={company.printSize}
                onChange={(e) => setCompany({ ...company, printSize: e.target.value })}
                className="flex h-11 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground transition-colors duration-150 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 cursor-pointer appearance-none"
              >
                <option value="A4">A4</option>
                <option value="A5">A5</option>
                <option value="80mm">80mm (حراري)</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="print-copies" className="text-xs font-medium text-muted-foreground">عدد النسخ</label>
              <Input
                id="print-copies"
                type="number"
                min={1}
                max={10}
                value={company.printCopies}
                onChange={(e) => setCompany({ ...company, printCopies: e.target.value })}
              />
            </div>
          </div>
        </SectionCard>

        {/* ── Users ── */}
        <SectionCard
          icon={Users}
          title="المستخدمين"
          desc={users?.length ? `${users.length} مستخدم${users.length !== 1 ? "ين" : ""}` : "إدارة المستخدمين"}
        >
          {usersLoading ? (
            <div className="py-10 text-center text-muted-foreground">
              <Users className="mx-auto mb-2 size-8 opacity-30" />
              <p className="text-sm">جاري تحميل المستخدمين...</p>
            </div>
          ) : users?.length ? (
            <div className="-mx-2 space-y-0.5">
              {users.map((user: User) => (
                <div
                  key={user.id}
                  className="group flex items-center justify-between rounded-xl px-3 py-3 transition-colors hover:bg-primary-light/50 dark:hover:bg-primary/20"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white text-xs font-bold shadow-sm">
                      {user.name?.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium text-foreground">
                        {user.name}
                      </div>
                      <div className="truncate text-xs text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    {!user.isActive && (
                      <Badge variant="warning" size="sm">
                        معطل
                      </Badge>
                    )}
                    <Badge
                      variant={user.role === "admin" ? "default" : "secondary"}
                      size="sm"
                    >
                      <Shield className="ml-1 size-3" />
                      {user.role === "admin" ? "مدير" : "كاشير"}
                    </Badge>
                    <button
                      type="button"
                      onClick={() => {
                        setEditUser(user)
                        setEditName(user.name)
                        setEditRole(user.role)
                      }}
                      aria-label="تعديل المستخدم"
                      className="flex size-7 items-center justify-center rounded-lg text-muted-foreground opacity-0 transition-all hover:bg-border group-hover:opacity-100 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--ring)]/50 focus-visible:outline-offset-2"
                    >
                      <Edit3 className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirm(user)}
                      aria-label="حذف المستخدم"
                      className="flex size-7 items-center justify-center rounded-lg text-muted-foreground opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--ring)]/50 focus-visible:outline-offset-2"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                    {user.isActive && (
                      <button
                        type="button"
                        onClick={() => toggleUser(user)}
                        className="h-7 cursor-pointer rounded-lg px-2 text-xs text-muted-foreground transition-colors hover:bg-primary-light hover:text-primary focus-visible:outline-2 focus-visible:outline-[var(--ring)]/50 focus-visible:outline-offset-2"
                      >
                        تعطيل
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center text-muted-foreground">
              <Users className="mx-auto mb-2 size-8 opacity-30" />
              <p className="text-sm">لا يوجد مستخدمون</p>
            </div>
          )}
        </SectionCard>

        {/* ── Save ── */}
        <motion.div className="flex justify-end pt-1" variants={itemVariants}>
          <Button onClick={saveSettings} disabled={saving} size="lg">
            <Save className="size-4" />
            {saving ? "جاري الحفظ..." : "حفظ الإعدادات"}
          </Button>
        </motion.div>

        {/* ── Edit User Dialog ── */}
        <Dialog open={!!editUser} onOpenChange={(o) => { if (!o) setEditUser(null) }}>
          <DialogContent className="sm:max-w-sm" dir="rtl">
            <DialogHeader>
              <DialogTitle>تعديل المستخدم</DialogTitle>
              <DialogDescription>تحديث الاسم أو الصلاحية</DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <div className="space-y-1.5">
                <label htmlFor="edit-user-name" className="text-xs font-medium text-muted-foreground">الاسم</label>
                <Input
                  id="edit-user-name"
                  placeholder="الاسم"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="edit-user-role" className="text-xs font-medium text-muted-foreground">الصلاحية</label>
                <select
                  id="edit-user-role"
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="flex h-11 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground transition-colors duration-150 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 cursor-pointer appearance-none"
                >
                  <option value="admin">مدير</option>
                  <option value="cashier">كاشير</option>
                </select>
              </div>
            </div>
            <Button
              className="mt-2 w-full"
              onClick={async () => {
                await fetch("/api/users", {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ id: editUser!.id, name: editName, role: editRole }),
                })
                queryClient.invalidateQueries({ queryKey: ["users"] })
                setEditUser(null)
                toast.success("تم التحديث")
              }}
            >
              حفظ
            </Button>
          </DialogContent>
        </Dialog>

        {/* ── Delete Confirm Dialog ── */}
        <Dialog
          open={!!deleteConfirm}
          onOpenChange={(o) => { if (!o) setDeleteConfirm(null) }}
        >
          <DialogContent className="sm:max-w-sm" dir="rtl">
            <DialogHeader>
              <DialogTitle>حذف المستخدم</DialogTitle>
              <DialogDescription>
                هل أنت متأكد من حذف {deleteConfirm?.name}؟ هذا الإجراء لا يمكن التراجع عنه.
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-3 pt-2">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => setDeleteConfirm(null)}
              >
                إلغاء
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={async () => {
                  try {
                    await fetch("/api/users", {
                      method: "DELETE",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ id: deleteConfirm!.id }),
                    })
                    queryClient.invalidateQueries({ queryKey: ["users"] })
                    toast.success(`تم حذف ${deleteConfirm!.name}`)
                  } catch {
                    toast.error("فشل الحذف")
                  }
                  setDeleteConfirm(null)
                }}
              >
                حذف
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        </motion.div>
      </PageShell>
  )
}
