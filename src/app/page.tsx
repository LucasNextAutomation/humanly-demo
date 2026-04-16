"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Map, PhoneCall, FileSignature, Target, ArrowRight, CheckCircle2, Building2, MapPin } from "lucide-react"

const systems = [
  {
    href: "/deal-finder",
    title: "Deal Finder",
    subtitle: "Land Intelligence Engine",
    icon: Map,
    description: "Daily parcel scraping across 12 Florida counties. AI-scored aggregate tracts, distress signals, utility lookups, ready-for-outreach reports every morning.",
    highlights: ["Parcel scraping FL MSAs", "Aggregate lot detection", "AI scoring + filters"],
  },
  {
    href: "/outreach",
    title: "Skip Trace & Outreach",
    subtitle: "Multi-Source + VAPI Calls",
    icon: PhoneCall,
    description: "Multi-source skip tracing to find real phone numbers, then VAPI-powered AI cold calls with live transcription and auto-scheduled appointments.",
    highlights: ["WhitePages + BeenVerified", "VAPI voice AI", "Auto appointments"],
  },
  {
    href: "/loi-generator",
    title: "LOI Generator",
    subtitle: "Flat, Carry, or Phased",
    icon: FileSignature,
    description: "Generate a clean Letter of Intent from your template library. Flat cash, seller-carry with configurable terms, or 2-5 phase closings — all pre-populated.",
    highlights: ["3 deal structures", "Seller-carry terms", "Phased closing (2-5)"],
  },
  {
    href: "/pipeline",
    title: "Pipeline Dashboard",
    subtitle: "Sourced → Executed",
    icon: Target,
    description: "Track every deal from first contact to executed contract. 6 stages, next-action queue, LOI status, and team-ready deal cards for 50+ active conversations.",
    highlights: ["6-stage kanban", "Next-action queue", "Activity timeline"],
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 via-white to-white" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#0049B8]/[0.04] rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex justify-center mb-8"
            >
              <div className="w-20 h-20 rounded-2xl bg-[#0049B8] flex items-center justify-center shadow-lg shadow-[#0049B8]/30">
                <Building2 className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xs md:text-sm uppercase tracking-[0.2em] text-gray-400 font-medium mb-5"
            >
              Humanly × NextAutomation
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-3xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-5 tracking-tight leading-[1.1]"
            >
              Off-Market Land<br />
              Acquisition System
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-base md:text-lg text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Source vacant land parcels across Florida MSAs, identify aggregate tracts, skip trace owners, run AI-powered cold calls, generate LOIs, and track every deal from first scrape to executed contract.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex items-center justify-center gap-6 text-sm text-gray-500 flex-wrap"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Vacant land 20-300 acres
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                Florida MSAs
              </span>
              <span>Buy-side for attainable housing</span>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-24 mx-auto border-t border-gray-200" />

      {/* System Cards */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-xs uppercase tracking-[0.2em] text-gray-400 font-medium mb-14"
          >
            Four connected modules — live demo
          </motion.p>

          <div className="grid md:grid-cols-2 gap-5">
            {systems.map((sys, i) => (
              <motion.div
                key={sys.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + 0.08 * i }}
              >
                <Link href={sys.href} className="block group h-full">
                  <div className="relative h-full bg-white border border-gray-200 rounded-2xl p-7 transition-all duration-300 hover:border-[#0049B8]/40 hover:shadow-xl hover:-translate-y-0.5">
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-[#0049B8]/5 group-hover:border-[#0049B8]/20 transition-colors">
                        <sys.icon className="w-5 h-5 text-gray-500 group-hover:text-[#0049B8] transition-colors" />
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">{sys.subtitle}</span>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{sys.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-5">{sys.description}</p>

                    <div className="space-y-2 mb-6">
                      {sys.highlights.map((h, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0049B8]/60 flex-shrink-0" />
                          <span className="text-gray-600">{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 text-sm font-medium text-[#0049B8] group-hover:gap-2.5 transition-all">
                      View Demo <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">Interactive demo for Mitch Gonzalez — data is simulated for demonstration purposes</p>
          <p className="text-xs text-gray-400">
            Built by <span className="text-[#0049B8] font-medium">NextAutomation</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
