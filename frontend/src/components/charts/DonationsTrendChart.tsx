"use client"

import { ChartCard } from "./ChartCard"
import { LineChart } from "./LineChart"
import { donationsToTimeSeries } from "@/lib/chartData"
import type { Donation } from "@/lib/api"

interface DonationsTrendChartProps {
  donations: Donation[]
}

export function DonationsTrendChart({ donations }: DonationsTrendChartProps) {
  const points = donationsToTimeSeries(donations, "week")

  return (
    <ChartCard
      title="Donations Over Time"
      subtitle="Cumulative classified donations by week"
      delay={0.1}
    >
      <LineChart
        series={[
          {
            label: "Cumulative",
            color: "var(--primary)",
            points,
          },
        ]}
      />
    </ChartCard>
  )
}
