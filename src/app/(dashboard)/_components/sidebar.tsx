"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { useState } from "react"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  FolderTree,
  Users,
  Truck,
  FileText,
  Receipt,
  BarChart3,
  Settings,
  LogOut,
  PanelLeftClose,
  Menu,
  PackageSearch,
  RotateCcw,
  Activity,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/pos", label: "نقطة البيع", icon: ShoppingCart },
  { href: "/products", label: "المنتجات", icon: Package },
  { href: "/inventory", label: "المخزون", icon: PackageSearch },
  { href: "/returns", label: "المرتجعات", icon: RotateCcw },
  { href: "/activity", label: "النشاطات", icon: Activity },
  { href: "/categories", label: "الفئات", icon: FolderTree },
  { href: "/customers", label: "العملاء", icon: Users },
  { href: "/suppliers", label: "الموردين", icon: Truck },
  { href: "/invoices", label: "الفواتير", icon: FileText },
  { href: "/expenses", label: "المصروفات", icon: Receipt },
  { href: "/reports", label: "التقارير", icon: BarChart3 },
  { href: "/settings", label: "الإعدادات", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  const sidebarNav = (
    <nav className="flex-1 overflow-auto p-3 space-y-1">
      {navItems.map((item) => {
        const active = isActive(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            title={collapsed ? item.label : undefined}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-linear focus-visible:outline-2 focus-visible:outline-[var(--ring)]/50 focus-visible:outline-offset-2 relative",
              collapsed ? "justify-center px-2" : "",
              active
                ? "bg-primary-light dark:bg-primary/20 text-primary"
                : "text-sidebar-foreground hover:text-primary hover:bg-muted"
            )}
            onClick={() => setMobileOpen(false)}
          >
            {active && (
              <motion.span
                layoutId="sidebar-active"
                className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <item.icon
              className={cn(
                "w-[18px] h-[18px] shrink-0",
                active ? "text-primary" : "text-muted-foreground"
              )}
            />
            {!collapsed && <span className="truncate">{item.label}</span>}
          </Link>
        )
      })}
    </nav>
  )

  const sidebarBottom = (
    <div className="p-3 border-t border-sidebar-border space-y-1">
      {!collapsed && session?.user && (
        <div className="px-3 py-2">
          <p className="text-sm font-medium text-sidebar-foreground truncate">
            {session.user.name || "مستخدم"}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {session.user.email}
          </p>
        </div>
      )}
      <button
        onClick={() => setCollapsed(!collapsed)}
        aria-label="طي القائمة"
        className="hidden md:flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm text-sidebar-foreground hover:text-primary hover:bg-muted transition-all duration-200 ease-linear focus-visible:outline-2 focus-visible:outline-[var(--ring)]/50 focus-visible:outline-offset-2"
      >
        <PanelLeftClose
          className={cn(
            "w-[18px] h-[18px] shrink-0 text-muted-foreground transition-transform duration-200",
            collapsed && "rotate-180"
          )}
        />
        {!collapsed && "طي القائمة"}
      </button>
      <button
        onClick={() => signOut()}
        aria-label="تسجيل الخروج"
        className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-destructive transition-all duration-200 ease-linear focus-visible:outline-2 focus-visible:outline-[var(--ring)]/50 focus-visible:outline-offset-2"
      >
        <LogOut className="w-[18px] h-[18px] shrink-0" />
        {!collapsed && "تسجيل الخروج"}
      </button>
    </div>
  )

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        aria-label="القائمة"
        className="md:hidden fixed top-3 right-3 z-50 flex items-center justify-center w-10 h-10 rounded-md bg-sidebar border border-sidebar-border shadow-sm focus-visible:outline-2 focus-visible:outline-[var(--ring)]/50 focus-visible:outline-offset-2"
      >
        <Menu className="w-[18px] h-[18px] text-muted-foreground" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setMobileOpen(false)}
        >
          <aside
            className="w-64 h-full bg-sidebar border-l border-sidebar-border flex flex-col overflow-hidden focus-visible:outline-2 focus-visible:outline-[var(--ring)]/50 focus-visible:outline-offset-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Logo */}
            <div className="flex items-center gap-2.5 px-5 h-16 border-b border-sidebar-border shrink-0">
              <img src="/logo.png" alt="Smart Link" className="h-7 w-auto" />
              <div className="flex flex-col">
                <span className="font-bold text-lg text-gradient-amber leading-tight">
                  قنوات
                </span>
                <span className="text-[10px] text-muted-foreground leading-tight -mt-0.5">
                  Smart Link
                </span>
              </div>
            </div>
            <nav className="flex-1 overflow-auto p-3 space-y-1">
              {navItems.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-linear focus-visible:outline-2 focus-visible:outline-[var(--ring)]/50 focus-visible:outline-offset-2",
                      active
                        ? "bg-primary-light text-primary border-r-2 border-primary"
                        : "text-sidebar-foreground hover:text-primary hover:bg-muted"
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    <item.icon
                      className={cn(
                        "w-[18px] h-[18px] shrink-0",
                        active ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                    <span className="truncate">{item.label}</span>
                  </Link>
                )
              })}
            </nav>
            {/* Mobile bottom */}
            <div className="p-3 border-t border-sidebar-border space-y-1">
              {session?.user && (
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">
                    {session.user.name || "مستخدم"}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {session.user.email}
                  </p>
                </div>
              )}
              <button
                onClick={() => signOut()}
                aria-label="تسجيل الخروج"
                className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-destructive transition-all duration-200 ease-linear focus-visible:outline-2 focus-visible:outline-[var(--ring)]/50 focus-visible:outline-offset-2"
              >
                <LogOut className="w-[18px] h-[18px] shrink-0" />
                تسجيل الخروج
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 80 : 256 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden md:flex bg-sidebar border-l border-sidebar-border h-screen flex-col shrink-0 overflow-hidden"
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-5 border-b border-sidebar-border shrink-0">
          <motion.div layout className="flex items-center gap-2.5 w-full" transition={{ duration: 0.3, ease: "easeInOut" }}>
            <img src="/logo.png" alt="Smart Link" className={cn("w-auto", collapsed ? "h-7" : "h-7")} />
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col"
              >
                <span className="font-bold text-lg text-gradient-amber leading-tight">
                  قنوات
                </span>
                <span className="text-[10px] text-muted-foreground leading-tight -mt-0.5">
                  Smart Link
                </span>
              </motion.div>
            )}
          </motion.div>
        </div>

        {sidebarNav}
        {sidebarBottom}

        {/* Brand strip at bottom when collapsed */}
        {collapsed && (
          <div className="px-3 pb-2 shrink-0">
            <div className="flex items-center justify-center w-full py-2 rounded-md bg-gradient-to-br from-primary/5 to-accent/5 border border-sidebar-border/50">
              <img src="/logo.png" alt="Smart Link" className="h-5 w-auto" />
            </div>
          </div>
        )}
      </motion.aside>
    </>
  )
}
