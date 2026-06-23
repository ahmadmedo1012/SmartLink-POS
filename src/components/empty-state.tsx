"use client"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { Button } from "./ui/button"
import { AnimatedEmptyBox } from "./lottie/animated-icons"

interface EmptyStateProps { icon?: LucideIcon; title: string; description?: string; action?: { label: string; onClick: () => void } }

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col items-center justify-center py-28 px-6 select-none"
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-18 h-18 rounded-[17px] bg-gradient-to-b from-muted to-secondary flex items-center justify-center mb-6 shadow-card ring-1 ring-border/40"
      >
        {Icon ? (
          <Icon className="w-8 h-8 text-muted-foreground/80" strokeWidth={1.5} />
        ) : (
          <AnimatedEmptyBox size={36} />
        )}
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="text-xl font-semibold text-foreground/90 tracking-tight"
      >
        {title}
      </motion.p>
      {description && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-sm mt-2.5 text-muted-foreground max-w-[260px] text-center leading-relaxed"
        >
          {description}
        </motion.p>
      )}
      {action && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.25 }}
          className="mt-7"
        >
          <Button variant="accent" size="sm" className="shadow-md shadow-primary/15 hover:shadow-lg hover:shadow-glow" onClick={action.onClick}>
            {action.label}
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}
