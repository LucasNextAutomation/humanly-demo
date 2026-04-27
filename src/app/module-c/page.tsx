"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Mail, FileSignature, PhoneCall, Shield, X } from "lucide-react"

const NAVY = "#0F1F3D"
const GOLD = "#C9A96E"
const BG = "#FAFAF8"
const easing = [0.22, 1, 0.36, 1] as [number, number, number, number]

const STATS = [
  { value: "PEWC", label: "Hard gate before any dial" },
  { value: "<2s", label: "Opt-out latency built in" },
  { value: "7-yr", label: "Audit log retention" },
]

const FLOW = [
  {
    icon: Mail,
    title: "Direct mail or LinkedIn opt-in",
    body: "Parcel-specific postcard with QR code, or LinkedIn DM track for entity decision-makers. Both lead to a mobile landing page with explicit AI-call consent checkbox, signature pad, IP + UA timestamp. The opt-in is the moat.",
    mock: {
      title: "Mailer drop · Patterson Holdings",
      lines: [
        ["1,121", "parcels mailed", "QR landing live"],
        ["1.5-3%", "industry baseline opt-in", "17-34 consented from this batch"],
        ["row stored", "parcel + phone + sig + IP + lang", "no row, no dial"],
      ],
    },
  },
  {
    icon: FileSignature,
    title: "PEWC consent record",
    body: "Each opt-in writes a row to consent_records: parcel ID, phone, signature, language version, IP, timestamp. The dialer reads this row before placing the call. No row, the call fails closed. This is the TCPA defense.",
    mock: {
      title: "consent_records · J.R. Patterson",
      lines: [
        ["parcel", "P-180-LEE", "180 ac aggregate"],
        ["phone", "(404) 555-0871", "explicit AI-call consent"],
        ["signed", "2026-04-23T14:08Z", "IP 12.34.56.78 · sig captured"],
      ],
    },
  },
  {
    icon: PhoneCall,
    title: "VAPI calls — opted-in numbers only",
    body: "Twilio Trust Hub Business Profile + STIR/SHAKEN A-attestation. AI discloses 'this is an AI assistant' and 'this call is recorded' in the first sentence. One-utterance opt-out wired to internal DNC. Quiet hours 9am-7pm recipient-local.",
    mock: {
      title: "Call C-1042 · Patterson",
      lines: [
        ["AI", "open", "Hi, this is Sarah, an AI assistant on behalf of Humanly. This call is recorded."],
        ["AI", "context", "You opted in via our mailer on Apr 23 about your land at P-180."],
        ["Owner", "qualifies", "Booked: Thursday 2 PM ET with Max — brief attached"],
      ],
    },
  },
  {
    icon: Shield,
    title: "Compliance guardrails (built in, not optional)",
    body: "DNC scrub federal + FL/OK/WA/TX state every batch. AI + recording disclosures in script line 1. 1 attempt / 24h, 3 attempts max ever, then auto-stop. Twilio Trust Hub registration before launch. Audit log retained 7 years for litigation defense.",
    mock: {
      title: "Compliance layer",
      lines: [
        ["scrub", "federal DNC + FL/OK/WA/TX state", "every batch"],
        ["disclosures", "AI + recording script line 1", "two-party consent states covered"],
        ["frequency", "1 / 24h · 3 attempts ever", "auto-stop after"],
      ],
    },
  },
]

const NOT_DOING = [
  "We don't dial cold cell phones from skip-trace lists — that's TCPA $500-$1,500 per call",
  "We don't bypass the National DNC or state mini-TCPAs (FL FTSA, OK OTSA, etc)",
  "We don't impersonate humans — AI disclosure is in the first sentence, every call",
  "We don't ship without Humanly's opt-in funnel running first",
]

export default function ModuleC() {
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
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-semibold" style={{ background: NAVY, color: GOLD }}>C</div>
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase px-2 py-1 rounded-full" style={{ background: `${GOLD}15`, color: NAVY }}>
              Included
            </span>
          </div>

          <h1 className="font-semibold tracking-tight leading-[1.1] mb-4 text-4xl md:text-5xl" style={{ color: NAVY }}>
            AI Voice<br /><span style={{ color: GOLD }}>Concierge</span>
          </h1>
          <p className="text-lg max-w-3xl leading-relaxed mb-4" style={{ color: `${NAVY}AA` }}>
            VAPI calls only on numbers that already gave timestamped prior express written consent through a separate touch. Direct-mail QR opt-in or LinkedIn opt-in funnel feeds the dialer.
          </p>
          <p className="text-[14px] max-w-3xl leading-relaxed p-4 rounded-lg" style={{ color: `${NAVY}99`, background: "#fff", border: `1px solid ${NAVY}15` }}>
            <span className="font-semibold" style={{ color: NAVY }}>Why opt-in only:</span> the FCC&apos;s Feb 2024 ruling makes every AI voice call an &quot;artificial voice&quot; under TCPA. Cold-dialing skip-traced cell phones at scale is a $500-$1,500-per-call litigation magnet, plus FL FTSA / OK / WA / TX mini-TCPAs. We won&apos;t build that one. Opt-in lists also convert 5-10x cold lists, so this is also better business.
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
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight" style={{ color: NAVY }}>Four steps. Compliance baked in.</h2>
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
                          <span className="font-mono font-semibold flex-shrink-0 w-20" style={{ color: NAVY }}>{line[0]}</span>
                          <span className="font-medium flex-shrink-0" style={{ color: `${NAVY}AA` }}>{line[1]}</span>
                          {line[2] && <span className="opacity-60 leading-snug" style={{ color: `${NAVY}80` }}>· {line[2]}</span>}
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
          <Link href="/module-b" className="inline-flex items-center gap-1.5 text-[13px] font-medium" style={{ color: `${NAVY}90` }}>
            <ArrowLeft className="w-3.5 h-3.5" />
            Module B
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-[13px] font-semibold transition-all hover:opacity-95"
            style={{ background: NAVY, color: "#fff" }}
          >
            Back to overview
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
