"use client"

import { useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search, Map as MapIcon, AlertTriangle, MapPin, Layers,
  ChevronRight, Database, Activity, Globe, SlidersHorizontal,
  Radar, ArrowUpDown, Users, Clock, TreePine
} from "lucide-react"
import { mockParcels, dashboardStats, type Parcel, fmt } from "@/data/parcels"
import Navbar from "@/components/Navbar"
import ParcelSlideout from "@/components/ParcelSlideout"
import Footer from "@/components/Footer"

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 85 ? "bg-red-500/10 text-red-600 border-red-200"
    : score >= 70 ? "bg-amber-500/10 text-amber-600 border-amber-200"
    : "bg-emerald-500/10 text-emerald-600 border-emerald-200"
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border ${color}`}>{score}</span>
}

function StatusBadge({ status }: { status: Parcel["status"] }) {
  const styles = {
    new: "bg-blue-500/10 text-blue-600 border-blue-200",
    contacted: "bg-amber-500/10 text-amber-600 border-amber-200",
    loi_sent: "bg-purple-500/10 text-purple-600 border-purple-200",
    negotiation: "bg-indigo-500/10 text-indigo-700 border-indigo-200",
    passed: "bg-gray-500/10 text-gray-500 border-gray-200",
  }
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${styles[status]}`}>{status.replace("_", " ")}</span>
}

type SortKey = "distressScore" | "acres" | "marketValue" | "yearsOwned"

const scanSteps = [
  { label: "Connecting to 15 data sources...", duration: 900 },
  { label: "Scanning FL county assessor records...", duration: 1400 },
  { label: "Self-healing scrapers verified...", duration: 900 },
  { label: "Cross-referencing owner entities...", duration: 1200 },
  { label: "Detecting aggregate tracts...", duration: 1100 },
  { label: "AI scoring distress signals...", duration: 1300 },
]

const initialActivityFeed = [
  { time: "4 min ago", text: "New parcel filed — Osceola County Assessor", type: "new" },
  { time: "12 min ago", text: "Aggregate detected: Marks Family (3 parcels, 90ac)", type: "alert" },
  { time: "28 min ago", text: "Lee County Comp Plan update pulled", type: "update" },
  { time: "1 hr ago", text: "FL SOS — Beachfront Equities LLC status changed", type: "alert" },
  { time: "2 hr ago", text: "WhitePages skip trace complete (6 owners)", type: "update" },
  { time: "3 hr ago", text: "JEA utility service areas refreshed", type: "update" },
]

export default function DealFinderPage() {
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null)
  const [countyFilter, setCountyFilter] = useState("all")
  const [sortBy, setSortBy] = useState<SortKey>("distressScore")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")
  const [showFilters, setShowFilters] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [scanStep, setScanStep] = useState(-1)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanComplete, setScanComplete] = useState(false)
  const [revealedParcels, setRevealedParcels] = useState<string[]>([])
  const [activityFeed, setActivityFeed] = useState(initialActivityFeed)
  const scanningRef = useRef(false)

  const hiddenParcels = mockParcels.filter(p => p.hidden)
  const visibleParcels = mockParcels.filter(p => !p.hidden || revealedParcels.includes(p.id))

  const filteredParcels = visibleParcels
    .filter(p => countyFilter === "all" || p.county === countyFilter)
    .sort((a, b) => {
      const aNew = revealedParcels.includes(a.id) ? 1 : 0
      const bNew = revealedParcels.includes(b.id) ? 1 : 0
      if (aNew !== bNew) return bNew - aNew
      return sortDir === "desc" ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy]
    })

  const counties = [...new Set(mockParcels.filter(p => !p.hidden).map(p => p.county))]
  const totalParcels = scanComplete ? dashboardStats.parcelsFound + hiddenParcels.length : dashboardStats.parcelsFound

  const aggregateParcelsFor = (parcel: Parcel) => parcel.aggregateId
    ? mockParcels.filter(p => p.aggregateId === parcel.aggregateId)
    : [parcel]

  const runScan = useCallback(async () => {
    if (scanningRef.current) return
    scanningRef.current = true
    setScanning(true)
    setScanStep(0)
    setScanProgress(0)
    setScanComplete(false)

    const totalDuration = scanSteps.reduce((s, st) => s + st.duration, 0) + 500
    let elapsed = 0

    for (let i = 0; i < scanSteps.length; i++) {
      setScanStep(i)
      const step = scanSteps[i]

      if (i === 1) {
        setActivityFeed(prev => [{ time: "Just now", text: "Scanning Osceola + Lee County records...", type: "new" }, ...prev.slice(0, 5)])
      }
      if (i === 3) {
        setActivityFeed(prev => [{ time: "Just now", text: "Cross-referencing 2 new LLC entities...", type: "update" }, ...prev.slice(0, 5)])
      }
      if (i === 5) {
        setActivityFeed(prev => [{ time: "Just now", text: "AI flagged P-015 — 92/100, elderly owner + 260ac tract", type: "alert" }, ...prev.slice(0, 5)])
      }

      const startProgress = elapsed / totalDuration * 100
      elapsed += step.duration
      const endProgress = elapsed / totalDuration * 100

      await new Promise<void>(resolve => {
        const startTime = Date.now()
        const animate = () => {
          const fraction = Math.min((Date.now() - startTime) / step.duration, 1)
          setScanProgress(startProgress + (endProgress - startProgress) * fraction)
          if (fraction < 1) requestAnimationFrame(animate)
          else resolve()
        }
        requestAnimationFrame(animate)
      })
    }

    setScanStep(scanSteps.length)
    setScanProgress(100)
    await new Promise(r => setTimeout(r, 500))

    const newParcelIds = hiddenParcels.map(p => p.id)
    setRevealedParcels(newParcelIds)
    setScanComplete(true)
    setScanning(false)
    scanningRef.current = false

    setActivityFeed(prev => [
      { time: "Just now", text: `Scan complete — ${hiddenParcels.length} new parcels scored`, type: "alert" },
      ...prev.slice(0, 5)
    ])
  }, [hiddenParcels])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Land Intelligence Engine</h1>
            <p className="text-sm text-gray-400 flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {dashboardStats.sourcesActive} data sources — Last scan: {new Date(dashboardStats.lastScanTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              <span className="text-gray-300">|</span>
              {dashboardStats.countiesMonitored} FL counties
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={runScan}
              disabled={scanning || scanComplete}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                scanning ? "bg-[#0049B8] text-white animate-pulse cursor-wait"
                : scanComplete ? "bg-emerald-500 text-white cursor-default"
                : "bg-[#0049B8] text-white hover:bg-[#003a93] shadow-lg shadow-[#0049B8]/25"
              }`}
            >
              <Radar className={`w-4 h-4 ${scanning ? "animate-spin" : ""}`} />
              {scanning ? "Scanning..." : scanComplete ? `${hiddenParcels.length} New Found` : "Run Daily Scan"}
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${showFilters ? "bg-gray-900 text-white" : "border border-gray-200 text-gray-500 hover:bg-gray-50"}`}
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
          </div>
        </div>

        {/* Scan Progress */}
        <AnimatePresence>
          {scanning && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-6">
              <div className="bg-[#0049B8]/5 border border-[#0049B8]/20 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#0049B8]">
                    {scanStep < scanSteps.length ? scanSteps[scanStep].label : `Scan complete — ${hiddenParcels.length} new parcels scored`}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">{Math.round(scanProgress)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#0049B8] rounded-full"
                    style={{ width: `${scanProgress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  {scanSteps.map((_, i) => (
                    <span key={i} className={`w-2 h-2 rounded-full ${i < scanStep ? "bg-emerald-500" : i === scanStep ? "bg-[#0049B8] animate-pulse" : "bg-gray-300"}`} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-wrap items-end gap-4">
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">County</label>
                  <select value={countyFilter} onChange={e => setCountyFilter(e.target.value)}
                    className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700">
                    <option value="all">All FL Counties</option>
                    {counties.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Sort By</label>
                  <select value={sortBy} onChange={e => setSortBy(e.target.value as SortKey)}
                    className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700">
                    <option value="distressScore">Distress Score</option>
                    <option value="acres">Acreage</option>
                    <option value="marketValue">Market Value</option>
                    <option value="yearsOwned">Years Owned</option>
                  </select>
                </div>
                <button onClick={() => setSortDir(d => d === "desc" ? "asc" : "desc")}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  {sortDir === "desc" ? "High → Low" : "Low → High"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Parcels Tracked", value: totalParcels.toString(), sub: `${scanComplete ? dashboardStats.newThisWeek + hiddenParcels.length : dashboardStats.newThisWeek} new this week`, icon: Search, color: "text-[#0049B8]" },
            { label: "Aggregate Tracts", value: dashboardStats.aggregateTracts.toString(), sub: "Multi-parcel owners", icon: Layers, color: "text-purple-500" },
            { label: "High Score (85+)", value: (scanComplete ? dashboardStats.highScoreCount + hiddenParcels.filter(p => p.distressScore >= 85).length : dashboardStats.highScoreCount).toString(), sub: "Priority opportunities", icon: AlertTriangle, color: "text-red-500" },
            { label: "Avg Acreage", value: dashboardStats.avgAcreage.toString(), sub: "Across all parcels", icon: TreePine, color: "text-emerald-500" },
          ].map(s => (
            <div key={s.label} className="bg-gray-50/80 border border-gray-100 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <s.icon className={`w-4 h-4 ${s.color}`} />
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">{s.label}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Parcel List */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                {filteredParcels.length} {filteredParcels.length === 1 ? "Parcel" : "Parcels"}
                {countyFilter !== "all" && <span className="text-gray-400 font-normal"> in {countyFilter}</span>}
              </h2>
            </div>

            {filteredParcels.length === 0 && (
              <div className="bg-white border border-dashed border-gray-300 rounded-xl p-12 text-center">
                <MapIcon className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <h3 className="text-sm font-semibold text-gray-500 mb-1">No parcels match your filters</h3>
                <button onClick={() => setCountyFilter("all")} className="mt-3 text-xs text-[#0049B8] font-medium hover:underline">Clear filters</button>
              </div>
            )}

            {filteredParcels.map((parcel, index) => {
              const isNew = revealedParcels.includes(parcel.id)
              return (
                <motion.div
                  key={parcel.id}
                  initial={isNew ? { opacity: 0, y: -20, scale: 0.95 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={isNew ? { delay: 0.2 * revealedParcels.indexOf(parcel.id), type: "spring", stiffness: 200 } : { delay: 0.03 * index }}
                  onClick={() => setSelectedParcel(parcel)}
                  className={`group bg-white border rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${
                    isNew ? "border-[#0049B8] ring-1 ring-[#0049B8]/20" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-mono text-gray-400">{parcel.id}</span>
                        <StatusBadge status={parcel.status} />
                        <ScoreBadge score={parcel.distressScore} />
                        {parcel.aggregateId && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0049B8]/10 text-[#0049B8] border border-[#0049B8]/20">
                            <Layers className="w-2.5 h-2.5" /> {parcel.aggregateTotalAcres}ac aggregate
                          </span>
                        )}
                        {isNew && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0049B8] text-white animate-pulse">
                            NEW
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-[#0049B8] transition-colors">{parcel.address}</h3>
                      <p className="text-sm text-gray-500">{parcel.city}, FL — {parcel.county} County — {parcel.msa}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {parcel.distressSignals.slice(0, 3).map((s, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-red-50 border border-red-100 text-[10px] text-red-600 truncate max-w-[260px]">
                            {s}
                          </span>
                        ))}
                        {parcel.distressSignals.length > 3 && (
                          <span className="px-2 py-0.5 rounded bg-gray-50 text-[10px] text-gray-400">+{parcel.distressSignals.length - 3}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex-shrink-0 grid grid-cols-3 gap-3 text-right hidden sm:grid">
                      <div><p className="text-[10px] text-gray-400">Acres</p><p className="text-sm font-bold text-gray-900">{parcel.acres}</p></div>
                      <div><p className="text-[10px] text-gray-400">Zoning</p><p className="text-sm font-bold text-gray-900">{parcel.zoning}</p></div>
                      <div><p className="text-[10px] text-gray-400">Market</p><p className="text-sm font-bold text-gray-900">{fmt(parcel.marketValue)}</p></div>
                      <div><p className="text-[10px] text-gray-400">$/acre</p><p className="text-sm font-bold text-gray-900">{fmt(parcel.pricePerAcre)}</p></div>
                      <div><p className="text-[10px] text-gray-400">Held</p><p className="text-sm font-bold text-gray-900">{parcel.yearsOwned}yr</p></div>
                      <div><p className="text-[10px] text-gray-400">Owner</p><p className="text-sm font-bold text-gray-900">{parcel.ownerState}</p></div>
                    </div>
                    <div className="flex items-center gap-3 sm:hidden text-right flex-shrink-0">
                      <div><p className="text-[10px] text-gray-400">Acres</p><p className="text-sm font-bold text-gray-900">{parcel.acres}</p></div>
                      <div><p className="text-[10px] text-gray-400">Value</p><p className="text-sm font-bold text-gray-900">{fmt(parcel.marketValue)}</p></div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#0049B8] transition-colors mt-2 flex-shrink-0" />
                  </div>
                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100 flex-wrap">
                    <span className="text-[10px] text-gray-400 flex items-center gap-1"><Users className="w-3 h-3" /> {parcel.ownerName} <span className="text-gray-300">({parcel.ownerType})</span></span>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" /> Found {new Date(parcel.dateFound).toLocaleDateString()}</span>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1"><Database className="w-3 h-3" /> {parcel.source.length} sources</span>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1"><Globe className="w-3 h-3" /> Utilities: {parcel.utilityDistrict.electric}</span>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" /> Parcels by County
              </h3>
              <div className="space-y-2.5">
                {dashboardStats.countyBreakdown.map(c => (
                  <div key={c.county}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-700">{c.county}</span>
                      <span className="text-xs text-gray-400">{c.deals}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full bg-[#0049B8]/50" style={{ width: `${(c.deals / 5) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5" /> Signal Types
              </h3>
              <div className="space-y-2">
                {dashboardStats.signalBreakdown.map(s => (
                  <div key={s.signal} className="flex items-center justify-between">
                    <span className="text-xs text-gray-600 truncate max-w-[140px]">{s.signal}</span>
                    <span className="text-xs font-medium text-gray-400 ml-2">{s.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Activity className="w-3.5 h-3.5" /> Source Activity
              </h3>
              <div className="space-y-3">
                {activityFeed.map((a, i) => (
                  <motion.div
                    key={`${a.text}-${i}`}
                    initial={a.time === "Just now" ? { opacity: 0, x: -10 } : false}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-2"
                  >
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                      a.type === "alert" ? "bg-red-500" : a.type === "new" ? "bg-blue-500" : "bg-gray-400"
                    }`} />
                    <div>
                      <p className="text-xs text-gray-700">{a.text}</p>
                      <p className="text-[10px] text-gray-400">{a.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <AnimatePresence>
        {selectedParcel && (
          <ParcelSlideout
            parcel={selectedParcel}
            aggregateParcels={aggregateParcelsFor(selectedParcel)}
            onClose={() => setSelectedParcel(null)}
            onPrev={filteredParcels.indexOf(selectedParcel) > 0 ? () => setSelectedParcel(filteredParcels[filteredParcels.indexOf(selectedParcel) - 1]) : undefined}
            onNext={filteredParcels.indexOf(selectedParcel) < filteredParcels.length - 1 ? () => setSelectedParcel(filteredParcels[filteredParcels.indexOf(selectedParcel) + 1]) : undefined}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
