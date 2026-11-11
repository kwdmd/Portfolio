import {
  escapeHTML,
  html,
  sanitizeExternalURL,
  sanitizeResourceURL,
  sanitizeImageURL,
} from './dom-utils.js';

/** Render the project list from the editable data file. */
export function renderProjectCards(projects, additionalProjects) {
  if (!projects.length) return;

  additionalProjects.hidden = false;
  additionalProjects.innerHTML = projects
    .map(
      (project) =>
        html`<a
          class="additional-project ${sanitizeImageURL(project.image) ? 'with-preview' : ''}"
          href="#case/${escapeHTML(project.id)}"
          >${sanitizeImageURL(project.image) ? html`<div class="project-preview ${project.imageTheme === 'comma' ? 'comma-preview' : ''}"><span>PROJECT / ${escapeHTML(project.title)}</span><img src="${sanitizeImageURL(project.image)}" alt="${escapeHTML(project.imageAlt || project.title + ' 대표 화면')}" loading="lazy" /></div>` : ''}
          <div class="additional-project-body">
            <span>${escapeHTML(project.type || 'PROJECT')}</span>
            <h3>${escapeHTML(project.title)}</h3>
            <p>${escapeHTML(project.summary)}</p>
            <div class="tags">
              ${(project.stack || []).map((item) => html`<span>${escapeHTML(item)}</span>`).join('')}
            </div>
            <b>제작·개선 과정 ↗</b>
          </div></a
        >`,
    )
    .join('');
}

export function renderProjectDetail(project) {
  const sections = [
    ['overview', '01 / OVERVIEW', '문제와 목표', project.overview],
    ['process', '02 / PROCESS', '제작 과정', project.process],
    ['troubleshooting', '03 / IMPLEMENTATION', '핵심 구현', project.troubleshooting],
    ['improvements', '04 / ITERATION', '개선 전후', project.improvements],
    ...(project.verification
      ? [['verification', '05 / VERIFICATION', '검증 환경과 범위', project.verification]]
      : []),
    [
      'reflection',
      project.verification ? '06 / REFLECTION' : '05 / REFLECTION',
      '회고와 다음 과제',
      project.reflection,
    ],
  ].map(([id, label, title, content]) => [id, label, project.labels?.[id] || title, content]);
  function paragraphs(items) {
    return (Array.isArray(items) ? items : [items])
      .filter(Boolean)
      .map((item) =>
        typeof item === 'string'
          ? html`<p>${escapeHTML(item).replace(/\n/g, '<br>')}</p>`
          : html`<article class="decision">
              <h3>${escapeHTML(item.title)}</h3>
              ${[
                'problem',
                'cause',
                'alternatives',
                'solution',
                'before',
                'change',
                'after',
                'evidence',
                'lesson',
              ]
                .filter((key) => item[key])
                .map(
                  (key) =>
                    html`<p>
                      <strong
                        >${{ problem: '문제', cause: '원인', alternatives: '비교한 대안', solution: '구현과 접근', before: '개선 전', change: '변경', after: '개선 후', evidence: '확인 근거', lesson: '배운 점' }[key]}</strong
                      ><br />${escapeHTML(item[key]).replace(/\n/g, '<br>')}
                    </p>`,
                )
                .join(
                  '',
                )}${item.code ? html`<pre class="case-code"><code>${escapeHTML(item.code)}</code></pre>` : ''}
            </article>`,
      )
      .join('');
  }
  function verification(data) {
    return html`<p class="verification-date">확인일 ${escapeHTML(data.date)}</p>
      <dl class="verification-environment">
        ${data.environment
          .map(
            ([label, value]) =>
              html`<div>
                <dt>${escapeHTML(label)}</dt>
                <dd>${escapeHTML(value)}</dd>
              </div>`,
          )
          .join('')}
      </dl>
      <h3>확인한 조건과 결과</h3>
      <div class="verification-table-wrap">
        <table class="case-checks">
          <thead>
            <tr>
              <th scope="col">항목</th>
              <th scope="col">확인 조건</th>
              <th scope="col">결과</th>
            </tr>
          </thead>
          <tbody>
            ${data.checks
              .map(
                (row) =>
                  html`<tr>
                    ${row.map((value) => html`<td>${escapeHTML(value)}</td>`).join('')}
                  </tr>`,
              )
              .join('')}
          </tbody>
        </table>
      </div>
      <h3>아직 확인하지 않은 범위</h3>
      <ul class="unverified-list">
        ${data.unverified.map((item) => html`<li>${escapeHTML(item)}</li>`).join('')}
      </ul>
      <div class="case-note">${escapeHTML(data.note)}</div>`;
  }
  const source = sanitizeExternalURL(project.source),
    live = sanitizeResourceURL(project.live),
    embeddedGame = project.id === 'unity-shooter' && live,
    image = sanitizeImageURL(project.image);
  const meta = project.meta || [
    ['PERIOD', project.period],
    ['ROLE', project.role],
    ['TEAM', project.team],
    ['STACK', (project.stack || []).join(' · ')],
  ];
  const detailImage = sanitizeImageURL(project.detailImage);
  const thumbnail = detailImage || ((project.imageTheme === 'comma' || project.id === 'unity-shooter') ? image : '');

  return html`<article class="case-page ${project.highlights ? 'with-brief' : ''}">
    <a class="back-link" href="#work">← 작업 목록으로</a>
    <div class="case-hero">
      <span class="case-kicker">${escapeHTML(project.type || 'PROJECT CASE STUDY')}</span>
      <h1 tabindex="-1">${escapeHTML(project.title)}</h1>
      <p>${escapeHTML(project.detailIntro || project.summary)}</p>
      ${thumbnail
        ? html`<img class="project-image case-thumbnail ${project.imageTheme === 'comma' ? 'comma-image' : 'wide-thumbnail'}"
            src="${thumbnail}" alt="${escapeHTML(project.detailImageAlt || project.imageAlt || project.title)}" />`
        : ''}
      ${
        project.highlights
          ? html`<dl class="project-brief" aria-label="프로젝트 핵심 요약">
              ${project.highlights
                .map(
                  (item) =>
                    html`<div>
                      <dt>${escapeHTML(item.label)}</dt>
                      <dd>${escapeHTML(item.text)}</dd>
                    </div>`,
                )
                .join('')}
            </dl>`
          : ''
      }
      <dl class="case-meta ${meta.length === 2 ? 'two-columns' : ''}">
        ${meta
          .map(
            ([label, value]) =>
              html`<div>
                <dt>${escapeHTML(label)}</dt>
                <dd>${escapeHTML(value)}</dd>
              </div>`,
          )
          .join('')}
      </dl>
      <div class="project-resources">
        ${live && !embeddedGame ? html`<a href="${live}" target="_blank" rel="noopener">${escapeHTML(project.liveLabel || '실행하기')} ↗</a>` : ''}${project.original ? html`<a href="${sanitizeResourceURL(project.original)}" target="_blank" rel="noopener">제작 당시 원본 ↗</a>` : ''}${project.improvementCode ? html`<a href="${sanitizeResourceURL(project.improvementCode)}" target="_blank" rel="noopener">개선 코드 ↗</a>` : ''}${source ? html`<a href="${source}" target="_blank" rel="noopener">${escapeHTML(project.sourceLabel || '소스 코드')} ↗</a>` : ''}
      </div>
      ${embeddedGame ? html`<details class="case-game">
        <summary>Unity 게임 플레이</summary>
        <iframe src="${live}" title="Rocket Defense Unity 게임" loading="lazy" allowfullscreen></iframe>
      </details>` : ''}
      ${project.disclosure ? html`<p class="project-scope-note">${escapeHTML(project.disclosure)}</p>` : ''}
      ${
        image
          && !thumbnail
          ? html`<details class="project-visual-details">
              <summary>대표 화면 보기</summary>
              <img
                class="project-image ${project.imageTheme === 'comma' ? 'comma-image' : ''}"
                src="${image}"
                alt="${escapeHTML(project.imageAlt || project.title + ' 대표 화면')}"
                loading="lazy"
              />
            </details>`
          : ''
      }
    </div>
    <div class="case-layout">
      <nav class="case-nav" aria-label="프로젝트 목차">
        ${sections.map(([id, label, title]) => html`<a href="#case/${escapeHTML(project.id)}/${id}">${label.slice(0, 2)} ${escapeHTML(title)}</a>`).join('')}
      </nav>
      <div>
        ${sections
          .map(
            ([id, label, title, content]) =>
              html`<section class="case-section" id="${id}">
                <span>${label}</span>
                <h2>${escapeHTML(title)}</h2>
                ${id === 'verification' ? verification(content) : paragraphs(content) || '<p>내용을 정리 중입니다.</p>'}
              </section>`,
          )
          .join('')}
        <div class="case-bottom"><a class="button primary" href="#work">작업 목록으로 ↗</a></div>
      </div>
    </div>
  </article>`;
}
