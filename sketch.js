let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let w, h;
let ai = 'X';
let human = 'O';
let currentPlayer = human;

let gameState = 'START'; 

function setup() {
  createCanvas(450, 500); 
  w = width / 3;
  h = (height - 100) / 3;
  
  textFont('Fredoka');
  textStyle(BOLD);
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

  // First Screen
function mousePressed() {
  if (gameState === 'START') {
    // Check if click "Start Game" button
    if (mouseX > 125 && mouseX < 325 && mouseY > 220 && mouseY < 270) {
      gameState = 'PLAYING';
    }
  } 
  
  // Second Screen
  else if (gameState === 'PLAYING' && currentPlayer == human) {
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    
    if (i >= 0 && i < 3 && j >= 0 && j < 3) {
      if (board[i][j] == '') {
        board[i][j] = human;
        currentPlayer = ai;
        
        // After the human move, check if the game finish or not.
        if (checkWinner() == null) {
          bestMove();
        }
      }
    }
  } 
  
  // Last Screen
  else if (gameState === 'END') {
    // Check if click "Try again" button
    if (mouseX > 135 && mouseX < 315 && mouseY > 445 && mouseY < 490) {
      // Reset from the beginning
      board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ];
      currentPlayer = human;
      gameState = 'PLAYING';
    }
  }
}

function draw() {
  background('#f7f9fc'); 

  // START SCREEN
  if (gameState === 'START') {
  
    fill('#3a539b');
    noStroke();
    textSize(46);
    textAlign(CENTER, CENTER);
    text('Tic-Tac-Toe', width / 2, 140);
    
    // Button Shadow
    fill('#2d4373');
    rect(125, 224, 200, 50, 25);
    // Button Base
    fill('#3a539b');
    rect(125, 220, 200, 50, 25);
    
    // Button Text
    fill(255);
    textSize(22);
    text('Start Game', width / 2, 245);
  } 
  
  // PLAYING SCREEN
  else if (gameState === 'PLAYING' || gameState === 'END') {
    
    // Blue Grid Lines
    stroke('#3a539b');
    strokeWeight(6);
    strokeCap(ROUND);
    line(w, 20, w, h * 3 - 20);
    line(w * 2, 20, w * 2, h * 3 - 20);
    line(20, h, width - 20, h);
    line(20, h * 2, width - 20, h * 2);

    // X and O on board
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
      // If there's a winner or tie, Change to end mode.
      gameState = 'END'; 
      
      // "Try again" button
      noStroke();
      fill('#3a539b');
      textSize(32);
      textAlign(CENTER, CENTER);
      

      if (result == 'tie') {
        text('Tie! 🤝', width / 2, h * 3 + 25);
      } else {
        text(result + ' Win! 🎉', width / 2, h * 3 + 25);
      }
      
      // Button Shadow
      fill('#2d4373');
      rect(135, 448, 180, 45, 22);
      // Button Base
      fill('#3a539b');
      rect(135, 445, 180, 45, 22);
      
      // Button Text
      fill(255);
      textSize(18);
      text('Try again', width / 2, 467);
    }
  }
}