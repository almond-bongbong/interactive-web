import { randomNumBetween } from './utils.js';

class Particle {
  constructor() {
    this.radius = innerHeight / 4;
    this.theta = randomNumBetween(0, Math.PI * 2);
    this.radiusFriction = 0;
    this.thetaFriction = 0;
    this.radiusAlpha = 0;
    this.thetaAlpha = 0;
    this.opacity = 1;
  }

  start() {
    this.radiusFriction = randomNumBetween(0.95, 1.01);
    this.thetaFriction = randomNumBetween(0.97, 0.99);
    this.radiusAlpha = randomNumBetween(0, 4);
    this.thetaAlpha = randomNumBetween(0.02, 0.04);
    this.opacity = randomNumBetween(0.2, 1);
  }

  update() {
    this.radiusAlpha *= this.radiusFriction;
    this.thetaAlpha *= this.thetaFriction;
    this.radius += this.radiusAlpha;
    this.theta += this.thetaAlpha;
    this.x = window.innerWidth / 2 + this.radius * Math.cos(this.theta);
    this.y = window.innerHeight / 2 + this.radius * Math.sin(this.theta);
    this.opacity -= 0.003;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 1, 0, (Math.PI / 180) * 360);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.fill();
    ctx.closePath();
  }
}

export default Particle;
