import CanvasOption from './js/CanvasOption.js';
import Particle from './js/Particle.js';
import { randomNumBetween } from './js/utils.js';

class Canvas extends CanvasOption {
  constructor() {
    super();

    this.particles = [];
  }

  init() {
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;
    this.canvas.style.width = `${this.canvasWidth}px`;
    this.canvas.style.height = `${this.canvasHeight}px`;

    this.canvas.width = this.canvasWidth * this.dpr;
    this.canvas.height = this.canvasHeight * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);

    this.createParticles();
  }

  createParticles() {
    const PARTICLE_NUM = 10000;
    const x = randomNumBetween(0, this.canvasWidth);
    const y = randomNumBetween(0, this.canvasHeight);

    for (let i = 0; i < PARTICLE_NUM; i++) {
      const r = randomNumBetween(0, 3);
      const theta = randomNumBetween(0, 2 * Math.PI);
      const vx = r * Math.cos(theta);
      const vy = r * Math.sin(theta);

      this.particles.push(new Particle(x, y, 10, vx, vy));
    }
  }

  render() {
    let now;
    let delta;
    let then = Date.now();

    const frame = () => {
      requestAnimationFrame(frame);
      now = Date.now();
      delta = now - then;
      if (delta < this.interval) return;

      this.ctx.fillStyle = this.bgColor;
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

      this.particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        if (particle.opacity < 0) this.particles.splice(index, 1);
      });

      then = now - (delta % this.interval);
    };
    requestAnimationFrame(frame);
  }
}

const canvas = new Canvas();

window.addEventListener('load', () => {
  canvas.init();
  canvas.render();
});

window.addEventListener('resize', () => {
  canvas.init();
});
