"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { AnimatedLoadingDots } from "@/components/lottie/animated-icons"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function LoginPage() {
  const [email, setEmail] = useState("admin@pos.com")
  const [password, setPassword] = useState("admin123")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const result = await signIn("credentials", { email, password, redirect: false })
    setLoading(false)
    if (result?.error) {
      toast.error("خطأ في البريد الإلكتروني أو كلمة المرور")
    } else {
      router.push("/")
    }
  }

  return (
    <div id="main-content" className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Subtle brand decoration */}
      <div className="pointer-events-none absolute -top-40 right-1/2 h-[500px] w-[500px] translate-x-1/2 rounded-full bg-gradient-to-br from-primary/8 via-accent/5 to-transparent blur-3xl dark:from-primary/10 dark:via-accent/5" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-gradient-to-tl from-primary/5 to-transparent blur-3xl dark:from-primary/8" />
      {/* Grid pattern overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(217,119,6,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(217,119,6,0.03)_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(rgba(245,158,11,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.04)_1px,transparent_1px)]" />
      <div className="w-full max-w-[380px] relative">
        {/* Brand Header */}
        <div className="text-center mb-9">
          <div className="mx-auto mb-5 w-auto flex items-center justify-center">
            <img src="/logo.png" alt="Smart Link" className="max-w-[200px] h-auto" />
          </div>
          <h1 className="text-[28px] font-bold text-gradient-amber leading-tight font-sans">
            قنوات
          </h1>
          <p className="text-[13px] text-muted-foreground mt-1.5">
            Smart Link للأعمال
          </p>
          <p className="text-[11px] text-muted-foreground/60 mt-2 leading-relaxed max-w-[260px] mx-auto">
            نظام متكامل لإدارة المبيعات والمخزون ونقاط البيع
          </p>
        </div>

        {/* Login Card */}
        <Card className="shadow-modal">
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-1">
                <label htmlFor="email" className="text-[12px] font-medium text-muted-foreground tracking-wide uppercase">
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-muted-foreground pointer-events-none" strokeWidth={1.5} />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pr-[38px] h-11 text-sm"
                    placeholder="admin@pos.com"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <label htmlFor="password" className="text-[12px] font-medium text-muted-foreground tracking-wide uppercase">
                  كلمة المرور
                </label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-muted-foreground pointer-events-none" strokeWidth={1.5} />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-[38px] pl-10 h-11 text-sm"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="w-[16px] h-[16px]" strokeWidth={1.5} />
                    ) : (
                      <Eye className="w-[16px] h-[16px]" strokeWidth={1.5} />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                variant="accent"
                size="lg"
                className="w-full h-11 text-[14px] font-medium mt-1"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <AnimatedLoadingDots size={20} />
                    جاري التحميل...
                  </span>
                ) : (
                  "تسجيل الدخول"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-[11px] text-muted-foreground mt-8 flex items-center justify-center gap-1.5">
          <img src="/logo.png" alt="Smart Link" className="h-3.5 w-auto inline-block" />
          &copy; {new Date().getFullYear()} قنوات | Smart Link. جميع الحقوق محفوظة.
        </p>
      </div>
    </div>
  )
}
