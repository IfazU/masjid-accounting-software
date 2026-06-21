"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { buildLinePath, formatChartValue, type LineSeries } from "@/lib/chart-utils"
import { motion as motionTokens } from "@/lib/design-tokens"

interface LineChartProps {
  series: LineSeries[]
  width?: number
  height?: number
  showArea?: boolean
}

export function LineChart({
  series,
  width = 400,
  height = 200,
  showArea = true,
}: LineChartProps) {
  const reducedMotion = useReducedMotion()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const primary = series[0]
  if (!primary || primary.points.length === 0) {
    return (
      <div
        className="flex items-center justify-center text-sm text-muted-foreground"
        style={{ width, height }}
      >
        No data
      </div>
    )
  }

  const { areaPath, scaled } = buildLinePath(primary.points, width, height)
  const xLabels = primary.points
    .map((p) => p.label)
    .filter((l): l is string => Boolean(l))

  return (
    <div className="relative w-full">
      <svg
        width="100%"
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <defs>
          <linearGradient id="lineAreaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {showArea && areaPath && (
          <motion.path
            d={areaPath}
            fill="url(#lineAreaGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: reducedMotion ? 0 : 0.6,
              delay: reducedMotion ? 0 : motionTokens.durationLine * 0.5,
            }}
          />
        )}

        {series.map((s, si) => {
          const { linePath: sPath } = buildLinePath(s.points, width, height)
          return (
            <motion.path
              key={s.label}
              d={sPath}
              fill="none"
              stroke={s.color}
              strokeWidth={si === 0 ? 2.5 : 1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={si > 0 ? "4 4" : undefined}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: reducedMotion ? 0 : motionTokens.durationLine,
                ease: motionTokens.ease,
                delay: reducedMotion ? 0 : si * 0.2,
              }}
            />
          )
        })}

        {scaled.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={hoveredIndex === i ? 5 : 3}
            fill="var(--primary)"
            className="cursor-pointer transition-all"
            onMouseEnter={() => setHoveredIndex(i)}
          />
        ))}

        {xLabels.length > 0 && (
          <g>
            {scaled.map((p, i) =>
              primary.points[i]?.label ? (
                <text
                  key={i}
                  x={p.x}
                  y={height - 4}
                  textAnchor="middle"
                  className="fill-muted-foreground text-[9px] uppercase"
                >
                  {primary.points[i].label}
                </text>
              ) : null
            )}
          </g>
        )}
      </svg>

      {hoveredIndex !== null && primary.points[hoveredIndex] && (
        <div
          className="absolute rounded-md border border-border bg-card px-2 py-1 text-xs shadow-md pointer-events-none"
          style={{
            left: `${(scaled[hoveredIndex].x / width) * 100}%`,
            top: `${(scaled[hoveredIndex].y / height) * 100}%`,
            transform: "translate(-50%, -120%)",
          }}
        >
          <span className="font-medium tabular-nums text-primary">
            {formatChartValue(primary.points[hoveredIndex].y)}
          </span>
          {primary.points[hoveredIndex].label && (
            <span className="ml-1 text-muted-foreground">
              {primary.points[hoveredIndex].label}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
