https://editor.p5js.org/cyprian.dove/sketches/WL7j1ETcN
let frogX, frogY; // position of the frog
let carX = []; // array to store the position of the cars
let carY = []; // array to store the position of the cars
let carSpeed = []; // array to store the speed of the cars
let carWidth = 50; // width of the cars
let carHeight = 30; // height of the cars
let numCars = 5; // number of cars
let laneHeight; // height of each lane
let gameScore = 0; // score of the game

function setup() {
  createCanvas(400, 400);
  laneHeight = height / (numCars + 1);
  frogX = width / 2;
  frogY = height - laneHeight / 2;
  for (let i = 0; i < numCars; i++) {
    carX[i] = random(width - carWidth);
    carY[i] = i * laneHeight + laneHeight / 2;
    carSpeed[i] = random(2, 6);
  }
}

function draw() {
  background(220);
  drawLanes();
  drawFrog();
  moveCars();
  drawCars();
  checkCollisions();
  displayScore();
}

function drawLanes() {
  for (let i = 0; i < numCars + 1; i++) {
    stroke(0);
    line(0, i * laneHeight, width, i * laneHeight);
  }
}

function drawFrog() {
  fill(0, 255, 0);
  ellipse(frogX, frogY, 20, 20);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    frogY -= laneHeight;
  } else if (keyCode === DOWN_ARROW) {
    frogY += laneHeight;
  } else if (keyCode === LEFT_ARROW) {
    frogX -= 10;
  } else if (keyCode === RIGHT_ARROW) {
    frogX += 10;
  }
}

function moveCars() {
  for (let i = 0; i < numCars; i++) {
    carX[i] += carSpeed[i];
    if (carX[i] > width) {
      carX[i] = -carWidth;
    }
  }
}

function drawCars() {
  fill(255, 0, 0);
  for (let i = 0; i < numCars; i++) {
    rect(carX[i], carY[i] - carHeight / 2, carWidth, carHeight);
  }
}

function checkCollisions() {
  for (let i = 0; i < numCars; i++) {
    if (abs(carX[i] - frogX) < carWidth / 2 && abs(carY[i] - frogY) < carHeight / 2) {
      gameScore -= 10;
      frogX = width / 2;
      frogY = height - laneHeight / 2;
    }
  }
  if (frogY < laneHeight / 2) {
    gameScore += 50;
    frogX = width / 2;
    frogY = height - laneHeight / 2;
  }
}

function displayScore() {
  fill(0);
  textSize(20);
  text("Score: " + gameScore, 10, 30);
}
