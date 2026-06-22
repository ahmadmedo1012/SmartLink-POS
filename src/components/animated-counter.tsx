"use client"

import { useEffect, useRef, useState } from "react"

interface AnimatedCounterProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

export function AnimatedCounter({ value, duration = 600, prefix = "", suffix = "", decimals = 0, className = "" }: AnimatedCounterProps) {
  const [display, setDisplay] = useState(0)
  const startRef = useRef(performance.now())
  const rafRef = useRef<number>(0)

  useEffect(() => {
    startRef.current = performance.now()
    const from = display

    function tick(now: number) {
      const elapsed = now - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      // ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress)
      setDisplay(from + (value - from) * eased)
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration])

  return <span className={className}>{prefix}{display.toFixed(decimals)}{suffix}</span>
}
