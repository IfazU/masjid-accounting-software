import type { TypeBalance, Donation, CauseProgress } from "./api"
import type { DonutChartData } from "@/components/charts/DonutChart"
import type { LinePoint } from "./chart-utils"
import { FUND_CONFIG } from "./fundConfig"

export function balancesToChartData(balances: TypeBalance[]): DonutChartData[] {
  return balances
    .filter((b) => b.amountPence > 0)
    .map((b) => ({
      label: FUND_CONFIG[b.donationType].label,
      value: b.amountPence,
      color: FUND_CONFIG[b.donationType].chartColor,
    }))
}

export function causeProgressToChartData(progress: CauseProgress[]): DonutChartData[] {
  return progress
    .filter((p) => p.raisedPence > 0)
    .map((p, i) => ({
      label: p.name,
      value: p.raisedPence,
      color: `var(--chart-${(i % 5) + 1})`,
    }))
}

export function donationsToTimeSeries(
  donations: Donation[],
  granularity: "day" | "week" = "week"
): LinePoint[] {
  const classified = donations.filter((d) => d.donationType !== "uncategorised")
  if (classified.length === 0) return []

  const buckets = new Map<string, number>()

  for (const d of classified) {
    const date = new Date(d.createdAt)
    let key: string

    if (granularity === "day") {
      key = date.toISOString().slice(0, 10)
    } else {
      const weekStart = getWeekStart(date)
      key = weekStart.toISOString().slice(0, 10)
    }

    buckets.set(key, (buckets.get(key) ?? 0) + d.amountPence)
  }

  const sorted = [...buckets.entries()].sort(([a], [b]) => a.localeCompare(b))

  let cumulative = 0
  return sorted.map(([key, amount]) => {
    cumulative += amount
    const date = new Date(key)
    const label =
      granularity === "day"
        ? date.toLocaleDateString("en-GB", { day: "numeric", month: "short" })
        : date.toLocaleDateString("en-GB", { day: "numeric", month: "short" })
    return { x: 0, y: cumulative, label }
  })
}

function getWeekStart(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  d.setDate(diff)
  d.setHours(0, 0, 0, 0)
  return d
}
