// Portfolio project content.
export const projects = [
  {
    id: 'comma',
    title: 'Com,ma',
    type: '2025 · 디지털콘텐츠제작 · 3인 팀 프로젝트',
    summary:
      '가까운 자연에서 쉬어갈 장소를 찾는 서비스를 소개합니다. 3인 팀에서 전체 웹 화면과 배지 카드, 앱 화면 슬라이드를 구현했습니다.',
    meta: [
      ['YEAR / CLASS', '2025 · 디지털콘텐츠제작'],
      ['TECH', 'HTML · CSS · JavaScript'],
    ],
    stack: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://kwdmd.github.io/Com-ma/',
    image: 'comma/img/header.png',
    imageAlt: 'Com,ma의 홈과 지도 UI를 담은 두 개의 스마트폰 목업과 안내 캐릭터',
    imageTheme: 'comma',
    disclosure:
      '앱 목업을 통해 장소 탐색부터 커뮤니티 참여까지의 흐름을 보여줍니다.',
    labels: {
      overview: '서비스와 구현 범위',
      process: '제작과 수정의 흐름',
      troubleshooting: '핵심 구현과 판단',
      improvements: '개선 전후',
      reflection: '회고와 다음 과제',
    },
    overview: [
      '서비스 배경부터 온보딩, 지도, 추천, 커뮤니티, 구매 화면까지 한 페이지에서 순서대로 소개했습니다. 각 화면은 앱의 사용 흐름을 설명하는 목업입니다.',
    ],
    process: [
      {
        title: '2025년 수업 프로젝트',
        solution:
          '팀이 구상한 화면을 HTML·CSS·JavaScript로 구현했습니다. 배지 카드 중앙 정렬과 화면 슬라이드의 동작을 자료를 찾아가며 조정했습니다.',
      },
      {
        title: '제출 전 화면 점검',
        problem:
          '다른 해상도에서 이미지가 잘리고 요소 위치가 어긋났으며 일부 인터랙션이 제대로 동작하지 않았습니다.',
        solution: '레이아웃과 동작을 수정하고 다시 확인해 기한 내에 제출했습니다.',
      },
    ],
    troubleshooting: [
      {
        title: '카드 중심과 화면 중심의 차이 계산',
        solution:
          '선택한 카드의 중심에서 카드 목록 영역의 중심을 빼면 이동할 거리를 구할 수 있습니다. 2025년에는 offsetLeft와 요소의 폭으로 위치를 계산했습니다. 개선본에서는 현재 스크롤 위치와 getBoundingClientRect()를 이용하고, 처음과 마지막 카드도 가운데에 올 수 있도록 양끝 여백을 확보했습니다.',
        code: 'const desired = gallery.scrollLeft\n  + itemBox.left + itemBox.width / 2\n  - (containerBox.left + gallery.clientWidth / 2);\n\ngallery.scrollTo({\n  left: Math.max(0, Math.min(desired,\n    gallery.scrollWidth - gallery.clientWidth)),\n  behavior: reduce.matches ? "instant" : "smooth"\n});',
      },
      {
        title: '화면 전환과 자동 재생 상태 분리',
        solution:
          '현재 화면 번호와 자동 재생 여부를 별도로 관리합니다. 사용자가 앞뒤 버튼이나 화면 번호, 키보드로 이동하면 자동 재생을 멈춥니다. 설명과 이미지에는 같은 화면 번호를 적용하고, 보이지 않는 항목은 hidden으로 숨깁니다.',
        code: 'function manual(index) {\n  setAutoplay(false);\n  render(index);\n}',
      },
    ],
    improvements: [
      {
        title: '01. 자동 슬라이드 → 직접 제어할 수 있는 슬라이드',
        before: '6초마다 자동 전환됐으며, 멈추거나 이전 화면으로 돌아갈 수 없었습니다.',
        change:
          '재생·일시정지, 이전·다음, 화면 선택 버튼과 위치 표시를 추가했습니다. 직접 탐색하면 자동 재생을 멈추도록 했습니다.',
        after:
          '읽는 속도에 맞춰 멈추고 원하는 화면으로 이동할 수 있습니다. 마지막·첫 화면 사이의 양방향 순환도 지원합니다.',
      },
      {
        title: '02. 클릭 중심 카드 → 키보드로도 선택하는 카드',
        before: '배지 카드가 클릭 이벤트 중심이었고, 키보드 선택과 상태 전달이 부족했습니다.',
        change:
          'button·aria-pressed와 단일 Tab 진입점, 이전·다음 버튼, 방향키·Home·End를 적용했습니다. 양끝 여백과 크기 변경 시 재정렬도 추가했습니다.',
        after:
          '처음과 마지막 카드를 포함해 선택 항목을 중앙에 배치하고, 마우스와 키보드에서 같은 선택 동작을 사용할 수 있습니다.',
      },
      {
        title: '03. 큰 화면 배치 → 좁은 화면과 모션 설정 대응',
        before: '앱 소개 슬라이드는 큰 화면의 좌우 배치에 맞춰 구성돼 있었습니다.',
        change:
          '좁은 화면에서는 이미지와 설명을 세로로 배치했습니다. 모션 감소 설정에서는 자동 재생과 전환 애니메이션을 끄도록 구현했습니다.',
        after:
          '작은 뷰포트에서 설명과 조작 버튼이 표시되는 것을 확인했습니다. OS 모션 감소 설정에 대한 실기 검증은 아직 하지 않았습니다.',
      },
    ],
    reflection: [
      '슬라이드에 조작 방법을 추가하면서 사용자가 읽는 속도에 맞춰 정보를 살펴볼 수 있게 했습니다. 다음에는 실제 모바일 기기와 스크린리더로 같은 흐름을 확인할 계획입니다.',
    ],
    liveLabel: '개선본 보기',
    original: 'https://kwdmd.github.io/Comma/',
    detailIntro: '지도, 추천, 커뮤니티 화면을 따라 서비스의 이용 흐름을 보여주는 웹사이트입니다.',
    highlights: [
      {
        label: '목적',
        text: '가까운 자연에서 쉬어가는 서비스의 이용 흐름을 소개합니다.',
      },
      {
        label: '작업 범위',
        text: '2025년 3인 팀에서 웹 프로그래밍 전반을 담당했습니다. 2026년 개선은 AI와 협업했습니다.',
      },
      {
        label: '핵심 구현',
        text: '스크롤에 맞춰 콘텐츠를 표시하고, 선택한 배지를 중앙에 배치했습니다. 슬라이드에서는 앱 화면과 설명이 함께 바뀝니다.',
      },
      {
        label: '개선 결과',
        text: '자동 재생을 멈추거나 키보드로 탐색할 수 있습니다. 양끝 배지 정렬과 좁은 화면 배치를 확인했습니다.',
      },
    ],
  },
  {
    id: 'kenshi-yonezu',
    title: '요네즈 켄시 소개 페이지',
    type: '뮤지션 소개 웹사이트',
    summary:
      '추천곡으로 요네즈 켄시의 음악을 처음 접하고, 음반과 일러스트, 공연 정보까지 둘러볼 수 있는 소개 사이트입니다.',
    stack: ['HTML', 'CSS'],
    meta: [
      ['구성', '홈 · 디스코그래피 · 프로필 · 일러스트 · 콘서트'],
      ['기술', 'HTML · CSS'],
    ],
    live: 'https://kwdmd.github.io/Artist.Kenshi_Yonezu/',
    original: 'https://kwdmd.github.io/JavaScript_Programming/',
    liveLabel: '개선본 보기',
    detailImage: 'assets/kenshi-improved-home.png',
    detailImageAlt: '요네즈 켄시 소개 사이트 개선본 첫 화면',
    image: 'assets/kenshi-improved-home.png',
    imageAlt: '불꽃을 든 요네즈 켄시와 소개 문구가 보이는 개선본 첫 화면',
    overview: [
      '홈에는 인물 소개와 입문곡 세 곡, 콘서트 안내가 있습니다. 관심이 생긴 방문자는 음반 목록이나 공연 일정으로 이어서 이동할 수 있습니다.',
    ],
    process: [
      '제작 당시에는 홈의 영상과 이미지 모음, 프로필, 디스코그래피로 구성했습니다. 각 페이지는 공통 스타일시트와 상단 메뉴를 사용했습니다.',
    ],
    troubleshooting: [
      {
        title: 'CSS로 이미지 전환 순서 조절',
        solution:
          '원본에서는 이미지 그룹마다 animation-delay를 다르게 지정했습니다. 같은 키프레임을 사용하면서도 그룹마다 다른 시점에 이미지가 전환됩니다.',
      },
    ],
    labels: {
      improvements: '개선 전후',
    },
    improvements: [
      {
        title: '홈에서 추천곡으로 이어지는 흐름',
        before: '원본 홈은 대표 뮤직비디오와 이미지 모음으로 시작했습니다.',
        after:
          '개선본은 인물 소개와 공식 YouTube 링크를 먼저 보여주고, 추천곡과 전체 음반 목록을 연결합니다.',
      },
      {
        title: '일러스트와 공연 정보 추가',
        before: '상단 메뉴에서 프로필과 디스코그래피로 이동할 수 있었습니다.',
        after:
          '일러스트와 콘서트 메뉴를 추가했습니다. 홈의 공연 일정 링크로 콘서트 페이지의 일정 영역을 바로 열 수 있습니다.',
      },
    ],
    reflection: [
      '다음에는 좁은 화면에서 메뉴가 읽기 쉽게 줄바꿈되는지, 키보드만으로 추천곡과 공연 일정에 도달할 수 있는지 확인할 계획입니다.',
    ],
    detailIntro:
      '홈에서 추천곡을 소개하고, 더 듣고 싶은 방문자를 전체 음반 목록으로 안내합니다.',
    highlights: [
      {
        label: '목적',
        text: '요네즈 켄시를 처음 접하는 방문자에게 대표곡과 활동을 소개합니다.',
      },
      {
        label: '작업 범위',
        text: '홈과 주제별 페이지 구성, 공통 메뉴, CSS 스타일과 이미지 전환을 다뤘습니다.',
      },
      {
        label: '핵심 구현',
        text: '홈에서 대표곡과 공연 정보를 안내하고, 공통 메뉴에서 각 페이지로 이동할 수 있습니다.',
      },
      {
        label: '개선 결과',
        text: '영상 중심 홈을 인물 소개와 추천곡 중심으로 재구성하고 일러스트·콘서트 페이지를 추가했습니다.',
      },
    ],
  },
  {
    id: 'unity-shooter',
    title: 'Rocket Defense',
    type: 'Unity 슈팅 게임',
    summary:
      '로켓을 움직여 방어선으로 다가오는 과녁을 막는 Unity 슈팅 게임입니다. 세 스테이지에 도전할 수 있습니다.',
    stack: ['Unity', 'C#', 'TextMesh Pro'],
    meta: [
      ['실행 환경', 'Unity Windows · WebGL'],
      ['기술', 'Unity · C# · TextMesh Pro'],
    ],
    image: 'assets/rocket-defense-start-screen.png',
    imageAlt: '픽셀 아트로 구성된 Rocket Defense 시작 화면',
    live: 'rocket-defense/unity/index.html',
    liveLabel: 'Unity 게임 플레이',
    disclosure:
      'PC에서 게임 화면을 클릭한 뒤 Enter로 시작하세요. 방향키로 이동하고 스페이스바로 발사합니다.',
    overview: [
      'Launch Zone, Asteroid Belt, Final Approach 순으로 진행합니다. 로켓이 과녁에 충돌하거나 과녁이 방어선을 넘으면 실패하며, 결과 화면에서 이유를 확인할 수 있습니다.',
    ],
    process: [
      '수업에서 만든 조작과 충돌 처리에 점수, 사운드, 결과 화면을 연결했습니다. 이후 시작 메뉴부터 스테이지 진행, 일시정지, 재도전까지 이어지는 흐름을 구성했습니다.',
    ],
    troubleshooting: [
      {
        title: '입력과 게임 진행 상태 분리',
        solution:
          'GameManager에서 메뉴, 시작 연출, 플레이, 일시정지, 클리어, 실패 상태를 구분합니다. Rocket은 플레이 상태에서만 이동과 발사를 처리합니다.',
      },
      {
        title: '남은 과녁으로 클리어 판정',
        solution:
          '스테이지 시작 시 과녁 수를 등록하고, 피격으로 점수를 더할 때 남은 과녁 수를 줄입니다. 모든 과녁을 제거하면 결과 화면을 표시합니다.',
      },
    ],
    labels: {
      improvements: '게임 개선 전후',
    },
    improvements: [
      {
        title: '이동 속도와 화면 경계',
        before:
          '기존 로켓은 프레임마다 고정 거리를 이동해 프레임 속도에 따라 체감 속도가 달라질 수 있었습니다.',
        change:
          '이동 속도에 Time.deltaTime을 곱하고 대각선 입력의 크기를 제한했습니다. 화면 경계를 기준으로 이동 범위도 제한했습니다.',
      },
      {
        title: '3개 스테이지와 재도전',
        before: '기존에는 730점에 도달하면 게임을 종료하는 단일 플레이 흐름이었습니다.',
        change:
          '과녁을 모두 제거하면 다음 스테이지로 넘어갈 수 있게 구성했습니다. 일시정지 메뉴에서 계속하기, 재시작, 메인 메뉴 복귀를 선택할 수 있습니다.',
      },
      {
        title: '실패 원인 표시와 연속 발사',
        change:
          '로켓 충돌과 방어선 돌파를 구분해 결과 화면에 표시합니다. 스페이스바를 누르고 있으면 정해진 간격으로 발사되도록 조정했습니다.',
      },
    ],
    reflection: [
      '다음 확인 과제는 서로 다른 프레임 속도에서 이동 거리를 비교하고, 스테이지 전환과 재시작 때 입력·점수·과녁 수가 올바르게 초기화되는지 Windows에서 검증하는 것입니다.',
    ],
    detailIntro:
      '과녁이 방어선을 넘기 전에 모두 격파하면 다음 스테이지로 넘어갑니다.',
    highlights: [
      {
        label: '목적',
        text: '로켓을 조작해 방어선에 도달하기 전에 과녁을 모두 제거합니다.',
      },
      {
        label: '작업 범위',
        text: '이동·발사, 충돌과 점수 처리, 스테이지 진행과 결과 UI를 다뤘습니다.',
      },
      {
        label: '핵심 구현',
        text: '게임 상태에 따라 입력을 제어하고, 남은 과녁 수로 클리어를 판정합니다.',
      },
      {
        label: '개선 결과',
        text: 'Windows 버전에 3개 스테이지와 재도전 메뉴를 추가했습니다. 이동 속도를 보정하고 실패 원인을 표시합니다.',
      },
    ],
  },
];
