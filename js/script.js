// ==========================================================
// ✅ CONFIGURACIÓN GLOBAL
// ==========================================================
const isInHtmlFolder = window.location.pathname.includes('/html/');
const basePath = isInHtmlFolder ? '../' : '';

// ==========================================================
// ✅ FUNCIÓN: Cargar el menú dinámicamente
// ==========================================================
function loadMenu() {
  fetch(basePath + 'html/menu.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('menu').innerHTML = html;

      // Insertar enlaces del menú
      const navLinks = document.getElementById('navLinks');
      if (navLinks) {
        navLinks.innerHTML = `
          <li class="nav-item"><a class="nav-link text-danger fw-bold" href="${basePath}index.html">Inicio</a></li>
          <li class="nav-item"><a class="nav-link text-danger fw-bold" href="${basePath}html/servicios.html">Servicios</a></li>
          <li class="nav-item"><a class="nav-link text-danger fw-bold" href="${basePath}html/contacto.html">Contacto</a></li>
        `;
      }

      // Configurar logo
      const logo = document.getElementById('logoMenu');
      if (logo) {
        logo.src = basePath + 'img/LOGO_VS_.png';
        logo.parentElement.href = basePath + 'index.html';
      }

      // Activar modo oscuro después de insertar el botón
      setupDarkModeToggle();
    })
    .catch(err => console.error('Error cargando el menú:', err));
}

// ==========================================================
// ✅ FUNCIÓN: Cargar el footer dinámicamente
// ==========================================================
function loadFooter() {
  fetch(basePath + 'html/footer.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('footer').innerHTML = html;
    })
    .catch(err => console.error('Error cargando el footer:', err));
}

// ==========================================================
// ✅ FUNCIÓN: Modo oscuro persistente
// ==========================================================
function setupDarkModeToggle() {
  // Aplicar si estaba activo previamente
  if (localStorage.getItem('darkMode') === 'on') {
    document.body.classList.add('dark-mode');
  }

  const toggle = document.getElementById('darkModeToggle');
  if (toggle) {
    toggle.onclick = () => {
      const isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', isDark ? 'on' : 'off');
    };
  }
}

// ==========================================================
// ✅ FUNCIÓN: Efecto hover en tarjetas
// ==========================================================
function setupCardHoverEffects() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    });
  });
}

// ==========================================================
// ✅ FUNCIÓN: Carrusel personalizado
// ==========================================================
function setupCustomCarousel() {
  const images = document.querySelectorAll('.carousel-img');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let current = 0;

  function showImage(index) {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });
  }

  if (images.length > 0) {
    showImage(current);

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        current = (current - 1 + images.length) % images.length;
        showImage(current);
      });

      nextBtn.addEventListener('click', () => {
        current = (current + 1) % images.length;
        showImage(current);
      });
    }

    // Cambio automático cada 5 segundos
    setInterval(() => {
      current = (current + 1) % images.length;
      showImage(current);
    }, 5000);
  }
}

// ==========================================================
// ✅ INICIALIZADOR GENERAL
// ==========================================================
document.addEventListener('DOMContentLoaded', () => {
  loadMenu();
  loadFooter();
  setupCardHoverEffects();
  setupCustomCarousel();
});

