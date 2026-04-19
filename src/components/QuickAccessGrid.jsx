import { motion } from "framer-motion"
import {
  Wallet, ShoppingBag, Car, Building2, Shield, CreditCard,
  ChevronRight, Lock, Landmark, Gift, Heart, Wrench,
  Siren, Globe, Briefcase, Package, Dices, Store,
  ShoppingCart, Drama, AlertTriangle, Hammer
} from "lucide-react"

const QUICK_ACCESS = [
  { id: "banco",      icon: Wallet,       label: "Banco Central",      desc: "Saldo, transferencias...",        color: "#22c55e" },
  { id: "coming_1",   icon: Package,      label: "Mis Pertenencias",   desc: "Vehículos y propiedades...",      color: "#3b82f6" },
  { id: "mercado",    icon: ShoppingCart,  label: "Mercado",            desc: "Compra y vende artículos...",     color: "#a855f7" },
  { id: "coming_2",   icon: Dices,        label: "Casino",             desc: "Juega y gana premios...",         color: "#f59e0b" },
  { id: "coming_3",   icon: Store,        label: "Tienda",             desc: "Artículos premium...",            color: "#ec4899" },
  { id: "coming_4",   icon: Car,          label: "Concesionario",      desc: "¡Cerrado por actualización!",     color: "#06b6d4", locked: true },
  { id: "coming_5",   icon: Building2,    label: "Empresas",           desc: "Gestión empresarial...",          color: "#f97316" },
  { id: "coming_6",   icon: Drama,        label: "Escenas de Rol",     desc: "Chat IC en vivo p...",            color: "#6366f1" },
  { id: "coming_7",   icon: Globe,        label: "Entornos RP",        desc: "Avistamientos y reportes...",     color: "#22c55e" },
  { id: "coming_8",   icon: Gift,         label: "Mystery Box",        desc: "Abre cajas y gana...",            color: "#eab308" },
  { id: "municipalidad", icon: Landmark,  label: "Municipalidad",      desc: "Trámites y gestión...",           color: "#3b82f6" },
  { id: "coming_9",   icon: Briefcase,    label: "Centro de Empleo",   desc: "¡En actualización!",              color: "#f97316", locked: true },
  { id: "coming_10",  icon: Heart,        label: "Pase de Lealtad",    desc: "Recompensas diarias...",          color: "#ef4444" },
  { id: "mercado",    icon: ShoppingBag,  label: "Mercado Negro",      desc: "Necesitas nivel 10...",           color: "#7c3aed" },
  { id: "coming_11",  icon: Wrench,       label: "Taller Kenner",      desc: "Panel mecánico y tuning...",      color: "#10b981" },
  { id: "coming_12",  icon: AlertTriangle,label: "Robo de Vehículos",  desc: "Necesitas nivel 4...",            color: "#ef4444", locked: true },
  { id: "coming_13",  icon: Hammer,       label: "El Desguace",        desc: "Solo mecánicos habilitados...",   color: "#64748b", locked: true },
  { id: "coming_14",  icon: Siren,        label: "Emergencias",        desc: "Llamadas de emergencia...",       color: "#dc2626" },
  { id: "coming_15",  icon: Shield,       label: "Panel de Staff",     desc: "Solo personal autorizado...",     color: "#a855f7", locked: true },
  { id: "coming_16",  icon: Shield,       label: "Portales Policiales",desc: "AUPOL · GEPOL...",                color: "#2563eb", locked: true },
]

export default function QuickAccessGrid({ setActiveSection }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-slate-400 text-lg">🎯</span>
        <h3 className="font-display text-white text-sm tracking-widest">ACCESOS RÁPIDOS</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5">
        {QUICK_ACCESS.map((item, i) => {
          const Icon = item.icon
          const isLocked = item.locked
          const isNavigable = !item.id.startsWith("coming_")
          return (
            <motion.button
              key={i}
              onClick={() => {
                if (isNavigable && !isLocked) setActiveSection(item.id)
              }}
              whileHover={!isLocked ? { scale: 1.015 } : {}}
              className="relative flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group border"
              style={{
                background: "rgba(15,10,30,0.7)",
                borderColor: "rgba(255,255,255,0.06)",
                cursor: isLocked ? "not-allowed" : isNavigable ? "pointer" : "default",
                opacity: isLocked ? 0.5 : 1,
              }}
              onMouseEnter={e => {
                if (!isLocked) {
                  e.currentTarget.style.borderColor = `${item.color}40`
                  e.currentTarget.style.background = "rgba(22,14,40,0.85)"
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"
                e.currentTarget.style.background = "rgba(15,10,30,0.7)"
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all"
                style={{ background: `${item.color}18`, border: `1px solid ${item.color}25` }}
              >
                <Icon size={18} style={{ color: item.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-body text-sm font-semibold truncate group-hover:text-white transition-colors">
                  {item.label}
                </div>
                <div className="text-slate-500 font-body text-xs truncate">{item.desc}</div>
              </div>
              {isLocked ? (
                <Lock size={14} className="text-slate-600 shrink-0" />
              ) : (
                <ChevronRight size={15} className="text-slate-600 group-hover:text-slate-300 transition-colors shrink-0" />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
