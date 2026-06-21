"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  PlusCircle,
  Upload,
  QrCode,
  Palette,
  Presentation,
  CheckSquare,
  BarChart3,
  TrendingUp,
} from "lucide-react"

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/donations/new", label: "Record Donation", icon: PlusCircle },
  { href: "/import", label: "Import Statement", icon: Upload },
  { href: "/qr-code", label: "QR Code", icon: QrCode },
  { href: "/info", label: "Our Story", icon: Presentation },
  { href: "/styleguide", label: "Style Guide", icon: Palette },
]

const adminItems = [
  { label: "Approvals", icon: CheckSquare },
  { label: "Reporting", icon: BarChart3 },
  { label: "Forecast", icon: TrendingUp },
]

const breadcrumbMap: Record<string, string> = {
  "/": "Dashboard",
  "/donations/new": "Record Donation",
  "/import": "Import Statement",
  "/qr-code": "QR Code",
  "/info": "Our Story",
  "/styleguide": "Style Guide",
}

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  const breadcrumb = breadcrumbMap[pathname] ?? "Dashboard"
  const isPublicPage = pathname === "/donate"

  if (isPublicPage) {
    return (
      <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    )
  }

  return (
    <TooltipProvider delay={0}>
      <div className="flex min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-30 flex w-60 flex-col border-r border-sidebar-border bg-sidebar">
        <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-5">
          <span className="text-xl leading-none" aria-hidden>☽</span>
          <span className="text-base font-semibold tracking-tight text-primary">
            Noor Treasury
          </span>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "border-l-2 border-sidebar-primary bg-sidebar-accent text-sidebar-accent-foreground pl-[10px]"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </Link>
            )
          })}

          {adminItems.map(({ label, icon: Icon }) => (
            <div
              key={label}
              aria-disabled="true"
              className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground/60"
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{label}</span>
              <span className="ml-auto rounded-full bg-sidebar-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                Soon
              </span>
            </div>
          ))}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col pl-60">
        <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-sm">
          <div className="flex h-14 items-center px-8">
            <p className="text-xs text-muted-foreground">
              Pages / <span className="text-foreground">{breadcrumb}</span>
            </p>
          </div>
        </header>

        <main className="flex-1 px-8 py-8">{children}</main>
      </div>
      </div>
    </TooltipProvider>
  )
}
