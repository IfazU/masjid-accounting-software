import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FundBadge } from "@/components/FundBadge"
import { formatPence } from "@/lib/currency"
import type { Donation, Cause } from "@/lib/api"

interface DonationTableProps {
  donations: Donation[]
  causes: Cause[]
  limit?: number
}

export function DonationTable({ donations, causes, limit }: DonationTableProps) {
  const causeMap = Object.fromEntries(causes.map((c) => [c.id, c.name]))
  const rows = limit ? donations.slice(0, limit) : donations

  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border py-12 text-center">
        <p className="text-sm text-muted-foreground">No donations recorded yet.</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Use &ldquo;Record Donation&rdquo; to add one.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground w-32">
              Amount
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Type
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Cause
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Reference
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground w-28">
              Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((d) => (
            <TableRow
              key={d.id}
              className={d.donationType === "uncategorised" ? "bg-warning/10" : ""}
            >
              <TableCell className="font-medium tabular-nums">
                {formatPence(d.amountPence)}
              </TableCell>
              <TableCell>
                <FundBadge type={d.donationType} />
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {d.causeId ? causeMap[d.causeId] ?? "—" : "—"}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                {d.donorRef ?? "—"}
              </TableCell>
              <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                {new Date(d.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
