"use client"

import { motion } from "framer-motion"
import {
  X, MapPin, Layers, AlertTriangle, Droplets, Zap as ZapIcon,
  Users, Home, Database, ChevronLeft, ChevronRight, Calendar, TrendingUp
} from "lucide-react"
import { type Parcel, fmt } from "@/data/parcels"

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 85 ? "bg-red-500/10 text-red-600 border-red-200"
    : score >= 70 ? "bg-amber-500/10 text-amber-600 border-amber-200"
    : "bg-emerald-500/10 text-emerald-600 border-emerald-200"
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${color}`}>
      {score}/100
    </span>
  )
}

export default function ParcelSlideout({
  parcel,
  onClose,
  onPrev,
  onNext,
  aggregateParcels,
}: {
  parcel: Parcel
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
  aggregateParcels: Parcel[]
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
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
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-gray-400">{parcel.id}</span>
              <ScoreBadge score={parcel.distressScore} />
              {parcel.aggregateId && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0049B8] text-white">
                  <Layers className="w-3 h-3" /> Aggregate
                </span>
              )}
            </div>
            <h2 className="text-lg font-bold text-gray-900">{parcel.address}</h2>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {parcel.city}, FL — {parcel.county} County
            </p>
          </div>
          <div className="flex items-center gap-1">
            {onPrev && (
              <button onClick={onPrev} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors" title="Previous">
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            {onNext && (
              <button onClick={onNext} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors" title="Next">
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Map placeholder */}
          <div className="relative h-40 rounded-xl overflow-hidden border border-gray-200 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
            <div className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: "radial-gradient(circle at 30% 40%, rgba(0,73,184,0.15) 0%, transparent 40%), radial-gradient(circle at 70% 60%, rgba(16,185,129,0.15) 0%, transparent 40%)"
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-lg border border-gray-200 shadow-sm flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0049B8]" />
                <span className="text-sm font-medium text-gray-900">{parcel.lat.toFixed(4)}, {parcel.lng.toFixed(4)}</span>
              </div>
            </div>
            <span className="absolute bottom-2 left-3 text-[10px] text-gray-400 font-medium">Parcel map view — {parcel.msa} MSA</span>
          </div>

          {/* Core stats */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "Acres", value: parcel.acres.toString(), sub: parcel.zoning },
              { label: "Market Val", value: fmt(parcel.marketValue), sub: `${fmt(parcel.pricePerAcre)}/ac` },
              { label: "Owned", value: `${parcel.yearsOwned}yr`, sub: parcel.lastSaleDate ? new Date(parcel.lastSaleDate).getFullYear().toString() : "" },
              { label: "Score", value: `${parcel.distressScore}`, sub: "/100" },
            ].map(s => (
              <div key={s.label} className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">{s.label}</p>
                <p className="text-lg font-bold text-gray-900 mt-1">{s.value}</p>
                <p className="text-[10px] text-gray-400">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Aggregate tract details */}
          {parcel.aggregateId && aggregateParcels.length > 1 && (
            <div className="bg-[#0049B8]/5 border border-[#0049B8]/20 rounded-xl p-4">
              <h3 className="text-xs font-bold text-[#0049B8] uppercase tracking-wider mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4" /> Aggregate Tract — {parcel.aggregateTotalAcres} acres
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                The system detected that <span className="font-semibold">{parcel.aggregateOwner}</span> owns {aggregateParcels.length} nearby parcels.
                Combined, they form a {parcel.aggregateTotalAcres}-acre development tract.
              </p>
              <div className="space-y-2">
                {aggregateParcels.map(p => (
                  <div key={p.id} className={`flex items-center justify-between px-3 py-2 rounded-lg ${p.id === parcel.id ? "bg-[#0049B8] text-white" : "bg-white border border-gray-100"}`}>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-mono ${p.id === parcel.id ? "text-white/80" : "text-gray-400"}`}>{p.id}</span>
                      <span className={`text-sm font-medium ${p.id === parcel.id ? "text-white" : "text-gray-900"}`}>{p.ownerName}</span>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-bold ${p.id === parcel.id ? "text-white" : "text-gray-900"}`}>{p.acres}ac</span>
                      <span className={`text-[10px] block ${p.id === parcel.id ? "text-white/70" : "text-gray-400"}`}>{p.zoning}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Owner Info */}
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Users className="w-3.5 h-3.5" /> Owner
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Name</span>
                <span className="text-gray-900 font-medium">{parcel.ownerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Type</span>
                <span className="text-gray-900">{parcel.ownerType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">State</span>
                <span className="text-gray-900">{parcel.ownerState} {parcel.ownerState !== "FL" && <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-700">out-of-state</span>}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-xs">Mailing address</span>
                <span className="text-gray-700 text-xs">{parcel.ownerMailing}</span>
              </div>
            </div>
          </div>

          {/* Distress Signals */}
          <div className="bg-red-50 border border-red-100 rounded-xl p-4">
            <h3 className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2 flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5" /> Distress & Development Signals
            </h3>
            <div className="space-y-1.5">
              {parcel.distressSignals.map((s, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                  <span className="text-gray-700">{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Utilities */}
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <ZapIcon className="w-3.5 h-3.5" /> Utility Districts
            </h3>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <div className="flex items-center gap-1 text-gray-400 mb-1"><Droplets className="w-3 h-3" /> Water</div>
                <p className="text-gray-900 font-medium">{parcel.utilityDistrict.water}</p>
              </div>
              <div>
                <div className="flex items-center gap-1 text-gray-400 mb-1"><Droplets className="w-3 h-3" /> Sewer</div>
                <p className="text-gray-900 font-medium">{parcel.utilityDistrict.sewer}</p>
              </div>
              <div>
                <div className="flex items-center gap-1 text-gray-400 mb-1"><ZapIcon className="w-3 h-3" /> Electric</div>
                <p className="text-gray-900 font-medium">{parcel.utilityDistrict.electric}</p>
              </div>
            </div>
          </div>

          {/* Development Fit */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
            <h3 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Home className="w-3.5 h-3.5" /> Development Fit
            </h3>
            <div className="space-y-1.5">
              {parcel.developmentFit.map((f, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Financials */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Financials</h3>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="grid grid-cols-2 divide-x divide-gray-100">
                <div className="p-3">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Assessed</p>
                  <p className="text-sm font-bold text-gray-900">{fmt(parcel.assessedValue)}</p>
                </div>
                <div className="p-3">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Market</p>
                  <p className="text-sm font-bold text-gray-900">{fmt(parcel.marketValue)}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-100 border-t border-gray-100">
                <div className="p-3">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Last sale</p>
                  <p className="text-sm font-bold text-gray-900">{parcel.lastSalePrice ? fmt(parcel.lastSalePrice) : "—"}</p>
                  <p className="text-[10px] text-gray-400">{parcel.lastSaleDate ? new Date(parcel.lastSaleDate).toLocaleDateString() : ""}</p>
                </div>
                <div className="p-3">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Appreciation</p>
                  <p className="text-sm font-bold text-emerald-600">
                    {parcel.lastSalePrice ? `${Math.round(((parcel.marketValue - parcel.lastSalePrice) / parcel.lastSalePrice) * 100)}%` : "—"}
                  </p>
                  <p className="text-[10px] text-gray-400">{parcel.yearsOwned}yr hold</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sources */}
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Database className="w-3.5 h-3.5" /> Data Sources
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {parcel.source.map((s, i) => (
                <span key={i} className="px-2 py-1 bg-white border border-gray-200 text-xs text-gray-600 rounded-md">{s}</span>
              ))}
            </div>
            <p className="text-[10px] text-gray-400 mt-2 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> First found {new Date(parcel.dateFound).toLocaleDateString()}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  )
}
