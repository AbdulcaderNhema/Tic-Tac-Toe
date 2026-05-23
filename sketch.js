let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let w, h;
let ai = 'X';
let human = 'O';
let currentPlayer = human;
let gameRunning = false; // Flag para malaman kung nagsimula na ang laro

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('canvas-container'); // Ilalagay ang canvas sa loob ng HTML div
  w = width / 3;
  h = height / 3;
  noLoop(); // Ititigil muna ang draw loop hangga't hindi naki-click ang Start
}

// Function na tatawagin ng Start Button
function startGame() {
  gameRunning = true;
  document.getElementById('start-screen').style.display = 'none'; // Itago ang Start screen
  loop(); // Simulan ang pag-draw ng canvas
}

// Function para sa Try Again
function resetGame() {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  currentPlayer = human;
  gameRunning = true;
  
  // Itago ang UI elements
  document.getElementById('winner-message').style.display = 'none';
  document.getElementById('retry-btn').style.display = 'none';
  
  loop(); // Ibalik ang draw loop
}

function equals3(a, b, c) {
  return a == b && b == c && a != '';
}

function checkWinner() {
  let winner = null;
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) winner = board[i][0];
    if (equals3(board[0][i], board[1][i], board[2][i])) winner = board[0][i];
  }
  if (equals3(board[0][0], board[1][1], board[2][2])) winner = board[0][0];
  if (equals3(board[2][0], board[1][1], board[0][2])) winner = board[2][0];

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') openSpots++;
    }
  }
  if (winner == null && openSpots == 0) return 'tie';
  return winner;
}

function mousePressed() {
  if (gameRunning && currentPlayer == human) {
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    if (i >= 0 && i < 3 && j >= 0 && j < 3) {
      if (board[i][j] == '') {
        board[i][j] = human;
        currentPlayer = ai;
        if (checkWinner() == null) {
          bestMove();
        }
      }
    }
  }
}

function draw() {
  background('#f7f9fc');
  
  // Cute Blue Grid
  stroke('#3a539b');
  strokeWeight(5);
  strokeCap(ROUND);
  line(w, 10, w, height - 10);
  line(w * 2, 10, w * 2, height - 10);
  line(10, h, width - 10, h);
  line(10, h * 2, width - 10, h * 2);

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = i * w + w / 2;
      let y = j * h + h / 2;
      let spot = board[i][j];
      let r = w / 4;
      stroke('#3a539b');
      strokeWeight(14);
      noFill();

      if (spot == human) {
        ellipse(x, y, r * 2);
      } else if (spot == ai) {
        line(x - r + 5, y - r + 5, x + r - 5, y + r - 5);
        line(x + r - 5, y - r + 5, x - r + 5, y + r - 5);
      }
    }
  }

  let result = checkWinner();
  if (result != null) {
    noLoop();
    gameRunning = false;
    
    // Ipakita ang Result at Try Again button mula sa HTML
    let msg = document.getElementById('winner-message');
    let btn = document.getElementById('retry-btn');
    
    msg.style.display = 'block';
    btn.style.display = 'inline-block';
    
    if (result == 'tie') {
      msg.innerHTML = "Tie! 🤝";
    } else {
      msg.innerHTML = result + " Win! 🎉";
    }
  }
}