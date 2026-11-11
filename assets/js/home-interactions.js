import { query, queryAll } from './dom-utils.js';

/** Orbit controls, reduced-motion preference and the email-copy button. */
export function initHomeInteractions() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reducedMotion.matches;
  function updateMotion() {
    query('.orbital-map').classList.toggle('paused', paused);
    query('#motion-toggle').setAttribute('aria-pressed', String(paused));
    query('#motion-toggle').textContent = paused ? '궤도 회전 재생 ▷' : '궤도 회전 멈추기 Ⅱ';
  }
  query('#motion-toggle').addEventListener('click', () => {
    paused = !paused;
    updateMotion();
  });
  reducedMotion.addEventListener('change', (event) => {
    paused = event.matches;
    updateMotion();
  });
  updateMotion();
  const orbitContent = {
    build: [
      '01 / BUILD',
      '기본기에서 출발합니다.',
      '구조를 정리하고, 작은 화면부터 유연하게 만듭니다.',
    ],
    interact: [
      '02 / INTERACT',
      '행동에 반응하는 화면.',
      '입력부터 로딩, 결과와 오류까지 경험을 연결합니다.',
    ],
    improve: [
      '03 / IMPROVE',
      '피드백을 다음 버전으로.',
      '불편했던 이유를 찾고, 바뀐 동작을 비교합니다.',
    ],
  };
  queryAll('[data-orbit]').forEach((button) =>
    button.addEventListener('click', () => {
      const data = orbitContent[button.dataset.orbit];
      query('#map-kicker').textContent = data[0];
      query('#map-title').textContent = data[1];
      query('#map-description').textContent = data[2];
      queryAll('[data-orbit]').forEach((node) =>
        node.setAttribute('aria-pressed', String(node === button)),
      );
    }),
  );
  query('.node-one').setAttribute('aria-pressed', 'true');

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
