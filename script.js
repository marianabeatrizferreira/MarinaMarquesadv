const cursorGlow = document.querySelector(".cursor-glow");
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");
const revealElements = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll(".counter");
const faqItems = document.querySelectorAll(".faq-item");
const tiltCards = document.querySelectorAll(".tilt-card");
const floatingCard = document.querySelector(".floating-card");


window.addEventListener("mousemove", (e) => {
  if (cursorGlow) {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  }
});


if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("open");
    menuToggle.classList.toggle("active");
  });

  document.querySelectorAll(".menu a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
    });
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

const animateCounter = (element) => {
  const target = Number(element.dataset.target);
  let current = 0;
  const increment = Math.max(1, Math.ceil(target / 70));

  const update = () => {
    current += increment;

    if (current >= target) {
      current = target;
    }

    element.textContent = current;

    if (current < target) {
      requestAnimationFrame(update);
    } else {
      if (target === 97) {
        element.textContent = `${target}%`;
      } else if (target === 400) {
        element.textContent = `${target}+`;
      } else {
        element.textContent = `${target}+`;
      }
    }
  };

  update();
};

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.6,
  }
);

counters.forEach((counter) => counterObserver.observe(counter));


faqItems.forEach((item) => {
  const button = item.querySelector(".faq-question");

  button.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    faqItems.forEach((faq) => faq.classList.remove("active"));

    if (!isActive) {
      item.classList.add("active");
    }
  });
});

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = ((y / rect.height) - 0.5) * -10;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
  });
});


window.addEventListener("mousemove", (e) => {
  if (!floatingCard) return;

  const x = (e.clientX / window.innerWidth - 0.5) * 12;
  const y = (e.clientY / window.innerHeight - 0.5) * -12;

  floatingCard.style.transform = `rotateX(${y}deg) rotateY(${x}deg) translateY(0px)`;
});

window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");

  if (window.scrollY > 20) {
    header.style.boxShadow = "0 12px 30px rgba(0,0,0,0.22)";
  } else {
    header.style.boxShadow = "none";
  }
});


const form = document.querySelector(".contact-form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = form.querySelector('input[placeholder="Seu nome"]').value;
    const email = form.querySelector('input[placeholder="Seu melhor e-mail"]').value;
    const telefone = form.querySelector('input[Telefone/WhatsApp"]').value;
    const mensagem = form.querySelector('textarea').value;

    const numeroWhatsapp = "5531992272821"; 
    const texto = `Olá, me chamo ${nome}.
E-mail: ${email}
Telefone: ${telefone}

Gostaria de solicitar um contato sobre o seguinte caso:
${mensagem}`;

    const url = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(texto)}`;

    window.open(url, "_blank");
  });
}