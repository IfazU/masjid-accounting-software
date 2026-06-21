"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  PlusCircle,
  Upload,
  Palette,
} from "lucide-react"

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/donations/new", label: "Record Donation", icon: PlusCircle },
  { href: "/import", label: "Import Statement", icon: Upload },
  { href: "/styleguide", label: "Style Guide", icon: Palette },
]

const breadcrumbMap: Record<string, string> = {
  "/": "Dashboard",
  "/donations/new": "Record Donation",
  "/import": "Import Statement",
  "/styleguide": "Style Guide",
}

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  const breadcrumb = breadcrumbMap[pathname] ?? "Dashboard"

  return (
    <div className="flex min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-30 flex w-60 flex-col border-r border-sidebar-border bg-sidebar">
        <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-5">
          <span className="text-xl leading-none" aria-hidden>☽</span>
          <span
            className="text-base font-semibold tracking-tight text-primary"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            Masjid Treasury
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
  )
}
