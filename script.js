const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.1 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else { revealItems.forEach((item) => item.classList.add('visible')); }

document.querySelectorAll('.project-media, [data-hover-video]').forEach((card) => {
  const video = card.querySelector('video'); if (!video) return;
  card.addEventListener('mouseenter', () => { card.classList.add('is-playing'); video.play().catch(() => {}); });
  card.addEventListener('mouseleave', () => { card.classList.remove('is-playing'); video.pause(); try { video.currentTime = 0; } catch (_) {} });
});

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); menuButton.textContent = open ? 'Cerrar' : 'Menú'; });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { nav.classList.remove('open'); const dd = document.querySelector('.nav-dropdown'); const dt = document.querySelector('.nav-dropdown-toggle'); if (dd) dd.classList.remove('open'); if (dt) dt.setAttribute('aria-expanded','false'); menuButton.setAttribute('aria-expanded','false'); menuButton.textContent='Menú'; }));
}

// Nested “Acerca de nosotros” navigation.
const dropdown = document.querySelector('.nav-dropdown');
const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
if (dropdown && dropdownToggle) {
  dropdownToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const open = dropdown.classList.toggle('open');
    dropdownToggle.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove('open');
      dropdownToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => { if (header) header.classList.toggle('scrolled', window.scrollY > 24); }, { passive:true });
const glow = document.querySelector('.cursor-glow');
if (glow) { window.addEventListener('pointermove',(e)=>{ if(e.pointerType==='touch')return; glow.style.opacity='1'; glow.style.left=`${e.clientX}px`; glow.style.top=`${e.clientY}px`; }); document.documentElement.addEventListener('mouseleave',()=>{glow.style.opacity='0';}); }

function openMailFromForm(form) {
  const data = new FormData(form);
  const values = {};
  for (const [key, value] of data.entries()) {
    if (values[key]) values[key] += `, ${value}`; else values[key] = value;
  }
  const subject = encodeURIComponent(`Consulta web Creadora — ${values.project || values.name || 'Nuevo proyecto'}`);
  const lines = [
    `Nombre: ${values.name || 'No especificado'}`,
    `Email: ${values.email || 'No especificado'}`,
    `Teléfono: ${values.phone || 'No especificado'}`,
    `Empresa / proyecto: ${values.project || 'No especificado'}`,
    `Servicio(s): ${values.service || 'No especificado'}`,
    `Presupuesto: ${values.budget || 'No especificado'}`,
    '', 'Mensaje:', values.message || 'Sin mensaje'
  ];
  window.location.href = `mailto:creadorabo@gmail.com?subject=${subject}&body=${encodeURIComponent(lines.join('\n'))}`;
}

document.querySelectorAll('form[data-mailto-form], #contact-form').forEach((form) => {
  form.addEventListener('submit', (event) => { event.preventDefault(); const status = form.querySelector('#form-status') || document.querySelector('#form-status'); if(status) status.textContent='Abriendo tu cliente de correo…'; openMailFromForm(form); });
});

document.querySelectorAll('#year').forEach((item) => { item.textContent = new Date().getFullYear(); });
