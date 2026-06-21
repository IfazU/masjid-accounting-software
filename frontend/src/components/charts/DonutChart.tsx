"use client"

import { motion, useReducedMotion } from "framer-motion"
import { buildPieSegments } from "@/lib/chart-utils"
import { motion as motionTokens } from "@/lib/design-tokens"
import { ChartLegend } from "./ChartLegend"

export interface DonutChartData {
  label: string
  value: number
  color: string
}

interface DonutChartProps {
  data: DonutChartData[]
  size?: number
  innerRadiusRatio?: number
  centerLabel?: string
  centerValue?: string
}

export function DonutChart({
  data,
  size = 200,
  innerRadiusRatio = 0.6,
  centerLabel,
  centerValue,
}: DonutChartProps) {
  const reducedMotion = useReducedMotion()
  const segments = buildPieSegments(data, size, innerRadiusRatio)

  if (segments.length === 0) {
    return (
      <div className="flex h-[200px] items-center justify-center text-sm text-muted-foreground">
        No data
      </div>
    )
  }

  return (
    <div>
      <div className="relative mx-auto" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {segments.map((seg, i) => (
            <motion.path
              key={seg.label}
              d={seg.path}
              fill={seg.color}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: reducedMotion ? 0 : motionTokens.durationSlow,
                delay: reducedMotion ? 0 : i * motionTokens.stagger,
                ease: motionTokens.ease,
              }}
              style={{ transformOrigin: `${size / 2}px ${size / 2}px` }}
            />
          ))}
        </svg>
        {(centerLabel || centerValue) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            {centerValue && (
              <span className="text-lg font-semibold tabular-nums text-foreground">
                {centerValue}
              </span>
            )}
            {centerLabel && (
              <span className="text-xs text-muted-foreground">{centerLabel}</span>
            )}
          </div>
        )}
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
