// Initialiser AOS (Animate On Scroll)
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 700,
    easing: 'ease-out',
    once: true,
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // === Effet de la navigation au scroll ===
  const entete = document.getElementById('entete');
  if (entete) {
    window.addEventListener('scroll', () => {
      entete.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // === Animation des barres de compétences ===
  const sectionCompetences = document.getElementById('competences');
  if (sectionCompetences) {
    const observerBarres = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.barre-remplissage').forEach(barre => {
            barre.style.width = barre.dataset.largeur || '0%';
          });
          observerBarres.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observerBarres.observe(sectionCompetences);
  }

  // === Animation d'apparition des cartes ===
  document.querySelectorAll('.competence-carte, .projet-carte, .outil-carte, .service-carte').forEach((el, i) => {
    el.classList.add('apparition');
    el.style.transitionDelay = `${(i % 3) * 0.1}s`;
  });

  const observerApparition = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observerApparition.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.apparition').forEach(el => observerApparition.observe(el));

  // === Gestion du formulaire de contact ===
  const formulaire = document.getElementById('formulaire-contact');
  if (formulaire) {
    formulaire.addEventListener('submit', e => {
      e.preventDefault();
      const nom = formulaire.querySelector('#nom')?.value.trim() || '';
      const email = formulaire.querySelector('#email')?.value.trim() || '';
      const message = formulaire.querySelector('#message')?.value.trim() || '';

      if (!nom || !email || !message) {
        alert('Veuillez remplir tous les champs.');
        return;
      }

      const subject = encodeURIComponent(`Message de ${nom}`);
      const body = encodeURIComponent(`Nom : ${nom}\nEmail : ${email}\n\nMessage :\n${message}`);
      window.location.href = `mailto:samakeamadou2006@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  // === Mise en surbrillance du lien de navigation actif ===
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerNav = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => observerNav.observe(section));

  // === Smooth scroll et fermeture du menu mobile ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });

        const navMenu = document.querySelector('.navbar-collapse.show');
        if (navMenu) {
          bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
        }
      }
    });
  });

  // === Bouton retour en haut ===
  const scrollBtn = document.createElement('button');
  scrollBtn.className = 'scroll-to-top';
  scrollBtn.setAttribute('aria-label', 'Retour en haut de la page');
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  document.body.appendChild(scrollBtn);

  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('visible', window.scrollY > 300);
  });
});