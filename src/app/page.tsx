"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Map, PhoneCall, FileSignature, Target, ArrowRight, CheckCircle2,
  Building2, MapPin, ExternalLink, FileText, Sparkles
} from "lucide-react"

const HUMANLY_NAVY = "#0F1F3D"
const HUMANLY_GOLD = "#C9A96E"
const PROPOSAL_URL = "https://nextautomation.us/proposals/humanly"

const systems = [
  {
    href: "/deal-finder",
    title: "Land Intelligence",
    subtitle: "Daily parcel scan across FL MSAs",
    icon: Map,
    description: "Daily scraping of 12+ Florida counties. Aggregate tract detection (Marks Family 3-parcel example you described). AI scoring against your criteria. Utility district lookup. Self-healing scrapers.",
    highlights: ["12+ FL counties", "Aggregate detection · 90ac Marks, 140ac Patterson", "AI scored 0-100 with distress signals"],
    cta: "Open Land Intelligence"
  },
  {
    href: "/outreach",
    title: "Skip Trace & AI Outreach",
    subtitle: "3-source + VAPI voice",
    icon: PhoneCall,
    description: "Layered skip tracing across WhitePages + BeenVerified + TruePeopleSearch (the three sources you named). Then VAPI AI cold calls with live transcription, pricing signals, and auto-scheduled appointments with Mitch.",
    highlights: ["92% skip trace hit rate", "Full call transcripts + signal capture", "Appointments auto-booked on your calendar"],
    cta: "Open Skip Trace"
  },
  {
    href: "/loi-generator",
    title: "LOI Engine",
    subtitle: "Flat · Seller Carry · Phased",
    icon: FileSignature,
    description: "All three deal structures from the call — flat cash, seller carry note (configurable down %, term, rate, balloon), phased closing (2-5 phases). Auto-populated from deal record, PDF export, DocuSign tracking.",
    highlights: ["3 deal structures", "Seller carry: down / term / rate / balloon", "Phased: 2-5 milestones"],
    cta: "Open LOI Engine"
  },
  {
    href: "/pipeline",
    title: "Deal Pipeline",
    subtitle: "Sourced → Executed",
    icon: Target,
    description: "The CRM baseline you asked for. Six stages, activity timeline per deal, next-action queue with the 5 priorities for your day, weighted pipeline value, stale-deal alerts.",
    highlights: ["6-stage kanban view", "Activity timeline per deal", "Weighted pipeline + stale alerts"],
    cta: "Open Pipeline"
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
              <span className="uppercase tracking-widest">Welcome Mitch · Interactive Demo Live</span>
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
              Off-Market Land<br />
              <span style={{ color: HUMANLY_GOLD }}>Acquisition System</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              The system you described on April 13 — sourcing vacant land across Florida MSAs, detecting aggregate tracts, skip tracing owners, running AI cold calls, generating LOIs, and tracking every deal in one pipeline.
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
                Start with Land Intelligence
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
                50 to 300 acres
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                Jacksonville · Fort Myers · Tampa · East Coast FL
              </span>
              <span>4-week build</span>
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
            <p className="text-xs uppercase tracking-[0.25em] font-bold mb-3" style={{ color: HUMANLY_GOLD }}>Four modules · one coherent CRM</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3" style={{ color: HUMANLY_NAVY }}>
              Click any module. Everything is live.
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              You said &ldquo;it&apos;s all kind of a flow coherent process, the baseline is always a CRM.&rdquo; These four modules feed each other — land intelligence scores go into outreach, outreach appointments attach to LOI drafts, LOIs advance the pipeline.
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
                Full 4-week build plan, investment details, Safari Ventures case study, and next steps — all in the proposal.
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
              Interactive demo for <span className="font-semibold text-white">Mitch Gonzalez · Humanly</span>
            </p>
            <p style={{ color: "rgba(255,255,255,0.5)" }}>Data simulated for demo purposes · FL MSA-ready architecture</p>
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
