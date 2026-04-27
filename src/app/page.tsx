"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ArrowUpRight, Check } from "lucide-react"

const NAVY = "#0F1F3D"
const GOLD = "#C9A96E"
const BG = "#FAFAF8"

const PROPOSAL_URL = "https://nextautomation.us/proposals/humanly"
const PAY_URL = "https://buy.stripe.com/eVq9AT7Ay3Y17jm7jNfMA1k"
const BOOK_URL = "https://book.nextautomation.us"

const easing = [0.22, 1, 0.36, 1] as [number, number, number, number]

const HERO_STATS = [
  { value: "100-500", label: "Acre tract range" },
  { value: "40-50%", label: "Honest blended hit rate" },
  { value: "3", label: "Housing typologies" },
  { value: "4 weeks", label: "To production" },
]

const ALREADY_OWN = [
  "Market grading",
  "Re-grid parcels",
  "Vintage-imagery ML",
  "Census + demographics",
  "Custom scoring engine",
]

const MODULES = [
  {
    letter: "A",
    href: "/module-a",
    title: "Owner + Contact Data Feed",
    blurb: "Re-grid LLC name → resolved human → verified phone, written into your scoring DB.",
    bullets: ["Sunbiz SFTP + state SoS walks", "BatchData skip trace + Ekata verify", "CSV / API / Postgres write"],
    status: "Included",
  },
  {
    letter: "B",
    href: "/module-b",
    title: "Tract-Level Typology Fit",
    blurb: "BFR / multifamily / modular fit per tract on data Humanly does not already own.",
    bullets: ["BLS + Census BPS + ZORI + ATTOM", "Per-tract fit score, auditable", "Drift alerts on jobs / rent / permits"],
    status: "Included",
  },
  {
    letter: "C",
    href: "/module-c",
    title: "AI Voice Concierge",
    blurb: "VAPI calls only on numbers that already gave timestamped consent through an opt-in funnel.",
    bullets: ["Direct-mail QR opt-in → consent row", "Disclosure, recording, DNC scrub built in", "No PEWC, no dial — hard gate"],
    status: "Included",
  },
]

const WONT_SELL = [
  { title: "Skip-trace-then-AI-cold-dial", reason: "TCPA §227(b) = $500-$1,500 per call. We won't ship that." },
  { title: "FinCEN BOI data", reason: "Dead since March 2025 for domestic entities. Was never public." },
  { title: "90+% hit rate claims", reason: "Not real on entity-owned land. Honest blended is 40-50%." },
  { title: "CoStar-tier asset comps", reason: "$20K+/yr license. Different product, different price." },
]

export default function Landing() {
  return (
    <div style={{ background: BG }} className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-[0.06]" style={{ background: `radial-gradient(circle, ${NAVY}, transparent 60%)` }} />
          <div className="absolute top-40 right-10 w-72 h-72 rounded-full blur-3xl opacity-30" style={{ background: `${GOLD}20` }} />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-24">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: easing }}>
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase mb-6" style={{ color: GOLD }}>
              Humanly &times; NextAutomation
            </p>
            <h1 className="font-semibold tracking-tight leading-[1.05] mb-6 text-5xl md:text-7xl" style={{ color: NAVY }}>
              The Owner +<br />
              <span style={{ color: GOLD }}>Demand Layer</span>
            </h1>
            <p className="text-lg md:text-xl max-w-2xl leading-relaxed mb-10" style={{ color: `${NAVY}AA` }}>
              Three modules, $10,000 flat. Owner data feed, tract-level demand intelligence, and PEWC-gated voice layer. 4-week build, plugged into what you already run.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/module-a"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-[13px] font-semibold transition-all hover:opacity-95"
                style={{ background: NAVY, color: "#fff" }}
              >
                Tour the modules
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={PROPOSAL_URL}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md text-[13px] font-medium border transition-all hover:bg-white"
                style={{ borderColor: `${NAVY}25`, color: NAVY }}
              >
                Read the proposal
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STAT STRIP */}
      <section className="border-y" style={{ borderColor: `${NAVY}10`, background: "#fff" }}>
        <div className="max-w-5xl mx-auto px-6 py-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"
          >
            {HERO_STATS.map((s) => (
              <motion.div
                key={s.label}
                variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easing } } }}
              >
                <p className="text-3xl md:text-4xl font-semibold tracking-tight mb-1.5" style={{ color: NAVY }}>{s.value}</p>
                <p className="text-[11px] uppercase tracking-[0.18em] font-medium" style={{ color: `${NAVY}80` }}>{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WHAT HUMANLY OWNS */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easing }}
            className="mb-10"
          >
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: GOLD }}>What you already own</p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3" style={{ color: NAVY }}>
              Re-grid stays your parcel source. Your scoring engine stays your scorer.
            </h2>
            <p className="text-[15px] max-w-2xl leading-relaxed" style={{ color: `${NAVY}99` }}>
              We add what you don&apos;t have. We don&apos;t replace the platform you already built.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
            className="flex flex-wrap gap-2.5"
          >
            {ALREADY_OWN.map((item) => (
              <motion.span
                key={item}
                variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: easing } } }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium"
                style={{ background: "#fff", border: `1px solid ${NAVY}15`, color: `${NAVY}99` }}
              >
                <Check className="w-3 h-3" style={{ color: GOLD }} />
                {item}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MODULES */}
      <section className="py-20" style={{ background: "#fff", borderTop: `1px solid ${NAVY}10` }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easing }}
            className="mb-12 max-w-3xl"
          >
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: GOLD }}>The modules</p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight" style={{ color: NAVY }}>
              All three included. Flat $10K, plugged into your stack.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            className="grid md:grid-cols-3 gap-5"
          >
            {MODULES.map((m) => (
              <motion.div
                key={m.letter}
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easing } } }}
              >
                <Link href={m.href} className="group block h-full">
                  <div
                    className="relative h-full rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: BG,
                      border: `1px solid ${NAVY}10`,
                      boxShadow: "0 1px 0 rgba(15,31,61,0.02)",
                    }}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{ background: NAVY, color: GOLD, fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em" }}
                      >
                        {m.letter}
                      </div>
                      <span
                        className="text-[10px] font-semibold tracking-[0.15em] uppercase px-2 py-1 rounded-full"
                        style={{
                          background: `${GOLD}15`,
                          color: NAVY,
                        }}
                      >
                        {m.status}
                      </span>
                    </div>

                    <h3 className="text-[19px] font-semibold tracking-tight mb-2" style={{ color: NAVY }}>{m.title}</h3>
                    <p className="text-[13.5px] leading-relaxed mb-5" style={{ color: `${NAVY}99` }}>{m.blurb}</p>

                    <ul className="space-y-2 mb-6">
                      {m.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-[12.5px]" style={{ color: `${NAVY}AA` }}>
                          <Check className="w-3 h-3 flex-shrink-0 mt-1" style={{ color: GOLD }} />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-1.5 text-[13px] font-semibold transition-all group-hover:gap-2.5" style={{ color: NAVY }}>
                      Open Module {m.letter}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WHAT WE DON'T SELL */}
      <section className="py-20" style={{ background: NAVY, color: "#fff" }}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easing }}
            className="mb-10"
          >
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: GOLD }}>What we don&apos;t sell</p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3 text-white">
              We&apos;d rather scope smaller and ship clean.
            </h2>
            <p className="text-[15px] max-w-2xl leading-relaxed text-white/70">
              The fastest way to lose Humanly is to oversell. Here&apos;s what we explicitly refused to put in the proposal.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            className="grid md:grid-cols-2 gap-3"
          >
            {WONT_SELL.map((w) => (
              <motion.div
                key={w.title}
                variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easing } } }}
                className="p-5 rounded-xl"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <p className="text-[14px] font-semibold mb-1.5" style={{ color: GOLD }}>{w.title}</p>
                <p className="text-[12.5px] leading-relaxed text-white/70">{w.reason}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: easing }}>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3" style={{ color: NAVY }}>
              Ready when you are.
            </h2>
            <p className="text-[15px] mb-8" style={{ color: `${NAVY}99` }}>
              Read the proposal. Pay the deposit when it makes sense. Or jump on a 30-min call.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={PROPOSAL_URL}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-md text-[13px] font-semibold transition-all hover:opacity-95"
                style={{ background: NAVY, color: "#fff" }}
              >
                Read the proposal
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href={PAY_URL}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-md text-[13px] font-semibold transition-all hover:opacity-95"
                style={{ background: GOLD, color: NAVY }}
              >
                Pay deposit ($5,000)
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href={BOOK_URL}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md text-[13px] font-medium border transition-all hover:bg-white"
                style={{ borderColor: `${NAVY}25`, color: NAVY }}
              >
                Book a call
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
