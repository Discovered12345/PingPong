let paddleWidth = 10;
let paddleHeight = 80;
let paddleSpeed = 5;
let player1Y, player2Y;
let player1Score = 0, player2Score = 0;
let ball, ballSpeedX, ballSpeedY;

function setup() {
  createCanvas(800, 400);
  player1Y = height / 2;
  player2Y = height / 2;
  ball = createVector(width / 2, height / 2);
  ballSpeedX = random(-1, 1) > 0 ? 5 : -5;
  ballSpeedY = random(-1, 1) > 0 ? 5 : -5;
}

function draw() {
  background(0);
  
  // Draw paddles
  fill(255);
  rect(10, player1Y, paddleWidth, paddleHeight);
  rect(width - 20, player2Y, paddleWidth, paddleHeight);
  
  // Draw ball
  ellipse(ball.x, ball.y, 10, 10);
  
  // Move paddles
  if (keyIsDown(87)) { // Player 1 controls (W)
    player1Y -= paddleSpeed;
  }
  if (keyIsDown(83)) { // Player 1 controls (S)
    player1Y += paddleSpeed;
  }
  if (keyIsDown(UP_ARROW)) { // Player 2 controls (Up arrow)
    player2Y -= paddleSpeed;
  }
  if (keyIsDown(DOWN_ARROW)) { // Player 2 controls (Down arrow)
    player2Y += paddleSpeed;
  }
  
  // Ensure paddles stay within the canvas
  player1Y = constrain(player1Y, 0, height - paddleHeight);
  player2Y = constrain(player2Y, 0, height - paddleHeight);
  
  // Move ball
  ball.x += ballSpeedX;
  ball.y += ballSpeedY;
  
  // Ball collision with walls
  if (ball.y < 0 || ball.y > height) {
    ballSpeedY *= -1;
  }
  
  // Ball collision with paddles
  if (ball.x <= 20 && ball.y >= player1Y && ball.y <= player1Y + paddleHeight) {
    ballSpeedX *= -1;
  } else if (ball.x >= width - 20 && ball.y >= player2Y && ball.y <= player2Y + paddleHeight) {
    ballSpeedX *= -1;
  }
  
  // Score update
  if (ball.x < 0) {
    player2Score++;
    resetBall();
  } else if (ball.x > width) {
    player1Score++;
    resetBall();
  }
  
  // Display scores
  fill(255);
  textSize(32);
  text(player1Score, width / 4, 30);
  text(player2Score, 3 * width / 4, 30);
}

function resetBall() {
  ball = createVector(width / 2, height / 2);
  ballSpeedX = random(-1, 1) > 0 ? 5 : -5;
  ballSpeedY = random(-1, 1) > 0 ? 5 : -5;
}