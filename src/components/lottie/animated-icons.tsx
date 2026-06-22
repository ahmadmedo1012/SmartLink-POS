"use client"

import { motion } from "framer-motion"

type IconProps = {
  size?: number
  className?: string
}

/**
 * PageTransition — subtle fade+slide-up for page content.
 * Respects prefers-reduced-motion via framer-motion defaults.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

/* ponytail: removed AnimatedCheckmark — YAGNI, never imported */

/* -------------------------------------------------------------------------- */
/*  AnimatedSpinner — pulsing amber circles rotating                          */
/* -------------------------------------------------------------------------- */
export function AnimatedSpinner({ size = 48, className }: IconProps) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <motion.circle
        cx="24" cy="24" r="18"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="4"
        strokeDasharray="90"
        strokeLinecap="round"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="24" cy="6"
        r="4"
        fill="var(--primary)"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  )
}

/* -------------------------------------------------------------------------- */
/*  AnimatedEmptyBox — bouncing box for empty states                          */
/* -------------------------------------------------------------------------- */
export function AnimatedEmptyBox({ size = 48, className }: IconProps) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
    >
      {/* box body */}
      <motion.rect
        x="8" y="16" width="32" height="24" rx="3"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="2.5"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* lid */}
      <motion.path
        d="M8 16l4-8h24l4 8"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ d: ["M8 16l4-8h24l4 8", "M8 14l4-8h24l4 8", "M8 16l4-8h24l4 8"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* question mark */}
      <motion.text
        x="24" y="32"
        textAnchor="middle"
        fill="var(--primary)"
        fontSize="14"
        fontWeight="bold"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        ?
      </motion.text>
    </motion.svg>
  )
}

/* ponytail: removed AnimatedSuccess — YAGNI, never imported */

/* -------------------------------------------------------------------------- */
/*  AnimatedLoadingDots — three bouncing dots                                 */
/* -------------------------------------------------------------------------- */
export function AnimatedLoadingDots({ size = 48, className }: IconProps) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {[0, 1, 2].map((i) => {
        const cx = 12 + i * 12
        return (
          <motion.circle
            key={i}
            cx={cx}
            cy="24"
            r="4"
            fill="var(--primary)"
            animate={{
              y: [0, -8, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        )
      })}
    </motion.svg>
  )
}
