export type CallResult = "interested" | "not_interested" | "no_answer" | "callback" | "wrong_number" | "appointment_set"

export interface CallLog {
  id: string
  parcelId: string
  parcelAddress: string
  ownerName: string
  phoneDialed: string
  duration: number
  result: CallResult
  calledAt: string
  transcript: { speaker: "AI" | "Owner"; text: string }[]
  pricingSignal: string | null
  timelineSignal: string | null
  nextAction: string
}

export const callLogs: CallLog[] = [
  {
    id: "C-1042",
    parcelId: "P-004",
    parcelAddress: "14200 Alico Rd, Fort Myers, FL",
    ownerName: "James R. Patterson",
    phoneDialed: "(404) 555-0871",
    duration: 247,
    result: "appointment_set",
    calledAt: "2026-04-15 10:18",
    transcript: [
      { speaker: "AI", text: "Good morning, am I speaking with James Patterson?" },
      { speaker: "Owner", text: "This is James, who's calling?" },
      { speaker: "AI", text: "James, my name is Alex calling from Humanly on behalf of Mitch Gonzalez. We're a real estate group buying land in Lee County and noticed you own the parcels on Alico Road. Do you have a quick minute?" },
      { speaker: "Owner", text: "Alico Road, yeah. What's this about?" },
      { speaker: "AI", text: "We're putting together a master-planned attainable housing community in that corridor and your 140 acres are a strong fit. Would you be open to a 15-minute call with Mitch to discuss whether a sale makes sense?" },
      { speaker: "Owner", text: "I've had a few offers over the years but nobody serious. What kind of numbers are we talking?" },
      { speaker: "AI", text: "Mitch wants to walk you through that directly — we underwrite based on zoning, utility access, and the development plan. Would Thursday at 2 PM Eastern work for a short call?" },
      { speaker: "Owner", text: "Thursday 2 PM works. Send me something in writing first." },
      { speaker: "AI", text: "Will do. You should receive an email with the call details and a short brief within the hour. Thanks James — talk Thursday." }
    ],
    pricingSignal: "Open to offers, prior unsuccessful bids",
    timelineSignal: "No urgency, willing to evaluate",
    nextAction: "Thursday 2:00 PM call with Mitch — brief + LOI draft ready"
  },
  {
    id: "C-1041",
    parcelId: "P-006",
    parcelAddress: "9840 New Berlin Rd, Jacksonville, FL",
    ownerName: "Manuel Alvarez (Alvarez Ranch LLC)",
    phoneDialed: "(713) 555-0412",
    duration: 183,
    result: "interested",
    calledAt: "2026-04-15 11:22",
    transcript: [
      { speaker: "AI", text: "Hi, is this Manuel Alvarez?" },
      { speaker: "Owner", text: "Yeah, speaking." },
      { speaker: "AI", text: "Manuel, I'm calling from Humanly regarding your property on New Berlin Road in Jacksonville. Is now a good time?" },
      { speaker: "Owner", text: "Quick one. What about the property?" },
      { speaker: "AI", text: "We're actively acquiring land for a master-planned community near the port expansion zone. Your 145 acres fits what we're looking for. Have you considered selling recently?" },
      { speaker: "Owner", text: "I've thought about it. The family's been sitting on it 30 years. If the number's right I'd listen." },
      { speaker: "AI", text: "Understood. What kind of number would open the conversation for you?" },
      { speaker: "Owner", text: "I'd need to see something mid-seven figures to even consider it. Land's only going up." },
      { speaker: "AI", text: "That's in the range we're seeing for that corridor. Mitch Gonzalez at Humanly would want to schedule a proper discussion. Can we set up a call?" },
      { speaker: "Owner", text: "Send me info first. I'll get back to you." }
    ],
    pricingSignal: "Mid-7 figures expectation ($2.5M+)",
    timelineSignal: "Exploratory — no pressure",
    nextAction: "Send written summary; follow-up call Monday"
  },
  {
    id: "C-1040",
    parcelId: "P-001",
    parcelAddress: "18204 Pecan Park Rd, Jacksonville, FL",
    ownerName: "Tim Marks",
    phoneDialed: "(904) 555-0142",
    duration: 312,
    result: "appointment_set",
    calledAt: "2026-04-14 13:45",
    transcript: [
      { speaker: "AI", text: "Hello, is this Tim Marks?" },
      { speaker: "Owner", text: "This is Tim." },
      { speaker: "AI", text: "Tim, I'm Alex calling on behalf of Mitch Gonzalez at Humanly. We work on land acquisitions in the Jacksonville area. I noticed your family owns three parcels on Pecan Park Road — about 90 acres total. Have a minute?" },
      { speaker: "Owner", text: "You noticed that, huh. Yeah we've had them a long time. Who wants to know?" },
      { speaker: "AI", text: "Humanly is buying land for single-family attainable housing communities. Mitch wants to see if your family would consider a sale. No pressure — exploratory." },
      { speaker: "Owner", text: "My son and I have talked about what happens with those eventually. What's the process?" },
      { speaker: "AI", text: "Mitch would set up a 20-minute call to discuss your situation, get a rough sense of numbers, and talk through any tax considerations. Would Thursday at 10 AM work?" },
      { speaker: "Owner", text: "Thursday 10 AM works. I'd want my son on too." },
      { speaker: "AI", text: "Absolutely. I'll send confirmation with a dial-in. Your son's name?" },
      { speaker: "Owner", text: "Tim Jr. He's got P-002. My wife's trust has the other." },
      { speaker: "AI", text: "Perfect. I'll send both of you an invite. Thanks Tim — talk Thursday." }
    ],
    pricingSignal: "Family coordination, no stated price yet",
    timelineSignal: "Estate-planning mindset, 2026 timeline possible",
    nextAction: "Thursday 10:00 AM call with Tim + Tim Jr + Mitch. Include trust context."
  },
  {
    id: "C-1039",
    parcelId: "P-010",
    parcelAddress: "12200 Balm Rd, Riverview, FL",
    ownerName: "Carlos Ramirez (Trustee)",
    phoneDialed: "(813) 555-0789",
    duration: 96,
    result: "callback",
    calledAt: "2026-04-14 15:12",
    transcript: [
      { speaker: "AI", text: "Hi, is this Carlos Ramirez?" },
      { speaker: "Owner", text: "Yes, who is this?" },
      { speaker: "AI", text: "Carlos, I'm calling from Humanly about the Grove Trust property on Balm Road. Is this a good time?" },
      { speaker: "Owner", text: "I'm in the middle of something. Can you call me back later?" },
      { speaker: "AI", text: "Of course. What time tomorrow works best?" },
      { speaker: "Owner", text: "Try after 4 PM tomorrow." },
      { speaker: "AI", text: "After 4 PM Wednesday. I'll call then. Thank you." }
    ],
    pricingSignal: null,
    timelineSignal: null,
    nextAction: "Auto-scheduled callback Wed 4:15 PM"
  },
  {
    id: "C-1038",
    parcelId: "P-011",
    parcelAddress: "7820 CR-210 W, St. Augustine, FL",
    ownerName: "Margaret H. Donovan",
    phoneDialed: "(904) 555-0212",
    duration: 0,
    result: "no_answer",
    calledAt: "2026-04-13 10:30",
    transcript: [],
    pricingSignal: null,
    timelineSignal: null,
    nextAction: "Retry tomorrow morning; flag for VA team (elderly owner)"
  },
  {
    id: "C-1037",
    parcelId: "P-007",
    parcelAddress: "8120 Lakeland Hills Blvd, Lakeland, FL",
    ownerName: "Patricia Whitfield-Reyes (Executor)",
    phoneDialed: "(863) 555-0624",
    duration: 268,
    result: "interested",
    calledAt: "2026-04-13 11:15",
    transcript: [
      { speaker: "AI", text: "Hi, is this Patricia Reyes?" },
      { speaker: "Owner", text: "Yes this is Patricia." },
      { speaker: "AI", text: "Patricia, I'm calling from Humanly. I understand you're the executor for the Whitfield estate — the property on Lakeland Hills Blvd. Is now OK to talk?" },
      { speaker: "Owner", text: "Yes, it's in probate. What can I help you with?" },
      { speaker: "AI", text: "We're a buyer for infill land in that corridor — 60-lot subdivision fit. We'd like to submit a clean cash offer once you're ready to entertain one." },
      { speaker: "Owner", text: "We'll be opening for bids in about 4-6 weeks. You'd want to coordinate with the family." },
      { speaker: "AI", text: "Perfect. Mitch Gonzalez at Humanly would want a brief call to understand the family's goals. Would next Tuesday morning work?" },
      { speaker: "Owner", text: "Tuesday 9 AM works. Send me the details." }
    ],
    pricingSignal: "Open bids in 4-6 weeks",
    timelineSignal: "Probate timeline locks it — high certainty window",
    nextAction: "Tuesday 9:00 AM call with Mitch + Patricia; prep cash-offer package"
  }
]

export const callStats = {
  callsToday: 47,
  callsCompleted: 38,
  interested: 12,
  appointmentsSet: 5,
  noAnswer: 6,
  avgDuration: 162,
  nemotronCost: 2.84
}

export interface Appointment {
  id: string
  parcelId: string
  ownerName: string
  date: string
  time: string
  attendees: string[]
  briefing: string
}

export const appointments: Appointment[] = [
  {
    id: "A-018",
    parcelId: "P-001",
    ownerName: "Tim Marks + Tim Marks Jr",
    date: "2026-04-18",
    time: "10:00 AM ET",
    attendees: ["Mitch Gonzalez", "Tim Marks", "Tim Marks Jr"],
    briefing: "Marks Family aggregate — 90ac across 3 parcels (P-001, P-002, P-003). All 3 owners coordinate. Estate-planning angle. Trust holds P-003. Discuss 1031 options + phased purchase."
  },
  {
    id: "A-019",
    parcelId: "P-004",
    ownerName: "James R. Patterson",
    date: "2026-04-18",
    time: "2:00 PM ET",
    attendees: ["Mitch Gonzalez", "James R. Patterson"],
    briefing: "Patterson aggregate — 140ac across 2 parcels (P-004, P-005). GA-based owner (Atlanta). Had prior offers. Open to seller-carry structure. Send LOI draft before call."
  },
  {
    id: "A-020",
    parcelId: "P-007",
    ownerName: "Patricia Whitfield-Reyes (Executor)",
    date: "2026-04-22",
    time: "9:00 AM ET",
    attendees: ["Mitch Gonzalez", "Patricia Whitfield-Reyes"],
    briefing: "Estate — Barbara Whitfield probate. 62ac in Lakeland. Executor + family bids opening 4-6 weeks. Prep clean all-cash LOI. Emphasize 30-day close capability."
  }
]
