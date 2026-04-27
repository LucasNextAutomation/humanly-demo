const HUMANLY_NAVY = "#0F1F3D"
const HUMANLY_GOLD = "#C9A96E"

export default function Footer() {
  return (
    <footer className="py-10 border-t mt-16" style={{ borderColor: `${HUMANLY_NAVY}10`, background: "#FAFAF8" }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-[11px]" style={{ color: `${HUMANLY_NAVY}80` }}>
          <span className="font-semibold" style={{ color: HUMANLY_NAVY }}>Humanly × NextAutomation</span>
          <span className="mx-2 opacity-40">·</span>
          <span>Interactive demo — data is illustrative</span>
        </div>
        <div className="text-[11px]" style={{ color: `${HUMANLY_NAVY}80` }}>
          Built by{" "}
          <a href="https://nextautomation.us" className="font-semibold hover:underline" style={{ color: HUMANLY_GOLD }}>
            NextAutomation
          </a>
        </div>
      </div>
    </footer>
  )
}
