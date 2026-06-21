"use client"

import { ChartCard } from "./ChartCard"
import { DonutChart } from "./DonutChart"
import { balancesToChartData } from "@/lib/chartData"
import { formatPence } from "@/lib/currency"
import type { TypeBalance } from "@/lib/api"

interface FundMixChartProps {
  balances: TypeBalance[]
  totalPence: number
}

export function FundMixChart({ balances, totalPence }: FundMixChartProps) {
  const data = balancesToChartData(balances)

  return (
    <ChartCard title="Fund Composition" subtitle="Share of classified balances by type">
      <DonutChart
        data={data}
        centerValue={formatPence(totalPence)}
        centerLabel="Total"
      />
    </ChartCard>
  )
}
