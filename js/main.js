// ============================================
//  JAVASCRIPT PRINCIPAL - WEBSITE MODELO
//  Para Terapeutas Holísticos
// ============================================

// ============================================
// FUNCIÓN AUXILIAR: Mostrar mensajes en formularios
// ============================================
function mostrarMensajeFormulario(form, mensaje, tipo = 'success') {
    // Buscar si ya existe un div de mensaje
    let mensajeDiv = form.querySelector('.form-mensaje');

    if (!mensajeDiv) {
        // Crear el div de mensaje
        mensajeDiv = document.createElement('div');
        mensajeDiv.className = 'form-mensaje';
        mensajeDiv.style.cssText = `
            padding: 1rem;
            margin-top: 1rem;
            border-radius: 8px;
            font-size: 0.95rem;
            text-align: center;
            transition: all 0.3s ease;
        `;
        form.appendChild(mensajeDiv);
    }

    // Aplicar estilos según el tipo
    if (tipo === 'success') {
        mensajeDiv.style.background = 'linear-gradient(135deg, #d4edda, #c3e6cb)';
        mensajeDiv.style.color = '#155724';
        mensajeDiv.style.border = '1px solid #c3e6cb';
    } else {
        mensajeDiv.style.background = 'linear-gradient(135deg, #f8d7da, #f5c6cb)';
        mensajeDiv.style.color = '#721c24';
        mensajeDiv.style.border = '1px solid #f5c6cb';
    }

    // Mostrar mensaje
    mensajeDiv.textContent = mensaje;
    mensajeDiv.style.display = 'block';

    // Ocultar después de 5 segundos
    setTimeout(() => {
        mensajeDiv.style.opacity = '0';
        setTimeout(() => {
            mensajeDiv.style.display = 'none';
            mensajeDiv.style.opacity = '1';
        }, 300);
    }, 5000);
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // 0. MOSTRAR/OCULTAR ELEMENTOS DEL HEADER SEGÚN SESIÓN
    // ============================================

    // Verificar si existe la función obtenerUsuarioActual (definida en auth.js)
    if (typeof obtenerUsuarioActual === 'function') {
        const usuario = obtenerUsuarioActual();
        const authButtons = document.getElementById('authButtons');
        const headerCenterAction = document.getElementById('headerCenterAction');
        const headerCenterProfile = document.getElementById('headerCenterProfile');
        const userNameHeader = document.getElementById('userNameHeader');
        const userAvatar = document.getElementById('userAvatar');

        if (usuario) {
            // Usuario logueado
            // CENTRO: "Área Personal" siempre visible (con lógica de portero)
            // DERECHA: Mostrar Avatar+Nombre, ocultar botones de autenticación
            if (headerCenterAction) headerCenterAction.style.display = 'flex';
            if (headerCenterProfile) headerCenterProfile.style.display = 'flex';
            if (authButtons) authButtons.style.display = 'none';

            // Mostrar botones "Mi Cuenta" y "Salir" en el menú
            const cuentaMenuItem = document.getElementById('cuentaMenuItem');
            const salirMenuItem = document.getElementById('salirMenuItem');
            if (cuentaMenuItem) cuentaMenuItem.classList.remove('hidden');
            if (salirMenuItem) salirMenuItem.classList.remove('hidden');

            // Actualizar nombre del usuario (solo primer nombre)
            if (userNameHeader) {
                const primerNombre = typeof obtenerPrimerNombre === 'function'
                    ? obtenerPrimerNombre(usuario.nombre)
                    : usuario.nombre.split(' ')[0];
                userNameHeader.textContent = primerNombre;
            }

            // Crear avatar con iniciales
            if (userAvatar) {
                const iniciales = usuario.nombre
                    .split(' ')
                    .map(n => n[0])
                    .join('')
                    .toUpperCase()
                    .substring(0, 2);

                const avatarSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%236B9080'/%3E%3Ctext x='20' y='26' font-size='16' fill='white' text-anchor='middle' font-family='Arial'%3E${iniciales}%3C/text%3E%3C/svg%3E`;
                userAvatar.src = avatarSvg;
            }
        } else {
            // Usuario NO logueado (Visitante)
            // CENTRO: Mostrar "Área Personal" (texto + icono)
            // DERECHA: Mostrar botones de autenticación
            if (headerCenterAction) headerCenterAction.style.display = 'flex';
            if (headerCenterProfile) headerCenterProfile.style.display = 'none';
            if (authButtons) authButtons.style.display = 'flex';

            // Ocultar botones "Mi Cuenta" y "Salir" en el menú
            const cuentaMenuItem = document.getElementById('cuentaMenuItem');
            const salirMenuItem = document.getElementById('salirMenuItem');
            if (cuentaMenuItem) cuentaMenuItem.classList.add('hidden');
            if (salirMenuItem) salirMenuItem.classList.add('hidden');
        }
    }

    // ============================================
    // 1. NAVEGACIÓN MÓVIL (Menú Hamburguesa)
    // ============================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');

    function toggleMenu() {
        navMenu.classList.toggle('active');
        if (navOverlay) navOverlay.classList.toggle('active');

        // Prevenir scroll cuando el menú está abierto
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        // Animar el icono hamburguesa
        const icon = navToggle.querySelector('.nav-toggle-icon');
        const spans = icon ? icon.querySelectorAll('span') : [];
        spans.forEach((span, index) => {
            if (navMenu.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translateY(10px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                span.style.transform = '';
                span.style.opacity = '';
            }
        });
    }

    function closeMenu() {
        navMenu.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.style.overflow = '';

        const icon = navToggle.querySelector('.nav-toggle-icon');
        const spans = icon ? icon.querySelectorAll('span') : [];
        spans.forEach(span => {
            span.style.transform = '';
            span.style.opacity = '';
        });
    }

    if (navToggle && navMenu) {
        // Toggle al hacer click en el botón
        navToggle.addEventListener('click', toggleMenu);

        // Cerrar menú al hacer clic en el overlay
        if (navOverlay) {
            navOverlay.addEventListener('click', closeMenu);
        }

        // Cerrar menú al hacer clic en un enlace
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // ============================================
    // 2. HEADER SCROLL EFFECT
    // ============================================
    const header = document.getElementById('header');

    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ============================================
    // 3. VALIDACIÓN DE FORMULARIOS GENÉRICOS
    // ============================================
    // Excluir #leadMagnetForm porque tiene su propia validación específica
    const forms = document.querySelectorAll('form:not(#leadMagnetForm)');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validación básica
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff6b6b';
                } else {
                    input.style.borderColor = '';
                }

                // Validación específica para email
                if (input.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        isValid = false;
                        input.style.borderColor = '#ff6b6b';
                    }
                }
            });

            if (isValid) {
                // Aquí normalmente enviarías el formulario
                // Por ahora, solo mostramos un mensaje
                mostrarMensajeFormulario(form, '✓ ¡Gracias! Tu información ha sido recibida. Te contactaremos pronto.', 'success');
                form.reset();
            } else {
                mostrarMensajeFormulario(form, '⚠ Por favor, completa todos los campos requeridos correctamente.', 'error');
            }
        });
    });

    // ============================================
    // 4. SMOOTH SCROLL PARA ANCLAS
    // ============================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Ignorar enlaces con solo '#'
            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // 5. ANIMACIÓN DE ENTRADA (Fade In on Scroll)
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animación a las tarjetas y secciones
    const animatedElements = document.querySelectorAll('.card, .testimonial, .section-header');

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // ============================================
    // 6. CONTADOR ANIMADO (para números)
    // ============================================
    function animateCounter(element, target, duration = 2000) {
        let current = 0;
        const increment = target / (duration / 16); // 60 FPS

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    // Observar contadores si existen
    const counters = document.querySelectorAll('[data-counter]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-counter'));

        const counterObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(counter, target);
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counterObserver.observe(counter);
    });

    // ============================================
    // 7. SISTEMA SIMPLE DE BLOG/FILTRADO
    // ============================================
    const blogFilters = document.querySelectorAll('[data-filter]');
    const blogPosts = document.querySelectorAll('[data-category]');

    if (blogFilters.length > 0) {
        blogFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                const category = this.getAttribute('data-filter');

                // Actualizar botones activos
                blogFilters.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filtrar posts
                blogPosts.forEach(post => {
                    const postCategory = post.getAttribute('data-category');

                    if (category === 'all' || postCategory === category) {
                        post.style.display = 'block';
                        setTimeout(() => {
                            post.style.opacity = '1';
                            post.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        post.style.opacity = '0';
                        post.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            post.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ============================================
    // 8. MODAL DE LOGIN
    // ============================================
    const loginModal = document.getElementById('loginModal');
    const loginModalClose = document.getElementById('loginModalClose');
    const loginModalOverlay = document.getElementById('loginModalOverlay');

    // Función para abrir el modal de login
    window.abrirModalLogin = function() {
        if (loginModal) {
            loginModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    };

    // Función para cerrar el modal de login
    window.cerrarModalLogin = function() {
        if (loginModal) {
            loginModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    };

    // Cerrar modal de login al hacer clic en X
    if (loginModalClose) {
        loginModalClose.addEventListener('click', window.cerrarModalLogin);
    }

    // Cerrar modal de login al hacer clic en overlay
    if (loginModalOverlay) {
        loginModalOverlay.addEventListener('click', window.cerrarModalLogin);
    }

    // ============================================
    // 9. MODAL DE REGISTRO
    // ============================================
    const registroModal = document.getElementById('registroModal');
    const registroModalClose = document.getElementById('registroModalClose');
    const registroModalOverlay = document.getElementById('registroModalOverlay');

    // Función para abrir el modal de registro
    window.abrirModalRegistro = function() {
        if (registroModal) {
            registroModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    };

    // Función para cerrar el modal de registro
    window.cerrarModalRegistro = function() {
        if (registroModal) {
            registroModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    };

    // Cerrar modal de registro al hacer clic en X
    if (registroModalClose) {
        registroModalClose.addEventListener('click', window.cerrarModalRegistro);
    }

    // Cerrar modal de registro al hacer clic en overlay
    if (registroModalOverlay) {
        registroModalOverlay.addEventListener('click', window.cerrarModalRegistro);
    }

    // Cerrar modales con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (loginModal && loginModal.style.display === 'flex') {
                window.cerrarModalLogin();
            }
            if (registroModal && registroModal.style.display === 'flex') {
                window.cerrarModalRegistro();
            }
        }
    });

    // ============================================
    // 9. MODAL SIMPLE (si se necesita)
    // ============================================
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const modalCloses = document.querySelectorAll('.modal-close');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    modalCloses.forEach(close => {
        close.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    });

    // Cerrar modal al hacer clic fuera
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    });

    // ============================================
    // 9. CALENDARIO SIMPLE (para página de citas)
    // ============================================
    // Este es un placeholder - en producción usarías Calendly, Acuity, etc.
    const calendarDays = document.querySelectorAll('.calendar-day');

    calendarDays.forEach(day => {
        day.addEventListener('click', function() {
            if (!this.classList.contains('disabled')) {
                calendarDays.forEach(d => d.classList.remove('selected'));
                this.classList.add('selected');

                // Mostrar horarios disponibles
                const availableTimesSection = document.getElementById('available-times');
                if (availableTimesSection) {
                    availableTimesSection.style.display = 'block';
                }
            }
        });
    });

    // ============================================
    // 10. TOOLTIPS SIMPLES
    // ============================================
    const tooltipElements = document.querySelectorAll('[data-tooltip]');

    tooltipElements.forEach(element => {
        element.style.position = 'relative';
        element.style.cursor = 'help';

        element.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            tooltip.style.cssText = `
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
                background: var(--color-text);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                font-size: 0.85rem;
                white-space: nowrap;
                margin-bottom: 0.5rem;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s;
            `;

            this.appendChild(tooltip);
            setTimeout(() => tooltip.style.opacity = '1', 10);
        });

        element.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.tooltip');
            if (tooltip) {
                tooltip.style.opacity = '0';
                setTimeout(() => tooltip.remove(), 300);
            }
        });
    });

    // ============================================
    // 11. CARGA LAZY DE IMÁGENES
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // ============================================
    // 12. COPIAR AL PORTAPAPELES
    // ============================================
    const copyButtons = document.querySelectorAll('[data-copy]');

    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');

            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = this.textContent;
                this.textContent = '✓ Copiado!';

                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        });
    });

});

// ============================================
// FUNCIONES GLOBALES ÚTILES
// ============================================

// Formatear fecha
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('es-ES', options);
}

// Validar email
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Scroll suave a elemento
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const header = document.getElementById('header');
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = element.offsetTop - headerHeight - 20;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Mostrar notificación
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--color-sage)' : '#ff6b6b'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Animaciones CSS que se pueden usar
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// NAVEGACIÓN INTELIGENTE A ÁREA PERSONAL
// ============================================

/**
 * Función que gestiona el click en "👤 Área Personal" del menú
 * - Si el usuario está autenticado → Navega a area-privada.html
 * - Si NO está autenticado → Abre modal de login
 */
function navegarAreaPersonal(event) {
    event.preventDefault(); // Prevenir navegación por defecto

    // Verificar si el usuario está autenticado
    if (typeof obtenerUsuarioActual === 'function') {
        const usuario = obtenerUsuarioActual();

        if (usuario) {
            // DEBUG: Store user object for inspection on next page
            localStorage.setItem('debugUser', JSON.stringify(usuario));
            // Usuario autenticado → Navegar a área privada
            window.location.href = 'area-privada.html';
        } else {
            // Usuario NO autenticado → Abrir modal de login
            if (typeof abrirModalLogin === 'function') {
                abrirModalLogin();
            } else {
                console.error('Función abrirModalLogin no encontrada');
            }
        }
    } else {
        console.error('Función obtenerUsuarioActual no encontrada');
    }
}

/**
 * Función que gestiona el click en "⚙️ Mi Cuenta" del menú
 * - Si el usuario está autenticado → Navega a cuenta.html
 * - Si NO está autenticado → Abre modal de login
 */
function navegarCuenta(event) {
    event.preventDefault(); // Prevenir navegación por defecto

    // Verificar si el usuario está autenticado
    if (typeof obtenerUsuarioActual === 'function') {
        const usuario = obtenerUsuarioActual();

        if (usuario) {
            // Usuario autenticado → Navegar a cuenta
            window.location.href = 'cuenta.html';
        } else {
            // Usuario NO autenticado → Abrir modal de login
            if (typeof abrirModalLogin === 'function') {
                abrirModalLogin();
            } else {
                console.error('Función abrirModalLogin no encontrada');
            }
        }
    } else {
        console.error('Función obtenerUsuarioActual no encontrada');
    }
}

// ============================================
// VALIDACIÓN LEAD MAGNET - CON MENSAJES HTML5
// ============================================

if (document.getElementById('leadMagnetForm')) {
    const leadName = document.getElementById('leadName');
    const leadEmail = document.getElementById('leadEmail');
    const consentCheckbox = document.getElementById('consentCheckbox');
    const leadSubmitBtn = document.getElementById('leadSubmitBtn');

    function validar() {
        const nombre = leadName.value.trim();
        const email = leadEmail.value.trim();
        const checkbox = consentCheckbox.checked;

        // Las 3 condiciones
        const todoValido = nombre.length > 0 && email.includes('@') && checkbox;

        // Solo cambiar color (NO disabled para permitir validación HTML5)
        if (todoValido) {
            leadSubmitBtn.classList.remove('btn-secondary');
            leadSubmitBtn.classList.add('btn-primary');
        } else {
            leadSubmitBtn.classList.remove('btn-primary');
            leadSubmitBtn.classList.add('btn-secondary');
        }
    }

    // Validar en tiempo real
    leadName.addEventListener('input', validar);
    leadEmail.addEventListener('input', validar);
    consentCheckbox.addEventListener('change', validar);

    // Submit
    document.getElementById('leadMagnetForm').addEventListener('submit', function(e) {
        e.preventDefault();

        // Verificar si el formulario es válido
        if (this.checkValidity()) {
            console.log('📧 Lead enviado:', { nombre: leadName.value, email: leadEmail.value });
            mostrarMensajeFormulario(this, '✓ ¡Perfecto! Revisa tu email para descargar el recurso.', 'success');
            this.reset();
            validar(); // Resetear botón
        } else {
            // Si no es válido, forzar mostrar mensajes de validación HTML5
            this.reportValidity();
        }
    });

    // Estado inicial
    validar();
}

// Verificación de carga exitosa con timestamp para debugging de caché
console.log('✨ main.js v15 cargado correctamente - ' + new Date().toLocaleTimeString());
console.log('✅ Lead Magnet: Validación exclusiva (sin conflicto con listener genérico)');
