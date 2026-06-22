"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"
import { AnimatedCounter } from "@/components/animated-counter"
import { ScrollReveal } from "./scroll-reveal"

const stats = [
  { label: "مستخدم نشط", value: 12500, suffix: "+", decimals: 0 },
  { label: "معاملة يومياً", value: 45000, suffix: "+", decimals: 0 },
  { label: "منتج مُدار", value: 280000, suffix: "+", decimals: 0 },
  { label: "سنوات خبرة", value: 8, suffix: "+", decimals: 0 },
]

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    if (inView && !triggered) setTriggered(true)
  }, [inView, triggered])

  return (
    <section id="stats" className="relative py-24 sm:py-28" ref={ref}>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 dark:from-amber-700 dark:via-amber-800 dark:to-amber-700" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.12)_0%,_transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            أرقام تتحدث عن نفسها
          </h2>
          <p className="mt-3 text-sm text-amber-100/80 sm:text-base">
            ثقة آلاف العملاء هي الدافع الأكبر لتقديم الأفضل
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="flex flex-col items-center text-center">
                <span className="text-4xl font-extrabold text-white sm:text-5xl">
                  {triggered ? (
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                      duration={800}
                    />
                  ) : (
                    "0"
                  )}
                </span>
                <span className="mt-2 text-sm font-medium text-amber-100/70">
                  {stat.label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
