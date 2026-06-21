import { formatPence } from "./currency"

export interface ChartSegment {
  label: string
  value: number
  color: string
  path: string
  percentage: number
}

export interface LinePoint {
  x: number
  y: number
  label?: string
}

export interface LineSeries {
  label: string
  color: string
  points: LinePoint[]
}

export function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleDeg: number
): { x: number; y: number } {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  }
}

export function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
): string {
  const start = polarToCartesian(cx, cy, r, endAngle)
  const end = polarToCartesian(cx, cy, r, startAngle)
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`
}

export function describeDonutSegment(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  startAngle: number,
  endAngle: number
): string {
  if (endAngle - startAngle >= 360) {
    endAngle = startAngle + 359.99
  }
  const outerStart = polarToCartesian(cx, cy, outerR, startAngle)
  const outerEnd = polarToCartesian(cx, cy, outerR, endAngle)
  const innerStart = polarToCartesian(cx, cy, innerR, endAngle)
  const innerEnd = polarToCartesian(cx, cy, innerR, startAngle)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerStart.x} ${innerStart.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerEnd.x} ${innerEnd.y}`,
    "Z",
  ].join(" ")
}

export function buildPieSegments(
  data: { label: string; value: number; color: string }[],
  size: number,
  innerRadiusRatio = 0
): ChartSegment[] {
  const cx = size / 2
  const cy = size / 2
  const outerR = size / 2 - 4
  const innerR = outerR * innerRadiusRatio
  const total = data.reduce((sum, d) => sum + d.value, 0)

  if (total === 0) return []

  let currentAngle = 0
  return data
    .filter((d) => d.value > 0)
    .map((d) => {
      const sliceAngle = (d.value / total) * 360
      const startAngle = currentAngle
      const endAngle = currentAngle + sliceAngle
      currentAngle = endAngle

      const path =
        innerRadiusRatio > 0
          ? describeDonutSegment(cx, cy, outerR, innerR, startAngle, endAngle)
          : describePieSlice(cx, cy, outerR, startAngle, endAngle)

      return {
        label: d.label,
        value: d.value,
        color: d.color,
        path,
        percentage: (d.value / total) * 100,
      }
    })
}

function describePieSlice(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
): string {
  if (endAngle - startAngle >= 360) {
    endAngle = startAngle + 359.99
  }
  const start = polarToCartesian(cx, cy, r, startAngle)
  const end = polarToCartesian(cx, cy, r, endAngle)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y} Z`
}

export function buildLinePath(
  points: LinePoint[],
  width: number,
  height: number,
  padding = { top: 16, right: 16, bottom: 28, left: 16 }
): { linePath: string; areaPath: string; scaled: LinePoint[] } {
  if (points.length === 0) {
    return { linePath: "", areaPath: "", scaled: [] }
  }

  const chartW = width - padding.left - padding.right
  const chartH = height - padding.top - padding.bottom
  const maxY = Math.max(...points.map((p) => p.y), 1)
  const minY = 0

  const scaled = points.map((p, i) => ({
    x: padding.left + (i / Math.max(points.length - 1, 1)) * chartW,
    y: padding.top + chartH - ((p.y - minY) / (maxY - minY)) * chartH,
    label: p.label,
  }))

  const linePath = scaled
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ")

  const areaPath = [
    linePath,
    `L ${scaled[scaled.length - 1].x} ${padding.top + chartH}`,
    `L ${scaled[0].x} ${padding.top + chartH}`,
    "Z",
  ].join(" ")

  return { linePath, areaPath, scaled }
}

export function formatChartValue(value: number): string {
  return formatPence(value)
}
