# 🌿 Website Modelo para Terapeutas Holísticos

## 📋 Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Páginas Incluidas](#páginas-incluidas)
4. [Guía de Personalización](#guía-de-personalización)
5. [Paleta de Colores](#paleta-de-colores)
6. [Cómo Usar Este Modelo](#cómo-usar-este-modelo)
7. [Integraciones Recomendadas](#integraciones-recomendadas)
8. [Checklist de Lanzamiento](#checklist-de-lanzamiento)

---

## 🎯 Descripción General

Este es un **website modelo profesional** diseñado específicamente para terapeutas holísticos, coaches de bienestar, y profesionales de terapias alternativas.

### Características principales:

✅ **100% HTML/CSS/JavaScript puro** - Sin dependencias de frameworks
✅ **Diseño responsive** - Se adapta perfectamente a móviles, tablets y desktop
✅ **Paleta de colores tenues y relajantes** - Ideal para el sector holístico
✅ **Arquitectura de conversión optimizada** - Basada en mejores prácticas de marketing
✅ **Descripciones educativas en cada módulo** - Perfecto para presentar a clientes
✅ **Ligero y rápido** - Optimizado para carga rápida

---

## 📁 Estructura del Proyecto

```
Web_modelo/
│
├── index.html                 # Página principal (HOME)
├── sobre-mi.html             # Página "Sobre Mí"
├── trabaja-conmigo.html      # Portal distribuidor de ofertas
├── recursos.html             # Blog/Recursos
├── agenda.html               # Sistema de reservas
├── contacto.html             # Formulario de contacto
│
├── css/
│   └── styles.css            # Estilos principales
│
├── js/
│   └── main.js               # JavaScript interactivo
│
├── images/                   # Carpeta para tus imágenes
│
└── README.md                 # Este documento
```

---

## 📄 Páginas Incluidas

### 1. **index.html** - Página Principal (HOME)

**Propósito:** Captar atención, generar empatía y dirigir al visitante hacia el camino correcto.

**Secciones incluidas:**
- Hero section con propuesta de valor
- Filtro de caminos (3 opciones principales)
- Testimonios (prueba social)
- Lead magnet (captura de email)
- CTA final

**Mejor para:** Primera impresión y distribución de tráfico.

---

### 2. **sobre-mi.html** - Página "Sobre Mí"

**Propósito:** Generar confianza profunda y conexión emocional.

**Secciones incluidas:**
- Tu historia personal (el "por qué")
- Filosofía de trabajo
- Credenciales y formación
- CTA para agendar sesión

**Mejor para:** Convertir visitantes interesados en clientes potenciales.

---

### 3. **trabaja-conmigo.html** - Portal Distribuidor

**Propósito:** Clasificar las ofertas sin abrumar al visitante.

**Los 3 Caminos:**
1. **Acompañamiento 1 a 1** → Para trabajo profundo y personalizado
2. **Cursos y Programas** → Para aprendizaje autónomo
3. **Comunidad y Membresía** → Para crecimiento grupal continuo

**Mejor para:** Ayudar al visitante a auto-clasificarse y elegir su camino.

---

### 4. **recursos.html** - Blog/Recursos

**Propósito:** Atraer tráfico orgánico (SEO) y demostrar autoridad.

**Secciones incluidas:**
- Barra de búsqueda
- Sistema de filtros por categoría
- Grid de artículos
- Sidebar con lead magnet
- Categorías y artículos populares

**Mejor para:** Contenido educativo y captura de emails.

---

### 5. **agenda.html** - Sistema de Reservas

**Propósito:** Convertir visitantes en clientes agendando sesiones.

**Secciones incluidas:**
- Descripción de sesión de descubrimiento
- Formulario de reserva (placeholder)
- FAQ sobre el proceso
- Beneficios de la sesión

**Nota:** En producción, integrar con Calendly, Acuity o Cal.com.

---

### 6. **contacto.html** - Contacto General

**Propósito:** Canal de comunicación para consultas generales.

**Secciones incluidas:**
- Formulario de contacto
- Información de contacto directo
- Redes sociales
- Newsletter signup
- FAQ

---

## 🎨 Paleta de Colores

El sitio utiliza una paleta de **colores tenues y naturales** diseñada para transmitir calma y bienestar:

| Color | Código HEX | Uso |
|-------|------------|-----|
| Verde-gris suave | `#8B9D9D` | Color primario (botones, enlaces) |
| Beige cálido | `#C4A896` | Color secundario (acentos) |
| Azul grisáceo | `#A8B5C0` | Acento adicional |
| Crema claro | `#F5F3EF` | Fondos alternativos |
| Blanco cálido | `#FDFCFA` | Fondo principal |
| Gris oscuro suave | `#4A4A4A` | Texto principal |
| Verde salvia | `#9CAF9E` | Color de apoyo |
| Lavanda suave | `#B8A8C4` | Color de apoyo |

### Cómo cambiar los colores:

1. Abre el archivo `css/styles.css`
2. Busca la sección `:root` (líneas 10-20)
3. Modifica los valores hexadecimales según tu preferencia
4. Guarda y recarga el navegador

```css
:root {
    --color-primary: #8B9D9D;     /* Cambia este valor */
    --color-secondary: #C4A896;   /* Cambia este valor */
    /* ... etc */
}
```

---

## 🛠️ Guía de Personalización

### Paso 1: Reemplazar Textos Placeholders

Busca y reemplaza en todos los archivos HTML:

- `[Tu Nombre]` → Tu nombre real
- `Tu Logo Aquí` → Tu logo o nombre de marca
- `info@tudominio.com` → Tu email real
- Todas las descripciones de ejemplo con tu contenido real

### Paso 2: Agregar tus Imágenes

1. Guarda tus imágenes en la carpeta `/images/`
2. Busca todos los divs con texto "Imagen..." en los HTML
3. Reemplaza con tu código de imagen:

```html
<!-- Antes (placeholder) -->
<div style="background: var(--color-sage); height: 400px;">
    Imagen del Terapeuta
</div>

<!-- Después (tu imagen real) -->
<img src="images/tu-foto.jpg" alt="Tu nombre - Terapeuta Holística">
```

### Paso 3: Personalizar el Logo

En el header de cada página, reemplaza:

```html
<!-- Antes -->
<div class="logo">Tu Logo Aquí</div>

<!-- Después (opción 1: solo texto) -->
<div class="logo">Tu Nombre</div>

<!-- Después (opción 2: con imagen) -->
<a href="index.html" class="logo">
    <img src="images/logo.png" alt="Tu Nombre" style="height: 40px;">
</a>
```

### Paso 4: Configurar Formularios

Los formularios actualmente solo muestran un alert. Para hacerlos funcionales:

**Opción 1: Usar FormSubmit (gratis)**
```html
<form action="https://formsubmit.co/tu-email@ejemplo.com" method="POST">
    <!-- Tus campos del formulario -->
</form>
```

**Opción 2: Integrar con tu backend**
- Modifica el JavaScript en `js/main.js`
- Conecta con tu API o servicio de email

### Paso 5: Conectar Redes Sociales

Busca todos los enlaces con `href="#"` en las secciones de redes sociales y reemplaza con tus URLs:

```html
<!-- Antes -->
<a href="#" class="social-link">📷</a>

<!-- Después -->
<a href="https://instagram.com/tu-usuario" class="social-link" target="_blank">📷</a>
```

---

## 🔌 Integraciones Recomendadas

### Para Email Marketing:
- **Mailchimp** (gratis hasta 500 contactos)
- **ConvertKit** (ideal para creators)
- **ActiveCampaign** (más avanzado)

### Para Sistema de Citas:
- **Calendly** (gratis, muy fácil de usar)
- **Acuity Scheduling** (más profesional)
- **Cal.com** (código abierto, gratis)

### Para Procesar Pagos:
- **Stripe** (tarjetas de crédito)
- **PayPal** (ampliamente aceptado)
- **Mercado Pago** (popular en Latinoamérica)

### Para Membresías:
- **Memberstack** (sin código)
- **Patreon** (simple y conocido)
- **Podia** (todo en uno: cursos + membresías)

### Para Analytics:
- **Google Analytics 4** (gratis, estándar de la industria)
- **Plausible** (privado, sin cookies)

---

## ✅ Checklist de Lanzamiento

Antes de publicar tu sitio, verifica:

### Contenido:
- [ ] Todos los textos placeholder fueron reemplazados
- [ ] Todas las imágenes fueron agregadas
- [ ] Logo personalizado está en su lugar
- [ ] Links de redes sociales funcionan
- [ ] Email de contacto es el correcto
- [ ] Testimonios son reales (o removidos)

### Funcionalidad:
- [ ] Todos los links internos funcionan
- [ ] Menú móvil se abre y cierra correctamente
- [ ] Formularios envían correctamente
- [ ] Sistema de citas está integrado (Calendly, etc.)
- [ ] Validación de formularios funciona

### SEO Básico:
- [ ] Todas las páginas tienen título único (`<title>`)
- [ ] Todas las páginas tienen meta description
- [ ] Imágenes tienen atributos `alt`
- [ ] Crear archivo `robots.txt`
- [ ] Crear archivo `sitemap.xml`

### Legal:
- [ ] Crear página de Política de Privacidad
- [ ] Crear página de Términos y Condiciones
- [ ] Crear página de Aviso Legal
- [ ] Agregar banner de cookies (si aplica en tu país)

### Performance:
- [ ] Optimizar todas las imágenes (usar formato WebP)
- [ ] Comprimir archivos CSS y JS para producción
- [ ] Probar velocidad con PageSpeed Insights
- [ ] Verificar que funciona en Chrome, Firefox, Safari

### Hosting:
- [ ] Comprar dominio (ej: tunombre.com)
- [ ] Contratar hosting o usar Netlify/Vercel (gratis)
- [ ] Configurar SSL (HTTPS)
- [ ] Hacer backup de todos los archivos

---

## 📱 Responsive Design

Este sitio está completamente optimizado para:

- 📱 **Móviles** (320px - 767px)
- 📲 **Tablets** (768px - 1023px)
- 💻 **Desktop** (1024px+)

El menú se convierte en hamburguesa en móviles automáticamente.

---

## 🆘 Soporte y Ayuda

### Modificar estilos:
Todos los estilos están en `css/styles.css` con comentarios claros.

### Modificar funcionalidad:
Todo el JavaScript está en `js/main.js` con secciones bien documentadas.

### Agregar nuevas páginas:
1. Duplica una página existente
2. Cambia el contenido
3. Agrega el link en el menú de navegación
4. Actualiza el footer

---

## 📈 Próximos Pasos Sugeridos

Una vez que tu sitio esté funcionando:

1. **Crear contenido de blog regularmente** (mínimo 2 artículos/mes para SEO)
2. **Implementar píxel de Facebook/Instagram** para remarketing
3. **Crear embudo de email** con secuencia automatizada
4. **Agregar chat en vivo** (Tawk.to es gratis)
5. **Implementar testimonios con video** (aumenta conversión 80%)
6. **Crear lead magnets adicionales** (quiz, mini-curso, diagnóstico)

---

## 💡 Tips de Conversión

### Para aumentar conversiones:
1. **Agrega urgencia** ("Últimos 3 cupos disponibles este mes")
2. **Ofrece garantía** ("Satisfacción garantizada o devolución de dinero")
3. **Testimonios con foto y nombre completo** (aumenta credibilidad 67%)
4. **Video personal en "Sobre Mí"** (aumenta conversión 86%)
5. **Chat o WhatsApp visible** (reduce fricción)

---

## 🎓 Recursos Adicionales

### Aprender más sobre:
- **SEO para terapeutas:** [Moz Beginner's Guide](https://moz.com/beginners-guide-to-seo)
- **Copywriting holístico:** Buscar "Story Brand Framework"
- **Email marketing:** Plantillas en ConvertKit
- **Diseño web:** [Web Design Inspiration](https://www.awwwards.com)

---

## 📞 Créditos

**Diseñado por:** FactoriApp
**Fecha:** Enero 2025
**Versión:** 1.0
**Licencia:** Uso comercial permitido

---

## 🚀 ¡Felicidades!

Ya tienes todo lo que necesitas para lanzar un website profesional para tu práctica holística.

Recuerda: **Un website es una herramienta viva**. Actualízalo regularmente, prueba diferentes versiones de textos y botones (A/B testing), y escucha el feedback de tus visitantes.

**¡Éxito en tu viaje digital! 🌟**

---

*¿Tienes preguntas sobre cómo usar este modelo? No dudes en contactarme.*
