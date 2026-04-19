import { motion } from "framer-motion"
import { Home, CreditCard, Bell, Eye, LogOut, ChevronLeft } from "lucide-react"
import clsx from "clsx"

const TOP_TABS = [
  { id: "home", label: "Mi Perfil", icon: Home },
  { id: "cedula", label: "Identidad", icon: CreditCard },
]

export default function TopBar({ activeSection, setActiveSection, onLogout }) {
  const isSubSection = !["home", "cedula"].includes(activeSection)

  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between px-5 py-3 border-b"
      style={{
        background: "rgba(8,12,22,0.92)",
        backdropFilter: "blur(18px)",
        borderColor: "rgba(109,40,217,0.14)",
      }}
    >
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <img src="/assets/logo.png" alt="Logo" className="w-10 h-10 object-contain" style={{ mixBlendMode: "screen" }} />
        <div className="hidden sm:block">
          <div className="font-display text-white text-[11px] tracking-widest leading-tight">METROPOLITANA</div>
          <div className="font-display text-[#a855f7] text-[9px] tracking-[0.25em]">ROLEPLAY</div>
        </div>
      </div>

      {/* Center: Tabs */}
      <div className="flex items-center gap-1.5">
        {isSubSection && (
          <button
            onClick={() => setActiveSection("home")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all font-body text-sm mr-1"
          >
            <ChevronLeft size={15} /> Volver
          </button>
        )}
        {TOP_TABS.map(tab => {
          const Icon = tab.icon
          const active = activeSection === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={clsx(
                "relative flex items-center gap-2 px-4 py-2 rounded-lg font-display text-xs tracking-widest transition-all duration-200",
                active ? "text-white" : "text-slate-500 hover:text-slate-200 hover:bg-white/5"
              )}
              style={active ? { background: "rgba(109,40,217,0.18)", boxShadow: "0 0 12px rgba(109,40,217,0.15)" } : {}}
            >
              <Icon size={15} className={active ? "text-[#a855f7]" : ""} />
              {tab.label}
              {active && (
                <motion.div
                  layoutId="topTabIndicator"
                  className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                  style={{ background: "#ec4899", boxShadow: "0 0 8px rgba(236,72,153,0.8)" }}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Right: User */}
      <div className="flex items-center gap-2.5">
        <button className="p-2 rounded-lg hover:bg-white/5 text-slate-500 hover:text-white transition-all"><Bell size={16} /></button>
        <button className="p-2 rounded-lg hover:bg-white/5 text-slate-500 hover:text-white transition-all"><Eye size={16} /></button>
        <div className="hidden md:flex items-center gap-2.5 pl-2 border-l border-white/8 ml-1">
          <div className="text-right">
            <div className="text-white font-display text-[11px] tracking-wider">Jugador_001</div>
            <div className="text-[#22d3ee] font-body text-[10px] flex items-center gap-1 justify-end">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] inline-block" style={{ boxShadow: "0 0 6px rgba(34,211,238,0.9)" }} />
              En línea
            </div>
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-display text-xs shrink-0" style={{ background: "linear-gradient(135deg,#6d28d9,#ec4899)" }}>RP</div>
        </div>
        <button onClick={onLogout} className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all"><LogOut size={15} /></button>
      </div>
    </header>
  )
}
