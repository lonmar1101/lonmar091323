const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-links');
const navLinks = [...document.querySelectorAll('.nav-link')];
menuToggle?.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  menuToggle.setAttribute('aria-label', expanded ? 'Open menu' : 'Close menu');
  menuToggle.querySelector('i').className = expanded ? 'bi bi-list' : 'bi bi-x-lg';
  menu.classList.toggle('open', !expanded);
});
menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Open menu');
  if (menuToggle) menuToggle.querySelector('i').className = 'bi bi-list';
}));
const sections = [...document.querySelectorAll('main section[id]')];
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {if (entry.isIntersecting) {entry.target.classList.add('visible'); observer.unobserve(entry.target);}});
  }, {threshold: 0.08});
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, {rootMargin: '-35% 0px -55% 0px'});
  sections.forEach(section => navObserver.observe(section));
} else {document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));}
document.querySelector('#year').textContent = new Date().getFullYear();
const copyButton = document.querySelector('.copy-email');
copyButton?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(copyButton.dataset.email);
    const label = copyButton.querySelector('span');
    const icon = copyButton.querySelector('i');
    label.textContent = 'Copied!'; icon.className = 'bi bi-check-lg';
    setTimeout(() => {label.textContent = 'Copy'; icon.className = 'bi bi-copy';}, 1800);
  } catch {window.location.href = `mailto:${copyButton.dataset.email}`;}
});
