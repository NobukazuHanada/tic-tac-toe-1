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

function check(x,y){
    const centerX = w / 2 + x * wl;
    const centerY = h / 2 + y * hl;
    const radius = wl * 0.4;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();

    const size = wl * 0.8;

    ctx.beginPath();
    ctx.moveTo(centerX - size / 2, centerY - size /2);
    ctx.lineTo(centerX + size / 2, centerY + size /2);
    ctx.moveTo(centerX + size / 2, centerY - size /2);
    ctx.lineTo(centerX - size / 2, centerY + size /2);
    ctx.stroke();
}