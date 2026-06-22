"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

/* -------------------------------------------------------------------------- */
/*  Glass card wrapper                                                        */
/* -------------------------------------------------------------------------- */
function GlassCard({ children, className = "", color = "rgba(255,255,255,0.05)" }: { children: React.ReactNode; className?: string; color?: string }) {
  return (
    <div
      className={`backdrop-blur-xl rounded-2xl border border-white/10 ${className}`}
      style={{ background: `linear-gradient(135deg, ${color}, rgba(255,255,255,0.02))` }}
    >
      {children}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Slide data — 7 slides covering the full platform                          */
/* -------------------------------------------------------------------------- */
const slides = [
  {
    id: "welcome",
    accentColor: "#f59e0b",
    bgFrom: "#0c0a00",
    bgVia: "#1a1200",
    bgTo: "#0c0a00",
    gradientCSS: "linear-gradient(135deg, #0c0a00, #1a1200, #0c0a00)",
    title: "قنوات | Smart Link للأعمال",
    subtitle: "نظام متكامل لإدارة المبيعات والمخزون",
    body: "منصة سحابية عربية متكاملة، تجمع كل أدوات إدارة الأعمال في مكان واحد.",
    icon: (
      <img src="/logo-small.png" alt="Smart Link" className="w-8 h-8" />
    ),
    highlights: ["مصممة خصيصاً للأسواق العربية", "واجهة عربية كاملة مع دعم الكتابة من اليمين", "سحابية — اعمل من أي جهاز وفي أي وقت"],
  },
  {
    id: "pos",
    accentColor: "#f97316",
    bgFrom: "#1a0a00",
    bgVia: "#2a1500",
    bgTo: "#1a0a00",
    gradientCSS: "linear-gradient(135deg, #1a0a00, #2a1500, #1a0a00)",
    title: "نظام نقاط البيع",
    subtitle: "متكامل وسريع",
    body: "واجهة بيع احترافية مع دعم الماسح الضوئي للباركود وإضافة المنتجات بسرعة.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-8 h-8">
        <rect x="12" y="10" width="40" height="28" rx="3" stroke="#f97316" strokeWidth="2" fill="rgba(249,115,22,0.1)" />
        <rect x="16" y="16" width="12" height="8" rx="1" stroke="#f97316" strokeWidth="1.5" />
        <path d="M20 44h24l4 10H16l4-10z" stroke="#f97316" strokeWidth="2" />
        <circle cx="32" cy="38" r="3" fill="#f97316" />
      </svg>
    ),
    highlights: ["مسح الباركود — إضافة فورية", "الفواتير النقدية والآجلة", "اختصارات ذكية للوحة المفاتيح"],
  },
  {
    id: "inventory",
    accentColor: "#10b981",
    bgFrom: "#000f08",
    bgVia: "#001f12",
    bgTo: "#000f08",
    gradientCSS: "linear-gradient(135deg, #000f08, #001f12, #000f08)",
    title: "إدارة المخزون",
    subtitle: "تتبع آني وذكي",
    body: "اعرف حالة كل منتج في الوقت الفعلي. تحديث تلقائي للمخزون عند كل عملية بيع.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-8 h-8">
        <rect x="10" y="14" width="20" height="36" rx="3" stroke="#10b981" strokeWidth="2" fill="rgba(16,185,129,0.1)" />
        <rect x="34" y="14" width="20" height="36" rx="3" stroke="#10b981" strokeWidth="2" fill="rgba(16,185,129,0.1)" />
        <path d="M20 24v16M44 24v16" stroke="#10b981" strokeWidth="2" />
      </svg>
    ),
    highlights: ["تحديث المخزون تلقائياً", "تنبيهات انخفاض المخزون", "إدارة الفئات والمنتجات"],
  },
  {
    id: "invoicing",
    accentColor: "#8b5cf6",
    bgFrom: "#0f001a",
    bgVia: "#1f002a",
    bgTo: "#0f001a",
    gradientCSS: "linear-gradient(135deg, #0f001a, #1f002a, #0f001a)",
    title: "الفوترة الإلكترونية",
    subtitle: "فواتير احترافية في ثوانٍ",
    body: "أنشئ فواتير احترافية، صدرها و أرسلها لعملائك مباشرة.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-8 h-8">
        <rect x="14" y="8" width="36" height="48" rx="3" stroke="#8b5cf6" strokeWidth="2" fill="rgba(139,92,246,0.1)" />
        <path d="M22 24h20M22 32h20M22 40h12" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    highlights: ["إنشاء فواتير بلمسة زر", "تصدير للطباعة والإرسال", "إدارة المرتجعات والمبالغ المستردة"],
  },
  {
    id: "analytics",
    accentColor: "#3b82f6",
    bgFrom: "#000f1a",
    bgVia: "#001f2a",
    bgTo: "#000f1a",
    gradientCSS: "linear-gradient(135deg, #000f1a, #001f2a, #000f1a)",
    title: "التقارير والتحليلات",
    subtitle: "قرارات مبنية على بيانات دقيقة",
    body: "لوحة تحكم تفاعلية مع مؤشرات الأداء الرئيسية والرسوم البيانية.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-8 h-8">
        <rect x="10" y="36" width="10" height="18" rx="1.5" stroke="#3b82f6" strokeWidth="2" fill="rgba(59,130,246,0.1)" />
        <rect x="27" y="24" width="10" height="30" rx="1.5" stroke="#3b82f6" strokeWidth="2" fill="rgba(59,130,246,0.1)" />
        <rect x="44" y="14" width="10" height="40" rx="1.5" stroke="#3b82f6" strokeWidth="2" fill="rgba(59,130,246,0.1)" />
        <path d="M12 52h44" stroke="#3b82f6" strokeWidth="1.5" />
      </svg>
    ),
    highlights: ["مؤشرات المبيعات والأرباح", "رسوم بيانية تفاعلية", "أفضل المنتجات مبيعاً آنياً"],
  },
  {
    id: "users",
    accentColor: "#f43f5e",
    bgFrom: "#1a0008",
    bgVia: "#2a0012",
    bgTo: "#1a0008",
    gradientCSS: "linear-gradient(135deg, #1a0008, #2a0012, #1a0008)",
    title: "العملاء والموردين",
    subtitle: "بناء علاقات تجارية قوية",
    body: "سجل كامل للعملاء والموردين مع إدارة الحسابات والمتابعة.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-8 h-8">
        <circle cx="22" cy="22" r="8" stroke="#f43f5e" strokeWidth="2" fill="rgba(244,63,94,0.1)" />
        <circle cx="44" cy="22" r="8" stroke="#f43f5e" strokeWidth="2" fill="rgba(244,63,94,0.1)" />
        <path d="M10 50c0-8 5-14 12-14s12 6 12 14" stroke="#f43f5e" strokeWidth="2" />
        <path d="M32 50c0-8 5-14 12-14" stroke="#f43f5e" strokeWidth="2" />
      </svg>
    ),
    highlights: ["سجل كامل للعملاء", "إدارة الموردين", "صلاحيات متعددة للمستخدمين"],
  },
  {
    id: "security",
    accentColor: "#f59e0b",
    bgFrom: "#0f0a00",
    bgVia: "#1a1200",
    bgTo: "#0f0a00",
    gradientCSS: "linear-gradient(135deg, #0f0a00, #1a1200, #0f0a00)",
    title: "آمن وموثوق",
    subtitle: "بياناتك في أمان تام",
    body: "نظام آمن بتشفير كامل ونسخ احتياطي تلقائي ودعم فني متواصل.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-8 h-8">
        <path d="M32 8L12 18v12c0 14 8 22 20 26 12-4 20-12 20-26V18L32 8z" stroke="#f59e0b" strokeWidth="2" fill="rgba(245,158,11,0.1)" />
        <path d="M24 32l6 6 10-12" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    highlights: ["تشفير كامل وفق أعلى المعايير", "نسخ احتياطي تلقائي", "دعم فني متواصل على مدار الساعة"],
  },
]

/* -------------------------------------------------------------------------- */
/*  Floating particles                                                        */
/* -------------------------------------------------------------------------- */
function Particles({ count = 6 }: { count?: number }) {
  const dots = Array.from({ length: count }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    s: 1 + Math.random() * 3, d: 4 + Math.random() * 6, dl: Math.random() * 4,
    r: Math.random() * 360,
  }))
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s,
            background: "radial-gradient(circle, rgba(251,191,36,0.5), transparent)",
            rotate: p.r,
          }}
          animate={{ y: [0, -20 - Math.random() * 20, 0], opacity: [0, 0.7, 0], scale: [1, 1.5, 1] }}
          transition={{ duration: p.d, repeat: Infinity, delay: p.dl, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Slide Content                                                             */
/* -------------------------------------------------------------------------- */
function SlideInner({ slide, idx }: { slide: typeof slides[0]; idx: number }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVisible(true), 50); return () => clearTimeout(t) }, [])

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-10">
      {/* Icon spring-in */}
      <div className="relative mb-6 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={visible ? { scale: 1, rotate: 0 } : {}}
          transition={{ type: "spring", stiffness: 150, damping: 12 }}
          className="relative w-20 h-20 rounded-3xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${slide.accentColor}, ${slide.accentColor}dd)`,
            boxShadow: `0 0 30px ${slide.accentColor}40, 0 0 60px ${slide.accentColor}20`,
          }}
        >
          {slide.icon}
        </motion.div>
      </div>

      {/* Title — ambery gold */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="text-2xl sm:text-3xl font-extrabold text-center mb-2 tracking-tight"
        style={{ color: "#fbbf24" }}
      >
        {slide.title}
      </motion.h2>

      {/* Highlighted subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="flex items-center gap-2 mb-4"
      >
        <div className="h-px w-8" style={{ background: `linear-gradient(90deg, transparent, ${slide.accentColor})` }} />
        <span className="text-base font-semibold tracking-wide" style={{ color: slide.accentColor }}>{slide.subtitle}</span>
        <div className="h-px w-8" style={{ background: `linear-gradient(90deg, ${slide.accentColor}, transparent)` }} />
      </motion.div>

      {/* Body */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="text-sm text-white/50 text-center max-w-xs mb-6 leading-relaxed"
      >
        {slide.body}
      </motion.p>

      {/* Glass cards — features in white */}
      <div className="w-full max-w-sm space-y-2" dir="rtl">
        {slide.highlights.map((h, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.45 + i * 0.1 }}
          >
            <GlassCard className="flex items-center gap-3 px-4 py-3" color={`${slide.accentColor}08`}>
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: slide.accentColor }} />
              <span className="text-sm text-white leading-relaxed">{h}</span>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Slide number */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
        className="absolute bottom-24 text-[11px] font-mono tracking-widest" style={{ color: `${slide.accentColor}60` }}
      >
        {String(idx + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </motion.div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Timeline dots                                                             */
/* -------------------------------------------------------------------------- */
function Timeline({ current, accentColor, onDot }: { current: number; accentColor: string; onDot: (i: number) => void }) {
  return (
    <div className="absolute bottom-12 left-0 right-0 flex items-center justify-center gap-2 z-10">
      {slides.map((_, i) => (
        <button key={i} onClick={() => onDot(i)}
          className="rounded-full transition-all duration-500 cursor-pointer"
          style={{
            width: i === current ? 24 : 5, height: 5,
            background: i === current ? accentColor : "rgba(255,255,255,0.15)",
          }}
          aria-label={`شريحة ${i + 1}`}
        />
      ))}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Main Component                                                            */
/* -------------------------------------------------------------------------- */
export function BrandIntroFallback() {
  const [current, setCurrent] = useState(0)
  const [auto, setAuto] = useState(true)

  const slide = slides[current]

  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), [])
  const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), [])

  useEffect(() => {
    if (!auto) return
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [auto, next])

  return (
    <div className="relative w-full h-full overflow-hidden cursor-default" style={{ background: slide.gradientCSS }}>
      {/* Static background glow */}
      <div className="absolute inset-0">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{ background: `radial-gradient(circle, ${slide.accentColor}15 0%, transparent 60%)` }}
        />
        <div
          className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full"
          style={{ background: `radial-gradient(circle, ${slide.accentColor}08 0%, transparent 60%)` }}
        />
      </div>

      <Particles count={6} />

      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          <SlideInner slide={slide} idx={current} />
        </motion.div>
      </AnimatePresence>

      {/* Timeline */}
      <Timeline current={current} accentColor={slide.accentColor} onDot={(i) => { setAuto(false); setCurrent(i) }} />

      {/* Controls */}
      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3 z-20">
        <button onClick={() => { setAuto(false); prev() }}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
          aria-label="السابق">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button onClick={() => setAuto(!auto)}
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all cursor-pointer backdrop-blur-sm"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}
          aria-label={auto ? "إيقاف" : "تشغيل"}>
          {auto ? "⏸" : "▶"}
        </button>
        <button onClick={() => { setAuto(false); next() }}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
          aria-label="التالي">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>
    </div>
  )
}
