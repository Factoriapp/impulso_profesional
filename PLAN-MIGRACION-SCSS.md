# 🚀 PLAN DE MIGRACIÓN A SCSS MODULAR
## Contexto para Devito - Conversación 24-Nov-2025

---

## 📋 SITUACIÓN ACTUAL

**Problema:**
- `css/styles.css` → 3,781 líneas (80KB) monolítico
- Devito lee archivos completos → gasto masivo de tokens
- Ediciones lentas (40+ segundos por respuesta)
- No escalable para múltiples temas

**Estado del Proyecto:**
- 10 páginas HTML funcionando
- Variables CSS nativas implementadas (`:root`)
- Multi-tenant conceptualizado (JSON + `applyTheme()`)
- Arquitectura: HTML vanilla + CSS + JS vanilla

---

## 🎯 OBJETIVO DE LA MIGRACIÓN

### Inmediato:
1. Fragmentar CSS en módulos de 100-300 líneas
2. Reducir tokens de Devito en 90%
3. Facilitar ediciones rápidas (archivos pequeños)

### Estratégico:
1. Preservar CSS Custom Properties para theming runtime
2. Preparar estructura para Dashboard de personalización
3. Mantener compatibilidad 100% con HTML actual

---

## ⚠️ REQUISITO CRÍTICO (INNEGOCIABLE)

### "Modificación Crítica" de Stratego:

**El CSS compilado DEBE mantener CSS Custom Properties nativas.**

```scss
/* ❌ PROHIBIDO - Compilar a hexadecimal duro */
$color-primary: #c5d9e8;
.header {
  background: $color-primary;  // ❌ Compila → background: #c5d9e8;
}

/* ✅ CORRECTO - Mantener CSS variables intactas */
:root {
  --color-primary: #c5d9e8;
}
.header {
  background: var(--color-primary);  // ✅ Compila → background: var(--color-primary);
}
```

**Razón:**
- Dashboard futuro necesita cambiar temas en runtime
- `document.documentElement.style.setProperty('--color-primary', '#f5c2e1')`
- Sin recargar página, sin recompilar CSS

**Reglas durante migración:**
1. ❌ NO crear variables SCSS para colores (tipo `$color-primary`)
2. ✅ Mantener TODO el bloque `:root` con `--color-*`
3. ✅ Usar SIEMPRE `var(--*)` en clases
4. ✅ Variables SCSS solo para breakpoints, mixins, cálculos

---

## 📂 ESTRUCTURA PROPUESTA

```
Web_modelo/
├── scss/                           # ← NUEVA carpeta
│   ├── _variables.scss             # :root { CSS variables nativas }
│   ├── _reset.scss                 # Reset CSS básico
│   ├── _typography.scss            # h1-h6, p, fuentes
│   ├── _header.scss                # Header + navegación (~200 líneas)
│   ├── _cards.scss                 # .card, .card--fluid, .card-image-resource (~400 líneas)
│   ├── _cards-legacy.scss          # .card (300px fijo) para páginas no migradas
│   ├── _buttons.scss               # .btn, .btn-primary, .btn-secondary
│   ├── _forms.scss                 # Formularios, inputs
│   ├── _pricing.scss               # .price, .card-precio, badges
│   ├── _utilities.scss             # .mt-auto, .w-full, helpers
│   ├── _grid-layouts.scss          # .cards-grid, .detail-grid
│   ├── _responsive.scss            # Media queries @768px, @480px
│   └── main.scss                   # Importa todos los módulos
│
├── css/
│   ├── styles.css                  # ← COMPILADO desde scss/main.scss
│   └── styles-BACKUP-2024-11-24.css
│
├── package.json                    # ← NUEVO (npm config)
└── .gitignore                      # node_modules/
```

---

## 🛠️ PLAN DE EJECUCIÓN PASO A PASO

### FASE 1: Setup Inicial (5 minutos)

```bash
# 1. Crear package.json
npm init -y

# 2. Instalar SASS
npm install sass --save-dev

# 3. Crear estructura de carpetas
mkdir scss
```

**Agregar a package.json:**
```json
{
  "scripts": {
    "watch": "sass --watch scss/main.scss:css/styles.css",
    "build": "sass scss/main.scss:css/styles.css --style=expanded",
    "build:prod": "sass scss/main.scss:css/styles.min.css --style=compressed"
  }
}
```

**Crear .gitignore:**
```
node_modules/
css/styles.css.map
*.log
```

---

### FASE 2: Crear Archivo Principal (10 minutos)

**Crear `scss/main.scss`:**
```scss
/* ============================================
   WEB IMPULSO PROFESIONAL
   SCSS Modular - Compilado a css/styles.css
   ============================================ */

/* 1. Variables CSS Nativas (Custom Properties) */
@import 'variables';

/* 2. Reset y Base */
@import 'reset';
@import 'typography';

/* 3. Layout */
@import 'header';
@import 'grid-layouts';

/* 4. Componentes */
@import 'cards';
@import 'cards-legacy';
@import 'buttons';
@import 'forms';
@import 'pricing';

/* 5. Utilidades */
@import 'utilities';

/* 6. Responsive */
@import 'responsive';
```

---

### FASE 3: Migrar Contenido CSS → SCSS (1-2 horas)

#### **1. `_variables.scss` (Líneas 6-73 del actual styles.css)**

Copiar bloque `:root` COMPLETO:
```scss
/* ============================================
   CSS CUSTOM PROPERTIES (Variables Nativas)
   CRÍTICO: Mantener var(--*) para theming runtime
   ============================================ */

:root {
    /* Paleta de Colores: Azules Claros y Ocres Pastel */
    --color-sky: #c5d9e8;
    --color-powder: #d4e3ed;
    --color-mist: #e5eff5;
    --color-ochre: #e8d5c4;
    --color-sand: #e7ddc9;
    --color-cream: #f5f1e8;
    --color-sage-blue: #b8c9d4;

    /* Colores de Texto */
    --color-text: #6b6b6b;
    --color-text-light: #999;
    --color-white: #ffffff;
    --color-bg: #faf8f5;

    /* Sombras Muy Suaves */
    --shadow-soft: 0 4px 20px rgba(107, 107, 107, 0.08);
    --shadow-medium: 0 6px 30px rgba(107, 107, 107, 0.12);
    --shadow-hover: 0 8px 40px rgba(107, 107, 107, 0.15);

    /* Tipografía */
    --font-serif: 'Playfair Display', 'Lora', Georgia, serif;
    --font-sans: 'Source Sans Pro', 'Poppins', -apple-system, sans-serif;

    /* Espaciado */
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    --spacing-md: 2rem;
    --spacing-lg: 3rem;
    --spacing-xl: 5rem;

    /* Transiciones Suaves */
    --transition: all 0.4s ease;

    /* === COLORES BASE (Configurables en Dashboard SaaS) === */
    --color-primary: var(--color-sky);
    --color-secondary: var(--color-ochre);
    --color-sage: #6B9080;
    --color-sage-alt: #8d998e;
    --color-lavender: #b6a2c0;
    --color-border: rgba(197, 217, 232, 0.3);

    /* === TINTES CLAROS === */
    --color-bg-primary-light: #eef2ff;
    --color-bg-secondary-light: #fffbf0;
    --color-bg-sage-light: #f0f5f1;
    --color-bg-text-light: #f5f5f5;
    --color-bg-neutral: #f9f9f9;
    --color-bg-alt: #fafafa;

    /* === COLORES FUNCIONALES === */
    --color-success: #4CAF50;
    --color-success-bg: #efe;
    --color-success-dark: #3c3;
    --color-error: #c33;
    --color-error-bg: #fee;
    --color-muted-text: #999;
    --color-light: #f5f5f5;

    /* === GRADIENTES === */
    --gradient-placeholder-start: #f5f5f5;
    --gradient-placeholder-end: #e0e0e0;
}

/* Variables SCSS para breakpoints y mixins (NO colores) */
$breakpoint-mobile: 480px;
$breakpoint-tablet: 768px;
$breakpoint-desktop: 968px;
```

#### **2. `_reset.scss` (Líneas 46-100 actual)**
```scss
/* Reset CSS */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
    font-size: 16px;
}

body {
    font-family: var(--font-sans);
    color: var(--color-text);
    background-color: var(--color-bg);
    line-height: 1.8;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
}

img {
    max-width: 100%;
    display: block;
}
```

#### **3. `_header.scss` (Líneas 192-400 actual)**
Copiar todo el bloque de header y navegación.

#### **4. `_cards.scss` (Líneas 803-860 + 2652-2728 actual)**
Copiar:
- `.cards-grid`
- `.card--fluid` (nueva arquitectura responsive)
- `.card-image-resource`
- `.card-icon`, `.card-title`, `.card-text`

#### **5. `_cards-legacy.scss` (Líneas 811-823 actual)**
```scss
/* ============================================
   TARJETAS LEGACY (300px fijo)
   DEPRECATED: Solo para páginas no migradas
   ============================================ */

.card {
    background: var(--color-white);
    padding: 1.5rem;
    border-radius: 15px;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    border: 2px solid var(--color-primary);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    width: 300px;  /* FIJO - problema en mobile */
    height: 550px;
}
```

#### **6. `_pricing.scss` (Líneas 2800-2840 actual)**
```scss
/* Pricing */
.card-precio {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-bottom: 0;
}

.price {
    font-weight: 700;
    font-size: 0.95rem;
    margin-bottom: 0;
    line-height: 1.2;
    white-space: nowrap;
}

.price--large {
    font-size: 1.5rem;
}

.price--primary {
    color: var(--color-primary);  /* ✅ Mantiene variable */
}
```

#### **7. `_utilities.scss` (Líneas 2841-2870 actual)**
```scss
.mt-auto {
    margin-top: auto;
}

.mt-auto .card-link-action {
    display: block;
    text-align: right;
    margin-top: 0.25rem;
}

.w-full {
    width: 100%;
}

.text-center {
    text-align: center;
}
```

#### **8. `_responsive.scss` (Líneas 2192+ actual)**
```scss
@media (max-width: $breakpoint-tablet) {
    .cards-grid {
        grid-template-columns: 1fr;
    }

    .section-title {
        font-size: 2rem;
    }
}

@media (max-width: $breakpoint-mobile) {
    .card--fluid {
        padding: 1rem;
    }

    .card-image-resource {
        height: 180px;
        width: calc(100% + 2rem);
        margin: -1rem -1rem 1rem -1rem;
    }
}
```

---

### FASE 4: Build y Verificación (15 minutos)

#### **1. Compilar por primera vez:**
```bash
npm run build
```

#### **2. Verificación CRÍTICA (CSS Variables intactas):**
```bash
# DEBE retornar +100 líneas con var(--color-*)
grep "var(--color" css/styles.css | wc -l

# DEBE retornar SOLO en :root (líneas 6-73), NO en clases
grep "#c5d9e8" css/styles.css

# Comparar líneas (debe ser similar)
wc -l css/styles.css
# Esperado: ~3,800 líneas (similar al original)
```

#### **3. Testing Visual:**
- Abrir `index.html` en navegador
- Abrir `catalogo.html`
- Verificar que TODO se ve idéntico al CSS anterior
- Verificar DevTools: CSS variables presentes

#### **4. Activar Watch Mode:**
```bash
npm run watch
```

Ahora SCSS se recompila automáticamente al guardar cambios.

---

### FASE 5: Documentar en CHULETA (15 minutos)

Agregar a `CHULETA-DESARROLLO.md`:

```markdown
## 📂 ARQUITECTURA SCSS (Implementada: [FECHA])

### Workflow de Desarrollo:

1. **Editar SCSS:** Modificar archivos en `scss/`
2. **Auto-compilación:** Watch mode genera `css/styles.css` automáticamente
3. **Recargar browser:** Ver cambios en tiempo real

### Comandos:

```bash
npm run watch      # Modo desarrollo (auto-recompila)
npm run build      # Compilar una vez (development)
npm run build:prod # Minificar para producción
```

### Mapa de Archivos SCSS:

| Archivo | Líneas | Contenido | Cuándo Editar |
|---------|--------|-----------|---------------|
| `_variables.scss` | ~100 | `:root` CSS variables | Nunca (runtime theming) |
| `_header.scss` | ~200 | Header, navegación | Cambios en menú |
| `_cards.scss` | ~400 | Tarjetas responsive | Diseño de tarjetas |
| `_pricing.scss` | ~150 | Precios, badges | Sistema de precios |
| `_utilities.scss` | ~80 | Helpers, .mt-auto | Utilidades CSS |
| `_responsive.scss` | ~200 | Media queries | Breakpoints mobile |

### ⚠️ REGLA CRÍTICA:

**NUNCA reemplazar `var(--color-*)` con hexadecimales en SCSS.**

Dashboard futuro necesita cambiar colores en runtime.

### Testing Post-Edición:

```bash
# Verificar variables CSS intactas
grep "var(--color" css/styles.css | wc -l  # Debe ser >100
```
```

---

## ✅ CRITERIOS DE ÉXITO

La migración es exitosa cuando:

1. ✅ `css/styles.css` compilado tiene ~3,800 líneas
2. ✅ Todas las páginas HTML se ven idénticamente al CSS anterior
3. ✅ `grep "var(--color" css/styles.css` retorna +100 líneas
4. ✅ `grep "#c5d9e8" css/styles.css` solo aparece en `:root` (líneas 6-73)
5. ✅ Watch mode funciona: guardar `.scss` → auto-compila → recargar browser
6. ✅ Devito puede editar archivos de 100-300 líneas (no 3,781)
7. ✅ CHULETA actualizada con mapa de archivos SCSS

---

## 🎯 BENEFICIOS POST-MIGRACIÓN

### Para Devito:
- ✅ Archivos pequeños (100-300 líneas)
- ✅ Tokens reducidos 90% (lee solo archivo relevante)
- ✅ Búsquedas precisas por archivo (`_cards.scss`, `_header.scss`)
- ✅ Ediciones rápidas (<10 segundos)

### Para el Proyecto:
- ✅ Código modular y mantenible
- ✅ Escalable profesionalmente
- ✅ CSS Variables preservadas para runtime theming
- ✅ Preparado para Dashboard de personalización

### Para el Futuro:
- ✅ Pepe elige colores en Dashboard → JavaScript cambia `--color-primary`
- ✅ Múltiples temas sin duplicar CSS
- ✅ Sin recompilar, sin recargar página

---

## 📝 NOTAS ADICIONALES

### Compatibilidad:
- ✅ HTML actual NO requiere cambios
- ✅ JavaScript actual NO requiere cambios
- ✅ Solo cambia workflow de desarrollo CSS

### Rollback:
Si algo falla, backup disponible:
```bash
cp css/styles-BACKUP-2024-11-24.css css/styles.css
```

### Próximos Pasos (Post-Migración):
1. Migrar páginas restantes a `.card--fluid`
2. Deprecar `.card` legacy cuando todas migren
3. Implementar `applyTheme()` JavaScript para Dashboard

---

## 🚀 COMANDO DE INICIO

**Cuando estés listo para ejecutar la migración, simplemente di:**

> "Devito, ejecuta la migración SCSS según PLAN-MIGRACION-SCSS.md"

**Y procederé con las 5 fases documentadas aquí.**

---

**Fecha de Creación:** 24 de Noviembre de 2025
**Estado:** Aprobado, pendiente de ejecución
**Tiempo Estimado:** 2-3 horas
**Prioridad:** Alta (resuelve lentitud crítica)
