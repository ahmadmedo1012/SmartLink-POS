"use client"
import { motion } from "framer-motion"

interface PageHeaderProps { title: React.ReactNode; subtitle?: string; action?: React.ReactNode }

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-['Readex_Pro'] font-normal tracking-tight text-foreground">{title}</h1>
        {subtitle && <p className="text-sm mt-0.5 text-muted-foreground">{subtitle}</p>}
      </div>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </motion.div>
  )
}
export function PageShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
      className={`p-6 space-y-6 max-w-7xl mx-auto ${className}`}
    >
      {children}
    </motion.div>
  )
}
