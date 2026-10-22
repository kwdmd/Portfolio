(() => {
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const scrollBehavior = () => motionPreference.matches ? 'instant' : 'smooth';

  // Keep reload scrolling independent of the browser's position restoration.
  history.scrollRestoration = 'manual';
  const navigationType = performance.getEntriesByType('navigation')[0]?.type;
  const scrollStorageKey = 'portfolio:scroll:' + location.pathname;
  let previousScrollY = 0;

  try {
    previousScrollY = Math.max(0, Number(sessionStorage.getItem(scrollStorageKey)) || 0);
  } catch { /* Storage may be disabled for local files. */ }

  window.addEventListener('pagehide', () => {
    try {
      sessionStorage.setItem(scrollStorageKey, String(window.scrollY));
    } catch { /* The page remains usable without stored scroll position. */ }
  });

  if (navigationType === 'reload' || navigationType === undefined) {
    history.replaceState(null, '', location.pathname + location.search);
    window.addEventListener('pageshow', event => {
      if (event.persisted) return;

      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const startY = motionPreference.matches ? 0 : Math.min(previousScrollY, maxScroll);
      window.scrollTo({top: startY, left: 0, behavior: 'instant'});
      requestAnimationFrame(() => requestAnimationFrame(() => {
        window.scrollTo({top: 0, left: 0, behavior: scrollBehavior()});
      }));
    });
  }

  function initPortfolio() {
    const query = selector => document.querySelector(selector);
    const home = query('#home');
    const detail = query('#detail');
    const cards = query('#project-cards');
    const detailNumber = query('#detail-number');
    const detailTitle = query('#detail-title');
    const detailSummary = query('#detail-summary');
    const detailTags = query('#detail-tags');
    const nextProject = query('#next-project');
    const sections = Array.from(document.querySelectorAll('#home > section'));
    const menuLinks = Array.from(document.querySelectorAll('nav a'));
    const projects = JSON.parse(query('#portfolio-data').content.textContent);
    const entities = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'};
    const escapeHtml = text => text.replace(/[&<>"']/g, character => entities[character]);
    const renderTags = tags => tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('');

    cards.innerHTML = projects.map((project, index) => `
      <a class="project" href="#project/${index + 1}">
        <div class="thumb project-screenshot" role="img" aria-label="프로젝트 스크린샷을 넣을 빈 공간"></div>
        <h3><span>${escapeHtml(project.title)}</span><b aria-hidden="true">↗</b></h3>
        <p>${escapeHtml(project.summary)}</p>
        <div class="tags">${renderTags(project.tags)}</div>
      </a>
    `).join('');

    function updateActiveMenu() {
      let activeId = 'intro';

      if (!detail.hidden) {
        activeId = 'projects';
      } else {
        const marker = Math.max(81, window.innerHeight * 0.38);
        sections.forEach(section => {
          if (section.getBoundingClientRect().top <= marker) activeId = section.id;
        });
        const atBottom = window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
        if (atBottom) activeId = 'contact';
      }

      menuLinks.forEach(link => {
        const active = link.hash === '#' + activeId;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }

    function route() {
      const match = location.hash.match(/^#project\/([1-9]\d*)$/);
      const projectIndex = match ? Number(match[1]) - 1 : -1;
      const project = projects[projectIndex];
      home.hidden = !!project;
      detail.hidden = !project;

      if (project) {
        detailNumber.textContent = String(projectIndex + 1).padStart(2, '0');
        detailTitle.textContent = project.title;
        detailSummary.textContent = project.summary;
        detailTags.innerHTML = renderTags(project.tags);
        nextProject.href = '#project/' + ((projectIndex + 1) % projects.length + 1);
        window.scrollTo({top: 0, behavior: 'instant'});

        if (!motionPreference.matches) {
          detail.animate([
            {opacity: 0, transform: 'translateY(16px)'},
            {opacity: 1, transform: 'translateY(0)'}
          ], {duration: 380, easing: 'ease-out'});
        }
      } else {
        const target = document.getElementById(location.hash.slice(1));
        if (target) requestAnimationFrame(() => target.scrollIntoView());
      }

      updateActiveMenu();
    }

    // Limit menu calculations to one per animation frame while scrolling.
    let menuFrame = false;
    function scheduleMenuUpdate() {
      if (menuFrame) return;
      menuFrame = true;
      requestAnimationFrame(() => {
        menuFrame = false;
        updateActiveMenu();
      });
    }

    query('#back-to-top').onclick = () => {
      window.scrollTo({top: 0, left: 0, behavior: scrollBehavior()});
    };

    window.addEventListener('scroll', scheduleMenuUpdate, {passive: true});
    window.addEventListener('resize', scheduleMenuUpdate);
    window.addEventListener('hashchange', route);
    route();

    if (!('IntersectionObserver' in window) || motionPreference.matches) return;

    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, {threshold: 0.08, rootMargin: '0px 0px -24px 0px'});

    const revealGroups = [
      '.hero > :not(.hero-art)',
      '#about .about-heading, #about .about-body > *',
      '#skills > .section-top, #skills .skill',
      '#projects > .section-top, #projects .project',
      '#contact .contact > *'
    ];

    revealGroups.forEach(selector => {
      document.querySelectorAll(selector).forEach((element, index) => {
        element.classList.add('reveal');
        element.style.setProperty('--reveal-delay', Math.min(index, 3) * 90 + 'ms');
        revealObserver.observe(element);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio, {once: true});
  } else {
    initPortfolio();
  }
})();
