export interface SkipTraceResult {
  parcelId: string
  ownerName: string
  sources: {
    source: "WhitePages" | "BeenVerified" | "TruePeopleSearch" | "Spokeo" | "FL SOS"
    hits: number
  }[]
  phoneNumbers: {
    number: string
    confidence: number
    sources: string[]
    recency: string
    lineType: "mobile" | "landline"
  }[]
  emails: string[]
  altAddresses: string[]
  hitRate: number
  ranAt: string
}

export const skipTraceResults: SkipTraceResult[] = [
  {
    parcelId: "P-001",
    ownerName: "Tim Marks",
    sources: [
      { source: "WhitePages", hits: 4 },
      { source: "BeenVerified", hits: 3 },
      { source: "TruePeopleSearch", hits: 2 },
      { source: "Spokeo", hits: 1 }
    ],
    phoneNumbers: [
      { number: "(904) 555-0142", confidence: 94, sources: ["WhitePages", "BeenVerified", "TruePeopleSearch"], recency: "updated 2026-03", lineType: "mobile" },
      { number: "(904) 555-0387", confidence: 72, sources: ["WhitePages", "Spokeo"], recency: "2024", lineType: "landline" },
      { number: "(904) 555-0918", confidence: 58, sources: ["BeenVerified"], recency: "2023", lineType: "mobile" }
    ],
    emails: ["tmarks@bellsouth.net", "timmarks@yahoo.com"],
    altAddresses: ["4721 Hodges Blvd, Jacksonville, FL 32224", "2108 Atlantic Blvd, Jacksonville Beach, FL 32250"],
    hitRate: 100,
    ranAt: "2026-04-15 09:14"
  },
  {
    parcelId: "P-004",
    ownerName: "James R. Patterson",
    sources: [
      { source: "WhitePages", hits: 6 },
      { source: "BeenVerified", hits: 4 },
      { source: "TruePeopleSearch", hits: 3 }
    ],
    phoneNumbers: [
      { number: "(404) 555-0871", confidence: 96, sources: ["WhitePages", "BeenVerified", "TruePeopleSearch"], recency: "updated 2026-02", lineType: "mobile" },
      { number: "(404) 555-0234", confidence: 82, sources: ["WhitePages", "BeenVerified"], recency: "2025", lineType: "landline" },
      { number: "(678) 555-0156", confidence: 71, sources: ["TruePeopleSearch"], recency: "2024", lineType: "mobile" }
    ],
    emails: ["jpatterson@pattersoncap.com", "james.patterson.atl@gmail.com"],
    altAddresses: ["2847 Buckhead Ave, Atlanta, GA 30305", "3400 Piedmont Rd NE, Atlanta, GA 30305"],
    hitRate: 100,
    ranAt: "2026-04-14 10:42"
  },
  {
    parcelId: "P-006",
    ownerName: "Alvarez Ranch LLC (Manuel Alvarez)",
    sources: [
      { source: "WhitePages", hits: 3 },
      { source: "BeenVerified", hits: 5 },
      { source: "TruePeopleSearch", hits: 2 },
      { source: "FL SOS", hits: 1 }
    ],
    phoneNumbers: [
      { number: "(713) 555-0412", confidence: 91, sources: ["WhitePages", "BeenVerified", "TruePeopleSearch"], recency: "updated 2026-03", lineType: "mobile" },
      { number: "(281) 555-0198", confidence: 68, sources: ["BeenVerified"], recency: "2024", lineType: "landline" }
    ],
    emails: ["m.alvarez@alvarezranch.com"],
    altAddresses: ["1840 Post Oak Blvd, Houston, TX 77056"],
    hitRate: 100,
    ranAt: "2026-04-15 11:08"
  },
  {
    parcelId: "P-007",
    ownerName: "Executor: Patricia Whitfield-Reyes",
    sources: [
      { source: "WhitePages", hits: 5 },
      { source: "BeenVerified", hits: 3 },
      { source: "TruePeopleSearch", hits: 4 }
    ],
    phoneNumbers: [
      { number: "(863) 555-0624", confidence: 93, sources: ["WhitePages", "BeenVerified", "TruePeopleSearch"], recency: "updated 2026-04", lineType: "mobile" },
      { number: "(863) 555-0401", confidence: 78, sources: ["WhitePages", "TruePeopleSearch"], recency: "2025", lineType: "landline" }
    ],
    emails: ["preyes@whitfieldlaw.com", "patricia@preyeslaw.com"],
    altAddresses: ["315 E Main St, Lakeland, FL 33801"],
    hitRate: 100,
    ranAt: "2026-04-14 14:20"
  },
  {
    parcelId: "P-010",
    ownerName: "Ramirez Family Grove Trust (Trustee: Carlos Ramirez)",
    sources: [
      { source: "WhitePages", hits: 4 },
      { source: "BeenVerified", hits: 2 },
      { source: "TruePeopleSearch", hits: 3 }
    ],
    phoneNumbers: [
      { number: "(813) 555-0789", confidence: 89, sources: ["WhitePages", "TruePeopleSearch"], recency: "updated 2026-02", lineType: "mobile" },
      { number: "(813) 555-0315", confidence: 64, sources: ["BeenVerified"], recency: "2023", lineType: "landline" }
    ],
    emails: ["cramirez@ramirezgrove.com"],
    altAddresses: ["3420 Bayshore Blvd, Tampa, FL 33629"],
    hitRate: 100,
    ranAt: "2026-04-13 16:05"
  },
  {
    parcelId: "P-011",
    ownerName: "Margaret H. Donovan",
    sources: [
      { source: "WhitePages", hits: 2 },
      { source: "BeenVerified", hits: 1 },
      { source: "TruePeopleSearch", hits: 2 }
    ],
    phoneNumbers: [
      { number: "(904) 555-0212", confidence: 85, sources: ["WhitePages", "TruePeopleSearch"], recency: "updated 2026-01", lineType: "landline" }
    ],
    emails: [],
    altAddresses: ["7820 CR-210 W, St. Augustine, FL 32092"],
    hitRate: 75,
    ranAt: "2026-04-12 09:50"
  }
]

export const skipTraceStats = {
  parcelsQueued: 13,
  parcelsComplete: 6,
  avgNumbersPerOwner: 7.2,
  hitRate: 92,
  sourcesAggregated: 5,
  dailyCost: 18.40
}
