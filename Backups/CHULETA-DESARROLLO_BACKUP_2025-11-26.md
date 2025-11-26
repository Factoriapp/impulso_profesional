# 📘 CHULETA DE DESARROLLO - Web Impulso Profesional
## Guía de Referencia Técnica para Desarrollo Coherente

---

## 📋 ÍNDICE RÁPIDO
1. [Arquitectura del Proyecto](#arquitectura)
2. [Sistema de Colores](#colores)
3. [Convenciones de Código](#convenciones)
   - [Convenciones de Contenido HTML](#convenciones-contenido) (Sistema `## ##`, Truncamiento, Primer Nombre)
4. [Componentes Reutilizables](#componentes-reutilizables) (Iconos SVG, Cards, Botones, Badges, Grids)
5. [Optimizaciones Implementadas](#optimizaciones)
6. [Reglas de Negocio (DM1)](#reglas-dm1)
7. [Decisiones Técnicas Clave](#decisiones)
8. **[🔄 Migraciones Pendientes](#migraciones)** (Tarjetas Legacy → Responsive)
9. [Checklist de Nuevas Páginas](#checklist)

---

## 🏗️ ARQUITECTURA DEL PROYECTO {#arquitectura}

### Estructura de Archivos
```
Web_modelo/
├── index.html                    # Página principal (home)
├── presentacion-profesional.html # Página "Sobre Mí" (ACTIVA)
├── catalogo.html     # Catálogo de soluciones
├── contacto-agenda.html         # Landing híbrida: Reserva + Contacto (v1.5)
├── membresia.html               # Sales page para suscripción recurrente (v2.0)
├── area-privada.html            # Dashboard privado dinámico (detecta usuario)
├── area-privada-ana.html        # Vista Premium: Hub de consumo limpio
├── area-privada-regina.html     # Vista Registrada: Con upsell
├── cuenta.html                  # Gestión de cuenta (perfil, suscripción, seguridad)
├── Obsoleto/
│   ├── sobre-mi.html            # ⚠️ DEPRECATED - Usar presentacion-profesional.html
│   ├── agenda.html              # ⚠️ DEPRECATED - Usar contacto-agenda.html
│   └── contacto.html            # ⚠️ DEPRECATED - Usar contacto-agenda.html
├── css/
│   └── styles.css               # Hoja de estilos única (2900+ líneas)
├── js/
│   ├── main.js                  # JavaScript principal
│   ├── auth.js                  # Sistema de autenticación
│   └── area-privada.js          # Lógica del área privada
└── CHULETA-DESARROLLO.md        # Este archivo (v2.0)
```

**Navegación Estándar (5 páginas principales):**
```html
<ul class="nav-menu" id="navMenu">
    <li><a href="index.html">Inicio</a></li>
    <li><a href="presentacion-profesional.html">Sobre Mí</a></li>
    <li><a href="catalogo.html">Soluciones</a></li>
    <li><a href="membresia.html">Membresía</a></li>
    <li><a href="contacto-agenda.html" class="nav-cta">Contacto</a></li>
</ul>
```
**Nomenclatura unificada** (2025-11-15):
- ✅ "Sobre Mí" (antes "Presentación Profesional")
- ✅ "Soluciones" (antes "Oferta de Servicios")
- ✅ "Contacto" (antes "Contacto y Agenda" o "Agenda tu Sesión")
- ✅ Clase `active` en el link de la página actual

**Decisiones arquitectónicas recientes:**
- **Área Privada** (v3.0 - 2025-11-16): Hub Unificado Vertical
  - Renombrado: `area-miembros.html` → `area-privada.html`
  - Arquitectura Stratego: Separación de consumo y gestión
  - 3 páginas especializadas:
    - `area-privada.html`: Dinámico, redirige según tipo de usuario
    - `area-privada-ana.html`: Hub Premium (solo consumo, sin bloques redundantes)
    - `area-privada-regina.html`: Vista Registrada (con upsell y explorar)
  - `cuenta.html`: Gestión separada (perfil, suscripción, seguridad)
  - Headers con dropdown: [Mi Cuenta] y [Cerrar Sesión] en menú desplegable
  - Placeholders genéricos en [corchetes] para customización
- **membresia.html** (v2.0): Mejoras UX y optimización
  - Grid Flexbox 2x2 para privilegios (antes carrusel)
  - FAQ con acordeón nativo `<details>` (cero JavaScript)
  - Eliminadas 80 líneas de JavaScript del carrusel
  - Mejora en accesibilidad y usabilidad móvil
- **contacto-agenda.html** (v1.7): Unifica reserva + contacto con Modal Strategy
  - Estrategia: "Red de Seguridad" (maximiza conversión)
  - Layout: 2 columnas asimétricas 2fr/1fr
    - Izquierda: Calendario (más ancho, protagonista)
    - Derecha: CTA gradiente clickeable + Caja de Reglas
  - Formulario: Modal popup (limpia la vista, foco en calendario)
  - Altura sincronizada: 700px para ambas columnas
  - Footer unificado en todas las páginas (4 columnas, iconos SVG)
- **Navegación hamburguesa** (v2.0): Corrección técnica
  - Menú hamburguesa funciona en todas las pantallas
  - Corregido scroll horizontal (`overflow-x: hidden`)
  - Posicionamiento preciso: `right: -320px` (antes `-100%`)

### Filosofía Arquitectónica
- **Monolito CSS**: Un solo archivo `styles.css` (no usar múltiples hojas)
- **Variables CSS primero**: Todo color/espaciado debe ser variable CSS
- **HTML semántico**: Usar clases reutilizables, evitar inline styles
- **Progressive Enhancement**: Funciona sin JS, mejora con JS
- **Mobile First**: Diseñar para móvil, escalar a desktop

### Nomenclatura: Denominación Genérica "RECURSO" (22-Nov-2025)

**Decisión Firme del DM1:** "RECURSO" es el término genérico oficial para TODAS las ofertas del profesional.

**Definición:**
**RECURSO** = Cualquier oferta, servicio, producto o experiencia que el profesional vende o entrega a sus clientes.

**Incluye:**
- Servicios 1:1 (sesiones, consultas, terapias)
- Cursos online (pregrabados o por cohortes)
- Talleres y eventos (presenciales o virtuales)
- Productos digitales (ebooks, guías, plantillas)
- Membresías y comunidades
- Programas de formación
- Cualquier otra oferta

**En el código HTML/CSS:**
- **Tarjetas de Recursos** = Nombre genérico para TODAS las tarjetas (`.card`, `.card--enhanced`)
- **Ubicación principal:** `catalogo.html` (página que aloja todos los recursos)
- **Escaparate:** Sección "Recursos Destacados" en `index.html` (máx. 3 recursos curados)
- **Badges:** Cada recurso tiene etiqueta visual específica (`.badge--evento`, `.badge--curso`, `.badge--servicio`, etc.)

**Regla de Oro:**
Usar "Recurso" como término genérico en toda comunicación técnica. Solo usar términos específicos (curso, evento, servicio) cuando se refiera a un subtipo concreto.

---

## 🎨 SISTEMA DE COLORES {#colores}

### Variables CSS Principales (`:root` en styles.css)

#### Paleta Base (Colores Decorativos)
```css
--color-sky: #c5d9e8;            /* Azul cielo suave */
--color-powder: #d4e3ed;         /* Azul polvo muy claro */
--color-mist: #e5eff5;           /* Niebla azul casi blanca */
--color-ochre: #e8d5c4;          /* Ocre pastel cálido */
--color-sand: #e7ddc9;           /* Arena dorada suave */
--color-cream: #f5f1e8;          /* Crema cálida */
--color-sage-blue: #b8c9d4;      /* Azul-verde apagado */
```

#### Variables Semánticas (Configurables para Whitelabel)
```css
--color-primary: var(--color-sky);       /* Color principal de marca */
--color-secondary: var(--color-ochre);   /* Color secundario */
--color-sage: #8d998e;                   /* Color terciario */
--color-border: rgba(197, 217, 232, 0.3);/* Bordes suaves */
```

#### Colores de Texto
```css
--color-text: #6b6b6b;           /* Texto principal (gris medio cálido) */
--color-text-light: #999;        /* Texto secundario */
--color-white: #ffffff;          /* Blanco puro */
--color-bg: #faf8f5;             /* Fondo general (crema muy claro) */
```

#### Colores Funcionales (Sistema)
```css
--color-error: #c33;             /* Rojo para errores */
--color-success: #3c3;           /* Verde para éxito */
--color-light: #f5f5f5;          /* Fondo neutral claro */
```

#### Colores Derivados (Tintes Claros) - OPTIMIZACIÓN #3 ✅
```css
/* ✅ IMPLEMENTADO - Líneas 2291-2315 de styles.css */
--color-bg-primary-light: #eef2ff;      /* Tinte claro del primario (iconos eventos) */
--color-bg-secondary-light: #fffbf0;    /* Tinte claro del secundario (iconos cursos) */
--color-bg-sage-light: #f0f5f1;         /* Tinte claro del sage (iconos ebooks) */
--color-bg-text-light: #f5f5f5;         /* Fondo claro neutral (iconos servicios) */
--color-bg-neutral: #f9f9f9;            /* Fondo gris claro para cajas info */
--color-bg-alt: #fafafa;                /* Fondo alternativo secciones */

/* Colores funcionales (mensajes sistema) */
--color-success: #4CAF50;               /* Verde mensajes éxito */
--color-success-bg: #efe;               /* Fondo verde claro alertas */
--color-success-dark: #3c3;             /* Verde oscuro texto/bordes */
--color-error: #c33;                    /* Rojo mensajes error */
--color-error-bg: #fee;                 /* Fondo rojo claro alertas */
--color-muted-text: #999;               /* Texto apagado/placeholder */

/* Gradientes (placeholders imágenes) */
--gradient-placeholder-start: #f5f5f5;  /* Inicio gradiente */
--gradient-placeholder-end: #e0e0e0;    /* Fin gradiente */
```

**IMPORTANTE**: El valor de `--color-sage` fue actualizado de `#8d998e` a `#6B9080` para consistencia con sobre-mi.html. Si necesitas el sage alternativo, usa `--color-sage-alt: #8d998e`.

### 🚨 REGLA DE ORO: NUNCA usar colores HEX directamente
```css
/* ❌ MAL */
.card { background: #eef2ff; }

/* ✅ BIEN */
.card { background: var(--color-bg-primary-light); }
```

**Razón**: Whitelabel. Cuando el usuario cambie su color primario en el Dashboard, todos los colores derivados deben recalcularse automáticamente.

---

## 📐 SISTEMA DE ESPACIADO

### Variables de Espaciado
```css
--spacing-xs: 0.5rem;   /* 8px */
--spacing-sm: 1rem;     /* 16px */
--spacing-md: 2rem;     /* 32px */
--spacing-lg: 3rem;     /* 48px */
--spacing-xl: 5rem;     /* 80px */
```

### Uso Recomendado
- **`xs`**: Padding interno pequeño, gaps entre elementos cercanos
- **`sm`**: Margin bottom de párrafos, padding de botones
- **`md`**: Separación entre secciones, padding de tarjetas
- **`lg`**: Padding vertical de secciones
- **`xl`**: Separación dramática entre bloques principales

---

## 🎭 CONVENCIONES DE CÓDIGO {#convenciones}

### Nomenclatura de Clases CSS

#### Sistema BEM (Block Element Modifier)
```css
/* Block */
.card { }

/* Element (hijo directo) */
.card__content { }
.card__footer { }

/* Modifier (variación) */
.card--enhanced { }
.card--featured { }
```

#### Clases de Utilidad (Utility Classes)
```css
.mt-auto       /* margin-top: auto */
.w-full        /* width: 100% */
.text-center   /* text-align: center */
.align-center  /* align-items: center */
```

### Jerarquía de Especificidad
1. **Variables CSS** (`:root`)
2. **Reset y Base** (elementos HTML puros)
3. **Componentes** (`.card`, `.btn`, `.form-input`)
4. **Utilidades** (`.mt-auto`, `.w-full`)
5. **Estados** (`:hover`, `:focus`, `.active`)
6. **Responsive** (`@media`)

### Orden de Propiedades CSS
```css
.elemento {
    /* 1. Posicionamiento */
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;

    /* 2. Box Model */
    display: flex;
    width: 100%;
    height: 400px;
    margin: 1rem;
    padding: 2rem;

    /* 3. Tipografía */
    font-family: var(--font-sans);
    font-size: 1rem;
    line-height: 1.8;
    color: var(--color-text);

    /* 4. Visual */
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    box-shadow: var(--shadow-sm);

    /* 5. Otros */
    cursor: pointer;
    transition: var(--transition);
}
```

### Convenciones de Contenido HTML {#convenciones-contenido}

#### Sistema de Instrucciones `## texto ##`
**Propósito**: Diferenciar instrucciones para Pepe (profesional) de placeholders rellenables.

**Formato**:
```html
<!-- Instrucción para Pepe (texto explicativo) -->
<p class="card-text">
    ## Descripción breve del servicio. Ejemplo: "Sesión personalizada de 60 minutos para resolver tu desafío principal". ##
</p>

<!-- Placeholder rellenable -->
<h3 class="card-title">[Título del Servicio]</h3>
```

**Diferencia**:
- `## texto ##` = Instrucción/guía para Pepe sobre qué escribir
- `[Texto]` = Placeholder que Pepe debe reemplazar directamente

**Aplicado en**: `index.html` (33 instrucciones), próximamente en otros archivos HTML.

#### Sistema de Truncamiento con Ellipsis
**Propósito**: Blindar tarjetas contra textos largos. Teresa ve "..." y hace clic en "Ver Detalles".

**Clases con truncamiento automático**:
```css
.card-text               /* 4 líneas máximo */
.blog-excerpt            /* 3 líneas máximo */
.testimonial-text        /* 5 líneas máximo */
.community-description   /* 4 líneas máximo */
```

**Implementación CSS** (`styles.css`):
```css
.card-text {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
```

**Flujo de información**:
1. **index.html** = Resumen truncado con "..." + botón "Ver Detalles →"
2. **catalogo.html** = Contenido completo sin límites

#### Patrón "Primer Nombre" en UI
**Propósito**: Mostrar solo el primer nombre del usuario en header/área privada, nombre completo solo en cuenta.

**Ubicaciones**:
- **Header** (todas las páginas): Solo primer nombre
- **Área Privada**: Solo primer nombre
- **cuenta.html**: Nombre completo

**Función auxiliar** (`js/auth.js` líneas 11-15):
```javascript
function obtenerPrimerNombre(nombreCompleto) {
    if (!nombreCompleto) return '';
    return nombreCompleto.trim().split(' ')[0];
}
```

**Uso**:
```javascript
// En main.js (header)
const primerNombre = obtenerPrimerNombre(usuario.nombre);
userNameHeader.textContent = primerNombre;

// En area-privada.html
const primerNombre = obtenerPrimerNombre(usuario.nombre);
document.getElementById('userNameDisplay').textContent = primerNombre;

// En cuenta.html (SIN usar la función)
document.getElementById('userName').textContent = usuario.nombre; // Nombre completo
```

#### Patrón "Red Antifuga" (Módulo Final index.html)
**Propósito**: Retener al 90% de visitantes que abandonan sin comprar mediante oferta de bajo riesgo.

**Decisión DM1** (23-Nov-2025): Conversión de escépticos con guardrails estrictos.

**Restricciones Duras** (Dashboard):
- **Título Blindado**: Dropdown con 3 opciones de copywriting (NO campo libre)
- **Enlace Fijo**: Botón apunta obligatoriamente a `/contacto-agenda.html` (NO editable)
- **Micro-copy Educativo**: Advertencia visible - "Usa SOLO para conversación de bajo riesgo, NO vender aquí"

**Estructura HTML** (`index.html` líneas ~739-760):
```html
<!-- RED ANTIFUGA: ÚLTIMA OPORTUNIDAD DE RETENCIÓN -->
<section class="section section-alt">
    <div class="container">
        <div style="text-align: center; max-width: 800px; margin: 0 auto;">
            <p class="section-subtitle">[Pregunta Pre-CTA (opcional)]</p>
            <h2 class="section-title">[Red Antifuga: Última Oportunidad de Retención]</h2>
            <p class="section-description">
                ##El 90% de las visitas abandonan la web sin comprar.
                Usa esta sección para detener esa fuga ofreciendo una
                conversación de bajo riesgo (gratis y breve) para resolver dudas.
                No intentes vender aquí.##
            </p>
            <a href="contacto-agenda.html" class="btn btn-primary btn-large">
                [CTA de Retención]
            </a>
        </div>
    </div>
</section>
```

**Razón Estratégica**: Maximizar captura de leads cualificados que de otro modo abandonarían. El túnel único y título restringido fuerzan a "Pepe" a ofrecer valor (llamada/auditoría gratuita) vs. venta agresiva.

---

## ✅ OPTIMIZACIONES IMPLEMENTADAS {#optimizaciones}

### Optimización #1: Limpieza de Deuda Técnica (CSS Refactoring)
**Fecha**: Implementada
**Archivos**: `styles.css`, `index.html`, `catalogo.html`

**Clases creadas**:
```css
/* Badges/Etiquetas */
.badge, .badge--evento, .badge--servicio, .badge--curso, .badge--ebook, .badge--categoria

/* Tarjetas */
.card--enhanced
.card-icon--primary, .card-icon--secondary, .card-icon--text, .card-icon--sage

/* Layouts */
.detail-grid-2col           /* grid 1fr 1fr */
.detail-grid-asymmetric     /* grid 2fr 1fr */
.flex-between               /* space-between con gap */
.flex-center-gap            /* centro con gap */

/* Secciones detalle */
.detail-section, .detail-box, .detail-box__content

/* Cajas */
.info-box, .info-box--small
.pricing-box
.image-placeholder, .image-placeholder__content

/* Precios */
.price, .price--large, .price--xlarge
.price--primary, .price--secondary, .price--text, .price--sage

/* Utilidades */
.mt-auto, .w-full, .text-center, .text-right
.list-unstyled, .divider, .h-400
.btn--with-arrow
.btn-compact                   /* Botón con padding reducido para tarjetas */
.hidden                        /* display: none para ocultar elementos */
.breadcrumbs                   /* Migas de pan para navegación */
.video-container               /* Contenedor responsive 16:9 para videos */
.hero-image-content            /* Contenido de imagen en hero section */
.card-link-action              /* Enlaces de texto en tarjetas (sin marco de botón) */

/* POST (publicacion.html) - Artículo Individual */
.post-layout, .post-header, .post-meta, .post-meta-divider
.post-title, .post-subtitle
.post-author, .post-author-avatar, .post-author-name, .post-author-role
.post-content                  /* Estilos para el cuerpo del artículo */
.post-footer, .post-share, .post-share-title
.post-author-box, .post-author-avatar-large, .post-author-name-large, .post-author-bio

/* POST - Escenario B: Imagen/Instagram */
.post-image-fullbleed          /* Contenedor de imagen full-width */
.post-image-caption            /* Caption opcional debajo de imagen */

/* POST - Escenario C: Documento PDF */
.post-document-card            /* Tarjeta elegante para documento PDF */
.document-icon                 /* Icono PDF (80x80px) */
.document-title                /* Título del documento */
.document-description          /* Descripción del documento */

/* POST - Hero Multimedia */
.audio-container               /* Contenedor para audio antes del título */
```

**Beneficios logrados**:
- ✅ Eliminados 150+ atributos `style=""` repetidos
- ✅ Código HTML 40% más limpio
- ✅ Mantenibilidad: cambiar estilo en 1 lugar vs 20
- ✅ Performance: CSS cacheado por navegador

---

### Optimización #2: Lazy Loading de Imágenes
**Fecha**: Implementada
**Archivos**: `index.html`, `catalogo.html`, `sobre-mi.html`

**Implementación**:
```html
<!-- Imágenes DEBAJO del fold (requieren scroll) -->
<img src="imagen.jpg" alt="Descripción" loading="lazy">

<!-- Imágenes ARRIBA del fold (visibles inmediatamente) -->
<img src="logo.jpg" alt="Logo">  <!-- Sin atributo = carga normal -->
```

**Regla de decisión**:
| Ubicación | Lazy Loading | Razón |
|-----------|-------------|-------|
| Hero imagen principal | ❌ NO | Crítica para LCP |
| Logo header | ❌ NO | Visible inmediato |
| Foto "Sobre Mí" (arriba) | ❌ NO | Above the fold |
| Imagen comunidad (abajo) | ✅ SÍ | Requiere scroll |
| Testimonios/eventos | ✅ SÍ | Muy abajo |
| Footer imágenes | ✅ SÍ | Final de página |

**Beneficios**:
- ✅ Mejora LCP (Largest Contentful Paint) → Mejor SEO
- ✅ Ahorro 40-60% ancho de banda en carga inicial
- ✅ Carga instantánea percibida
- ✅ Reduce costes de hosting (menos transferencia)

**Documentación**: Ver comentario líneas 19-59 de `index.html`

---

### Optimización #3: Abstracción de Colores (Whitelabel) ✅
**Estado**: ✅ FASE 1 COMPLETADA
**Fecha**: 2025-01-12
**Objetivo**: Habilitar cambio de marca automático (SaaS whitelabel)

**Implementación Fase 1**:

**Archivos modificados**:
- `css/styles.css` (líneas 2283-2315): 18 nuevas variables CSS
- `index.html`: 4 reemplazos (gradientes, textos apagados, mensajes error/éxito)
- `catalogo.html`: 2 reemplazos
- `sobre-mi.html`: 10+ reemplazos (incluye ajuste de --color-sage)

**Variables creadas**:
```css
/* Tintes claros (backgrounds iconos/tarjetas) */
--color-bg-primary-light: #eef2ff;
--color-bg-secondary-light: #fffbf0;
--color-bg-sage-light: #f0f5f1;
--color-bg-text-light: #f5f5f5;
--color-bg-neutral: #f9f9f9;
--color-bg-alt: #fafafa;

/* Colores funcionales (sistema) */
--color-success: #4CAF50;
--color-success-bg: #efe;
--color-success-dark: #3c3;
--color-error: #c33;
--color-error-bg: #fee;
--color-muted-text: #999;

/* Gradientes (placeholders) */
--gradient-placeholder-start: #f5f5f5;
--gradient-placeholder-end: #e0e0e0;
```

**Resultado**:
- ✅ **CERO colores HEX hardcoded** en HTML (verificado)
- ✅ **CERO colores HEX hardcoded** en CSS (solo en variables :root)
- ✅ Sistema 100% whitelabel-ready
- ✅ Cambiar 2 variables principales = toda la web cambia

**Próximas Fases**:
- **Fase 2**: JavaScript para generar tintes dinámicamente desde Dashboard
- **Fase 3**: Algoritmo de cálculo automático de colores derivados (lighten/darken)

---

### Optimización #4: Open Graph Protocol (SEO Social) ✅
**Estado**: ✅ COMPLETADA
**Fecha**: 2025-01-12
**Objetivo**: Habilitar marketing viral en redes sociales (WhatsApp, LinkedIn, Facebook)

**Problema identificado**:
- Enlaces compartidos aparecían como "texto gris triste"
- Sin imagen de preview = percepción de baja calidad
- CTR bajo en redes sociales (<3%)

**Implementación**:

**Archivos modificados**:
- `index.html` (líneas 1-104): Meta tags OG completos + instrucciones detalladas
- `sobre-mi.html` (líneas 1-45): Meta tags OG específicos para perfil
- `catalogo.html` (líneas 1-42): Meta tags OG para servicios
- `images/README-OG-IMAGES.md`: Guía completa de 400+ líneas

**Meta tags agregados**:
```html
<!-- Open Graph (Facebook, WhatsApp, LinkedIn) -->
<meta property="og:type" content="website">
<meta property="og:url" content="[URL]">
<meta property="og:title" content="[TÍTULO]">
<meta property="og:description" content="[DESCRIPCIÓN]">
<meta property="og:image" content="[URL]/images/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="es_ES">

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[TÍTULO]">
<meta name="twitter:image" content="[URL]/images/og-image.jpg">

<!-- SEO Adicional -->
<link rel="canonical" href="[URL]">
<meta name="author" content="[NOMBRE]">
<meta name="robots" content="index, follow">

<!-- Favicons -->
<link rel="icon" sizes="32x32" href="/favicon-32x32.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta name="theme-color" content="#c5d9e8">
```

**Imágenes OG requeridas** (pendientes de crear):
1. `og-image.jpg` (1200x630px) - Homepage
2. `og-image-sobre-mi.jpg` - Página Sobre Mí
3. `og-image-servicios.jpg` - Página Servicios

**Especificaciones imagen OG**:
- Dimensiones: 1200x630px (ratio 1.91:1)
- Formato: JPG (< 200KB) o PNG (< 300KB)
- Contenido: Foto profesional + Tagline + Logo
- Zona segura: Margen 150px lateral, 100px vertical

**Herramientas de validación**:
- Facebook Debugger: https://developers.facebook.com/tools/debug/
- LinkedIn Inspector: https://www.linkedin.com/post-inspector/
- Twitter Validator: https://cards-dev.twitter.com/validator
- Open Graph Checker: https://www.opengraph.xyz/

**Resultado esperado**:
- ✅ CTR +300% en WhatsApp
- ✅ CTR +260% en LinkedIn
- ✅ Percepción profesional automática
- ✅ Autoridad visual en redes (Pilar 1: Autoridad)
- ✅ Marketing viral habilitado (Pilar 3: Marketing)

**Pendiente para "Pepe"**:
1. Reemplazar todos los `[PLACEHOLDERS]` con información real
2. Crear 3 imágenes OG (usar Canva o Figma)
3. Subir imágenes a `/images/`
4. Validar en debuggers antes de campaña
5. Probar compartiendo link en WhatsApp

**Documentación completa**: Ver `images/README-OG-IMAGES.md`

---

### Optimización #5: Hero Section Flexible + Footer Compacto ✅
**Estado**: ✅ COMPLETADA
**Fecha**: 2025-11-21
**Objetivo**: Mejorar UX con contenedor hero multi-formato y reducir altura del footer

**Implementación Hero Section**:

**Archivos modificados**:
- `index.html` (líneas 226-246): Estructura hero flexible
- `css/styles.css` (líneas 438-477): Estilos para video e imagen

**Estructura HTML**:
```html
<div class="hero-image">
    <!-- Hijo A (Oculto): Contenedor de vídeo -->
    <div id="heroVideo" class="hidden video-container">
        <!-- iframe YouTube/Vimeo con proporción 16:9 -->
    </div>

    <!-- Hijo B (Visible): Imagen principal -->
    <div id="heroImage" class="hero-image-content">
        <!-- Contenido de imagen -->
    </div>
</div>
```

**CSS agregado**:
```css
.hero-image {
    border-radius: 15px;
    height: 450px;
    position: relative;
    box-shadow: var(--shadow-soft);
}

.video-container {
    position: relative;
    width: 100%;
    height: 100%;
    padding-bottom: 56.25%; /* Proporción 16:9 */
    border-radius: 15px;
    overflow: hidden;
}

.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 15px;
}

.hero-image-content {
    background: linear-gradient(135deg, var(--color-powder), var(--color-sand));
    border-radius: 15px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    /* ... más estilos ... */
}
```

**Beneficios**:
- ✅ Soporte nativo para video sin duplicar código
- ✅ Proporción 16:9 garantizada para videos
- ✅ Alternancia fácil entre imagen/video
- ✅ Sin necesidad de CSS adicional por página

---

**Implementación Footer Compacto**:

**Archivos modificados**:
- `index.html` (líneas 867-925): Estructura reorganizada
- `css/styles.css` (líneas 1750-1860): Estilos compactos

**Cambios realizados**:
- ✅ Eliminada sección "Acceso" (Login, Registro, Área de Miembros)
- ✅ Eliminados títulos de secciones (Navegación, Legal, Conecta)
- ✅ Reducido de 4 a 3 columnas
- ✅ Padding reducido: 2.5rem arriba, 1.5rem abajo
- ✅ Interlineado compacto: line-height 1.2 en enlaces
- ✅ Margin entre items: 0.25rem (antes 0.5rem)
- ✅ Iconos sociales: 38px (antes 45px)
- ✅ Max-width footer: 900px

**Estructura HTML**:
```html
<div class="footer-content">
    <div class="footer-section">
        <ul><!-- Enlaces navegación --></ul>
    </div>
    <div class="footer-section">
        <ul><!-- Enlaces legales --></ul>
    </div>
    <div class="footer-section">
        <p>Sígueme en redes sociales.</p>
        <div class="social-links"><!-- Iconos --></div>
    </div>
</div>
```

**Beneficios**:
- ✅ Altura reducida ~40%
- ✅ Más limpio y profesional
- ✅ Menos scroll innecesario
- ✅ Responsive mejorado (2 cols en tablet, 1 en móvil)

---

**Componentes Nuevos Agregados**:

**1. Enlaces de acción en tarjetas** (`.card-link-action`):
```html
<a href="#" class="card-link-action"><strong>[Ver detalles] →</strong></a>
```
```css
.card-link-action {
    display: inline-block;
    color: var(--color-text);
    text-decoration: none;
    font-size: 0.95rem;
    transition: var(--transition);
}

.card-link-action:hover {
    color: var(--color-primary);
    transform: translateX(3px);
}
```
**Uso**: Reemplaza botones `.btn` en tarjetas cuando se quiere menos peso visual

---

**2. Tarjetas de eventos con gradiente diferenciado**:
```css
.card.event-card {
    background: linear-gradient(135deg, rgba(212, 227, 237, 0.4), rgba(231, 221, 201, 0.4)) !important;
    border: 2px solid var(--color-sky) !important;
    height: 450px;
}
```
**Uso**: Diferencia visual entre tarjetas de Recursos y tarjetas de Eventos

---

**3. Sistema de centrado para grids con menos de 3 items**:
```css
.cards-grid {
    justify-content: center;
}

.blog-grid {
    justify-content: center;
}
```
**Uso**: Cuando hay 1-2 tarjetas, se centran horizontalmente en lugar de estirarse

---

## 📜 REGLAS DE NEGOCIO (DM1) {#reglas-dm1}

### Documento Maestro 1 - Restricciones Estratégicas

#### Pilar 1: Autoridad
- **SEO es prioridad**: Core Web Vitals debe ser excelente
- **Velocidad crítica**: LCP < 2.5s, FID < 100ms
- **Contenido optimizado**: Meta tags, alt texts, estructura semántica

#### Arquitectura Lean
- **Coste marginal ≈ 0**: No pagar por recursos no usados
- **Escalabilidad**: Diseño debe soportar 1000+ clientes sin modificación
- **Eficiencia**: Lazy loading, caching, optimización de imágenes

#### Simplicidad Radical
- **Whitelabel nativo**: Cambio de marca debe ser automático
- **Zero-config ideal**: Mínima configuración manual
- **Código predecible**: Convenciones sobre configuración

#### SaaS Multi-tenant
- **Preparado para multi-cliente**: Variables configurables
- **Aislamiento visual**: Cada cliente su paleta de colores
- **Dashboard-ready**: Todo parametrizable desde interfaz

---

## 🔑 DECISIONES TÉCNICAS CLAVE {#decisiones}

### ✅ Decisiones Confirmadas

#### 1. CSS Variables > Preprocessores
**Decisión**: Usar CSS variables nativas, NO SASS/LESS
**Razón**:
- Modificables en runtime (whitelabel dinámico)
- Sin compilación (simplicidad)
- Soporte nativo en todos los navegadores modernos

#### 2. Monolito CSS > Múltiples archivos
**Decisión**: Un solo `styles.css`
**Razón**:
- Menos peticiones HTTP
- Mejor caching
- Más fácil de mantener en proyecto pequeño/mediano

#### 3. Inline styles solo para JS-driven
**Decisión**: Evitar `style=""` salvo casos excepcionales
**Excepciones permitidas**:
- Estilos manipulados por JavaScript (ej: acordeones con `max-height`)
- Prototipos rápidos comentados con `<!-- TEMPORAL -->`
- Ajustes únicos no reutilizables (menos de 3 usos)

#### 4. Mobile First
**Decisión**: Diseño base para móvil, `@media` para desktop
```css
/* Base: móvil */
.card { width: 100%; }

/* Desktop */
@media (min-width: 768px) {
    .card { width: 50%; }
}
```

#### 5. Loading="lazy" por defecto (below fold)
**Decisión**: Todas las imágenes debajo del primer viewport llevan lazy loading
**Excepción**: Hero, logo, imágenes críticas para LCP

---

## 🔄 MIGRACIONES PENDIENTES {#migraciones}

### Tarjetas Legacy → Responsive (Fase 2/5)

**Fecha Inicio:** 24 de Noviembre de 2025
**Responsable:** Devito (con validación del Fundador)

#### 📊 Estado Actual

| Página | Clase Actual | Estado | Validado |
|--------|-------------|--------|----------|
| **catalogo.html** | `.card--fluid` + `.card-image-resource` | ✅ Migrado | ✅ 24-Nov-2025 |
| **index.html** | `.card` legacy (300px fijo) | ⏳ Pendiente | - |
| **presentacion-profesional.html** | Por auditar | ⏳ Pendiente | - |
| **blog.html** | Por auditar | ⏳ Pendiente | - |
| **membresia.html** | Por auditar | ⏳ Pendiente | - |
| **area-privada-*.html** | Por auditar | ⏳ Pendiente | - |
| **contacto-agenda.html** | Por auditar | ⏳ Pendiente | - |
| **cuenta.html** | Por auditar | ⏳ Pendiente | - |

#### 🎯 Objetivo de la Migración

**Problema:** Tarjetas con ancho fijo de 300px rompen en móviles pequeños (iPhone SE 320px).

**Solución:** Arquitectura responsive moderna con clases fluidas.

#### 📚 Clases Disponibles

**`.card` (Legacy - NO usar en código nuevo):**
```css
width: 300px;              /* Ancho fijo (problema en mobile) */
height: 550px;             /* Altura fija */
```
→ Mantener temporalmente para páginas no migradas
→ Deprecar cuando todas las páginas migren

**`.card--fluid` (Nueva - Usar en todas las migraciones):**
```css
width: 100%;               /* Fluida, ocupa todo el grid */
max-width: 400px;          /* Límite razonable en pantallas grandes */
height: auto;              /* Altura flexible según contenido */
min-height: 520px;         /* Altura mínima visual */
```
→ Responsive-first, mobile-safe
→ Compatible con grid adaptativo (280px min)

**`.card-image-header` (Legacy - NO usar en código nuevo):**
```css
padding-bottom: 56.25%;    /* Relación 16:9 responsive */
```
→ Mantener para páginas no migradas

**`.card-image-resource` (Nueva - Usar en catálogos/productos):**
```css
height: 200px;                         /* Desktop: 200px fijo */
width: calc(100% + 3rem);              /* Full bleed (sangra fuera del padding) */
filter: drop-shadow(...);              /* Efecto levitación (técnica Apple) */

@media (max-width: 480px) {
    height: 180px;                     /* Mobile: más bajo */
    width: calc(100% + 2rem);          /* Menor sangrado (evita overflow) */
}
```
→ Efecto "levitación" con `drop-shadow()` (respeta transparencia PNG)
→ Full bleed responsive (se adapta automáticamente en mobile)
→ Sin overflow horizontal en iPhone SE (320px)

#### 🔧 Pasos para Migrar una Página

1. **Auditoría:**
   - Abrir página HTML
   - Buscar todas las instancias de `class="card"`
   - Identificar si usa `.card-image-header`

2. **Cambios en HTML:**
   ```html
   <!-- ANTES -->
   <div class="card card--enhanced">
       <div class="card-image-header">
           <img src="..." alt="..." loading="lazy">
       </div>
   </div>

   <!-- DESPUÉS -->
   <div class="card--fluid card--enhanced">
       <div class="card-image-resource">
           <img src="..." alt="..." loading="lazy">
       </div>
   </div>
   ```

3. **Testing (CRÍTICO - NO SALTAR):**
   - Desktop (1920px): Verificar tarjetas max 400px, centradas
   - Tablet (768px): Verificar layout fluido
   - Mobile L (425px): Verificar sin overflow
   - Mobile S (320px): Verificar sin scroll horizontal
   - Hover: Verificar zoom solo en tarjeta (NO doble zoom imagen)

4. **Validación Visual:**
   - ✅ Tarjetas fluidas ocupan 100% del grid
   - ✅ Imágenes con efecto levitación (sombra visible)
   - ✅ Sin overflow horizontal en ningún breakpoint
   - ✅ Hover suave y elegante (solo tarjeta hace zoom)
   - ✅ Textos y botones alineados correctamente

5. **Documentar:**
   - Actualizar tabla "Estado Actual" en esta sección
   - Marcar página como ✅ Migrado + fecha de validación

#### ⚠️ Criterios de Éxito (Definición de "Done")

Una página está **migrada correctamente** cuando cumple:

1. ✅ Cero uso de `.card` legacy
2. ✅ Usa `.card--fluid` en todas las tarjetas
3. ✅ Imágenes de productos usan `.card-image-resource` (si aplica)
4. ✅ Sin overflow horizontal en iPhone SE (320px)
5. ✅ Hover funciona correctamente (solo zoom tarjeta)
6. ✅ Testeo visual completado en 4 breakpoints
7. ✅ Documentado en tabla de estado con fecha

#### 📝 Notas Técnicas

**Grid Ajustado (css/styles.css:803):**
```css
.cards-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}
```
→ Cambio de 320px → 280px para soportar móviles pequeños con tarjetas fluidas

**Hover Refinado (Decisión 24-Nov-2025):**
- ❌ NO usar doble zoom (tarjeta + imagen)
- ✅ Solo zoom en tarjeta completa (scale 1.03)
- ✅ Imagen solo intensifica sombra en hover

**Documentación CSS:**
- Sección completa en `css/styles.css:2629-2728`
- Comentarios explican cuándo usar cada clase
- Media queries documentadas para mobile (@480px)

#### 🚀 Próximas Acciones

1. **Prioridad 1:** Migrar `index.html` (sección "Destacados" línea ~321)
   - Actualmente usa `.card-image` con estilos inline
   - Unificar con `.card--fluid` + `.card-image-resource`

2. **Prioridad 2:** Auditar `presentacion-profesional.html`
   - Verificar si usa tarjetas
   - Migrar si es necesario

3. **Prioridad 3:** Páginas restantes (una por una)
   - Testing exhaustivo en cada migración
   - No migrar múltiples páginas sin validación previa

4. **Fase Final:** Deprecar `.card` legacy
   - Cuando TODAS las páginas migren
   - Eliminar código antiguo de `styles.css`
   - Actualizar CHULETA eliminando referencias legacy

---

## 📝 CHECKLIST: CREAR NUEVA PÁGINA HTML {#checklist}

### ✅ Estructura Base
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="[DESCRIPCIÓN SEO 150-160 caracteres]">
    <title>[TÍTULO] - Profesional Independiente</title>

    <!-- Fuentes de Google -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- CSS Principal -->
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>

    <!-- HEADER: Copiar de index.html (líneas 61-113) -->
    <header class="header" id="header">
        <!-- ... -->
    </header>

    <div class="nav-overlay" id="navOverlay"></div>

    <!-- CONTENIDO DE LA PÁGINA -->
    <section class="section">
        <div class="container">
            <!-- Tu contenido aquí -->
        </div>
    </section>

    <!-- FOOTER: Copiar de index.html (final del archivo) -->
    <footer class="footer">
        <!-- ... -->
    </footer>

    <!-- JavaScript -->
    <script src="js/main.js"></script>
</body>
</html>
```

### ✅ Checklist de Validación
- [ ] Meta description con 150-160 caracteres
- [ ] Title único y descriptivo
- [ ] Header y footer coherentes con el resto del sitio
- [ ] Usar clases CSS existentes (ver lista en [Optimización #1](#optimizaciones))
- [ ] Imágenes con `alt` descriptivos
- [ ] Imágenes debajo del fold con `loading="lazy"`
- [ ] NO usar colores HEX hardcoded (usar variables CSS)
- [ ] NO usar inline styles (salvo excepciones documentadas)
- [ ] Estructura semántica: `<section>`, `<article>`, `<aside>`
- [ ] Responsive: probar en móvil (320px), tablet (768px), desktop (1200px)
- [ ] Accesibilidad: contraste de colores > 4.5:1

---

## 🎨 COMPONENTES REUTILIZABLES {#componentes-reutilizables}

### Sistema de Iconografía SVG

**ESTÁNDAR OBLIGATORIO** (Feather Icons style):
- `fill="none"`
- `stroke="currentColor"`
- `stroke-width="2"`
- `stroke-linecap="round"`
- `stroke-linejoin="round"`
- `xmlns="http://www.w3.org/2000/svg"`
- `viewBox="0 0 24 24"`

**Razón**: Los iconos usan `stroke="currentColor"` para heredar color CSS automáticamente. Esto permite cambiar el color de cualquier icono modificando solo la propiedad `color` del elemento padre.

**Catálogo de Iconos Disponibles** (18 iconos únicos):

#### 1. Users (Grupo de personas)
```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
</svg>
```
**Uso**: Servicios 1:1, comunidad, acceso grupal

#### 2. Book-Open (Libro abierto)
```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
</svg>
```
**Uso**: Cursos, recursos educativos, programas

#### 3. Calendar (Calendario)
```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
</svg>
```
**Uso**: Eventos, talleres, fechas

#### 4. Star (Estrella)
```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
</svg>
```
**Uso**: Premium, favoritos, privilegios exclusivos

#### 5. Clock (Reloj)
```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
</svg>
```
**Uso**: Tiempo, disponibilidad, duración, Pomodoro timer

#### 6. Check-Circle (Verificado)
```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg>
```
**Uso**: Acceso confirmado, completado, verificación

#### 7. Settings/Sun (Ajustes)
```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"></path>
</svg>
```
**Uso**: Gestión de cuenta, configuración

#### 8. Message-Square (Mensaje)
```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
</svg>
```
**Uso**: Tablón de anuncios, chat, comunicación

#### 9. File-Text (Documento)
```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
</svg>
```
**Uso**: Recursos descargables, plantillas, ebooks, PDFs

#### 10. Play-Circle (Video)
```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polygon points="10 8 16 12 10 16 10 8"></polygon>
</svg>
```
**Uso**: Videos, masterclasses, contenido multimedia

#### 11. Headphones (Audio)
```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
</svg>
```
**Uso**: Podcast, audio, contenido sonoro

#### 12. Gift (Regalo / Lead Magnet)
```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="20 12 20 22 4 22 4 12"></polyline>
    <rect x="2" y="7" width="20" height="5"></rect>
    <line x1="12" y1="22" x2="12" y2="7"></line>
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
</svg>
```
**Uso**: Lead magnet, contenido gratuito, regalos

#### 13. Log-Out (Cerrar sesión)
```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
</svg>
```
**Uso**: Cerrar sesión en área privada

#### 14. Package (Productos / Cajas)
```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
</svg>
```
**Uso**: Productos, cajas de contenido, paquetes

**Iconos de Redes Sociales:**

#### 15. Facebook
```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
</svg>
```

#### 16. Instagram
```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
</svg>
```

#### 17. YouTube
```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
</svg>
```

#### 18. Mail (Email)
```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
</svg>
```

**Ejemplo de Uso con Color Heredado:**
```html
<!-- El icono hereda el color del elemento padre -->
<div class="card-icon" style="color: var(--color-primary);">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
</div>
```

**Tamaños Comunes:**
```css
/* Iconos pequeños (24px) - Default */
svg { width: 24px; height: 24px; }

/* Iconos medianos (32px) - Tarjetas */
.card-icon svg { width: 32px; height: 32px; }

/* Iconos grandes (48px) - Hero sections */
.icon-large svg { width: 48px; height: 48px; }
```

**❌ NUNCA hacer:**
- Usar `fill="currentColor"` (debe ser `fill="none"`)
- Cambiar `stroke-width` a valores diferentes de `2`
- Usar emojis en lugar de iconos SVG
- Hardcodear colores en el SVG (`stroke="#000"`)

**✅ SIEMPRE hacer:**
- Copiar el SVG completo del catálogo anterior
- Usar `stroke="currentColor"` para heredar color CSS
- Mantener todos los atributos estándar
- Agregar iconos nuevos siguiendo el mismo patrón

---

### Tarjetas (Cards)
```html
<!-- Tarjeta estándar -->
<div class="card">
    <div class="card-icon card-icon--primary">
        <!-- SVG icon -->
    </div>
    <h3 class="card-title">Título</h3>
    <p class="card-text">Descripción</p>
</div>

<!-- Tarjeta mejorada con badge -->
<div class="card card--enhanced">
    <div class="badge badge--evento">📅 EVENTO</div>
    <div class="card-icon card-icon--primary">
        <!-- SVG icon -->
    </div>
    <h3 class="card-title">Título</h3>
    <p class="card-text">Descripción</p>
    <div class="mt-auto">
        <a href="#" class="btn btn-primary">Ver Detalles →</a>
    </div>
</div>

<!-- Tarjeta de evento con gradiente -->
<div class="card event-card">
    <div class="event-date">
        <span class="event-day">15</span>
        <span class="event-month">Enero</span>
    </div>
    <h3 class="card-title">Nombre del Evento</h3>
    <p class="card-text">Descripción del evento</p>
    <div class="mt-auto">
        <a href="#" class="card-link-action"><strong>[Ver detalles] →</strong></a>
    </div>
</div>
```

### Botones (Sistema Simplificado - 3 Estilos)

**IMPORTANTE**: Solo tenemos 3 estilos de botones. Elige según esta regla:
- ¿Es la acción principal? → `.btn-primary`
- ¿Es destructiva? → `.btn-danger`
- ¿Todo lo demás? → `.btn-secondary`

```html
<!-- PRIMARIO - Acción principal (CTA, conversión) -->
<a href="#" class="btn btn-primary">Agendar Sesión</a>
<a href="#" class="btn btn-primary btn-large">Comprar Ahora - €129</a>

<!-- SECUNDARIO - Acciones alternativas, navegación -->
<a href="#" class="btn btn-secondary">Conoce mi Método</a>
<button onclick="cerrarModal()" class="btn btn-secondary">Cancelar</button>

<!-- DANGER - Acciones destructivas/irreversibles (USAR CON PRECAUCIÓN) -->
<button onclick="eliminarCuenta()" class="btn btn-danger">Eliminar Cuenta</button>

<!-- Modificadores disponibles -->
<a href="#" class="btn btn-primary btn-large">Botón grande (hero CTAs)</a>
<a href="#" class="btn btn-primary btn-compact">Botón compacto (tarjetas)</a>
<a href="#" class="btn btn-primary w-full">Botón ancho completo (formularios)</a>
<button class="btn btn-primary" disabled>Botón deshabilitado</button>

<!-- Alternativa: Enlace de acción sin marco (más sutil) -->
<a href="#" class="card-link-action"><strong>[Ver detalles] →</strong></a>
```

**Matriz de Decisión:**
| Contexto | Botón |
|----------|-------|
| CTA principal (hero) | `.btn-primary .btn-large` |
| Acción formulario | `.btn-primary` |
| Cancelar/Volver | `.btn-secondary` |
| Eliminar/Cancelar suscripción | `.btn-danger` |
| Navegación | `.btn-secondary` |

**Colores:**
- Primario: Azul cielo (#c5d9e8) → Hover: Ocre (#e8d5c4)
- Secundario: Outline gris → Hover: Azul cielo relleno
- Danger: Rojo (#dc3545) → Hover: Rojo oscuro (#c82333)

**❌ Clases Obsoletas Eliminadas:**
- `.btn-cta` → Usar `.btn-primary`
- `.btn-glow` → Eliminado (efecto distractor)
- `.btn-small` → Usar `.btn` (tamaño base)
- `.btn--with-arrow` → Agregar `→` en el texto directamente

### Badges (Etiquetas de Categoría)

**IMPORTANTE**: Los badges diferencian **productos de pago** de **contenido gratuito**.

```html
<!-- PRODUCTOS DE PAGO (Oferta de Servicios) -->
<span class="badge badge--evento">EVENTO</span>      <!-- Azul cielo -->
<span class="badge badge--servicio">SERVICIO</span>  <!-- Gris oscuro -->
<span class="badge badge--curso">CURSO</span>        <!-- Ocre -->
<span class="badge badge--ebook">EBOOK</span>        <!-- Verde sage -->

<!-- CONTENIDO GRATUITO (Blog) -->
<span class="badge badge--categoria">GESTIÓN</span>  <!-- Azul suave -->
<span class="badge badge--categoria">ESTRATEGIA</span>
<span class="badge badge--categoria">MARKETING</span>
```

**Regla de Oro:**
- ¿Es un Producto que Teresa puede comprar? → Usa `.badge--curso`, `.badge--evento`, etc.
- ¿Es una Categoría de contenido gratuito (artículo de blog)? → Usa `.badge--categoria`

**Colores:**
- `badge--evento`: Azul cielo (var(--color-primary))
- `badge--servicio`: Gris oscuro (var(--color-text))
- `badge--curso`: Ocre (var(--color-secondary))
- `badge--ebook`: Verde sage (var(--color-sage))
- `badge--categoria`: Azul primario suave (rgba(197, 217, 232, 0.8)) con texto oscuro

### Grids de Tarjetas
```html
<!-- Grid de 3 columnas (responsive) -->
<div class="cards-grid">
    <div class="card">...</div>
    <div class="card">...</div>
    <div class="card">...</div>
</div>

<!-- Grid 2 columnas (detalle) -->
<div class="detail-grid-2col">
    <div>Contenido izquierda</div>
    <div>Contenido derecha</div>
</div>

<!-- Grid asimétrico (2fr 1fr) -->
<div class="detail-grid-asymmetric">
    <div>Contenido principal (más ancho)</div>
    <div>Sidebar (más estrecho)</div>
</div>
```

### Secciones de Detalle
```html
<section class="section section-alt detail-section">
    <div class="container">
        <div class="detail-box">
            <div class="detail-box__content">
                <!-- Contenido aquí -->
            </div>
        </div>
    </div>
</section>
```

### Pricing Boxes
```html
<div class="pricing-box">
    <p style="color: var(--color-text-light); margin-bottom: 0.5rem;">Inversión Única</p>
    <p class="price price--xlarge price--primary">€129</p>
    <a href="#" class="btn btn-primary w-full">Comprar Ahora</a>
    <p style="margin-top: 1rem; font-size: 0.8rem;">✓ Garantía de 15 días</p>
</div>
```

### Imágenes con Placeholder
```html
<div class="image-placeholder h-400">
    <!--
    INSTRUCCIÓN: Cuando tengas la imagen real, descomenta esta línea.
    NOTA: loading="lazy" porque está debajo del fold.
    -->
    <!-- <img src="ruta/imagen.jpg"
              alt="Descripción"
              loading="lazy"
              style="width: 100%; height: 100%; object-fit: cover;"> -->

    <!-- PLACEHOLDER TEMPORAL -->
    <div class="image-placeholder__content">
        <p style="margin: 0; font-size: 3rem; margin-bottom: 1rem;">📷</p>
        <p style="margin: 0; font-weight: 600;">Aquí va tu imagen real</p>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.85rem;">800x800px recomendado</p>
    </div>
</div>
```

---

## 🚨 ERRORES COMUNES A EVITAR

### ❌ NO HACER:
```css
/* NO: Color hardcoded */
.elemento { background: #eef2ff; }

/* NO: Magic numbers sin contexto */
.elemento { margin-top: 37px; }

/* NO: Selectores demasiado específicos */
.header .nav .menu li a.active { }

/* NO: !important (salvo casos extremos) */
.elemento { color: red !important; }
```

### ✅ SÍ HACER:
```css
/* SÍ: Variable CSS */
.elemento { background: var(--color-bg-primary-light); }

/* SÍ: Variable de espaciado */
.elemento { margin-top: var(--spacing-md); }

/* SÍ: Selectores simples y reutilizables */
.nav-link.active { }

/* SÍ: Especificidad natural */
.elemento { color: var(--color-error); }
```

---

## 🔧 HERRAMIENTAS Y TESTING

### Validación SEO
- **Lighthouse**: Chrome DevTools > Lighthouse
  - Performance: > 90
  - Accessibility: > 90
  - Best Practices: > 90
  - SEO: > 90

### Testing Responsive
- **Chrome DevTools**: F12 > Toggle device toolbar
- **Breakpoints clave**:
  - Mobile: 320px, 375px, 414px
  - Tablet: 768px, 1024px
  - Desktop: 1280px, 1440px, 1920px

### Validación HTML
- **W3C Validator**: https://validator.w3.org/
- **Objetivo**: 0 errores, warnings permitidos solo si justificados

### Testing Colores (Contraste)
- **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Mínimo**: 4.5:1 para texto normal, 3:1 para texto grande

---

## 📊 MÉTRICAS DE ÉXITO

### Core Web Vitals (Google)
| Métrica | Objetivo | Actual |
|---------|----------|--------|
| **LCP** (Largest Contentful Paint) | < 2.5s | ⏳ Medir |
| **FID** (First Input Delay) | < 100ms | ⏳ Medir |
| **CLS** (Cumulative Layout Shift) | < 0.1 | ⏳ Medir |

### Performance
| Métrica | Objetivo | Actual |
|---------|----------|--------|
| **Tamaño CSS** | < 100KB | ~60KB ✅ |
| **Tamaño HTML** | < 50KB/página | ~30KB ✅ |
| **Imágenes optimizadas** | < 200KB cada | ⏳ Pendiente |
| **Total carga inicial** | < 1MB | ⏳ Medir |

---

## 📚 RECURSOS Y REFERENCIAS

### Documentación Oficial
- **CSS Variables**: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
- **Lazy Loading**: https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading
- **Core Web Vitals**: https://web.dev/vitals/

### Inspiración de Diseño
- **Dribbble**: https://dribbble.com/tags/wellness
- **Awwwards**: https://www.awwwards.com/websites/holistic/

### Herramientas
- **Lighthouse**: Integrado en Chrome DevTools
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/

---

## 🔄 HISTORIAL DE CAMBIOS

### 2025-01-13 (Versión 1.8 - Integración membresia.html al proyecto)
- ✅ **PÁGINA NUEVA**: membresia.html auditada e integrada
  - Footer unificado agregado (82 líneas SVG + estructura 4 columnas)
  - Verificadas 4 optimizaciones: ✅ Todas cumplen
  - 0 colores HEX hardcoded (Opt #3)
  - Open Graph Protocol completo (Opt #4)
  - Clases CSS reutilizables del sistema (Opt #1)
  - Sin imágenes = Lazy loading N/A (Opt #2)
- ✅ **ARQUITECTURA**: Sales page vertical modelo "Club Privado"
  - 5 secciones: Hero Pertenencia → Stack Valor (4 pilares) → Sneak Peek → Pricing → FAQ
  - Integración Stripe/PayPal preparada (pendiente Fase 2)
  - 528 líneas totales (446 originales + 82 footer)
- 📊 Total páginas completas: 6/6 del sitio web
- 🎯 Objetivo: Habilitar monetización recurrente (MRR)

### 2025-11-15 (Versión 2.0 - Estandarización Navegación + UX Optimizations)
- ✅ **NAVEGACIÓN UNIFICADA**: Estandarizada en todas las 6 páginas HTML
  - Menú completo con 5 items: Inicio, Sobre Mí, Soluciones, Membresía, Contacto
  - Nomenclatura profesional unificada (eliminadas variantes inconsistentes)
  - Clase `active` agregada al link de la página actual
  - Eliminado enlace roto a `recursos.html` (página inexistente)
- ✅ **FOOTER UNIFICADO**: Corrección de inconsistencias
  - Reemplazado "Oferta de Servicios" → "Soluciones"
  - Reemplazado "Contacto y Agenda" → "Contacto"
  - Eliminado "Recursos/Blog" (planificado para Fase 2)
  - Estructura idéntica en todas las páginas
- ✅ **MEMBRESIA.HTML - UX IMPROVEMENTS**:
  - **Carrusel → Grid Flexbox 2x2**: Todos los privilegios visibles simultáneamente
  - **FAQ → Acordeón nativo**: Sistema `<details>` con indicadores +/−
  - **Eliminadas 80 líneas de JavaScript**: Código del carrusel removido
  - Mejor accesibilidad (semántica HTML5 nativa)
  - Mejor usabilidad móvil (no requiere navegación)
- ✅ **MENÚ HAMBURGUESA - FIX CRÍTICO**:
  - Corregido scroll horizontal: `right: -320px` (antes `-100%`)
  - Agregado `overflow-x: hidden` al body
  - Transición suave: `transition: right 0.3s ease`
  - Menú ya no expande el ancho de la página
- 📊 Archivos actualizados: 6 HTML + styles.css + CHULETA
- 🎯 Objetivo: Consistencia total, mejor UX, eliminación de código innecesario

### 2025-01-13 (Versión 1.7 - Rediseño contacto-agenda.html + Unificación Footer)
- ✅ **REDISEÑO COMPLETO**: contacto-agenda.html transformada a layout 2 columnas
  - Calendario a la izquierda (2fr, más ancho, borde destacado)
  - CTA Modal + Caja de Reglas a la derecha (1fr)
  - Recuadro CTA con gradiente, todo el bloque es botón clickeable
  - Altura sincronizada: 700px (Calendario = CTA + Reglas)
- ✅ **MODAL DE CONTACTO**: Formulario completo en popup
  - Dimensiones optimizadas: 650px × 92vh
  - Badge a la izquierda, X a la derecha (mejor aprovechamiento espacio)
  - Textarea con scroll automático (max-height: 200px)
  - Botón final FAQ ahora abre modal (antes hacía scroll)
- ✅ **FOOTER UNIFICADO**: Mismo footer en las 5 páginas principales
  - 4 columnas: Navegación, Servicios, Legal, Conecta
  - Iconos SVG profesionales (Instagram, Facebook, YouTube, Email)
  - Login/Registro en sección Legal
  - Documentación .model-description incluida
- ✅ **DOCUMENTACIÓN GENÉRICA**: Eliminadas categorías específicas
  - Ejemplos Caja de Reglas: 8 puntos genéricos (no Terapeuta/Coach/Consultor)
  - Ejemplos FAQ: 10 sugerencias genéricas aplicables a cualquier profesional
- 📊 Archivos actualizados: 5 HTML + styles.css
- 🎯 Objetivo: Diseño más limpio, modal strategy, consistencia total

### 2025-01-13 (Versión 1.6 - Auditoría y Corrección Estratégica)
- ✅ **CRÍTICO**: Unificada promesa de tiempo de respuesta a "24-48h laborables"
- ✅ **CRÍTICO**: Eliminado enlace "Blog" del menú (Fase 2, evita 404s)
- ✅ **UX**: Reemplazado placeholder técnico por CTA estratégico
- ✅ Documentada deuda técnica conocida (modales/headers duplicados)
- ✅ Decisión: Mantener arquitectura estática para MVP (velocidad > perfección)
- 📊 Archivos actualizados: 5 HTML principales + CHULETA
- 🎯 Impacto: Eliminadas 3 incoherencias críticas detectadas en auditoría

### 2025-01-13 (Versión 1.5 - Página contacto-agenda.html Híbrida)
- ✅ Creada nueva página `contacto-agenda.html` (Landing híbrida)
- ✅ Estrategia UX: "Red de Seguridad" (Si no reserva → Contacta)
- ✅ Layout asimétrico 2fr/1fr: Calendario + Formulario fallback
- ✅ CSS sticky solo en desktop (Mobile First: estático en móvil)
- ✅ Añadidos 145 líneas de CSS (styles.css:2720-2878)
- ✅ Actualizadas 5 páginas HTML con nueva navegación
- ✅ REEMPLAZA `agenda.html` y `contacto.html` (marcadas obsoletas)
- 📍 Ubicación CSS: Sección "PÁGINA CONTACTO-AGENDA" línea 2720
- 🎯 Objetivo: Maximizar conversión con doble vía de contacto
- 📊 Impacto: +40% conversión vs páginas separadas (estimado)

### 2025-11-12 (Versión 1.4 - presentacion-profesional.html Optimizada)
- ✅ Optimizadas 4/4 optimizaciones en presentacion-profesional.html
- ✅ Open Graph Protocol completo agregado (líneas 9-117)
- ✅ Colores HEX (#fdfdfd, #eee) → variables CSS
- ✅ Decidido: presentacion-profesional.html REEMPLAZA a sobre-mi.html
- ✅ Razón: Arquitectura modular superior (6 módulos con guías)
- ⚠️ Marcado sobre-mi.html como DEPRECATED
- ✅ Actualizada documentación (README, CHULETA)
- 📊 Total páginas optimizadas: 3/3 del MVP (100%)

### 2025-11-12 (Versión 1.3 - Inventario de Activos Creado)
- ✅ Creado INVENTARIO-ACTIVOS-ESPECIFICACIONES.md (documento maestro valoración)
- ✅ Consolidada información de DM1, CHULETA y "Previo de Inventario"
- ✅ Valoración de activos: €125K - €205K (conservadora)
- ✅ Documentados 732 horas de desarrollo senior
- ✅ KPIs y métricas del proyecto establecidas
- ✅ Roadmap Fases 2-4 definido
- ✅ Documento preparado para due diligence inversores

### 2025-01-12 (Versión 1.2 - Optimización #4 Completada)
- ✅ Implementada Optimización #4 (Open Graph Protocol)
- ✅ Agregados meta tags OG en 3 páginas HTML
- ✅ Agregados Twitter Cards y SEO adicional
- ✅ Creado README-OG-IMAGES.md (guía completa 400+ líneas)
- ✅ Sistema preparado para marketing viral en redes
- ✅ Documentación actualizada en CHULETA

### 2025-01-12 (Versión 1.1 - Optimización #3 Completada)
- ✅ Implementada Optimización #3 - Fase 1 (Abstracción de Colores)
- ✅ Creadas 18 variables CSS semánticas para tintes y colores funcionales
- ✅ Eliminados TODOS los colores HEX hardcoded de HTML
- ✅ Sistema 100% whitelabel-ready
- ✅ Actualizada documentación en CHULETA

### 2025-01-12 (Versión 1.0 - Inicial)
- ✅ Creado archivo CHULETA-DESARROLLO.md
- ✅ Documentadas Optimizaciones #1 y #2
- ✅ Definido sistema de colores
- ✅ Establecidas convenciones de código

---

## ⚠️ DEUDA TÉCNICA CONOCIDA

### **Decisión Arquitectónica: MVP Estático**
Este MVP se construyó intencionalmente sin sistema de componentes para mantener velocidad de desarrollo y evitar dependencias (Node.js, build tools, frameworks).

### **Elementos Duplicados (Aceptado para MVP)**

#### 1. **Modales de Autenticación** 🔴 ALTA PRIORIDAD
**Problema**: Los modales de Login y Registro están duplicados en 5 archivos HTML:
- `index.html` (líneas 909-1070)
- `presentacion-profesional.html` (líneas 435-596)
- `catalogo.html` (líneas 404-565)
- `contacto-agenda.html` (líneas 352-513)
- `area-privada.html` (líneas modales)

**Impacto**:
- ❌ Viola principio DRY (Don't Repeat Yourself)
- ❌ Cambiar un modal requiere actualizar 5 archivos
- ❌ Alto riesgo de inconsistencias

**Solución Fase 2**:
- **Opción A**: Sistema de componentes (React, Vue, Svelte)
- **Opción B**: Templating server-side (Handlebars, EJS, Nunjucks)
- **Opción C**: Web Components nativos + JS injection
- **Opción D**: SSG (Static Site Generator) como Astro, 11ty

**Esfuerzo estimado**: 8-12 horas de refactoring

#### 2. **Header/Footer Duplicados** 🟡 MEDIA PRIORIDAD
**Problema**: Header y Footer copiados en cada archivo HTML.

**Impacto**: Similar a modales, requiere actualización manual en múltiples archivos.

**Solución Fase 2**: Misma que modales.

### **Decisiones de Producto**

#### 3. **Blog/Recursos en Fase 2** ✅ RESUELTO
**Decisión**: Enlaces a "Blog/Recursos" eliminados del menú y footers (2025-11-15).

**Razón**: El blog está planificado para Fase 2 según DM1. No mostrar enlaces a páginas inexistentes.

**Archivos afectados**: 6 archivos HTML principales (última limpieza en v2.0).

#### 4. **Promesa de Tiempo de Respuesta Unificada** ✅ RESUELTO
**Decisión**: Estandarizada a **"24-48h laborables"** en todos los puntos de contacto (2025-01-13).

**Razón**:
- Profesional independiente necesita margen realista
- Superar expectativas > Romper promesas
- Protección contra festivos/fines de semana

### **Próxima Revisión de Deuda Técnica**
📅 **Fecha recomendada**: Al iniciar Fase 2 (Post-MVP)
🎯 **Objetivo**: Evaluar migración a sistema de componentes vs. mantener arquitectura actual

---

## 🎯 PRÓXIMOS PASOS

### Inmediatos (Esta Sesión)
- [ ] Implementar Optimización #3 (Abstracción de Colores)
- [ ] Crear variables para tintes claros
- [ ] Reemplazar colores hardcoded en CSS
- [ ] Reemplazar colores hardcoded en HTML

### Corto Plazo (Próximas Sesiones)
- [ ] Optimización #4 (si existe)
- [ ] Testing completo en múltiples navegadores
- [ ] Validación Lighthouse > 90 en todas las métricas
- [ ] Optimización de imágenes reales (cuando se agreguen)

### Medio Plazo (Futuro Dashboard)
- [ ] JavaScript para generación dinámica de colores
- [ ] Sistema de tintes automáticos (lighten/darken)
- [ ] Panel de configuración de marca (whitelabel)
- [ ] Preview en tiempo real de cambios de color

---

## 💡 NOTAS FINALES

### Para Desarrolladores Futuros
Este proyecto está diseñado para **escalar a SaaS multi-tenant**. Cada decisión técnica prioriza:
1. **Configurabilidad**: Todo debe ser parametrizable
2. **Consistencia**: Convenciones estrictas
3. **Performance**: Optimizado desde el inicio
4. **Mantenibilidad**: Código limpio y documentado

### Para "Pepe" (Editor de Contenidos)
Los comentarios HTML `<!-- INSTRUCCIÓN: ... -->` son tus guías. No necesitas saber CSS para:
- Agregar imágenes (solo descomenta la línea)
- Cambiar textos (están marcados con `[Texto Aquí]`)
- Entender qué hace cada sección (comentarios explicativos)

---

**📅 Última actualización**: 2025-01-13
**👤 Autor**: Claude (Asistente IA)
**📄 Versión**: 1.8
**🔒 Estado**: Documento vivo (actualizar con cada optimización)
**📊 Documentos Relacionados**:
- INVENTARIO-ACTIVOS-ESPECIFICACIONES.md (valoración y due diligence)
- Documento Maestro 1.txt (decisiones estratégicas)
- README-OG-IMAGES.md (guía marketing visual)

---

## 🧠 LECCIONES APRENDIDAS Y PATRONES DE TRABAJO

### 📝 Patrón: Búsqueda y Reemplazo Masivo
**Contexto**: Optimización #3 - Necesitábamos reemplazar colores HEX en múltiples archivos

**Flujo exitoso**:
1. **Inventariar primero**: Usar `Grep` con regex `#[0-9a-fA-F]{3,6}` para encontrar TODOS los colores
2. **Agrupar por contexto**: No todos los HEX son iguales (algunos son decorativos, otros funcionales)
3. **Crear variables semánticas**: Nombres descriptivos (`--color-muted-text` mejor que `--color-gray-light`)
4. **Reemplazar archivo por archivo**: No hacer todo de golpe (facilita debugging)
5. **Verificar al final**: `grep | wc -l` para confirmar resultado = 0

**Comando útil**:
```bash
# Buscar colores HEX en archivos específicos
grep -r "#[0-9a-fA-F]\{3,6\}" index.html catalogo.html sobre-mi.html

# Contar ocurrencias
grep -r "#[0-9a-fA-F]\{3,6\}" *.html | wc -l
```

---

### 🔧 Patrón: Actualización de Variable CSS Global
**Contexto**: Descubrimos que `--color-sage` tenía valor inconsistente entre archivos

**Solución aplicada**:
```css
/* ANTES: Un solo valor para sage */
--color-sage: #8d998e;

/* DESPUÉS: Dos variantes para flexibilidad */
--color-sage: #6B9080;       /* Principal (usado en sobre-mi) */
--color-sage-alt: #8d998e;   /* Alternativo (preservado para compatibilidad) */
```

**Lección**: Cuando un color tiene múltiples usos, mejor crear variantes que forzar un solo valor.

---

### 📐 Patrón: Nomenclatura de Variables CSS
**Buenas prácticas aplicadas**:

```css
/* ✅ BIEN: Semántico + Contexto + Variante */
--color-bg-primary-light     /* Fondo / Primario / Claro */
--color-success-bg           /* Color / Éxito / Fondo */
--gradient-placeholder-start /* Tipo / Uso / Posición */

/* ❌ MAL: Genérico sin contexto */
--light-blue
--gray-1
--background-color
```

**Estructura recomendada**: `--{tipo}-{contexto}-{variante}`
- **Tipo**: color, gradient, shadow, spacing
- **Contexto**: primary, error, success, muted, bg
- **Variante**: light, dark, alt, start, end

---

### 🎯 Patrón: Implementación de Optimizaciones
**Flujo que funcionó en Opt. #3**:

1. **TodoWrite al inicio**: Crear lista de tareas clara
2. **Dividir en fases pequeñas**: CSS primero, luego HTML uno a uno
3. **Marcar completadas inmediatamente**: No acumular, actualizar en tiempo real
4. **Verificar con comandos**: No confiar en inspección visual, usar `grep`
5. **Documentar en Chuleta**: Actualizar MIENTRAS trabajas, no al final

**Anti-patrón a evitar**:
- ❌ Intentar hacer todo en un solo Edit
- ❌ No verificar resultados intermedios
- ❌ Documentar al final (se olvidan detalles)

---

### 🔍 Patrón: Debugging de Edit Fallidos
**Problema frecuente**: `String to replace not found in file`

**Soluciones**:
1. **Leer contexto exacto**: Usar `Read` con offset para ver líneas exactas
2. **Buscar con Grep**: Verificar que el string existe tal cual
3. **Usar replace_all**: Cuando hay múltiples ocurrencias idénticas
4. **Ajustar whitespace**: Tabs vs espacios pueden causar fallos

**Ejemplo real** (Optimización #3):
```bash
# Problema: No encontraba el string con múltiples líneas
# Solución: Usar replace_all con string corto único
Edit(replace_all=true, old_string="background: #6B9080;", ...)
# ✅ Reemplazó 4 ocurrencias en una sola operación
```

---

### 📊 Patrón: Verificación de Completitud
**Checklist post-optimización**:

```bash
# 1. Verificar que no quedan HEX hardcoded
grep -r "#[0-9a-fA-F]\{3,6\}" *.html | wc -l  # Debe ser 0

# 2. Verificar que variables existen en CSS
grep "var(--color-" *.html  # Deben encontrarse muchas

# 3. Verificar que :root está completo
grep "^:root" -A 50 css/styles.css  # Ver todas las variables

# 4. Revisar archivos modificados
git status  # Ver qué cambió

# 5. Contar variables creadas
grep "^    --color-" css/styles.css | wc -l  # Contar nuevas
```

---

### 💡 Patrón: Manejo de Colores Específicos de Página
**Problema**: sobre-mi.html usaba `#6B9080` en muchos lugares, pero no era el `--color-sage` original

**Opciones consideradas**:
1. ❌ Forzar que todos usen el sage original (#8d998e)
2. ❌ Crear variable específica `--color-sage-sobre-mi`
3. ✅ **Actualizar el sage principal** y crear `--color-sage-alt` para casos especiales

**Decisión**: Opción 3
- Más limpio semánticamente
- El #6B9080 es más representativo del "sage" visual
- Mantiene compatibilidad con `--color-sage-alt`

**Regla derivada**: Si un color se usa 5+ veces, probablemente debería ser la variante principal.

---

### 🎨 Patrón: Tintes Claros para Fondos de Iconos
**Problema**: Los iconos tenían fondos con tintes al 10% del color principal

**Solución implementada**:
```css
/* Color principal */
--color-primary: #c5d9e8;  /* Azul */

/* Tinte claro (10% opacidad aproximada) */
--color-bg-primary-light: #eef2ff;  /* Azul muy claro */
```

**Matemática detrás** (para Fase 2):
```javascript
// Función para calcular tinte claro automáticamente
function lighten(color, percent) {
    const rgb = hexToRgb(color);
    return rgbToHex({
        r: rgb.r + (255 - rgb.r) * percent / 100,
        g: rgb.g + (255 - rgb.g) * percent / 100,
        b: rgb.b + (255 - rgb.b) * percent / 100
    });
}

// Uso:
lighten('#c5d9e8', 40);  // → #eef2ff aproximadamente
```

---

### 📦 Patrón: Organización de Variables en :root
**Estructura aplicada** (líneas 2283-2315):

```css
:root {
    /* === SECCIÓN 1: COLORES BASE === */
    /* Configurables por el usuario en Dashboard */

    /* === SECCIÓN 2: TINTES CLAROS === */
    /* Derivados automáticamente (Fase 2) */

    /* === SECCIÓN 3: COLORES FUNCIONALES === */
    /* Estados del sistema (error, success) */

    /* === SECCIÓN 4: GRADIENTES === */
    /* Efectos visuales específicos */
}
```

**Beneficio**: Fácil de mantener y expandir. Cada sección tiene propósito claro.

---

### 🚀 Patrón: Commit Strategy (Para futuras optimizaciones)
**Recomendación basada en esta sesión**:

```bash
# Commit 1: Variables CSS
git add css/styles.css
git commit -m "Opt #3: Agregar variables CSS semánticas para whitelabel"

# Commit 2: Limpiar index.html
git add index.html
git commit -m "Opt #3: Reemplazar colores HEX por variables en index.html"

# Commit 3: Limpiar catalogo.html
git add catalogo.html
git commit -m "Opt #3: Reemplazar colores HEX por variables en oferta-servicios"

# Commit 4: Limpiar sobre-mi.html
git add sobre-mi.html
git commit -m "Opt #3: Reemplazar colores HEX por variables en sobre-mi"

# Commit 5: Documentación
git add CHULETA-DESARROLLO.md
git commit -m "Opt #3: Actualizar documentación whitelabel en Chuleta"
```

**Ventaja**: Si algo falla, puedes revertir commits específicos sin perder todo el trabajo.

---

### 🔒 Patrón: Validación de localStorage (Bug del 23-Nov-2025)
**Contexto**: Usuarios autenticados (Ana nivel 3, Regina nivel 2) eran redirigidos incorrectamente a `index.html` al intentar acceder a `area-privada.html`.

**Problema raíz (RESUELTO):**
- **`crear-usuarios-prueba.html` se abría con doble clic** → Protocolo `file:///C:/Users/.../`
- **`index.html` se abría con Live Server** → Protocolo `http://127.0.0.1:5500/`
- **Navegadores separan localStorage por protocolo** → Dos bases de datos diferentes
- Ana y Regina se creaban correctamente (nivel 3 y 2) pero en el localStorage de `file://`
- La web en `http://` tenía usuarios viejos con nivel 1 (gratuito)

**Síntomas:**
- Usuarios "desaparecen" después de crearlos
- Ana/Regina redirigen a index.html (area-privada.html detecta nivel 1 y los echa)
- Actualizar manualmente en consola funciona (porque se hace en el localStorage correcto)

**Solución DEFINITIVA:**
```markdown
⚠️ CRÍTICO: SIEMPRE usar Live Server para abrir archivos HTML del proyecto

✅ CORRECTO:
1. Clic derecho en crear-usuarios-prueba.html → "Open with Live Server"
2. URL: http://127.0.0.1:5500/crear-usuarios-prueba.html
3. Clic en "✅ Crear Usuarios de Prueba"
4. Ir a http://127.0.0.1:5500/index.html

❌ INCORRECTO:
- Doble clic en crear-usuarios-prueba.html (abre como file://)
- Los usuarios creados NO estarán disponibles en la web
```

**Fix secundario aplicado en `js/area-privada.js`:**
Las funciones `simularMejoraPremium()`, `simularComprador()` y `volverGratuito()` tenían un bug:
- Solo actualizaban `usuarioActual` en localStorage
- NO actualizaban la lista de usuarios
- Al cerrar sesión y volver a entrar, cargaba datos viejos

```javascript
// ✅ CORRECTO: Actualizar AMBOS lugares
window.simularMejoraPremium = function() {
    const usuario = obtenerUsuarioActual();
    usuario.tipoUsuario = 'miembro';
    usuario.nivel = 3;
    guardarUsuarioActual(usuario);

    // CRÍTICO: Actualizar también en la lista
    const usuarios = obtenerUsuarios();
    const index = usuarios.findIndex(u => u.id === usuario.id);
    if (index !== -1) {
        usuarios[index].tipoUsuario = 'miembro';
        usuarios[index].nivel = 3;
        guardarUsuarios(usuarios);
    }
};
```

**Lecciones aprendidas**:
1. **localStorage es específico por PROTOCOLO** (`file://` ≠ `http://`)
2. **SIEMPRE usar Live Server** en desarrollo local
3. **Funciones que modifican usuarios deben actualizar AMBOS lugares**: `usuarioActual` + lista `usuarios`
4. **NUNCA asumir que crear-usuarios-prueba.html generaba datos corruptos** - verificar primero si el problema es de aislamiento de datos

**Comando de debug**:
```javascript
// En consola del navegador, verificar usuarios
console.log('Usuario actual:', JSON.parse(localStorage.getItem('usuarioActual')));
console.log('Lista usuarios:', JSON.parse(localStorage.getItem('usuarios')));

// Verificar que Ana/Regina tienen los niveles correctos
const usuarios = JSON.parse(localStorage.getItem('usuarios'));
console.log('Ana:', usuarios.find(u => u.email === 'ana@test.com'));
console.log('Regina:', usuarios.find(u => u.email === 'regina@test.com'));
```

**Aplicado en**:
- `js/area-privada.js` (funciones de simulación corregidas)
- **Procedimiento de trabajo**: Documentado uso obligatorio de Live Server

---

## 📄 publicacion.html - Plantilla de Artículo Individual (VERSIÓN INTELIGENTE)

### Arquitectura
**Layout**: Columna central única (max-width: 800px) estilo Medium/Substack
**Lead Magnet**: Al final del contenido ("Cierre Perfecto"), NO en sidebar sticky
**Fecha**: Oculta por defecto con clase `.hidden` para atemporalidad
**Contenido Adaptable**: 3 escenarios según tipo de publicación

### 🎯 Los 3 Escenarios de Contenido

#### ESCENARIO A: Texto/Estándar (DEFAULT - Activo)
**Usar para:** Artículos de blog, tutoriales, casos de estudio, análisis
**Qué incluye:** Título + metadata + cuerpo con texto + imágenes intercaladas

```html
<article class="post-content">
    <p>Párrafo introductorio...</p>
    <h2>Subtítulo</h2>
    <p>Más contenido...</p>
    <blockquote>Cita destacada</blockquote>
</article>
```

#### ESCENARIO B: Solo Imagen/Instagram (Comentado)
**Usar para:** Posts visuales, infografías, quotes visuales, contenido tipo Instagram/Pinterest
**Qué incluye:** Imagen a ancho completo + caption opcional
**NUNCA texto adicional** - la imagen ES el contenido

```html
<!-- Comentar el <article> del Escenario A y descomentar esto: -->
<div class="post-image-fullbleed">
    <img src="images/post-visual.jpg" alt="Descripción">
    <p class="post-image-caption">[Caption opcional]</p>
</div>
```

#### ESCENARIO C: Documento PDF (Comentado)
**Usar para:** Whitepapers, guías descargables, ebooks, reportes, recursos
**Qué incluye:** Tarjeta elegante con icono PDF + título + descripción + botón de descarga
**IMPORTANTE:** NUNCA usar `<iframe>` para PDFs (mala UX móvil)

```html
<!-- Comentar el <article> del Escenario A y descomentar esto: -->
<div class="post-document-card">
    <div class="document-icon">
        <svg><!-- Icono PDF --></svg>
    </div>
    <h3 class="document-title">[Título del Documento]</h3>
    <p class="document-description">[Descripción del valor]</p>
    <a href="documents/archivo.pdf" target="_blank" class="btn btn-primary btn-large">
        📄 Leer Documento ↗
    </a>
</div>
```

### Componentes Clave

#### 1. Hero Multimedia (ANTES del título - Opcional)
```html
<!-- HERO Video (YouTube/Vimeo) -->
<div class="video-container" style="margin-bottom: 2rem;">
    <iframe src="https://www.youtube.com/embed/VIDEO_ID"></iframe>
</div>

<!-- HERO Audio (Podcast/Interview) -->
<div class="audio-container" style="margin-bottom: 2rem;">
    <audio controls style="width: 100%;">
        <source src="audio.mp3" type="audio/mpeg">
    </audio>
</div>

<!-- HERO Imagen -->
<div class="image-placeholder h-400" style="margin-bottom: 2rem;">
    <!-- Imagen hero -->
</div>
```

#### 2. Header con Autenticación
```html
<!-- IGUAL que blog.html - Incluye authButtons y userProfile -->
<div class="auth-buttons" id="authButtons">...</div>
<div class="user-profile" id="userProfile">...</div>
```

#### 3. Breadcrumbs (Migas de Pan)
```html
<nav class="breadcrumbs">
    <a href="index.html">Inicio</a>
    <span>›</span>
    <a href="blog.html">Blog</a>
    <span>›</span>
    <span style="color: var(--color-text);">[Título del Artículo]</span>
</nav>
```

#### 4. Metadata del Post
```html
<div class="post-meta">
    <span class="badge badge--categoria">GESTIÓN</span>  <!-- NO usar badge--curso -->
    <span class="post-meta-divider">·</span>
    <!-- Fecha OCULTA por defecto -->
    <time datetime="2025-11-18" class="hidden">18 de Noviembre, 2025</time>
    <span class="post-meta-divider hidden">·</span>
    <span>Lectura de 7 min</span>
</div>
```

#### 5. Lead Magnet al Final
```html
<!-- Después de CUALQUIER escenario, ANTES del post-footer -->
<div class="lead-magnet-container">
    <h3>📥 ¿Te gustó este contenido?</h3>
    <p>La Guía Completa te va a encantar. Descárgala gratis 👇</p>
    <form class="lead-magnet-form" id="postLeadMagnetForm">
        <!-- Formulario horizontal con checkbox toggle -->
    </form>
</div>
```

### Clases CSS Específicas
```css
/* Base Post */
.post-layout, .post-header, .post-meta, .post-meta-divider
.post-title, .post-subtitle
.post-author, .post-author-avatar, .post-author-name, .post-author-role
.post-content              /* Cuerpo del artículo (1.1rem serif) */
.post-footer, .post-share, .post-share-title
.post-author-box, .post-author-avatar-large, .post-author-name-large, .post-author-bio

/* Utilidades */
.breadcrumbs               /* Migas de pan */
.video-container           /* Contenedor responsive 16:9 */
.audio-container           /* Contenedor para audio */
.badge--categoria          /* Badge para contenido gratuito (azul suave) */

/* Escenario B: Imagen */
.post-image-fullbleed      /* Contenedor de imagen full-width */
.post-image-caption        /* Caption opcional debajo de imagen */

/* Escenario C: PDF */
.post-document-card        /* Tarjeta elegante para PDF */
.document-icon             /* Icono PDF (80x80px) */
.document-title            /* Título del documento (1.8rem serif) */
.document-description      /* Descripción del valor (1.1rem) */
```

### Reglas Críticas

**❌ NO hacer:**
- Sidebar sticky persiguiendo al usuario (molesto)
- Usar `badge--curso` para categorías de blog (confunde productos/contenido)
- Mostrar fecha por defecto (rompe atemporalidad)
- Layout multi-columna (dificulta legibilidad)
- Usar `<iframe>` para PDFs (mala UX en móvil)
- Mezclar escenarios (usar SOLO uno a la vez)

**✅ SÍ hacer:**
- Hero multimedia ANTES del título si aplica
- Lead magnet SOLO al final como recompensa
- Badge `--categoria` para artículos gratuitos
- Fecha oculta con `.hidden` + comentario explicativo
- Header completo con autenticación (continuidad de sesión)
- Breadcrumbs para navegación contextual
- Elegir UN escenario según tipo de contenido
- PDF con tarjeta + botón `target="_blank"`

### Estrategia UX: "El Cierre Perfecto"
1. **Inicio**: [Hero opcional] + Título + Metadata sin distracciones
2. **Medio**: Contenido limpio (Escenario A, B o C)
3. **Final**: Lead magnet como recompensa natural ("Si te gustó...")

**Impacto**: Respeta la Autoridad (Pilar 1 DM1), convierte sin ser molesto, se adapta al tipo de contenido

---

## 🆘 AYUDA RÁPIDA

### ¿Dónde encuentro...?
- **Colores disponibles**: Sección [Sistema de Colores](#colores) (líneas 2283-2315 de styles.css)
- **Clases CSS**: Sección [Optimización #1](#optimizaciones) (líneas 2317+ de styles.css)
- **Componentes HTML**: Sección [Componentes Reutilizables](#componentes-reutilizables)
- **Reglas de negocio**: Sección [Reglas de Negocio (DM1)](#reglas-dm1)
- **Patrones de trabajo**: Sección [Lecciones Aprendidas](#lecciones-aprendidas)
- **Valoración de activos**: Ver INVENTARIO-ACTIVOS-ESPECIFICACIONES.md
- **Roadmap completo**: Ver INVENTARIO-ACTIVOS-ESPECIFICACIONES.md (Sección 9)

### ¿Cómo...?
- **¿Crear nueva página?**: Ver [Checklist](#checklist)
- **¿Cambiar colores?**: Modificar variables en `:root` del `styles.css` (línea 2283)
- **¿Agregar imagen?**: Ver [Componentes > Imágenes](#componentes-reutilizables)
- **¿Crear tarjeta?**: Ver [Componentes > Tarjetas](#componentes-reutilizables)
- **¿Buscar colores HEX?**: `grep -r "#[0-9a-fA-F]\{3,6\}" *.html`
- **¿Agregar nueva variable CSS?**: Añadir en bloque `:root` líneas 2283-2315

### 🔧 Comandos Útiles Rápidos
```bash
# Buscar colores hardcoded
grep -r "#[0-9a-fA-F]\{3,6\}" *.html

# Ver todas las variables CSS
grep "^    --" css/styles.css

# Contar uso de una variable
grep -r "var(--color-primary)" *.html *.css | wc -l

# Ver archivos modificados
git status --short
```

--

**🎓 Fin de la Chuleta - ¡Úsala como referencia constante!**
**📅 Última actualización**: 2025-01-13 - Versión 1.8
**💾 Recuerda**: Actualizar esta Chuleta después de cada optimización importante

# 📸 PROTOCOLO DE IMÁGENES (ESTRATEGIA VISUAL UNIFICADA)
**Fecha de Aprobación:** 24-Nov-2025 (FINAL)
**Premisa:** El Dashboard avisará a Pepe para que use imágenes horizontales. Por tanto, priorizamos la estética editorial en el contenido.

---

## 1. LA LEY GLOBAL: "Curva de 16px"
Todas las imágenes y sus contenedores deben tener `border-radius: 16px`.

* **Variable CSS:** `var(--radius-container)` (Definido en `:root` como `16px`).
* **Aplicación:** Tarjetas, Blog, Hero, Modales.

---

## 2. ESTRATEGIA A: "ESCAPARATE" (Solo Productos)
**Uso:**
1. **Catálogo:** Tarjetas de Recursos.
2. **Home:** Grid de Recursos Destacados.

**Objetivo:** Que los productos (Libros, Cajas, Iconos) se vean enteros sin recortar.

* **Comportamiento:**
    * **Ajuste:** **`object-fit: contain`** (La imagen se encoge hasta caber entera).
    * **Fondo:** `var(--color-bg-neutral)` (Gris suave que actúa como marco).
    * **Efecto:** **Levitación** (`drop-shadow`).
* **Razón:** Evita que las portadas de libros verticales se corten.

**Clase CSS:** `.card-image-resource`

---

## 3. ESTRATEGIA B: "EDITORIAL" (Contenido y Ambientación)
**Uso:**
1. **Blog (Índice):** Listado de artículos (Zig-Zag).
2. **Post (Detalle):** Cabecera Hero del artículo.
3. **Perfil:** Foto "Sobre Mí" y Hero Sections.

**Objetivo:** Estética de Revista Profesional. Coherencia total entre índice y artículo.

* **Comportamiento:**
    * **Ajuste:** **`object-fit: cover`** (La imagen llena todo el marco).
    * **Fondo:** Ninguno (Sin bordes grises).
    * **Seguro:** **`object-position: top center`** (Alineación SUPERIOR).
* **Razón:** Maximizar impacto visual. El anclaje superior asegura que si Pepe sube una foto vertical, se vea la cara y se corte el cuerpo, salvando la imagen.

**Clases CSS:** `.blog-entry-image`, `.post-hero-image`, `.hero-image`.

---

## ⚡ RESUMEN RÁPIDO PARA DESARROLLO

| Ubicación | Tipo de Imagen | Ajuste (`object-fit`) | Anclaje | Efecto |
| :--- | :--- | :--- | :--- | :--- |
| **Home (Grid)** | Producto | `contain` | Center | Levitación |
| **Catálogo** | Producto | `contain` | Center | Levitación |
| **Blog (Lista)** | Contenido | **`cover`** | **Top** | **Full Fill** |
| **Post (Detalle)** | Hero | `cover` | Top | Full Fill |
| **Perfil** | Retrato | `cover` | Top | Full Fill |

