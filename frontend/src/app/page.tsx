import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { BalanceCard } from "@/components/BalanceCard"
import { CauseProgressCard } from "@/components/CauseProgressCard"
import { DonationTable } from "@/components/DonationTable"
import { UncategorisedBanner } from "@/components/UncategorisedBanner"
import { FundMixChart } from "@/components/charts/FundMixChart"
import { DonationsTrendChart } from "@/components/charts/DonationsTrendChart"
import { CauseBreakdownChart } from "@/components/charts/CauseBreakdownChart"
import { api } from "@/lib/api"
import { formatPence } from "@/lib/currency"
import { donationsToTimeSeries } from "@/lib/chartData"
import { causeProgressToChartData } from "@/lib/chartData"

export default async function DashboardPage() {
  const [summary, causes, donations, uncategorised] = await Promise.all([
    api.getBalances().catch(() => null),
    api.getCauses().catch(() => []),
    api.getDonations().catch(() => []),
    api.getDonations({ uncategorisedOnly: true }).catch(() => []),
  ])

  const causeProgress = await Promise.all(
    causes.map((c) => api.getCauseProgress(c.id).catch(() => null))
  ).then((results) => results.filter(Boolean))

  const apiDown = summary === null

  const showFundChart = summary && summary.balances.some((b) => b.amountPence > 0)
  const showTrendChart = donationsToTimeSeries(donations).length > 0
  const showCauseChart = causeProgressToChartData(
    causeProgress.filter((p): p is NonNullable<typeof p> => p !== null)
  ).length > 0
  const showCharts = showFundChart || showTrendChart || showCauseChart

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

      {apiDown && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Backend API is unreachable. Start it with{" "}
          <code className="font-mono text-xs bg-destructive/20 px-1 rounded">
            cd backend && uvicorn app.main:app --reload
          </code>
        </div>
      )}

      <UncategorisedBanner count={uncategorised.length} />

      {showCharts && (
        <section>
          <h2 className="text-lg font-semibold text-foreground">Overview</h2>
          <Separator className="mt-2 mb-4" />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {showFundChart && summary && (
              <FundMixChart balances={summary.balances} totalPence={summary.totalPence} />
            )}
            {showTrendChart && <DonationsTrendChart donations={donations} />}
            {showCauseChart && (
              <div className={showFundChart && showTrendChart ? "lg:col-span-2 lg:max-w-md" : ""}>
                <CauseBreakdownChart
                  progress={causeProgress.filter((p): p is NonNullable<typeof p> => p !== null)}
                />
              </div>
            )}
          </div>
        </section>
      )}

      <section>
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-foreground">Fund Balances</h2>
          {summary && (
            <p className="text-sm text-muted-foreground tabular-nums">
              Total classified:{" "}
              <span className="font-medium text-foreground">
                {formatPence(summary.totalPence)}
              </span>
            </p>
          )}
        </div>

        <Separator className="mt-2 mb-4" />

        {summary && summary.balances.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {summary.balances.map((b) => (
              <BalanceCard
                key={b.donationType}
                donationType={b.donationType}
                amountPence={b.amountPence}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-border py-10 text-center">
            <p className="text-sm text-muted-foreground">No classified donations yet.</p>
            <Link
              href="/donations/new"
              className="mt-2 inline-block text-sm font-medium text-primary underline underline-offset-2"
            >
              Record the first donation →
            </Link>
          </div>
        )}
      </section>

      {causeProgress.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-foreground">Cause Progress</h2>
          <Separator className="mt-2 mb-4" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {causeProgress.map(
              (p) => p && <CauseProgressCard key={p.causeId} progress={p} />
            )}
          </div>
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
