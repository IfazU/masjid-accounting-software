import { formatChartValue } from "@/lib/chart-utils"

interface ChartLegendProps {
  items: { label: string; color: string; value?: number; percentage?: number }[]
}

export function ChartLegend({ items }: ChartLegendProps) {
  return (
    <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-2 text-xs">
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: item.color }}
            aria-hidden
          />
          <span className="text-muted-foreground">{item.label}</span>
          {item.value !== undefined && (
            <span className="tabular-nums text-foreground font-medium">
              {formatChartValue(item.value)}
              {item.percentage !== undefined && (
                <span className="ml-1 text-muted-foreground">
                  ({item.percentage.toFixed(0)}%)
                </span>
              )}
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}
