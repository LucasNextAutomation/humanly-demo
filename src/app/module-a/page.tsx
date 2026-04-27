"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Database, Layers, Search, Server, Check, X } from "lucide-react"

const NAVY = "#0F1F3D"
const GOLD = "#C9A96E"
const BG = "#FAFAF8"
const easing = [0.22, 1, 0.36, 1] as [number, number, number, number]

const STATS = [
  { value: "1,121", label: "Entities resolved per typical batch" },
  { value: "47%", label: "Blended hit rate to verified phone" },
  { value: "<24h", label: "Refresh SLA into your scoring DB" },
]

const FLOW = [
  {
    icon: Database,
    title: "Pull from your re-grid feed",
    body: "Re-grid stays your parcel source. We read whichever cut survives your scoring engine and queue the entity-owned ones for resolution. No re-scraping.",
    mock: {
      title: "Re-grid → entity queue",
      lines: [
        ["1,847", "tracts queued", "100-500 ac, multi-state"],
        ["1,121", "entity-owned", "61% of total batch"],
        ["726", "individual-owned", "passed through directly"],
      ],
    },
  },
  {
    icon: Layers,
    title: "Walk the entity tree",
    body: "Sunbiz daily SFTP for FL. State SoS scrapes for the 10-15 states that publish manager / member names. OpenCorporates Starter for cross-state coverage. We don't promise to crack DE / WY / NV.",
    mock: {
      title: "Patterson Holdings LLC (FL)",
      lines: [
        ["Sunbiz", "FL filing 2024", "manager: J.R. Patterson"],
        ["OpenCorps", "cross-link", "3 active entities, same individual"],
        ["DE LLC", "registered agent only", "members not public — flagged"],
      ],
    },
  },
  {
    icon: Search,
    title: "Skip trace + verify the phone",
    body: "BatchData primary, DNC-flagged and litigator-scrubbed by default. Ekata / Whitepages Pro on top to verify the line is live and mobile before anything ships.",
    mock: {
      title: "BatchData + Ekata verify",
      lines: [
        ["(404) 555-0871", "BatchData match", "mobile, T-Mobile, DNC-clear"],
        ["96%", "Ekata confidence", "active 2026, no carrier flag"],
        ["47%", "blended hit rate", "last 12 batches"],
      ],
    },
  },
  {
    icon: Server,
    title: "Deliver into your scoring DB",
    body: "CSV / JSON / direct Postgres write into the table you already use for re-grid. Schema lives in your stack. Zero refactor on your side.",
    mock: {
      title: "Daily export",
      lines: [
        ["columns", "entity, path, owner, phone, conf, dnc, verified_at"],
        ["format", "CSV / JSON / Postgres direct-write — your call"],
        ["volume", "510 resolved decision-makers / day at typical book"],
      ],
    },
  },
]

const NOT_DOING = [
  "We don't crack DE / WY / NV LLC members (deliberately opaque)",
  "We don't promise FinCEN BOI data (dead since March 2025)",
  "We don't host a separate UI you log into — output is feature columns into your DB",
]

export default function ModuleA() {
  return (
    <div style={{ background: BG }} className="min-h-screen">
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-[12px] font-medium" style={{ color: `${NAVY}90` }}>
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to overview
        </Link>
      </div>

      {/* HEADER */}
      <section className="max-w-5xl mx-auto px-6 pb-12">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: easing }}>
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-semibold"
              style={{ background: NAVY, color: GOLD }}
            >
              A
            </div>
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase px-2 py-1 rounded-full" style={{ background: `${GOLD}15`, color: NAVY }}>
              Mandatory
            </span>
          </div>

          <h1 className="font-semibold tracking-tight leading-[1.1] mb-4 text-4xl md:text-5xl" style={{ color: NAVY }}>
            Owner + Contact<br /><span style={{ color: GOLD }}>Data Feed</span>
          </h1>
          <p className="text-lg max-w-3xl leading-relaxed" style={{ color: `${NAVY}AA` }}>
            Re-grid LLC name to a resolved human, verified mobile phone, written into your scoring DB. The one Max named on the Apr 17 call. Realistic blended hit rate is 40-50% on a 100-500 ac entity-owned book — not 90+%.
          </p>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="border-y" style={{ borderColor: `${NAVY}10`, background: "#fff" }}>
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-3 gap-6">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-2xl md:text-3xl font-semibold tracking-tight mb-1.5" style={{ color: NAVY }}>{s.value}</p>
              <p className="text-[11px] uppercase tracking-[0.18em] font-medium" style={{ color: `${NAVY}80` }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FLOW */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: easing }} className="mb-12">
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: GOLD }}>How it runs</p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight" style={{ color: NAVY }}>Four steps. Nothing more.</h2>
          </motion.div>

          <div className="space-y-6">
            {FLOW.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, ease: easing, delay: i * 0.05 }}
                  className="grid md:grid-cols-[1fr_1.1fr] gap-6 items-center"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "#fff", border: `1px solid ${NAVY}15` }}>
                        <Icon className="w-4 h-4" style={{ color: NAVY }} />
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: `${NAVY}70` }}>
                        Step {i + 1}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight mb-2" style={{ color: NAVY }}>{step.title}</h3>
                    <p className="text-[14px] leading-relaxed" style={{ color: `${NAVY}99` }}>{step.body}</p>
                  </div>

                  <div className="rounded-xl p-5" style={{ background: "#fff", border: `1px solid ${NAVY}10`, boxShadow: "0 1px 0 rgba(15,31,61,0.02)" }}>
                    <div className="flex items-center gap-2 pb-3 mb-3 border-b" style={{ borderColor: `${NAVY}08` }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD }} />
                      <p className="text-[10px] uppercase tracking-[0.18em] font-semibold" style={{ color: NAVY }}>{step.mock.title}</p>
                    </div>
                    <div className="space-y-2.5">
                      {step.mock.lines.map((line, j) => (
                        <div key={j} className="flex items-baseline gap-3 text-[12px]">
                          <span className="font-mono font-semibold flex-shrink-0 w-20" style={{ color: NAVY }}>{line[0]}</span>
                          <span className="font-medium flex-shrink-0" style={{ color: `${NAVY}AA` }}>{line[1]}</span>
                          {line[2] && <span className="opacity-60" style={{ color: `${NAVY}80` }}>· {line[2]}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* WHAT WE DON'T DO */}
      <section className="py-12" style={{ background: "#fff", borderTop: `1px solid ${NAVY}10` }}>
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: GOLD }}>What this module is NOT</p>
          <ul className="space-y-2.5">
            {NOT_DOING.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[14px]" style={{ color: `${NAVY}AA` }}>
                <X className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-50" style={{ color: NAVY }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* NAV TO NEXT */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="inline-flex items-center gap-1.5 text-[13px] font-medium" style={{ color: `${NAVY}90` }}>
            <ArrowLeft className="w-3.5 h-3.5" />
            Overview
          </Link>
          <Link
            href="/module-b"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-[13px] font-semibold transition-all hover:opacity-95"
            style={{ background: NAVY, color: "#fff" }}
          >
            Module B — Typology Fit
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
