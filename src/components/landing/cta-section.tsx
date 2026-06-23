"use client"

import { ArrowLeft } from "lucide-react"
import { ScrollReveal } from "./scroll-reveal"

export default function CtaSection() {
  return (
    <section id="cta" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-amber-50/60 to-amber-50/30 dark:from-stone-950 dark:via-amber-950/20 dark:to-stone-950" />
      <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-accent/10 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <span className="mb-4 inline-block rounded-full border border-amber-200/60 bg-amber-50 px-4 py-1.5 text-xs font-semibold text-amber-700 dark:border-amber-800/40 dark:bg-amber-900/30 dark:text-amber-300">
            ابدأ الآن مجاناً
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            جهز أعمالك للانطلاق مع{" "}
            <span className="text-gradient-amber">Smart Link</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg max-w-2xl mx-auto">
            انضم إلى مئات الشركات التي تثق بـ الربط الذكي. نظام متكامل يدير
            مبيعاتك، مخزونك، فواتيرك، وتقاريرك — كل ذلك في منصة واحدة.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="/login"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 text-base font-semibold text-white shadow-lg shadow-amber-500/25 transition-all duration-200 hover:from-amber-600 hover:to-amber-700 hover:shadow-xl hover:shadow-amber-500/30 active:scale-[0.97] cursor-pointer"
            >
              ابدأ الآن مجاناً
              <ArrowLeft className="h-5 w-5" />
            </a>
            <a
              href="#features"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-white/60 px-8 text-base font-medium text-foreground backdrop-blur-sm transition-all duration-200 hover:bg-white hover:shadow-md dark:bg-stone-900/60 dark:hover:bg-stone-900 cursor-pointer"
            >
              اكتشف المميزات
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <span>لا يحتاج بطاقة بنكية</span>
            <span>إلغاء في أي وقت</span>
            <span>دعم فني 24/7</span>
            <span>تحديثات مستمرة</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
