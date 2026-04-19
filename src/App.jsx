import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Home, Wallet, ShoppingBag, Shield, Users,
  Send, X, Check, Loader2, ChevronRight,
  Bell, Settings, LogOut, Star,
  Zap, TrendingUp, BarChart3,
  ArrowUpRight, ArrowDownLeft, CreditCard,
  Car, Building2, ShieldCheck, Clock,
  RefreshCw, ChevronLeft, Landmark, MapPin,
  FileText, PiggyBank, Banknote, Receipt,
  AlertTriangle, Lock, Eye, Radio,
  BadgeCheck, Search, Siren
} from "lucide-react"
import clsx from "clsx"

const GALLERY_IMAGES = [
  { src: "/assets/hero1.png", label: "Operativo Nocturno — Zona Centro" },
  { src: "/assets/hero2.png", label: "Unidad Centauros — Táctica Especial" },
  { src: "/assets/hero3.png", label: "Carabineros S.I.P. — Interior" },
  { src: "/assets/hero4.png", label: "S.I.P. — Control Operativo" },
  { src: "/assets/hero5.png", label: "PDI — Control de Autopista" },
  { src: "/assets/hero6.png", label: "Carabineros — Patrullaje Nocturno" },
  { src: "/assets/hero7.png", label: "SAMU — Unidad de Emergencias" },
  { src: "/assets/hero8.png", label: "Robo al Banco — Operativo Activo" },
]

const MARKET_ITEMS = [
  { id: 1, name: "Pistola Glock 17",          price: 4200,  rarity: "common",    icon: "🔫", category: "Armas"      },
  { id: 2, name: "Chaleco Balístico NIJ-III",  price: 12500, rarity: "rare",      icon: "🦺", category: "Protección" },
  { id: 3, name: "Radio Motorola APX",          price: 3800,  rarity: "common",    icon: "📻", category: "Equipo"     },
  { id: 4, name: "SUV Carabineros",             price: 85000, rarity: "epic",      icon: "🚔", category: "Vehículos"  },
  { id: 5, name: "Kit Médico TEMS",             price: 7600,  rarity: "rare",      icon: "🏥", category: "Médico"     },
  { id: 6, name: "Rango VIP Platinum",          price: 49900, rarity: "legendary", icon: "⭐", category: "Premium"    },
  { id: 7, name: "Carabina SIG MCX",            price: 22000, rarity: "epic",      icon: "🎯", category: "Armas"      },
  { id: 8, name: "Casco Balístico FAST",        price: 9800,  rarity: "rare",      icon: "⛑️", category: "Protección" },
  { id: 9, name: "Moto BMW R1250RT",            price: 62000, rarity: "epic",      icon: "🏍️", category: "Vehículos"  },
]

const NAV_ITEMS = [
  { id: "home",          label: "Inicio",        icon: Home        },
  { id: "cedula",        label: "Cedula",        icon: CreditCard  },
  { id: "banco",         label: "Banco",         icon: Wallet      },
  { id: "mercado",       label: "Mercado",       icon: ShoppingBag },
  { id: "empresas",      label: "Empresas",      icon: Building2   },
  { id: "municipalidad", label: "Municipalidad", icon: Landmark    },
  { id: "faccion",       label: "Facciones",     icon: Shield      },
  { id: "comunidad",     label: "Comunidad",     icon: Users       },
]

const NAV_SISTEMAS = [
  { id: "gepol", label: "GEPOL (PDI)",  icon: Siren,  color: "#fb923c" },
  { id: "aupol", label: "AUPOL (CAR)",  icon: ShieldCheck, color: "#22c55e" },
  { id: "snsm",  label: "SNSM",   icon: Eye,    color: "#f59e0b" },
]

const DISCORD_ROLES_SISTEMAS = {
  "Carabineros": {
    sistema: "GEPOL", fullName: "Gestion Policial ACRP", color: "#fb923c", icon: "Siren",
    desc: "Sistema de Gestion Policial — Control de operativos, registros y partes.",
    features: ["Consulta RUT/Placa", "Registro de Detenidos", "Partes Policiales", "Operativos Activos", "Control de Turnos"]
  },
  "PDI": {
    sistema: "AUPO", fullName: "Archivo Unico Policial Online", color: "#f97316", icon: "Search",
    desc: "Archivo Unico Policial — Investigacion criminal, antecedentes e inteligencia.",
    features: ["Antecedentes Criminales", "Investigaciones Activas", "Ordenes de Arresto", "Inteligencia Policial", "Informe Pericial"]
  },
  "Seguridad Ciudadana": {
    sistema: "SNSM", fullName: "Sistema Nacional de Seguridad Municipal", color: "#f59e0b", icon: "Eye",
    desc: "Sistema de Seguridad Municipal — Vigilancia comunal y coordinacion de emergencias.",
    features: ["Camaras de Vigilancia", "Incidentes Municipales", "Coordinacion CONAF", "Alertas Comunales", "Registro de Patrullajes"]
  },
}

const TX_TYPES = {
  salary:   { label: "Nomina Discord",    color: "#22c55e", bg: "rgba(34,197,94,0.12)",   border: "rgba(34,197,94,0.3)"   },
  transfer: { label: "Transferencia",     color: "#f97316", bg: "rgba(249,115,22,0.12)",  border: "rgba(249,115,22,0.3)"  },
  fine:     { label: "Multa/Infraccion",  color: "#ef4444", bg: "rgba(239,68,68,0.12)",   border: "rgba(239,68,68,0.3)"   },
  purchase: { label: "Compra Mercado",    color: "#ec4899", bg: "rgba(236,72,153,0.12)",  border: "rgba(236,72,153,0.3)"  },
  empresa:  { label: "Ingreso Empresa",   color: "#f59e0b", bg: "rgba(245,158,11,0.12)",  border: "rgba(245,158,11,0.3)"  },
  service:  { label: "Pago Servicio",     color: "#64748b", bg: "rgba(100,116,139,0.12)", border: "rgba(100,116,139,0.3)" },
  bail:     { label: "Fianza/Caucion",    color: "#8b5cf6", bg: "rgba(139,92,246,0.12)",  border: "rgba(139,92,246,0.3)"  },
  deposit:  { label: "Deposito",          color: "#fb923c", bg: "rgba(251,146,60,0.12)",   border: "rgba(251,146,60,0.3)"   },
}

const RARITY = {
  common:    { border: "border-slate-500/30",  glow: "",                                        badge: "bg-slate-700/60 text-slate-300",  label: "Común"      },
  rare:      { border: "border-cyan-400/40",   glow: "shadow-[0_0_18px_rgba(251,146,60,0.18)]", badge: "bg-cyan-900/50 text-cyan-300",    label: "Raro"       },
  epic:      { border: "border-violet-500/50", glow: "shadow-[0_0_18px_rgba(234,88,12,0.25)]", badge: "bg-violet-900/60 text-violet-300",label: "Épico"      },
  legendary: { border: "border-pink-500/50",   glow: "shadow-[0_0_22px_rgba(236,72,153,0.30)]", badge: "bg-pink-900/60 text-pink-300",    label: "Legendario" },
}

const TEAM = [
  { role: "Presidente",              dept: "Junta Directiva",       user: "Gabriel",  color: "#f97316" },
  { role: "VicePresidente",          dept: "Junta Directiva",       user: "Ignacio",  color: "#f97316" },
  { role: "Gestor Administrativo",   dept: "Administración",        user: "Kouki",    color: "#fb923c" },
  { role: "Director Ejecutivo",      dept: "Dirección Ejecutiva",   user: "Pipe",     color: "#ec4899" },
  { role: "Director Corporativo",    dept: "Dirección Corporativa", user: "Ason",     color: "#f59e0b" },
  { role: "Director de Gestiones",   dept: "Gestiones",             user: "Carl",     color: "#fb923c" },
]

function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i, left: `${(i * 5.5 + 3) % 100}%`,
    delay: `${(i * 0.7) % 12}s`, dur: `${10 + (i % 8)}s`,
    size: i % 3 === 0 ? "3px" : "2px",
    color: i % 2 === 0 ? "rgba(249,115,22,0.6)" : "rgba(251,146,60,0.5)",
  }))
  return <>{particles.map(p => <div key={p.id} className="particle" style={{ left: p.left, animationDelay: p.delay, animationDuration: p.dur, width: p.size, height: p.size, background: p.color }} />)}</>
}

function VideoBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.4) saturate(1.1)" }}>
        <source src="/assets/bg-video.mov" type="video/mp4" />
        <source src="/assets/bg-video.mov" type="video/quicktime" />
      </video>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(15,10,4,0.80)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0f0a05] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f0a05] to-transparent" />
    </div>
  )
}

function GalleryCarousel() {
  const [current, setCurrent] = useState(0)
  useEffect(() => { const t = setInterval(() => setCurrent(p => (p + 1) % GALLERY_IMAGES.length), 6000); return () => clearInterval(t) }, [])
  const prev = () => setCurrent(p => (p - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)
  const next = () => setCurrent(p => (p + 1) % GALLERY_IMAGES.length)
  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/5" style={{ aspectRatio: "16/7" }}>
      <AnimatePresence mode="crossfade">
        <motion.div key={current} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }}>
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${GALLERY_IMAGES[current].src})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-5">
            <span className="px-3 py-1.5 rounded-lg font-body text-sm text-white" style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }}>{GALLERY_IMAGES[current].label}</span>
          </div>
        </motion.div>
      </AnimatePresence>
      <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center z-10 transition-all hover:scale-110" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)" }}><ChevronLeft size={16} className="text-white" /></button>
      <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center z-10 transition-all hover:scale-110" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)" }}><ChevronRight size={16} className="text-white" /></button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {GALLERY_IMAGES.map((_, i) => <button key={i} onClick={() => setCurrent(i)} className={clsx("rounded-full transition-all duration-300", i === current ? "w-6 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60")} />)}
      </div>
    </div>
  )
}

function TeamList({ animated }) {
  return (
    <div className="flex flex-col gap-2">
      {TEAM.map((member, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, x: -20 }}
          {...(animated ? { whileInView: { opacity: 1, x: 0 }, viewport: { once: true } } : { animate: { opacity: 1, x: 0 } })}
          transition={{ delay: i * 0.07, duration: 0.4 }}
          className="flex items-center justify-between p-4 rounded-2xl border transition-all cursor-default"
          style={{ background: "rgba(20,12,4,0.6)", borderColor: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = `${member.color}33`; e.currentTarget.style.background = "rgba(30,15,50,0.8)" }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.background = "rgba(20,12,4,0.6)" }}>
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full flex items-center justify-center font-display text-sm font-bold shrink-0"
              style={{ background: `linear-gradient(135deg, ${member.color}40, ${member.color}20)`, border: `1px solid ${member.color}30`, color: member.color }}>
              {member.user.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-white font-body text-sm font-semibold">{member.role}</p>
              <p className="text-slate-500 font-body text-xs">{member.dept}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: `${member.color}12`, border: `1px solid ${member.color}25` }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: member.color }} />
            <span className="font-mono text-xs font-bold" style={{ color: member.color }}>{member.user}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function LoginModal({ onClose, onEnter }) {
  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={onClose} />
      <motion.div className="relative w-full max-w-sm" initial={{ y: 50, opacity: 0, scale: 0.94 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 40, opacity: 0, scale: 0.96 }} transition={{ type: "spring", stiffness: 280, damping: 28 }}>
        <div className="rounded-2xl p-8 border" style={{ background: "rgba(18,10,3,0.92)", backdropFilter: "blur(25px)", borderColor: "rgba(234,88,12,0.35)", boxShadow: "0 0 60px rgba(234,88,12,0.15), 0 24px 64px rgba(0,0,0,0.6)" }}>
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors p-1"><X size={18} /></button>
          <div className="flex flex-col items-center mb-7">
            <img src="/assets/logo.png" alt="Arica Chile Roleplay ER:LC" className="w-20 h-20 object-contain mb-3" style={{ mixBlendMode: "screen" }} />
            <h2 className="font-display text-white text-base tracking-widest">ACCESO AL SERVIDOR</h2>
            <p className="text-slate-500 font-body text-sm mt-1">Verifica tu identidad para continuar</p>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-7">
            {[{ val: "2,300", lab: "Miembros" }, { val: "$48M", lab: "Circulando" }, { val: "142", lab: "Items" }].map(s => (
              <div key={s.lab} className="rounded-xl p-3 text-center border border-violet-500/20" style={{ background: "rgba(234,88,12,0.10)" }}>
                <div className="font-display text-[#f97316] text-lg font-bold leading-none">{s.val}</div>
                <div className="text-slate-500 font-body text-xs mt-1">{s.lab}</div>
              </div>
            ))}
          </div>
          <button onClick={onEnter} className="shimmer-btn w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-display text-sm text-white tracking-widest transition-all duration-200 group" style={{ background: "linear-gradient(135deg, #5865F2 0%, #4752C4 100%)", boxShadow: "0 0 24px rgba(88,101,242,0.4)" }}>
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
            CONTINUAR CON DISCORD
            <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-slate-600 font-body text-xs text-center mt-4">Al ingresar aceptas el Reglamento Interno del servidor</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function TransferModal({ onClose }) {
  const [amount, setAmount] = useState("")
  const [recipient, setRecipient] = useState("")
  const [step, setStep] = useState("idle")
  const rawAmount = parseInt(amount.replace(/\D/g, "") || "0", 10)
  const handleInput = e => { const d = e.target.value.replace(/\D/g, ""); setAmount(d ? `$${parseInt(d,10).toLocaleString("es-CL")}` : "") }
  const handleTransfer = () => { if (!rawAmount || !recipient.trim()) return; setStep("loading"); setTimeout(() => setStep("success"), 2000) }
  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={onClose} />
      <motion.div className="relative w-full max-w-sm" initial={{ y: 30, opacity: 0, scale: 0.96 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 25, opacity: 0 }} transition={{ type: "spring", stiffness: 320, damping: 28 }}>
        <div className="rounded-2xl p-6 border" style={{ background: "rgba(18,10,3,0.92)", backdropFilter: "blur(25px)", borderColor: "rgba(236,72,153,0.3)" }}>
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"><X size={18} /></button>
          <h3 className="font-display text-white text-sm tracking-widest mb-5 flex items-center gap-2"><Send size={15} className="text-[#ec4899]" /> TRANSFERIR FONDOS</h3>
          {step === "success" ? (
            <motion.div className="flex flex-col items-center py-8 gap-4" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.4)" }}><Check size={32} className="text-green-400" /></div>
              <p className="text-white font-display text-sm tracking-widest">TRANSFERENCIA EXITOSA</p>
              <p className="text-slate-400 font-body text-sm">{amount} enviado a <span className="text-[#f97316]">{recipient}</span></p>
              <button onClick={onClose} className="mt-1 px-6 py-2 rounded-lg font-display text-xs tracking-widest text-green-400 border border-green-500/30 hover:bg-green-500/10 transition-colors">CERRAR</button>
            </motion.div>
          ) : (
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-slate-500 font-body text-xs tracking-widest mb-1.5 block">DESTINATARIO</label>
                <input type="text" value={recipient} onChange={e => setRecipient(e.target.value)} placeholder="Usuario_RP..." className="w-full rounded-xl px-4 py-2.5 font-body text-sm text-white placeholder-slate-600 focus:outline-none" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(234,88,12,0.25)" }} onFocus={e => (e.target.style.borderColor="rgba(234,88,12,0.6)")} onBlur={e => (e.target.style.borderColor="rgba(234,88,12,0.25)")} />
              </div>
              <div>
                <label className="text-slate-500 font-body text-xs tracking-widest mb-1.5 block">MONTO</label>
                <input type="text" inputMode="numeric" value={amount} onChange={handleInput} placeholder="$0" className="w-full rounded-xl px-4 py-2.5 font-display text-sm text-white placeholder-slate-600 focus:outline-none" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(234,88,12,0.25)" }} onFocus={e => (e.target.style.borderColor="rgba(234,88,12,0.6)")} onBlur={e => (e.target.style.borderColor="rgba(234,88,12,0.25)")} />
              </div>
              <button onClick={handleTransfer} disabled={!rawAmount || !recipient.trim() || step==="loading"} className={clsx("mt-1 w-full py-3 rounded-xl font-display text-sm tracking-widest text-white flex items-center justify-center gap-2 transition-all duration-300", rawAmount && recipient.trim() ? "shimmer-btn cursor-pointer" : "cursor-not-allowed opacity-40")} style={rawAmount && recipient.trim() ? { background: "linear-gradient(135deg,#ec4899,#f97316)", boxShadow: "0 0 20px rgba(236,72,153,0.3)" } : { background: "rgba(100,100,100,0.2)" }}>
                {step === "loading" ? <><Loader2 size={15} className="animate-spin" /> PROCESANDO…</> : <><Send size={15} /> ENVIAR FONDOS</>}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

function MarketCard({ item }) {
  const [buyState, setBuyState] = useState("idle")
  const style = RARITY[item.rarity]
  const handleBuy = () => { if (buyState !== "idle") return; setBuyState("loading"); setTimeout(() => { setBuyState("done"); setTimeout(() => setBuyState("idle"), 2800) }, 1500) }
  return (
    <motion.div whileHover={{ y: -5, scale: 1.015 }} transition={{ type: "spring", stiffness: 280, damping: 20 }} className={clsx("rounded-xl p-4 border transition-shadow duration-300 flex flex-col", style.border, style.glow)} style={{ background: "rgba(20,12,4,0.65)", backdropFilter: "blur(12px)" }}>
      <div className="text-3xl mb-3 text-center leading-none">{item.icon}</div>
      <span className={clsx("inline-block self-start px-2 py-0.5 rounded-full text-[10px] font-display tracking-wider mb-2", style.badge)}>{style.label}</span>
      <h3 className="text-white font-display text-xs tracking-wide mb-0.5 leading-snug flex-1">{item.name}</h3>
      <p className="text-slate-600 font-body text-xs mb-3">{item.category}</p>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-[#f97316] font-display text-sm font-bold">${item.price.toLocaleString("es-CL")}</span>
        <button onClick={handleBuy} className={clsx("px-3 py-1.5 rounded-lg font-display text-[10px] tracking-widest transition-all duration-300 flex items-center gap-1.5 border", buyState==="idle" && "bg-violet-600/20 text-violet-300 border-violet-500/30 hover:bg-violet-600/40", buyState==="loading" && "bg-violet-500/10 text-violet-500 border-violet-500/20 cursor-not-allowed", buyState==="done" && "bg-green-500/15 text-green-400 border-green-500/30")}>
          {buyState==="idle" && "COMPRAR"}{buyState==="loading" && <Loader2 size={11} className="animate-spin" />}{buyState==="done" && <><Check size={11} /> OK</>}
        </button>
      </div>
    </motion.div>
  )
}

function Sidebar({ activeSection, setActiveSection, onLogout }) {
  return (
    <aside className="w-[260px] shrink-0 flex flex-col h-full" style={{ background: "#0a0805", borderRight: "1px solid rgba(249,115,22,0.14)" }}>
      <div className="p-5 flex items-center gap-3 border-b border-violet-500/10">
        <img src="/assets/logo.png" alt="Logo" className="w-11 h-11 object-contain" style={{ mixBlendMode: "screen" }} />
        <div>
          <div className="font-display text-white text-[11px] tracking-widest leading-tight">ARICA RP</div>
          <div className="font-display text-[#f97316] text-[9px] tracking-[0.25em]">ER:LC ARICA</div>
        </div>
      </div>
      <div className="mx-4 mt-4 p-3 rounded-xl border border-violet-500/20 flex items-center gap-3" style={{ background: "rgba(234,88,12,0.07)" }}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-display text-xs shrink-0" style={{ background: "linear-gradient(135deg,#ea580c,#ec4899)" }}>RP</div>
        <div className="min-w-0">
          <div className="text-white font-display text-[11px] tracking-wider truncate">Jugador_001</div>
          <div className="text-[#fb923c] font-body text-[11px] flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#fb923c] inline-block" style={{ boxShadow: "0 0 6px rgba(251,146,60,0.9)" }} /> En línea</div>
        </div>
        <div className="ml-auto font-display text-[#f97316] text-xs">Lvl 12</div>
      </div>
      <nav className="flex-1 p-4 flex flex-col gap-0.5 mt-3 overflow-y-auto">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const active = activeSection === id
          return (
            <button key={id} onClick={() => setActiveSection(id)} className={clsx("relative flex items-center gap-3 px-4 py-2.5 rounded-xl font-body text-sm tracking-wider transition-all duration-200 group text-left", active ? "text-white" : "text-slate-500 hover:text-slate-200 hover:bg-white/4")} style={active ? { background: "rgba(234,88,12,0.14)" } : {}}>
              {active && <motion.div layoutId="activeIndicator" className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full" style={{ background: "#ec4899", boxShadow: "0 0 10px rgba(236,72,153,0.9)" }} />}
              <Icon size={16} className={clsx("transition-colors shrink-0", active ? "text-[#f97316]" : "group-hover:text-[#f97316]")} />
              {label}
            </button>
          )
        })}
        {/* Sistemas Policiales */}
        <div className="pt-3 pb-1 px-4">
          <span className="font-display text-[9px] tracking-[0.2em] text-slate-600 uppercase">Sistemas Policiales</span>
        </div>
        {NAV_SISTEMAS.map(({ id, label, icon: Icon, color }) => {
          const active = activeSection === id
          return (
            <button key={id} onClick={() => setActiveSection(id)} className={clsx("relative flex items-center gap-3 px-4 py-2.5 rounded-xl font-body text-sm tracking-wider transition-all duration-200 group text-left")} style={active ? { background: `${color}15`, color: color } : { color: "#64748b" }}>
              {active && <motion.div layoutId="sistemaIndicator" className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />}
              <Icon size={16} className="shrink-0 transition-colors" style={active ? { color } : {}} />
              {label}
              <span className="ml-auto text-[9px] font-display px-1.5 py-0.5 rounded" style={{ background: `${color}20`, color }}>{id.toUpperCase()}</span>
            </button>
          )
        })}
      </nav>
      <div className="p-4 border-t border-violet-500/10 flex flex-col gap-0.5">
        <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-500 hover:text-slate-300 font-body text-sm tracking-wider hover:bg-white/4 transition-all"><Settings size={15} /> Ajustes</button>
        <button onClick={onLogout} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-500 hover:text-red-400 font-body text-sm tracking-wider hover:bg-red-500/5 transition-all"><LogOut size={15} /> Salir</button>
      </div>
    </aside>
  )
}

const slideUp = { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: 0.35 } }

function HomeSection({ setActiveSection }) {
  const services = [
    { id: "cedula",  icon: CreditCard,  label: "Cédula Digital",  desc: "Tu identidad roleplay con datos, profesión y acceso a servicios personalizados.", color: "#fb923c" },
    { id: "mercado", icon: ShoppingBag, label: "Mercado",          desc: "Compra y vende artículos entre jugadores en el marketplace de la comunidad.",    color: "#f97316" },
    { id: "faccion", icon: Car,         label: "Concesionario",    desc: "Explora vehículos disponibles y gestiona tu flota personal en el servidor.",       color: "#ec4899" },
    { id: "faccion", icon: Building2,   label: "Empresas",         desc: "Crea y administra tu empresa, contrata empleados y genera ingresos.",              color: "#f59e0b" },
  ]
  const serverStats = [
    { label: "Jugadores Online",  value: "87",    icon: Users,      c: { bg: "rgba(251,146,60,0.07)",  border: "rgba(251,146,60,0.2)",  text: "#fb923c" } },
    { label: "Comunidad Discord", value: "5.402", icon: TrendingUp, c: { bg: "rgba(234,88,12,0.1)",   border: "rgba(234,88,12,0.25)", text: "#f97316" } },
    { label: "Rating Melonly",    value: "4.9/5", icon: Star,       c: { bg: "rgba(236,72,153,0.07)",  border: "rgba(236,72,153,0.2)",  text: "#ec4899" } },
    { label: "Eventos Activos",   value: "3",     icon: Zap,        c: { bg: "rgba(251,146,60,0.07)",  border: "rgba(251,146,60,0.2)",  text: "#fb923c" } },
  ]
  const activity = [
    { msg: "RamirezRP compró Chaleco Balístico",  time: "hace 2 min",  dot: "#fb923c" },
    { msg: "Operación SIP exitosa en Zona Norte",  time: "hace 8 min",  dot: "#f97316" },
    { msg: "NuevoJugador_89 se unió al servidor",  time: "hace 15 min", dot: "#ec4899" },
    { msg: "Evento de patrullaje — Sector 4",      time: "hace 23 min", dot: "#fb923c" },
    { msg: "Subasta de SUV Carabineros iniciada",  time: "hace 31 min", dot: "#f97316" },
  ]
  return (
    <motion.div {...slideUp} className="flex flex-col gap-7">
      <div className="relative rounded-2xl p-8 overflow-hidden flex items-center min-h-[160px]" style={{ background: "linear-gradient(135deg,rgba(234,88,12,0.22) 0%,rgba(236,72,153,0.12) 60%,rgba(251,146,60,0.08) 100%)", border: "1px solid rgba(234,88,12,0.22)" }}>
        <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: "url(/assets/hero1.png)" }} />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2"><span className="w-2 h-2 rounded-full bg-green-400" style={{ boxShadow: "0 0 8px rgba(74,222,128,0.9)" }} /><span className="text-green-400 font-body text-xs tracking-widest">Online</span></div>
          <p className="font-body text-slate-400 text-sm tracking-widest mb-1">BIENVENIDO AL SERVIDOR</p>
          <h2 className="font-display text-3xl text-white tracking-wider glow-violet">ARICA CHILE ROLEPLAY ER:LC</h2>
          <p className="text-slate-500 font-body text-sm mt-1">Inicia sesión, crea tu cédula y accede a todo el ecosistema ACRP.</p>
        </div>
        <img src="/assets/logo.png" alt="" aria-hidden className="absolute right-6 top-1/2 -translate-y-1/2 w-28 h-28 object-contain opacity-20 pointer-events-none" style={{ mixBlendMode: "screen" }} />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {serverStats.map(s => { const Icon = s.icon; return (
          <div key={s.label} className="rounded-xl p-4 flex items-center gap-3" style={{ background: s.c.bg, border: `1px solid ${s.c.border}` }}>
            <div className="p-2 rounded-lg" style={{ background: `${s.c.text}1a` }}><Icon size={17} style={{ color: s.c.text }} /></div>
            <div className="min-w-0"><div className="font-display text-lg font-bold leading-none" style={{ color: s.c.text }}>{s.value}</div><div className="text-slate-500 font-body text-xs mt-0.5 leading-tight">{s.label}</div></div>
          </div>
        )})}
      </div>
      <div className="flex flex-col gap-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-display tracking-widest border w-fit" style={{ background: "rgba(234,88,12,0.12)", borderColor: "rgba(234,88,12,0.3)", color: "#f97316" }}>⚙️ SERVICIOS</span>
        <h3 className="font-display text-white text-lg tracking-wider">¿QUÉ PUEDES HACER?</h3>
        <p className="text-slate-500 font-body text-sm -mt-2">Herramientas y servicios disponibles dentro del portal.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {services.map((svc, i) => { const Icon = svc.icon; return (
            <motion.button key={i} onClick={() => setActiveSection(svc.id)} whileHover={{ y: -4, scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="rounded-2xl p-5 text-left flex flex-col gap-3 cursor-pointer transition-all duration-200" style={{ background: "rgba(20,12,4,0.7)", border: `1px solid ${svc.color}22`, backdropFilter: "blur(12px)" }} onMouseEnter={e => { e.currentTarget.style.borderColor=`${svc.color}55`; e.currentTarget.style.boxShadow=`0 0 20px ${svc.color}18` }} onMouseLeave={e => { e.currentTarget.style.borderColor=`${svc.color}22`; e.currentTarget.style.boxShadow="none" }}>
              <div className="p-2.5 rounded-xl w-fit" style={{ background: `${svc.color}18` }}><Icon size={18} style={{ color: svc.color }} /></div>
              <div><p className="text-white font-display text-sm tracking-wide mb-1">{svc.label}</p><p className="text-slate-500 font-body text-xs leading-relaxed">{svc.desc}</p></div>
            </motion.button>
          )})}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-display tracking-widest border w-fit" style={{ background: "rgba(234,88,12,0.12)", borderColor: "rgba(234,88,12,0.3)", color: "#f97316" }}>📸 GALERÍA</span>
        <h3 className="font-display text-white text-lg tracking-wider">MOMENTOS DE LA COMUNIDAD</h3>
        <p className="text-slate-500 font-body text-sm -mt-2">Operativos, patrullajes y servicios registrados por ACRP.</p>
        <GalleryCarousel />
      </div>
      <div className="rounded-2xl p-5 border border-violet-500/12" style={{ background: "rgba(20,12,4,0.5)", backdropFilter: "blur(12px)" }}>
        <h3 className="font-display text-white text-xs tracking-widest mb-4">ACTIVIDAD RECIENTE</h3>
        <div className="flex flex-col">
          {activity.map((a, i) => (
            <div key={i} className="flex items-center justify-between py-2.5" style={{ borderBottom: i < activity.length-1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
              <div className="flex items-center gap-3 min-w-0"><span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: a.dot, boxShadow: `0 0 6px ${a.dot}` }} /><span className="text-slate-300 font-body text-sm truncate">{a.msg}</span></div>
              <span className="text-slate-600 font-body text-xs shrink-0 ml-4">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function CedulaSection() {
  const [formData, setFormData] = useState({ apellidos: "", nombres: "", fechaNac: "", roblox: "", discord: "", firma: "" })
  const [identidadFinal, setIdentidadFinal] = useState({ rut: "", nroDocumento: "", fotoUrl: "", registrado: false })
  const [isProcessing, setIsProcessing] = useState(false)
  const [horaChile, setHoraChile] = useState("")
  const [fotoError, setFotoError] = useState(false)
  useEffect(() => { const t = setInterval(() => setHoraChile(new Date().toLocaleTimeString("es-CL", { timeZone: "America/Santiago" })), 1000); return () => clearInterval(t) }, [])
  const handleGuardar = () => {
    if (!formData.nombres || !formData.roblox) { alert("Completa al menos tu nombre y usuario de Roblox."); return }
    setIsProcessing(true); setFotoError(false)
    setTimeout(() => {
      const base = Math.floor(Math.random() * (29000000 - 18000000) + 18000000)
      const dv = ["0","1","2","3","4","5","6","7","8","9","K"][Math.floor(Math.random() * 11)]
      setIdentidadFinal({ rut: `${new Intl.NumberFormat("es-CL").format(base)}-${dv}`, nroDocumento: Math.floor(Math.random() * 900000000 + 100000000), fotoUrl: `https://www.roblox.com/headshot-thumbnail/image?userId=${formData.roblox}&width=150&height=150&format=png`, registrado: true })
      setIsProcessing(false)
    }, 1500)
  }

  // Fechas formateadas
  const today = new Date()
  const fmtDate = (d) => d.toLocaleDateString("es-CL", { day:"2-digit", month:"short", year:"numeric" }).toUpperCase()
  const emisDate = fmtDate(today)
  const vencDate = fmtDate(new Date(today.getFullYear()+10, today.getMonth(), today.getDate()))
  const fechaNacDisplay = formData.fechaNac
    ? fmtDate(new Date(formData.fechaNac + "T12:00:00"))
    : "DD MES AAAA"

  return (
    <motion.div {...slideUp} className="flex flex-col gap-6">
      <div className="flex items-center justify-between p-5 rounded-2xl border border-white/10" style={{ background: "rgba(20,12,4,0.6)", backdropFilter: "blur(20px)" }}>
        <div><h2 className="font-display text-xl text-[#fb923c] tracking-widest italic">PORTAL IDENTIDAD</h2><p className="text-[10px] tracking-[0.3em] text-slate-500 uppercase font-bold mt-0.5">Arica Chile Roleplay • Sistema Centralizado</p></div>
        <div className="text-right"><p className="text-xs text-[#fb923c] font-mono font-bold uppercase tracking-widest flex items-center gap-2 justify-end"><Clock size={13} /> SANTIAGO, CHILE</p><p className="text-xl font-black font-mono text-white">{horaChile}</p></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
        {/* FORMULARIO */}
        <div className="rounded-[2rem] p-7 border border-white/10 shadow-2xl" style={{ background: "rgba(20,12,4,0.8)", backdropFilter: "blur(20px)" }}>
          <div className="flex items-center gap-3 mb-7"><div className="p-3 rounded-2xl" style={{ background: "rgba(251,146,60,0.12)" }}><ShieldCheck size={24} className="text-[#fb923c]" /></div><h3 className="text-lg font-bold uppercase tracking-tight text-white font-display">Registro Civil Digital</h3></div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[["nombres","Nombres"],["apellidos","Apellidos"]].map(([f,p]) => <input key={f} type="text" placeholder={p} className="w-full p-4 rounded-2xl outline-none font-semibold text-white placeholder-slate-600 font-body" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.08)" }} onFocus={e=>(e.target.style.borderColor="rgba(251,146,60,0.5)")} onBlur={e=>(e.target.style.borderColor="rgba(255,255,255,0.08)")} onChange={e=>setFormData({...formData,[f]:e.target.value})} />)}
            </div>
            <div className="relative"><input type="date" className="w-full p-4 rounded-2xl outline-none text-slate-400 font-semibold font-body" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.08)" }} onChange={e=>setFormData({...formData,fechaNac:e.target.value})} /><span className="absolute right-4 top-4 text-[10px] text-slate-500 uppercase font-bold pointer-events-none">F. Nacimiento</span></div>
            <input type="text" placeholder="Firma del Titular" className="w-full p-4 rounded-2xl outline-none font-bold text-[#f97316] placeholder-slate-600 font-body" style={{ background: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.25)" }} onFocus={e=>(e.target.style.borderColor="rgba(249,115,22,0.6)")} onBlur={e=>(e.target.style.borderColor="rgba(249,115,22,0.25)")} onChange={e=>setFormData({...formData,firma:e.target.value})} />
            <input type="text" placeholder="Usuario Roblox o ID (para foto)" className="w-full p-4 rounded-2xl outline-none font-bold text-[#fb923c] placeholder-slate-600 font-body" style={{ background: "rgba(251,146,60,0.06)", border: "1px solid rgba(251,146,60,0.25)" }} onFocus={e=>(e.target.style.borderColor="rgba(251,146,60,0.6)")} onBlur={e=>(e.target.style.borderColor="rgba(251,146,60,0.25)")} onChange={e=>setFormData({...formData,roblox:e.target.value})} />
            <input type="text" placeholder="Discord Tag (Opcional)" className="w-full p-4 rounded-2xl outline-none font-semibold text-white placeholder-slate-600 font-body" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.08)" }} onFocus={e=>(e.target.style.borderColor="rgba(251,146,60,0.5)")} onBlur={e=>(e.target.style.borderColor="rgba(255,255,255,0.08)")} onChange={e=>setFormData({...formData,discord:e.target.value})} />
            <button onClick={handleGuardar} disabled={isProcessing} className="w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all mt-2 disabled:opacity-50 font-display tracking-widest text-white shimmer-btn" style={{ background: "linear-gradient(135deg,#fb923c,#3b82f6)", boxShadow: "0 10px 30px rgba(8,145,178,0.3)" }}>
              {isProcessing ? <><RefreshCw className="animate-spin" size={20} /> PROCESANDO DATOS...</> : <><Check size={20} /> GUARDAR IDENTIDAD</>}
            </button>
          </div>
        </div>

        {/* PREVIEW CEDULA */}
        <div className="flex flex-col items-center justify-center gap-4">
          {/* Contenedor con relacion de aspecto exacta del carnet chileno ~85.6x54mm => ~1.585:1 */}
          <div className="relative w-full max-w-[520px] shadow-2xl" style={{ borderRadius: "12px", overflow: "hidden", aspectRatio: "1.585/1" }}>
            {/* Imagen base del carnet */}
            <img src="/assets/dni-base.png" alt="Base DNI" className="absolute inset-0 w-full h-full object-fill" draggable={false} />

            {identidadFinal.registrado && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }} className="absolute inset-0 z-10" style={{ fontFamily: "'Arial Narrow', Arial, sans-serif" }}>

                {/* FOTO DEL AVATAR — nueva imagen dni */}
                <div className="absolute overflow-hidden" style={{
                  left: "3.5%", top: "18%",
                  width: "21%", height: "62%",
                  borderRadius: "2px",
                  background: "#c8d8f0"
                }}>
                  {!fotoError ? (
                    <img src={identidadFinal.fotoUrl} alt="Avatar" className="w-full h-full object-cover object-center" style={{ display: "block" }} onError={() => setFotoError(true)} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl" style={{ background: "#a8bedc" }}>👤</div>
                  )}
                </div>

                {/* APELLIDOS */}
                <div className="absolute" style={{ left: "27%", top: "20%", fontSize: "clamp(3px,0.75vw,7px)", fontWeight: "700", color: "#3a5a99", letterSpacing: "0.1em", textTransform: "uppercase" }}>APELLIDOS</div>
                <div className="absolute" style={{ left: "27%", top: "26%", fontSize: "clamp(5px,1.15vw,10px)", fontWeight: "900", color: "#0a1840", letterSpacing: "0.03em", textTransform: "uppercase" }}>{formData.apellidos || "—"}</div>

                {/* NOMBRES */}
                <div className="absolute" style={{ left: "27%", top: "36%", fontSize: "clamp(3px,0.75vw,7px)", fontWeight: "700", color: "#3a5a99", letterSpacing: "0.1em", textTransform: "uppercase" }}>NOMBRES</div>
                <div className="absolute" style={{ left: "27%", top: "42%", fontSize: "clamp(5px,1.15vw,10px)", fontWeight: "900", color: "#0a1840", letterSpacing: "0.03em", textTransform: "uppercase" }}>{formData.nombres || "—"}</div>

                {/* NACIONALIDAD + SEXO */}
                <div className="absolute" style={{ left: "27%", top: "52%", fontSize: "clamp(3px,0.72vw,6.5px)", fontWeight: "700", color: "#3a5a99", letterSpacing: "0.09em", textTransform: "uppercase" }}>NACIONALIDAD</div>
                <div className="absolute" style={{ left: "63%", top: "52%", fontSize: "clamp(3px,0.72vw,6.5px)", fontWeight: "700", color: "#3a5a99", letterSpacing: "0.09em", textTransform: "uppercase" }}>SEXO</div>
                <div className="absolute" style={{ left: "27%", top: "57.5%", fontSize: "clamp(4px,0.88vw,8px)", fontWeight: "700", color: "#0a1840", textTransform: "uppercase" }}>CHILENA</div>
                <div className="absolute" style={{ left: "63%", top: "57.5%", fontSize: "clamp(4px,0.88vw,8px)", fontWeight: "700", color: "#0a1840" }}>M</div>

                {/* FECHA NACIMIENTO + N° DOCUMENTO */}
                <div className="absolute" style={{ left: "27%", top: "64%", fontSize: "clamp(3px,0.72vw,6.5px)", fontWeight: "700", color: "#3a5a99", letterSpacing: "0.09em", textTransform: "uppercase" }}>FECHA DE NACIMIENTO</div>
                <div className="absolute" style={{ left: "63%", top: "64%", fontSize: "clamp(3px,0.72vw,6.5px)", fontWeight: "700", color: "#3a5a99", letterSpacing: "0.09em", textTransform: "uppercase" }}>NÚMERO DOCUMENTO</div>
                <div className="absolute" style={{ left: "27%", top: "70%", fontSize: "clamp(4px,0.88vw,8px)", fontWeight: "800", color: "#0a1840", fontFamily: "monospace" }}>{fechaNacDisplay}</div>
                <div className="absolute" style={{ left: "63%", top: "70%", fontSize: "clamp(4px,0.88vw,8px)", fontWeight: "800", color: "#0a1840", fontFamily: "monospace" }}>{identidadFinal.nroDocumento}</div>

                {/* FECHA EMISIÓN + VENCIMIENTO */}
                <div className="absolute" style={{ left: "27%", top: "77.5%", fontSize: "clamp(3px,0.72vw,6.5px)", fontWeight: "700", color: "#3a5a99", letterSpacing: "0.09em", textTransform: "uppercase" }}>FECHA DE EMISIÓN</div>
                <div className="absolute" style={{ left: "63%", top: "77.5%", fontSize: "clamp(3px,0.72vw,6.5px)", fontWeight: "700", color: "#3a5a99", letterSpacing: "0.09em", textTransform: "uppercase" }}>FECHA DE VENCIMIENTO</div>
                <div className="absolute" style={{ left: "27%", top: "83%", fontSize: "clamp(3.5px,0.8vw,7.5px)", fontWeight: "700", color: "#0a1840", fontFamily: "monospace" }}>{emisDate}</div>
                <div className="absolute" style={{ left: "63%", top: "83%", fontSize: "clamp(3.5px,0.8vw,7.5px)", fontWeight: "700", color: "#0a1840", fontFamily: "monospace" }}>{vencDate}</div>

                {/* RUN */}
                <div className="absolute" style={{ left: "3.5%", top: "86%", fontSize: "clamp(3px,0.7vw,6.5px)", fontWeight: "700", color: "#3a5a99", letterSpacing: "0.08em" }}>RUN</div>
                <div className="absolute" style={{ left: "3.5%", top: "91%", fontSize: "clamp(5px,1.05vw,9.5px)", fontWeight: "900", color: "#0a1840", fontFamily: "monospace", letterSpacing: "0.04em" }}>{identidadFinal.rut}</div>

                {/* FIRMA */}
                <div className="absolute" style={{ left: "36%", top: "86%", fontSize: "clamp(3px,0.7vw,6.5px)", fontWeight: "700", color: "#3a5a99", letterSpacing: "0.08em" }}>FIRMA DEL TITULAR</div>
                <div className="absolute" style={{ left: "36%", top: "90.5%", fontSize: "clamp(6px,1.3vw,12px)", fontWeight: "400", color: "#0a1840", fontFamily: "'Brush Script MT', cursive" }}>{formData.firma || "—"}</div>
              </motion.div>
            )}

            {!identidadFinal.registrado && !isProcessing && (
              <div className="absolute inset-0 z-20 flex items-center justify-center text-center p-10" style={{ background: "rgba(0,0,0,0.52)", backdropFilter: "blur(4px)" }}>
                <p className="text-sm font-bold uppercase tracking-widest text-[#fb923c] font-display">Esperando datos en el sistema central...</p>
              </div>
            )}
            {isProcessing && (
              <div className="absolute inset-0 z-20 flex items-center justify-center gap-3" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}>
                <Loader2 className="animate-spin text-[#fb923c]" size={24} /><span className="text-white font-display text-xs tracking-widest">PROCESANDO...</span>
              </div>
            )}
          </div>
          <p className="text-[10px] text-slate-600 uppercase tracking-[0.5em] font-black font-display">Cedula Oficial Arica Chile Roleplay ER:LC</p>
          {identidadFinal.registrado && (
            <div className="flex gap-2 mt-1">
              <span className="px-3 py-1 rounded-lg font-body text-xs text-green-400 border border-green-500/30" style={{ background: "rgba(34,197,94,0.08)" }}>✓ Identidad Verificada</span>
              <span className="px-3 py-1 rounded-lg font-body text-xs text-[#fb923c] border border-cyan-500/30" style={{ background: "rgba(251,146,60,0.08)" }}>RUN: {identidadFinal.rut}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function BancoSection() {
  const [showTransfer, setShowTransfer] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [filterType, setFilterType] = useState("Todos")

  const discordSueldo = { rol: "Director de Gestiones", monto: 8500, ciclo: "Semanal", proximo: "Viernes 11 Abr" }

  const tx = [
    { desc: "Nomina semanal — Discord (Director)", amount: +8500, date: "Hoy, 09:00",    type: "salary",   ref: "NOM-2026-041" },
    { desc: "Pago servicio policial S.I.P.",       amount: -1200, date: "Hoy, 07:30",    type: "service",  ref: "SRV-0441" },
    { desc: "Compra Chaleco Balistico NIJ-III",    amount: -12500,date: "Ayer, 18:22",   type: "purchase", ref: "MKT-0892" },
    { desc: "Transferencia de GabrielRP",          amount: +3000, date: "Ayer, 14:10",   type: "transfer", ref: "TRF-3312" },
    { desc: "Multa — Velocidad Zona Centro",       amount: -800,  date: "02 Abr, 11:05", type: "fine",     ref: "MUL-0221" },
    { desc: "Ingreso empresa ConstruRP Ltda",      amount: +5200, date: "01 Abr, 16:00", type: "empresa",  ref: "EMP-0078" },
    { desc: "Fianza por detencion temporal",       amount: -2500, date: "31 Mar, 20:15", type: "bail",     ref: "JUD-0033" },
    { desc: "Deposito cuenta principal",           amount: +10000,date: "30 Mar, 09:00", type: "deposit",  ref: "DEP-0901" },
    { desc: "Mantenimiento vehiculo patrulla",     amount: -850,  date: "29 Mar, 15:40", type: "service",  ref: "SRV-0312" },
    { desc: "Nomina semanal — Discord (Director)", amount: +8500, date: "28 Mar, 09:00", type: "salary",   ref: "NOM-2026-034" },
  ]

  const txFiltered = filterType === "Todos" ? tx : tx.filter(t => TX_TYPES[t.type]?.label.startsWith(filterType.slice(0,4)))
  const totalIn = tx.filter(t=>t.amount>0).reduce((a,b)=>a+b.amount,0)
  const totalOut = tx.filter(t=>t.amount<0).reduce((a,b)=>a+Math.abs(b.amount),0)
  const saldo = 24500

  return (
    <motion.div {...slideUp} className="flex flex-col gap-5">
      {/* TARJETA SALDO */}
      <div className="relative rounded-2xl p-7 overflow-hidden" style={{ background: "linear-gradient(135deg,rgba(234,88,12,0.22) 0%,rgba(236,72,153,0.14) 50%,rgba(251,146,60,0.08) 100%)", border: "1px solid rgba(234,88,12,0.3)" }}>
        <div className="absolute top-4 right-5 text-[10px] font-mono text-slate-600 tracking-widest">BANCO METROPOLITANO · CTA-0042</div>
        <div className="relative z-10">
          <p className="text-slate-400 font-body text-xs tracking-widest mb-2">SALDO DISPONIBLE</p>
          <div className="font-display text-5xl font-black text-white leading-none mb-1">${saldo.toLocaleString("es-CL")}</div>
          <p className="text-slate-600 font-mono text-xs mt-1">Jugador_001 · Banco Metropolitano</p>
          <div className="flex gap-3 mt-6 flex-wrap">
            <button onClick={() => setShowTransfer(true)} className="shimmer-btn flex items-center gap-2 px-5 py-2.5 rounded-xl font-display text-xs tracking-widest text-white" style={{ background: "linear-gradient(135deg,#ec4899,#f97316)", boxShadow: "0 0 22px rgba(236,72,153,0.35)" }}><Send size={13} /> TRANSFERIR</button>
            <button onClick={() => setActiveTab("historial")} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-display text-xs tracking-widest text-slate-300 border border-violet-500/25 hover:border-violet-500/50 hover:text-white transition-all" style={{ background: "rgba(234,88,12,0.06)" }}><BarChart3 size={13} /> HISTORIAL</button>
            <button onClick={() => setActiveTab("sueldo")} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-display text-xs tracking-widest text-slate-300 border border-green-500/25 hover:border-green-500/50 hover:text-white transition-all" style={{ background: "rgba(34,197,94,0.04)" }}><Banknote size={13} /> SUELDOS</button>
          </div>
        </div>
      </div>

      {/* STATS RAPIDAS */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Ingresos del Mes",  value: `+$${totalIn.toLocaleString("es-CL")}`,   color: "#22c55e", bg: "rgba(34,197,94,0.07)",   border: "rgba(34,197,94,0.2)"   },
          { label: "Egresos del Mes",   value: `-$${totalOut.toLocaleString("es-CL")}`,   color: "#ec4899", bg: "rgba(236,72,153,0.07)",  border: "rgba(236,72,153,0.2)"  },
          { label: "Nomina Discord",    value: `$${discordSueldo.monto.toLocaleString("es-CL")}/sem`, color: "#f97316", bg: "rgba(249,115,22,0.07)", border: "rgba(249,115,22,0.2)" },
        ].map((s,i) => (
          <div key={i} className="rounded-xl p-4" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
            <div className="font-display font-bold text-base leading-none mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-slate-500 font-body text-xs">{s.label}</div>
          </div>
        ))}
      </div>

      {/* TABS */}
      <div className="flex gap-1 p-1 rounded-xl" style={{ background: "rgba(20,12,4,0.6)" }}>
        {["overview","historial","sueldo"].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className="flex-1 py-2 rounded-lg font-display text-[11px] tracking-widest transition-all" style={activeTab === tab ? { background: "rgba(234,88,12,0.25)", color: "#fff", boxShadow: "0 0 12px rgba(234,88,12,0.3)" } : { color: "#64748b" }}>
            {tab === "overview" ? "RESUMEN" : tab === "historial" ? "HISTORIAL" : "SUELDOS"}
          </button>
        ))}
      </div>

      {/* PANEL RESUMEN */}
      {activeTab === "overview" && (
        <div className="rounded-2xl p-5 border border-violet-500/12" style={{ background: "rgba(20,12,4,0.5)", backdropFilter: "blur(12px)" }}>
          <h3 className="font-display text-white text-xs tracking-widest mb-4">ULTIMAS TRANSACCIONES</h3>
          <div className="flex flex-col">
            {tx.slice(0,5).map((t, i) => {
              const tt = TX_TYPES[t.type] || TX_TYPES.service
              return (
                <div key={i} className="flex items-center justify-between py-3" style={{ borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-sm" style={{ background: tt.bg, border: `1px solid ${tt.border}` }}>
                      {t.amount > 0 ? <ArrowDownLeft size={15} className="text-green-400" /> : <ArrowUpRight size={15} style={{ color: tt.color }} />}
                    </div>
                    <div>
                      <p className="text-slate-200 font-body text-sm leading-tight">{t.desc}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-body text-[10px] px-1.5 py-0.5 rounded" style={{ background: tt.bg, color: tt.color }}>{tt.label}</span>
                        <span className="text-slate-600 font-body text-xs">{t.date}</span>
                      </div>
                    </div>
                  </div>
                  <span className="font-display text-sm font-bold ml-4" style={{ color: t.amount > 0 ? "#22c55e" : tt.color }}>{t.amount > 0 ? "+" : "−"}${Math.abs(t.amount).toLocaleString("es-CL")}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* PANEL HISTORIAL COMPLETO */}
      {activeTab === "historial" && (
        <div className="rounded-2xl p-5 border border-violet-500/12" style={{ background: "rgba(20,12,4,0.5)", backdropFilter: "blur(12px)" }}>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h3 className="font-display text-white text-xs tracking-widest">HISTORIAL COMPLETO</h3>
            <div className="flex gap-1 flex-wrap">
              {["Todos", "Nomina", "Multa", "Compra", "Ingreso"].map(f => (
                <button key={f} onClick={() => setFilterType(f)} className="px-2.5 py-1 rounded-lg font-display text-[10px] tracking-widest transition-all border" style={filterType===f ? { background: "rgba(234,88,12,0.3)", color: "#fff", borderColor: "rgba(234,88,12,0.5)" } : { background: "rgba(255,255,255,0.02)", color: "#64748b", borderColor: "rgba(255,255,255,0.06)" }}>{f}</button>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            {txFiltered.map((t, i) => {
              const tt = TX_TYPES[t.type] || TX_TYPES.service
              return (
                <div key={i} className="flex items-center justify-between py-3" style={{ borderBottom: i < txFiltered.length-1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: tt.bg, border: `1px solid ${tt.border}` }}>
                      {t.amount > 0 ? <ArrowDownLeft size={14} className="text-green-400" /> : <ArrowUpRight size={14} style={{ color: tt.color }} />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-slate-200 font-body text-sm leading-tight truncate">{t.desc}</p>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <span className="font-body text-[10px] px-1.5 py-0.5 rounded shrink-0" style={{ background: tt.bg, color: tt.color }}>{tt.label}</span>
                        <span className="text-slate-600 font-mono text-[10px] shrink-0">{t.ref}</span>
                        <span className="text-slate-600 font-body text-xs">{t.date}</span>
                      </div>
                    </div>
                  </div>
                  <span className="font-display text-sm font-bold ml-4 shrink-0" style={{ color: t.amount > 0 ? "#22c55e" : tt.color }}>{t.amount > 0 ? "+" : "−"}${Math.abs(t.amount).toLocaleString("es-CL")}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* PANEL SUELDOS DISCORD */}
      {activeTab === "sueldo" && (
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl p-6 border border-green-500/20" style={{ background: "rgba(34,197,94,0.06)" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl" style={{ background: "rgba(34,197,94,0.15)" }}><Banknote size={20} className="text-green-400" /></div>
              <div><p className="text-white font-display text-sm tracking-widest">NOMINA DISCORD VINCULADA</p><p className="text-slate-500 font-body text-xs">Tu sueldo en el servidor se deposita automaticamente</p></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Rol Discord",     value: discordSueldo.rol      },
                { label: "Sueldo Semanal",  value: `$${discordSueldo.monto.toLocaleString("es-CL")}` },
                { label: "Ciclo de Pago",   value: discordSueldo.ciclo    },
                { label: "Proximo Pago",    value: discordSueldo.proximo  },
              ].map((s,i) => (
                <div key={i} className="rounded-xl p-4" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(34,197,94,0.15)" }}>
                  <p className="text-slate-500 font-body text-xs mb-1">{s.label}</p>
                  <p className="text-white font-display text-sm">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl p-5 border border-violet-500/12" style={{ background: "rgba(20,12,4,0.5)" }}>
            <h3 className="font-display text-white text-xs tracking-widest mb-4">TABLA DE SUELDOS POR ROL</h3>
            <div className="flex flex-col gap-1">
              {[
                { rol: "Presidente",            sueldo: 25000, color: "#f97316" },
                { rol: "VicePresidente",         sueldo: 20000, color: "#f97316" },
                { rol: "Director Ejecutivo",     sueldo: 16000, color: "#ec4899" },
                { rol: "Director Corporativo",   sueldo: 14000, color: "#f59e0b" },
                { rol: "Director de Gestiones",  sueldo: 8500,  color: "#fb923c" },
                { rol: "Gestor Administrativo",  sueldo: 7000,  color: "#fb923c" },
                { rol: "Carabinero",             sueldo: 5500,  color: "#22c55e" },
                { rol: "PDI Detective",          sueldo: 6000,  color: "#8b5cf6" },
                { rol: "Seguridad Ciudadana",    sueldo: 4500,  color: "#f59e0b" },
                { rol: "Civil Verificado",       sueldo: 2000,  color: "#64748b" },
              ].map((r,i) => (
                <div key={i} className="flex items-center justify-between py-2.5 px-3 rounded-xl" style={{ background: i%2===0 ? "rgba(255,255,255,0.02)" : "transparent" }}>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: r.color, boxShadow: `0 0 6px ${r.color}` }} />
                    <span className="text-slate-300 font-body text-sm">{r.rol}</span>
                  </div>
                  <span className="font-display text-sm font-bold" style={{ color: r.color }}>${r.sueldo.toLocaleString("es-CL")}/sem</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>{showTransfer && <TransferModal onClose={() => setShowTransfer(false)} />}</AnimatePresence>
    </motion.div>
  )
}

function MercadoSection() {
  const cats = ["Todos", "Armas", "Protección", "Vehículos", "Equipo", "Médico", "Premium"]
  const [filter, setFilter] = useState("Todos")
  const items = filter === "Todos" ? MARKET_ITEMS : MARKET_ITEMS.filter(i => i.category === filter)
  return (
    <motion.div {...slideUp} className="flex flex-col gap-5">
      <div className="flex items-center justify-between"><h2 className="font-display text-white text-base tracking-widest">MERCADO NEGRO</h2><span className="text-slate-500 font-body text-sm">{items.length} artículos</span></div>
      <div className="flex gap-2 flex-wrap">
        {cats.map(c => <button key={c} onClick={() => setFilter(c)} className={clsx("px-3.5 py-1.5 rounded-lg font-display text-[11px] tracking-widest transition-all duration-200 border", c===filter ? "bg-[#ea580c] text-white border-transparent shadow-[0_0_14px_rgba(234,88,12,0.5)]" : "text-slate-400 border-orange-500/18 hover:border-orange-500/45 hover:text-white")} style={c!==filter ? { background: "rgba(234,88,12,0.06)" } : {}}>{c}</button>)}
      </div>
      <motion.div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" layout>
        <AnimatePresence mode="popLayout">
          {items.map(item => <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.88 }} transition={{ duration: 0.22 }}><MarketCard item={item} /></motion.div>)}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

function ComunidadSection() {
  return (
    <motion.div {...slideUp} className="flex flex-col gap-6">
      <div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-display tracking-widest border mb-3" style={{ background: "rgba(234,88,12,0.12)", borderColor: "rgba(234,88,12,0.3)", color: "#f97316" }}>👥 NOSOTROS</span>
        <h2 className="font-display text-2xl text-white tracking-wider">EQUIPO DIRECTIVO ACRP</h2>
        <p className="text-slate-500 font-body text-sm mt-1">Dirección y desarrollo continuo de la infraestructura del servidor.</p>
      </div>
      <TeamList animated={false} />
      <div className="flex items-center justify-between p-5 rounded-2xl border border-white/5" style={{ background: "rgba(20,12,4,0.4)" }}>
        <div className="flex flex-wrap gap-2">
          {["Normativa General", "Soporte Técnico", "Discord Oficial"].map(link => <span key={link} className="px-3 py-1.5 rounded-lg font-body text-xs text-slate-400 border border-white/8 cursor-pointer hover:text-white transition-colors" style={{ background: "rgba(255,255,255,0.03)" }}>{link}</span>)}
        </div>
      </div>
    </motion.div>
  )
}

function EmpresasSection() {
  const [activeTab, setActiveTab] = useState("mis")
  const empresas = [
    { nombre: "ConstruRP Ltda.", tipo: "Construccion", empleados: 4, ingresos: 24000, estado: "Activa", color: "#f59e0b" },
    { nombre: "TransMetro SpA", tipo: "Transporte",    empleados: 2, ingresos: 12500, estado: "Activa", color: "#fb923c" },
  ]
  return (
    <motion.div {...slideUp} className="flex flex-col gap-5">
      <div className="flex items-center gap-3 p-5 rounded-2xl border border-amber-500/20" style={{ background: "rgba(245,158,11,0.07)" }}>
        <div className="p-3 rounded-2xl" style={{ background: "rgba(245,158,11,0.15)" }}><Building2 size={22} className="text-amber-400" /></div>
        <div><h2 className="font-display text-lg text-white tracking-widest">GESTION DE EMPRESAS</h2><p className="text-slate-500 font-body text-sm">Administra tu empresa, empleados e ingresos en el RP.</p></div>
        <button className="ml-auto shimmer-btn px-4 py-2 rounded-xl font-display text-xs tracking-widest text-white" style={{ background: "linear-gradient(135deg,#f59e0b,#ec4899)" }}>+ NUEVA EMPRESA</button>
      </div>
      <div className="flex gap-1 p-1 rounded-xl" style={{ background: "rgba(20,12,4,0.6)" }}>
        {["mis","mercado","registro"].map(t => (
          <button key={t} onClick={() => setActiveTab(t)} className="flex-1 py-2 rounded-lg font-display text-[11px] tracking-widest transition-all" style={activeTab===t ? { background: "rgba(245,158,11,0.2)", color: "#f59e0b" } : { color: "#64748b" }}>
            {t==="mis" ? "MIS EMPRESAS" : t==="mercado" ? "DIRECTORIO" : "REGISTRO LEGAL"}
          </button>
        ))}
      </div>
      {activeTab === "mis" && (
        <div className="flex flex-col gap-4">
          {empresas.map((e,i) => (
            <div key={i} className="rounded-2xl p-5 border" style={{ background: "rgba(20,12,4,0.6)", borderColor: `${e.color}25` }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl" style={{ background: `${e.color}15` }}><Building2 size={18} style={{ color: e.color }} /></div>
                  <div><p className="text-white font-display text-sm tracking-wide">{e.nombre}</p><p className="text-slate-500 font-body text-xs">{e.tipo}</p></div>
                </div>
                <span className="px-3 py-1 rounded-full font-display text-[10px] tracking-widest text-green-400 border border-green-500/30" style={{ background: "rgba(34,197,94,0.08)" }}>{e.estado}</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[["Empleados", e.empleados, e.color],["Ingresos Sem.", `$${e.ingresos.toLocaleString("es-CL")}`, "#22c55e"],["Reputacion", "4.8 ★", "#f59e0b"]].map(([l,v,c],j)=>(
                  <div key={j} className="rounded-xl p-3 text-center" style={{ background: "rgba(0,0,0,0.3)" }}>
                    <div className="font-display text-sm font-bold" style={{ color: c }}>{v}</div>
                    <div className="text-slate-600 font-body text-xs mt-0.5">{l}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 py-2 rounded-xl font-display text-xs tracking-widest text-white border border-amber-500/25 hover:border-amber-500/50 transition-all" style={{ background: "rgba(245,158,11,0.06)" }}>GESTIONAR</button>
                <button className="flex-1 py-2 rounded-xl font-display text-xs tracking-widest text-white border border-violet-500/25 hover:border-violet-500/50 transition-all" style={{ background: "rgba(234,88,12,0.06)" }}>EMPLEADOS</button>
              </div>
            </div>
          ))}
          <div className="rounded-2xl p-8 border border-dashed border-white/10 flex flex-col items-center gap-3 cursor-pointer hover:border-amber-500/30 transition-all">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(245,158,11,0.1)" }}><span className="text-2xl">+</span></div>
            <p className="text-slate-500 font-body text-sm">Registrar nueva empresa en el RP</p>
          </div>
        </div>
      )}
      {activeTab === "mercado" && (
        <div className="rounded-2xl p-5 border border-violet-500/12" style={{ background: "rgba(20,12,4,0.5)" }}>
          <p className="text-slate-500 font-body text-sm text-center py-8">Directorio de empresas activas — Proximamente</p>
        </div>
      )}
      {activeTab === "registro" && (
        <div className="rounded-2xl p-5 border border-violet-500/12" style={{ background: "rgba(20,12,4,0.5)" }}>
          <p className="text-slate-500 font-body text-sm text-center py-8">Registro legal ante el Servicio de Impuestos Internos RP — Proximamente</p>
        </div>
      )}
    </motion.div>
  )
}

function MunicipalidadSection() {
  const [activeTab, setActiveTab] = useState("juzgado")
  const [showTramiteModal, setShowTramiteModal] = useState(false)
  const [tramiteTipo, setTramiteTipo] = useState("")
  const [tramites, setTramites] = useState([])

  const tabs = [
    { id: "juzgado",   label: "Juzgado de Policía Local", icon: Shield    },
    { id: "tramites",  label: "Trámites Municipales",     icon: FileText  },
    { id: "documentos",label: "Documentos",               icon: Receipt   },
    { id: "mis",       label: "Mis Trámites",             icon: Clock     },
  ]

  const tiposTramite = [
    "Permiso de Circulación Vehicular",
    "Patente Comercial",
    "Registro de Empresa",
    "Certificado de Antecedentes (Presencial)",
  ]

  function handleSolicitarTramite() {
    if (!tramiteTipo) return
    setTramites(prev => [...prev, { id: Date.now(), tipo: tramiteTipo, estado: "Pendiente", fecha: new Date().toLocaleDateString("es-CL") }])
    setShowTramiteModal(false)
    setTramiteTipo("")
    setActiveTab("mis")
  }

  return (
    <motion.div {...slideUp} className="flex flex-col gap-0">
      {/* Header */}
      <div className="rounded-2xl p-6 mb-5 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg,rgba(251,146,60,0.08) 0%,rgba(234,88,12,0.10) 100%)", border: "1px solid rgba(251,146,60,0.18)" }}>
        <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20"><Landmark size={48} className="text-cyan-400" /></div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20"><Landmark size={48} className="text-cyan-400" /></div>
        <p className="font-display text-[10px] tracking-[0.3em] text-cyan-400 mb-1">REPÚBLICA DE CHILE</p>
        <h2 className="font-display text-2xl text-white tracking-wider">Municipalidad de Providencia</h2>
        <p className="text-slate-500 font-body text-xs mt-1">Centro Cívico – Oficina Virtual de Trámites y Juzgado de Policía Local</p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 mb-5 rounded-xl p-1" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)" }}>
        {tabs.map(t => {
          const Icon = t.icon
          const active = activeTab === t.id
          return (
            <button key={t.id} onClick={() => setActiveTab(t.id)} className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg font-body text-xs tracking-wide transition-all" style={active ? { background: "rgba(251,146,60,0.15)", color: "#fb923c", boxShadow: "0 0 10px rgba(251,146,60,0.15)" } : { color: "#64748b" }}>
              <Icon size={13} />
              <span className="hidden sm:inline">{t.label}</span>
              <span className="sm:hidden">{t.label.split(" ")[0]}</span>
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        {/* JUZGADO DE POLICÍA LOCAL */}
        {activeTab === "juzgado" && (
          <motion.div key="juzgado" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} className="flex flex-col gap-4">
            <p className="font-display text-[10px] tracking-[0.2em] text-cyan-400">JUZGADO DE POLICÍA LOCAL – PROVIDENCIA</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Multas */}
              <div className="rounded-2xl p-5 border border-white/8 flex flex-col gap-3" style={{ background: "rgba(20,12,4,0.6)" }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg" style={{ background: "rgba(239,68,68,0.12)" }}><Receipt size={16} className="text-red-400" /></div>
                    <div>
                      <p className="text-white font-display text-sm tracking-wide">Multas Pendientes</p>
                      <p className="text-slate-500 font-body text-xs">Partes y sanciones económicas sin regularizar</p>
                    </div>
                  </div>
                  <span className="font-display text-[9px] tracking-widest px-2 py-1 rounded" style={{ background: "rgba(245,158,11,0.2)", color: "#f59e0b" }}>PENDIENTE</span>
                </div>
                <div className="flex flex-col items-center py-6 gap-2 opacity-50">
                  <Shield size={28} className="text-slate-500" />
                  <p className="text-slate-500 font-body text-xs">Sin multas pendientes de pago</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div><p className="text-slate-500 font-body text-[10px] tracking-widest">TOTAL ADEUDADO</p><p className="text-green-400 font-display text-lg font-bold">$0</p></div>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl font-display text-xs tracking-widest transition-all" style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.3)" }}><Check size={13} /> Pagar Todo</button>
                </div>
              </div>
              {/* Antecedentes */}
              <div className="rounded-2xl p-5 border border-white/8 flex flex-col gap-3" style={{ background: "rgba(20,12,4,0.6)" }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg" style={{ background: "rgba(234,88,12,0.12)" }}><FileText size={16} className="text-violet-400" /></div>
                    <div>
                      <p className="text-white font-display text-sm tracking-wide">Antecedentes Penales</p>
                      <p className="text-slate-500 font-body text-xs">Registros del Juzgado de Policía Local</p>
                    </div>
                  </div>
                  <span className="font-display text-[9px] tracking-widest px-2 py-1 rounded" style={{ background: "rgba(251,146,60,0.15)", color: "#fb923c" }}>REGISTRO</span>
                </div>
                <div className="flex flex-col items-center py-6 gap-2 opacity-50">
                  <Shield size={28} className="text-slate-500" />
                  <p className="text-slate-500 font-body text-xs">Expediente limpio — sin antecedentes</p>
                </div>
                <div className="pt-2 border-t border-white/5">
                  <p className="text-slate-600 font-body text-xs flex items-center gap-1.5"><AlertTriangle size={11} className="text-slate-600" /> El pago de fianza elimina el antecedente del expediente oficial</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TRÁMITES MUNICIPALES */}
        {activeTab === "tramites" && (
          <motion.div key="tramites" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} className="flex flex-col gap-4">
            <p className="font-display text-[10px] tracking-[0.2em] text-cyan-400">DEPARTAMENTO DE TRÁNSITO Y COMERCIO – PROVIDENCIA</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Permiso Circulación */}
              <div className="rounded-2xl p-5 border border-white/8 flex flex-col gap-3" style={{ background: "rgba(20,12,4,0.6)" }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg" style={{ background: "rgba(251,146,60,0.12)" }}><Car size={16} className="text-cyan-400" /></div>
                    <div>
                      <p className="text-white font-display text-sm tracking-wide">Permiso de Circulación</p>
                      <p className="text-slate-500 font-body text-xs">Autorización anual de tránsito en vías públicas – $75.000</p>
                    </div>
                  </div>
                  <span className="font-display text-[9px] tracking-widest px-2 py-1 rounded" style={{ background: "rgba(251,146,60,0.15)", color: "#fb923c" }}>TRÁNSITO</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-body text-amber-400" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
                  <Shield size={12} className="text-amber-400 shrink-0" /> Requisito: no tener multas pendientes de pago al momento de solicitar
                </div>
                <div className="flex flex-col items-center py-5 gap-2 opacity-50">
                  <Car size={28} className="text-slate-500" />
                  <p className="text-slate-500 font-body text-xs">Sin vehículos registrados</p>
                </div>
              </div>
              {/* Patentes Comerciales */}
              <div className="rounded-2xl p-5 border border-white/8 flex flex-col gap-4" style={{ background: "rgba(20,12,4,0.6)" }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg" style={{ background: "rgba(34,197,94,0.12)" }}><Building2 size={16} className="text-green-400" /></div>
                    <div>
                      <p className="text-white font-display text-sm tracking-wide">Patentes Comerciales</p>
                      <p className="text-slate-500 font-body text-xs">Registro formal de actividades económicas</p>
                    </div>
                  </div>
                  <span className="font-display text-[9px] tracking-widest px-2 py-1 rounded" style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e" }}>COMERCIO</span>
                </div>
                <p className="text-slate-400 font-body text-xs leading-relaxed">Para operar legalmente en Chile, toda actividad empresarial requiere patente o registro vigente. Solicite una cita con un funcionario municipal para tramitar su patente o registro.</p>
                <button onClick={() => { setTramiteTipo("Patente Comercial"); setShowTramiteModal(true) }} className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-display text-xs tracking-widest transition-all" style={{ background: "rgba(251,146,60,0.18)", color: "#fb923c", border: "1px solid rgba(251,146,60,0.3)" }}>
                  <Building2 size={13} /> Solicitar Patente Comercial
                </button>
                <button onClick={() => { setTramiteTipo("Registro de Empresa"); setShowTramiteModal(true) }} className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-display text-xs tracking-widest transition-all" style={{ background: "rgba(255,255,255,0.03)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <FileText size={13} /> Registrar Nueva Empresa
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* DOCUMENTOS */}
        {activeTab === "documentos" && (
          <motion.div key="documentos" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} className="flex flex-col gap-4">
            <p className="font-display text-[10px] tracking-[0.2em] text-cyan-400">REGISTRO CIVIL E IDENTIFICACIÓN – PROVIDENCIA</p>
            <div className="rounded-2xl p-4 border border-white/8" style={{ background: "rgba(20,12,4,0.6)" }}>
              <div className="flex items-center gap-2 mb-1">
                <div className="p-1.5 rounded-lg" style={{ background: "rgba(251,146,60,0.12)" }}><FileText size={14} className="text-cyan-400" /></div>
                <p className="text-white font-display text-sm tracking-wide">Documentos Oficiales del Registro Civil</p>
              </div>
              <p className="text-slate-500 font-body text-xs pl-8">Los documentos emitidos por esta ventanilla tienen carácter oficial. El Certificado de Antecedentes puede ser solicitado en cualquier momento previo pago del arancel correspondiente.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: CreditCard, title: "Certificado de Nacimiento", desc: "Acredita el registro civil de nacimiento, identidad y estado personal", badge: "REGISTRO CIVIL", color: "#fb923c", action: "Generar", free: true },
                { icon: Car, title: "Padrón de Vehículo", desc: "Certificado de dominio y registro de propiedad vehicular", badge: "REGISTRO DE VEHÍCULOS", color: "#f97316", action: "Generar", free: true },
                { icon: FileText, title: "Certificado de Antecedentes", desc: "Acredita su situación penal ante organismos públicos y privados", badge: "JUZGADO LOCAL", color: "#f59e0b", action: "Solicitar", arancel: "$5.000" },
              ].map((doc, i) => {
                const Icon = doc.icon
                return (
                  <div key={i} className="rounded-2xl p-5 border border-white/8 flex flex-col gap-3" style={{ background: "rgba(20,12,4,0.6)" }}>
                    <div className="p-2.5 rounded-xl w-fit" style={{ background: `${doc.color}15` }}><Icon size={18} style={{ color: doc.color }} /></div>
                    <div>
                      <p className="text-white font-display text-sm tracking-wide">{doc.title}</p>
                      <p className="text-slate-500 font-body text-xs mt-1 leading-relaxed">{doc.desc}</p>
                      {doc.arancel && <p className="text-amber-400 font-display text-xs mt-2">Arancel: {doc.arancel}</p>}
                    </div>
                    <div className="flex items-center gap-2 mt-auto">
                      <span className="font-display text-[9px] tracking-widest px-2 py-1 rounded" style={{ background: `${doc.color}15`, color: doc.color }}>{doc.badge}</span>
                      <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-display text-[10px] tracking-widest transition-all" style={{ background: `${doc.color}20`, color: doc.color, border: `1px solid ${doc.color}40` }}>
                        <BadgeCheck size={11} /> {doc.action}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* MIS TRÁMITES */}
        {activeTab === "mis" && (
          <motion.div key="mis" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display text-[10px] tracking-[0.2em] text-cyan-400 mb-1">MIS TRÁMITES MUNICIPALES</p>
                <p className="text-slate-500 font-body text-xs">Historial y estado de tus solicitudes de cita con funcionarios municipales.</p>
              </div>
              <button onClick={() => setShowTramiteModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl font-display text-xs tracking-widest transition-all" style={{ background: "rgba(251,146,60,0.18)", color: "#fb923c", border: "1px solid rgba(251,146,60,0.3)" }}>
                + Nuevo Trámite
              </button>
            </div>
            {tramites.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3 opacity-50">
                <FileText size={32} className="text-slate-600" />
                <p className="text-slate-500 font-body text-sm">No tienes trámites registrados. ¡Solicita uno!</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {tramites.map(tr => (
                  <div key={tr.id} className="flex items-center gap-4 p-4 rounded-xl border border-white/8" style={{ background: "rgba(20,12,4,0.6)" }}>
                    <div className="p-2 rounded-lg" style={{ background: "rgba(251,146,60,0.1)" }}><FileText size={15} className="text-cyan-400" /></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-display text-sm tracking-wide">{tr.tipo}</p>
                      <p className="text-slate-500 font-body text-xs">Solicitado el {tr.fecha}</p>
                    </div>
                    <span className="font-display text-[9px] tracking-widest px-2 py-1 rounded shrink-0" style={{ background: "rgba(245,158,11,0.2)", color: "#f59e0b" }}>{tr.estado}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Solicitar Trámite */}
      <AnimatePresence>
        {showTramiteModal && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }} onClick={() => setShowTramiteModal(false)}>
            <motion.div initial={{ scale:0.92, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.92, opacity:0 }} onClick={e => e.stopPropagation()} className="w-full max-w-md rounded-2xl p-6 border border-white/10 flex flex-col gap-5" style={{ background: "#0f1220" }}>
              <div className="flex items-center justify-between">
                <h3 className="font-display text-white text-sm tracking-widest">Solicitar Trámite Municipal</h3>
                <button onClick={() => setShowTramiteModal(false)} className="text-slate-500 hover:text-white transition-colors"><X size={18} /></button>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-display text-[10px] tracking-[0.2em] text-slate-400">TIPO DE TRÁMITE</label>
                <select value={tramiteTipo} onChange={e => setTramiteTipo(e.target.value)} className="w-full px-4 py-3 rounded-xl font-body text-sm outline-none appearance-none" style={{ background: "rgba(251,146,60,0.06)", border: "1px solid rgba(251,146,60,0.25)", color: tramiteTipo ? "#f8fafc" : "#64748b" }}>
                  <option value="">– Seleccione un trámite –</option>
                  {tiposTramite.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setShowTramiteModal(false)} className="px-5 py-2.5 rounded-xl font-display text-xs tracking-widest text-slate-400 hover:text-white transition-colors">Cancelar</button>
                <button onClick={handleSolicitarTramite} disabled={!tramiteTipo} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-display text-xs tracking-widest transition-all disabled:opacity-40" style={{ background: "rgba(251,146,60,0.2)", color: "#fb923c", border: "1px solid rgba(251,146,60,0.4)" }}>
                  <BadgeCheck size={13} /> Solicitar Hora
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── GEPOL DATA ─────────────────────────────────────────────────────────────
const GEPOL_DETENIDOS_INIT = [
  { id: "DET-001", nombre: "Carlos Ramírez Vega",   rut: "18.432.210-K", delito: "Robo con violencia",    estado: "Detenido",  fecha: "18 ABR 2026", turno: "Nocturno", oficial: "Sgto. Morales" },
  { id: "DET-002", nombre: "Ignacio Pérez López",   rut: "20.115.887-3", delito: "Porte ilegal de arma",  estado: "Imputado",  fecha: "17 ABR 2026", turno: "Mañana",   oficial: "Cap. Rojas"    },
  { id: "DET-003", nombre: "Felipe Torres Castro",  rut: "22.304.551-7", delito: "Tráfico de sustancias", estado: "Liberado",  fecha: "15 ABR 2026", turno: "Tarde",    oficial: "Det. Soto"     },
]
const GEPOL_OPERATIVOS_INIT = [
  { id: "OPE-001", nombre: "Operativo Sector Norte",        tipo: "Patrullaje",     estado: "Activo",   unidad: "Carabineros", hora: "06:00 — En curso",    oficial: "Cap. Rojas",    personal: 6 },
  { id: "OPE-002", nombre: "Control de Tráfico Autopista",  tipo: "Control",        estado: "Activo",   unidad: "PDI",         hora: "08:30 — En curso",    oficial: "Ins. Fuentes",  personal: 4 },
  { id: "OPE-003", nombre: "Allanamiento Zona Centro",      tipo: "Allanamiento",   estado: "Cerrado",  unidad: "GOPE",        hora: "22:00 — Finalizado",  oficial: "Cte. Vega",     personal: 10},
  { id: "OPE-004", nombre: "Respuesta Robo Banco ACRP",     tipo: "Emergencia",     estado: "Activo",   unidad: "Carabineros", hora: "11:45 — En curso",    oficial: "Sgto. Morales", personal: 8 },
]
const GEPOL_PARTES_INIT = [
  { id: "PRT-001", titulo: "Robo con fuerza en Local Comercial", fecha: "18 ABR 2026", tipo: "Delito",     estado: "Abierto",   oficial: "Sgto. Morales", rut: "18.432.210-K" },
  { id: "PRT-002", titulo: "Accidente de Tránsito — Av. Grecia", fecha: "17 ABR 2026", tipo: "Accidente",  estado: "Cerrado",   oficial: "Cap. Rojas",    rut: "—"             },
  { id: "PRT-003", titulo: "Denuncia Porte Ilegal Arma de Fuego", fecha: "17 ABR 2026", tipo: "Denuncia",   estado: "Derivado",  oficial: "Det. Soto",     rut: "20.115.887-3"  },
]
const GEPOL_TURNOS = [
  { nombre: "Sgto. Morales",   rango: "Sargento",    turno: "Nocturno", estado: "En Servicio", unidad: "Patrulla Alpha", desde: "23:00" },
  { nombre: "Cap. Rojas",      rango: "Capitán",     turno: "Mañana",   estado: "En Servicio", unidad: "Comando Central", desde: "06:00" },
  { nombre: "Det. Soto",       rango: "Detective",   turno: "Tarde",    estado: "Descanso",    unidad: "Investigaciones", desde: "14:00" },
  { nombre: "Ins. Fuentes",    rango: "Inspector",   turno: "Mañana",   estado: "En Servicio", unidad: "Autopista",       desde: "08:00" },
  { nombre: "Cte. Vega",       rango: "Comisario",   turno: "Tarde",    estado: "En Servicio", unidad: "Comando GOPE",    desde: "14:00" },
]
const GEPOL_COLOR = "#fb923c"

function GepolSection() {
  const [tab, setTab]                 = useState("dashboard")
  const [search, setSearch]           = useState("")
  const [detenidos, setDetenidos]     = useState(GEPOL_DETENIDOS_INIT)
  const [operativos, setOperativos]   = useState(GEPOL_OPERATIVOS_INIT)
  const [partes, setPartes]           = useState(GEPOL_PARTES_INIT)
  const [showDetModal, setShowDetModal] = useState(false)
  const [showOpeModal, setShowOpeModal] = useState(false)
  const [showParteModal, setShowParteModal] = useState(false)
  const [detForm, setDetForm]         = useState({ nombre:"", rut:"", delito:"", oficial:"", turno:"Mañana" })
  const [opeForm, setOpeForm]         = useState({ nombre:"", tipo:"Patrullaje", oficial:"", personal:"" })
  const [parteForm, setParteForm]     = useState({ titulo:"", tipo:"Delito", oficial:"", rut:"" })
  const [selectedRow, setSelectedRow] = useState(null)

  const GCOLOR = GEPOL_COLOR

  const filteredDet = detenidos.filter(d =>
    d.nombre.toLowerCase().includes(search.toLowerCase()) ||
    d.rut.includes(search) || d.id.toLowerCase().includes(search.toLowerCase())
  )
  const filteredOpe = operativos.filter(o =>
    o.nombre.toLowerCase().includes(search.toLowerCase()) ||
    o.id.toLowerCase().includes(search.toLowerCase())
  )
  const filteredPar = partes.filter(p =>
    p.titulo.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase()) ||
    p.rut.includes(search)
  )

  const tabs = [
    { id: "dashboard", label: "Dashboard",   icon: BarChart3  },
    { id: "detenidos", label: "Detenidos",   icon: Lock       },
    { id: "partes",    label: "Partes",      icon: FileText   },
    { id: "operativos",label: "Operativos",  icon: Radio      },
    { id: "turnos",    label: "Turnos",      icon: Clock      },
  ]

  const estadoDetenido = { "Detenido": { bg: "rgba(239,68,68,0.15)", color: "#ef4444", border: "rgba(239,68,68,0.3)" }, "Imputado": { bg: "rgba(245,158,11,0.15)", color: "#f59e0b", border: "rgba(245,158,11,0.3)" }, "Liberado": { bg: "rgba(34,197,94,0.12)", color: "#22c55e", border: "rgba(34,197,94,0.3)" } }
  const estadoOpe = { "Activo": { bg: "rgba(251,146,60,0.12)", color: "#fb923c", border: "rgba(251,146,60,0.3)" }, "Cerrado": { bg: "rgba(100,116,139,0.15)", color: "#94a3b8", border: "rgba(100,116,139,0.3)" } }
  const estadoParte = { "Abierto": { bg: "rgba(239,68,68,0.12)", color: "#ef4444", border: "rgba(239,68,68,0.3)" }, "Cerrado": { bg: "rgba(34,197,94,0.12)", color: "#22c55e", border: "rgba(34,197,94,0.3)" }, "Derivado": { bg: "rgba(249,115,22,0.12)", color: "#f97316", border: "rgba(249,115,22,0.3)" } }

  function addDetenido() {
    if (!detForm.nombre || !detForm.rut || !detForm.delito) return
    const nid = `DET-${String(detenidos.length + 1).padStart(3,"0")}`
    setDetenidos(prev => [{ id: nid, ...detForm, estado: "Detenido", fecha: new Date().toLocaleDateString("es-CL",{day:"2-digit",month:"short",year:"numeric"}).toUpperCase(), ...detForm }, ...prev])
    setDetForm({ nombre:"", rut:"", delito:"", oficial:"", turno:"Mañana" })
    setShowDetModal(false)
  }
  function addOperativo() {
    if (!opeForm.nombre) return
    const nid = `OPE-${String(operativos.length + 1).padStart(3,"0")}`
    setOperativos(prev => [{ id: nid, ...opeForm, estado: "Activo", hora: new Date().toLocaleTimeString("es-CL",{hour:"2-digit",minute:"2-digit"}) + " — En curso", unidad:"Carabineros" }, ...prev])
    setOpeForm({ nombre:"", tipo:"Patrullaje", oficial:"", personal:"" })
    setShowOpeModal(false)
  }
  function addParte() {
    if (!parteForm.titulo) return
    const nid = `PRT-${String(partes.length + 1).padStart(3,"0")}`
    setPartes(prev => [{ id: nid, ...parteForm, estado: "Abierto", fecha: new Date().toLocaleDateString("es-CL",{day:"2-digit",month:"short",year:"numeric"}).toUpperCase() }, ...prev])
    setParteForm({ titulo:"", tipo:"Delito", oficial:"", rut:"" })
    setShowParteModal(false)
  }

  const MODAL_STYLE = { background: "#0a0f1c", backdropFilter: "blur(20px)", border: "1px solid rgba(251,146,60,0.25)", boxShadow: "0 0 60px rgba(251,146,60,0.1), 0 24px 64px rgba(0,0,0,0.7)" }
  const INPUT_STYLE = { background: "rgba(251,146,60,0.05)", border: "1px solid rgba(251,146,60,0.2)", color: "#f8fafc" }
  const INPUT_FOCUS = (e) => (e.target.style.borderColor = "rgba(251,146,60,0.6)")
  const INPUT_BLUR  = (e) => (e.target.style.borderColor = "rgba(251,146,60,0.2)")

  return (
    <motion.div {...slideUp} className="flex flex-col gap-0">
      {/* ── HEADER ── */}
      <div className="relative rounded-2xl p-5 mb-5 overflow-hidden" style={{ background: "linear-gradient(135deg,rgba(251,146,60,0.12) 0%,rgba(251,146,60,0.06) 100%)", border: `1px solid ${GCOLOR}28` }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 20px,rgba(251,146,60,0.3) 20px,rgba(251,146,60,0.3) 21px)" }} />
        <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-2xl shrink-0" style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${GCOLOR}30` }}>
              <img src="/assets/logo-pdi.png" alt="PDI" className="w-14 h-14 object-contain" style={{ filter: "brightness(1.1)" }} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-display text-[9px] tracking-[0.2em] px-2 py-0.5 rounded" style={{ background: `${GCOLOR}20`, color: GCOLOR }}>GEPOL</span>
                <BadgeCheck size={12} style={{ color: GCOLOR }} />
                <span className="w-2 h-2 rounded-full" style={{ background: "#22c55e", boxShadow: "0 0 8px rgba(34,197,94,0.9)" }} />
                <span className="font-body text-xs text-green-400">Sistema Activo</span>
              </div>
              <h2 className="font-display text-xl text-white tracking-widest">GESTIÓN POLICIAL — PDI ARICA</h2>
              <p className="text-slate-500 font-body text-xs mt-0.5">Control de operativos, detenidos, partes y personal en servicio.</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "Detenidos",  value: detenidos.filter(d=>d.estado==="Detenido").length, color: "#ef4444" },
              { label: "Operativos", value: operativos.filter(o=>o.estado==="Activo").length,   color: GCOLOR    },
              { label: "Partes",     value: partes.filter(p=>p.estado==="Abierto").length,       color: "#f59e0b" },
              { label: "Personal",   value: GEPOL_TURNOS.filter(t=>t.estado==="En Servicio").length, color: "#22c55e" },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-3 text-center min-w-[64px]" style={{ background: `${s.color}10`, border: `1px solid ${s.color}25` }}>
                <div className="font-display text-xl font-black" style={{ color: s.color }}>{s.value}</div>
                <div className="text-slate-600 font-body text-[10px] mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SEARCH BAR ── */}
      <div className="relative mb-4">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por nombre, RUT, placa o ID de registro…"
          className="w-full pl-11 pr-4 py-3 rounded-xl font-body text-sm text-white placeholder-slate-600 outline-none"
          style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(251,146,60,0.2)" }}
          onFocus={INPUT_FOCUS} onBlur={INPUT_BLUR}
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"><X size={14} /></button>
        )}
      </div>

      {/* ── TABS ── */}
      <div className="flex gap-1 p-1 rounded-xl mb-5" style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(251,146,60,0.1)" }}>
        {tabs.map(t => {
          const Icon = t.icon
          const active = tab === t.id
          return (
            <button key={t.id} onClick={() => setTab(t.id)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-display text-[10px] tracking-widest transition-all" style={active ? { background: `${GCOLOR}18`, color: "#fff", boxShadow: `0 0 14px ${GCOLOR}20` } : { color: "#64748b" }}>
              <Icon size={13} style={active ? { color: GCOLOR } : {}} />
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        {/* ── DASHBOARD ── */}
        {tab === "dashboard" && (
          <motion.div key="dash" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Últimos detenidos */}
              <div className="rounded-2xl p-5 border border-white/8" style={{ background: "rgba(20,12,4,0.6)" }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-xs tracking-widest text-white flex items-center gap-2"><Lock size={13} style={{ color: GCOLOR }} /> ÚLTIMOS DETENIDOS</h3>
                  <button onClick={() => setTab("detenidos")} className="font-display text-[10px] tracking-widest transition-colors hover:text-white" style={{ color: GCOLOR }}>Ver todos →</button>
                </div>
                <div className="flex flex-col gap-2">
                  {detenidos.slice(0,3).map(d => {
                    const st = estadoDetenido[d.estado] || estadoDetenido["Detenido"]
                    return (
                      <div key={d.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(0,0,0,0.3)" }}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-display text-xs" style={{ background: `${GCOLOR}18`, color: GCOLOR }}>{d.nombre.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-body text-sm truncate">{d.nombre}</p>
                          <p className="text-slate-600 font-mono text-xs">{d.rut} · {d.fecha}</p>
                        </div>
                        <span className="font-display text-[9px] tracking-widest px-2 py-1 rounded shrink-0" style={{ background: st.bg, color: st.color, border: `1px solid ${st.border}` }}>{d.estado}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
              {/* Operativos activos */}
              <div className="rounded-2xl p-5 border border-white/8" style={{ background: "rgba(20,12,4,0.6)" }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-xs tracking-widest text-white flex items-center gap-2"><Radio size={13} style={{ color: GCOLOR }} /> OPERATIVOS EN CURSO</h3>
                  <button onClick={() => setTab("operativos")} className="font-display text-[10px] tracking-widest transition-colors hover:text-white" style={{ color: GCOLOR }}>Ver todos →</button>
                </div>
                <div className="flex flex-col gap-2">
                  {operativos.filter(o=>o.estado==="Activo").slice(0,3).map(o => (
                    <div key={o.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(0,0,0,0.3)" }}>
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: "#22c55e", boxShadow: "0 0 6px rgba(34,197,94,0.9)" }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-body text-sm truncate">{o.nombre}</p>
                        <p className="text-slate-600 font-body text-xs">{o.hora} · {o.personal} efectivos</p>
                      </div>
                      <span className="font-mono text-[10px] text-slate-500">{o.id}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Personal en servicio */}
            <div className="rounded-2xl p-5 border border-white/8" style={{ background: "rgba(20,12,4,0.6)" }}>
              <h3 className="font-display text-xs tracking-widest text-white mb-4 flex items-center gap-2"><Clock size={13} style={{ color: GCOLOR }} /> PERSONAL EN SERVICIO</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {GEPOL_TURNOS.filter(t=>t.estado==="En Servicio").map((t,i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(251,146,60,0.04)", border: "1px solid rgba(251,146,60,0.12)" }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-display text-xs shrink-0" style={{ background: `${GCOLOR}20`, color: GCOLOR }}>{t.nombre.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
                    <div className="min-w-0">
                      <p className="text-white font-body text-sm truncate">{t.nombre}</p>
                      <p className="text-slate-600 font-body text-xs">{t.rango} · {t.unidad}</p>
                    </div>
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ background: "#22c55e", boxShadow: "0 0 6px rgba(34,197,94,0.9)" }} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── DETENIDOS ── */}
        {tab === "detenidos" && (
          <motion.div key="det" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="font-display text-[10px] tracking-[0.2em]" style={{ color: GCOLOR }}>REGISTRO DE DETENIDOS — {filteredDet.length} RESULTADOS</p>
              <button onClick={() => setShowDetModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl font-display text-xs tracking-widest transition-all" style={{ background: `${GCOLOR}18`, color: GCOLOR, border: `1px solid ${GCOLOR}30` }}>
                + Nuevo Registro
              </button>
            </div>
            <div className="rounded-2xl border border-white/8 overflow-hidden" style={{ background: "rgba(20,12,4,0.6)" }}>
              <div className="grid font-display text-[9px] tracking-widest text-slate-600 px-5 py-3" style={{ gridTemplateColumns: "1fr 2fr 1.5fr 2fr 1fr 1fr", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <span>ID</span><span>IMPUTADO</span><span>RUT</span><span>DELITO</span><span>TURNO</span><span>ESTADO</span>
              </div>
              {filteredDet.length === 0 && (
                <div className="flex items-center justify-center py-10 text-slate-600 font-body text-sm">Sin resultados para "{search}"</div>
              )}
              {filteredDet.map((d, i) => {
                const st = estadoDetenido[d.estado] || estadoDetenido["Detenido"]
                return (
                  <div key={d.id} onClick={() => setSelectedRow(selectedRow?.id === d.id ? null : d)} className="grid items-center px-5 py-3.5 cursor-pointer transition-all" style={{ gridTemplateColumns: "1fr 2fr 1.5fr 2fr 1fr 1fr", borderBottom: i < filteredDet.length-1 ? "1px solid rgba(255,255,255,0.04)" : "none", background: selectedRow?.id === d.id ? `${GCOLOR}08` : "transparent" }}
                    onMouseEnter={e=>(e.currentTarget.style.background=selectedRow?.id===d.id?`${GCOLOR}08`:"rgba(255,255,255,0.02)")}
                    onMouseLeave={e=>(e.currentTarget.style.background=selectedRow?.id===d.id?`${GCOLOR}08`:"transparent")}>
                    <span className="font-mono text-xs text-slate-500">{d.id}</span>
                    <div className="min-w-0 pr-2">
                      <p className="text-white font-body text-sm truncate">{d.nombre}</p>
                      <p className="text-slate-600 font-body text-xs">{d.fecha}</p>
                    </div>
                    <span className="font-mono text-xs text-slate-400">{d.rut}</span>
                    <span className="text-slate-300 font-body text-xs truncate pr-2">{d.delito}</span>
                    <span className="text-slate-500 font-body text-xs">{d.turno}</span>
                    <span className="font-display text-[9px] tracking-widest px-2 py-1 rounded w-fit" style={{ background: st.bg, color: st.color, border: `1px solid ${st.border}` }}>{d.estado}</span>
                  </div>
                )
              })}
            </div>
            {selectedRow && selectedRow.estado !== undefined && detenidos.find(d=>d.id===selectedRow.id) && (
              <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} className="rounded-2xl p-5 border" style={{ background: `${GCOLOR}07`, borderColor: `${GCOLOR}30` }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-xs tracking-widest text-white">DETALLE — {selectedRow.id}</h3>
                  <button onClick={() => setSelectedRow(null)} className="text-slate-500 hover:text-white transition-colors"><X size={16} /></button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[["Nombre completo", selectedRow.nombre],["RUT", selectedRow.rut],["Delito imputado", selectedRow.delito],["Oficial actuante", selectedRow.oficial||"—"],["Turno", selectedRow.turno],["Fecha detención", selectedRow.fecha]].map(([l,v])=>(
                    <div key={l} className="rounded-xl p-3" style={{ background: "rgba(0,0,0,0.3)" }}>
                      <p className="text-slate-600 font-body text-[10px] tracking-wider mb-0.5">{l}</p>
                      <p className="text-white font-body text-sm font-semibold">{v}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => setDetenidos(prev => prev.map(d => d.id===selectedRow.id ? {...d, estado:"Liberado"} : d))} className="px-4 py-2 rounded-xl font-display text-xs tracking-widest transition-all" style={{ background:"rgba(34,197,94,0.15)", color:"#22c55e", border:"1px solid rgba(34,197,94,0.3)" }}>Liberar</button>
                  <button onClick={() => setDetenidos(prev => prev.map(d => d.id===selectedRow.id ? {...d, estado:"Imputado"} : d))} className="px-4 py-2 rounded-xl font-display text-xs tracking-widest transition-all" style={{ background:"rgba(245,158,11,0.15)", color:"#f59e0b", border:"1px solid rgba(245,158,11,0.3)" }}>Imputar</button>
                  <button onClick={() => { setDetenidos(prev => prev.filter(d=>d.id!==selectedRow.id)); setSelectedRow(null) }} className="px-4 py-2 rounded-xl font-display text-xs tracking-widest transition-all" style={{ background:"rgba(239,68,68,0.12)", color:"#ef4444", border:"1px solid rgba(239,68,68,0.25)" }}>Eliminar</button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ── PARTES ── */}
        {tab === "partes" && (
          <motion.div key="partes" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="font-display text-[10px] tracking-[0.2em]" style={{ color: GCOLOR }}>PARTES POLICIALES — {filteredPar.length} REGISTROS</p>
              <button onClick={() => setShowParteModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl font-display text-xs tracking-widest transition-all" style={{ background: `${GCOLOR}18`, color: GCOLOR, border: `1px solid ${GCOLOR}30` }}>
                + Nuevo Parte
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {filteredPar.length === 0 && (
                <div className="flex items-center justify-center py-10 text-slate-600 font-body text-sm rounded-2xl border border-white/8" style={{ background: "rgba(20,12,4,0.6)" }}>Sin resultados para "{search}"</div>
              )}
              {filteredPar.map((p, i) => {
                const sp = estadoParte[p.estado] || estadoParte["Abierto"]
                return (
                  <div key={p.id} className="flex items-center gap-4 p-4 rounded-2xl border border-white/8" style={{ background: "rgba(20,12,4,0.6)" }}>
                    <div className="p-2.5 rounded-xl shrink-0" style={{ background: `${GCOLOR}12` }}><FileText size={16} style={{ color: GCOLOR }} /></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-white font-display text-sm tracking-wide truncate">{p.titulo}</p>
                        <span className="font-display text-[9px] tracking-widest px-2 py-0.5 rounded shrink-0" style={{ background: sp.bg, color: sp.color, border: `1px solid ${sp.border}` }}>{p.estado}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <span className="font-mono text-xs text-slate-600">{p.id}</span>
                        <span className="text-slate-600 font-body text-xs">{p.fecha}</span>
                        {p.rut !== "—" && <span className="text-slate-500 font-mono text-xs">RUT: {p.rut}</span>}
                        <span className="text-slate-600 font-body text-xs">Oficial: {p.oficial}</span>
                      </div>
                    </div>
                    <span className="font-display text-[9px] tracking-widest px-2 py-1 rounded shrink-0" style={{ background: "rgba(251,146,60,0.1)", color: "#fb923c" }}>{p.tipo}</span>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* ── OPERATIVOS ── */}
        {tab === "operativos" && (
          <motion.div key="ope" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="font-display text-[10px] tracking-[0.2em]" style={{ color: GCOLOR }}>OPERATIVOS POLICIALES — {filteredOpe.length} REGISTROS</p>
              <button onClick={() => setShowOpeModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl font-display text-xs tracking-widest transition-all" style={{ background: `${GCOLOR}18`, color: GCOLOR, border: `1px solid ${GCOLOR}30` }}>
                + Nuevo Operativo
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredOpe.length === 0 && (
                <div className="col-span-2 flex items-center justify-center py-10 text-slate-600 font-body text-sm rounded-2xl border border-white/8" style={{ background: "rgba(20,12,4,0.6)" }}>Sin resultados para "{search}"</div>
              )}
              {filteredOpe.map(o => {
                const so = estadoOpe[o.estado] || estadoOpe["Cerrado"]
                return (
                  <div key={o.id} className="rounded-2xl p-5 border border-white/8 flex flex-col gap-3" style={{ background: "rgba(20,12,4,0.6)" }}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs text-slate-600">{o.id}</span>
                          <span className="font-display text-[9px] tracking-widest px-2 py-0.5 rounded" style={{ background: so.bg, color: so.color, border: `1px solid ${so.border}` }}>{o.estado}</span>
                        </div>
                        <p className="text-white font-display text-sm tracking-wide">{o.nombre}</p>
                      </div>
                      {o.estado === "Activo" && <span className="w-2.5 h-2.5 rounded-full shrink-0 mt-1" style={{ background: "#22c55e", boxShadow: "0 0 8px rgba(34,197,94,0.9)", animation: "pulse 2s infinite" }} />}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[["Tipo", o.tipo],["Unidad", o.unidad],["Oficial", o.oficial],["Personal", `${o.personal} efectivos`]].map(([l,v])=>(
                        <div key={l} className="rounded-lg p-2.5" style={{ background:"rgba(0,0,0,0.3)" }}>
                          <p className="text-slate-600 font-body text-[10px]">{l}</p>
                          <p className="text-slate-300 font-body text-xs font-semibold mt-0.5">{v}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-2" style={{ borderTop:"1px solid rgba(255,255,255,0.05)" }}>
                      <span className="text-slate-600 font-mono text-xs">{o.hora}</span>
                      {o.estado === "Activo" && (
                        <button onClick={() => setOperativos(prev=>prev.map(op=>op.id===o.id?{...op,estado:"Cerrado",hora:new Date().toLocaleTimeString("es-CL",{hour:"2-digit",minute:"2-digit"})+" — Finalizado"}:op))} className="px-3 py-1.5 rounded-lg font-display text-[10px] tracking-widest transition-all" style={{ background:"rgba(239,68,68,0.12)", color:"#ef4444", border:"1px solid rgba(239,68,68,0.25)" }}>Cerrar Operativo</button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* ── TURNOS ── */}
        {tab === "turnos" && (
          <motion.div key="tur" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} className="flex flex-col gap-4">
            <p className="font-display text-[10px] tracking-[0.2em]" style={{ color: GCOLOR }}>CONTROL DE TURNOS — {GEPOL_TURNOS.length} EFECTIVOS</p>
            <div className="flex flex-col gap-3">
              {GEPOL_TURNOS.map((t, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border" style={{ background: "rgba(20,12,4,0.6)", borderColor: t.estado==="En Servicio"?"rgba(251,146,60,0.15)":"rgba(255,255,255,0.06)" }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center font-display text-xs shrink-0" style={{ background: t.estado==="En Servicio"?`${GCOLOR}20`:"rgba(100,116,139,0.15)", color: t.estado==="En Servicio"?GCOLOR:"#94a3b8", border:`1px solid ${t.estado==="En Servicio"?GCOLOR+"30":"rgba(100,116,139,0.2)"}` }}>{t.nombre.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-body text-sm font-semibold">{t.nombre}</p>
                    <p className="text-slate-600 font-body text-xs">{t.rango} · {t.unidad}</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-slate-400 font-body text-xs">Turno {t.turno}</p>
                    <p className="text-slate-600 font-mono text-xs">Desde {t.desde}</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: t.estado==="En Servicio"?"rgba(34,197,94,0.12)":"rgba(100,116,139,0.12)", border:`1px solid ${t.estado==="En Servicio"?"rgba(34,197,94,0.3)":"rgba(100,116,139,0.2)"}` }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: t.estado==="En Servicio"?"#22c55e":"#64748b", boxShadow: t.estado==="En Servicio"?"0 0 6px rgba(34,197,94,0.9)":"none" }} />
                    <span className="font-display text-[9px] tracking-widest" style={{ color: t.estado==="En Servicio"?"#22c55e":"#94a3b8" }}>{t.estado}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MODAL: NUEVO DETENIDO ── */}
      <AnimatePresence>
        {showDetModal && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background:"rgba(0,0,0,0.8)", backdropFilter:"blur(6px)" }} onClick={()=>setShowDetModal(false)}>
            <motion.div initial={{scale:0.92,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.92,opacity:0}} onClick={e=>e.stopPropagation()} className="w-full max-w-md rounded-2xl p-6 flex flex-col gap-4" style={MODAL_STYLE}>
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm tracking-widest text-white flex items-center gap-2"><Lock size={14} style={{color:GCOLOR}} /> REGISTRAR DETENIDO</h3>
                <button onClick={()=>setShowDetModal(false)} className="text-slate-500 hover:text-white transition-colors"><X size={16}/></button>
              </div>
              {[["Nombre completo","nombre","text","Ej: Juan Pérez Soto"],["RUT","rut","text","Ej: 18.432.210-K"],["Delito imputado","delito","text","Ej: Robo con violencia"],["Oficial actuante","oficial","text","Ej: Sgto. Morales"]].map(([label,field,type,placeholder])=>(
                <div key={field}>
                  <label className="font-display text-[9px] tracking-widest text-slate-500 mb-1.5 block">{label.toUpperCase()}</label>
                  <input type={type} placeholder={placeholder} value={detForm[field]} onChange={e=>setDetForm({...detForm,[field]:e.target.value})} className="w-full px-4 py-2.5 rounded-xl font-body text-sm outline-none" style={INPUT_STYLE} onFocus={INPUT_FOCUS} onBlur={INPUT_BLUR}/>
                </div>
              ))}
              <div>
                <label className="font-display text-[9px] tracking-widest text-slate-500 mb-1.5 block">TURNO</label>
                <select value={detForm.turno} onChange={e=>setDetForm({...detForm,turno:e.target.value})} className="w-full px-4 py-2.5 rounded-xl font-body text-sm outline-none appearance-none" style={INPUT_STYLE}>
                  {["Mañana","Tarde","Nocturno"].map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="flex gap-3 justify-end mt-1">
                <button onClick={()=>setShowDetModal(false)} className="px-5 py-2.5 rounded-xl font-display text-xs tracking-widest text-slate-400 hover:text-white transition-colors">Cancelar</button>
                <button onClick={addDetenido} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-display text-xs tracking-widest transition-all" style={{background:`${GCOLOR}20`,color:GCOLOR,border:`1px solid ${GCOLOR}40`}}><Check size={13}/> Registrar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MODAL: NUEVO OPERATIVO ── */}
      <AnimatePresence>
        {showOpeModal && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background:"rgba(0,0,0,0.8)", backdropFilter:"blur(6px)" }} onClick={()=>setShowOpeModal(false)}>
            <motion.div initial={{scale:0.92,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.92,opacity:0}} onClick={e=>e.stopPropagation()} className="w-full max-w-md rounded-2xl p-6 flex flex-col gap-4" style={MODAL_STYLE}>
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm tracking-widest text-white flex items-center gap-2"><Radio size={14} style={{color:GCOLOR}}/> NUEVO OPERATIVO</h3>
                <button onClick={()=>setShowOpeModal(false)} className="text-slate-500 hover:text-white transition-colors"><X size={16}/></button>
              </div>
              <div>
                <label className="font-display text-[9px] tracking-widest text-slate-500 mb-1.5 block">NOMBRE DEL OPERATIVO</label>
                <input type="text" placeholder="Ej: Operativo Sector Norte" value={opeForm.nombre} onChange={e=>setOpeForm({...opeForm,nombre:e.target.value})} className="w-full px-4 py-2.5 rounded-xl font-body text-sm outline-none" style={INPUT_STYLE} onFocus={INPUT_FOCUS} onBlur={INPUT_BLUR}/>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-display text-[9px] tracking-widest text-slate-500 mb-1.5 block">TIPO</label>
                  <select value={opeForm.tipo} onChange={e=>setOpeForm({...opeForm,tipo:e.target.value})} className="w-full px-4 py-2.5 rounded-xl font-body text-sm outline-none appearance-none" style={INPUT_STYLE}>
                    {["Patrullaje","Control","Allanamiento","Emergencia","Investigación"].map(t=><option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-display text-[9px] tracking-widest text-slate-500 mb-1.5 block">PERSONAL</label>
                  <input type="number" placeholder="Nº efectivos" value={opeForm.personal} onChange={e=>setOpeForm({...opeForm,personal:e.target.value})} className="w-full px-4 py-2.5 rounded-xl font-body text-sm outline-none" style={INPUT_STYLE} onFocus={INPUT_FOCUS} onBlur={INPUT_BLUR}/>
                </div>
              </div>
              <div>
                <label className="font-display text-[9px] tracking-widest text-slate-500 mb-1.5 block">OFICIAL A CARGO</label>
                <input type="text" placeholder="Ej: Cap. Rojas" value={opeForm.oficial} onChange={e=>setOpeForm({...opeForm,oficial:e.target.value})} className="w-full px-4 py-2.5 rounded-xl font-body text-sm outline-none" style={INPUT_STYLE} onFocus={INPUT_FOCUS} onBlur={INPUT_BLUR}/>
              </div>
              <div className="flex gap-3 justify-end mt-1">
                <button onClick={()=>setShowOpeModal(false)} className="px-5 py-2.5 rounded-xl font-display text-xs tracking-widest text-slate-400 hover:text-white transition-colors">Cancelar</button>
                <button onClick={addOperativo} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-display text-xs tracking-widest transition-all" style={{background:`${GCOLOR}20`,color:GCOLOR,border:`1px solid ${GCOLOR}40`}}><Check size={13}/> Crear Operativo</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MODAL: NUEVO PARTE ── */}
      <AnimatePresence>
        {showParteModal && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background:"rgba(0,0,0,0.8)", backdropFilter:"blur(6px)" }} onClick={()=>setShowParteModal(false)}>
            <motion.div initial={{scale:0.92,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.92,opacity:0}} onClick={e=>e.stopPropagation()} className="w-full max-w-md rounded-2xl p-6 flex flex-col gap-4" style={MODAL_STYLE}>
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm tracking-widest text-white flex items-center gap-2"><FileText size={14} style={{color:GCOLOR}}/> NUEVO PARTE POLICIAL</h3>
                <button onClick={()=>setShowParteModal(false)} className="text-slate-500 hover:text-white transition-colors"><X size={16}/></button>
              </div>
              <div>
                <label className="font-display text-[9px] tracking-widest text-slate-500 mb-1.5 block">DESCRIPCIÓN DEL PARTE</label>
                <input type="text" placeholder="Ej: Robo con fuerza en Local Comercial" value={parteForm.titulo} onChange={e=>setParteForm({...parteForm,titulo:e.target.value})} className="w-full px-4 py-2.5 rounded-xl font-body text-sm outline-none" style={INPUT_STYLE} onFocus={INPUT_FOCUS} onBlur={INPUT_BLUR}/>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-display text-[9px] tracking-widest text-slate-500 mb-1.5 block">TIPO</label>
                  <select value={parteForm.tipo} onChange={e=>setParteForm({...parteForm,tipo:e.target.value})} className="w-full px-4 py-2.5 rounded-xl font-body text-sm outline-none appearance-none" style={INPUT_STYLE}>
                    {["Delito","Accidente","Denuncia","Informe","Citación"].map(t=><option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-display text-[9px] tracking-widest text-slate-500 mb-1.5 block">RUT IMPUTADO</label>
                  <input type="text" placeholder="— (si aplica)" value={parteForm.rut} onChange={e=>setParteForm({...parteForm,rut:e.target.value})} className="w-full px-4 py-2.5 rounded-xl font-body text-sm outline-none" style={INPUT_STYLE} onFocus={INPUT_FOCUS} onBlur={INPUT_BLUR}/>
                </div>
              </div>
              <div>
                <label className="font-display text-[9px] tracking-widest text-slate-500 mb-1.5 block">OFICIAL REDACTOR</label>
                <input type="text" placeholder="Ej: Sgto. Morales" value={parteForm.oficial} onChange={e=>setParteForm({...parteForm,oficial:e.target.value})} className="w-full px-4 py-2.5 rounded-xl font-body text-sm outline-none" style={INPUT_STYLE} onFocus={INPUT_FOCUS} onBlur={INPUT_BLUR}/>
              </div>
              <div className="flex gap-3 justify-end mt-1">
                <button onClick={()=>setShowParteModal(false)} className="px-5 py-2.5 rounded-xl font-display text-xs tracking-widest text-slate-400 hover:text-white transition-colors">Cancelar</button>
                <button onClick={addParte} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-display text-xs tracking-widest transition-all" style={{background:`${GCOLOR}20`,color:GCOLOR,border:`1px solid ${GCOLOR}40`}}><Check size={13}/> Crear Parte</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const AUPOL_COLOR = "#22c55e"
const AUPOL_PROCEDIMIENTOS_INIT = [
  { id: "PRO-001", nombre: "Carlos Andrés Muñoz Vera",   rut: "17.882.310-K", cargo: "Infracción de Tránsito",   estado: "Cerrado",   fecha: "17 ABR 2026", oficial: "Cap. Ramírez" },
  { id: "PRO-002", nombre: "Sofía Isabel Reyes Cáceres", rut: "21.043.557-8", cargo: "Alteración Orden Público", estado: "Activo",    fecha: "18 ABR 2026", oficial: "Sgto. Flores" },
  { id: "PRO-003", nombre: "Matías Rodríguez Poblete",   rut: "19.765.002-3", cargo: "Conducción en Estado de Ebriedad", estado: "Derivado", fecha: "16 ABR 2026", oficial: "Ten. Naranjo" },
]
const AUPOL_PATRULLAJES_INIT = [
  { id: "PAT-001", sector: "Sector Norte — Av. Diego Portales", unidad: "Radio Patrulla 12", estado: "Activo",   hora: "06:00 — En curso",    personal: 2 },
  { id: "PAT-002", sector: "Centro Histórico Arica",            unidad: "Radio Patrulla 7",  estado: "Activo",   hora: "08:00 — En curso",    personal: 3 },
  { id: "PAT-003", sector: "Población Los Industriales",        unidad: "Radio Patrulla 3",  estado: "Cerrado",  hora: "22:00 — Finalizado",  personal: 2 },
]
const AUPOL_INFRACCIONES_INIT = [
  { id: "INF-001", desc: "Exceso de velocidad — Av. Comandante San Martín", rut: "18.432.210-K", monto: 42000, estado: "Pendiente", fecha: "18 ABR 2026" },
  { id: "INF-002", desc: "Estacionamiento en zona prohibida",                rut: "20.115.887-3", monto: 15000, estado: "Pagada",   fecha: "17 ABR 2026" },
  { id: "INF-003", desc: "No uso de cinturón de seguridad",                  rut: "22.304.551-7", monto: 18000, estado: "Pendiente", fecha: "16 ABR 2026" },
]

function AupolSection() {
  const ACOLOR = AUPOL_COLOR
  const [tab, setTab]                       = useState("dashboard")
  const [search, setSearch]                 = useState("")
  const [procedimientos, setProcedimientos] = useState(AUPOL_PROCEDIMIENTOS_INIT)
  const [patrullajes, setPatrullajes]       = useState(AUPOL_PATRULLAJES_INIT)
  const [infracciones, setInfracciones]     = useState(AUPOL_INFRACCIONES_INIT)
  const [showProcModal, setShowProcModal]   = useState(false)
  const [showPatModal, setShowPatModal]     = useState(false)
  const [showInfModal, setShowInfModal]     = useState(false)
  const [procForm, setProcForm]   = useState({ nombre:"", rut:"", cargo:"", oficial:"" })
  const [patForm, setPatForm]     = useState({ sector:"", unidad:"", personal:"" })
  const [infForm, setInfForm]     = useState({ desc:"", rut:"", monto:"" })
  const [selectedRow, setSelectedRow] = useState(null)

  const filteredProc = procedimientos.filter(p =>
    p.nombre.toLowerCase().includes(search.toLowerCase()) ||
    p.rut.includes(search) || p.id.toLowerCase().includes(search.toLowerCase())
  )
  const filteredPat = patrullajes.filter(p =>
    p.sector.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase())
  )
  const filteredInf = infracciones.filter(i =>
    i.desc.toLowerCase().includes(search.toLowerCase()) || i.rut.includes(search) || i.id.toLowerCase().includes(search.toLowerCase())
  )

  const tabs = [
    { id: "dashboard",     label: "Dashboard",     icon: BarChart3 },
    { id: "procedimientos",label: "Procedimientos", icon: FileText  },
    { id: "patrullajes",   label: "Patrullajes",   icon: Radio     },
    { id: "infracciones",  label: "Infracciones",  icon: AlertTriangle },
    { id: "turnos",        label: "Turnos",         icon: Clock     },
  ]

  const estadoProc = {
    "Activo":   { bg:"rgba(34,197,94,0.12)",  color:"#22c55e", border:"rgba(34,197,94,0.3)"  },
    "Cerrado":  { bg:"rgba(100,116,139,0.15)",color:"#94a3b8", border:"rgba(100,116,139,0.3)"},
    "Derivado": { bg:"rgba(245,158,11,0.12)", color:"#f59e0b", border:"rgba(245,158,11,0.3)" },
  }
  const estadoPat = {
    "Activo":  { bg:"rgba(34,197,94,0.12)",  color:"#22c55e", border:"rgba(34,197,94,0.3)"  },
    "Cerrado": { bg:"rgba(100,116,139,0.15)",color:"#94a3b8", border:"rgba(100,116,139,0.3)"},
  }
  const estadoInf = {
    "Pendiente": { bg:"rgba(239,68,68,0.12)", color:"#ef4444", border:"rgba(239,68,68,0.3)"  },
    "Pagada":    { bg:"rgba(34,197,94,0.12)", color:"#22c55e", border:"rgba(34,197,94,0.3)"  },
  }

  function addProcedimiento() {
    if (!procForm.nombre || !procForm.rut) return
    const nid = `PRO-${String(procedimientos.length+1).padStart(3,"0")}`
    setProcedimientos(prev => [{ id:nid, ...procForm, estado:"Activo", fecha: new Date().toLocaleDateString("es-CL",{day:"2-digit",month:"short",year:"numeric"}).toUpperCase() }, ...prev])
    setProcForm({ nombre:"", rut:"", cargo:"", oficial:"" })
    setShowProcModal(false)
  }
  function addPatrullaje() {
    if (!patForm.sector) return
    const nid = `PAT-${String(patrullajes.length+1).padStart(3,"0")}`
    setPatrullajes(prev => [{ id:nid, ...patForm, estado:"Activo", hora: new Date().toLocaleTimeString("es-CL",{hour:"2-digit",minute:"2-digit"}) + " — En curso" }, ...prev])
    setPatForm({ sector:"", unidad:"", personal:"" })
    setShowPatModal(false)
  }
  function addInfraccion() {
    if (!infForm.desc || !infForm.rut) return
    const nid = `INF-${String(infracciones.length+1).padStart(3,"0")}`
    setInfracciones(prev => [{ id:nid, ...infForm, monto: parseInt(infForm.monto)||0, estado:"Pendiente", fecha: new Date().toLocaleDateString("es-CL",{day:"2-digit",month:"short",year:"numeric"}).toUpperCase() }, ...prev])
    setInfForm({ desc:"", rut:"", monto:"" })
    setShowInfModal(false)
  }

  const MODAL_STYLE = { background:"#0a0f1c", backdropFilter:"blur(20px)", border:"1px solid rgba(34,197,94,0.25)", boxShadow:"0 0 60px rgba(34,197,94,0.1), 0 24px 64px rgba(0,0,0,0.7)" }
  const INPUT_STYLE = { background:"rgba(34,197,94,0.05)", border:"1px solid rgba(34,197,94,0.2)", color:"#f8fafc" }
  const INPUT_FOCUS = (e) => (e.target.style.borderColor = "rgba(34,197,94,0.6)")
  const INPUT_BLUR  = (e) => (e.target.style.borderColor = "rgba(34,197,94,0.2)")

  const TURNOS_CAR = [
    { nombre:"Cap. Ramírez",  rango:"Capitán",   turno:"Mañana",   estado:"En Servicio", unidad:"Comando Central", desde:"06:00" },
    { nombre:"Sgto. Flores",  rango:"Sargento",  turno:"Tarde",    estado:"En Servicio", unidad:"Radio Patrulla",  desde:"14:00" },
    { nombre:"Ten. Naranjo",  rango:"Teniente",  turno:"Nocturno", estado:"En Servicio", unidad:"Operaciones",     desde:"22:00" },
    { nombre:"Cbto. Araya",   rango:"Carabinero",turno:"Mañana",   estado:"Descanso",    unidad:"Patrulla Norte",  desde:"06:00" },
    { nombre:"Cbto. Segura",  rango:"Carabinero",turno:"Tarde",    estado:"En Servicio", unidad:"Patrulla Centro", desde:"14:00" },
  ]

  return (
    <motion.div {...slideUp} className="flex flex-col gap-0">
      {/* HEADER */}
      <div className="relative rounded-2xl p-5 mb-5 overflow-hidden" style={{ background:"linear-gradient(135deg,rgba(34,197,94,0.12) 0%,rgba(22,163,74,0.06) 100%)", border:`1px solid ${ACOLOR}28` }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 20px,rgba(34,197,94,0.3) 20px,rgba(34,197,94,0.3) 21px)" }} />
        <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-2xl shrink-0" style={{ background:"rgba(255,255,255,0.05)", border:`1px solid ${ACOLOR}30` }}>
              <img src="/assets/logo-carabineros.png" alt="Carabineros" className="w-14 h-14 object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-display text-[9px] tracking-[0.2em] px-2 py-0.5 rounded" style={{ background:`${ACOLOR}20`, color:ACOLOR }}>AUPOL</span>
                <BadgeCheck size={12} style={{ color:ACOLOR }} />
                <span className="w-2 h-2 rounded-full" style={{ background:"#22c55e", boxShadow:"0 0 8px rgba(34,197,94,0.9)" }} />
                <span className="font-body text-xs text-green-400">Sistema Activo</span>
              </div>
              <h2 className="font-display text-xl text-white tracking-widest">CARABINEROS DE CHILE — ARICA</h2>
              <p className="text-slate-500 font-body text-xs mt-0.5">Archivo Único Policial — Procedimientos, patrullajes e infracciones de tránsito.</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label:"Procedimientos", value: procedimientos.filter(p=>p.estado==="Activo").length, color:"#22c55e" },
              { label:"Patrullajes",    value: patrullajes.filter(p=>p.estado==="Activo").length,    color:ACOLOR    },
              { label:"Infracciones",  value: infracciones.filter(i=>i.estado==="Pendiente").length, color:"#f59e0b" },
              { label:"Personal",      value: TURNOS_CAR.filter(t=>t.estado==="En Servicio").length, color:"#22c55e" },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-3 text-center min-w-[64px]" style={{ background:`${s.color}10`, border:`1px solid ${s.color}25` }}>
                <div className="font-display text-xl font-black" style={{ color:s.color }}>{s.value}</div>
                <div className="text-slate-600 font-body text-[10px] mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div className="relative mb-4">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
        <input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar por nombre, RUT o ID de registro…" className="w-full pl-11 pr-4 py-3 rounded-xl font-body text-sm text-white placeholder-slate-600 outline-none" style={{ background:"rgba(0,0,0,0.4)", border:"1px solid rgba(34,197,94,0.2)" }} onFocus={e=>(e.target.style.borderColor="rgba(34,197,94,0.6)")} onBlur={e=>(e.target.style.borderColor="rgba(34,197,94,0.2)")} />
        {search && <button onClick={()=>setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"><X size={14}/></button>}
      </div>

      {/* TABS */}
      <div className="flex gap-1 p-1 rounded-xl mb-5" style={{ background:"rgba(0,0,0,0.35)", border:"1px solid rgba(34,197,94,0.1)" }}>
        {tabs.map(t => {
          const Icon = t.icon
          const active = tab === t.id
          return (
            <button key={t.id} onClick={()=>setTab(t.id)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-display text-[10px] tracking-widest transition-all" style={active?{background:`${ACOLOR}18`,color:"#fff",boxShadow:`0 0 14px ${ACOLOR}20`}:{color:"#64748b"}}>
              <Icon size={13} style={active?{color:ACOLOR}:{}} />
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        {/* DASHBOARD */}
        {tab === "dashboard" && (
          <motion.div key="dash" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl p-5 border border-white/8" style={{ background:"rgba(20,12,4,0.6)" }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-xs tracking-widest text-white flex items-center gap-2"><FileText size={13} style={{color:ACOLOR}}/> ÚLTIMOS PROCEDIMIENTOS</h3>
                  <button onClick={()=>setTab("procedimientos")} className="font-display text-[10px] tracking-widest transition-colors hover:text-white" style={{color:ACOLOR}}>Ver todos →</button>
                </div>
                <div className="flex flex-col gap-2">
                  {procedimientos.slice(0,3).map(p => {
                    const st = estadoProc[p.estado] || estadoProc["Cerrado"]
                    return (
                      <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl" style={{background:"rgba(0,0,0,0.3)"}}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-display text-xs" style={{background:`${ACOLOR}18`,color:ACOLOR}}>{p.nombre.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-body text-sm truncate">{p.nombre}</p>
                          <p className="text-slate-600 font-mono text-xs">{p.rut} · {p.fecha}</p>
                        </div>
                        <span className="font-display text-[9px] tracking-widest px-2 py-1 rounded shrink-0" style={{background:st.bg,color:st.color,border:`1px solid ${st.border}`}}>{p.estado}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="rounded-2xl p-5 border border-white/8" style={{ background:"rgba(20,12,4,0.6)" }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-xs tracking-widest text-white flex items-center gap-2"><Radio size={13} style={{color:ACOLOR}}/> PATRULLAJES ACTIVOS</h3>
                  <button onClick={()=>setTab("patrullajes")} className="font-display text-[10px] tracking-widest transition-colors hover:text-white" style={{color:ACOLOR}}>Ver todos →</button>
                </div>
                <div className="flex flex-col gap-2">
                  {patrullajes.filter(p=>p.estado==="Activo").slice(0,3).map(p => (
                    <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl" style={{background:"rgba(0,0,0,0.3)"}}>
                      <div className="w-2 h-2 rounded-full shrink-0" style={{background:"#22c55e",boxShadow:"0 0 6px rgba(34,197,94,0.9)"}} />
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-body text-sm truncate">{p.sector}</p>
                        <p className="text-slate-600 font-body text-xs">{p.hora} · {p.personal} efectivos</p>
                      </div>
                      <span className="font-mono text-[10px] text-slate-500">{p.id}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="rounded-2xl p-5 border border-white/8" style={{ background:"rgba(20,12,4,0.6)" }}>
              <h3 className="font-display text-xs tracking-widest text-white mb-4 flex items-center gap-2"><Clock size={13} style={{color:ACOLOR}}/> PERSONAL EN SERVICIO</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {TURNOS_CAR.filter(t=>t.estado==="En Servicio").map((t,i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{background:"rgba(34,197,94,0.04)",border:"1px solid rgba(34,197,94,0.12)"}}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-display text-xs shrink-0" style={{background:`${ACOLOR}20`,color:ACOLOR}}>{t.nombre.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
                    <div className="min-w-0">
                      <p className="text-white font-body text-sm truncate">{t.nombre}</p>
                      <p className="text-slate-600 font-body text-xs">{t.rango} · {t.unidad}</p>
                    </div>
                    <div className="w-2 h-2 rounded-full shrink-0" style={{background:"#22c55e",boxShadow:"0 0 6px rgba(34,197,94,0.9)"}} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* PROCEDIMIENTOS */}
        {tab === "procedimientos" && (
          <motion.div key="proc" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="font-display text-[10px] tracking-[0.2em]" style={{color:ACOLOR}}>PROCEDIMIENTOS POLICIALES — {filteredProc.length} REGISTROS</p>
              <button onClick={()=>setShowProcModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl font-display text-xs tracking-widest transition-all" style={{background:`${ACOLOR}18`,color:ACOLOR,border:`1px solid ${ACOLOR}30`}}>+ Nuevo Procedimiento</button>
            </div>
            <div className="rounded-2xl border border-white/8 overflow-hidden" style={{background:"rgba(20,12,4,0.6)"}}>
              <div className="grid font-display text-[9px] tracking-widest text-slate-600 px-5 py-3" style={{gridTemplateColumns:"1fr 2fr 1.5fr 2fr 1fr 1fr",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
                <span>ID</span><span>IMPUTADO</span><span>RUT</span><span>CARGO</span><span>OFICIAL</span><span>ESTADO</span>
              </div>
              {filteredProc.length === 0 && <div className="flex items-center justify-center py-10 text-slate-600 font-body text-sm">Sin resultados para "{search}"</div>}
              {filteredProc.map((p,i) => {
                const st = estadoProc[p.estado] || estadoProc["Cerrado"]
                return (
                  <div key={p.id} onClick={()=>setSelectedRow(selectedRow?.id===p.id?null:p)} className="grid items-center px-5 py-3.5 cursor-pointer transition-all" style={{gridTemplateColumns:"1fr 2fr 1.5fr 2fr 1fr 1fr",borderBottom:i<filteredProc.length-1?"1px solid rgba(255,255,255,0.04)":"none",background:selectedRow?.id===p.id?`${ACOLOR}08`:"transparent"}}
                    onMouseEnter={e=>(e.currentTarget.style.background=selectedRow?.id===p.id?`${ACOLOR}08`:"rgba(255,255,255,0.02)")}
                    onMouseLeave={e=>(e.currentTarget.style.background=selectedRow?.id===p.id?`${ACOLOR}08`:"transparent")}>
                    <span className="font-mono text-xs text-slate-500">{p.id}</span>
                    <div className="min-w-0 pr-2"><p className="text-white font-body text-sm truncate">{p.nombre}</p><p className="text-slate-600 font-body text-xs">{p.fecha}</p></div>
                    <span className="font-mono text-xs text-slate-400">{p.rut}</span>
                    <span className="text-slate-300 font-body text-xs truncate pr-2">{p.cargo}</span>
                    <span className="text-slate-500 font-body text-xs truncate">{p.oficial}</span>
                    <span className="font-display text-[9px] tracking-widest px-2 py-1 rounded w-fit" style={{background:st.bg,color:st.color,border:`1px solid ${st.border}`}}>{p.estado}</span>
                  </div>
                )
              })}
            </div>
            {selectedRow && procedimientos.find(p=>p.id===selectedRow.id) && (
              <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="rounded-2xl p-5 border" style={{background:`${ACOLOR}07`,borderColor:`${ACOLOR}30`}}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-xs tracking-widest text-white">DETALLE — {selectedRow.id}</h3>
                  <button onClick={()=>setSelectedRow(null)} className="text-slate-500 hover:text-white transition-colors"><X size={16}/></button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[["Nombre completo",selectedRow.nombre],["RUT",selectedRow.rut],["Cargo imputado",selectedRow.cargo],["Oficial actuante",selectedRow.oficial||"—"],["Fecha",selectedRow.fecha],["Estado",selectedRow.estado]].map(([l,v])=>(
                    <div key={l} className="rounded-xl p-3" style={{background:"rgba(0,0,0,0.3)"}}><p className="text-slate-600 font-body text-[10px] tracking-wider mb-0.5">{l}</p><p className="text-white font-body text-sm font-semibold">{v}</p></div>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={()=>setProcedimientos(prev=>prev.map(p=>p.id===selectedRow.id?{...p,estado:"Cerrado"}:p))} className="px-4 py-2 rounded-xl font-display text-xs tracking-widest transition-all" style={{background:"rgba(34,197,94,0.15)",color:"#22c55e",border:"1px solid rgba(34,197,94,0.3)"}}>Cerrar</button>
                  <button onClick={()=>setProcedimientos(prev=>prev.map(p=>p.id===selectedRow.id?{...p,estado:"Derivado"}:p))} className="px-4 py-2 rounded-xl font-display text-xs tracking-widest transition-all" style={{background:"rgba(245,158,11,0.15)",color:"#f59e0b",border:"1px solid rgba(245,158,11,0.3)"}}>Derivar</button>
                  <button onClick={()=>{setProcedimientos(prev=>prev.filter(p=>p.id!==selectedRow.id));setSelectedRow(null)}} className="px-4 py-2 rounded-xl font-display text-xs tracking-widest transition-all" style={{background:"rgba(239,68,68,0.12)",color:"#ef4444",border:"1px solid rgba(239,68,68,0.25)"}}>Eliminar</button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* PATRULLAJES */}
        {tab === "patrullajes" && (
          <motion.div key="pat" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="font-display text-[10px] tracking-[0.2em]" style={{color:ACOLOR}}>PATRULLAJES — {filteredPat.length} REGISTROS</p>
              <button onClick={()=>setShowPatModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl font-display text-xs tracking-widest transition-all" style={{background:`${ACOLOR}18`,color:ACOLOR,border:`1px solid ${ACOLOR}30`}}>+ Nuevo Patrullaje</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPat.length===0 && <div className="col-span-2 flex items-center justify-center py-10 text-slate-600 font-body text-sm rounded-2xl border border-white/8" style={{background:"rgba(20,12,4,0.6)"}}>Sin resultados para "{search}"</div>}
              {filteredPat.map(p => {
                const sp = estadoPat[p.estado] || estadoPat["Cerrado"]
                return (
                  <div key={p.id} className="rounded-2xl p-5 border border-white/8 flex flex-col gap-3" style={{background:"rgba(20,12,4,0.6)"}}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs text-slate-600">{p.id}</span>
                          <span className="font-display text-[9px] tracking-widest px-2 py-0.5 rounded" style={{background:sp.bg,color:sp.color,border:`1px solid ${sp.border}`}}>{p.estado}</span>
                        </div>
                        <p className="text-white font-display text-sm tracking-wide">{p.sector}</p>
                      </div>
                      {p.estado==="Activo" && <span className="w-2.5 h-2.5 rounded-full shrink-0 mt-1" style={{background:"#22c55e",boxShadow:"0 0 8px rgba(34,197,94,0.9)"}} />}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[["Unidad",p.unidad],["Personal",`${p.personal} efectivos`]].map(([l,v])=>(
                        <div key={l} className="rounded-lg p-2.5" style={{background:"rgba(0,0,0,0.3)"}}><p className="text-slate-600 font-body text-[10px]">{l}</p><p className="text-slate-300 font-body text-xs font-semibold mt-0.5">{v}</p></div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-2" style={{borderTop:"1px solid rgba(255,255,255,0.05)"}}>
                      <span className="text-slate-600 font-mono text-xs">{p.hora}</span>
                      {p.estado==="Activo" && <button onClick={()=>setPatrullajes(prev=>prev.map(pa=>pa.id===p.id?{...pa,estado:"Cerrado",hora:new Date().toLocaleTimeString("es-CL",{hour:"2-digit",minute:"2-digit"})+" — Finalizado"}:pa))} className="px-3 py-1.5 rounded-lg font-display text-[10px] tracking-widest transition-all" style={{background:"rgba(239,68,68,0.12)",color:"#ef4444",border:"1px solid rgba(239,68,68,0.25)"}}>Finalizar</button>}
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* INFRACCIONES */}
        {tab === "infracciones" && (
          <motion.div key="inf" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="font-display text-[10px] tracking-[0.2em]" style={{color:ACOLOR}}>INFRACCIONES DE TRÁNSITO — {filteredInf.length} REGISTROS</p>
              <button onClick={()=>setShowInfModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl font-display text-xs tracking-widest transition-all" style={{background:`${ACOLOR}18`,color:ACOLOR,border:`1px solid ${ACOLOR}30`}}>+ Nueva Infracción</button>
            </div>
            <div className="flex flex-col gap-3">
              {filteredInf.length===0 && <div className="flex items-center justify-center py-10 text-slate-600 font-body text-sm rounded-2xl border border-white/8" style={{background:"rgba(20,12,4,0.6)"}}>Sin resultados para "{search}"</div>}
              {filteredInf.map((inf,i) => {
                const si = estadoInf[inf.estado] || estadoInf["Pendiente"]
                return (
                  <div key={inf.id} className="flex items-center gap-4 p-4 rounded-2xl border border-white/8" style={{background:"rgba(20,12,4,0.6)"}}>
                    <div className="p-2.5 rounded-xl shrink-0" style={{background:`${ACOLOR}12`}}><AlertTriangle size={16} style={{color:ACOLOR}} /></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap"><p className="text-white font-display text-sm tracking-wide truncate">{inf.desc}</p><span className="font-display text-[9px] tracking-widest px-2 py-0.5 rounded shrink-0" style={{background:si.bg,color:si.color,border:`1px solid ${si.border}`}}>{inf.estado}</span></div>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <span className="font-mono text-xs text-slate-600">{inf.id}</span>
                        <span className="text-slate-600 font-body text-xs">{inf.fecha}</span>
                        <span className="text-slate-500 font-mono text-xs">RUT: {inf.rut}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-display text-sm font-bold" style={{color:inf.estado==="Pagada"?"#22c55e":"#ef4444"}}>${(inf.monto||0).toLocaleString("es-CL")}</div>
                      {inf.estado==="Pendiente" && <button onClick={()=>setInfracciones(prev=>prev.map(x=>x.id===inf.id?{...x,estado:"Pagada"}:x))} className="mt-1 px-2 py-1 rounded-lg font-display text-[9px] tracking-widest transition-all" style={{background:"rgba(34,197,94,0.15)",color:"#22c55e",border:"1px solid rgba(34,197,94,0.3)"}}>Pagar</button>}
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* TURNOS */}
        {tab === "turnos" && (
          <motion.div key="turn" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="flex flex-col gap-4">
            <p className="font-display text-[10px] tracking-[0.2em]" style={{color:ACOLOR}}>CONTROL DE TURNOS — {TURNOS_CAR.length} EFECTIVOS</p>
            <div className="flex flex-col gap-3">
              {TURNOS_CAR.map((t,i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border" style={{background:"rgba(20,12,4,0.6)",borderColor:t.estado==="En Servicio"?"rgba(34,197,94,0.15)":"rgba(255,255,255,0.06)"}}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center font-display text-xs shrink-0" style={{background:t.estado==="En Servicio"?`${ACOLOR}20`:"rgba(100,116,139,0.15)",color:t.estado==="En Servicio"?ACOLOR:"#94a3b8",border:`1px solid ${t.estado==="En Servicio"?ACOLOR+"30":"rgba(100,116,139,0.2)"}`}}>{t.nombre.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
                  <div className="flex-1 min-w-0"><p className="text-white font-body text-sm font-semibold">{t.nombre}</p><p className="text-slate-600 font-body text-xs">{t.rango} · {t.unidad}</p></div>
                  <div className="text-right hidden sm:block"><p className="text-slate-400 font-body text-xs">Turno {t.turno}</p><p className="text-slate-600 font-mono text-xs">Desde {t.desde}</p></div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{background:t.estado==="En Servicio"?"rgba(34,197,94,0.12)":"rgba(100,116,139,0.12)",border:`1px solid ${t.estado==="En Servicio"?"rgba(34,197,94,0.3)":"rgba(100,116,139,0.2)"}`}}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{background:t.estado==="En Servicio"?"#22c55e":"#64748b",boxShadow:t.estado==="En Servicio"?"0 0 6px rgba(34,197,94,0.9)":"none"}} />
                    <span className="font-display text-[9px] tracking-widest" style={{color:t.estado==="En Servicio"?"#22c55e":"#94a3b8"}}>{t.estado}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL PROCEDIMIENTO */}
      <AnimatePresence>
        {showProcModal && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:"rgba(0,0,0,0.8)",backdropFilter:"blur(6px)"}} onClick={()=>setShowProcModal(false)}>
            <motion.div initial={{scale:0.92,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.92,opacity:0}} onClick={e=>e.stopPropagation()} className="w-full max-w-md rounded-2xl p-6 flex flex-col gap-4" style={MODAL_STYLE}>
              <div className="flex items-center justify-between"><h3 className="font-display text-sm tracking-widest text-white flex items-center gap-2"><FileText size={14} style={{color:ACOLOR}}/> NUEVO PROCEDIMIENTO</h3><button onClick={()=>setShowProcModal(false)} className="text-slate-500 hover:text-white transition-colors"><X size={16}/></button></div>
              {[["Nombre completo","nombre","text","Ej: Juan Pérez Soto"],["RUT","rut","text","Ej: 18.432.210-K"],["Cargo imputado","cargo","text","Ej: Infracción de Tránsito"],["Oficial actuante","oficial","text","Ej: Cap. Ramírez"]].map(([label,field,type,placeholder])=>(
                <div key={field}><label className="font-display text-[9px] tracking-widest text-slate-500 mb-1.5 block">{label.toUpperCase()}</label><input type={type} placeholder={placeholder} value={procForm[field]} onChange={e=>setProcForm({...procForm,[field]:e.target.value})} className="w-full px-4 py-2.5 rounded-xl font-body text-sm outline-none" style={INPUT_STYLE} onFocus={INPUT_FOCUS} onBlur={INPUT_BLUR}/></div>
              ))}
              <div className="flex gap-3 justify-end mt-1">
                <button onClick={()=>setShowProcModal(false)} className="px-5 py-2.5 rounded-xl font-display text-xs tracking-widest text-slate-400 hover:text-white transition-colors">Cancelar</button>
                <button onClick={addProcedimiento} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-display text-xs tracking-widest transition-all" style={{background:`${ACOLOR}20`,color:ACOLOR,border:`1px solid ${ACOLOR}40`}}><Check size={13}/> Registrar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL PATRULLAJE */}
      <AnimatePresence>
        {showPatModal && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:"rgba(0,0,0,0.8)",backdropFilter:"blur(6px)"}} onClick={()=>setShowPatModal(false)}>
            <motion.div initial={{scale:0.92,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.92,opacity:0}} onClick={e=>e.stopPropagation()} className="w-full max-w-md rounded-2xl p-6 flex flex-col gap-4" style={MODAL_STYLE}>
              <div className="flex items-center justify-between"><h3 className="font-display text-sm tracking-widest text-white flex items-center gap-2"><Radio size={14} style={{color:ACOLOR}}/> NUEVO PATRULLAJE</h3><button onClick={()=>setShowPatModal(false)} className="text-slate-500 hover:text-white transition-colors"><X size={16}/></button></div>
              {[["Sector","sector","text","Ej: Sector Norte — Av. Portales"],["Unidad","unidad","text","Ej: Radio Patrulla 12"]].map(([label,field,type,placeholder])=>(
                <div key={field}><label className="font-display text-[9px] tracking-widest text-slate-500 mb-1.5 block">{label.toUpperCase()}</label><input type={type} placeholder={placeholder} value={patForm[field]} onChange={e=>setPatForm({...patForm,[field]:e.target.value})} className="w-full px-4 py-2.5 rounded-xl font-body text-sm outline-none" style={INPUT_STYLE} onFocus={INPUT_FOCUS} onBlur={INPUT_BLUR}/></div>
              ))}
              <div><label className="font-display text-[9px] tracking-widest text-slate-500 mb-1.5 block">PERSONAL</label><input type="number" placeholder="Nº efectivos" value={patForm.personal} onChange={e=>setPatForm({...patForm,personal:e.target.value})} className="w-full px-4 py-2.5 rounded-xl font-body text-sm outline-none" style={INPUT_STYLE} onFocus={INPUT_FOCUS} onBlur={INPUT_BLUR}/></div>
              <div className="flex gap-3 justify-end mt-1">
                <button onClick={()=>setShowPatModal(false)} className="px-5 py-2.5 rounded-xl font-display text-xs tracking-widest text-slate-400 hover:text-white transition-colors">Cancelar</button>
                <button onClick={addPatrullaje} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-display text-xs tracking-widest transition-all" style={{background:`${ACOLOR}20`,color:ACOLOR,border:`1px solid ${ACOLOR}40`}}><Check size={13}/> Crear Patrullaje</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL INFRACCION */}
      <AnimatePresence>
        {showInfModal && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:"rgba(0,0,0,0.8)",backdropFilter:"blur(6px)"}} onClick={()=>setShowInfModal(false)}>
            <motion.div initial={{scale:0.92,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.92,opacity:0}} onClick={e=>e.stopPropagation()} className="w-full max-w-md rounded-2xl p-6 flex flex-col gap-4" style={MODAL_STYLE}>
              <div className="flex items-center justify-between"><h3 className="font-display text-sm tracking-widest text-white flex items-center gap-2"><AlertTriangle size={14} style={{color:ACOLOR}}/> NUEVA INFRACCIÓN</h3><button onClick={()=>setShowInfModal(false)} className="text-slate-500 hover:text-white transition-colors"><X size={16}/></button></div>
              {[["Descripción","desc","text","Ej: Exceso de velocidad"],["RUT infractor","rut","text","Ej: 18.432.210-K"]].map(([label,field,type,placeholder])=>(
                <div key={field}><label className="font-display text-[9px] tracking-widest text-slate-500 mb-1.5 block">{label.toUpperCase()}</label><input type={type} placeholder={placeholder} value={infForm[field]} onChange={e=>setInfForm({...infForm,[field]:e.target.value})} className="w-full px-4 py-2.5 rounded-xl font-body text-sm outline-none" style={INPUT_STYLE} onFocus={INPUT_FOCUS} onBlur={INPUT_BLUR}/></div>
              ))}
              <div><label className="font-display text-[9px] tracking-widest text-slate-500 mb-1.5 block">MONTO ($)</label><input type="number" placeholder="Ej: 42000" value={infForm.monto} onChange={e=>setInfForm({...infForm,monto:e.target.value})} className="w-full px-4 py-2.5 rounded-xl font-body text-sm outline-none" style={INPUT_STYLE} onFocus={INPUT_FOCUS} onBlur={INPUT_BLUR}/></div>
              <div className="flex gap-3 justify-end mt-1">
                <button onClick={()=>setShowInfModal(false)} className="px-5 py-2.5 rounded-xl font-display text-xs tracking-widest text-slate-400 hover:text-white transition-colors">Cancelar</button>
                <button onClick={addInfraccion} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-display text-xs tracking-widest transition-all" style={{background:`${ACOLOR}20`,color:ACOLOR,border:`1px solid ${ACOLOR}40`}}><Check size={13}/> Registrar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function SnsmSection() {
  const s = DISCORD_ROLES_SISTEMAS["Seguridad Ciudadana"]
  return (
    <motion.div {...slideUp} className="flex flex-col gap-5">
      <div className="flex items-center gap-3 p-5 rounded-2xl border" style={{ background: `${s.color}08`, borderColor: `${s.color}30` }}>
        <div className="p-3 rounded-2xl" style={{ background: `${s.color}15` }}><Eye size={22} style={{ color: s.color }} /></div>
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-display text-[10px] tracking-widest px-2 py-0.5 rounded" style={{ background: `${s.color}20`, color: s.color }}>{s.sistema}</span>
            <BadgeCheck size={13} style={{ color: s.color }} />
          </div>
          <h2 className="font-display text-lg text-white tracking-widest">{s.fullName}</h2>
          <p className="text-slate-500 font-body text-sm">{s.desc}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {s.features.map((f, i) => (
          <button key={i} className="flex items-center gap-3 p-4 rounded-xl text-left border border-white/6 hover:border-white/15 transition-all" style={{ background: "rgba(0,0,0,0.35)" }}>
            <div className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color, boxShadow: `0 0 6px ${s.color}` }} />
            <span className="text-slate-300 font-body text-sm">{f}</span>
            <ChevronRight size={13} className="ml-auto text-slate-600" />
          </button>
        ))}
      </div>
    </motion.div>
  )
}


function ComingSoon({ label }) {
  return (
    <motion.div {...slideUp} className="flex flex-col items-center justify-center h-64 rounded-2xl border border-violet-500/15 gap-3" style={{ background: "rgba(20,12,4,0.4)" }}>
      <Star size={28} className="text-[#f97316] opacity-40" />
      <p className="font-display text-slate-500 text-xs tracking-widest">{label.toUpperCase()} — PRÓXIMAMENTE</p>
    </motion.div>
  )
}

function SectionBadge({ emoji, text, color = "#f97316", bg = "rgba(234,88,12,0.12)", border = "rgba(234,88,12,0.3)" }) {
  return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-display tracking-widest border" style={{ background: bg, borderColor: border, color }}>{emoji} {text}</span>
}

function LandingPage({ onLogin }) {
  return (
    <motion.div key="landing" className="relative flex flex-col overflow-x-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.55 }}>

      {/* HERO */}
      <div className="relative min-h-screen flex flex-col items-center justify-center">
        <VideoBackground />
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-start gap-0">
          <motion.div className="flex items-center gap-3 flex-wrap mb-8" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.7 }}>
            <SectionBadge emoji="🎮" text="PORTAL OFICIAL ARICA CHILE ROLEPLAY ER:LC" />
            <SectionBadge emoji="" text="ERLC · ACRP" color="#fb923c" bg="rgba(251,146,60,0.12)" border="rgba(251,146,60,0.3)" />
          </motion.div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12 w-full">
            <motion.div className="flex-1" initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.35, duration: 0.8 }}>
              <h1 className="font-display font-black tracking-widest leading-[1.05]">
                <span className="block text-5xl md:text-6xl lg:text-7xl text-white">TU IDENTIDAD DE</span>
                <span className="block text-5xl md:text-6xl lg:text-7xl text-white">ROLEPLAY</span>
                <span className="block text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg,#f97316,#fbbf24)" }}>COMIENZA AQUÍ</span>
              </h1>
              <p className="text-slate-400 font-body mt-5 text-base md:text-lg tracking-wide max-w-lg">Inicia sesión, crea tu cédula y accede a todo el ecosistema de Arica Chile Roleplay.</p>
              <motion.button onClick={onLogin} className="shimmer-btn mt-8 flex items-center gap-3 px-8 py-4 rounded-2xl font-display text-sm tracking-widest text-white" style={{ background: "linear-gradient(135deg,#5865F2 0%,#4752C4 100%)", boxShadow: "0 0 30px rgba(88,101,242,0.5)" }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
                Iniciar sesión con Discord
              </motion.button>
            </motion.div>

            <motion.div className="w-full lg:w-80 shrink-0" initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}>
              <div className="rounded-2xl p-6 border" style={{ background: "rgba(15,10,3,0.80)", backdropFilter: "blur(20px)", borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="flex items-center gap-2 mb-5"><span className="w-2 h-2 rounded-full bg-green-400" style={{ boxShadow: "0 0 8px rgba(74,222,128,0.9)" }} /><span className="text-green-400 font-body text-xs tracking-widest font-bold">Online</span></div>
                {[
                  { label: "Jugadores en ACRP", value: "87 / 200", bar: 0.43, color: "#f97316" },
                  { label: "Comunidad Discord",  value: "2.300",   bar: 0.60, color: "#ea580c" },
                  { label: "Rating Melonly",     value: "4.9 / 5", bar: 0.98, color: "#f59e0b" },
                ].map(s => (
                  <div key={s.label} className="mb-4">
                    <div className="flex justify-between mb-1.5"><span className="text-slate-300 font-body text-sm">{s.label}</span><span className="font-display text-sm font-bold" style={{ color: s.color }}>{s.value}</span></div>
                    <div className="h-1 rounded-full bg-white/10"><div className="h-full rounded-full" style={{ width: `${s.bar*100}%`, background: s.color }} /></div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        <motion.p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-widest text-slate-700" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>BETA v1.0 · ARICA CHILE ROLEPLAY ER:LC · 2025</motion.p>
      </div>

      {/* CÓMO UNIRTE */}
      <div className="relative z-10 bg-[#0f0a05] px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <SectionBadge emoji="🎮" text="PRIMEROS PASOS" />
            <h2 className="font-display text-3xl md:text-4xl text-white tracking-wider mt-4">¿CÓMO UNIRTE?</h2>
            <p className="text-slate-500 font-body text-sm mt-2">Tres pasos para formar parte de la comunidad.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { num: "01", icon: "💬", title: "Únete al Discord",      desc: "Ingresa al servidor oficial y conecta tu cuenta para acceder al portal.",         color: "#5865F2" },
              { num: "02", icon: "🛡️", title: "Aprueba la Whitelist", desc: "Responde el cuestionario de roleplay para obtener acceso verificado.",              color: "#f97316" },
              { num: "03", icon: "🪪",  title: "Crea tu Cédula",       desc: "Registra tu identidad roleplay y accede a todo el ecosistema del portal.",          color: "#fb923c" },
            ].map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i*0.12, duration: 0.5 }} className="relative rounded-2xl p-6 border flex flex-col gap-4" style={{ background: "rgba(20,12,4,0.7)", borderColor: `${step.color}22`, backdropFilter: "blur(12px)" }}>
                <div className="absolute top-4 right-5 font-display text-4xl font-black opacity-10 text-white">{step.num}</div>
                <div className="p-3 rounded-xl w-fit" style={{ background: `${step.color}18` }}><span className="text-2xl">{step.icon}</span></div>
                <div><p className="text-white font-display text-sm tracking-wide mb-2">{step.title}</p><p className="text-slate-500 font-body text-xs leading-relaxed">{step.desc}</p></div>
                {i < 2 && <div className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 items-center justify-center"><ChevronRight size={20} className="text-slate-600" /></div>}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* SERVICIOS */}
      <div className="relative z-10 bg-[#0f0a05] px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <SectionBadge emoji="⚙️" text="SERVICIOS" color="#fb923c" bg="rgba(251,146,60,0.08)" border="rgba(251,146,60,0.25)" />
            <h2 className="font-display text-3xl md:text-4xl text-white tracking-wider mt-4">¿QUÉ PUEDES HACER?</h2>
            <p className="text-slate-500 font-body text-sm mt-2">Herramientas y servicios disponibles dentro del portal.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "🪪", title: "Cédula Digital", desc: "Tu identidad roleplay con datos, profesión y acceso a servicios personalizados.", color: "#fb923c" },
              { icon: "🛒", title: "Mercado",         desc: "Compra y vende artículos entre jugadores en el marketplace de la comunidad.",    color: "#f97316" },
              { icon: "🚗", title: "Concesionario",   desc: "Explora vehículos disponibles y gestiona tu flota personal en el servidor.",       color: "#ec4899" },
              { icon: "🏢", title: "Empresas",         desc: "Crea y administra tu empresa, contrata empleados y genera ingresos.",              color: "#f59e0b" },
            ].map((svc, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i*0.1, duration: 0.5 }} onClick={onLogin} className="rounded-2xl p-5 flex flex-col gap-3 cursor-pointer transition-all duration-200" style={{ background: "rgba(20,12,4,0.7)", border: `1px solid ${svc.color}22`, backdropFilter: "blur(12px)" }} onMouseEnter={e=>{e.currentTarget.style.borderColor=`${svc.color}55`;e.currentTarget.style.boxShadow=`0 0 20px ${svc.color}18`}} onMouseLeave={e=>{e.currentTarget.style.borderColor=`${svc.color}22`;e.currentTarget.style.boxShadow="none"}}>
                <div className="p-2.5 rounded-xl w-fit" style={{ background: `${svc.color}18` }}><span className="text-xl">{svc.icon}</span></div>
                <div><p className="text-white font-display text-sm tracking-wide mb-1">{svc.title}</p><p className="text-slate-500 font-body text-xs leading-relaxed">{svc.desc}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* GALERÍA */}
      <div className="relative z-10 bg-[#0f0a05] px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <SectionBadge emoji="📸" text="GALERÍA" color="#ec4899" bg="rgba(236,72,153,0.08)" border="rgba(236,72,153,0.25)" />
            <h2 className="font-display text-3xl md:text-4xl text-white tracking-wider mt-4">MOMENTOS DE LA COMUNIDAD</h2>
            <p className="text-slate-500 font-body text-sm mt-2">Operativos, patrullajes y servicios registrados por ACRP.</p>
          </div>
          <GalleryCarousel />
        </div>
      </div>

      {/* EQUIPO */}
      <div className="relative z-10 bg-[#0f0a05] px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <SectionBadge emoji="👥" text="NOSOTROS" />
            <h2 className="font-display text-3xl md:text-4xl text-white tracking-wider mt-4">EQUIPO DIRECTIVO</h2>
            <p className="text-slate-500 font-body text-sm mt-2">Dirección y desarrollo continuo de la infraestructura del servidor.</p>
          </div>
          <TeamList animated={true} />
        </div>
      </div>

      {/* FOOTER */}
      <div className="relative z-10 bg-[#0a0805] border-t border-white/5 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex gap-4 flex-wrap justify-center">
            {["Normativa General", "Soporte Técnico", "Discord Oficial"].map(link => <span key={link} className="px-3 py-1.5 rounded-lg font-body text-xs text-slate-400 border border-white/8 cursor-pointer hover:text-white transition-colors" style={{ background: "rgba(255,255,255,0.03)" }}>{link}</span>)}
          </div>
          <p className="text-slate-600 font-body text-xs">Portal <span className="text-[#f97316]">Arica Chile Roleplay ER:LC</span> · 2025</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function App() {
  const [view, setView] = useState("landing")
  const [showLogin, setShowLogin] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  const sectionLabel = { home: "PANEL PRINCIPAL", cedula: "CEDULA DIGITAL", banco: "BANCO METROPOLITANO", mercado: "MERCADO NEGRO", empresas: "GESTION DE EMPRESAS", municipalidad: "MUNICIPALIDAD ACRP", faccion: "FACCIONES", comunidad: "COMUNIDAD", gepol: "GEPOL — GESTIÓN POLICIAL", aupol: "AUPOL — ARCHIVO POLICIAL", snsm: "SNSM — SEG. MUNICIPAL" }

  return (
    <div className="min-h-screen font-body" style={{ background: "#0f0a05", color: "#f8fafc" }}>
      <div className="scan-line" />
      <Particles />
      <AnimatePresence mode="wait">
        {view === "landing" && <LandingPage key="landing" onLogin={() => setShowLogin(true)} />}
        {view === "dashboard" && (
          <motion.div key="dashboard" className="flex h-screen overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} onLogout={() => { setView("landing"); setActiveSection("home") }} />
            <main className="flex-1 overflow-y-auto p-6 md:p-8 cyber-grid">
              <div className="flex items-center justify-between mb-7">
                <h1 className="font-display text-white text-sm md:text-base tracking-widest">{sectionLabel[activeSection] ?? "PANEL"}</h1>
                <div className="flex items-center gap-3">
                  <button className="p-2 rounded-lg hover:bg-white/5 text-slate-500 hover:text-white transition-all"><Bell size={17} /></button>
                  <div className="text-right hidden sm:block"><div className="text-white font-display text-[11px] tracking-wider">Jugador_001</div><div className="text-[#fb923c] font-body text-[11px]">◉ En línea</div></div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-display text-xs shrink-0" style={{ background: "linear-gradient(135deg,#ea580c,#ec4899)" }}>RP</div>
                </div>
              </div>
              <AnimatePresence mode="wait">
                {activeSection === "home"          && <HomeSection      key="home"          setActiveSection={setActiveSection} />}
                {activeSection === "cedula"        && <CedulaSection    key="cedula"        />}
                {activeSection === "banco"         && <BancoSection     key="banco"         />}
                {activeSection === "mercado"       && <MercadoSection   key="mercado"       />}
                {activeSection === "empresas"      && <EmpresasSection  key="empresas"      />}
                {activeSection === "municipalidad" && <MunicipalidadSection key="municipalidad" />}
                {activeSection === "gepol"         && <GepolSection         key="gepol"         />}
                {activeSection === "aupol"         && <AupolSection         key="aupol"         />}
                {activeSection === "snsm"          && <SnsmSection          key="snsm"          />}
                {activeSection === "faccion"       && <ComingSoon       key="faccion"       label="Facciones" />}
                {activeSection === "comunidad"     && <ComunidadSection key="comunidad"     />}
              </AnimatePresence>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showLogin && <LoginModal onClose={() => setShowLogin(false)} onEnter={() => { setShowLogin(false); setView("dashboard") }} />}
      </AnimatePresence>
    </div>
  )
}
