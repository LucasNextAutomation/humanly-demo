"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, FileText } from "lucide-react"

const HUMANLY_NAVY = "#0F1F3D"
const HUMANLY_GOLD = "#C9A96E"
const PROPOSAL_URL = "https://nextautomation.us/proposals/humanly"

const navItems = [
  { href: "/", label: "Overview" },
  { href: "/module-a", label: "Module A" },
  { href: "/module-b", label: "Module B" },
  { href: "/module-c", label: "Module C" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b" style={{ borderColor: `${HUMANLY_NAVY}10` }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="leading-tight">
              <span className="block text-sm font-semibold tracking-tight" style={{ color: HUMANLY_NAVY }}>Humanly</span>
              <span className="block text-[9px] uppercase tracking-[0.2em] opacity-70" style={{ color: HUMANLY_GOLD }}>×&nbsp;NextAutomation</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-1.5 rounded-md text-[13px] font-medium transition-all"
                  style={
                    active
                      ? { background: `${HUMANLY_NAVY}10`, color: HUMANLY_NAVY }
                      : { color: `${HUMANLY_NAVY}99` }
                  }
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={PROPOSAL_URL}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-[12px] font-semibold transition-all hover:opacity-90"
              style={{ background: HUMANLY_NAVY, color: HUMANLY_GOLD }}
            >
              <FileText className="w-3.5 h-3.5" />
              Proposal
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-md"
              style={{ color: `${HUMANLY_NAVY}99` }}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-white" style={{ borderColor: `${HUMANLY_NAVY}10` }}>
          <div className="px-6 py-3 space-y-1">
            {navItems.map(item => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-md text-sm font-medium transition-all"
                  style={
                    active
                      ? { background: `${HUMANLY_NAVY}10`, color: HUMANLY_NAVY }
                      : { color: `${HUMANLY_NAVY}99` }
                  }
                >
                  {item.label}
                </Link>
              )
            })}
            <a
              href={PROPOSAL_URL}
              className="flex items-center gap-2 mt-2 px-3 py-2.5 rounded-md text-sm font-semibold"
              style={{ background: HUMANLY_NAVY, color: HUMANLY_GOLD }}
            >
              <FileText className="w-4 h-4" />
              Read the proposal
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
