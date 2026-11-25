import { html } from './dom-utils.js?v=20261126-stage-fade-fix';

export const portfolioHTML = html`<article class="case-page supporting-case weekly-process">
 <a class="back-link" href="#home">랜딩뷰로 돌아가기</a>
 <div class="case-hero"><span class="case-kicker">2026.11.26 · LANDING VIEW PROCESS</span>
 <h1 tabindex="-1">진로를 보여주는<br /><span>랜딩뷰 제작 과정</span></h1>
 <p>사용자가 분야를 선택해 실제 작업을 탐색하는 첫 화면으로 진로와 구현 경험을 연결했습니다.</p>
 <dl class="case-meta"><div><dt>목표</dt><dd>진로 전달 · 작업 탐색</dd></div><div><dt>사용 기술</dt><dd>HTML · CSS · JavaScript</dd></div><div><dt>이재범</dt><dd>진로·콘텐츠 방향·수정 요청</dd></div><div><dt>AI</dt><dd>코드 구현 · 화면 검증 · 기록</dd></div></dl></div>
 <section class="case-section"><span>01 / GOAL</span><h2>진로와 연결한 화면 구성</h2>
 <p>인터랙티브 콘텐츠 제작자로서 웹·3D 공간·게임에서 사용자 행동에 반응하는 경험을 만드는 방향을 제시했습니다. 기존 궤도 그래픽은 작업 결과와의 연결이 간접적이어서, 실제 프로젝트를 선택하는 화면으로 바꿨습니다.</p>
 <p>POP-ING 이미지를 첫 화면 전체의 배경으로 두고, 왼쪽에 소개와 슬로건, 하단에 공간 탐색·웹 인터랙션·게임 플레이 선택을 배치했습니다. POP-ING을 기본으로 보여주며, 선택할 때 이미지·프로젝트명·담당 역할·상세 링크가 함께 바뀝니다.</p></section>
 <section class="case-section"><span>02 / KNOWLEDGE</span><h2>구현에 필요한 지식과 판단</h2>
 <ul><li><strong>정보 위계</strong> — 진로와 슬로건을 먼저 읽고, 실제 작업과 담당 역할로 확인하도록 순서를 잡았습니다.</li>
 <li><strong>이벤트와 DOM 갱신</strong> — 버튼의 data-landing 값으로 프로젝트를 찾고 같은 선택값으로 이미지·텍스트·링크를 갱신합니다. 프로젝트 정보는 기존 목록 데이터를 재사용합니다.</li>
 <li><strong>선택 상태와 키보드</strong> — HTML button의 Tab·Enter·Space 동작을 활용하고 aria-pressed로 선택 상태를 전달합니다. 프로젝트 변경은 aria-live로 알립니다.</li>
 <li><strong>읽는 시간</strong> — 사용자가 선택한 뒤 내용을 읽을 수 있도록 수동 선택 방식으로 구성했습니다.</li>
 <li><strong>이미지와 레이아웃</strong> — POP-ING은 무대 전체를 채우고 Com,ma는 초록 배경에서 앱 이미지를 표시합니다. 왼쪽과 하단의 그라데이션으로 문구를 읽을 수 있게 하고 아래 섹션의 짙은 녹색으로 연결했습니다. 작은 화면에서는 선택 버튼과 프로젝트 설명을 세로 흐름으로 정리했습니다.</li></ul></section>
 <section class="case-section"><span>03 / AI COLLABORATION</span><h2>AI 요청과 채택한 구성</h2>
 <p>이번 주 과제는 진로·슬로건과 인터랙션이 있는 랜딩뷰, 그리고 AI 활용과 보정 과정을 설명하는 제작 프로세스 페이지입니다. 제안된 방향을 확인한 뒤 이재범은 “그렇게 진행해줘”라고 요청했습니다.</p>
 <p>AI가 만든 세 가지 시안 중 이재범은 대형 프로젝트 무대형을 선택했습니다. 이재범이 제공한 실제 3D 맵 캡처에서 UI를 제거하고 밝기·대비·그라데이션을 AI 이미지 보정으로 조정한 배경을 사용했습니다. 원본과 일부 세부 표현의 차이가 있을 수 있습니다. 이어서 AI가 전체 이미지 배경, 하단 선택 버튼, 이미지·역할·상세 링크의 동시 변경을 구현했습니다. 이재범이 앞서 정한 Pretendard, 작은 정보의 최소 10px 기준, 프로젝트별 썸네일 표현과 기술 역량의 목록 디자인을 바탕으로 작업했습니다.</p></section>
 <section class="case-section"><span>04 / REVISION</span><h2>수정 방향과 작업 주체</h2>
 <p>이재범은 진로 명칭, 소개에서 제외할 문구, 글자 크기의 위계, 썸네일 배경·채움 방식에 대한 수정 방향을 제시했습니다. 이번 랜딩뷰에는 그 판단을 반영해 진로를 명확하게 적고 실제 작업을 탐색하는 동작으로 연결했습니다.</p>
 <p>이번 코드 편집과 화면 점검은 AI가 수행했습니다. 이재범이 직접 파일을 수정한 기록은 아직 추가되지 않았습니다. 수작업 보정 단계에서는 문구·간격·색상·이미지 중 직접 바꾼 항목의 전후 화면과 변경 이유를 남길 예정입니다.</p>
 <p>직접 보정 기록에는 수정한 요소, 파일과 속성, 수정 전후 값, 선택 이유, 재확인 결과를 기재하면 됩니다.</p></section>
 <section class="case-section"><span>05 / COMPARISON</span><h2>변경 전후 화면</h2>
 <div class="process-comparison"><figure><img src="assets/landing-before-stage.png" alt="수정 전 좌우 분할 프로젝트 선택 랜딩뷰" loading="lazy" /><figcaption>변경 전 · 좌우 분할 프로젝트 선택 패널</figcaption></figure><figure><img src="assets/landing-after.png" alt="수정 후 프로젝트를 선택하는 랜딩뷰" loading="lazy" /><figcaption>변경 후 · 1440px 화면에서 확인한 대형 프로젝트 무대형</figcaption></figure></div></section>
 <section class="case-section"><span>06 / VERIFICATION</span><h2>검증 결과와 남은 개선</h2>
 <p id="weekly-verification">대형 프로젝트 무대형을 로컬 브라우저에서 확인했습니다. 세 분야 선택 시 배경·프로젝트명·역할·상세 링크가 함께 바뀌고 선택 상태가 하나만 활성화됐습니다. Tab·Enter·Space 조작과 세 상세 링크를 확인했습니다. 1440px 화면에서 대표 프로젝트와 기술 역량의 시작선이 일치하며, 390px에서는 프로젝트 목록이 1열로 표시되고 가로 넘침이 없는 것을 확인했습니다. 브라우저 실행 오류는 발생하지 않았습니다. 실제 모바일 기기와 스크린리더 검증은 남아 있습니다.</p>
 <p>본인의 직접 보정과 최종 검수 기록을 추가해 과제의 제작 프로세스를 완성할 계획입니다. 공개 사이트 반영 여부는 배포 시 별도로 확인합니다.</p></section>
 <div class="case-bottom"><a class="button primary" href="#home">랜딩뷰 확인하기</a></div>
</article>`;
