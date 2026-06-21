import { Progress } from "@/components/ui/progress"
import { formatPence } from "@/lib/currency"
import type { CauseProgress } from "@/lib/api"

interface CauseProgressCardProps {
  progress: CauseProgress
}

export function CauseProgressCard({ progress }: CauseProgressCardProps) {
  const pct = progress.percentage ?? 0
  const hasTarget = progress.targetPence !== null

  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-card">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-semibold text-foreground">{progress.name}</h3>
        <span className="shrink-0 text-sm tabular-nums text-muted-foreground">
          {formatPence(progress.raisedPence)}
          {hasTarget && (
            <>
              <span className="mx-1 text-border">/</span>
              {formatPence(progress.targetPence!)}
            </>
          )}
        </span>
      </div>

      {hasTarget ? (
        <>
          <div className="mt-3">
            <Progress
              value={Math.min(pct, 100)}
              className="h-2"
              aria-label={`${progress.name}: ${pct}% funded`}
            />
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            {pct >= 100 ? (
              <span className="text-success font-medium">Target reached</span>
            ) : (
              <>{pct.toFixed(1)}% funded</>
            )}
          </p>
        </>
      ) : (
        <p className="mt-2 text-xs text-muted-foreground">No target set</p>
      )}
    </div>
  )
}
