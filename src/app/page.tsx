"use client"

import { useSession } from "next-auth/react"
import DashboardPage from "./(dashboard)/page"
import { LandingPage } from "@/components/landing"
import { AnimatedSpinner } from "@/components/lottie/animated-icons"

export default function Home() {
  const { data: session, status } = useSession()

  if (status === "loading") return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <AnimatedSpinner size={32} />
        <p className="text-sm text-muted-foreground">جاري التحميل...</p>
      </div>
    </div>
  )
  if (!session) return <LandingPage />

  return (
    <div id="main-content" className="flex h-screen overflow-hidden">
      <DashboardPage />
    </div>
  )
}
