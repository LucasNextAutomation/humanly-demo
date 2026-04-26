"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserCircle, PhoneCall, TrendingUp, Menu, X, Building2, FileText } from "lucide-react"

const HUMANLY_NAVY = "#0F1F3D"
const HUMANLY_GOLD = "#C9A96E"
const PROPOSAL_URL = "https://nextautomation.us/proposals/humanly"

const navItems = [
  { href: "/", label: "Overview" },
  { href: "/deal-finder", label: "Entity Resolution", icon: UserCircle },
  { href: "/outreach", label: "Skip Trace + VAPI", icon: PhoneCall },
  { href: "/loi-generator", label: "Demand Intelligence", icon: TrendingUp },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: HUMANLY_NAVY }}>
              <Building2 className="w-[18px] h-[18px]" style={{ color: HUMANLY_GOLD }} />
            </div>
            <div className="hidden sm:block leading-tight">
              <span className="block text-sm font-semibold tracking-tight" style={{ color: HUMANLY_NAVY }}>Humanly</span>
              <span className="block text-[10px] uppercase tracking-wider" style={{ color: HUMANLY_GOLD }}>Owner + Outreach Layer · Demo</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map(item => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "bg-gray-900 text-white"
                      : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {item.icon && <item.icon className="w-3.5 h-3.5" />}
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={PROPOSAL_URL}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-[1.02]"
              style={{ background: HUMANLY_GOLD, color: HUMANLY_NAVY, boxShadow: `0 2px 8px ${HUMANLY_GOLD}40` }}
            >
              <FileText className="w-3.5 h-3.5" />
              View Proposal
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-50 text-gray-400"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-0.5">
            {navItems.map(item => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "bg-gray-900 text-white"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.label}
                </Link>
              )
            })}
            <a
              href={PROPOSAL_URL}
              className="flex items-center gap-2 mt-2 px-4 py-3 rounded-lg text-sm font-semibold"
              style={{ background: HUMANLY_GOLD, color: HUMANLY_NAVY }}
            >
              <FileText className="w-4 h-4" />
              View Full Proposal
            </a>
            <div className="pt-3 mt-2 border-t border-gray-100 px-4 text-xs text-gray-400">
              Built by <span className="font-medium" style={{ color: HUMANLY_NAVY }}>NextAutomation</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
