// ✅ Función para activar modo oscuro persistente
function setupDarkModeToggle() {
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

// ✅ Función para cargar menú y configurar modo oscuro
function loadMenu() {
  fetch('menu.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('menu-container').innerHTML = html;
      setupDarkModeToggle();
    });
}

// ✅ Función para cargar footer
function loadFooter() {
  fetch('footer.html')
    .then(res => res.text())
    .then(html => {
      const footerEl = document.getElementById('footer-container');
      if (footerEl) {
        footerEl.innerHTML = html;
      } else {
        // Si no hay contenedor, lo crea y lo agrega al final del body
        const newFooter = document.createElement('div');
        newFooter.id = 'footer-container';
        newFooter.innerHTML = html;
        document.body.appendChild(newFooter);
      }
    });
}

// ✅ Efectos en tarjetas al hacer hover
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

// ✅ Carrusel personalizado
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

    setInterval(() => {
      current = (current + 1) % images.length;
      showImage(current);
    }, 5000);
  }
}

// ✅ Inicializador general
document.addEventListener('DOMContentLoaded', () => {
  loadMenu();
  loadFooter();
  setupCardHoverEffects();
  setupCustomCarousel();
});
