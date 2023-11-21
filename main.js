/* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/

let c, ctx, W, H;
let arcs = [];
let spinAngleStart,
  spinTime,
  spinTimeTotal,
  startAngle = 0,
  runSpin = false;
let currentlyBet = 0;
let betCurrently = 0;
let choiceBet = 1;
let bankBalance = 100;
let nbrs;
let tokens;

const numbers = [
  50, 1, 3, 1, 5, 1, 3, 1, 10, 5, 1, 3, 1, 20, 1, 3, 1, 5, 1, 3, 1, 5, 1, 10, 3,
  1, 50, 1, 3, 1, 5, 1, 3, 1, 10, 3, 1, 5, 1, 20, 1, 3, 1, 10, 1, 5, 1, 20, 1,
  3, 5, 1,
];

const colors = {
  1: "#f5872d",
  3: "#1ea15d",
  5: "#4a4b9d",
  10: "#d32f2e",
  20: "#9f669d",
  50: "white",
};

const displayInfos = (val) => (display_infos.style.display = val);

const bankBalanceUpDate = () => (bank_balance.innerText = bankBalance + " $");

const choiceToken = (val) => (choiceBet = val == "all" ? bankBalance : val);

class Arc {
  constructor(num, color, colorText, arc, index) {
    this.num = num;
    this.color = color;
    this.colorText = colorText;
    this.arc = arc;
    this.a = startAngle + arc * index;
    this.index = index;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(
      W / 2 + 157 * Math.cos(this.a),
      200 + 157 * Math.sin(this.a),
      2,
      0,
      2 * Math.PI
    );
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.font = "12px Arial";
    ctx.fillStyle = this.color;
    ctx.arc(W / 2, 200, 150, this.a, this.a + this.arc);
    ctx.arc(W / 2, 200, 100, this.a + this.arc, this.a, true);
    ctx.stroke();
    ctx.fill();
    ctx.save();

    ctx.fillStyle = this.colorText;
    ctx.translate(
      W / 2 + Math.cos(this.a + this.arc / 2) * 135,
      200 + Math.sin(this.a + this.arc / 2) * 135
    );
    ctx.rotate(this.a + this.arc / 2 + Math.PI / 2);
    ctx.fillText(this.num, -ctx.measureText(this.num).width / 2, 0);
    ctx.restore();
  }
  update() {
    this.a = startAngle + this.arc * this.index;
    this.draw();
  }
}

const token = (box) => {
  if (!runSpin) {
    if (bankBalance >= choiceBet) {
      let bet = parseInt(box.getAttribute("bet"));
      let newDiv2 = document.createElement("div");
      bet += choiceBet;
      box.setAttribute("bet", bet);
      if (bet > 99) newDiv2.setAttribute("class", "token more100");
      else newDiv2.setAttribute("class", "token");
      newDiv2.textContent = bet;
      var offsets = box.getBoundingClientRect();
      newDiv2.style.top = offsets.top + 5 + "px";
      newDiv2.style.left = offsets.left + 5 + "px";
      document.body.appendChild(newDiv2);
      bankBalance -= choiceBet;
      betCurrently += choiceBet;
      bankBalanceUpDate();
    }
  }
};

const cleanNbrs = () => {
  let elms = document.getElementsByClassName("token");
  while (elms[0]) {
    elms[0].parentNode.removeChild(elms[0]);
  }
  for (let b = 0; b < nbrs.length; b++) {
    nbrs[b].setAttribute("bet", 0);
  }
  selectToken(tokens[0]);
  choiceToken(1);
  betCurrently = 0;
  bankBalanceUpDate();
};

const animNbrs = (num, win, bk, color) => {
  for (let i = 0; i < nbrs.length; i++) {
    nbrs[i].style.opacity = "0.2";
    output_result.innerHTML = `Won<br>${win} \$`;
    output_result.style.display = "block";
    play.style.display = "none";
    if (nbrs[i].innerText == num) {
      if (nbrs[i].innerText == 50) {
        if (color == nbrs[i].getAttribute("val_color")) {
          nbrs[i].style.opacity = "1";
        }
      } else {
        nbrs[i].style.opacity = "1";
      }
    }
  }
  setTimeout(() => {
    cleanNbrs();
    bankBalance = bk;
    bankBalanceUpDate();
    runSpin = false;
    for (let i = 0; i < nbrs.length; i++) {
      nbrs[i].style.opacity = "1";
      output_result.style.display = "none";
      play.style.display = "block";
    }
  }, 3000);
};

const cancel = () => {
  if (!runSpin) {
    bankBalance += betCurrently;
    cleanNbrs();
  }
};

const spin = () => {
  if (!runSpin) {
    runSpin = true;
    spinAngleStart = Math.random() * 2 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 20 + 8 * 1000;
    requestAnimationFrame(animate);
  }
};

const easeOutExpo = (t, b, c, d) => {
  return c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
};

const deco0 = () => {
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;
  ctx.fillStyle = "black";
  ctx.arc(W / 2, 200, 162, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.lineWidth = 2;
  ctx.arc(W / 2, 200, 153, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
};

const deco1 = () => {
  ctx.beginPath();
  ctx.fillStyle = radColor(W / 2, 200, 0, W / 2, 200, 150, "rgb(30,30,30)");
  ctx.arc(W / 2, 200, 110, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
};
const arrow = () => {
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.moveTo(W / 2 - 2, 0);
  ctx.lineTo(W / 2 - 2, 15);
  ctx.lineTo(W / 2 - 9, 15);
  ctx.lineTo(W / 2, 45);
  ctx.lineTo(W / 2 + 10, 15);
  ctx.lineTo(W / 2 + 3, 15);
  ctx.lineTo(W / 2 + 3, 0);
  ctx.lineTo(W / 2 - 3, 0);
  ctx.fill();
  ctx.closePath();
};

const radColor = (x0, y0, r0, x1, y1, r1, c) => {
  let NG = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
  NG.addColorStop(0, c);
  NG.addColorStop(0.5, c);
  NG.addColorStop(1, "black");
  return NG;
};

const createArcs = () => {
  for (let i = 0; i < numbers.length; i++) {
    let color = i == 0 ? "black" : colors[numbers[i]];
    let colorText = i == 0 ? "white" : "black";
    arcs.push(
      new Arc(numbers[i], color, colorText, Math.PI / (numbers.length / 2), i)
    );
  }
};

const setValNbrs = () => {
  for (let b = 0; b < nbrs.length; b++) {
    nbrs[b].setAttribute("bet", 0);
    nbrs[b].addEventListener("click", function () {
      token(nbrs[b]);
    });
  }
};

const createEventsNbrs = () => {
  for (let c = 0; c < tokens.length; c++) {
    tokens[c].addEventListener("click", function () {
      selectToken(tokens[c]);
    });
  }
};

const selectToken = (token) => {
  for (let i = 0; i < tokens.length; i++) {
    tokens[i].style.transform = "scale(1)";
    tokens[i].style.backgroundColor = "rgb(136, 133, 133)";
    tokens[i].style.boxShadow = "0 0 10px transparent";
  }
  token.style.transform = "scale(1.2)";
  token.style.backgroundColor = "rgb(233, 225, 225)";
  token.style.boxShadow = "2px 1px 5px black";
};

const animBank = (win, bk) => {
  let t = 1500 / win;
  if (bankBalance < bk) {
    bankBalance++;
    bankBalanceUpDate();
    setTimeout(() => animBank(win, bk), t);
  }
};

const checkResultBet = (result, color) => {
  let win = 0;
  for (let i = 0; i < nbrs.length; i++) {
    let bet = parseInt(nbrs[i].getAttribute("bet"));
    let num = parseInt(nbrs[i].innerHTML);
    if (result == num) {
      if (result == 50) {
        if (nbrs[i].getAttribute("val_color") == color) {
          win += bet + bet * num;
          let bk = bankBalance + win;
          animBank(win, bk);
          animNbrs(num, win, bk, color);
          break;
        }
      } else {
        win += bet + bet * num;
        let bk = bankBalance + win;
        animBank(win, bk);
        animNbrs(num, win, bk, color);
        break;
      }
    }
  }
};
/* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/
const animArcs = () => {
  spinTime += 20;
  if (spinTime >= spinTimeTotal) {
    let arc = Math.PI / (numbers.length / 2);
    let deg = 90 + (startAngle * 180) / Math.PI;
    let d = (180 * arc) / Math.PI;
    let i = Math.floor((360 - (deg % 360)) / d);
    let color = arcs[i].color;
    checkResultBet(numbers[i], color);
  } else {
    let spinAngle =
      spinAngleStart - easeOutExpo(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI) / 180;
    requestAnimationFrame(animate);
  }
};

const getVariables = () => {
  c = document.getElementById("cnv");
  c.width = W = window.innerWidth;
  c.height = H = window.innerHeight;
  ctx = c.getContext("2d");
  nbrs = document.getElementsByClassName("case_num");
  tokens = document.getElementsByClassName("choicetoken");
  document.getElementById("play").onclick = () => {
    if (betCurrently > 0) spin();
    else {
      output_result.style.fontSize = "2em";
      output_result.innerHTML = `Place your <br>bet`;
      output_result.style.display = "block";
      play.style.display = "none";
      setTimeout(() => {
        output_result.style.fontSize = "2em";
        output_result.style.display = "none";
        play.style.display = "block";
      }, 1000);
    }
  };
};

const consoleOFF = () => {
  console.log = () => {};
  console.error = () => {};
  onerror = () => {
    console = null;
    return true;
  };
};

const init = () => {
  consoleOFF();
  getVariables();
  createArcs();
  deco0();
  arcs.forEach((x) => x.draw());
  deco1();
  arrow();
  setValNbrs();
  createEventsNbrs();
  selectToken(tokens[0]);
  choiceToken(1);
};

const animate = () => {
  ctx.clearRect(0, 0, W, H);
  deco0();
  arcs.forEach((x) => x.update());
  deco1();
  arrow();
  animArcs();
};

onload = init;

/* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/
