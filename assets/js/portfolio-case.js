import { html } from './dom-utils.js';

export const portfolioHTML = html`<article class="case-page supporting-case">
  <a class="back-link" href="#work">← 작업 목록으로</a>
  <div class="case-hero">
    <span class="case-kicker">SUPPORTING WORK / AI COLLABORATION</span>
    <h1 tabindex="-1">프로젝트가 먼저 읽히는<br /><span>포트폴리오로.</span></h1>
    <p>Comma의 작업과 구현 과정을 중심으로 소개하는 보조 웹사이트입니다.</p>
    <dl class="case-meta">
      <div>
        <dt>USER</dt>
        <dd>방향 설정 · 결과 평가 · 피드백</dd>
      </div>
      <div>
        <dt>AI</dt>
        <dd>조사 · 정보 구성 · 코드 구현</dd>
      </div>
      <div>
        <dt>TECH</dt>
        <dd>HTML · CSS · JavaScript</dd>
      </div>
      <div>
        <dt>SCOPE</dt>
        <dd>프로젝트 소개 · 기술 · 연락처</dd>
      </div>
    </dl>
  </div>
  <section class="case-section">
    <span>01 / INFORMATION HIERARCHY</span>
    <h2>작업을 보는 동선을 짧게.</h2>
    <p>
      첫 화면에는 탐구를 표현하는 행성과 궤도 그래픽을 사용하고, 프로젝트 목록으로 이어지는 버튼을
      배치했습니다. 별도의 인터랙션 랩은 제거했습니다. 대표 프로젝트 다음에 관련 기술을 연결해
      화면과 코드를 함께 확인할 수 있도록 정리했습니다.
    </p>
  </section>
  <section class="case-section">
    <span>02 / CONTENT & CONTRIBUTION</span>
    <h2>사이트의 구현과 개인 역량을 구분하기.</h2>
    <p>
      AI가 만든 데모를 개인의 개발 능력으로 오해할 수 있는 랩은 제거했습니다. 이 사이트의 제작은 AI
      협업임을 밝히고, Comma의 개인 기여·제작 경험은 확인된 정보에 맞춰 별도로 기록합니다.
    </p>
  </section>
  <div class="case-bottom">
    <a class="button primary" href="#work">프로젝트 보기 ↗</a><a href="#work">작업 목록으로 →</a>
  </div>
</article>`;
