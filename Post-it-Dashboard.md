# 📌 POST-IT GIGANTE: RECORDATORIOS PARA EL DASHBOARD (FASE 2)
**Propósito:** Notas críticas de UX y Lógica que el equipo de desarrollo (Devito) NO PUEDE OLVIDAR al construir el Backend.

---

### 1. 🎥 SOBRE EL VÍDEO DE PORTADA (HERO)
* **El Riesgo:** Si Pepe sube un vídeo a YouTube sin portada, el embed se ve negro/feo antes del Play.
* **La Medida:** En el formulario de "Editar Home", poner una ALERTA visual junto al campo de URL:
    * *"OJO: Avísale a Pepe que DEBE poner la misma Foto Profesional como miniatura en YouTube, o la web se verá rota."*

### 2. 🔒 SOBRE LA NAVEGACIÓN (MENÚ)
* **El Riesgo:** Pepe podría borrar "Área Personal" o "Mi Cuenta" del menú pensando que sobran.
* **La Medida:** Esos enlaces son **INTOCABLES**.
    * Deben aparecer en el gestor de menú como "Bloqueados" o "De Sistema".
    * No permitir que se eliminen, porque rompen el acceso al negocio.

### 3. 📝 SOBRE EL BLOG (FORMATOS INTELIGENTES)
* **El Riesgo:** Fotos verticales rompiendo el layout de texto.
* **La Medida:** Lógica condicional en el editor:
    * Si es **"Solo Imagen"** → Aplicar clase CSS `full-bleed` (ancho completo).
    * Si es **"PDF"** → Generar la "Tarjeta de Documento" (Link externo), NUNCA un iframe.

### 4. 📅 SOBRE LOS PRODUCTOS (LA GRAN DIVISIÓN)
* **El Riesgo:** Confusión entre Cursos (Evergreen) y Eventos (Agenda).
* **La Medida:** El formulario de creación debe tener un **Filtro Obligatorio**:
    * *"¿Tiene fecha de inicio fija?"*
    * Si **SÍ** → Mándalo a la sección "Agenda/Eventos".
    * Si **NO** → Mándalo a la sección "Formación/Tienda".
    * *Nota:* No dejes que Pepe elija la categoría a mano si se equivoca en la fecha.

### 5. 🖼️ SOBRE LAS IMÁGENES (LEGALIDAD)
* **El Riesgo:** Pepe sube fotos de Google Images y nos demandan.
* **La Medida:** Fricción obligatoria en el Upload:
    * Checkbox: `[ ] Tengo los derechos de esta imagen`.
    * Backend: Borrar metadatos EXIF automáticamente al subir.

### 6. 🏠 SOBRE LOS DESTACADOS (HOME)
* **El Riesgo:** Que la Home muestre productos viejos o irrelevantes automáticamente.
* **La Medida:** En el editor de Productos/Servicios, debe haber un **Checkbox**:
    * `[⭐] Destacar en la Portada`
    * **Lógica:** El sistema solo muestra en `index.html` los **3 primeros** ítems que tengan esta marca activa.

### 7. 🔘 SOBRE LOS BOTONES DE COMPRA (FLEXIBILIDAD)
* **El Riesgo:** Que el sistema obligue a un "Taller" a tener botón de "Comprar" cuando Pepe quiere que sea "Agendar Entrevista".
* **La Medida:** Pepe debe elegir la **ACCIÓN** del botón independientemente de la categoría:
    * Selector: **"¿Qué hace el botón?"**
    * Opciones:
        1. `Abrir Calendario` (Modal)
        2. `Ir a Pago` (Link Stripe)
        3. `Descargar Archivo` (Directo)
        4. `Ver Detalle` (Desplegar)

🎨 SOBRE LOS DEFAULTS (TEMAS)

El Riesgo: Usar fotos de oficina para clientes de nicho (Yoga, Tarot, Fitness).

La Medida: El sistema debe soportar "Theme Packs".

Al configurar el sitio, se elige: Theme: 'Corp' | 'Mystic' | 'Minimal'.

El backend carga las imágenes por defecto de la carpeta correspondiente.


🖼️ SOBRE LAS IMÁGENES DE PRODUCTO

Campo: "Imagen Destacada (Opcional)".

Lógica: Si este campo está vacío, el frontend usará el bg-default de la categoría. Si tiene contenido, la imagen propia tapa al default.

Caso de Uso: Ideal para portadas de Ebooks o fotos de eventos específicos.
---
**⚠️ LEER ESTO ANTES DE ESCRIBIR LA PRIMERA LÍNEA DE LA FASE 2.**