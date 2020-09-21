import "./styles.css";

//make table
let table = document.createElement("div");
table.classList.add("table");
//make cells
for (let i = 0; i < 5; i++) {
  let tr = document.createElement("div");
  tr.classList.add("row");
  tr.classList.add("tr");
  for (let j = 0; j < 5; j++) {
    let td = document.createElement("div");
    td.classList.add("col");
    td.classList.add("s2");
    td.classList.add("td");
    td.id = i + "-" + j;
    tr.appendChild(td);
  }
  table.appendChild(tr);
}
//attach to board div
document.getElementById("board").appendChild(table);

//setplayerdefault
let player = 1;
//showinplayerdiv
let playerContent = document.createElement("p");
playerContent.innerText = `player${player}`;
document.getElementById("player").appendChild(playerContent);

document.getElementById("board").addEventListener("click", checkCell);

//store information about filledcells
let filledCells1 = [];
let filledCells2 = [];

//learve o or x mark on the cell
function checkCell(event) {
  progressBar();
  let id = event.target.id;
  //check if the cell is vacant
  if (filledCells1.indexOf(id) >= 0 || filledCells2.indexOf(id) >= 0) {
  } else {
    if (player === 1) {
      document.getElementById(id).innerText = "x";
      document.getElementById(id).classList.add("player1Checked");
      filledCells1.push(id);
      judgeWinner1();
    } else {
      document.getElementById(id).innerText = "o";
      document.getElementById(id).classList.add("player2Checked");
      filledCells2.push(id);
      judgeWinner2();
    }
    setNextPlayer();
  }
}
//define lines
const line1 = ["0-0", "0-1", "0-2", "0-3", "0-4"];
const line2 = ["1-0", "1-1", "1-2", "1-3", "1-4"];
const line3 = ["2-0", "2-1", "2-2", "2-3", "2-4"];
const line4 = ["3-0", "3-1", "3-2", "3-3", "3-4"];
const line5 = ["4-0", "4-1", "4-2", "4-3", "4-4"];
const line6 = ["0-0", "1-0", "2-0", "3-0", "4-0"];
const line7 = ["0-1", "1-1", "2-1", "3-1", "4-1"];
const line8 = ["0-2", "1-2", "2-2", "3-2", "4-2"];
const line9 = ["0-3", "1-3", "2-3", "3-3", "4-3"];
const line10 = ["0-4", "1-4", "2-4", "3-4", "4-4"];
const line11 = ["0-0", "1-1", "2-2", "3-3", "4-4"];
const line12 = ["0-4", "1-3", "2-2", "3-1", "4-0"];
const lineArray = [
  line1,
  line2,
  line3,
  line4,
  line5,
  line6,
  line7,
  line8,
  line9,
  line10,
  line11,
  line12
];
//judge winner1
function judgeWinner1() {
  for (let j = 0; j < lineArray.length; j++) {
    let line1Results = [];
    for (let i = 0; i < lineArray[j].length; i++) {
      let checkEachCell = filledCells1.includes(lineArray[j][i]);
      line1Results.push(checkEachCell);
    }
    if (line1Results.includes(false) === true) {
      //try next line
    } else {
      announceWinner1();
    }
  }
}

//judgewinner2
function judgeWinner2() {
  for (let j = 0; j < lineArray.length; j++) {
    let line1Results = [];
    for (let i = 0; i < lineArray[j].length; i++) {
      let checkEachCell = filledCells2.includes(lineArray[j][i]);
      line1Results.push(checkEachCell);
    }
    if (line1Results.includes(false) === true) {
      //try next line
    } else {
      announceWinner2();
    }
  }
}
//announcewinner
function announceWinner1() {
  alert("Player 1 won!");
}
function announceWinner2() {
  alert("Player 2 won!");
}

//set or switch player
function setNextPlayer() {
  if (player === 1) {
    player = 2;
  } else {
    player = 1;
  }
  //show current player
  playerContent.innerText = `player${player}`;
  document.getElementById("player").appendChild(playerContent);
}

//reset
let resetButton = document.getElementById("reset");
resetButton.innerText = "Reset";
function reset() {
  filledCells1 = [];
  filledCells2 = [];
  clearInterval(intervalId);
  width = 1;
  let board = document.getElementById("board");
  let cells = board.getElementsByClassName("td");
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
    cells[i].classList.remove("player1Checked");
    cells[i].classList.remove("player2Checked");
  }
}
document.getElementById("reset").addEventListener("click", reset);

// progress bar
let intervalId;
let bar = document.getElementById("progressBar");
let width = bar.style.width;
function progressBar() {
  clearInterval(intervalId);
  bar.style.width = 1;
  intervalId = setInterval(frame, 100);
  function frame() {
    if (width >= 100) {
      clearInterval(intervalId);
      setNextPlayer();
    } else {
      width++;
      bar.style.width = width + "%";
    }
  }
}
