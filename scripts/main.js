// Intersection Observer para animações de fade-in
document.addEventListener("DOMContentLoaded", function () {
  // Configuração do Intersection Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  // Função para animar elementos quando entram na viewport
  const animateOnScroll = function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const delay = parseInt(element.dataset.delay) || 0;

        // Aplicar delay se especificado
        setTimeout(() => {
          element.classList.add("visible");
        }, delay);

        // Parar de observar após a animação
        observer.unobserve(element);
      }
    });
  };

  // Criar o observer
  const observer = new IntersectionObserver(animateOnScroll, observerOptions);

  // Observar todos os elementos com classe fade-in
  const fadeElements = document.querySelectorAll(".fade-in");
  fadeElements.forEach((element) => {
    observer.observe(element);
  });

  // Smooth scroll para links internos (se houver)
  const smoothScroll = function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Aplicar smooth scroll a links internos
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach((link) => {
    link.addEventListener("click", smoothScroll);
  });

  // Efeito parallax removido para manter background estático
  // const parallaxEffect = function () {
  //   const scrolled = window.pageYOffset;
  //   const parallaxElements = document.querySelectorAll(".bg-blur");

  //   parallaxElements.forEach((element) => {
  //     const speed = 0.5;
  //     element.style.transform = `translateY(${scrolled * speed}px) scale(1.1)`;
  //   });
  // };

  // Aplicar efeito parallax apenas em dispositivos desktop
  // if (window.innerWidth > 768) {
  //   window.addEventListener("scroll", parallaxEffect);
  // }

  // Preloader simples (opcional)
  const preloader = function () {
    const preloaderElement = document.querySelector(".preloader");
    if (preloaderElement) {
      setTimeout(() => {
        preloaderElement.style.opacity = "0";
        setTimeout(() => {
          preloaderElement.style.display = "none";
        }, 500);
      }, 1000);
    }
  };

  // Executar preloader
  preloader();

  // Adicionar classe para animações CSS após carregamento
  document.body.classList.add("loaded");

  // Efeito de hover nas imagens da galeria
  const galleryItems = document.querySelectorAll(
    ".gallery-item, .gallery-item-wide"
  );

  galleryItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.02)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  });

  // Animação suave para o ícone do coração
  const heartIcons = document.querySelectorAll(".heart-icon");

  heartIcons.forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.5}s`;
  });

  // Detectar mudança de orientação do dispositivo
  window.addEventListener("orientationchange", function () {
    setTimeout(() => {
      // Recarregar animações após mudança de orientação
      const visibleElements = document.querySelectorAll(".fade-in.visible");
      visibleElements.forEach((element) => {
        element.style.animation = "none";
        element.offsetHeight; // Trigger reflow
        element.style.animation = null;
      });
    }, 100);
  });

  // Otimização de performance: debounce para scroll
  let ticking = false;

  function updateOnScroll() {
    if (!ticking) {
      requestAnimationFrame(function () {
        // Aqui você pode adicionar outras animações baseadas no scroll
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", updateOnScroll);

  // Adicionar classe para dispositivos touch
  if ("ontouchstart" in window || navigator.maxTouchPoints) {
    document.body.classList.add("touch-device");
  }

  // Console log para debug (remover em produção)
  console.log("Convite carregado com sucesso! 🎉");
});

// Função para adicionar efeito de partículas (opcional)
function addParticles() {
  const particlesContainer = document.createElement("div");
  particlesContainer.className = "particles-container";
  particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;

  document.body.appendChild(particlesContainer);

  // Criar partículas
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(234, 179, 8, 0.3);
            border-radius: 50%;
            animation: float 6s ease-in-out infinite;
            animation-delay: ${Math.random() * 6}s;
        `;

    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";

    particlesContainer.appendChild(particle);
  }
}

// Adicionar CSS para animação de partículas
const particleStyles = document.createElement("style");
particleStyles.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
        }
        50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.8;
        }
    }
`;
document.head.appendChild(particleStyles);

// Descomentar a linha abaixo se quiser adicionar partículas
// addParticles();
