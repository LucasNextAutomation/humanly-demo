"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  UserCircle, PhoneCall, TrendingUp, ArrowRight, CheckCircle2,
  MapPin, ExternalLink, FileText, Sparkles
} from "lucide-react"

const HUMANLY_NAVY = "#0F1F3D"
const HUMANLY_GOLD = "#C9A96E"
const PROPOSAL_URL = "https://nextautomation.us/proposals/humanly"

const systems = [
  {
    href: "/deal-finder",
    title: "Entity Owner Resolution",
    subtitle: "LLC / Trust / Holding Co. → human",
    icon: UserCircle,
    description: "Pull from re-grid (your stack stays your stack). Walk Sunbiz, DE corp registry, OpenCorporates, beneficial-owner filings. Group every parcel that traces to the same human into one master-plan-eligible aggregate. Output: phone-ready decision-maker cards.",
    highlights: ["50-state corp-registry walks", "Beneficial-owner aggregate grouping (3 LLCs → 1 person → 180ac)", "Decision-maker contact cards feeding System 2"],
    cta: "Open Entity Resolution"
  },
  {
    href: "/outreach",
    title: "Skip Trace + VAPI Cold Calling",
    subtitle: "3-source trace · AI voice at scale",
    icon: PhoneCall,
    description: "Layered skip tracing across WhitePages + BeenVerified + TruePeopleSearch, cross-referenced with confidence scoring. VAPI then calls each resolved owner with the deal context loaded. Live transcription, pricing / timeline / probate signal capture, appointments booked on your team's calendar.",
    highlights: ["91% reach rate on cross-confirmed numbers", "VAPI calls loaded with entity tree + master-plan thesis", "Appointments auto-booked with full pre-call brief"],
    cta: "Open Outreach"
  },
  {
    href: "/loi-generator",
    title: "Supply / Demand Intelligence",
    subtitle: "BFR · Multifamily · Modular",
    icon: TrendingUp,
    description: "Per-MSA demand surface across the three housing typologies Humanly operates in. Tract-level fit scoring (BFR-fit / multifamily-fit / modular-fit). Phased feasibility model for master-plan deals. Outputs ship into your scoring engine as features — zero refactor on your side.",
    highlights: ["MSA × typology demand scores (rent, absorption, formation)", "Tract-level fit scoring on every 100-500 ac aggregate", "Phased feasibility model for mixed master-plans"],
    cta: "Open Demand Intelligence"
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${HUMANLY_NAVY}06 0%, transparent 50%)` }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] blur-3xl rounded-full opacity-40" style={{ background: `radial-gradient(circle, ${HUMANLY_NAVY}12, transparent 70%)` }} />
        <div className="absolute top-40 right-10 w-80 h-80 blur-3xl rounded-full opacity-40" style={{ background: `${HUMANLY_GOLD}14` }} />

        <div className="max-w-4xl mx-auto px-6 relative">
          {/* Welcome badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-medium" style={{
              borderColor: `${HUMANLY_GOLD}80`,
              background: `${HUMANLY_GOLD}12`,
              color: HUMANLY_NAVY
            }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: HUMANLY_GOLD }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: HUMANLY_GOLD }} />
              </span>
              <span className="uppercase tracking-widest">Welcome Max · Interactive Demo Live</span>
            </div>
          </motion.div>

          <div className="text-center">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-xs md:text-sm uppercase tracking-[0.3em] mb-5 font-semibold"
              style={{ color: HUMANLY_NAVY }}
            >
              Humanly × NextAutomation
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-4xl md:text-6xl lg:text-7xl font-semibold mb-6 tracking-tight leading-[1.05]"
              style={{ color: HUMANLY_NAVY }}
            >
              The Owner Contact +<br />
              <span style={{ color: HUMANLY_GOLD }}>Outreach + Demand Layer</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              The three modules from the April 17 call — entity owner resolution for raw-land LLCs and trusts, VAPI cold calling at scale, and BFR / multifamily / modular demand intelligence. Built to plug into the platform Humanly already runs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex items-center justify-center gap-3 flex-wrap mb-10"
            >
              <Link
                href="/deal-finder"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all hover:scale-[1.02] shadow-md"
                style={{ background: HUMANLY_NAVY, color: "#fff", boxShadow: `0 8px 24px ${HUMANLY_NAVY}25` }}
              >
                <Sparkles className="w-4 h-4" style={{ color: HUMANLY_GOLD }} />
                Start with Entity Resolution
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={PROPOSAL_URL}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold border transition-all hover:scale-[1.02]"
                style={{ borderColor: HUMANLY_NAVY, color: HUMANLY_NAVY, background: "#fff" }}
              >
                <FileText className="w-4 h-4" />
                View Full Proposal
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex items-center justify-center gap-6 text-xs text-gray-500 flex-wrap"
            >
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: HUMANLY_GOLD }} />
                100 to 500 acres
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                Multi-state · master-plan tracts
              </span>
              <span>4-week surgical build</span>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-24 mx-auto border-t" style={{ borderColor: `${HUMANLY_GOLD}40` }} />

      {/* System Cards */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-xs uppercase tracking-[0.25em] font-bold mb-3" style={{ color: HUMANLY_GOLD }}>Three modules · plugs into your stack</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3" style={{ color: HUMANLY_NAVY }}>
              Click any module. Everything is live.
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Re-grid stays your parcel source. Your scoring engine stays your scorer. These three modules feed each other and feed back into your existing platform — entity resolution surfaces decision-makers, VAPI calls them at scale, demand intelligence tells you which housing typology fits the tract.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {systems.map((sys, i) => (
              <motion.div
                key={sys.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i }}
              >
                <Link href={sys.href} className="block group h-full">
                  <div
                    className="relative h-full bg-white border-2 rounded-2xl p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                    style={{
                      borderColor: "rgba(15,31,61,0.1)"
                    }}
                  >
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
                        style={{ background: `${HUMANLY_NAVY}08`, border: `1px solid ${HUMANLY_NAVY}15` }}
                      >
                        <sys.icon className="w-5 h-5" style={{ color: HUMANLY_NAVY }} />
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: HUMANLY_GOLD }}>
                        {sys.subtitle}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold mb-2" style={{ color: HUMANLY_NAVY }}>{sys.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-5">{sys.description}</p>

                    <div className="space-y-2 mb-6">
                      {sys.highlights.map((h, j) => (
                        <div key={j} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: HUMANLY_GOLD }} />
                          <span className="text-gray-700">{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all mt-auto" style={{ color: HUMANLY_NAVY }}>
                      {sys.cta} <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Proposal CTA */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl p-8 text-center"
            style={{
              background: `linear-gradient(135deg, ${HUMANLY_NAVY}, #0A1428)`,
            }}
          >
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl" style={{ background: `${HUMANLY_GOLD}25` }} />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
            <div className="relative">
              <p className="text-[10px] uppercase tracking-[0.25em] font-bold mb-3" style={{ color: HUMANLY_GOLD }}>Next step</p>
              <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3">
                Ready to talk pricing & timeline?
              </h3>
              <p className="text-white/75 max-w-xl mx-auto mb-6 leading-relaxed">
                Full 4-week build plan, $7,500 fixed implementation fee, retainer options, and the Safari Ventures architecture proof — all in the proposal.
              </p>
              <a
                href={PROPOSAL_URL}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90 hover:scale-[1.02]"
                style={{
                  background: HUMANLY_GOLD,
                  color: HUMANLY_NAVY,
                  boxShadow: `0 8px 24px ${HUMANLY_GOLD}35`,
                }}
              >
                <FileText className="w-4 h-4" />
                Read the full proposal
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-10 border-t" style={{ background: `${HUMANLY_NAVY}`, color: "rgba(255,255,255,0.75)" }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div>
            <p>
              Interactive demo for <span className="font-semibold text-white">Max & Mitch · Humanly</span>
            </p>
            <p style={{ color: "rgba(255,255,255,0.5)" }}>Data simulated for demo purposes · multi-state · master-plan-ready architecture</p>
          </div>
          <div className="text-right">
            <p>
              Built by <span className="font-semibold" style={{ color: HUMANLY_GOLD }}>NextAutomation</span>
            </p>
            <a href={PROPOSAL_URL} className="underline hover:no-underline" style={{ color: "rgba(255,255,255,0.55)" }}>← Back to proposal</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
