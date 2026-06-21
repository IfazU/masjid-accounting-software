"use client"

import { useMemo, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { api, type Cause, type DonationType } from "@/lib/api"
import { CLASSIFIABLE_TYPES, FUND_CONFIG } from "@/lib/fundConfig"

interface PublicDonateFormProps {
  causes: Cause[]
}

export function PublicDonateForm({ causes }: PublicDonateFormProps) {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [amountGbp, setAmountGbp] = useState("")
  const [causeId, setCauseId] = useState("")
  const [donationType, setDonationType] = useState<DonationType | "">("")
  const [giftAid, setGiftAid] = useState(false)
  const [donorRef, setDonorRef] = useState("")

  const selectedCause = causes.find((cause) => cause.id === causeId)

  const availableTypes = useMemo(() => {
    if (selectedCause && selectedCause.allowedTypes.length > 0) {
      return CLASSIFIABLE_TYPES.filter((type) =>
        selectedCause.allowedTypes.includes(type)
      )
    }

    return CLASSIFIABLE_TYPES
  }, [selectedCause])

  const effectiveType =
    donationType &&
    availableTypes.includes(donationType as (typeof CLASSIFIABLE_TYPES)[number])
      ? donationType
      : ""

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    if (!causeId) {
      toast.error("Please choose a cause")
      return
    }

    if (!effectiveType) {
      toast.error("Please choose a donation type")
      return
    }

    const amountParsed = Number.parseFloat(amountGbp)

    if (Number.isNaN(amountParsed) || amountParsed <= 0) {
      toast.error("Enter a valid amount in pounds, for example 25.00")
      return
    }

    const amountPence = Math.round(amountParsed * 100)

    setLoading(true)

    try {
      await api.createDonation({
        amountPence,
        donationType: effectiveType,
        causeId,
        giftAid,
        donorRef: donorRef.trim() || null,
        source: "manual",
      })

      setSubmitted(true)
      setAmountGbp("")
      setCauseId("")
      setDonationType("")
      setGiftAid(false)
      setDonorRef("")

      toast.success("Donation recorded. JazakAllah khair.")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to record donation"
      )
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="max-w-xl rounded-xl border border-green-200 bg-green-50 p-6">
        <h3 className="font-semibold text-green-900">JazakAllah khair</h3>
        <p className="mt-2 text-sm leading-6 text-green-800">
          Your donation has been recorded. The masjid team will reconcile it
          against the payment received.
        </p>

        <Button
          type="button"
          className="mt-5"
          onClick={() => setSubmitted(false)}
        >
          Make another donation
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
      <div className="space-y-1.5">
        <label htmlFor="amount" className="block text-sm font-medium">
          Amount (£)
        </label>
        <Input
          id="amount"
          type="number"
          min="0.01"
          step="0.01"
          placeholder="25.00"
          value={amountGbp}
          onChange={(event) => setAmountGbp(event.target.value)}
          required
          className="tabular-nums"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium">Cause</label>
        <Select value={causeId} onValueChange={setCauseId}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a cause…">
              {selectedCause?.name}
            </SelectValue>
          </SelectTrigger>

          <SelectContent>
            {causes.map((cause) => (
              <SelectItem key={cause.id} value={cause.id}>
                {cause.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedCause && selectedCause.allowedTypes.length > 0 && (
          <p className="text-xs text-muted-foreground">
            This cause accepts{" "}
            {selectedCause.allowedTypes
              .map((type) => FUND_CONFIG[type].label)
              .join(", ")}
            .
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium">Donation type</label>
        <Select
          value={effectiveType}
          onValueChange={(value) => setDonationType(value as DonationType)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose donation type…" />
          </SelectTrigger>
          <SelectContent>
            {availableTypes.map((type) => (
              <SelectItem key={type} value={type}>
                <span className="flex items-center gap-2">
                  <span
                    className="inline-block h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: FUND_CONFIG[type].color }}
                    aria-hidden
                  />
                  {FUND_CONFIG[type].label}
                  {FUND_CONFIG[type].restricted && (
                    <span className="text-xs text-muted-foreground">
                      restricted
                    </span>
                  )}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="donor-ref" className="block text-sm font-medium">
          Reference{" "}
          <span className="font-normal text-muted-foreground">
            optional
          </span>
        </label>
        <Input
          id="donor-ref"
          type="text"
          placeholder="Name, family name, or payment reference"
          value={donorRef}
          onChange={(event) => setDonorRef(event.target.value)}
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="gift-aid"
          type="checkbox"
          checked={giftAid}
          onChange={(event) => setGiftAid(event.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-border accent-primary focus:ring-2 focus:ring-ring"
        />

        <label htmlFor="gift-aid" className="text-sm leading-6">
          Add Gift Aid{" "}
          <span className="text-muted-foreground">
            — I am a UK taxpayer and want the masjid to claim Gift Aid on this
            donation.
          </span>
        </label>
      </div>

      <Button
        type="submit"
        disabled={loading || causes.length === 0}
        className="w-full sm:w-auto"
      >
        {loading ? "Recording donation…" : "Donate now"}
      </Button>

      {causes.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No causes are available yet.
        </p>
      )}
    </form>
  )
}
