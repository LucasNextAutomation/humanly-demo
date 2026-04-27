"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Globe, BrainCircuit, Bell, Server, X } from "lucide-react"

const NAVY = "#0F1F3D"
const GOLD = "#C9A96E"
const BG = "#FAFAF8"
const easing = [0.22, 1, 0.36, 1] as [number, number, number, number]

const STATS = [
  { value: "9", label: "Demand features added per tract" },
  { value: "5,000+", label: "MSAs covered nationwide" },
  { value: "<$300", label: "Total monthly data cost" },
]

const FLOW = [
  {
    icon: Globe,
    title: "Per-MSA demand surface",
    body: "BLS QCEW + LAUS for jobs by sector. Census Building Permits Survey for forward supply. Census ACS + CHAS for renter share + rent burden. Zillow ZORI + ApartmentList + Redfin Data Center for asking-rent trajectory. HouseCanary Pro spot validation. Updated monthly.",
    mock: {
      title: "Fort Myers MSA · monthly refresh",
      lines: [
        ["BFR", "fit 87/100", "rent +5.4% YoY · jobs +3.1%"],
        ["Multifamily", "fit 79/100", "absorption 1.06 · vacancy 5.1%"],
        ["Modular", "fit 71/100", "household formation +2.8%"],
      ],
    },
  },
  {
    icon: BrainCircuit,
    title: "Per-tract typology fit score",
    body: "Each 100-500 ac tract gets scored on three deterministic functions. Drive time to employment, ATTOM AVM neighborhood signal, school district, road access from re-grid, surrounding density. Auditable: every input column, every weight, in the export.",
    mock: {
      title: "JRP-180 · Lee corridor",
      lines: [
        ["BFR", "91/100", "rent +6.1% · 12-min to employment node"],
        ["Multifamily", "64/100", "renter share 44% · A-rated schools"],
        ["Modular", "73/100", "ATTOM AVM stable · road access OK"],
      ],
    },
  },
  {
    icon: Bell,
    title: "Drift / threshold alerts",
    body: "When permit velocity, rent growth, employment, or household formation crosses a threshold you set, you get a Slack or email alert. Nobody at the $20K/yr CoStar tier ships this for tract-level land buyers.",
    mock: {
      title: "Threshold monitor · last 7 days",
      lines: [
        ["Lee corridor", "BLS jobs +3.4%", "above your 3.0 threshold"],
        ["Duval", "BFR rent +6.1% YoY", "above your 5.0 threshold"],
        ["Hillsborough", "permit velocity -7%", "trending negative — flag"],
      ],
    },
  },
  {
    icon: Server,
    title: "Outputs into your scoring engine",
    body: "Same delivery pattern as Module A. Per-MSA demand scores, per-tract typology fits, drift events — all written into your scoring DB as columns. We list the specific columns we add so you can compare against your stack and kill duplicates before kickoff.",
    mock: {
      title: "Daily export to your DB",
      lines: [
        ["columns", "msa_bfr_fit, msa_mf_fit, msa_mod_fit, tract_*_fit, drift_event_*"],
        ["format", "CSV / JSON / Postgres direct-write — your call"],
        ["volume", "1,847 tracts × 9 demand features daily"],
      ],
    },
  },
]

const NOT_DOING = [
  "We don't deliver asset-level rent + occupancy comps (CoStar / Yardi territory)",
  "We don't replace your scoring engine — outputs ship as features it consumes",
  "We don't license CoStar / Yardi data (their ToS prohibits resale anyway)",
]

export default function ModuleB() {
  return (
    <div style={{ background: BG }} className="min-h-screen">
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-[12px] font-medium" style={{ color: `${NAVY}90` }}>
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to overview
        </Link>
      </div>

      <section className="max-w-5xl mx-auto px-6 pb-12">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: easing }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-semibold" style={{ background: NAVY, color: GOLD }}>B</div>
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase px-2 py-1 rounded-full" style={{ background: `${GOLD}15`, color: NAVY }}>
              Mandatory
            </span>
          </div>

          <h1 className="font-semibold tracking-tight leading-[1.1] mb-4 text-4xl md:text-5xl" style={{ color: NAVY }}>
            Tract-Level<br /><span style={{ color: GOLD }}>Typology Fit</span>
          </h1>
          <p className="text-lg max-w-3xl leading-relaxed" style={{ color: `${NAVY}AA` }}>
            BFR / multifamily / modular fit per tract on data Humanly does not already own. Public + light-paid layer normalized to FIPS county and Census tract, refreshed monthly. Not a CoStar replay — those licenses are $15-40K/yr and out of scope.
          </p>
        </motion.div>
      </section>

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

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: easing }} className="mb-12">
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: GOLD }}>How it runs</p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight" style={{ color: NAVY }}>Four steps. Public data + a tight model.</h2>
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
                      <span className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: `${NAVY}70` }}>Step {i + 1}</span>
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
                          <span className="font-mono font-semibold flex-shrink-0 w-24" style={{ color: NAVY }}>{line[0]}</span>
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

      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <Link href="/module-a" className="inline-flex items-center gap-1.5 text-[13px] font-medium" style={{ color: `${NAVY}90` }}>
            <ArrowLeft className="w-3.5 h-3.5" />
            Module A
          </Link>
          <Link
            href="/module-c"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-[13px] font-semibold transition-all hover:opacity-95"
            style={{ background: NAVY, color: "#fff" }}
          >
            Module C — AI Voice
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
