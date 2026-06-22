"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Store,
  ShoppingCart,
  Package,
  FileText,
  BarChart3,
  Users,
  Shield,
  Sparkles,
} from "lucide-react"

/* -------------------------------------------------------------------------- */
/*  Glass card wrapper                                                        */
/* -------------------------------------------------------------------------- */
function GlassCard({
  children,
  className = "",
  color = "rgba(255,255,255,0.05)",
}: {
  children: React.ReactNode
  className?: string
  color?: string
}) {
  return (
    <div
      className={`backdrop-blur-xl rounded-2xl border border-white/10 ${className}`}
      style={{
        background: `linear-gradient(135deg, ${color}, rgba(255,255,255,0.02))`,
      }}
    >
      {children}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Slide data — 8 slides                                                     */
/* -------------------------------------------------------------------------- */
const slides = [
  {
    id: "welcome",
    accentColor: "#f59e0b",
    bgFrom: "#0c0a00",
    bgVia: "#1a1200",
    bgTo: "#0c0a00",
    title: "مرحباً بك في Smart Link للأعمال",
    subtitle: "منصة متكاملة لإدارة أعمالك",
    body: "كل ما تحتاجه لإدارة المبيعات والمخزون والعملاء في مكان واحد.",
    icon: Store,
    highlights: [
      "منصة سحابية متكاملة",
      "واجهة عربية كاملة",
      "صُممت خصيصاً للأسواق العربية",
    ],
  },
  {
    id: "pos",
    accentColor: "#f97316",
    bgFrom: "#1a0a00",
    bgVia: "#2a1500",
    bgTo: "#1a0a00",
    title: "نظام نقاط البيع",
    subtitle: "بيع سريع ومتكامل",
    body: "واجهة بيع احترافية تدعم الماسح الضوئي والاختصارات الذكية.",
    icon: ShoppingCart,
    highlights: [
      "مسح الباركود وإضافة فورية",
      "فواتير نقدية وآجلة",
      "اختصارات لوحة المفاتيح",
    ],
  },
  {
    id: "inventory",
    accentColor: "#10b981",
    bgFrom: "#000f08",
    bgVia: "#001f12",
    bgTo: "#000f08",
    title: "إدارة المخزون",
    subtitle: "تتبع آني وذكي",
    body: "اعرف حالة كل منتج في الوقت الفعلي. تحديث تلقائي للمخزون.",
    icon: Package,
    highlights: [
      "تحديث المخزون تلقائياً",
      "تنبيهات انخفاض المخزون",
      "إدارة الفئات والمنتجات",
    ],
  },
  {
    id: "invoicing",
    accentColor: "#8b5cf6",
    bgFrom: "#0f001a",
    bgVia: "#1f002a",
    bgTo: "#0f001a",
    title: "الفوترة الإلكترونية",
    subtitle: "فواتير احترافية في ثوانٍ",
    body: "أنشئ فواتير احترافية، صدرها وأرسلها لعملائك مباشرة.",
    icon: FileText,
    highlights: [
      "إنشاء فواتير بلمسة زر",
      "تصدير للطباعة والإرسال",
      "إدارة المرتجعات والمبالغ المستردة",
    ],
  },
  {
    id: "reports",
    accentColor: "#3b82f6",
    bgFrom: "#000f1a",
    bgVia: "#001f2a",
    bgTo: "#000f1a",
    title: "التقارير والتحليلات",
    subtitle: "قرارات مبنية على بيانات",
    body: "لوحة تحكم تفاعلية مع مؤشرات الأداء الرئيسية والرسوم البيانية.",
    icon: BarChart3,
    highlights: [
      "مؤشرات المبيعات والأرباح",
      "رسوم بيانية تفاعلية",
      "أفضل المنتجات مبيعاً",
    ],
  },
  {
    id: "customers",
    accentColor: "#f43f5e",
    bgFrom: "#1a0008",
    bgVia: "#2a0012",
    bgTo: "#1a0008",
    title: "إدارة العملاء",
    subtitle: "بناء علاقات تجارية قوية",
    body: "سجل كامل للعملاء مع إدارة الحسابات والمتابعة.",
    icon: Users,
    highlights: [
      "سجل كامل للعملاء",
      "إدارة الموردين",
      "تقارير ولاء العملاء",
    ],
  },
  {
    id: "security",
    accentColor: "#f59e0b",
    bgFrom: "#0f0a00",
    bgVia: "#1a1200",
    bgTo: "#0f0a00",
    title: "آمن وموثوق",
    subtitle: "بياناتك في أمان تام",
    body: "نظام آمن بتشفير كامل ونسخ احتياطي تلقائي ودعم فني متواصل.",
    icon: Shield,
    highlights: [
      "تشفير كامل وفق أعلى المعايير",
      "نسخ احتياطي تلقائي",
      "دعم فني 24 ساعة",
    ],
  },
  {
    id: "closing",
    accentColor: "#fbbf24",
    bgFrom: "#0c0a00",
    bgVia: "#1f1700",
    bgTo: "#0c0a00",
    title: "ابدأ الآن",
    subtitle: "انضم إلى مئات الشركات الناجحة",
    body: "حوّل طريقة إدارة أعمالك مع Smart Link. ابدأ مجاناً اليوم.",
    icon: Sparkles,
    highlights: [
      "ابدأ مجاناً — لا حاجة لبطاقة بنكية",
      "دعم فني متواصل على مدار الساعة",
      "تحديثات مستمرة وتحسينات دائمة",
    ],
  },
]

/* -------------------------------------------------------------------------- */
/*  Floating particles                                                        */
/* -------------------------------------------------------------------------- */
function Particles({ count = 8 }: { count?: number }) {
  const dots = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 80,
    s: 1.5 + Math.random() * 3,
    d: 5 + Math.random() * 7,
    dl: Math.random() * 5,
  }))

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
            background:
              "radial-gradient(circle, rgba(251,191,36,0.6), transparent)",
          }}
          animate={{
            y: [0, -(20 + Math.random() * 30), 0],
            opacity: [0, 0.8, 0],
            scale: [1, 1.5 + Math.random(), 1],
          }}
          transition={{
            duration: p.d,
            repeat: Infinity,
            delay: p.dl,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Progress bar                                                              */
/* -------------------------------------------------------------------------- */
function ProgressBar({
  current,
  total,
  accentColor,
}: {
  current: number
  total: number
  accentColor: string
}) {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 h-1">
      <div
        className="h-full transition-all duration-500 ease-out"
        style={{
          width: `${((current + 1) / total) * 100}%`,
          background: `linear-gradient(90deg, ${accentColor}, ${accentColor}80)`,
          boxShadow: `0 0 12px ${accentColor}60`,
        }}
      />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Slide Content                                                             */
/* -------------------------------------------------------------------------- */
function SlideInner({
  slide,
  idx,
}: {
  slide: (typeof slides)[0]
  idx: number
}) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [])

  const Icon = slide.icon

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-10">
      {/* Icon spring-in */}
      <div className="relative mb-6 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={visible ? { scale: 1, rotate: 0 } : {}}
          transition={{ type: "spring", stiffness: 150, damping: 12 }}
          className="relative flex h-20 w-20 items-center justify-center rounded-3xl"
          style={{
            background: `linear-gradient(135deg, ${slide.accentColor}, ${slide.accentColor}dd)`,
            boxShadow: `0 0 30px ${slide.accentColor}40, 0 0 60px ${slide.accentColor}20`,
          }}
        >
          <Icon className="h-9 w-9 text-white" />
        </motion.div>
      </div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mb-2 text-center text-2xl font-extrabold tracking-tight sm:text-3xl"
        style={{ color: "#fbbf24" }}
      >
        {slide.title}
      </motion.h2>

      {/* Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mb-4 flex items-center gap-2"
      >
        <div
          className="h-px w-8"
          style={{
            background: `linear-gradient(90deg, transparent, ${slide.accentColor})`,
          }}
        />
        <span
          className="text-base font-semibold tracking-wide"
          style={{ color: slide.accentColor }}
        >
          {slide.subtitle}
        </span>
        <div
          className="h-px w-8"
          style={{
            background: `linear-gradient(90deg, ${slide.accentColor}, transparent)`,
          }}
        />
      </motion.div>

      {/* Body */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="mb-6 max-w-xs text-center text-sm leading-relaxed text-white/50"
      >
        {slide.body}
      </motion.p>

      {/* Glass cards — feature bullets */}
      <div className="w-full max-w-sm space-y-2" dir="rtl">
        {slide.highlights.map((h, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.45 + i * 0.1 }}
          >
            <GlassCard
              className="flex items-center gap-3 px-4 py-3"
              color={`${slide.accentColor}08`}
            >
              <div
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ background: slide.accentColor }}
              />
              <span className="text-sm leading-relaxed text-white">{h}</span>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Slide number */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
        className="absolute bottom-24 font-mono text-[11px] tracking-widest"
        style={{ color: `${slide.accentColor}60` }}
      >
        {String(idx + 1).padStart(2, "0")} /{" "}
        {String(slides.length).padStart(2, "0")}
      </motion.div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Progress dots                                                             */
/* -------------------------------------------------------------------------- */
function ProgressDots({
  current,
  accentColor,
  onDot,
}: {
  current: number
  accentColor: string
  onDot: (i: number) => void
}) {
  return (
    <div className="absolute bottom-12 left-0 right-0 z-10 flex items-center justify-center gap-2">
      {slides.map((_, i) => (
        <button
          key={i}
          onClick={() => onDot(i)}
          className="cursor-pointer rounded-full transition-all duration-500"
          style={{
            width: i === current ? 24 : 5,
            height: 5,
            background:
              i === current ? accentColor : "rgba(255,255,255,0.15)",
          }}
          aria-label={`شريحة ${i + 1}`}
        />
      ))}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Controls                                                                  */
/* -------------------------------------------------------------------------- */
function Controls({
  auto,
  onToggleAuto,
  onPrev,
  onNext,
}: {
  auto: boolean
  onToggleAuto: () => void
  onPrev: () => void
  onNext: () => void
}) {
  return (
    <div className="absolute bottom-4 left-0 right-0 z-20 flex items-center justify-center gap-3">
      <button
        onClick={() => {
          onPrev()
        }}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full backdrop-blur-sm transition-all"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
        aria-label="السابق"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        onClick={onToggleAuto}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-xs backdrop-blur-sm transition-all"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "rgba(255,255,255,0.6)",
        }}
        aria-label={auto ? "إيقاف" : "تشغيل"}
      >
        {auto ? "⏸" : "▶"}
      </button>
      <button
        onClick={() => {
          onNext()
        }}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full backdrop-blur-sm transition-all"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
        aria-label="التالي"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Main Component                                                            */
/* -------------------------------------------------------------------------- */
export function PremiumWalkthrough() {
  const [current, setCurrent] = useState(0)
  const [auto, setAuto] = useState(true)

  const slide = slides[current]

  const next = useCallback(
    () => setCurrent((p) => (p + 1) % slides.length),
    [],
  )
  const prev = useCallback(
    () => setCurrent((p) => (p - 1 + slides.length) % slides.length),
    [],
  )

  useEffect(() => {
    if (!auto) return
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [auto, next])

  return (
    <div
      className="relative h-full w-full overflow-hidden cursor-default"
      style={{ background: slide.bgFrom }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `linear-gradient(135deg, ${slide.bgFrom}, ${slide.bgVia}, ${slide.bgTo})`,
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Ambient glow */}
        <div
          className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: `radial-gradient(circle, ${slide.accentColor}15 0%, transparent 60%)`,
          }}
        />
        <div
          className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${slide.accentColor}08 0%, transparent 60%)`,
          }}
        />
      </motion.div>

      {/* Particles */}
      <Particles count={8} />

      {/* Progress bar */}
      <ProgressBar
        current={current}
        total={slides.length}
        accentColor={slide.accentColor}
      />

      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <SlideInner slide={slide} idx={current} />
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <ProgressDots
        current={current}
        accentColor={slide.accentColor}
        onDot={(i) => {
          setAuto(false)
          setCurrent(i)
        }}
      />

      {/* Controls */}
      <Controls
        auto={auto}
        onToggleAuto={() => setAuto(!auto)}
        onPrev={() => {
          setAuto(false)
          prev()
        }}
        onNext={() => {
          setAuto(false)
          next()
        }}
      />
    </div>
  )
}
