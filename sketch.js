let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let w, h;
let ai = 'X';
let human = 'O';
let currentPlayer = human;

function setup() {
  // Gumawa ng canvas at ilagay sa gitna
  let canvas = createCanvas(400, 400);
  w = width / 3;
  h = height / 3;
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
  if (currentPlayer == human) {
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    if (i >= 0 && i < 3 && j >= 0 && j < 4) {
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
  background('#f7f9fc'); // Off-white / napakabubot na blue background
  
  // --- IGUHIT ANG CUTE BLUE GRID ---
  stroke('#3a539b'); // Ang kulay na blue mula sa iyong larawan
  strokeWeight(5);   // Mas makapal na linya para mas cute tingnan
  strokeCap(ROUND);  // Bilugan ang dulo ng mga linya
  
  line(w, 10, w, height - 10);
  line(w * 2, 10, w * 2, height - 10);
  line(10, h, width - 10, h);
  line(10, h * 2, width - 10, h * 2);

  // --- IGUHIT ANG MGA SHAPES (X at O) ---
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = i * w + w / 2;
      let y = j * h + h / 2;
      let spot = board[i][j];
      let r = w / 4; // Sukat ng radius

      stroke('#3a539b'); // Parehong blue para sa X at O
      strokeWeight(14);   // Makapal na stroke para maging "chubby" at cute ang shapes
      noFill();

      if (spot == human) {
        // Magandang Bilog (O)
        ellipse(x, y, r * 2);
      } else if (spot == ai) {
        // Cute na may Bilugang Dulo na Ekis (X)
        line(x - r + 5, y - r + 5, x + r - 5, y + r - 5);
        line(x + r - 5, y - r + 5, x - r + 5, y + r - 5);
      }
    }
  }

  // --- CELEBRATION / TEXT DISPLAY ---
  let result = checkWinner();
  if (result != null) {
    noLoop();
    
    // Gumawa ng HTML element gamit ang p5.js para magamit ang Fredoka Font natin
    let resultP = createP('');
    resultP.addClass('result-text'); 
    
    if (result == 'tie') {
      resultP.html('Tie! 🤝');
    } else if (result == 'X') {
      resultP.html('X Win! ★');
    } else if (result == 'O') {
      resultP.html('O Win! 🎉');
    }
  }
}