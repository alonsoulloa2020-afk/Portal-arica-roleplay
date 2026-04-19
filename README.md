# 🌆 Metropolitana Roleplay — SPA v1.0

Stack: **Vite + React 18 + Tailwind CSS 3 + Framer Motion 11**

---

## 📁 Estructura de archivos

```
metropolitana-rp/
├── index.html
├── package.json
├── vite.config.js
├── postcss.config.js
├── tailwind.config.js
├── public/
│   └── assets/
│       ├── logo.png       ← Renombrar imagen 1 (logo Metropolitana)
│       ├── hero1.png      ← Renombrar imagen 2 (S.I.P. escritorio)
│       ├── hero2.png      ← Renombrar imagen 3 (S.I.P. pasillo)
│       ├── hero3.png      ← Renombrar imagen 4 (equipo nocturno 1)
│       └── hero4.png      ← Renombrar imagen 5 (equipo nocturno 2)
└── src/
    ├── main.jsx
    ├── App.jsx
    └── index.css
```

---

## 🖼️ Paso 1 — Copiar imágenes

Crea la carpeta `public/assets/` y copia las imágenes con los nombres exactos:
- `logo.png`  → el logo circular de Metropolitana RP
- `hero1.png` → screenshot S.I.P. en escritorio
- `hero2.png` → screenshot S.I.P. en pasillo
- `hero3.png` → screenshot equipo táctico nocturno (versión 1)
- `hero4.png` → screenshot equipo táctico nocturno (versión 2)

---

## 📦 Paso 2 — Instalar dependencias

Abre la terminal en la carpeta del proyecto y ejecuta:

```bash
npm install
```

Esto instala automáticamente:
- `react` + `react-dom`
- `framer-motion` (animaciones)
- `lucide-react` (iconos)
- `clsx` (utility de clases condicionales)
- `tailwindcss` + `autoprefixer` + `postcss` (estilos)
- `vite` + `@vitejs/plugin-react` (bundler)

---

## 🚀 Paso 3 — Servidor de desarrollo

```bash
npm run dev
```

Abre `http://localhost:5173` en tu navegador. El servidor recarga automáticamente.

---

## 🏗️ Paso 4 — Build de producción

```bash
npm run build
```

Genera la carpeta `dist/` con todos los archivos optimizados y minificados.

Para previsualizar el build antes de subir:
```bash
npm run preview
```

---

## 🌐 Paso 5 — Despliegue en Vercel (recomendado)

### Opción A — GitHub + Vercel (automático)

1. Sube el proyecto a un repositorio de GitHub
2. Ve a [vercel.com](https://vercel.com) → **New Project**
3. Importa tu repositorio
4. Vercel detecta Vite automáticamente. Configuración:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy** → listo en ~60 segundos

### Opción B — Vercel CLI (directo desde terminal)

```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## 🌐 Paso 6 — Despliegue en Netlify (alternativa)

### Opción A — Drag & Drop

1. Ejecuta `npm run build`
2. Ve a [netlify.com](https://netlify.com) → **Add new site** → **Deploy manually**
3. Arrastra la carpeta `dist/` al área de drop
4. Tu sitio está en vivo en segundos

### Opción B — Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

---

## ⚙️ Configuración de Tailwind

El archivo `tailwind.config.js` incluye:
- Colores del Design System (`bg-main`, `primary-neon`, `critical-magenta`, etc.)
- Fuentes: Orbitron (display), Rajdhani (body), Share Tech Mono
- Sombras neón personalizadas
- Keyframes: Ken Burns, Shimmer, Pulse Neon, Float, Scan Line, Particle Drift

---

## 🎨 Funcionalidades implementadas

| Módulo           | Detalle                                                          |
|------------------|------------------------------------------------------------------|
| **Landing**      | Hero slider automático con Ken Burns + cross-fade 1.8s          |
| **Partículas**   | 18 partículas flotantes animadas en toda la app                  |
| **Scan Line**    | Efecto CRT sutil recorriendo la pantalla                        |
| **Login Modal**  | Glassmorphism + blur + stats + botón Discord con shimmer         |
| **Sidebar**      | 260px, indicador magenta activo con `layoutId` de Framer Motion  |
| **Banco**        | Card con saldo, historial de transacciones, modal de transferencia|
| **Transferir**   | Validación solo números, loading spinner → check de éxito        |
| **Mercado**      | Grid 3 col, filtros por categoría, raridades con glow, buy state |
| **Shimmer**      | Efecto de haz de luz en botones VIP/CTA via `::after` CSS        |
| **Logo Blend**   | `mix-blend-mode: screen` para fusión sin fondo negro             |

---

## 🔧 Próximos pasos sugeridos

- Conectar autenticación real de Discord OAuth2
- Backend con Supabase o Firebase para datos en vivo
- Sistema de rangos y perfiles de usuario
- Chat en tiempo real con WebSockets
