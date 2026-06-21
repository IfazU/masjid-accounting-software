"use client"

import { useState, useRef } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FundBadge } from "@/components/FundBadge"
import { formatPence } from "@/lib/currency"
import { type ImportResult, type ImportRecord, type DonationType } from "@/lib/api"
import { useTreasury } from "@/lib/demoStore"
import { FUND_CONFIG, CLASSIFIABLE_TYPES } from "@/lib/fundConfig"

export function ImportUpload() {
  const { importCannedStatement, reclassifyDonation } = useTreasury()
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState<ImportResult | null>(null)
  const [classifying, setClassifying] = useState<Record<number, string>>({})
  const [classified, setClassified] = useState<Set<number>>(new Set())

  async function handleFile(file: File) {
    setUploading(true)
    setResult(null)
    try {
      const r = importCannedStatement()
      setResult(r)
      toast.success(
        `Imported ${r.summary.classifiedCount} classified, ${r.summary.uncategorisedCount} need review`
      )
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Import failed")
    } finally {
      setUploading(false)
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  async function handleClassify(record: ImportRecord, type: DonationType) {
    try {
      reclassifyDonation(record.donationId, type)
      setClassified((prev) => new Set([...prev, record.row]))
      toast.success(`Classified as ${FUND_CONFIG[type].label}`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to classify")
    }
  }

  return (
    <div className="space-y-8">
      {/* Drop zone */}
      <div
        className="rounded-xl border-2 border-dashed border-border bg-card p-10 text-center transition-colors hover:border-primary/40 hover:bg-primary/5"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          className="sr-only"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) handleFile(f)
          }}
        />
        <p className="text-2xl mb-3" aria-hidden>📄</p>
        <p className="text-sm font-medium text-foreground">Drop a CSV file here, or</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-3"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? "Uploading…" : "Choose file"}
        </Button>
        <p className="mt-3 text-xs text-muted-foreground">
          Expected columns: <code>date</code>, <code>reference</code>,{" "}
          <code>amount_gbp</code>, <code>donation_type</code> (optional)
        </p>
      </div>

      {result && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="grid grid-cols-3 gap-4">
            <SummaryTile
              label="Classified"
              value={result.summary.classifiedCount}
              variant="success"
            />
            <SummaryTile
              label="Needs review"
              value={result.summary.uncategorisedCount}
              variant="warning"
            />
            <SummaryTile
              label="Errors"
              value={result.summary.errorCount}
              variant="destructive"
            />
          </div>

          {/* Classified rows */}
          {result.classified.length > 0 && (
            <section>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Auto-classified
              </h2>
              <div className="rounded-lg border border-border divide-y divide-border overflow-hidden">
                {result.classified.map((r) => (
                  <ClassifiedRow key={r.row} record={r} />
                ))}
              </div>
            </section>
          )}

          {/* Uncategorised — need treasurer action */}
          {result.uncategorised.length > 0 && (
            <section>
              <h2 className="mb-1 text-sm font-semibold uppercase tracking-widest text-warning">
                Needs classification
              </h2>
              <p className="mb-3 text-xs text-muted-foreground">
                These are currently excluded from all fund balances.
              </p>
              <div className="rounded-lg border border-dashed border-warning/50 divide-y divide-warning/20 overflow-hidden">
                {result.uncategorised.map((r) => (
                  <UncategorisedRow
                    key={r.row}
                    record={r}
                    isClassified={classified.has(r.row)}
                    selectedType={classifying[r.row] as DonationType | undefined}
                    onTypeChange={(t) =>
                      setClassifying((prev) => ({ ...prev, [r.row]: t ?? "" }))
                    }
                    onConfirm={() =>
                      handleClassify(r, classifying[r.row] as DonationType)
                    }
                  />
                ))}
              </div>
            </section>
          )}

          {/* Errors */}
          {result.errors.length > 0 && (
            <section>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-destructive">
                Errors
              </h2>
              <div className="rounded-lg border border-destructive/50 divide-y divide-destructive/20 overflow-hidden bg-destructive/10">
                {result.errors.map((e) => (
                  <div key={e.row} className="px-4 py-3 text-sm">
                    <span className="font-medium text-destructive">Row {e.row}:</span>{" "}
                    <span className="text-destructive/80">{e.error}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}

function SummaryTile({
  label,
  value,
  variant,
}: {
  label: string
  value: number
  variant: "success" | "warning" | "destructive"
}) {
  const styles = {
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    destructive: "bg-destructive/10 text-destructive",
  }
  return (
    <div className={`rounded-lg border border-border ${styles[variant]} px-4 py-3 text-center`}>
      <p className={`text-2xl font-bold tabular-nums`}>{value}</p>
      <p className="mt-0.5 text-xs font-medium text-muted-foreground">{label}</p>
    </div>
  )
}

function ClassifiedRow({ record }: { record: ImportRecord }) {
  return (
    <div className="flex items-center justify-between gap-4 bg-card px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="text-sm tabular-nums font-medium">
          {formatPence(record.amountPence)}
        </span>
        {record.donorRef && (
          <span className="text-xs text-muted-foreground truncate max-w-xs">
            {record.donorRef}
          </span>
        )}
      </div>
      <FundBadge type={record.donationType} />
    </div>
  )
}

function UncategorisedRow({
  record,
  isClassified,
  selectedType,
  onTypeChange,
  onConfirm,
}: {
  record: ImportRecord
  isClassified: boolean
  selectedType?: DonationType
  onTypeChange: (t: string | null) => void
  onConfirm: () => void
}) {
  if (isClassified) {
    return (
      <div className="flex items-center gap-3 bg-success/10 px-4 py-3">
        <span className="text-success text-sm">✓</span>
        <span className="text-sm tabular-nums font-medium">{formatPence(record.amountPence)}</span>
        {record.donorRef && (
          <span className="text-xs text-muted-foreground">{record.donorRef}</span>
        )}
        <span className="ml-auto text-xs text-success font-medium">Classified</span>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-3 bg-warning/10 px-4 py-3">
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-sm tabular-nums font-medium shrink-0">
          {formatPence(record.amountPence)}
        </span>
        {record.donorRef && (
          <span className="text-xs text-muted-foreground truncate">{record.donorRef}</span>
        )}
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Select value={selectedType ?? ""} onValueChange={onTypeChange}>
          <SelectTrigger className="h-8 w-44 text-xs">
            <SelectValue placeholder="Choose type…" />
          </SelectTrigger>
          <SelectContent>
            {CLASSIFIABLE_TYPES.map((t) => (
              <SelectItem key={t} value={t} className="text-xs">
                {FUND_CONFIG[t].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          size="sm"
          className="h-8 text-xs"
          disabled={!selectedType}
          onClick={onConfirm}
        >
          Confirm
        </Button>
      </div>
    </div>
  )
}
