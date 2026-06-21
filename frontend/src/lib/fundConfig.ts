import type { DonationType } from "./api"

export interface FundConfig {
  label: string
  description: string
  color: string    // text / border accent
  bg: string       // tinted background (light contexts)
  chartColor: string // segment colour for charts on dark backgrounds
  restricted: boolean
}

export const FUND_CONFIG: Record<DonationType, FundConfig> = {
  zakat: {
    label: "Zakat",
    description: "Obligatory almsgiving (2.5% of savings)",
    color: "#FBBF24",
    bg: "#422006",
    chartColor: "#FBBF24",
    restricted: true,
  },
  sadaqah: {
    label: "Sadaqah",
    description: "Voluntary charity",
    color: "#4ADE80",
    bg: "#052E16",
    chartColor: "#4ADE80",
    restricted: false,
  },
  lillah: {
    label: "Lillah",
    description: "For the sake of Allah",
    color: "#818CF8",
    bg: "#1E1B4B",
    chartColor: "#818CF8",
    restricted: false,
  },
  zakat_al_fitr: {
    label: "Zakat al-Fitr",
    description: "Obligatory end-of-Ramadan charity (fitrana)",
    color: "#FB923C",
    bg: "#431407",
    chartColor: "#FB923C",
    restricted: true,
  },
  fidya: {
    label: "Fidya",
    description: "Compensation for missed fasts",
    color: "#F472B6",
    bg: "#500724",
    chartColor: "#F472B6",
    restricted: true,
  },
  kaffarah: {
    label: "Kaffarah",
    description: "Expiation for broken oaths or fasts",
    color: "#E879F9",
    bg: "#4A044E",
    chartColor: "#E879F9",
    restricted: true,
  },
  waqf: {
    label: "Waqf",
    description: "Islamic endowment (perpetual)",
    color: "#A78BFA",
    bg: "#2E1065",
    chartColor: "#A78BFA",
    restricted: true,
  },
  general: {
    label: "General",
    description: "General donation",
    color: "#9CA3AF",
    bg: "#1F2937",
    chartColor: "#9CA3AF",
    restricted: false,
  },
  uncategorised: {
    label: "Uncategorised",
    description: "Awaiting classification by treasurer",
    color: "#FBBF24",
    bg: "#422006",
    chartColor: "#FBBF24",
    restricted: false,
  },
}

export const ALL_TYPES = Object.keys(FUND_CONFIG) as DonationType[]

export const CLASSIFIABLE_TYPES = ALL_TYPES.filter((t) => t !== "uncategorised")
