"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Phone, PhoneCall, PhoneOff, PhoneIncoming, Search,
  CheckCircle2, Calendar, Clock, X, Sparkles, Users,
  Mail, MapPin, Database
} from "lucide-react"
import { skipTraceResults, skipTraceStats } from "@/data/skiptrace"
import { callLogs, callStats, appointments, type CallLog } from "@/data/calls"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const resultConfig = {
  interested: { label: "Interested", color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", icon: Sparkles },
  appointment_set: { label: "Appointment Set", color: "text-[#0049B8]", bg: "bg-blue-50", border: "border-[#0049B8]/30", icon: Calendar },
  not_interested: { label: "Not Interested", color: "text-gray-600", bg: "bg-gray-50", border: "border-gray-200", icon: PhoneOff },
  callback: { label: "Callback", color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200", icon: PhoneIncoming },
  no_answer: { label: "No Answer", color: "text-gray-500", bg: "bg-gray-50", border: "border-gray-200", icon: PhoneOff },
  wrong_number: { label: "Wrong Number", color: "text-red-600", bg: "bg-red-50", border: "border-red-200", icon: PhoneOff }
}

export default function OutreachPage() {
  const [view, setView] = useState<"calls" | "skip_trace" | "appointments">("calls")
  const [selectedCall, setSelectedCall] = useState<CallLog | null>(null)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Skip Trace & Outreach</h1>
            <p className="text-sm text-gray-400 mt-1">Multi-source skip tracing → VAPI AI cold calls → auto-scheduled appointments with Mitch.</p>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
            <button onClick={() => setView("calls")} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${view === "calls" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}>
              <Phone className="w-3.5 h-3.5 inline mr-1.5" /> Call Log
            </button>
            <button onClick={() => setView("skip_trace")} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${view === "skip_trace" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}>
              <Search className="w-3.5 h-3.5 inline mr-1.5" /> Skip Trace
            </button>
            <button onClick={() => setView("appointments")} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${view === "appointments" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}>
              <Calendar className="w-3.5 h-3.5 inline mr-1.5" /> Appointments ({appointments.length})
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {[
            { label: "Calls Today", value: callStats.callsToday.toString(), icon: PhoneCall, color: "text-[#0049B8]" },
            { label: "Interested", value: callStats.interested.toString(), icon: Sparkles, color: "text-emerald-500" },
            { label: "Appointments", value: callStats.appointmentsSet.toString(), icon: Calendar, color: "text-blue-500" },
            { label: "Hit Rate", value: `${skipTraceStats.hitRate}%`, icon: Search, color: "text-purple-500" },
            { label: "Avg Duration", value: `${Math.round(callStats.avgDuration / 60)}m ${callStats.avgDuration % 60}s`, icon: Clock, color: "text-amber-500" },
            { label: "Daily Cost", value: `$${callStats.nemotronCost.toFixed(2)}`, icon: Database, color: "text-orange-500" }
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

        {/* Call Log View */}
        {view === "calls" && (
          <div className="space-y-3">
            {callLogs.map((call, i) => {
              const cfg = resultConfig[call.result]
              const Icon = cfg.icon
              return (
                <motion.div
                  key={call.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i }}
                  onClick={() => setSelectedCall(call)}
                  className="group bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:shadow-md hover:border-gray-300 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-mono text-gray-400">{call.id}</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${cfg.bg} ${cfg.color} ${cfg.border}`}>
                          <Icon className="w-3 h-3" />
                          {cfg.label}
                        </span>
                        <span className="text-[10px] text-gray-400">{new Date(call.calledAt).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                        {call.duration > 0 && (
                          <span className="text-[10px] text-gray-400 flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" /> {Math.floor(call.duration / 60)}m {call.duration % 60}s
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-[#0049B8] transition-colors">{call.ownerName}</h3>
                      <p className="text-sm text-gray-500">{call.parcelAddress}</p>
                      {call.transcript.length > 0 && (
                        <div className="mt-2 p-2 bg-gray-50 rounded-lg border border-gray-100">
                          <p className="text-xs text-gray-600 line-clamp-2">
                            <span className="font-medium text-gray-700">AI: </span>
                            {call.transcript[call.transcript.length - 2]?.text || call.transcript[0].text}
                          </p>
                        </div>
                      )}
                      {call.pricingSignal && (
                        <div className="flex items-center gap-2 mt-2 text-xs">
                          <span className="text-gray-400">Pricing:</span>
                          <span className="text-gray-700 font-medium">{call.pricingSignal}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-[10px] text-gray-400">Next action</p>
                      <p className="text-xs text-gray-700 max-w-[240px] line-clamp-2">{call.nextAction}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}

        {/* Skip Trace View */}
        {view === "skip_trace" && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-[#0049B8]/5 to-indigo-50 border border-[#0049B8]/20 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">{skipTraceStats.parcelsComplete}/{skipTraceStats.parcelsQueued} parcels traced</p>
                <p className="text-xs text-gray-500">Avg {skipTraceStats.avgNumbersPerOwner} numbers per owner across {skipTraceStats.sourcesAggregated} sources</p>
              </div>
              <button className="px-4 py-2 rounded-lg bg-[#0049B8] text-white text-sm font-medium hover:bg-[#003a93] transition-colors">
                Run on 7 Remaining
              </button>
            </div>

            {skipTraceResults.map((result, i) => (
              <motion.div
                key={result.parcelId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="bg-white border border-gray-200 rounded-xl p-4"
              >
                <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                  <div>
                    <span className="text-xs font-mono text-gray-400">{result.parcelId}</span>
                    <h3 className="text-base font-bold text-gray-900">{result.ownerName}</h3>
                    <p className="text-xs text-gray-400">Ran {result.ranAt}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Hit rate</p>
                    <p className="text-lg font-bold text-emerald-600">{result.hitRate}%</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Phone numbers */}
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">Phone numbers ({result.phoneNumbers.length})</p>
                    <div className="space-y-1.5">
                      {result.phoneNumbers.map(phone => (
                        <div key={phone.number} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-100">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <Phone className="w-3 h-3 text-[#0049B8]" />
                              <span className="text-sm font-mono text-gray-900">{phone.number}</span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white border border-gray-200 text-gray-500">{phone.lineType}</span>
                            </div>
                            <div className="flex items-center gap-1.5 mt-1">
                              {phone.sources.map(s => (
                                <span key={s} className="text-[10px] text-gray-400">{s}</span>
                              ))}
                              <span className="text-[10px] text-gray-400">· {phone.recency}</span>
                            </div>
                          </div>
                          <span className={`text-xs font-bold ${phone.confidence >= 85 ? "text-emerald-600" : phone.confidence >= 70 ? "text-amber-600" : "text-gray-400"}`}>
                            {phone.confidence}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sources + Emails */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">Sources aggregated</p>
                      <div className="flex flex-wrap gap-1.5">
                        {result.sources.map(s => (
                          <span key={s.source} className="text-xs px-2 py-1 bg-gray-50 border border-gray-100 rounded-md text-gray-700 flex items-center gap-1">
                            {s.source}
                            <span className="text-[10px] text-gray-400">({s.hits})</span>
                          </span>
                        ))}
                      </div>
                    </div>
                    {result.emails.length > 0 && (
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">Emails ({result.emails.length})</p>
                        <div className="space-y-1">
                          {result.emails.map(e => (
                            <div key={e} className="flex items-center gap-1.5 text-xs text-gray-700">
                              <Mail className="w-3 h-3 text-blue-500" />
                              <span className="font-mono">{e}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {result.altAddresses.length > 1 && (
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Alt addresses</p>
                        <div className="space-y-0.5">
                          {result.altAddresses.map(a => (
                            <div key={a} className="flex items-start gap-1.5 text-xs text-gray-600">
                              <MapPin className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                              <span>{a}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Appointments View */}
        {view === "appointments" && (
          <div className="space-y-3">
            <div className="bg-[#0049B8]/5 border border-[#0049B8]/20 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0049B8] flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Upcoming calls with Mitch</p>
                  <p className="text-xs text-gray-500">Auto-scheduled from AI call results. Briefing auto-generated per appointment.</p>
                </div>
              </div>
            </div>

            {appointments.map((appt, i) => (
              <motion.div
                key={appt.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="bg-white border border-gray-200 rounded-xl p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 text-center">
                    <div className="bg-[#0049B8] text-white rounded-t-lg py-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider">
                        {new Date(appt.date + "T00:00:00").toLocaleDateString([], { month: "short" })}
                      </p>
                    </div>
                    <div className="bg-white border border-gray-200 border-t-0 rounded-b-lg py-2">
                      <p className="text-2xl font-bold text-gray-900">
                        {new Date(appt.date + "T00:00:00").toLocaleDateString([], { day: "numeric" })}
                      </p>
                      <p className="text-[10px] text-gray-500">
                        {new Date(appt.date + "T00:00:00").toLocaleDateString([], { weekday: "short" })}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-gray-400">{appt.id}</span>
                      <span className="text-xs text-gray-400">{appt.time}</span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900">{appt.ownerName}</h3>
                    <p className="text-xs text-gray-500 mb-2">Parcel {appt.parcelId}</p>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {appt.attendees.map(a => (
                        <span key={a} className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] rounded-full bg-gray-100 text-gray-700">
                          <Users className="w-2.5 h-2.5" />
                          {a}
                        </span>
                      ))}
                    </div>

                    <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                      <p className="text-[10px] text-amber-700 uppercase tracking-wider font-bold mb-1">Briefing for Mitch</p>
                      <p className="text-xs text-gray-700 leading-relaxed">{appt.briefing}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />

      {/* Call Detail Drawer */}
      <AnimatePresence>
        {selectedCall && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              onClick={() => setSelectedCall(null)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full md:max-w-xl bg-white border-l border-gray-200 shadow-2xl overflow-y-auto"
            >
              <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 px-6 py-4 flex items-start justify-between z-10">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-mono text-gray-400">{selectedCall.id}</span>
                    {(() => {
                      const cfg = resultConfig[selectedCall.result]
                      const Icon = cfg.icon
                      return (
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${cfg.bg} ${cfg.color} ${cfg.border}`}>
                          <Icon className="w-3 h-3" />
                          {cfg.label}
                        </span>
                      )
                    })()}
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">{selectedCall.ownerName}</h2>
                  <p className="text-sm text-gray-500">{selectedCall.parcelAddress}</p>
                </div>
                <button onClick={() => setSelectedCall(null)} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
                    <Phone className="w-4 h-4 text-[#0049B8] mx-auto mb-1" />
                    <p className="text-xs font-mono text-gray-900">{selectedCall.phoneDialed}</p>
                    <p className="text-[10px] text-gray-400">Dialed</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
                    <Clock className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                    <p className="text-sm font-bold text-gray-900">
                      {selectedCall.duration > 0 ? `${Math.floor(selectedCall.duration / 60)}m ${selectedCall.duration % 60}s` : "—"}
                    </p>
                    <p className="text-[10px] text-gray-400">Duration</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
                    <Calendar className="w-4 h-4 text-gray-500 mx-auto mb-1" />
                    <p className="text-sm font-bold text-gray-900">
                      {new Date(selectedCall.calledAt).toLocaleDateString([], { month: "short", day: "numeric" })}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      {new Date(selectedCall.calledAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>

                {selectedCall.transcript.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Live Transcription</h3>
                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-3 max-h-[460px] overflow-y-auto">
                      {selectedCall.transcript.map((line, i) => (
                        <div key={i} className={`flex gap-2 ${line.speaker === "AI" ? "flex-row" : "flex-row-reverse"}`}>
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${
                            line.speaker === "AI" ? "bg-[#0049B8] text-white" : "bg-gray-300 text-gray-700"
                          }`}>
                            {line.speaker === "AI" ? "AI" : "O"}
                          </div>
                          <div className={`rounded-xl p-3 max-w-[85%] ${
                            line.speaker === "AI" ? "bg-white border border-gray-200" : "bg-[#0049B8] text-white"
                          }`}>
                            <p className="text-xs">{line.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {(selectedCall.pricingSignal || selectedCall.timelineSignal) && (
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                    <h3 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">Signals Captured</h3>
                    <div className="space-y-1.5 text-sm">
                      {selectedCall.pricingSignal && (
                        <div className="flex gap-2"><span className="text-gray-500 text-xs w-16 flex-shrink-0">Pricing:</span><span className="text-gray-700">{selectedCall.pricingSignal}</span></div>
                      )}
                      {selectedCall.timelineSignal && (
                        <div className="flex gap-2"><span className="text-gray-500 text-xs w-16 flex-shrink-0">Timeline:</span><span className="text-gray-700">{selectedCall.timelineSignal}</span></div>
                      )}
                    </div>
                  </div>
                )}

                <div className="bg-[#0049B8]/5 border border-[#0049B8]/20 rounded-xl p-4">
                  <h3 className="text-xs font-bold text-[#0049B8] uppercase tracking-wider mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Next Action
                  </h3>
                  <p className="text-sm text-gray-700">{selectedCall.nextAction}</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
