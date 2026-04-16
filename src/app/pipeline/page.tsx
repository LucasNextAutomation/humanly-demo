"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Target, TrendingUp, Clock, Layers,
  ChevronRight, Activity, Calendar,
  DollarSign, X, Users, MapPin, FileSignature,
  PhoneCall, MessageSquare, GitCommit
} from "lucide-react"
import {
  pipelineDeals, pipelineActivities, pipelineStats,
  stageConfig, stageOrder, type PipelineDeal, type PipelineStage
} from "@/data/pipeline"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n}`
}

const activityIcons = {
  stage_change: GitCommit,
  call: PhoneCall,
  email: MessageSquare,
  loi: FileSignature,
  note: MessageSquare,
  appointment: Calendar
}

export default function PipelinePage() {
  const [view, setView] = useState<"kanban" | "list">("kanban")
  const [selectedDeal, setSelectedDeal] = useState<PipelineDeal | null>(null)

  const dealsByStage = (stage: PipelineStage) => pipelineDeals.filter(d => d.stage === stage)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Deal Pipeline</h1>
            <p className="text-sm text-gray-400 mt-1">Every parcel from first scrape through executed contract — {pipelineStats.totalDeals} active deals.</p>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
            <button onClick={() => setView("kanban")} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${view === "kanban" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}>Kanban</button>
            <button onClick={() => setView("list")} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${view === "list" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}>List</button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {[
            { label: "Active Deals", value: pipelineStats.totalDeals.toString(), icon: Target, color: "text-[#0049B8]" },
            { label: "Pipeline Value", value: fmt(pipelineStats.totalValue), icon: DollarSign, color: "text-emerald-500" },
            { label: "Weighted Value", value: fmt(pipelineStats.weightedValue), icon: TrendingUp, color: "text-purple-500" },
            { label: "Avg Days in Stage", value: pipelineStats.avgDaysInStage.toFixed(1), icon: Clock, color: "text-amber-500" },
            { label: "Executed This Month", value: pipelineStats.thisMonthExecuted.toString(), icon: GitCommit, color: "text-blue-500" },
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

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Pipeline Kanban/List */}
          <div className="xl:col-span-3">
            {view === "kanban" && (
              <div className="overflow-x-auto">
                <div className="flex gap-3 min-w-[1200px]">
                  {stageOrder.map(stage => {
                    const cfg = stageConfig[stage]
                    const deals = dealsByStage(stage)
                    return (
                      <div key={stage} className="flex-1 min-w-[210px]">
                        <div className="flex items-center justify-between mb-2 px-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-[11px] font-bold uppercase tracking-wider ${cfg.color}`}>{cfg.label}</span>
                            <span className="text-[11px] text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">{deals.length}</span>
                          </div>
                        </div>
                        <div className={`rounded-xl border ${cfg.borderColor} ${cfg.bgColor} p-2 space-y-2 min-h-[200px]`}>
                          {deals.map(deal => (
                            <motion.div
                              key={deal.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              onClick={() => setSelectedDeal(deal)}
                              className="bg-white border border-gray-200 rounded-lg p-3 cursor-pointer hover:shadow-md hover:border-gray-300 transition-all"
                            >
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[10px] font-mono text-gray-400">{deal.id}</span>
                                <span className={`text-[10px] font-bold ${
                                  deal.score >= 85 ? "text-red-600" : deal.score >= 70 ? "text-amber-600" : "text-emerald-600"
                                }`}>{deal.score}</span>
                              </div>
                              <h4 className="text-xs font-semibold text-gray-900 truncate">{deal.address}</h4>
                              <p className="text-[10px] text-gray-500 truncate">{deal.ownerName}</p>

                              <div className="flex items-center justify-between mt-2 text-[10px]">
                                <span className="text-gray-500">{deal.acres}ac</span>
                                <span className="text-gray-700 font-semibold">{fmt(deal.offerAmount || deal.estimatedValue)}</span>
                              </div>

                              {deal.aggregate && (
                                <span className="inline-flex items-center gap-0.5 mt-2 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-[#0049B8]/10 text-[#0049B8]">
                                  <Layers className="w-2.5 h-2.5" /> {deal.aggregateCount} parcels
                                </span>
                              )}

                              <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                                <span className="text-[10px] text-gray-400">
                                  <Clock className="w-2.5 h-2.5 inline mr-0.5" />
                                  {deal.daysInStage}d
                                </span>
                                {deal.dealStructure && (
                                  <span className="text-[10px] text-gray-400 capitalize">{deal.dealStructure.replace("_", " ")}</span>
                                )}
                              </div>
                            </motion.div>
                          ))}
                          {deals.length === 0 && (
                            <div className="text-center py-6 text-[10px] text-gray-400 italic">No deals</div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {view === "list" && (
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      {["Deal", "Owner", "Acres", "Value", "Stage", "Days", "Score", "Next"].map(h => (
                        <th key={h} className="px-3 py-2 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pipelineDeals.map(deal => {
                      const cfg = stageConfig[deal.stage]
                      return (
                        <tr
                          key={deal.id}
                          onClick={() => setSelectedDeal(deal)}
                          className="hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors"
                        >
                          <td className="px-3 py-3">
                            <p className="text-sm font-semibold text-gray-900 truncate max-w-[240px]">{deal.address}</p>
                            <p className="text-[10px] text-gray-400">{deal.city}, {deal.county} · {deal.id}</p>
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-700 max-w-[200px] truncate">{deal.ownerName}</td>
                          <td className="px-3 py-3 text-sm text-gray-700">{deal.acres}</td>
                          <td className="px-3 py-3 text-sm text-gray-900 font-semibold">{fmt(deal.offerAmount || deal.estimatedValue)}</td>
                          <td className="px-3 py-3">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase border ${cfg.bgColor} ${cfg.color} ${cfg.borderColor}`}>
                              {cfg.label}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-sm text-gray-500">{deal.daysInStage}d</td>
                          <td className="px-3 py-3">
                            <span className={`text-sm font-bold ${deal.score >= 85 ? "text-red-600" : deal.score >= 70 ? "text-amber-600" : "text-emerald-600"}`}>
                              {deal.score}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-xs text-gray-500 max-w-[240px] truncate">{deal.nextAction}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Activity Feed */}
          <div className="space-y-4 xl:sticky xl:top-20 xl:self-start">
            <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Activity className="w-3.5 h-3.5" /> Activity Timeline
              </h3>
              <div className="space-y-3">
                {pipelineActivities.map(act => {
                  const Icon = activityIcons[act.type]
                  const deal = pipelineDeals.find(d => d.id === act.dealId)
                  return (
                    <div key={act.id} className="flex items-start gap-2.5 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                        act.type === "appointment" ? "bg-indigo-100 text-indigo-600"
                        : act.type === "loi" ? "bg-[#0049B8]/10 text-[#0049B8]"
                        : act.type === "call" ? "bg-emerald-100 text-emerald-600"
                        : act.type === "stage_change" ? "bg-amber-100 text-amber-600"
                        : "bg-gray-100 text-gray-500"
                      }`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-700">{act.description}</p>
                        {deal && (
                          <p className="text-[10px] text-gray-400 truncate">{deal.address}</p>
                        )}
                        <p className="text-[10px] text-gray-400 mt-0.5">{act.time} · {act.actor}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Conversion Rate */}
            <div className="bg-gradient-to-br from-[#0049B8] to-[#003a93] rounded-xl p-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-medium opacity-80">Conversion Rate</span>
              </div>
              <p className="text-3xl font-bold">{pipelineStats.conversionRate}%</p>
              <p className="text-xs opacity-80 mt-1">Sourced → Executed (YTD)</p>
              <div className="mt-3 pt-3 border-t border-white/20">
                <p className="text-[10px] opacity-70">Weighted pipeline value</p>
                <p className="text-lg font-bold">{fmt(pipelineStats.weightedValue)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Deal Detail */}
      <AnimatePresence>
        {selectedDeal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              onClick={() => setSelectedDeal(null)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full md:max-w-lg bg-white border-l border-gray-200 shadow-2xl overflow-y-auto"
            >
              <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 px-6 py-4 flex items-start justify-between z-10">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-mono text-gray-400">{selectedDeal.id}</span>
                    {(() => {
                      const cfg = stageConfig[selectedDeal.stage]
                      return (
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${cfg.bgColor} ${cfg.color} ${cfg.borderColor}`}>
                          {cfg.label}
                        </span>
                      )
                    })()}
                    {selectedDeal.aggregate && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0049B8] text-white">
                        <Layers className="w-3 h-3" /> Aggregate
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">{selectedDeal.address}</h2>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {selectedDeal.city}, FL — {selectedDeal.county} County
                  </p>
                </div>
                <button onClick={() => setSelectedDeal(null)} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-900">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div className="grid grid-cols-4 gap-3">
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Acres</p>
                    <p className="text-lg font-bold text-gray-900">{selectedDeal.acres}</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Value</p>
                    <p className="text-lg font-bold text-gray-900">{fmt(selectedDeal.estimatedValue)}</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Offer</p>
                    <p className="text-lg font-bold text-gray-900">{selectedDeal.offerAmount ? fmt(selectedDeal.offerAmount) : "—"}</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Days</p>
                    <p className="text-lg font-bold text-gray-900">{selectedDeal.daysInStage}</p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Users className="w-3.5 h-3.5" /> Owner
                  </h3>
                  <p className="text-base font-semibold text-gray-900">{selectedDeal.ownerName}</p>
                </div>

                <div className="bg-[#0049B8]/5 border border-[#0049B8]/20 rounded-xl p-4">
                  <h3 className="text-xs font-bold text-[#0049B8] uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Target className="w-3.5 h-3.5" /> Next Action
                  </h3>
                  <p className="text-sm text-gray-700">{selectedDeal.nextAction}</p>
                  {selectedDeal.nextActionDate && (
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(selectedDeal.nextActionDate + "T00:00:00").toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" })}
                    </p>
                  )}
                </div>

                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Last Activity</h3>
                  <p className="text-sm text-gray-700">{selectedDeal.lastActivity}</p>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Stage Progress</h3>
                  <div className="space-y-1">
                    {stageOrder.map((stage, i) => {
                      const isCurrent = stage === selectedDeal.stage
                      const isPast = stageOrder.indexOf(selectedDeal.stage) > i
                      const cfg = stageConfig[stage]
                      return (
                        <div key={stage} className={`flex items-center gap-3 p-2 rounded-lg ${
                          isCurrent ? `${cfg.bgColor} ${cfg.borderColor} border` : ""
                        }`}>
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isPast ? "bg-emerald-500 text-white" : isCurrent ? "bg-[#0049B8] text-white" : "bg-gray-100 text-gray-400"
                          }`}>
                            {isPast ? "✓" : <span className="text-[10px] font-bold">{i + 1}</span>}
                          </div>
                          <span className={`text-sm ${isCurrent ? "font-semibold text-gray-900" : isPast ? "text-gray-500" : "text-gray-400"}`}>
                            {cfg.label}
                          </span>
                          {isCurrent && <ChevronRight className="w-3.5 h-3.5 text-gray-400 ml-auto" />}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
