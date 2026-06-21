import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import { buttonVariants } from "@/components/ui/button"

const donateUrl = "https://masjid-accounting-software.vercel.app/donate"

export default function QrCodePage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <section className="rounded-2xl border border-border bg-card p-8 shadow-sm">
        <p className="text-sm font-medium text-primary">Give with ease</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground">QR Code</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
          Scan this code with a phone camera to open the donation page.
        </p>
      </section>

      <section className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <QRCodeSVG
            value={donateUrl}
            size={256}
            level="M"
            includeMargin
            title="QR code linking to the Noor Treasury donation page"
          />
        </div>
        <p className="mt-6 text-sm font-medium text-foreground">Donate to the masjid</p>
        <p className="mt-1 break-all text-xs text-muted-foreground">{donateUrl}</p>
        <Link
          href={donateUrl}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants({ className: "mt-6" })}
        >
          Open donation page <ExternalLink className="ml-2 h-4 w-4" />
        </Link>
      </section>
    </div>
  )
}
