import Link from "next/link"

interface UncategorisedBannerProps {
  count: number
}

export function UncategorisedBanner({ count }: UncategorisedBannerProps) {
  if (count === 0) return null

  return (
    <div
      role="alert"
      className="rounded-lg border border-dashed border-warning/50 bg-warning/10 p-4"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 text-warning shrink-0" aria-hidden>⚠</span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-warning">
            {count} donation{count !== 1 ? "s" : ""} awaiting classification
          </p>
          <p className="mt-0.5 text-xs text-warning/80">
            These are excluded from all fund balances until a treasurer assigns a type.
            Restricted funds (zakat, waqf, etc.) must be correctly labelled before any
            disbursement.
          </p>
          <Link
            href="/import"
            className="mt-2 inline-block text-xs font-semibold text-warning underline underline-offset-2 hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-warning rounded"
          >
            Classify now →
          </Link>
        </div>
      </div>
    </div>
  )
}
