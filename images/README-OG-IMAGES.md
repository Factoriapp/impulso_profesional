# 📸 GUÍA: Imágenes Open Graph (OG Images)

## 🎯 ¿Qué son las imágenes OG?

Las imágenes OG (Open Graph) son las **imágenes de preview** que aparecen cuando compartes tu enlace en:
- WhatsApp
- Facebook
- LinkedIn
- Twitter/X
- Telegram
- iMessage

**Impacto**: Una buena imagen OG aumenta el CTR (Click-Through Rate) hasta un **300%**.

---

## 📐 ESPECIFICACIONES TÉCNICAS

### Dimensiones Requeridas

| Plataforma | Tamaño Óptimo | Ratio | Notas |
|------------|---------------|-------|-------|
| **Facebook/WhatsApp** | 1200x630px | 1.91:1 | **ESTÁNDAR** (usar este) |
| LinkedIn | 1200x627px | 1.91:1 | Casi idéntico |
| Twitter | 1200x675px | 16:9 | summary_large_image |
| Instagram | 1080x1080px | 1:1 | Cuadrado (no OG) |

**Recomendación**: Usar **1200x630px** para todas las plataformas.

### Formato y Peso

- **Formato**: JPG (mejor compresión) o PNG (mejor calidad)
- **Peso máximo**: 300KB (ideal < 200KB)
- **Calidad JPG**: 80-85% (buen balance calidad/peso)
- **Color**: RGB (no CMYK)

### Zona de Seguridad

```
┌───────────────────────────────────────┐
│ ↕ 100px (evitar texto crítico)       │
│                                       │
│  ┌─────────────────────────────┐     │
│  │                             │     │
│  │   ZONA SEGURA PARA TEXTO    │     │
│  │   (todo visible en móvil)   │     │
│  │                             │     │
│  └─────────────────────────────┘     │
│                                       │
│ ↕ 100px (evitar texto crítico)       │
└───────────────────────────────────────┘
   ↔ 150px      CONTENIDO     ↔ 150px
```

---

## 🎨 IMÁGENES NECESARIAS PARA ESTE PROYECTO

### 1. **og-image.jpg** (Página Principal)
**Ubicación**: `/images/og-image.jpg`
**Propósito**: Homepage / Landing page
**Contenido sugerido**:
- ✅ Tu foto profesional (transmite calidez)
- ✅ Tu tagline principal (ej: "Encuentra Tu Calma Mental")
- ✅ Tu logo
- ✅ Colores de tu marca (#c5d9e8, #e8d5c4)
- ❌ Evitar: Texto pequeño, demasiados elementos

**Ejemplo de composición**:
```
┌───────────────────────────────────────┐
│                                       │
│  [FOTO GRANDE]    🌟 Tu Tagline Aquí │
│   Centrada         Encuentra Tu      │
│   600x600px        Calma Mental      │
│                                       │
│                    [LOGO]             │
└───────────────────────────────────────┘
```

---

### 2. **og-image-presentacion.jpg** (Presentación Profesional)
**Ubicación**: `/images/og-image-presentacion.jpg`
**Propósito**: Página "Presentación Profesional"
**Contenido sugerido**:
- ✅ Tu foto profesional (primer plano)
- ✅ Texto: "Conoce Mi Trayectoria"
- ✅ Tu nombre completo
- ✅ Tu título/especialidad

**Ejemplo**:
```
┌───────────────────────────────────────┐
│                                       │
│  [FOTO RETRATO]   Conoce Mi Historia │
│   Profesional                         │
│   Alta calidad    Tu Nombre Completo │
│                   Especialista en...  │
│                                       │
└───────────────────────────────────────┘
```

---

### 3. **og-image-servicios.jpg** (Página Servicios)
**Ubicación**: `/images/og-image-servicios.jpg`
**Propósito**: Página "Cómo Puedo Ayudarte" / Servicios
**Contenido sugerido**:
- ✅ Collage visual de tus servicios
- ✅ Texto: "Servicios Profesionales"
- ✅ Lista visual: "Sesiones • Cursos • Eventos"
- ✅ CTA sutil: "Descubre cómo puedo ayudarte"

**Ejemplo**:
```
┌───────────────────────────────────────┐
│                                       │
│  [ICONOS/FOTOS]   Servicios          │
│   Servicios       Profesionales      │
│   Visuales                            │
│                   • Sesiones 1:1      │
│                   • Cursos Online     │
│                   • Eventos           │
└───────────────────────────────────────┘
```

---

## 🛠️ HERRAMIENTAS RECOMENDADAS

### Diseño (Crear la Imagen)

**Opción 1: Canva** (Más fácil)
- https://www.canva.com/
- Plantilla: "Facebook Post" (1200x630px)
- Gratis con marca de agua, Pro sin ella
- Drag & drop intuitivo

**Opción 2: Figma** (Más profesional)
- https://www.figma.com/
- Gratis para uso personal
- Control total del diseño
- Exportar como JPG 80% calidad

**Opción 3: Photoshop** (Avanzado)
- Si ya tienes experiencia
- Mejor control de calidad
- Exportar: "File > Export > Export As" → JPG 80%

### Optimización (Reducir Peso)

**TinyPNG**: https://tinypng.com/
- Reduce peso 50-70% sin pérdida visual
- Gratis hasta 20 imágenes/día
- Arrastra y suelta

**Squoosh**: https://squoosh.app/
- Herramienta de Google
- Control manual de compresión
- 100% gratis

---

## ✅ CHECKLIST ANTES DE SUBIR

```markdown
- [ ] Dimensiones correctas (1200x630px)
- [ ] Peso < 300KB (idealmente < 200KB)
- [ ] Formato JPG o PNG
- [ ] Texto legible (tamaño mínimo 40px)
- [ ] Zona de seguridad respetada
- [ ] Colores de marca aplicados
- [ ] Foto profesional de alta calidad
- [ ] Sin pixelación visible
- [ ] Contraste suficiente (texto sobre fondo)
- [ ] Preview en móvil simulado
```

---

## 🧪 TESTING Y VALIDACIÓN

### 1. Validadores Online

**Facebook Debugger** (WhatsApp también)
```
https://developers.facebook.com/tools/debug/
```
- Pega tu URL
- Click "Debug"
- Si no aparece la imagen: "Scrape Again"

**LinkedIn Post Inspector**
```
https://www.linkedin.com/post-inspector/
```
- Pega tu URL
- Click "Inspect"
- Verás preview exacto

**Twitter Card Validator**
```
https://cards-dev.twitter.com/validator
```
- Requiere cuenta Twitter
- Preview en tiempo real

**Open Graph Checker** (Universal)
```
https://www.opengraph.xyz/
```
- No requiere cuenta
- Muestra todas las plataformas

### 2. Testing Manual

**WhatsApp**:
1. Envíate el link a ti mismo
2. Espera 5-10 segundos
3. Debe aparecer la imagen
4. Si no: Invalida caché en Facebook Debugger

**LinkedIn**:
1. Crea post privado (solo tú)
2. Pega el link
3. Espera preview
4. Elimina post si no es correcto

---

## 🚨 PROBLEMAS COMUNES Y SOLUCIONES

### Problema 1: "Imagen no aparece"
**Causas**:
- URL incorrecta (relativa en vez de absoluta)
- Imagen no accesible públicamente
- Servidor bloquea bots de redes sociales

**Solución**:
```html
<!-- ❌ MAL: URL relativa -->
<meta property="og:image" content="/images/og-image.jpg">

<!-- ✅ BIEN: URL absoluta -->
<meta property="og:image" content="https://www.tudominio.com/images/og-image.jpg">
```

### Problema 2: "Imagen incorrecta (caché antiguo)"
**Causas**:
- Plataformas cachean imagen 7-30 días
- Cambiaste imagen pero sigue apareciendo la vieja

**Solución**:
```bash
# Opción 1: Invalidar caché en debuggers
Facebook Debugger → "Scrape Again"
LinkedIn Inspector → Re-inspect

# Opción 2: Agregar versión a URL
<meta property="og:image" content="https://www.tudominio.com/images/og-image.jpg?v=2">
```

### Problema 3: "Imagen muy pesada (no carga)"
**Causas**:
- Archivo > 1MB
- Conexión lenta del usuario

**Solución**:
```bash
# Comprimir con TinyPNG o Squoosh
Objetivo: < 200KB
Máximo aceptable: 300KB
```

### Problema 4: "Texto no se lee en móvil"
**Causas**:
- Texto muy pequeño (< 30px)
- Bajo contraste
- Fuera de zona de seguridad

**Solución**:
- Mínimo 40px para texto principal
- Mínimo 60px para título
- Contraste mínimo 4.5:1 (WCAG)
- Mantener texto en zona segura

---

## 📋 PLANTILLA DE BRIEF PARA DISEÑADOR

Si contratas a un diseñador, usa este brief:

```markdown
BRIEF: Imagen Open Graph para [NOMBRE_PÁGINA]

ESPECIFICACIONES TÉCNICAS:
- Dimensiones: 1200x630px
- Formato: JPG
- Peso máximo: 200KB
- Ratio: 1.91:1

CONTENIDO REQUERIDO:
- [ELEMENTO 1: ej. Mi foto profesional]
- [ELEMENTO 2: ej. Tagline "Encuentra Tu Calma"]
- [ELEMENTO 3: ej. Logo en esquina]
- [ELEMENTO 4: ej. Colores marca #c5d9e8]

ESTILO VISUAL:
- [ ] Profesional pero cálido
- [ ] Minimalista / Complejo
- [ ] Tipografía: [Familia de fuente]
- [ ] Referencias: [Links a inspiración]

ZONA DE SEGURIDAD:
- Margen 150px laterales
- Margen 100px superior/inferior
- Texto crítico en zona central

ENTREGABLES:
- [ ] Archivo JPG optimizado (< 200KB)
- [ ] Archivo original editable (PSD/Figma)
- [ ] Versión PNG de alta calidad (backup)
```

---

## 🎓 RECURSOS ADICIONALES

### Inspiración de Diseño
- **Dribbble**: https://dribbble.com/search/og-image
- **Behance**: https://www.behance.net/search/projects?search=social%20media%20preview

### Guías Oficiales
- **Facebook**: https://developers.facebook.com/docs/sharing/webmasters/
- **Twitter**: https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards
- **LinkedIn**: https://www.linkedin.com/help/linkedin/answer/a521928

### Herramientas Avanzadas
- **Bannerbear**: Generación automática de OG images (API)
- **Cloudinary**: Transformación dinámica de imágenes
- **Vercel OG**: Generación con React/Next.js

---

## 🔄 MANTENIMIENTO

### Cuándo Actualizar las Imágenes

**Actualizar si**:
- ✅ Cambias tu branding (logo, colores)
- ✅ Actualizas tu foto profesional
- ✅ Cambias tu tagline principal
- ✅ Rediseñas la web completamente
- ✅ Lanzas nueva oferta/servicio destacado

**NO actualizar si**:
- ❌ Pequeños cambios de texto en la web
- ❌ Ajustes menores de colores
- ❌ Actualizaciones de contenido regular

**Frecuencia recomendada**: Cada 6-12 meses o con rebranding mayor.

---

## 📞 ¿NECESITAS AYUDA?

Si tienes dudas o problemas:

1. **Revisa la documentación**: Este README cubre 95% de casos
2. **Usa validadores**: Te dirán exactamente qué falla
3. **Consulta Chuleta**: CHULETA-DESARROLLO.md tiene patrones útiles
4. **Pregunta a tu desarrollador**: Con este README pueden ayudarte mejor

---

**📅 Última actualización**: 2025-01-12
**📄 Versión**: 1.0
**🔗 Relacionado**: Ver Optimización #4 en CHULETA-DESARROLLO.md

---

## 🎯 RESUMEN RÁPIDO (TL;DR)

```bash
# 1. Crear 3 imágenes:
og-image.jpg               # Homepage (1200x630px, < 200KB)
og-image-presentacion.jpg  # Presentación Profesional
og-image-servicios.jpg     # Página Servicios

# 2. Herramientas:
Diseño: Canva o Figma
Optimización: TinyPNG (https://tinypng.com)

# 3. Validar:
Facebook Debugger: https://developers.facebook.com/tools/debug/
LinkedIn Inspector: https://www.linkedin.com/post-inspector/

# 4. Subir:
Ubicación: /images/
Actualizar URLs en HTML (absolutas)

# 5. Testing:
Compartir link en WhatsApp/LinkedIn
Verificar que imagen aparece correctamente
```

**¡Listo para crear impacto visual en redes sociales!** 🚀
