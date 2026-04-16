export type DealStructure = "flat_cash" | "seller_carry" | "phased_closing"

export interface DealStructureConfig {
  id: DealStructure
  label: string
  description: string
  useCase: string
}

export const dealStructures: DealStructureConfig[] = [
  {
    id: "flat_cash",
    label: "Flat Cash",
    description: "Single purchase price, one close, no seller financing. Standard earnest money deposit and due diligence period.",
    useCase: "Best for: estate sales, motivated sellers, small-to-mid parcels where simplicity closes."
  },
  {
    id: "seller_carry",
    label: "Seller Carry",
    description: "Seller finances a portion of the purchase price. Buyer puts X% down and pays the remainder over a term with interest, balloon optional.",
    useCase: "Best for: sellers with low basis + tax concerns, owners with no mortgage, long-term land holders."
  },
  {
    id: "phased_closing",
    label: "Phased Closing",
    description: "Purchase price paid across 2-5 phases tied to milestones (entitlement, platting, infrastructure). Each phase closes separately.",
    useCase: "Best for: large tracts, entitled PUDs, situations where capital is staged against development readiness."
  }
]

export interface LOITemplate {
  id: string
  structure: DealStructure
  name: string
  parcelId: string
  buyerEntity: string
  sellerName: string
  propertyAddress: string
  acres: number
  parcelNumber: string
  offerAmount: number
  earnestDeposit: number
  dueDiligencePeriod: number
  closingPeriod: number
  financingTerms: {
    downPercent?: number
    termYears?: number
    interestRate?: number
    balloonYear?: number
    monthlyPayment?: number
  } | null
  phases: {
    phase: number
    amount: number
    trigger: string
    targetDate: string
  }[] | null
  contingencies: string[]
  createdAt: string
  status: "draft" | "sent" | "countered" | "executed"
}

export const loiTemplates: LOITemplate[] = [
  /* FLAT CASH — Duval County single parcel */
  {
    id: "LOI-0284",
    structure: "flat_cash",
    name: "Flat Cash — Duval 145ac",
    parcelId: "P-006",
    buyerEntity: "Humanly Acquisitions Fund I, LLC",
    sellerName: "Alvarez Ranch LLC",
    propertyAddress: "9840 New Berlin Rd, Jacksonville, FL 32218",
    acres: 145,
    parcelNumber: "108-2275-00",
    offerAmount: 2_175_000,
    earnestDeposit: 50_000,
    dueDiligencePeriod: 45,
    closingPeriod: 60,
    financingTerms: null,
    phases: null,
    contingencies: [
      "Clean title and marketable title insurance",
      "Zoning verification for master-planned community",
      "Phase I environmental review",
      "Utility availability confirmation (JEA water + sewer extension)",
      "Survey acceptable to Buyer",
      "Subject to Board approval within 30 days"
    ],
    createdAt: "2026-04-16 09:30",
    status: "draft"
  },

  /* SELLER CARRY — Patterson aggregate */
  {
    id: "LOI-0285",
    structure: "seller_carry",
    name: "Seller Carry — Patterson Aggregate 140ac",
    parcelId: "P-004",
    buyerEntity: "Humanly Acquisitions Fund I, LLC",
    sellerName: "James R. Patterson / Patterson Holdings LLC",
    propertyAddress: "14200 Alico Rd + 14320 Alico Rd (combined tract), Fort Myers, FL",
    acres: 140,
    parcelNumber: "27-44-25-00-00008.0000 + 27-44-25-00-00009.0000",
    offerAmount: 2_240_000,
    earnestDeposit: 75_000,
    dueDiligencePeriod: 60,
    closingPeriod: 75,
    financingTerms: {
      downPercent: 25,
      termYears: 5,
      interestRate: 6.5,
      balloonYear: 5,
      monthlyPayment: 10_640
    },
    phases: null,
    contingencies: [
      "Combined parcel purchase — both P-004 and P-005 close simultaneously",
      "Seller financing first mortgage position secured by the property",
      "Release provisions for phased entitlement recording",
      "Estoppel from adjacent landowner (access agreement)",
      "Lee County Comprehensive Plan amendment pending confirmation",
      "Phase I environmental review"
    ],
    createdAt: "2026-04-16 10:15",
    status: "draft"
  },

  /* PHASED CLOSING — Collier PUD */
  {
    id: "LOI-0286",
    structure: "phased_closing",
    name: "Phased Closing — Naples PUD 220ac",
    parcelId: "P-008",
    buyerEntity: "Humanly Acquisitions Fund I, LLC",
    sellerName: "David M. Hartwell",
    propertyAddress: "6500 Golden Gate Pkwy, Naples, FL 34109",
    acres: 220,
    parcelNumber: "00286400000",
    offerAmount: 5_280_000,
    earnestDeposit: 125_000,
    dueDiligencePeriod: 90,
    closingPeriod: 120,
    financingTerms: null,
    phases: [
      { phase: 1, amount: 1_800_000, trigger: "Initial close — 80 acres (PUD Phase A)", targetDate: "2026-08-15" },
      { phase: 2, amount: 1_760_000, trigger: "Phase B close — 70 acres upon Phase A platting", targetDate: "2027-02-15" },
      { phase: 3, amount: 1_720_000, trigger: "Phase C close — 70 acres upon Phase B 60% buildout", targetDate: "2027-08-15" }
    ],
    contingencies: [
      "PUD entitlement confirmation from Collier County",
      "Water/sewer capacity allocation per Collier Utilities",
      "Escrow agent holds Phase 2 and 3 deeds until each milestone",
      "Marital settlement agreement executed (D. Hartwell divorce)",
      "Phase I environmental review",
      "Traffic impact analysis (if required by County)"
    ],
    createdAt: "2026-04-15 14:22",
    status: "sent"
  }
]

export const loiStats = {
  draftsToday: 3,
  sentThisWeek: 4,
  avgPrepTime: "4 min",
  avgResponse: "6.2 days",
  executedThisQuarter: 2
}
