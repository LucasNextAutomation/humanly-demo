export type PipelineStage = "sourced" | "contacted" | "appointment_set" | "loi_sent" | "negotiation" | "executed"

export interface PipelineDeal {
  id: string
  parcelId: string
  address: string
  city: string
  county: string
  acres: number
  ownerName: string
  stage: PipelineStage
  estimatedValue: number
  offerAmount: number | null
  daysInStage: number
  lastActivity: string
  nextAction: string
  nextActionDate: string | null
  aggregate: boolean
  aggregateCount?: number
  score: number
  dealStructure?: "flat_cash" | "seller_carry" | "phased_closing"
}

export interface PipelineActivity {
  id: string
  dealId: string
  type: "stage_change" | "call" | "email" | "loi" | "note" | "appointment"
  description: string
  actor: string
  time: string
}

export const pipelineDeals: PipelineDeal[] = [
  /* Sourced */
  {
    id: "D-047",
    parcelId: "P-011",
    address: "7820 CR-210 W",
    city: "St. Augustine",
    county: "St. Johns",
    acres: 28,
    ownerName: "Margaret H. Donovan",
    stage: "sourced",
    estimatedValue: 680_000,
    offerAmount: null,
    daysInStage: 3,
    lastActivity: "Scoring complete — 76/100",
    nextAction: "Run skip trace + schedule initial call",
    nextActionDate: "2026-04-17",
    aggregate: false,
    score: 76
  },
  {
    id: "D-046",
    parcelId: "P-009",
    address: "2400 Old Kings Rd",
    city: "Palm Coast",
    county: "Flagler",
    acres: 48,
    ownerName: "Coastal Ventures LLC",
    stage: "sourced",
    estimatedValue: 480_000,
    offerAmount: null,
    daysInStage: 6,
    lastActivity: "Tax delinquent signal confirmed",
    nextAction: "Skip trace owner (NY-based LLC)",
    nextActionDate: "2026-04-17",
    aggregate: false,
    score: 86
  },
  {
    id: "D-045",
    parcelId: "P-014",
    address: "4280 Holopaw Rd",
    city: "St. Cloud",
    county: "Osceola",
    acres: 115,
    ownerName: "Sunrise Holdings LLC",
    stage: "sourced",
    estimatedValue: 1_750_000,
    offerAmount: null,
    daysInStage: 0,
    lastActivity: "Just scored 89/100",
    nextAction: "Prioritize for Mitch review",
    nextActionDate: "2026-04-16",
    aggregate: false,
    score: 89
  },
  {
    id: "D-044",
    parcelId: "P-015",
    address: "21500 Corkscrew Rd",
    city: "Estero",
    county: "Lee",
    acres: 260,
    ownerName: "Horace T. Westbrook",
    stage: "sourced",
    estimatedValue: 4_680_000,
    offerAmount: null,
    daysInStage: 0,
    lastActivity: "Scored 92/100 — top candidate",
    nextAction: "Skip trace elderly owner",
    nextActionDate: "2026-04-16",
    aggregate: false,
    score: 92
  },

  /* Contacted */
  {
    id: "D-043",
    parcelId: "P-006",
    address: "9840 New Berlin Rd",
    city: "Jacksonville",
    county: "Duval",
    acres: 145,
    ownerName: "Alvarez Ranch LLC",
    stage: "contacted",
    estimatedValue: 2_320_000,
    offerAmount: null,
    daysInStage: 2,
    lastActivity: "AI call — owner interested, asking mid-7 figures",
    nextAction: "Send written summary, follow-up Monday",
    nextActionDate: "2026-04-22",
    aggregate: false,
    score: 94
  },
  {
    id: "D-042",
    parcelId: "P-010",
    address: "12200 Balm Rd",
    city: "Riverview",
    county: "Hillsborough",
    acres: 180,
    ownerName: "Ramirez Family Grove Trust",
    stage: "contacted",
    estimatedValue: 2_940_000,
    offerAmount: null,
    daysInStage: 3,
    lastActivity: "Callback requested — Wed 4:15 PM",
    nextAction: "Auto-callback Wed 4:15 PM",
    nextActionDate: "2026-04-17",
    aggregate: false,
    score: 84
  },

  /* Appointment Set */
  {
    id: "D-041",
    parcelId: "P-001",
    address: "18204 Pecan Park Rd (aggregate)",
    city: "Jacksonville",
    county: "Duval",
    acres: 90,
    ownerName: "Marks Family (Tim + Tim Jr + Trust)",
    stage: "appointment_set",
    estimatedValue: 1_250_000,
    offerAmount: null,
    daysInStage: 2,
    lastActivity: "Call Thursday 10 AM — Tim + Tim Jr + Mitch",
    nextAction: "Prep aggregate brief + 1031 options",
    nextActionDate: "2026-04-18",
    aggregate: true,
    aggregateCount: 3,
    score: 82
  },
  {
    id: "D-040",
    parcelId: "P-004",
    address: "14200 Alico Rd (aggregate)",
    city: "Fort Myers",
    county: "Lee",
    acres: 140,
    ownerName: "Patterson (James R. + Holdings LLC)",
    stage: "appointment_set",
    estimatedValue: 2_200_000,
    offerAmount: null,
    daysInStage: 1,
    lastActivity: "Thursday 2 PM call — LOI draft prepared",
    nextAction: "Send LOI draft before call",
    nextActionDate: "2026-04-18",
    aggregate: true,
    aggregateCount: 2,
    score: 91
  },
  {
    id: "D-039",
    parcelId: "P-007",
    address: "8120 Lakeland Hills Blvd",
    city: "Lakeland",
    county: "Polk",
    acres: 62,
    ownerName: "Patricia Whitfield-Reyes (Executor)",
    stage: "appointment_set",
    estimatedValue: 875_000,
    offerAmount: null,
    daysInStage: 2,
    lastActivity: "Tuesday 9 AM call — probate estate",
    nextAction: "Prep clean all-cash LOI package",
    nextActionDate: "2026-04-22",
    aggregate: false,
    score: 88
  },

  /* LOI Sent */
  {
    id: "D-038",
    parcelId: "P-008",
    address: "6500 Golden Gate Pkwy",
    city: "Naples",
    county: "Collier",
    acres: 220,
    ownerName: "David M. Hartwell",
    stage: "loi_sent",
    estimatedValue: 6_380_000,
    offerAmount: 5_280_000,
    daysInStage: 4,
    lastActivity: "LOI-0286 phased structure sent 04/12",
    nextAction: "Follow-up on Phase 1 details",
    nextActionDate: "2026-04-19",
    aggregate: false,
    score: 79,
    dealStructure: "phased_closing"
  },
  {
    id: "D-037",
    parcelId: "P-012",
    address: "1450 Williamson Blvd",
    city: "Daytona Beach",
    county: "Volusia",
    acres: 95,
    ownerName: "Beachfront Equities LLC",
    stage: "loi_sent",
    estimatedValue: 1_620_000,
    offerAmount: 1_380_000,
    daysInStage: 6,
    lastActivity: "LOI sent — awaiting partnership resolution",
    nextAction: "Monitor lis pendens status",
    nextActionDate: "2026-04-21",
    aggregate: false,
    score: 81,
    dealStructure: "flat_cash"
  },

  /* Negotiation */
  {
    id: "D-036",
    parcelId: "P-013",
    address: "2800 SW Martin Hwy",
    city: "Palm City",
    county: "Martin",
    acres: 72,
    ownerName: "Estate of Robert Kowalski",
    stage: "negotiation",
    estimatedValue: 1_240_000,
    offerAmount: 1_100_000,
    daysInStage: 8,
    lastActivity: "Counter received — $1.18M from family",
    nextAction: "Review with Mitch — gap analysis",
    nextActionDate: "2026-04-17",
    aggregate: false,
    score: 87,
    dealStructure: "flat_cash"
  },

  /* Executed */
  {
    id: "D-035",
    parcelId: "closed-001",
    address: "2920 W Bowen Rd",
    city: "Lakeland",
    county: "Polk",
    acres: 58,
    ownerName: "Miller Estate",
    stage: "executed",
    estimatedValue: 780_000,
    offerAmount: 720_000,
    daysInStage: 12,
    lastActivity: "Contract executed 04/02 — close scheduled 05/20",
    nextAction: "Due diligence in progress — Phase I ordered",
    nextActionDate: "2026-05-20",
    aggregate: false,
    score: 85,
    dealStructure: "flat_cash"
  }
]

export const pipelineActivities: PipelineActivity[] = [
  { id: "act-078", dealId: "D-041", type: "appointment", description: "Thursday 10 AM — Tim Marks + Tim Jr + Mitch confirmed", actor: "VAPI", time: "2 hr ago" },
  { id: "act-077", dealId: "D-045", type: "stage_change", description: "New parcel scored 89/100 — added to pipeline", actor: "AI Scoring", time: "3 hr ago" },
  { id: "act-076", dealId: "D-040", type: "loi", description: "LOI-0285 Patterson seller-carry drafted", actor: "LOI Engine", time: "4 hr ago" },
  { id: "act-075", dealId: "D-043", type: "call", description: "Manuel Alvarez — interested, $2.5M+ expectation", actor: "VAPI", time: "5 hr ago" },
  { id: "act-074", dealId: "D-036", type: "note", description: "Kowalski estate counter received — $1.18M", actor: "Mitch Gonzalez", time: "Yesterday" },
  { id: "act-073", dealId: "D-038", type: "loi", description: "LOI-0286 phased Naples PUD sent", actor: "LOI Engine", time: "Yesterday" },
  { id: "act-072", dealId: "D-042", type: "call", description: "Carlos Ramirez — callback Wed 4:15 PM", actor: "VAPI", time: "2 days ago" },
  { id: "act-071", dealId: "D-039", type: "appointment", description: "Patricia Whitfield-Reyes — Tuesday 9 AM scheduled", actor: "VAPI", time: "2 days ago" }
]

export const pipelineStats = {
  totalDeals: pipelineDeals.length,
  totalValue: pipelineDeals.reduce((s, d) => s + d.estimatedValue, 0),
  weightedValue: 4_890_000,
  avgDaysInStage: 3.4,
  conversionRate: 8.2,
  thisMonthExecuted: 1
}

export const stageConfig: Record<PipelineStage, { label: string; color: string; bgColor: string; borderColor: string }> = {
  sourced: { label: "Sourced", color: "text-slate-700", bgColor: "bg-slate-50", borderColor: "border-slate-200" },
  contacted: { label: "Contacted", color: "text-amber-700", bgColor: "bg-amber-50", borderColor: "border-amber-200" },
  appointment_set: { label: "Appointment", color: "text-indigo-700", bgColor: "bg-indigo-50", borderColor: "border-indigo-200" },
  loi_sent: { label: "LOI Sent", color: "text-[#0049B8]", bgColor: "bg-blue-50", borderColor: "border-[#0049B8]/30" },
  negotiation: { label: "Negotiation", color: "text-purple-700", bgColor: "bg-purple-50", borderColor: "border-purple-200" },
  executed: { label: "Executed", color: "text-emerald-700", bgColor: "bg-emerald-50", borderColor: "border-emerald-200" }
}

export const stageOrder: PipelineStage[] = ["sourced", "contacted", "appointment_set", "loi_sent", "negotiation", "executed"]
