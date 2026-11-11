import { query, queryAll } from './dom-utils.js';
import { renderProjectDetail } from './project-renderer.js';
import { portfolioHTML } from './portfolio-case.js';

/** Hash routes also work under a GitHub Pages repository subdirectory. */
export function initNavigation(projects) {
  query('#back-to-top').addEventListener('click', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'instant' : 'smooth' });
  });
  const homeView = query('#home-view');
  const caseView = query('#case-view');
  let scrollPending = false;
  function scrollToSection(id, behavior = 'instant') {
    requestAnimationFrame(() =>
      document.getElementById(id)?.scrollIntoView({ behavior }),
    );
  }
  function updateProgress() {
    const max = document.documentElement.scrollHeight - innerHeight;
    query('.reading-progress').style.width = (max > 0 ? (scrollY / max) * 100 : 0) + '%';
    if (!caseView.hidden) updateCasePosition(max);
    scrollPending = false;
  }
  function updateCasePosition(maxScroll) {
    const sections = queryAll('.case-section[id]', caseView);
    if (!sections.length) return;

    // Match the section's scroll margin plus the page's scroll padding.
    const readingLine = 190;
    const atBottom = maxScroll > 0 && scrollY >= maxScroll - 2;
    const current = atBottom
      ? sections.at(-1)
      : sections.findLast((section) => section.getBoundingClientRect().top <= readingLine) ||
        sections[0];

    queryAll('.case-nav a', caseView).forEach((link) => {
      const active = link.hash.split('/').at(-1) === current.id;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  function enterCase(id, html, title) {
    const changed = caseView.dataset.project !== id,
      entering = caseView.hidden;
    if (changed) {
      caseView.innerHTML = html;
      caseView.dataset.project = id;
    }
    homeView.hidden = true;
    caseView.hidden = false;
    document.title = title + ' — 이재범';
    return changed || entering;
  }
  function route(behavior = 'instant') {
    const hash = location.hash.slice(1),
      project = projects.find(
        (item) => hash === 'case/' + item.id || hash.startsWith('case/' + item.id + '/'),
      );
    if (project) {
      const entering = enterCase(project.id, renderProjectDetail(project), project.title);
      const section = hash.split('/')[2];
      if (
        section &&
        [
          'overview',
          'process',
          'troubleshooting',
          'improvements',
          'verification',
          'reflection',
        ].includes(section)
      )
        scrollToSection(section, behavior);
      else if (entering) {
        window.scrollTo({ top: 0, behavior: 'instant' });
        query('.case-hero h1').focus({ preventScroll: true });
      }
    } else if (hash === 'case/portfolio' || hash.startsWith('case/portfolio/')) {
      if (enterCase('portfolio', portfolioHTML, '포트폴리오 구성 기록')) {
        window.scrollTo({ top: 0, behavior: 'instant' });
        query('.case-hero h1').focus({ preventScroll: true });
      }
    } else {
      const returning = homeView.hidden;
      homeView.hidden = false;
      caseView.hidden = true;
      document.title = '이재범 — Frontend Portfolio';
      const aliases = { lab: 'work', projects: 'work' };
      const target = aliases[hash] || hash;
      if (['home', 'work', 'skills', 'about', 'contact'].includes(target)) scrollToSection(target, behavior);
      else if (returning) window.scrollTo({ top: 0, behavior: 'instant' });
    }
    updateProgress();
  }
  window.addEventListener('hashchange', () => route());
  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.ctrlKey ||
        event.metaKey || event.shiftKey || event.altKey) return;

    const link = event.target.closest('a[href^="#"]');
    if (!link || link.target || link.hasAttribute('download')) return;

    const hash = link.hash;
    const [, , projectSection] = hash.split('/');
    const homeSection = /^#(?:home|work|skills|about|contact|projects|lab)$/.test(hash);
    const sameCase = !caseView.hidden &&
      hash.startsWith('#case/' + caseView.dataset.project + '/') &&
      projectSection && caseView.contains(document.getElementById(projectSection));

    if (!(homeSection && !homeView.hidden) && !sameCase) return;

    event.preventDefault();
    if (location.hash !== hash) history.pushState(null, '', hash);
    route(window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth');
  });
  route();
  window.addEventListener(
    'scroll',
    () => {
      if (!scrollPending) {
        scrollPending = true;
        requestAnimationFrame(updateProgress);
      }
    },
    { passive: true },
  );
  window.addEventListener('resize', updateProgress);
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      if (homeView.hidden) return;
      for (const entry of entries) {
        if (entry.isIntersecting)
          queryAll('.site-header nav a').forEach((link) =>
            link.classList.toggle('active', link.hash === '#' + entry.target.id),
          );
      }
    },
    { rootMargin: '-15% 0px -55% 0px' },
  );
  queryAll('#work,#skills,#about,#contact').forEach((section) => sectionObserver.observe(section));
}
