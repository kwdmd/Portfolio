'use strict';
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const carousel = document.getElementById('feature-carousel');
const slides = [...carousel.querySelectorAll('.con15_img_slide')];
const descriptions = [...carousel.querySelectorAll('.text_group')];
let current = 0;

function renderSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('out', i === current && i !== index);
    slide.classList.toggle('active', i === index);
    slide.setAttribute('aria-hidden', String(i !== index));
  });
  descriptions.forEach((description, i) => {
    description.classList.toggle('active', i === index);
    description.setAttribute('aria-hidden', String(i !== index));
  });
  current = index;
}

slides.forEach((slide, i) => {
  const title = descriptions[i].querySelector('.text_title').textContent.trim();
  slide.querySelector('img').alt = title + ' 앱 화면';
});
renderSlide(0);
carousel.classList.add('is-rotating');

setInterval(() => {
  if (!reduce.matches && !document.hidden) renderSlide((current + 1) % slides.length);
}, 6000);


const gallery = document.querySelector('.con7_box3'),
  cards = Array.from(gallery.querySelectorAll('.con7_box4'));
let selected = Math.min(2, cards.length - 1),
  resizeFrame;
function centerCard(behavior = 'smooth') {
  const item = cards[selected],
    itemBox = item.getBoundingClientRect(),
    containerBox = gallery.getBoundingClientRect();
  const desired =
    gallery.scrollLeft +
    itemBox.left +
    itemBox.width / 2 -
    (containerBox.left + gallery.clientWidth / 2);
  gallery.scrollTo({
    left: Math.max(0, Math.min(desired, gallery.scrollWidth - gallery.clientWidth)),
    behavior: reduce.matches ? 'instant' : behavior,
  });
}
function selectCard(index, behavior = 'smooth') {
  selected = (index + cards.length) % cards.length;
  cards.forEach((card, i) => {
    const active = i === selected;
    card.classList.toggle('active', active);
    card.setAttribute('aria-pressed', String(active));
    card.tabIndex = active ? 0 : -1;
  });

  centerCard(behavior);
}
cards.forEach((card, i) => {
  card.addEventListener('click', () => selectCard(i));
});
// Space for half a viewport at each edge also allows the first/last card to center.
function resizeGallery() {
  const padding = Math.max(16, (gallery.clientWidth - cards[0].getBoundingClientRect().width) / 2);
  gallery.style.paddingInline = padding + 'px';
  centerCard('instant');
}
new ResizeObserver(() => {
  cancelAnimationFrame(resizeFrame);
  resizeFrame = requestAnimationFrame(resizeGallery);
}).observe(gallery);
selectCard(selected, 'instant');

const scrollButton = document.getElementById('scrollTop');
function updateScrollButton() {
  scrollButton.hidden = scrollY <= 300;
  scrollButton.classList.toggle('show', !scrollButton.hidden);
}
window.addEventListener('scroll', updateScrollButton, { passive: true });
scrollButton.setAttribute('aria-label', '맨 위로 이동');
scrollButton.addEventListener('click', () =>
  scrollTo({ top: 0, behavior: reduce.matches ? 'instant' : 'smooth' }),
);
updateScrollButton();
if (!reduce.matches && 'IntersectionObserver' in window) {
  const targets = [...document.querySelectorAll('.reveal-on-scroll')];
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting);
    visible.forEach(({ target }, index) => {
      target.style.setProperty('--reveal-delay', Math.min(index, 3) * 80 + 'ms');
      target.classList.replace('reveal-pending', 'reveal-visible');
      observer.unobserve(target);
    });
  }, { rootMargin: '0px 0px -24px 0px' });

  targets.forEach((target) => {
    target.classList.add('reveal-pending');
    observer.observe(target);
  });

  reduce.addEventListener('change', ({ matches }) => {
    if (!matches) return;
    observer.disconnect();
    targets.forEach((target) => target.classList.remove('reveal-pending', 'reveal-visible'));
  });
}

const video = document.querySelector('video');
if (video) video.volume = 0.5;
setTimeout(
  () => {
    document.querySelector('.header_img2')?.classList.add('show');
  },
  reduce.matches ? 0 : 1000,
);


if (new URLSearchParams(location.search).get('reveal-audit') === '1') {
  document.body.classList.add('reveal-audit');
}