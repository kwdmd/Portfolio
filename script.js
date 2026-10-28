(() => {
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Show the opening only when motion is enabled; always release the page on failure.
  if (!motionPreference.matches) {
    document.documentElement.classList.add('cube-opening-active');
    document.addEventListener('DOMContentLoaded', () => {
      const overlay = document.getElementById('cube-opening');
      const canvas = overlay?.querySelector('canvas');
      const context = canvas?.getContext('2d');
      let frame = 0;
      let finished = false;
      let safetyTimer;
      const finish = () => {
        if (finished) return;
        finished = true;
        cancelAnimationFrame(frame);
        clearTimeout(safetyTimer);
        document.documentElement.classList.remove('cube-opening-active');
        overlay?.remove();
        document.documentElement.classList.add('slogan-ready');
        motionPreference.removeEventListener('change', finish);
      };
      if (!context) { finish(); return; }
      safetyTimer = setTimeout(finish, 5000);
      motionPreference.addEventListener('change', finish);
      const vertices = [[0,-1], [.866,-.5], [.866,.5], [0,1], [-.866,.5], [-.866,-.5], [0,0]];
      const edges = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[5,6],[1,6],[6,3]];
      const points = [];
      const seen = new Set();
      edges.forEach(([a,b]) => {
        for (let i = 0; i <= 7; i++) {
          const x = vertices[a][0] + (vertices[b][0] - vertices[a][0]) * i / 7;
          const y = vertices[a][1] + (vertices[b][1] - vertices[a][1]) * i / 7;
          const key = x.toFixed(3) + ',' + y.toFixed(3);
          if (seen.has(key)) continue;
          seen.add(key);
          points.push({x, y, startX: Math.random(), startY: Math.random(), delay: Math.random() * 350});
        }
      });
      const clamp = value => Math.max(0, Math.min(1, value));
      const started = performance.now();
      const draw = now => {
        if (finished) return;
        try {
          const width = window.innerWidth;
          const height = window.innerHeight;
          const ratio = Math.min(window.devicePixelRatio || 1, 2);
          if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(height * ratio)) {
            canvas.width = Math.round(width * ratio);
            canvas.height = Math.round(height * ratio);
          }
          context.setTransform(ratio, 0, 0, ratio, 0, 0);
          context.clearRect(0, 0, width, height);
          const elapsed = now - started;
          const size = Math.min(115, width * .22, height * .22) * 1.3;
          const vertex = index => [width / 2 + vertices[index][0] * size, height / 2 + vertices[index][1] * size];
          const fill = clamp((elapsed - 2100) / 650);
          [[0,1,6,5],[5,6,3,4],[6,1,2,3]].forEach((face, index) => {
            context.beginPath();
            face.forEach((id, i) => {
              const [x,y] = vertex(id);
              if (i === 0) context.moveTo(x,y); else context.lineTo(x,y);
            });
            context.closePath();
            context.fillStyle = ['#5577FF','#345CFF','#2346D9'][index];
            context.globalAlpha = fill;
            context.fill();
          });
          context.globalAlpha = clamp((elapsed - 1550) / 500);
          context.strokeStyle = '#345CFF';
          context.lineWidth = 1.2;
          context.beginPath();
          edges.forEach(([a,b]) => { context.moveTo(...vertex(a)); context.lineTo(...vertex(b)); });
          context.stroke();
          points.forEach(point => {
            const progress = clamp((elapsed - point.delay) / 1450);
            const eased = 1 - Math.pow(1 - progress, 3);
            const x = point.startX * width + (width / 2 + point.x * size - point.startX * width) * eased;
            const y = point.startY * height + (height / 2 + point.y * size - point.startY * height) * eased;
            context.globalAlpha = (0.45 + progress * 0.55) * (1 - fill);
            context.fillStyle = '#345CFF';
            context.beginPath();
            context.arc(x, y, 2.5, 0, Math.PI * 2);
            context.fill();
          });
          context.globalAlpha = 1;
          if (elapsed >= 3050) {
            document.documentElement.classList.add('cube-background-visible');
            overlay.classList.add('is-finished');
            setTimeout(finish, 550);
            return;
          }
          frame = requestAnimationFrame(draw);
        } catch { finish(); }
      };
      frame = requestAnimationFrame(draw);
    }, {once: true});
  }

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
        <div class="project-info">
          <p class="project-description">${escapeHtml(project.summary || "설명 추가 예정")}</p>
          <p class="project-year"><span>제작연도</span> ${escapeHtml(project.year || "YYYY")}</p>
        </div>
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
        detail.classList.remove('result-open');
        requestAnimationFrame(() => detail.classList.add('result-open'));
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

    // The same visual rule repeats: explore an outline, then complete a result.
    if (motionPreference.matches || !query('#cube-opening')) {
      document.documentElement.classList.add('slogan-ready');
    }

    if (!('IntersectionObserver' in window) || motionPreference.matches) return;

    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, {threshold: 0.08, rootMargin: '0px 0px -24px 0px'});

    const revealGroups = [
      '.hero > *',
      '#about .about-heading, #about .about-body > *',
      '#skills > .section-top, #skills .skill',
      '#projects > .section-top, #projects .project, #projects .project-arrival',
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
