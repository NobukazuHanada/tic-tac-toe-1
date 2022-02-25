const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const w = 500;
const h = 500;
const margin = 50;
const wL = (w - 2 * margin);
const wl = wL/3;
const hL = (h - 2 * margin);
const hl = hL/3;

ctx.fillStyle = "rgb(0, 120, 210)";
ctx.fillRect(0, 0, w, h);

ctx.beginPath();
ctx.moveTo(margin + wl, margin);
ctx.lineTo(margin + wl, h - margin);
ctx.moveTo(margin + wl * 2, margin);
ctx.lineTo(margin + wl * 2, h - margin);
ctx.moveTo(margin, margin + hl);
ctx.lineTo(w - margin, margin + hl);
ctx.moveTo(margin, margin + hl * 2);
ctx.lineTo(w - margin, margin + hl * 2);
ctx.stroke();