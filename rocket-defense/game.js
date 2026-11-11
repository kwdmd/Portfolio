const canvas = document.querySelector('#game');
const context = canvas.getContext('2d');
const scoreLabel = document.querySelector('#score');
const statusLabel = document.querySelector('#status');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const keys = new Set();
const { width, height } = canvas;
const defenseLine = height - 94;
let state = 'ready';
let player, targets, shots, score, direction, cooldown, previousFrame;

function reset() {
  player = { x: width / 2, y: height - 34 };
  targets = Array.from({ length: 50 }, (_, index) => {
    const row = Math.floor(index / 10);
    return { x: 162 + (index % 10) * 44, y: 55 + row * 27,
      points: [10, 10, 13, 15, 25][row], color: ['#8ee7d6', '#8ee7d6', '#b8ddff', '#f3ce83', '#cdfa87'][row] };
  });
  shots = [];
  score = 0;
  direction = 1;
  cooldown = 0;
  scoreLabel.textContent = '0 / 730점';
}

function setState(next, message) {
  state = next;
  keys.clear();
  statusLabel.textContent = message;
  pauseButton.disabled = !['playing', 'paused'].includes(next);
  pauseButton.textContent = next === 'paused' ? '계속하기' : '일시정지';
  startButton.textContent = next === 'ready' ? '게임 시작' : '다시 시작';
}

function togglePause() {
  if (state === 'playing') setState('paused', '일시정지');
  else if (state === 'paused') {
    setState('playing', '플레이 중');
    canvas.focus({ preventScroll: true });
  }
}

function update(dt) {
  const dx = Number(keys.has('ArrowRight')) - Number(keys.has('ArrowLeft'));
  const dy = Number(keys.has('ArrowDown')) - Number(keys.has('ArrowUp'));
  const speed = 265 * dt / (Math.hypot(dx, dy) || 1);
  player.x = Math.min(width - 16, Math.max(16, player.x + dx * speed));
  player.y = Math.min(height - 16, Math.max(defenseLine + 16, player.y + dy * speed));

  cooldown -= dt;
  if (keys.has('Space') && cooldown <= 0) {
    shots.push({ x: player.x, y: player.y - 16 });
    cooldown = 0.16;
  }

  const step = direction * (65 + (50 - targets.length) * 1.3) * dt;
  if (targets.some(({ x }) => x + step < 24 || x + step > width - 24)) {
    direction *= -1;
    targets.forEach((target) => { target.y += 15; });
  } else {
    targets.forEach((target) => { target.x += step; target.y += 2 * dt; });
  }

  shots = shots.filter((shot) => {
    const oldY = shot.y;
    shot.y -= 510 * dt;
    const hit = targets.findIndex(({ x, y }) =>
      Math.abs(shot.x - x) <= 15 && shot.y <= y + 8 && oldY >= y - 8);
    if (hit < 0) return shot.y > 0;
    score += targets[hit].points;
    targets.splice(hit, 1);
    scoreLabel.textContent = score + ' / 730점';
    return false;
  });

  if (targets.length === 0) setState('won', '클리어!');
  else if (targets.some(({ y }) => y + 8 >= defenseLine)) setState('lost', '게임 오버 · 방어선 돌파');
}

function draw() {
  context.fillStyle = '#0e1916';
  context.fillRect(0, 0, width, height);
  context.fillStyle = '#233c32';
  for (let x = 20; x < width; x += 28) {
    for (let y = 20; y < height; y += 28) context.fillRect(x, y, 1, 1);
  }
  context.fillStyle = '#405747';
  context.fillRect(0, defenseLine, width, 1);

  for (const target of targets) {
    context.fillStyle = target.color;
    context.fillRect(target.x - 14, target.y - 7, 28, 14);
    context.clearRect(target.x - 7, target.y - 1, 14, 2);
  }
  context.fillStyle = '#cdfa87';
  for (const shot of shots) context.fillRect(shot.x - 2, shot.y - 5, 4, 10);
  context.beginPath();
  context.moveTo(player.x, player.y - 15);
  context.lineTo(player.x + 14, player.y + 12);
  context.lineTo(player.x, player.y + 7);
  context.lineTo(player.x - 14, player.y + 12);
  context.fill();
}

function frame(now) {
  const dt = Math.min((now - (previousFrame ?? now)) / 1000, 0.035);
  previousFrame = now;
  if (state === 'playing') update(dt);
  draw();
  requestAnimationFrame(frame);
}

startButton.addEventListener('click', () => {
  reset();
  setState('playing', '플레이 중');
  canvas.focus({ preventScroll: true });
});
pauseButton.addEventListener('click', togglePause);
canvas.addEventListener('keydown', (event) => {
  if (event.code === 'Escape' && !event.repeat) togglePause();
  if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space'].includes(event.code)) return;
  event.preventDefault();
  if (state === 'playing') keys.add(event.code);
});
window.addEventListener('keyup', (event) => keys.delete(event.code));
canvas.addEventListener('blur', () => keys.clear());
window.addEventListener('blur', () => {
  if (state === 'playing') setState('paused', '일시정지');
});
for (const button of document.querySelectorAll('[data-key]')) {
  const { key } = button.dataset;
  button.addEventListener('pointerdown', (event) => {
    if (state !== 'playing') return;
    event.preventDefault();
    button.setPointerCapture(event.pointerId);
    keys.add(key);
  });
  for (const eventName of ['pointerup', 'pointercancel', 'lostpointercapture']) {
    button.addEventListener(eventName, () => keys.delete(key));
  }
}
reset();
requestAnimationFrame(frame);
