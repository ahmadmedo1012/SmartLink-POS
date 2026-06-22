"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Sidebar } from "./_components/sidebar"
import { AnimatedSpinner } from "@/components/lottie/animated-icons"
import dynamic from "next/dynamic"
const PageTransition = dynamic(() => import("@/components/lottie/animated-icons").then(m => ({ default: m.PageTransition })), { ssr: false })

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  if (status === "loading") return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <AnimatedSpinner size={32} />
        <p className="text-sm text-muted-foreground">جاري التحميل...</p>
      </div>
    </div>
  )
  if (!session) redirect("/login")
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <main id="main-content" className="flex-1 overflow-auto bg-background flex flex-col">
        <div className="flex-1">
          <PageTransition>{children}</PageTransition>
        </div>
        {/* Brand footer */}
        <footer className="border-t border-border px-6 py-3">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span className="flex items-center gap-2"><img src="/logo.png" alt="Smart Link" className="h-4 w-auto" />&copy; {new Date().getFullYear()} قنوات | Smart Link</span>
            <span className="hidden sm:inline">نظام إدارة مبيعات ومخزون متكامل</span>
          </div>
        </footer>
      </main>
    </div>
  )
}
