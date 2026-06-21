"use client"

import { motion, useReducedMotion } from "framer-motion"
import { buildPieSegments } from "@/lib/chart-utils"
import { motion as motionTokens } from "@/lib/design-tokens"
import { ChartLegend } from "./ChartLegend"
import type { DonutChartData } from "./DonutChart"

interface PieChartProps {
  data: DonutChartData[]
  size?: number
}

export function PieChart({ data, size = 200 }: PieChartProps) {
  const reducedMotion = useReducedMotion()
  const segments = buildPieSegments(data, size, 0)

  if (segments.length === 0) {
    return (
      <div className="flex h-[200px] items-center justify-center text-sm text-muted-foreground">
        No data
      </div>
    )
  }

  return (
    <div>
      <div className="mx-auto" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {segments.map((seg, i) => (
            <motion.path
              key={seg.label}
              d={seg.path}
              fill={seg.color}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: reducedMotion ? 0 : motionTokens.durationSlow,
                delay: reducedMotion ? 0 : i * motionTokens.stagger,
                ease: motionTokens.ease,
              }}
            />
          ))}
        </svg>
      </div>
      <ChartLegend
        items={segments.map((s) => ({
          label: s.label,
          color: s.color,
          value: s.value,
          percentage: s.percentage,
        }))}
      />
    </div>
  )
}
