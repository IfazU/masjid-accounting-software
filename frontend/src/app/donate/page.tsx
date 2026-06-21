import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { PublicDonateForm } from "@/components/PublicDonateForm"
import { computeCauseProgress, listCauses } from "@/lib/services.server"
import { formatPence } from "@/lib/currency"
import { FUND_CONFIG } from "@/lib/fundConfig"

export default function DonatePage() {
  const causes = listCauses()
  const progress = causes.map((cause) => ({ cause, progress: computeCauseProgress(cause.id) }))

  return <div className="space-y-10">
    <section className="rounded-2xl border border-border bg-card p-8 shadow-sm"><p className="text-sm font-medium text-primary">Support the masjid</p><h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground">Donate to a cause</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">Choose a masjid project, select the correct donation type, and record your contribution transparently. Where a cause only accepts specific fund types, the donation form will only show those eligible options.</p></section>
    <section><div className="flex items-baseline justify-between"><h2 className="text-lg font-semibold text-foreground">Current causes</h2><p className="text-xs text-muted-foreground">Pick a cause below, then complete the form.</p></div><Separator className="mt-2 mb-4" /><div className="grid grid-cols-1 gap-4 md:grid-cols-2">{progress.map(({ cause, progress: item }) => <article key={cause.id} className="rounded-xl border border-border bg-card p-5 shadow-sm"><div className="flex items-start justify-between gap-4"><div><h3 className="font-semibold text-foreground">{cause.name}</h3>{cause.allowedTypes.length > 0 && <p className="mt-1 text-xs text-muted-foreground">Accepts {cause.allowedTypes.map((type) => FUND_CONFIG[type].label).join(", ")}</p>}</div><p className="shrink-0 text-sm tabular-nums text-muted-foreground">{formatPence(item.raisedPence)}{item.targetPence !== null && <><span className="mx-1 text-border">/</span>{formatPence(item.targetPence)}</>}</p></div>{item.targetPence !== null ? <><Progress value={Math.min(item.percentage ?? 0, 100)} className="mt-4 h-2" aria-label={`${item.name}: ${item.percentage ?? 0}% funded`} /><p className="mt-2 text-xs text-muted-foreground">{(item.percentage ?? 0) >= 100 ? "Target reached" : `${(item.percentage ?? 0).toFixed(1)}% funded`}</p></> : <p className="mt-4 text-xs text-muted-foreground">Open-ended cause</p>}</article>)}</div></section>
    <section><h2 className="text-lg font-semibold text-foreground">Make a donation</h2><Separator className="mt-2 mb-4" /><PublicDonateForm causes={causes} /></section>
  </div>
}
