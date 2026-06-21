import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { BalanceCard, TotalBalanceCard } from "@/components/BalanceCard"
import { MadrasahIntakeKpiCard } from "@/components/MadrasahIntakeKpiCard"
import { DonationTable } from "@/components/DonationTable"
import { UncategorisedBanner } from "@/components/UncategorisedBanner"
import { FundMixChart } from "@/components/charts/FundMixChart"
import { DonationsTrendChart } from "@/components/charts/DonationsTrendChart"
import { CauseProgressBarChart } from "@/components/charts/CauseProgressBarChart"
import { computeBalances, listCauses, listDonations, computeCauseProgress } from "@/lib/services.server"
import { donationsToTimeSeries } from "@/lib/chartData"
import { causeProgressToBarItems } from "@/lib/chartData"
import { loadCumulativeData } from "@/lib/loadCumulativeData"
import { loadFundTrends } from "@/lib/loadFundTrends"
import { loadMadrasahIntake } from "@/lib/loadMadrasahIntake"
import {
  resolveTrendPercent,
  computeTotalTrendPercent,
} from "@/lib/balanceTrends"
import { motion } from "@/lib/design-tokens"

export default async function DashboardPage() {
  const [summary, causes, donations, uncategorised, fundTrends, cumulativePoints, madrasahIntake] =
    await Promise.all([
      Promise.resolve(computeBalances()).catch(() => null),
      Promise.resolve(listCauses()).catch(() => []),
      Promise.resolve(listDonations()).catch(() => []),
      Promise.resolve(listDonations({ uncategorisedOnly: true })).catch(() => []),
      loadFundTrends(),
      loadCumulativeData(),
      loadMadrasahIntake(),
    ])

  const causeProgress = await Promise.all(
    causes.map((c) => Promise.resolve(computeCauseProgress(c.id)).catch(() => null))
  ).then((results) => results.filter(Boolean))

  const periodLabel = fundTrends?.periodLabel ?? "since last month"

  const showFundChart = summary && summary.balances.some((b) => b.amountPence > 0)
  const showTrendChart =
    cumulativePoints.length > 0 || donationsToTimeSeries(donations).length > 0
  const showCauseChart = causeProgressToBarItems(
    causeProgress.filter((p): p is NonNullable<typeof p> => p !== null)
  ).length > 0
  const showBalances = summary && summary.balances.length > 0
  const showMadrasah = madrasahIntake !== null && madrasahIntake.series[0]?.points.length > 0
  const showOverview =
    showBalances || showFundChart || showTrendChart || showCauseChart || showMadrasah

  const totalTrend =
    summary &&
    computeTotalTrendPercent(summary.balances, donations, fundTrends)

  const showChartSidebar =
    (showMadrasah && madrasahIntake) || (showFundChart && summary)

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Fund Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {new Date().toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <UncategorisedBanner count={uncategorised.length} />

      {showOverview && (
        <section>
          <h2 className="text-lg font-semibold text-foreground">Overview</h2>
          <Separator className="mt-2 mb-4" />

          {showBalances && summary ? (
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <TotalBalanceCard
                totalPence={summary.totalPence}
                changePercent={totalTrend}
                periodLabel={periodLabel}
                delay={0}
              />
              {summary.balances.map((b, index) => (
                <BalanceCard
                  key={b.donationType}
                  donationType={b.donationType}
                  amountPence={b.amountPence}
                  changePercent={resolveTrendPercent(
                    donations,
                    b.donationType,
                    b.amountPence,
                    fundTrends
                  )}
                  periodLabel={periodLabel}
                  delay={(index + 1) * motion.staggerCard}
                />
              ))}
            </div>
          ) : !showFundChart && !showTrendChart && !showMadrasah && !showCauseChart ? (
            <div className="mb-6 rounded-lg border border-dashed border-border py-10 text-center">
              <p className="text-sm text-muted-foreground">No classified donations yet.</p>
              <Link
                href="/donations/new"
                className="mt-2 inline-block text-sm font-medium text-primary underline underline-offset-2"
              >
                Record the first donation →
              </Link>
            </div>
          ) : null}

          {(showFundChart || showTrendChart || showMadrasah) && (
            <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3">
              {showTrendChart && (
                <div className={showChartSidebar ? "lg:col-span-2" : "lg:col-span-3"}>
                  <DonationsTrendChart
                    donations={donations}
                    cumulativePoints={cumulativePoints}
                  />
                </div>
              )}
              {showChartSidebar && (
                <div className="flex flex-col gap-4 lg:col-span-1">
                  {showMadrasah && madrasahIntake && (
                    <MadrasahIntakeKpiCard data={madrasahIntake} delay={0} />
                  )}
                  {showFundChart && summary && (
                    <FundMixChart
                      balances={summary.balances}
                      totalPence={summary.totalPence}
                    />
                  )}
                </div>
              )}
            </div>
          )}

          {showCauseChart && (
            <div className="mt-4">
              <CauseProgressBarChart
                progress={causeProgress.filter((p): p is NonNullable<typeof p> => p !== null)}
              />
            </div>
          )}
        </section>
      )}

      <section>
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-foreground">Recent Donations</h2>
          <span className="text-xs text-muted-foreground">Last 20</span>
        </div>
        <Separator className="mt-2 mb-4" />
        <DonationTable donations={donations} causes={causes} limit={20} />
      </section>
    </div>
  )
}
