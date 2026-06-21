/** Default theme — dark mode CMS palette */
export const theme = {
  mode: "dark" as const,
  surfaces: ["background", "card", "elevated", "popover"] as const,
} as const

export const chartPalette = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const

export const motion = {
  duration: 0.4,
  durationSlow: 0.8,
  durationLine: 1.2,
  stagger: 0.05,
  staggerCard: 0.1,
  ease: [0.4, 0, 0.2, 1] as const,
  spring: { type: "spring" as const, stiffness: 120, damping: 20 },
  entrance: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
} as const

export const spacing = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "2.5rem",
  "3xl": "3rem",
} as const

export const radius = {
  sm: "calc(var(--radius) * 0.6)",
  md: "calc(var(--radius) * 0.8)",
  lg: "var(--radius)",
  xl: "calc(var(--radius) * 1.4)",
} as const

export const semanticColors = [
  { name: "Background", token: "--background", class: "bg-background" },
  { name: "Card", token: "--card", class: "bg-card" },
  { name: "Elevated", token: "--elevated", class: "bg-elevated" },
  { name: "Primary", token: "--primary", class: "bg-primary" },
  { name: "Muted foreground", token: "--muted-foreground", class: "bg-muted-foreground" },
  { name: "Success", token: "--success", class: "bg-success" },
  { name: "Warning", token: "--warning", class: "bg-warning" },
  { name: "Destructive", token: "--destructive", class: "bg-destructive" },
  { name: "Chart 1", token: "--chart-1", class: "bg-chart-1" },
  { name: "Chart 2", token: "--chart-2", class: "bg-chart-2" },
  { name: "Chart 3", token: "--chart-3", class: "bg-chart-3" },
  { name: "Chart 4", token: "--chart-4", class: "bg-chart-4" },
  { name: "Chart 5", token: "--chart-5", class: "bg-chart-5" },
] as const
