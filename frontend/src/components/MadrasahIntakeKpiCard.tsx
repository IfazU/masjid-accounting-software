"use client"

import { motion, useReducedMotion } from "framer-motion"
import {
  madrasahIntakeLatestMonth,
  madrasahIntakeMonthChange,
  type MadrasahIntakeFile,
} from "@/lib/madrasahIntake"
import { formatTrendPercent } from "@/lib/balanceTrends"
import { motion as motionTokens } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"

interface MadrasahIntakeKpiCardProps {
  data: MadrasahIntakeFile
  delay?: number
}

function TrendBadge({ value }: { value: number }) {
  const isPositive = value > 0
  const isNegative = value < 0

  return (
    <span
      className={cn(
        "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium tabular-nums",
        isPositive && "bg-success/15 text-success",
        isNegative && "bg-destructive/15 text-destructive",
        !isPositive && !isNegative && "bg-muted text-muted-foreground"
      )}
    >
      {formatTrendPercent(value)}
    </span>
  )
}

export function MadrasahIntakeKpiCard({ data, delay = 0 }: MadrasahIntakeKpiCardProps) {
  const latest = madrasahIntakeLatestMonth(data)
  const changePercent = madrasahIntakeMonthChange(data)
  const reduceMotion = useReducedMotion()

  if (!latest) return null

  return (
    <motion.div
      initial={reduceMotion ? false : motionTokens.entrance.initial}
      animate={motionTokens.entrance.animate}
      transition={{
        duration: motionTokens.duration,
        delay: reduceMotion ? 0 : delay,
        ease: motionTokens.ease,
      }}
      className="rounded-xl border border-border bg-card p-5 shadow-card"
      role="region"
      aria-label="Madrasah intake summary"
    >
      <p className="text-sm text-muted-foreground">Madrasah Enrolled</p>
      <p className="mt-0.5 text-[10px] text-muted-foreground">
        Academic year {data.academicYear}
      </p>

      <div className="mt-3 flex items-end justify-between gap-3">
        <p className="text-2xl font-semibold tabular-nums text-foreground">
          {latest.cumulativeEnrolled}
          <span className="ml-1 text-sm font-normal text-muted-foreground">students</span>
        </p>
        {changePercent !== null && <TrendBadge value={changePercent} />}
      </div>

      <p className="mt-1.5 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">{latest.intake}</span> new in{" "}
        {latest.label}
        {changePercent !== null && (
          <span className="text-[10px]"> · vs last month</span>
        )}
      </p>
    </motion.div>
  )
}
