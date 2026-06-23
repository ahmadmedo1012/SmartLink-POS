"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBF6F0] p-4">
      <div className="text-center max-w-sm">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-destructive/80 to-destructive flex items-center justify-center mx-auto mb-6 shadow-lg shadow-destructive/20">
          <AlertCircle className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">حدث خطأ غير متوقع</h1>
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          عذراً، حدث خطأ أثناء تحميل هذه الصفحة. حاول مرة أخرى أو عد إلى الرئيسية.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button variant="accent" size="sm" onClick={reset}>
            إعادة المحاولة
          </Button>
          <a
            href="/"
            className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-white px-4 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            العودة إلى الرئيسية
          </a>
        </div>
      </div>
    </div>
  )
}
