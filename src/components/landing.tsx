"use client"

import { lazy, Suspense, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, CheckCircle2, Shield, Zap, Play } from "lucide-react"
import { HeroLottie } from "@/components/lottie/lottie-player"
import { BrandIntroFallback } from "@/components/remotion"
// ponytail: Remotion BrandIntro used via fallback for SSR safety

const Features = lazy(() => import("@/components/landing/features"))
const Stats = lazy(() => import("@/components/landing/stats"))
const Footer = lazy(() => import("@/components/landing/footer"))

function SectionFallback() {
  return <div className="py-24" />
}

/* -------------------------------------------------------------------------- */
/*  Navbar                                                                    */
/* -------------------------------------------------------------------------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-stone-950/80 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Smart Link" className="h-9 w-auto" />
          <span className="text-lg font-bold text-foreground">
            قنوات <span className="text-primary">|</span>{" "}
            <span className="text-sm font-medium text-muted-foreground">Smart Link</span>
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            المميزات
          </a>
          <a
            href="#stats"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            إحصائيات
          </a>
          <a
            href="/login"
            className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-amber-500/20 transition-all duration-200 hover:bg-primary-hover hover:shadow-xl hover:shadow-amber-500/25 active:scale-[0.97] cursor-pointer"
          >
            تسجيل الدخول
            <ArrowLeft className="h-4 w-4" />
          </a>
        </div>

        {/* Mobile CTA */}
        <a
          href="/login"
          className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-amber-500/20 transition-all duration-200 hover:bg-primary-hover active:scale-[0.97] md:hidden cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          دخول
        </a>
      </nav>
    </motion.header>
  )
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */
function Hero({ onShowIntro }: { onShowIntro?: () => void }) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
      {/* Gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-amber-50/80 via-white to-white dark:from-stone-950 dark:via-stone-950 dark:to-stone-950" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-br from-amber-400/20 via-amber-300/10 to-transparent blur-3xl dark:from-amber-500/10" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-amber-500/10 via-amber-400/5 to-transparent blur-3xl dark:from-amber-600/8" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text */}
          <div className="text-center lg:text-right">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="mb-4 inline-block rounded-full border border-amber-200/60 bg-amber-50 px-4 py-1.5 text-xs font-semibold text-amber-700 dark:border-amber-800/40 dark:bg-amber-900/30 dark:text-amber-300">
                نظام متكامل لإدارة الأعمال
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
            >
              <span className="text-gradient-amber">Smart Link للأعمال</span>
              <br />
              <span className="text-foreground">
                نظام متكامل لإدارة
                <br />
                المبيعات والمخزون
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              منصة واحدة تجمع بين إدارة نقاط البيع، تتبع المخزون، الفوترة الإلكترونية،
              والتقارير التحليلية — لتنمية أعمالك بذكاء وكفاءة.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
            >
              <a
                href="/login"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 text-base font-semibold text-white shadow-lg shadow-amber-500/25 transition-all duration-200 hover:from-amber-600 hover:to-amber-700 hover:shadow-xl hover:shadow-amber-500/30 active:scale-[0.97] sm:w-auto cursor-pointer"
              >
                ابدأ الآن مجاناً
                <ArrowLeft className="h-5 w-5" />
              </a>
              {onShowIntro && (
                <button
                  onClick={onShowIntro}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-amber-200/60 bg-amber-50/50 px-8 text-base font-medium text-amber-700 backdrop-blur-sm transition-all duration-200 hover:bg-amber-100 hover:shadow-md dark:border-amber-800/40 dark:bg-amber-900/20 dark:text-amber-300 dark:hover:bg-amber-900/30 sm:w-auto cursor-pointer"
                >
                  <Play className="w-4 h-4" />
                  شاهد العرض التقديمي
                </button>
              )}
              <a
                href="#features"
                className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-border bg-white/60 px-8 text-base font-medium text-foreground backdrop-blur-sm transition-all duration-200 hover:bg-white hover:shadow-md dark:bg-stone-900/60 dark:hover:bg-stone-900 sm:w-auto cursor-pointer"
              >
                اكتشف المميزات
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground lg:justify-start"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-success" />
                لا يحتاج بطاقة بنكية
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-success" />
                بياناتك مشفرة
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-success" />
                دعم فني 24/7
              </span>
            </motion.div>
          </div>

          {/* Hero visual — animated SVG dashboard preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative h-[320px] w-[320px] sm:h-[400px] sm:w-[400px] lg:h-[480px] lg:w-[480px]">
              {/* Glow ring */}
              <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/20 via-amber-300/10 to-transparent blur-2xl" />
              {/* Animated preview */}
              <div className="relative flex h-full w-full items-center justify-center">
                <HeroLottie />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  LandingPage — composite export                                            */
/* -------------------------------------------------------------------------- */
export function LandingPage() {
  const [showIntro, setShowIntro] = useState(false)

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <Hero onShowIntro={() => setShowIntro(true)} />

      {/* Remotion / BrandIntro overlay */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setShowIntro(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative w-[90vw] max-w-[500px] aspect-square rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <BrandIntroFallback />
              <button
                onClick={() => setShowIntro(false)}
                className="absolute top-4 left-4 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center text-sm hover:bg-black/60 transition-colors cursor-pointer z-10"
                aria-label="إغلاق"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Suspense fallback={<SectionFallback />}>
        <Features />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Stats />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>
    </div>
  )
}
