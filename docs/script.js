function showModal(title, description, link) {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.innerHTML = `
      <div class="modal-box">
        <span class="modal-close">&times;</span>
        <h3>${title}</h3>
        <p>${description}</p>
        <a href="${link}" class="btn small">View Full Project</a>
      </div>
    `;

  document.body.appendChild(modal);

  modal.querySelector(".modal-close").onclick = () => modal.remove();
  modal.onclick = (e) => {
    if (e.target === modal) modal.remove();
  };
}

document.querySelectorAll(".btn.small").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const title = button.dataset.title;
    const description = button.dataset.description;
    const link = button.dataset.link || "#";
    showModal(title, description, link);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const viewMoreBtn = document.getElementById("view-more-btn");
  const extraProjects = document.getElementById("extra-projects");

  viewMoreBtn.addEventListener("click", () => {
    const isHidden = extraProjects.classList.contains("hidden");

    if (isHidden) {
      extraProjects.classList.remove("hidden");
      viewMoreBtn.textContent = "View Less Projects";
    } else {
      extraProjects.classList.add("hidden");
      viewMoreBtn.textContent = "View More Projects";
    }
  });
});

// Snake Game
const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const totalPlayed = document.querySelector("#howManyPlayed");
const highScoreText = document.querySelector("#highScoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "#1d2b53";
const snakeColour = "#ff004d";
const snakeBorder = "#ffec27";
const foodColour = "#ffec27";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
  { x: unitSize * 4, y: 0 },
  { x: unitSize * 3, y: 0 },
  { x: unitSize * 2, y: 0 },
  { x: unitSize, y: 0 },
  { x: 0, y: 0 },
];
let gameLoop;
let totalPlays = 0;
let highScore = 0;

//event listener to listen to key events
window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

function gameStart() {
  totalPlays += 1;
  running = true;
  scoreText.textContent = score;
  totalPlayed.textContent = totalPlays;
  highScoreText.textContent = highScore;
  createFood();
  drawFood();
  nextTick();
}
function nextTick() {
  if (running) {
    gameLoop = setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 85);
  } else {
    displayGameOver();
  }
}

function clearBoard() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function createFood() {
  function randomFood(min, max) {
    const randNum =
      Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
    return randNum;
  }
  foodX = randomFood(0, gameWidth - unitSize);
  foodY = randomFood(0, gameWidth - unitSize);
}

function drawFood() {
  ctx.fillStyle = foodColour;
  ctx.fillRect(foodX, foodY, unitSize, unitSize);
}
function moveSnake() {
  const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
  snake.unshift(head);
  if (snake[0].x == foodX && snake[0].y == foodY) {
    //if food is eaten
    score += 1;
    scoreText.textContent = score;

    if (score > highScore) {
      highScore = score;
      document.getElementById("highScoreText").textContent = highScore;
    }
    createFood();
  } else {
    snake.pop();
  }
}
function drawSnake() {
  ctx.fillStyle = snakeColour;
  ctx.strokeStyle = snakeBorder;
  snake.forEach((snakePart) => {
    ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
    ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
  });
}
function changeDirection(event) {
  if ([LEFT, RIGHT, UP, DOWN].includes(keyPressed)) {
    event.preventDefault(); // Prevent scrolling only for arrow keys
  }
  const keyPressed = event.keyCode;
  const LEFT = 37;
  const RIGHT = 39;
  const UP = 38;
  const DOWN = 40;

  const goingUP = yVelocity == -unitSize;
  const goingDOWN = yVelocity == unitSize;
  const goingRIGHT = xVelocity == unitSize;
  const goingLEFT = xVelocity == -unitSize;

  switch (true) {
    case keyPressed == LEFT && !goingRIGHT:
      xVelocity = -unitSize;
      yVelocity = 0;
      break;
    case keyPressed == UP && !goingDOWN:
      xVelocity = 0;
      yVelocity = -unitSize;
      break;
    case keyPressed == RIGHT && !goingLEFT:
      xVelocity = unitSize;
      yVelocity = 0;
      break;
    case keyPressed == DOWN && !goingUP:
      xVelocity = 0;
      yVelocity = unitSize;
      break;
  }
}
function checkGameOver() {
  switch (true) {
    case snake[0].x < 0:
      running = false;
      break;
    case snake[0].x >= gameWidth:
      running = false;
      break;
    case snake[0].y < 0:
      running = false;
      break;
    case snake[0].y >= gameHeight:
      running = false;
      break;
  }
  for (let i = 1; i < snake.length; i += 1) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      running = false;
    }
  }
}

function displayGameOver() {
  ctx.font = "40px 'Press Start 2P'";

  ctx.fillStyle = "#7e2553";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle"; // vertically centers text around y position

  ctx.fillText("GAME OVER!", gameWidth / 2 + 10, gameHeight / 2);

  running = false;
}
function resetGame() {
  clearTimeout(gameLoop);
  resetBtn.textContent = "Reset";
  score = 0;
  xVelocity = unitSize;
  yVelocity = 0;
  snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 },
  ];

  gameStart();
}
