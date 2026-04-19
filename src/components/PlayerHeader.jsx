import { useState, useEffect } from "react"
import { Clock, Sparkles } from "lucide-react"

const TIPS = [
  "Las Mystery Box pueden contener artículos exclusivos. ¡Prueba tu suerte!",
  "Recuerda renovar tu permiso de circulación en la Municipalidad.",
  "Puedes solicitar horas para trámites municipales desde el portal.",
  "Mantén tus multas al día para evitar problemas en el Juzgado.",
  "Visita el Banco Central para gestionar tus transferencias.",
  "Tu cédula de identidad es necesaria para realizar trámites oficiales.",
  "El mercado negro ofrece artículos exclusivos a precios especiales.",
  "Gestiona tu empresa desde la sección de Empresas del portal.",
  "Consulta el Juzgado de Policía Local para ver causas pendientes.",
  "El Taller Kenner ofrece reparaciones y mejoras para tus vehículos.",
]

export default function PlayerHeader() {
  const [horaChile, setHoraChile] = useState("")
  const [fechaChile, setFechaChile] = useState("")
  const [tipIdx, setTipIdx] = useState(0)

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setHoraChile(now.toLocaleTimeString("es-CL", { timeZone: "America/Santiago", hour: "2-digit", minute: "2-digit", hour12: true }))
      setFechaChile(now.toLocaleDateString("es-CL", { timeZone: "America/Santiago", weekday: "short", day: "numeric", month: "short", year: "numeric" }))
    }
    update()
    const t = setInterval(update, 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setTipIdx(p => (p + 1) % TIPS.length), 12000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="flex flex-col gap-5">
      {/* Player info bar */}
      <div className="rounded-2xl p-5 border border-white/8" style={{ background: "rgba(22,10,38,0.6)", backdropFilter: "blur(20px)" }}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-display text-lg overflow-hidden" style={{ background: "linear-gradient(135deg,rgba(109,40,217,0.3),rgba(236,72,153,0.2))", border: "1px solid rgba(109,40,217,0.3)" }}>
                RP
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-400 border-2" style={{ borderColor: "#0b0f1a", boxShadow: "0 0 8px rgba(74,222,128,0.9)" }} />
            </div>
            {/* Name + badges */}
            <div>
              <h2 className="font-display text-xl md:text-2xl text-white tracking-wider">Jugador_001</h2>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {[
                  { icon: "🏠", text: "Cesante", bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.3)", color: "#22c55e" },
                  { icon: "🛡️", text: "Civil", bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.3)", color: "#3b82f6" },
                  { icon: "🎮", text: "roblox_user", bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.3)", color: "#ef4444" },
                  { icon: "💬", text: "discord_tag", bg: "rgba(88,101,242,0.12)", border: "rgba(88,101,242,0.3)", color: "#5865F2" },
                ].map(b => (
                  <span key={b.text} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md font-body text-xs" style={{ background: b.bg, border: `1px solid ${b.border}`, color: b.color }}>
                    {b.icon} {b.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {/* Right: Level + Time */}
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-body text-sm">Nivel Ciudadano</span>
              <span className="font-display text-[#f59e0b] text-lg font-bold" style={{ textShadow: "0 0 10px rgba(245,158,11,0.5)" }}>0</span>
            </div>
            <div className="w-48 h-1.5 rounded-full bg-white/8 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: "2%", background: "linear-gradient(90deg,#f59e0b,#ef4444)", minWidth: "4px" }} />
            </div>
            <span className="text-slate-600 font-body text-xs">0h 0m jugadas</span>
            <div className="flex items-center gap-3 mt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-body border border-white/8" style={{ background: "rgba(255,255,255,0.03)" }}>
                <Clock size={13} className="text-slate-400" /> {horaChile}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-body text-slate-400 border border-white/8" style={{ background: "rgba(255,255,255,0.03)" }}>
                📅 {fechaChile}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Balance */}
        <div className="rounded-2xl p-5 border border-white/8" style={{ background: "rgba(22,10,38,0.5)", backdropFilter: "blur(12px)" }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 font-body text-sm">Balance Total</span>
            <span className="text-green-400 text-lg">💳</span>
          </div>
          <div className="font-display text-3xl text-white font-bold mb-2">$0</div>
          <div className="h-8 flex items-end gap-0.5">
            {[20,35,25,40,30,45,35,50,40,55,45,60].map((h,i) => (
              <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: `rgba(34,197,94,${0.2 + i*0.06})` }} />
            ))}
          </div>
          <p className="text-green-400 font-body text-xs mt-2 flex items-center gap-1">📈 +7.9% esta semana</p>
        </div>

        {/* Inventario */}
        <div className="rounded-2xl p-5 border border-white/8" style={{ background: "rgba(22,10,38,0.5)", backdropFilter: "blur(12px)" }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 font-body text-sm">Inventario</span>
            <span className="text-[#22d3ee] text-lg">🎒</span>
          </div>
          <div className="flex items-center gap-8 mt-4">
            <div className="text-center">
              <div className="text-2xl mb-1">🚗</div>
              <div className="font-display text-2xl text-white font-bold">0</div>
              <div className="text-slate-500 font-body text-[10px] uppercase tracking-widest mt-0.5">Vehículos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">🔫</div>
              <div className="font-display text-2xl text-white font-bold">0</div>
              <div className="text-slate-500 font-body text-[10px] uppercase tracking-widest mt-0.5">Armas</div>
            </div>
          </div>
        </div>

        {/* Consejo del día */}
        <div className="rounded-2xl p-5 border border-white/8" style={{ background: "rgba(22,10,38,0.5)", backdropFilter: "blur(12px)" }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 font-body text-sm">Consejo del día</span>
            <Sparkles size={18} className="text-[#f59e0b]" />
          </div>
          <div className="flex items-start gap-3 mt-2">
            <span className="text-[#f59e0b] text-xl shrink-0 mt-0.5">💡</span>
            <p className="text-slate-300 font-body text-sm leading-relaxed">{TIPS[tipIdx]}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
