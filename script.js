// Reveal elements as they enter the viewport.
const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => revealObserver.observe(item));

// Play project previews only while hovering. This keeps the page lighter than
// autoplaying every project video at the same time.
document.querySelectorAll('.project-media').forEach((card) => {
  const video = card.querySelector('video');
  if (!video) return;

  card.addEventListener('mouseenter', () => {
    video.play().catch(() => {});
  });

  card.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0;
  });
});

// Mobile navigation.
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open);
  menuButton.textContent = open ? 'Close' : 'Menu';
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = 'Menu';
  });
});

// Small pointer glow on desktop.
const glow = document.querySelector('.cursor-glow');

window.addEventListener('pointermove', (event) => {
  if (event.pointerType === 'touch') return;
  glow.style.opacity = '1';
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

window.addEventListener('mouseout', () => {
  glow.style.opacity = '0';
});

// Demo form behavior. Replace this with Formspree / Resend / your API later.
const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  status.textContent = 'Demo submitted ✓ Connect a form service to receive real messages.';
  form.reset();
});

document.querySelector('#year').textContent = new Date().getFullYear();
