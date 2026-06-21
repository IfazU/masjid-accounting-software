"use client"

import { motion } from "framer-motion"
import { motion as motionTokens } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"

interface ChartCardProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
  delay?: number
}

export function ChartCard({
  title,
  subtitle,
  children,
  className,
  delay = 0,
}: ChartCardProps) {
  return (
    <motion.div
      initial={motionTokens.entrance.initial}
      animate={motionTokens.entrance.animate}
      transition={{ duration: motionTokens.duration, delay, ease: motionTokens.ease }}
      className={cn(
        "rounded-xl border border-border bg-card p-6 shadow-card",
        className
      )}
    >
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {subtitle && (
          <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {children}
    </motion.div>
  )
}
