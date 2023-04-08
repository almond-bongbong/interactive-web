import Particle from './js/Particle.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const DPR = window.devicePixelRatio > 1 ? 2 : 1;
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
const fps = 60;
const interval = 1000 / fps;
const particles = [];

function init() {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;
  canvas.width = canvasWidth * DPR;
  canvas.height = canvasHeight * DPR;
  ctx.scale(DPR, DPR);
}

function confetti({ x, y, count, deg, colors, shapes, spread }) {
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y, deg, colors, shapes, spread));
  }
}

function render() {
  let now;
  let delta;
  let then = Date.now();

  const frame = () => {
    requestAnimationFrame(frame);
    now = Date.now();
    delta = now - then;
    if (delta < interval) return;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    confetti({
      x: 0, // 0 ~ 1
      y: 0.5, // 0 ~ 1
      count: 10,
      deg: -50,
    });
    confetti({
      x: 1, // 0 ~ 1
      y: 0.5, // 0 ~ 1
      count: 10,
      deg: 230,
    });

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw(ctx);
      if (p.opacity <= 0) particles.splice(particles.indexOf(p), 1);
    }

    then = now - (delta % interval);
  };

  requestAnimationFrame(frame);
}

window.addEventListener('load', () => {
  init();
  render();
});

window.addEventListener('resize', () => {
  init();
});

window.addEventListener('click', (e) => {
});
