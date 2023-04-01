import CanvasOption from './CanvasOption.js';

class Particle extends CanvasOption {
  constructor(x, y, radius, vx, vy) {
    super();
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.acc = 1.03;
    this.vx = vx;
    this.vy = vy;
    this.opacity = 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.opacity -= 0.01;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
    this.ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    this.ctx.fill();
    this.ctx.closePath();
  }
}

export default Particle;
