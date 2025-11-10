// ============================================
// FUNCIONALIDAD DEL ÁREA DE MIEMBROS
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // OBTENER Y MOSTRAR DATOS DEL USUARIO
    // ============================================

    const usuario = obtenerUsuarioActual();
    if (usuario) {
        // Mostrar nombre del usuario
        const nombreUsuario = document.getElementById('nombreUsuario');
        if (nombreUsuario) {
            nombreUsuario.textContent = usuario.nombre;
        }

        // Mostrar tipo de usuario y actualizar badge
        const tipoUsuarioBadge = document.getElementById('tipoUsuarioBadge');
        const mejorarPlanBtn = document.getElementById('mejorarPlan');

        if (usuario.tipoUsuario === 'miembro') {
            if (tipoUsuarioBadge) {
                tipoUsuarioBadge.textContent = 'MIEMBRO PREMIUM';
                tipoUsuarioBadge.parentElement.style.background = 'linear-gradient(135deg, var(--color-primary), var(--color-accent))';
            }
            if (mejorarPlanBtn) {
                mejorarPlanBtn.style.display = 'none';
            }
        } else {
            if (tipoUsuarioBadge) {
                tipoUsuarioBadge.textContent = 'USUARIO GRATUITO';
            }
            if (mejorarPlanBtn) {
                mejorarPlanBtn.style.display = 'inline-block';
            }
        }
    }

    // Botón para mejorar plan
    const mejorarPlanBtn = document.getElementById('mejorarPlan');
    if (mejorarPlanBtn) {
        mejorarPlanBtn.addEventListener('click', function() {
            // En producción, esto redirige a página de pago
            if (confirm('¿Deseas mejorar a Membresía Premium?\n\n(En esta demo, te convertiremos en miembro automáticamente)')) {
                if (actualizarTipoUsuario('miembro')) {
                    alert('¡Felicidades! Ahora eres miembro Premium. Recarga la página para ver el contenido completo.');
                    location.reload();
                }
            }
        });
    }

    // ============================================
    // SISTEMA DE TABS (PESTAÑAS)
    // ============================================

    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');

            // Remover clase active de todos los botones y contenidos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Agregar clase active al botón clickeado
            this.classList.add('active');

            // Mostrar el contenido correspondiente
            const targetContent = document.getElementById(`tab-${tabName}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }

            // Hacer scroll suave hacia el contenido
            targetContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    });

    // ============================================
    // BLOQUEAR CONTENIDO PREMIUM PARA USUARIOS GRATUITOS
    // ============================================

    if (usuario && usuario.tipoUsuario === 'gratuito') {
        // Encontrar todos los elementos premium
        const premiumCards = document.querySelectorAll('.premium-content');

        premiumCards.forEach(card => {
            // Agregar overlay de bloqueo
            card.style.opacity = '0.6';
            card.style.pointerEvents = 'none';

            // Bloquear botones premium
            const premiumBtns = card.querySelectorAll('.premium-btn');
            premiumBtns.forEach(btn => {
                btn.style.background = '#999';
                btn.style.cursor = 'not-allowed';
                btn.textContent = '🔒 Contenido Premium';
            });
        });
    }

    // ============================================
    // MENSAJES DE DESCARGA (Simulación)
    // ============================================

    const botonesDescarga = document.querySelectorAll('.btn-primary, .btn-secondary');

    botonesDescarga.forEach(boton => {
        if (boton.textContent.includes('Descargar') && !boton.classList.contains('premium-btn')) {
            boton.addEventListener('click', function(e) {
                e.preventDefault();

                // Verificar si es contenido premium y usuario es gratuito
                if (this.classList.contains('premium-btn') && usuario && usuario.tipoUsuario === 'gratuito') {
                    alert('Este contenido está disponible solo para miembros Premium.\n\nMejora tu plan para acceder a todo el contenido exclusivo.');
                    return;
                }

                // Cambiar texto del botón temporalmente
                const textoOriginal = this.textContent;
                this.textContent = '✓ Descargando...';
                this.style.opacity = '0.7';
                this.disabled = true;

                // Simular descarga
                setTimeout(() => {
                    this.textContent = '✓ Descargado';
                    this.style.background = '#4CAF50';

                    // Volver al estado original después de 2 segundos
                    setTimeout(() => {
                        this.textContent = textoOriginal;
                        this.style.opacity = '1';
                        this.style.background = '';
                        this.disabled = false;
                    }, 2000);
                }, 1500);
            });
        }
    });

    // ============================================
    // ESTADÍSTICAS DEL USUARIO (Opcional)
    // ============================================

    // Puedes agregar aquí funcionalidad para:
    // - Mostrar progreso de cursos
    // - Contar recursos descargados
    // - Mostrar próximos eventos
    // - etc.

    console.log('✨ Área de miembros cargada correctamente');
});
