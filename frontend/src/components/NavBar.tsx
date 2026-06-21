import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export function NavBar() {
  return (
    <header className="bg-card border-b border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            {/* Crescent mark */}
            <span className="text-xl leading-none" aria-hidden>☽</span>
            <span
              className="text-base font-semibold tracking-tight"
              style={{ fontFamily: "var(--font-lora), Georgia, serif", color: "var(--color-primary, #0F5F5A)" }}
            >
              Masjid Treasury
            </span>
          </Link>

          <Separator orientation="vertical" className="h-5" />

          <nav className="flex items-center gap-1 text-sm font-medium">
            <Link
              href="/"
              className="px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/donations/new"
              className="px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              Record Donation
            </Link>
            <Link
              href="/import"
              className="px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              Import Statement
            </Link>
            <Link
              href="/donate"
              className="px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              Donate
            </Link>
                    </nav>
        </div>
      </div>
    </header>
  )
}
