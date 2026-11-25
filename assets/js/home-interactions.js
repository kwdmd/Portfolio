import { query, queryAll } from './dom-utils.js?v=20261126-stage-fade-fix';
import { projects } from './projects.js?v=20261126-stage-fade-fix';

/** Project selection and the email-copy button. */
export function initHomeInteractions() {
  const roles = {
    'pop-ing': '3D 맵 전반의 구현과 UI 제작, 로딩 개선과 아바타 모션 작업을 담당했습니다.',
    comma: '전반적인 웹페이지 제작과 배지 선택, 앱 기능 소개의 자동 전환을 구현했습니다.',
    'unity-shooter': '기획·디자인·프로그래밍을 맡아 이동·발사와 전투 피드백을 구현했습니다.'
  };
  const stage = query('.project-stage');
  const media = query('.stage-media');
  const options = query('.stage-options');
  const buttons = queryAll('[data-landing]');
  const indicator = query('.stage-selection-line');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let selectionVersion = 0;
  let mediaTransition = null;

  async function fadeMedia(opacity, duration) {
    const startOpacity = getComputedStyle(media).opacity;
    mediaTransition?.cancel();
    media.style.opacity = startOpacity;
    const animation = media.animate([
      { opacity: startOpacity }, { opacity }
    ], {
      duration: reducedMotion.matches ? 0 : duration,
      easing: 'ease-in-out',
      fill: 'forwards'
    });
    mediaTransition = animation;
    try {
      await animation.finished;
    } catch {
      return false;
    }
    if (mediaTransition !== animation) return false;
    media.style.opacity = String(opacity);
    animation.cancel();
    mediaTransition = null;
    return true;
  }

  function positionIndicator() {
    const selected = buttons.find((button) => button.getAttribute('aria-pressed') === 'true');
    indicator.style.width = selected.offsetWidth + 'px';
    indicator.style.transform = 'translateX(' + selected.offsetLeft + 'px)';
  }
  new ResizeObserver(positionIndicator).observe(options);
  positionIndicator();
  document.fonts.ready.then(positionIndicator);

  function imageSource(project) {
    return project.id === 'pop-ing' ? 'assets/pop-ing-stage-background.png' : project.image;
  }
  // Load the small set of selectable backgrounds before they are needed.
  const imageLoads = new Map();
  buttons.forEach((button) => {
    const project = projects.find((item) => item.id === button.dataset.landing);
    const image = new Image();
    image.src = imageSource(project);
    const ready = image.decode().then(() => image).catch(() => null);
    imageLoads.set(project.id, ready);
  });

  buttons.forEach((button) => {
    button.addEventListener('click', async () => {
      if (button.getAttribute('aria-pressed') === 'true') return;
      const version = ++selectionVersion;
      const id = button.dataset.landing;
      const project = projects.find((item) => item.id === id);
      buttons.forEach((option) => option.setAttribute('aria-pressed', String(option === button)));
      positionIndicator();
      const loaded = await imageLoads.get(id);
      if (version !== selectionVersion) return;
      if (!loaded) {
        buttons.forEach((option) => {
          option.setAttribute('aria-pressed', String(option.dataset.landing === stage.dataset.current));
        });
        positionIndicator();
        await fadeMedia(1, 320);
        return;
      }
      // Hide the complete current scene before replacing a transparent image.
      const hidden = await fadeMedia(0, 200);
      if (!hidden || version !== selectionVersion) return;
      query('#landing-title').textContent = project.title;
      query('#landing-role').textContent = roles[id];
      query('#landing-detail').href = '#case/' + id;
      stage.dataset.current = id;
      const image = loaded.cloneNode();
      image.id = 'landing-image';
      image.alt = '';
      image.dataset.project = id;
      media.replaceChildren(image);
      await fadeMedia(1, 350);
    });
  });

  const emailButton = query('#copy-email');
  const copyStatus = query('#copy-status');

  emailButton.addEventListener('click', async () => {
    const email = emailButton.textContent.trim();
    copyStatus.textContent = '';
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const field = document.createElement('textarea');
      field.value = email;
      field.readOnly = true;
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.append(field);
      field.select();
      let copied = false;
      try {
        copied = document.execCommand('copy');
      } catch {
        // Manual copying remains available if the browser blocks clipboard access.
      } finally {
        field.remove();
        emailButton.focus({ preventScroll: true });
      }
      if (!copied) {
        copyStatus.textContent = '직접 복사할 주소: ' + email;
        return;
      }
    }
    copyStatus.textContent = '이메일을 복사했습니다.';
  });
}
