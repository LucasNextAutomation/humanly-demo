"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FileSignature, DollarSign, Handshake, Layers,
  FileText, Download, Send, CheckCircle2, Clock, Building2,
  Sparkles
} from "lucide-react"
import { dealStructures, loiTemplates, loiStats, type DealStructure, type LOITemplate } from "@/data/lois"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const structureIcons: Record<DealStructure, typeof DollarSign> = {
  flat_cash: DollarSign,
  seller_carry: Handshake,
  phased_closing: Layers
}

const statusConfig = {
  draft: { label: "Draft", color: "text-gray-600", bg: "bg-gray-100" },
  sent: { label: "Sent", color: "text-[#0049B8]", bg: "bg-blue-100" },
  countered: { label: "Countered", color: "text-amber-700", bg: "bg-amber-100" },
  executed: { label: "Executed", color: "text-emerald-700", bg: "bg-emerald-100" }
}

function fmt(n: number) {
  return `$${n.toLocaleString("en-US")}`
}

export default function LOIGeneratorPage() {
  const [selectedStructure, setSelectedStructure] = useState<DealStructure>("flat_cash")
  const [selectedLOIId, setSelectedLOIId] = useState<string>(loiTemplates[0].id)

  const activeLOI = useMemo(() => loiTemplates.find(l => l.id === selectedLOIId)!, [selectedLOIId])
  const loisForStructure = useMemo(() => loiTemplates.filter(l => l.structure === selectedStructure), [selectedStructure])
  const displayLOI = useMemo(() => loisForStructure[0] || activeLOI, [loisForStructure, activeLOI])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">LOI Generator</h1>
            <p className="text-sm text-gray-400 mt-1">Letter of Intent templates for flat cash, seller-carry, and phased closings — pre-populated from your pipeline.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {[
            { label: "Drafts Today", value: loiStats.draftsToday.toString(), icon: FileText, color: "text-[#0049B8]" },
            { label: "Sent This Week", value: loiStats.sentThisWeek.toString(), icon: Send, color: "text-blue-500" },
            { label: "Avg Prep Time", value: loiStats.avgPrepTime, icon: Sparkles, color: "text-amber-500" },
            { label: "Avg Response", value: loiStats.avgResponse, icon: Clock, color: "text-purple-500" },
            { label: "Executed Q", value: loiStats.executedThisQuarter.toString(), icon: CheckCircle2, color: "text-emerald-500" },
          ].map(s => (
            <div key={s.label} className="bg-gray-50/80 border border-gray-100 rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <s.icon className={`w-3.5 h-3.5 ${s.color}`} />
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">{s.label}</span>
              </div>
              <p className="text-xl font-bold text-gray-900">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Structure Selector */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Choose deal structure</p>
          <div className="grid md:grid-cols-3 gap-3">
            {dealStructures.map(s => {
              const Icon = structureIcons[s.id]
              const isActive = selectedStructure === s.id
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelectedStructure(s.id)
                    const firstLOI = loiTemplates.find(l => l.structure === s.id)
                    if (firstLOI) setSelectedLOIId(firstLOI.id)
                  }}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    isActive
                      ? "border-[#0049B8] bg-[#0049B8]/5 shadow-sm ring-1 ring-[#0049B8]/20"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isActive ? "bg-[#0049B8] text-white" : "bg-gray-100 text-gray-500"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className={`text-sm font-bold ${isActive ? "text-[#0049B8]" : "text-gray-900"}`}>{s.label}</h3>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{s.description}</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 leading-relaxed">{s.useCase}</p>
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form Panel */}
          <div className="space-y-4">
            {/* Selected parcel */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#0049B8]" />
                  <h3 className="text-sm font-bold text-gray-900">Parcel</h3>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider ${statusConfig[displayLOI.status].bg} ${statusConfig[displayLOI.status].color}`}>
                  {statusConfig[displayLOI.status].label}
                </span>
              </div>
              <p className="text-xs text-gray-400">{displayLOI.parcelId} — {displayLOI.parcelNumber}</p>
              <p className="text-base font-semibold text-gray-900 mt-1">{displayLOI.propertyAddress}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                <span><strong className="text-gray-900">{displayLOI.acres}</strong> acres</span>
                <span>Seller: <strong className="text-gray-900">{displayLOI.sellerName}</strong></span>
              </div>
            </div>

            {/* Offer terms */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#0049B8]" />
                Core Terms
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Offer Amount</label>
                  <p className="text-lg font-bold text-gray-900">{fmt(displayLOI.offerAmount)}</p>
                  <p className="text-[10px] text-gray-400">{fmt(Math.round(displayLOI.offerAmount / displayLOI.acres))}/acre</p>
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Earnest Deposit</label>
                  <p className="text-lg font-bold text-gray-900">{fmt(displayLOI.earnestDeposit)}</p>
                  <p className="text-[10px] text-gray-400">{((displayLOI.earnestDeposit / displayLOI.offerAmount) * 100).toFixed(1)}% of offer</p>
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Due Diligence</label>
                  <p className="text-lg font-bold text-gray-900">{displayLOI.dueDiligencePeriod} days</p>
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Close By</label>
                  <p className="text-lg font-bold text-gray-900">{displayLOI.closingPeriod} days</p>
                </div>
              </div>
            </div>

            {/* Structure-specific */}
            {displayLOI.structure === "seller_carry" && displayLOI.financingTerms && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-amber-50 border border-amber-200 rounded-xl p-5"
              >
                <h3 className="text-sm font-bold text-amber-900 mb-4 flex items-center gap-2">
                  <Handshake className="w-4 h-4" />
                  Seller Carry Terms
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-amber-700 uppercase tracking-wider block mb-1">Down Payment</label>
                    <p className="text-xl font-bold text-gray-900">{displayLOI.financingTerms.downPercent}%</p>
                    <p className="text-[10px] text-amber-700">{fmt(Math.round(displayLOI.offerAmount * (displayLOI.financingTerms.downPercent! / 100)))} at close</p>
                  </div>
                  <div>
                    <label className="text-[10px] text-amber-700 uppercase tracking-wider block mb-1">Note Term</label>
                    <p className="text-xl font-bold text-gray-900">{displayLOI.financingTerms.termYears}yr</p>
                    <p className="text-[10px] text-amber-700">Amortized</p>
                  </div>
                  <div>
                    <label className="text-[10px] text-amber-700 uppercase tracking-wider block mb-1">Interest Rate</label>
                    <p className="text-xl font-bold text-gray-900">{displayLOI.financingTerms.interestRate}%</p>
                  </div>
                  <div>
                    <label className="text-[10px] text-amber-700 uppercase tracking-wider block mb-1">Balloon Year</label>
                    <p className="text-xl font-bold text-gray-900">Year {displayLOI.financingTerms.balloonYear}</p>
                  </div>
                  <div className="col-span-2 bg-white rounded-lg p-3 border border-amber-200">
                    <label className="text-[10px] text-amber-700 uppercase tracking-wider block mb-1">Monthly Payment</label>
                    <p className="text-2xl font-bold text-[#0049B8]">{fmt(displayLOI.financingTerms.monthlyPayment!)}/mo</p>
                  </div>
                </div>
              </motion.div>
            )}

            {displayLOI.structure === "phased_closing" && displayLOI.phases && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-purple-50 border border-purple-200 rounded-xl p-5"
              >
                <h3 className="text-sm font-bold text-purple-900 mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  Phased Closings ({displayLOI.phases.length})
                </h3>
                <div className="space-y-2">
                  {displayLOI.phases.map(p => (
                    <div key={p.phase} className="bg-white rounded-lg p-3 border border-purple-100 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-600 text-white flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold">{p.phase}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{fmt(p.amount)}</p>
                        <p className="text-xs text-gray-500 truncate">{p.trigger}</p>
                      </div>
                      <span className="text-[10px] text-gray-400 whitespace-nowrap">{p.targetDate}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Contingencies */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#0049B8]" />
                Contingencies ({displayLOI.contingencies.length})
              </h3>
              <div className="space-y-1.5">
                {displayLOI.contingencies.map((c, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#0049B8] text-white font-medium hover:bg-[#003a93] transition-colors shadow-lg shadow-[#0049B8]/25">
                <Download className="w-4 h-4" /> Download PDF
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                <Send className="w-4 h-4" /> Send for Review
              </button>
            </div>
          </div>

          {/* Live LOI Preview */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileSignature className="w-4 h-4 text-[#0049B8]" />
                  <span className="text-xs font-semibold text-gray-700">LOI Preview</span>
                </div>
                <span className="text-[10px] text-gray-400 font-mono">{displayLOI.id}</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={displayLOI.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-6 md:p-8 max-h-[820px] overflow-y-auto"
                >
                  <div className="text-center mb-6 pb-5 border-b border-gray-200">
                    <h1 className="text-xl font-bold text-gray-900 mb-1">LETTER OF INTENT</h1>
                    <p className="text-xs text-gray-500">For the Purchase of Real Property</p>
                  </div>

                  <div className="space-y-5 text-sm">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Buyer</p>
                      <p className="font-semibold text-gray-900">{displayLOI.buyerEntity}</p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Seller</p>
                      <p className="font-semibold text-gray-900">{displayLOI.sellerName}</p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Subject Property</p>
                      <p className="font-semibold text-gray-900">{displayLOI.propertyAddress}</p>
                      <p className="text-xs text-gray-500 mt-1">Parcel: {displayLOI.parcelNumber} · {displayLOI.acres} acres</p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-3 font-semibold">Financial Terms</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Purchase price</span>
                          <span className="font-bold text-gray-900">{fmt(displayLOI.offerAmount)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Earnest money</span>
                          <span className="font-semibold text-gray-900">{fmt(displayLOI.earnestDeposit)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Due diligence period</span>
                          <span className="font-semibold text-gray-900">{displayLOI.dueDiligencePeriod} days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Closing</span>
                          <span className="font-semibold text-gray-900">Within {displayLOI.closingPeriod} days</span>
                        </div>
                      </div>
                    </div>

                    {displayLOI.structure === "seller_carry" && displayLOI.financingTerms && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <p className="text-[10px] uppercase tracking-wider text-amber-700 mb-3 font-semibold">Seller Financing</p>
                        <div className="space-y-1.5 text-sm">
                          <div className="flex justify-between"><span className="text-gray-600">Down payment</span><span className="font-semibold">{displayLOI.financingTerms.downPercent}% ({fmt(Math.round(displayLOI.offerAmount * displayLOI.financingTerms.downPercent! / 100))})</span></div>
                          <div className="flex justify-between"><span className="text-gray-600">Note amount</span><span className="font-semibold">{fmt(Math.round(displayLOI.offerAmount * (1 - displayLOI.financingTerms.downPercent! / 100)))}</span></div>
                          <div className="flex justify-between"><span className="text-gray-600">Term</span><span className="font-semibold">{displayLOI.financingTerms.termYears} years</span></div>
                          <div className="flex justify-between"><span className="text-gray-600">Interest</span><span className="font-semibold">{displayLOI.financingTerms.interestRate}% fixed</span></div>
                          <div className="flex justify-between"><span className="text-gray-600">Payment</span><span className="font-semibold">{fmt(displayLOI.financingTerms.monthlyPayment!)}/mo</span></div>
                          <div className="flex justify-between"><span className="text-gray-600">Balloon</span><span className="font-semibold">Year {displayLOI.financingTerms.balloonYear}</span></div>
                        </div>
                      </div>
                    )}

                    {displayLOI.structure === "phased_closing" && displayLOI.phases && (
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <p className="text-[10px] uppercase tracking-wider text-purple-700 mb-3 font-semibold">Phased Closings</p>
                        <div className="space-y-2">
                          {displayLOI.phases.map(p => (
                            <div key={p.phase} className="flex items-start gap-2 text-xs">
                              <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">{p.phase}</span>
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900">{fmt(p.amount)} — {p.targetDate}</p>
                                <p className="text-gray-600">{p.trigger}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-2 font-semibold">Contingencies</p>
                      <ol className="space-y-1 text-xs text-gray-700 list-decimal pl-4">
                        {displayLOI.contingencies.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ol>
                    </div>

                    <div className="pt-4 border-t border-gray-200 text-[10px] text-gray-400 italic">
                      This Letter of Intent is non-binding except for the confidentiality and exclusivity provisions. The parties intend to negotiate a definitive Purchase and Sale Agreement reflecting the terms above within the due diligence period.
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
