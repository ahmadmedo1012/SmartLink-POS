"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "react-hot-toast"
import { useState, useEffect } from "react"
import { CurrencyProvider } from "@/lib/currency"
import { playClick, playSuccess, playError } from "@/lib/sounds"

function ThemeInit() {
  useEffect(() => {
    const stored = localStorage.getItem("theme") as string | null
    if (stored === "dark" || stored === "light") {
      document.documentElement.classList.toggle("dark", stored === "dark")
    } else {
      const sys = window.matchMedia("(prefers-color-scheme: dark)").matches
      document.documentElement.classList.toggle("dark", sys)
    }
  }, [])
  return null
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest("button, a[role=button]")
      if (btn) playClick()
    }
    document.addEventListener("click", handler)
    return () => document.removeEventListener("click", handler)
  }, [])

  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <QueryClientProvider client={queryClient}>
        <CurrencyProvider>
          <ThemeInit />
          {children}
          <Toaster
            position="bottom-left"
            toastOptions={{
              style: {
                borderRadius: 10,
                background: '#fff',
                color: '#1a1a2e',
                boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 8px 20px rgba(0,0,0,0.06)',
                fontSize: 14,
                fontFamily: 'Tajawal, Inter, sans-serif',
                padding: '12px 16px',
                border: '1px solid #e2e6ee',
              },
              success: { iconTheme: { primary: '#22a67e', secondary: '#fff' } },
              error: { iconTheme: { primary: '#dc3c4c', secondary: '#fff' } },
              duration: 3000,
            }}
          />
        </CurrencyProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
