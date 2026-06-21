import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { PublicDonateForm } from "@/components/PublicDonateForm"
import { api } from "@/lib/api"
import { formatPence } from "@/lib/currency"
import { FUND_CONFIG } from "@/lib/fundConfig"

export default async function DonatePage() {
  const causes = await api.getCauses().catch(() => [])

  const progress = await Promise.all(
    causes.map((cause) => api.getCauseProgress(cause.id).catch(() => null))
  ).then((results) => results.filter(Boolean))

  return (
    <div className="space-y-10">
      <section className="rounded-2xl border border-border bg-card p-8 shadow-sm">
        <p className="text-sm font-medium text-primary">Support the masjid</p>

        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground">
          Donate to a cause
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          Choose a masjid project, select the correct donation type, and record
          your contribution transparently. Where a cause only accepts specific
          fund types, the donation form will only show those eligible options.
        </p>
      </section>

      {progress.length > 0 && (
        <section>
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              Current causes
            </h2>
            <p className="text-xs text-muted-foreground">
              Pick a cause below, then complete the form.
            </p>
          </div>

          <Separator className="mt-2 mb-4" />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {progress.map((item) => {
              if (!item) return null

              const cause = causes.find((c) => c.id === item.causeId)
              const hasTarget = item.targetPence !== null
              const percentage = item.percentage ?? 0

              return (
                <article
                  key={item.causeId}
                  className="rounded-xl border border-border bg-card p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {item.name}
                      </h3>

                      {cause && cause.allowedTypes.length > 0 && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          Accepts{" "}
                          {cause.allowedTypes
                            .map((type) => FUND_CONFIG[type].label)
                            .join(", ")}
                        </p>
                      )}
                    </div>

                    <p className="shrink-0 text-sm tabular-nums text-muted-foreground">
                      {formatPence(item.raisedPence)}
                      {hasTarget && (
                        <>
                          <span className="mx-1 text-border">/</span>
                          {formatPence(item.targetPence!)}
                        </>
                      )}
                    </p>
                  </div>

                  {hasTarget ? (
                    <>
                      <Progress
                        value={Math.min(percentage, 100)}
                        className="mt-4 h-2"
                        aria-label={`${item.name}: ${percentage}% funded`}
                      />
                      <p className="mt-2 text-xs text-muted-foreground">
                        {percentage >= 100
                          ? "Target reached"
                          : `${percentage.toFixed(1)}% funded`}
                      </p>
                    </>
                  ) : (
                    <p className="mt-4 text-xs text-muted-foreground">
                      Open-ended cause
                    </p>
                  )}
                </article>
              )
            })}
          </div>
        </section>
      )}

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_22rem]">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Make a donation
          </h2>
          <Separator className="mt-2 mb-4" />
          <PublicDonateForm causes={causes} />
        </div>

        <aside className="rounded-xl border border-border bg-muted/30 p-5 text-sm text-muted-foreground">
          <h3 className="font-medium text-foreground">Before you donate</h3>

          <ul className="mt-3 space-y-2">
            <li>
              Zakat can only be used for eligible purposes, so only select zakat
              where the cause accepts it.
            </li>
            <li>
              Gift Aid should only be selected if you are a UK taxpayer and want
              the masjid to claim it.
            </li>
            <li>
              Your reference can be your name, family name, or a short note for
              the masjid team.
            </li>
          </ul>
        </aside>
      </section>
    </div>
  )
}
