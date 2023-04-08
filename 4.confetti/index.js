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

function confetti({ x, y, count, deg }) {
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y, deg));
  }
}

function render() {
  let now;
  let delta;
  let then = Date.now();

  // const x = innerWidth / 2;
  // let y = innerHeight / 2;
  // const width = 50;
  // const height = 50;
  // let widthAlpha = 0;
  // let deg = 0.1;

  const frame = () => {
    requestAnimationFrame(frame);
    now = Date.now();
    delta = now - then;
    if (delta < interval) return;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw(ctx);
      if (p.opacity <= 0) particles.splice(particles.indexOf(p), 1);
    }

    // widthAlpha += 0.1;
    // deg += 0.1;
    // y += 1;
    //
    // ctx.translate(x + width, y + height);
    // ctx.rotate(deg);
    // ctx.translate(-x - width, -y - height);
    //
    // ctx.resetTransform();

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
  confetti({
    x: 0,
    y: canvasHeight / 2,
    count: 10,
    deg: -50,
  });
});
