import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { DonutChart } from "@/components/charts/DonutChart"
import { PieChart } from "@/components/charts/PieChart"
import { LineChart } from "@/components/charts/LineChart"
import { ChartCard } from "@/components/charts/ChartCard"
import { semanticColors, spacing, radius } from "@/lib/design-tokens"
import { FUND_CONFIG, ALL_TYPES } from "@/lib/fundConfig"
import { formatPence } from "@/lib/currency"

const sampleDonutData = [
  { label: "Zakat", value: 10000, color: "#FBBF24" },
  { label: "Sadaqah", value: 2000, color: "#4ADE80" },
  { label: "Zakat al-Fitr", value: 1000, color: "#FB923C" },
]

const samplePieData = [
  { label: "Roof Repair", value: 350000, color: "var(--chart-1)" },
  { label: "Ramadan Iftar", value: 120000, color: "var(--chart-2)" },
  { label: "Hardship Fund", value: 80000, color: "var(--chart-3)" },
]

const sampleLinePoints = [
  { x: 0, y: 10000, label: "Jan" },
  { x: 0, y: 25000, label: "Feb" },
  { x: 0, y: 42000, label: "Mar" },
  { x: 0, y: 58000, label: "Apr" },
  { x: 0, y: 75000, label: "May" },
  { x: 0, y: 91000, label: "Jun" },
]

export default function StyleGuidePage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Style Guide
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Dark mode is the default theme. Tokens live in{" "}
          <code className="rounded bg-elevated px-1 py-0.5 text-xs font-mono text-primary">
            globals.css
          </code>
          .
        </p>
      </div>

      {/* Surfaces */}
      <section>
        <h2 className="text-lg font-semibold text-foreground">Surface depth</h2>
        <Separator className="mt-2 mb-4" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { name: "Background", class: "bg-background" },
            { name: "Sidebar", class: "bg-sidebar" },
            { name: "Card", class: "bg-card" },
            { name: "Elevated", class: "bg-elevated" },
          ].map((s) => (
            <div
              key={s.name}
              className={`flex h-20 items-end rounded-lg border border-border p-3 ${s.class}`}
            >
              <span className="text-xs text-muted-foreground">{s.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Colours */}
      <section>
        <h2 className="text-lg font-semibold text-foreground">Colours</h2>
        <Separator className="mt-2 mb-4" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {semanticColors.map((c) => (
            <div key={c.name} className="rounded-lg border border-border overflow-hidden">
              <div className={`h-12 ${c.class}`} />
              <div className="p-2">
                <p className="text-xs font-medium text-foreground">{c.name}</p>
                <p className="text-[10px] text-muted-foreground font-mono">{c.token}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="mt-6 mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Fund types
        </h3>
        <div className="flex flex-wrap gap-2">
          {ALL_TYPES.map((t) => (
            <div
              key={t}
              className="flex items-center gap-2 rounded-lg border border-border px-3 py-2"
            >
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: FUND_CONFIG[t].chartColor }}
              />
              <span className="text-xs text-foreground">{FUND_CONFIG[t].label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="text-lg font-semibold text-foreground">Typography</h2>
        <Separator className="mt-2 mb-4" />
        <div className="space-y-4 rounded-xl border border-border bg-card p-6">
          <h1 className="text-3xl font-semibold">Heading 1 — Fund Dashboard</h1>
          <h2 className="text-lg font-semibold">Heading 2 — Section title</h2>
          <h3 className="text-base font-semibold">Heading 3 — Card title</h3>
          <p className="text-sm text-foreground">
            Body text — Inter sans-serif for readable treasurer workflows.
          </p>
          <p className="text-xs text-muted-foreground uppercase tracking-widest">
            Label — uppercase tracking
          </p>
          <p className="text-2xl font-semibold tabular-nums text-primary">
            {formatPence(123456)}
          </p>
        </div>
      </section>

      {/* Spacing & radius */}
      <section>
        <h2 className="text-lg font-semibold text-foreground">Spacing &amp; Radius</h2>
        <Separator className="mt-2 mb-4" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            {Object.entries(spacing).map(([name, value]) => (
              <div key={name} className="flex items-center gap-3">
                <div
                  className="h-4 bg-primary rounded-sm"
                  style={{ width: value }}
                />
                <span className="text-xs text-muted-foreground">
                  {name} — {value}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {Object.entries(radius).map(([name, value]) => (
              <div
                key={name}
                className="flex h-16 w-16 items-center justify-center border border-primary bg-card text-[10px] text-muted-foreground"
                style={{ borderRadius: value }}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Components */}
      <section>
        <h2 className="text-lg font-semibold text-foreground">Components</h2>
        <Separator className="mt-2 mb-4" />
        <div className="space-y-6">
          <div className="flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle>Card title</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">Card content area.</p>
              <Progress value={62} className="h-2" />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Charts */}
      <section>
        <h2 className="text-lg font-semibold text-foreground">Charts</h2>
        <Separator className="mt-2 mb-4" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ChartCard title="Donut chart" subtitle="Fund composition sample">
            <DonutChart
              data={sampleDonutData}
              centerValue="£130.00"
              centerLabel="Total"
            />
          </ChartCard>
          <ChartCard title="Line chart" subtitle="Cumulative trend sample" delay={0.1}>
            <LineChart
              series={[
                { label: "Revenue", color: "var(--primary)", points: sampleLinePoints },
                {
                  label: "Prior year",
                  color: "var(--chart-3)",
                  points: sampleLinePoints.map((p) => ({ ...p, y: p.y * 0.7 })),
                },
              ]}
            />
          </ChartCard>
          <ChartCard title="Pie chart" subtitle="Cause breakdown sample" delay={0.2}>
            <PieChart data={samplePieData} />
          </ChartCard>
        </div>
      </section>
    </div>
  )
}
