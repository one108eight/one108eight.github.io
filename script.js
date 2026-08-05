document.documentElement.classList.add('js');

const header = document.querySelector('[data-header]');
const button = document.querySelector('[data-menu-button]');
const mobileNav = document.querySelector('[data-mobile-nav]');

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 18);
}
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

button.addEventListener('click', () => {
  const open = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', String(!open));
  mobileNav.hidden = open;
  header.classList.toggle('menu-open', !open);
});

mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  button.setAttribute('aria-expanded', 'false');
  mobileNav.hidden = true;
  header.classList.remove('menu-open');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
document.querySelector('[data-year]').textContent = new Date().getFullYear();
