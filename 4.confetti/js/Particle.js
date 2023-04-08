import { hexToRgb, randomNumBetween } from './utils.js';

class Particle {
  constructor(x, y, deg = 0, colors, shapes, spread = 30) {
    this.x = x * window.innerWidth;
    this.y = y * window.innerHeight;
    this.width = 12;
    this.height = 12;
    this.theta = (Math.PI / 180) * randomNumBetween(deg - spread, deg + spread);
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
    this.colors = colors || ['#ff577f', '#ff884b', '#ffd384', '#fff9b0'];
    this.color = hexToRgb(
      this.colors[Math.floor(randomNumBetween(0, this.colors.length))],
    );
    this.shapes = shapes || ['circle', 'square'];
    this.shape =
      this.shapes[Math.floor(randomNumBetween(0, this.shapes.length))];
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

  drawSquare(ctx) {
    ctx.fillRect(
      this.x,
      this.y,
      this.width * Math.cos((Math.PI / 180) * this.widthDelta),
      this.height * Math.sin((Math.PI / 180) * this.heightDelta),
    );
  }

  drawCircle(ctx) {
    ctx.beginPath();
    ctx.ellipse(
      this.x,
      this.y,
      Math.abs(this.width * Math.cos((Math.PI / 180) * this.widthDelta)) / 2,
      Math.abs(this.height * Math.sin((Math.PI / 180) * this.heightDelta)) / 2,
      0,
      0,
      2 * Math.PI,
    );
    ctx.fill();
    ctx.closePath();
  }

  draw(ctx) {
    const translateXAlpha = this.width * 1.3;
    const translateYAlpha = this.height * 1.3;
    ctx.translate(this.x + translateXAlpha, this.y + translateYAlpha);
    ctx.rotate((Math.PI / 180) * this.rotate);
    ctx.translate(-(this.x + translateXAlpha), -(this.y + translateYAlpha));
    ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;

    if (this.shape === 'square') this.drawSquare(ctx);
    if (this.shape === 'circle') this.drawCircle(ctx);

    ctx.resetTransform();
  }
}

export default Particle;
