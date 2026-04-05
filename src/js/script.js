const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const menuLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];
const form = document.querySelector("#contact-form");
const feedback = document.querySelector("#form-feedback");

const updateHeaderState = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

const closeMobileMenu = () => {
  if (!mobileMenu || !menuToggle) return;
  mobileMenu.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
};

const toggleMobileMenu = () => {
  if (!mobileMenu || !menuToggle) return;
  const isOpen = mobileMenu.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
};

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

if (menuToggle) {
  menuToggle.addEventListener("click", toggleMobileMenu);
}

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    closeMobileMenu();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});

menuLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

if (form && feedback) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      feedback.textContent = "Confira os campos antes de enviar.";
      feedback.className = "text-sm text-rose-300";
      form.reportValidity();
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = '<span>Enviando</span><i class="fa-solid fa-circle-notch fa-spin"></i>';
    }

    window.setTimeout(() => {
      feedback.textContent = "Mensagem enviada com sucesso.";
      feedback.className = "text-sm text-lime";
      form.reset();

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = '<span>Enviar</span><i class="fa-solid fa-arrow-right"></i>';
      }
    }, 900);
  });
}
