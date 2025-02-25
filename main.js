const result = document.getElementById('result');
const resultText = document.createTextNode("");
result.appendChild(resultText);

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')
const w = 500
const h = 500
const margin = 50
const wL = w - 2 * margin
const wl = wL / 3
const hL = h - 2 * margin
const hl = hL / 3

ctx.fillStyle = 'rgb(0, 120, 210)'
ctx.fillRect(0, 0, w, h)

//区分分け
ctx.beginPath()
ctx.moveTo(margin + wl, margin)
ctx.lineTo(margin + wl, h - margin)
ctx.moveTo(margin + wl * 2, margin)
ctx.lineTo(margin + wl * 2, h - margin)
ctx.moveTo(margin, margin + hl)
ctx.lineTo(w - margin, margin + hl)
ctx.moveTo(margin, margin + hl * 2)
ctx.lineTo(w - margin, margin + hl * 2)
ctx.stroke()

function check(mark, x, y) {
  const centerX = w / 2 + wl * x
  const centerY = h / 2 + hl * y
  const radious = wl * 0.4
  const size = wl * 0.4

  if (mark == 'maru') {
    ctx.beginPath()
    ctx.arc(centerX, centerY, radious, 0, 2 * Math.PI)
    ctx.stroke()
  }

  if (mark == 'batsu') {
    ctx.beginPath()
    ctx.moveTo(centerX - size, centerY + size)
    ctx.lineTo(centerX + size, centerY - size)
    ctx.moveTo(centerX - size, centerY - size)
    ctx.lineTo(centerX + size, centerY + size)
    ctx.stroke()
  }
}

const xs = [0, 1, 2]
const ys = [0, 1, 2]
const x1s = xs.map((x) => margin + x * wl)
const x2s = xs.map((x) => margin + (x + 1) * wl)
const y1s = ys.map((y) => margin + y * hl)
const y2s = ys.map((y) => margin + (y + 1) * hl)
let maru = true
const checked = [
    [false, false, false],
    [false, false, false],
    [false, false, false]
];
let gameover = false;
let win = null;

canvas.addEventListener('click', (e) => {
  if(gameover){
    return;
  }

  console.log(`x: ${e.clientX} y: ${e.clientY}`)
  xs.forEach((x, index) => {
    ys.forEach((y, index2) => {
      if (
        e.clientX < x2s[index] &&
        e.clientX > x1s[index] &&
        e.clientY < y2s[index2] &&
        e.clientY > y1s[index2]
      ) {
        if(checked[y][x]){
          return;
        }

        if (maru ) {
          check('maru', x - 1, y - 1);
          checked[y][x] = "maru";
        } else {
          check('batsu', x - 1, y - 1);
          checked[y][x] = "batsu";
        }

        let yokoHantei = true;
        for(let i = 0; i < 3; i++){
          if(!yokoHantei){
            break;
          }
          if(maru){
            yokoHantei = checked[y][i] == "maru";
          }else{
            yokoHantei = checked[y][i] == "batsu";
          }
        }
        console.log(`yokoHantei : ${yokoHantei}`);

        let tateHantei = true;
        for(let i = 0; i < 3; i++){
          if(!tateHantei){
            break;
          }
          if(maru){
            tateHantei = checked[i][x] == "maru";
          }else{
            tateHantei = checked[i][x] == "batsu";
          }
        }
        console.log(`tateHantei : ${tateHantei}`);

        let naname = true;
        if(maru){
          naname = checked[1][1] == "maru"
          && ( 
            (checked[0][0] == "maru" && checked[2][2] == "maru")
            ||
            (checked[0][2] == "maru" && checked[2][0] == "maru")
          );
        }else{
          naname = checked[1][1] == "batsu"
          && ( 
            (checked[0][0] == "batsu" && checked[2][2] == "batsu")
            ||
            (checked[0][2] == "batsu" && checked[2][0] == "batsu")
          );
        }
        console.log(`naname : ${naname}`);

        if( tateHantei || yokoHantei || naname ){
          gameover = true;
          if(maru){
            win = "maru";
          }else{
            win = "batsu";
          }
        }

        if( checked.map(l=>l.every(a=>a)).every(a=>a) ){
          gameover = true;
        }
        console.log(`gameover : ${gameover}`);
        console.log(`win : ${win}`);

        if(gameover){
          if(win == "maru"){
            resultText.data = "まるの勝ち";
          }else if(win == "batsu"){
            resultText.data = "ばつの勝ち";
          }else{
            resultText.data = "ひきわけ";
          }
        }

        maru = !maru;
        console.log(checked);
      }
    })
  })
})