let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let w, h;
let ai = 'X';
let human = 'O';
let currentPlayer = human;

// Pwede itong maging: 'START', 'PLAYING', o 'END'
let gameState = 'START'; 

function setup() {
  createCanvas(450, 500); // Ginawang mas mataas ang canvas para magkasya ang buttons at text sa ilalim
  w = width / 3;
  h = (height - 100) / 3; // Nag-iwan ng 100px sa ibaba para sa status at buttons
  
  // Set ang ating cute na font mula sa Google Fonts
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

function mousePressed() {
  // 1. KUNG NASA START SCREEN
  if (gameState === 'START') {
    // I-check kung pinindot ang "Start Game" button (X: 125-325, Y: 220-270)
    if (mouseX > 125 && mouseX < 325 && mouseY > 220 && mouseY < 270) {
      gameState = 'PLAYING';
    }
  } 
  
  // 2. KUNG NASA PANGALAWANG SCREEN AT TURN NG TAO
  else if (gameState === 'PLAYING' && currentPlayer == human) {
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    
    // Siguraduhing nasa loob ng board ang click
    if (i >= 0 && i < 3 && j >= 0 && j < 3) {
      if (board[i][j] == '') {
        board[i][j] = human;
        currentPlayer = ai;
        
        // Pagkatapos tumira ng tao, titingnan kung may nanalo. Kung wala, titira agad ang AI
        if (checkWinner() == null) {
          bestMove();
        }
      }
    }
  } 
  
  // 3. KUNG NASA END SCREEN (TAPOS NA ANG LARO)
  else if (gameState === 'END') {
    // I-check kung pinindot ang "Try again" button (X: 135-315, Y: 430-475)
    if (mouseX > 135 && mouseX < 315 && mouseY > 440 && mouseY < 485) {
      // I-reset ang board at ibalik sa simula ang laro
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
  background('#f7f9fc'); // Cute malinis na background

  // ----------------------------------------------------
  // SCENARIO A: START SCREEN MUNA
  // ----------------------------------------------------
  if (gameState === 'START') {
    // Pamagat
    fill('#3a539b');
    noStroke();
    textSize(46);
    textAlign(CENTER, CENTER);
    text('Tic-Tac-Toe', width / 2, 140);
    
    // "Start Game" Cute Button Shadow
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
  
  // ----------------------------------------------------
  // SCENARIO B: NAGLALARO NA (BOARD AT SHAPES)
  // ----------------------------------------------------
  else if (gameState === 'PLAYING' || gameState === 'END') {
    
    // Iguhit ang Cute Blue Grid Lines
    stroke('#3a539b');
    strokeWeight(6);
    strokeCap(ROUND);
    line(w, 20, w, h * 3 - 20);
    line(w * 2, 20, w * 2, h * 3 - 20);
    line(20, h, width - 20, h);
    line(20, h * 2, width - 20, h * 2);

    // Iguhit ang mga Nilagay na X at O sa board
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

    // Patuloy na i-check kung may nanalo na habang naglalaro
    let result = checkWinner();
    if (result != null) {
      gameState = 'END'; // Palitan ang mode sa tapos na kapag may result
      
      // --- IGUHIT ANG RESULTA AT TRY AGAIN BUTTON ---
      noStroke();
      fill('#3a539b');
      textSize(32);
      textAlign(CENTER, CENTER);
      
      // Palitan ang text base sa resulta
      if (result == 'tie') {
        text('Tie! 🤝', width / 2, h * 3 + 25);
      } else {
        text(result + ' Win! 🎉', width / 2, h * 3 + 25);
      }
      
      // "Try again" Button Shadow
      fill('#2d4373');
      rect(135, 443, 180, 45, 22);
      // Button Base
      fill('#3a539b');
      rect(135, 440, 180, 45, 22);
      
      // Button Text
      fill(255);
      textSize(18);
      text('Try again', width / 2, 462);
    }
  }
}