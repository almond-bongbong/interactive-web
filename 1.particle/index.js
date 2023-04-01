const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const DPR = window.devicePixelRatio || 1;

let canvasWidth;
let canvasHeight;
let particles = [];

function init() {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;

  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;

  canvas.width = canvasWidth * DPR;
  canvas.height = canvasHeight * DPR;
  ctx.scale(DPR, DPR);
  particles = [];
  const total = canvasWidth / 30;

  for (let i = 0; i < total; i++) {
    const x = randomNumBetween(0, canvasWidth);
    const y = randomNumBetween(0, canvasHeight);
    const radius = randomNumBetween(50, 100);
    const vy = randomNumBetween(1, 5);
    const particle = new Particle(x, y, radius, vy);
    particles.push(particle);
  }
}

const feGaussianBlur = document.querySelector('feGaussianBlur');
const feColorMatrix = document.querySelector('feColorMatrix');

const controls = {
  blurValue: 40,
  alphaChannel: 100,
  alphaOffset: -23,
  acc: 1.03,
};

const gui = new dat.GUI();
const f1 = gui.addFolder('Gooey Effect');
f1.open();
const f2 = gui.addFolder('Particles');
f2.open();

f1.add(controls, 'blurValue', 0, 100).onChange((v) => {
  feGaussianBlur.setAttribute('stdDeviation', v);
});
f1.add(controls, 'alphaChannel', 1, 200).onChange((v) => {
  feColorMatrix.setAttribute(
    'values',
    `1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 ${v} ${controls.alphaOffset}`
  );
});
f1.add(controls, 'alphaOffset', -100, 100).onChange((v) => {
  feColorMatrix.setAttribute(
    'values',
    `1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 ${controls.alphaChannel} ${v}`
  );
});
f2.add(controls, 'acc', 1, 1.1, 0.01).onChange((v) => {
  particles.forEach((particle) => {
    particle.acc = v;
  });
});

class Particle {
  constructor(x, y, radius, vy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vy = vy;
    this.acc = 1.03;
  }

  update() {
    this.vy *= this.acc;
    this.y += this.vy;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
    ctx.fillStyle = 'orange';
    ctx.fill();
    ctx.closePath();
  }
}

const randomNumBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

let interval = 1000 / 60; // 60fps
let now;
let delta;
let then = Date.now();

function animate() {
  window.requestAnimationFrame(animate);

  now = Date.now();
  delta = now - then;

  if (delta < interval) return;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  particles.forEach((particle) => {
    particle.update();
    particle.draw();

    if (particle.y > canvasHeight + particle.radius) {
      particle.x = randomNumBetween(0, canvasWidth);
      particle.y = -particle.radius;
      particle.radius = randomNumBetween(50, 100);
      particle.vy = randomNumBetween(1, 5);
    }
  });

  then = now - (delta % interval);
}

window.addEventListener('load', () => {
  init();
  animate();
});

window.addEventListener('resize', () => {
  init();
});
