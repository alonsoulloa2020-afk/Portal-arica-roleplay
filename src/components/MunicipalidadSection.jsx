import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Landmark, AlertTriangle, Gavel, FileText, Calendar,
  Car, CreditCard, Building2, Briefcase, FileCheck,
  Construction, Check, Loader2, Clock, ChevronRight,
  X, MapPin, Scale, Receipt, CircleDollarSign
} from "lucide-react"
import clsx from "clsx"

/* ── Mock Data ──────────────────────────────────────────────────── */
const MULTAS = [
  { id: "MUL-2026-001", placa: "ABCD-12", tipo: "Exceso de velocidad",       fecha: "02 Abr 2026", monto: 85000,  estado: "pendiente", zona: "Zona Centro" },
  { id: "MUL-2026-002", placa: "EFGH-34", tipo: "Luz roja",                  fecha: "28 Mar 2026", monto: 120000, estado: "pendiente", zona: "Av. Principal" },
  { id: "MUL-2026-003", placa: "ABCD-12", tipo: "No respetar señalética",    fecha: "15 Mar 2026", monto: 55000,  estado: "pendiente", zona: "Sector 7" },
  { id: "MUL-2025-089", placa: "ABCD-12", tipo: "Estacionamiento prohibido", fecha: "15 Dic 2025", monto: 45000,  estado: "pagada",    zona: "Sector 4" },
  { id: "MUL-2025-067", placa: "IJKL-56", tipo: "Documentos vencidos",       fecha: "03 Nov 2025", monto: 65000,  estado: "pagada",    zona: "Zona Norte" },
  { id: "MUL-2025-041", placa: "MNOP-78", tipo: "Conducir sin licencia",     fecha: "20 Oct 2025", monto: 150000, estado: "pagada",    zona: "Autopista Sur" },
]

const CAUSAS = [
  { nro: "JPL-2026-0042", tipo: "Infracción de tránsito",             fecha: "03 Abr 2026", estado: "en_tramite", desc: "Exceso de velocidad reiterado en zona escolar" },
  { nro: "JPL-2026-0038", tipo: "Denuncia vecinal",                   fecha: "01 Abr 2026", estado: "pendiente",  desc: "Ruidos molestos en horario nocturno" },
  { nro: "JPL-2026-0029", tipo: "Infracción a normativa municipal",   fecha: "22 Mar 2026", estado: "en_tramite", desc: "Venta ambulante sin permiso en sector comercial" },
  { nro: "JPL-2025-0198", tipo: "Incumplimiento normativa comercial", fecha: "20 Dic 2025", estado: "resuelto",   desc: "Patente comercial vencida — local sector 3" },
  { nro: "JPL-2025-0156", tipo: "Daños a propiedad municipal",        fecha: "08 Nov 2025", estado: "resuelto",   desc: "Daño a señalética vial en intersección principal" },
]

const TRAMITES_CAT = [
  { id: "permiso_circ",    icon: Car,          label: "Permiso de Circulación",  desc: "Solicita o renueva tu permiso de circulación vehicular",            color: "#22d3ee" },
  { id: "licencia",        icon: CreditCard,   label: "Licencia de Conducir",    desc: "Obtén o renueva tu licencia de conducir clase B, C o D",            color: "#a855f7" },
  { id: "patente",         icon: Building2,    label: "Patente Comercial",       desc: "Registro, renovación o cierre de patentes de negocios",             color: "#f59e0b" },
  { id: "gestion_emp",     icon: Briefcase,    label: "Gestión de Empresas",     desc: "Apertura, modificación y cierre de empresas en la comuna",          color: "#22c55e" },
  { id: "certificados",    icon: FileCheck,    label: "Certificados",            desc: "Certificados de residencia, antigüedad, avalúo y más",              color: "#ec4899" },
  { id: "permisos_edif",   icon: Construction, label: "Permisos de Edificación", desc: "Solicita permisos para construcción, remodelación y demolición",     color: "#3b82f6" },
]

const HORAS = [
  { hora: "09:00", dispo: true },  { hora: "09:30", dispo: true },
  { hora: "10:00", dispo: false }, { hora: "10:30", dispo: true },
  { hora: "11:00", dispo: true },  { hora: "11:30", dispo: false },
  { hora: "12:00", dispo: true },  { hora: "14:00", dispo: true },
  { hora: "14:30", dispo: true },  { hora: "15:00", dispo: false },
  { hora: "15:30", dispo: true },  { hora: "16:00", dispo: true },
]

const ESTADO_CLR = {
  pendiente:  { bg: "rgba(249,115,22,0.12)", border: "rgba(249,115,22,0.3)",  text: "#f97316", label: "Pendiente" },
  pagada:     { bg: "rgba(34,197,94,0.12)",  border: "rgba(34,197,94,0.3)",   text: "#22c55e", label: "Pagada" },
  en_tramite: { bg: "rgba(234,179,8,0.12)",  border: "rgba(234,179,8,0.3)",   text: "#eab308", label: "En Trámite" },
  resuelto:   { bg: "rgba(34,197,94,0.12)",  border: "rgba(34,197,94,0.3)",   text: "#22c55e", label: "Resuelto" },
}

const slideUp = { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3 } }

/* ── Sub tabs ──────────────────────────────────────────────────── */
const TABS = [
  { id: "resumen",  label: "Resumen",       icon: Landmark },
  { id: "multas",   label: "Multas",        icon: Receipt },
  { id: "juzgado",  label: "Juzgado",       icon: Scale },
  { id: "tramites", label: "Trámites",      icon: FileText },
  { id: "hora",     label: "Solicitar Hora", icon: Calendar },
]

function Badge({ estado }) {
  const s = ESTADO_CLR[estado] || ESTADO_CLR.pendiente
  return <span className="inline-flex items-center px-2.5 py-0.5 rounded-md font-body text-xs font-semibold" style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.text }}>{s.label}</span>
}

/* ── Resumen Tab ──────────────────────────────────────────────── */
function ResumenTab() {
  const pendientes = MULTAS.filter(m => m.estado === "pendiente")
  const totalPend = pendientes.reduce((s, m) => s + m.monto, 0)
  const causasAct = CAUSAS.filter(c => c.estado !== "resuelto").length
  const stats = [
    { label: "Multas Pendientes", value: pendientes.length, icon: AlertTriangle, color: "#f97316" },
    { label: "Monto Adeudado",    value: `$${totalPend.toLocaleString("es-CL")}`, icon: CircleDollarSign, color: "#ef4444" },
    { label: "Causas Activas",    value: causasAct, icon: Gavel, color: "#eab308" },
    { label: "Trámites Disponibles", value: TRAMITES_CAT.length, icon: FileText, color: "#22d3ee" },
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map(s => {
        const Icon = s.icon
        return (
          <div key={s.label} className="rounded-xl p-4 flex items-center gap-3" style={{ background: `${s.color}08`, border: `1px solid ${s.color}20` }}>
            <div className="p-2.5 rounded-lg" style={{ background: `${s.color}18` }}><Icon size={18} style={{ color: s.color }} /></div>
            <div><div className="font-display text-lg font-bold" style={{ color: s.color }}>{s.value}</div><div className="text-slate-500 font-body text-xs">{s.label}</div></div>
          </div>
        )
      })}
    </div>
  )
}

/* ── Multas Tab ──────────────────────────────────────────────── */
function MultasTab() {
  const [multas, setMultas] = useState(MULTAS)
  const [paying, setPaying] = useState(null)

  const handlePagar = (id) => {
    setPaying(id)
    setTimeout(() => {
      setMultas(prev => prev.map(m => m.id === id ? { ...m, estado: "pagada" } : m))
      setPaying(null)
    }, 2000)
  }

  return (
    <div className="flex flex-col gap-3">
      {multas.map(m => (
        <motion.div key={m.id} layout className="rounded-xl p-4 border flex flex-col sm:flex-row sm:items-center gap-3 justify-between" style={{ background: "rgba(15,10,30,0.6)", borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="font-mono text-xs text-slate-500">{m.id}</span>
              <Badge estado={m.estado} />
            </div>
            <p className="text-white font-body text-sm font-semibold">{m.tipo}</p>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-slate-500 font-body text-xs flex items-center gap-1">🚗 {m.placa}</span>
              <span className="text-slate-500 font-body text-xs flex items-center gap-1"><MapPin size={11} /> {m.zona}</span>
              <span className="text-slate-500 font-body text-xs">{m.fecha}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="font-display text-base font-bold text-white">${m.monto.toLocaleString("es-CL")}</span>
            {m.estado === "pendiente" && (
              <button
                onClick={() => handlePagar(m.id)}
                disabled={paying === m.id}
                className="px-4 py-2 rounded-lg font-display text-xs tracking-widest transition-all flex items-center gap-2 border shimmer-btn text-white"
                style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)", borderColor: "rgba(34,197,94,0.4)", boxShadow: "0 0 12px rgba(34,197,94,0.25)" }}
              >
                {paying === m.id ? <><Loader2 size={13} className="animate-spin" /> PAGANDO...</> : <><CircleDollarSign size={13} /> PAGAR</>}
              </button>
            )}
            {m.estado === "pagada" && <span className="flex items-center gap-1 text-green-400 font-body text-xs"><Check size={14} /> Pagada</span>}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

/* ── Juzgado Tab ─────────────────────────────────────────────── */
function JuzgadoTab() {
  return (
    <div className="flex flex-col gap-3">
      {CAUSAS.map(c => (
        <div key={c.nro} className="rounded-xl p-4 border" style={{ background: "rgba(15,10,30,0.6)", borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
            <div className="flex items-center gap-2">
              <Gavel size={15} className="text-[#eab308]" />
              <span className="font-mono text-xs text-slate-400">{c.nro}</span>
              <Badge estado={c.estado} />
            </div>
            <span className="text-slate-500 font-body text-xs">{c.fecha}</span>
          </div>
          <p className="text-white font-body text-sm font-semibold mb-1">{c.tipo}</p>
          <p className="text-slate-500 font-body text-xs">{c.desc}</p>
        </div>
      ))}
    </div>
  )
}

/* ── Trámites Tab ────────────────────────────────────────────── */
function TramitesTab({ onSolicitar }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {TRAMITES_CAT.map(t => {
        const Icon = t.icon
        return (
          <motion.button
            key={t.id}
            whileHover={{ y: -3, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => onSolicitar(t.id)}
            className="rounded-xl p-5 text-left flex flex-col gap-3 cursor-pointer border transition-all"
            style={{ background: "rgba(15,10,30,0.7)", borderColor: `${t.color}15` }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = `${t.color}45`; e.currentTarget.style.boxShadow = `0 0 18px ${t.color}12` }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = `${t.color}15`; e.currentTarget.style.boxShadow = "none" }}
          >
            <div className="p-2.5 rounded-xl w-fit" style={{ background: `${t.color}15` }}>
              <Icon size={20} style={{ color: t.color }} />
            </div>
            <div>
              <p className="text-white font-display text-sm tracking-wide mb-1">{t.label}</p>
              <p className="text-slate-500 font-body text-xs leading-relaxed">{t.desc}</p>
            </div>
            <div className="flex items-center gap-1 text-xs font-body mt-auto" style={{ color: t.color }}>
              Solicitar hora <ChevronRight size={13} />
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}

/* ── Solicitar Hora Tab ──────────────────────────────────────── */
function SolicitarHoraTab({ preselected }) {
  const [tramite, setTramite] = useState(preselected || "")
  const [fecha, setFecha] = useState("")
  const [hora, setHora] = useState("")
  const [step, setStep] = useState("form")

  const handleConfirm = () => {
    if (!tramite || !fecha || !hora) return
    setStep("loading")
    setTimeout(() => setStep("success"), 2000)
  }

  if (step === "success") {
    const label = TRAMITES_CAT.find(t => t.id === tramite)?.label || tramite
    return (
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center py-12 gap-4 rounded-2xl border border-green-500/20" style={{ background: "rgba(34,197,94,0.05)" }}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.4)" }}><Check size={32} className="text-green-400" /></div>
        <p className="text-white font-display text-sm tracking-widest">CITA AGENDADA EXITOSAMENTE</p>
        <p className="text-slate-400 font-body text-sm text-center">{label}<br />{fecha} a las {hora}</p>
        <button onClick={() => { setStep("form"); setHora(""); setFecha("") }} className="mt-2 px-6 py-2 rounded-lg font-display text-xs tracking-widest text-green-400 border border-green-500/30 hover:bg-green-500/10 transition-colors">NUEVA CITA</button>
      </motion.div>
    )
  }

  return (
    <div className="rounded-2xl p-6 border border-white/8" style={{ background: "rgba(15,10,30,0.6)" }}>
      <h4 className="font-display text-white text-sm tracking-widest mb-5 flex items-center gap-2"><Calendar size={16} className="text-[#22d3ee]" /> AGENDAR HORA</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-slate-500 font-body text-xs tracking-widest mb-2 block">TIPO DE TRÁMITE</label>
            <select value={tramite} onChange={e => setTramite(e.target.value)} className="w-full p-3 rounded-xl font-body text-sm text-white focus:outline-none appearance-none cursor-pointer" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(109,40,217,0.25)" }}>
              <option value="">Selecciona un trámite...</option>
              {TRAMITES_CAT.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-slate-500 font-body text-xs tracking-widest mb-2 block">FECHA</label>
            <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} className="w-full p-3 rounded-xl font-body text-sm text-slate-300 focus:outline-none" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(109,40,217,0.25)" }} />
          </div>
          <button
            onClick={handleConfirm}
            disabled={!tramite || !fecha || !hora || step === "loading"}
            className={clsx("w-full py-3.5 rounded-xl font-display text-sm tracking-widest text-white flex items-center justify-center gap-2 transition-all mt-2", tramite && fecha && hora ? "shimmer-btn cursor-pointer" : "cursor-not-allowed opacity-40")}
            style={tramite && fecha && hora ? { background: "linear-gradient(135deg,#06b6d4,#3b82f6)", boxShadow: "0 0 20px rgba(6,182,212,0.3)" } : { background: "rgba(100,100,100,0.2)" }}
          >
            {step === "loading" ? <><Loader2 size={15} className="animate-spin" /> AGENDANDO...</> : <><Calendar size={15} /> CONFIRMAR CITA</>}
          </button>
        </div>
        <div>
          <label className="text-slate-500 font-body text-xs tracking-widest mb-2 block">HORARIOS DISPONIBLES</label>
          <div className="grid grid-cols-3 gap-2">
            {HORAS.map(h => (
              <button
                key={h.hora}
                onClick={() => h.dispo && setHora(h.hora)}
                disabled={!h.dispo}
                className={clsx("py-2.5 rounded-lg font-mono text-sm text-center transition-all border",
                  !h.dispo && "opacity-30 cursor-not-allowed line-through text-slate-600 border-transparent",
                  h.dispo && hora !== h.hora && "text-slate-300 border-white/8 hover:border-[#22d3ee]/40 hover:text-white cursor-pointer",
                  hora === h.hora && "text-white border-[#22d3ee]/60 font-bold"
                )}
                style={hora === h.hora ? { background: "rgba(34,211,238,0.15)", boxShadow: "0 0 12px rgba(34,211,238,0.2)" } : h.dispo ? { background: "rgba(0,0,0,0.3)" } : {}}
              >
                {h.hora}
              </button>
            ))}
          </div>
          {hora && <p className="text-[#22d3ee] font-body text-xs mt-3 flex items-center gap-1"><Clock size={12} /> Hora seleccionada: <strong>{hora}</strong></p>}
        </div>
      </div>
    </div>
  )
}

/* ── Main Section ────────────────────────────────────────────── */
export default function MunicipalidadSection() {
  const [tab, setTab] = useState("resumen")
  const [preselTramite, setPreselTramite] = useState("")

  const goToHora = (tramiteId) => { setPreselTramite(tramiteId); setTab("hora") }

  return (
    <motion.div {...slideUp} className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between p-5 rounded-2xl border border-white/10" style={{ background: "rgba(22,10,38,0.6)", backdropFilter: "blur(20px)" }}>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl" style={{ background: "rgba(59,130,246,0.12)" }}><Landmark size={24} className="text-[#3b82f6]" /></div>
          <div>
            <h2 className="font-display text-xl text-[#3b82f6] tracking-widest">MUNICIPALIDAD</h2>
            <p className="text-[10px] tracking-[0.3em] text-slate-500 uppercase font-bold mt-0.5">Ilustre Municipalidad de Metropolitana RP</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/8" style={{ background: "rgba(255,255,255,0.03)" }}>
          <MapPin size={13} className="text-slate-400" />
          <span className="text-slate-400 font-body text-xs">Santiago, Chile</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 flex-wrap">
        {TABS.map(t => {
          const Icon = t.icon
          const active = tab === t.id
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={clsx("flex items-center gap-2 px-4 py-2 rounded-lg font-display text-xs tracking-widest transition-all border",
                active ? "text-white border-transparent" : "text-slate-500 border-white/6 hover:text-white hover:border-white/15"
              )}
              style={active ? { background: "rgba(59,130,246,0.18)", boxShadow: "0 0 14px rgba(59,130,246,0.15)" } : { background: "rgba(15,10,30,0.4)" }}
            >
              <Icon size={14} className={active ? "text-[#3b82f6]" : ""} /> {t.label}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
          {tab === "resumen"  && <ResumenTab />}
          {tab === "multas"   && <MultasTab />}
          {tab === "juzgado"  && <JuzgadoTab />}
          {tab === "tramites" && <TramitesTab onSolicitar={goToHora} />}
          {tab === "hora"     && <SolicitarHoraTab preselected={preselTramite} />}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
