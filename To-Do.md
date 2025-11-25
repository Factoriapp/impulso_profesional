📋 TODO - Proyecto Web Impulso Profesional
Estado: Pendientes para Sesión "Día 2" Objetivo Inmediato: Finalizar Catálogo y Limpieza CSS

🚨 PRIORIDAD 1: EJECUCIÓN INMEDIATA (Al abrir la "Taguara")
🎨 CSS (Limpieza Segura)
[ ] Implementar Opción B (Grid Fluido): Añadir clase .card--fluid al final de styles.css (no tocar .card original).

[ ] Implementar Opción B (Imagen Recurso): Añadir clase .card-image-resource con estilo "Escaparate" (Contain + Sombra Levitación + 200px altura fija).

[ ] Verificar: Que esto NO rompa el diseño del Blog ni de la Home actual.

🛍️ CATÁLOGO (catalogo.html) - Estructura
[ ] Aplicar Clases Nuevas: Actualizar el HTML de las tarjetas del grid para usar .card--fluid y .card-image-resource.

[ ] Eliminar Badges: Borrar etiquetas de colores (.badge--curso, etc.) de las tarjetas. Diseño limpio.

[ ] Limpieza de Detalle: ELIMINAR las imágenes/placeholders de las Secciones de Detalle (Abajo). Regla: "Una sola foto por recurso (en la tarjeta)".

[ ] Zona Final: Asegurar que el pie de página sea solo Soporte/Orientación (Acordeón), eliminando cualquier Lead Magnet redundante.

🆔 IDENTIDAD GLOBAL
[ ] Sincronizar Header: Verificar que catalogo.html tenga el bloque de Logo Flexible ([Identidad del Sitio]) igual que el Index.

[ ] Sincronizar Footer: Verificar que catalogo.html tenga el footer compacto de 3 columnas.

🟡 PRIORIDAD 2: VALIDACIÓN (QA)
[ ] Test de "Tarjeta Camaleón": Confirmar que los Eventos muestran la fecha y los Cursos no.

[ ] Test de Modales: Confirmar que al hacer clic en "Comprar" salta el Modal HTML y no una alerta nativa fea.

[ ] Test Responsive: Verificar que las tarjetas no se rompen en móvil (320px) gracias a la nueva clase fluida.

🧊 PRIORIDAD 3: NEVERA (Futuro / Fase 2)
🛠️ Ingeniería (Deuda Técnica)
[ ] Ejecutar PLAN-MIGRACION-SCSS.md: Migrar el CSS monolítico a SCSS modular. (Pausado hasta cerrar Catálogo).

[ ] Sistema de Temas: Implementar paletas de colores vía clases en el body (Personalización Controlada).

🧠 Lógica de Negocio
[ ] Botones Dinámicos: Implementar lógica para que Pepe elija el texto del botón ("Comprar", "Agendar", "Aplicar") desde config.

[ ] Dashboard: Construcción del panel de administración en Next.js (Largo Plazo).

Última actualización: 24 Nov 2025 Estratega: Stratego