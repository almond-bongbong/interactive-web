const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const DPR = window.devicePixelRatio || 1;

const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 300;

canvas.style.width = `${CANVAS_WIDTH}px`;
canvas.style.height = `${CANVAS_HEIGHT}px`;

canvas.width = CANVAS_WIDTH * DPR;
canvas.height = CANVAS_HEIGHT * DPR;
ctx.scale(DPR, DPR);

ctx.fillRect(10, 10, 50, 50);
