import { FUND_CONFIG } from "@/lib/fundConfig"
import { formatPence } from "@/lib/currency"
import type { DonationType } from "@/lib/api"

interface BalanceCardProps {
  donationType: DonationType
  amountPence: number
}

export function BalanceCard({ donationType, amountPence }: BalanceCardProps) {
  const cfg = FUND_CONFIG[donationType]

  return (
    <div
      className="rounded-lg border border-border bg-card shadow-card overflow-hidden flex"
      role="region"
      aria-label={`${cfg.label} fund balance`}
    >
      {/* Left colour stripe — the signature visual separation of funds */}
      <div className="w-1.5 shrink-0" style={{ backgroundColor: cfg.color }} aria-hidden />

      <div className="flex-1 p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: cfg.color }}
            >
              {cfg.label}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">{cfg.description}</p>
          </div>
          {cfg.restricted && (
            <span className="shrink-0 rounded-full bg-warning/15 px-2 py-0.5 text-[10px] font-semibold text-warning uppercase tracking-wider">
              Restricted
            </span>
          )}
        </div>

        <p className="mt-4 text-2xl font-semibold tabular-nums" style={{ color: cfg.color }}>
          {formatPence(amountPence)}
        </p>
      </div>
    </div>
  )
}
