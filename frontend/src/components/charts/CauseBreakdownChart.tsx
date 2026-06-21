"use client"

import { ChartCard } from "./ChartCard"
import { PieChart } from "./PieChart"
import { causeProgressToChartData } from "@/lib/chartData"
import type { CauseProgress } from "@/lib/api"

interface CauseBreakdownChartProps {
  progress: CauseProgress[]
}

export function CauseBreakdownChart({ progress }: CauseBreakdownChartProps) {
  const data = causeProgressToChartData(progress)

  return (
    <ChartCard
      title="Cause Breakdown"
      subtitle="Raised amounts per cause"
      delay={0.2}
    >
      <PieChart data={data} />
    </ChartCard>
  )
}
