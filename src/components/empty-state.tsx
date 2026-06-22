"use client"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { Button } from "./ui/button"
import { AnimatedEmptyBox } from "./lottie/animated-icons"

interface EmptyStateProps { icon?: LucideIcon; title: string; description?: string; action?: { label: string; onClick: () => void } }

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="flex flex-col items-center justify-center py-24 px-6">
      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-5 ring-1 ring-border/50">
        {Icon ? <Icon className="w-8 h-8 text-muted-foreground" strokeWidth={1.5} /> : <AnimatedEmptyBox size={32} />}
      </div>
      <p className="text-lg font-bold text-foreground">{title}</p>
      {description && <p className="text-sm mt-2 text-muted-foreground max-w-xs text-center leading-relaxed">{description}</p>}
      {action && <Button variant="default" size="sm" className="mt-6" onClick={action.onClick}>{action.label}</Button>}
    </motion.div>
  )
}
