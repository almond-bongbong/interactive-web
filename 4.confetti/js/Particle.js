import { randomNumBetween } from './utils.js';

class Particle {
  constructor(x, y, deg = 0) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.theta = (Math.PI / 180) * randomNumBetween(deg - 30, deg + 30);
    this.radius = randomNumBetween(30, 100);
    this.vx = this.radius * Math.cos(this.theta);
    this.vy = this.radius * Math.sin(this.theta);
    this.friction = 0.89;
    this.gravity = 0.5;
    this.opacity = 1;
    this.rotate = randomNumBetween(0, 360);
    this.widthDelta = randomNumBetween(0, 360);
    this.heightDelta = randomNumBetween(0, 360);
    this.rotateDelta = randomNumBetween(-1, 1);
  }

  update() {
    this.vy += this.gravity;
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.x += this.vx;
    this.y += this.vy;
    this.opacity -= 0.005;
    this.widthDelta += 2;
    this.heightDelta += 2;
    this.rotate += this.rotateDelta;
  }

  draw(ctx) {
    ctx.translate(this.x + this.width, this.y + this.height);
    ctx.rotate((Math.PI / 180) * this.rotate);
    ctx.translate(-(this.x + this.width), -(this.y + this.height));
    ctx.fillStyle = `rgba(255, 0, 0, ${this.opacity})`;
    ctx.fillRect(
      this.x,
      this.y,
      this.width * Math.cos((Math.PI / 180) * this.widthDelta),
      this.height * Math.sin((Math.PI / 180) * this.heightDelta),
    );

    ctx.resetTransform();
  }
}

export default Particle;
