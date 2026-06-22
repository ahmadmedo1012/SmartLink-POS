"use client"

import { motion } from "framer-motion"

interface HeroLottieProps {
  size?: number
  className?: string
}

export function HeroLottie({ size = 400, className }: HeroLottieProps) {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 400 400" className="w-full h-full" aria-hidden>
        {/* Dashboard mockup frame */}
        <motion.rect
          x="40" y="40" width="320" height="320" rx="20"
          fill="none" stroke="var(--primary)" strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1 }}
        />
        {/* Animated bar chart */}
        {[80, 120, 60, 140, 100].map((h, i) => (
          <motion.rect
            key={i}
            x={70 + i * 55} y={320 - h} width="35" height={h} rx="6"
            fill="var(--primary)"
            initial={{ height: 0, y: 320 }}
            animate={{ height: h, y: 320 - h }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: "easeOut" }}
          />
        ))}
        {/* Pulse rings */}
        <motion.circle
          cx="200" cy="120" r="40"
          fill="var(--primary)" opacity="0.1"
          animate={{ r: [40, 50, 40], opacity: [0.1, 0.05, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="200" cy="120" r="25"
          fill="none" stroke="var(--primary)" strokeWidth="2" opacity="0.2"
          animate={{ r: [25, 35, 25], opacity: [0.2, 0.1, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </svg>
    </motion.div>
  )
}
