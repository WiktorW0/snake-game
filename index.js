const gameBoard = document.querySelector('#gameBoard')
const ctx = gameBoard.getContext("2d")
const scoreText = document.querySelector('#score')
const resetBtn = document.querySelector('#resetBtn')
const gameWidth = gameBoard.width
const gameHeight = gameBoard.height
const boardBackground = "white"
const snakeColor = "green"
const snakeBorder = "black"
const foodColor = "red"
const foodBorder = "brown"
const unitSize = 25
let running = false
let xVelocity = unitSize
let yVelocity = 0
let foodX
let foodY
let score = 0
let snake = [
  { x: unitSize * 4, y: 0 },
  { x: unitSize * 3, y: 0 },
  { x: unitSize * 2, y: 0 },
  { x: unitSize, y: 0 },
  { x: 0, y: 0 }
]

window.addEventListener('keydown', changeDirections)
resetBtn.addEventListener('click', resetGame)

gameStart()

function gameStart() {
  running = true
  scoreText.textContent = score
  createFood()
  drawFood()
  nextTick()
}
function nextTick() {
  if (running) {
    gameTimer = setTimeout(() => {
      clearBoard()
      drawFood()
      moveSnake()
      drawSnake()
      teleport()
      checkGameOver()
      nextTick()
    }, 75)
  }
  else {
    displayGameOver()
  }
}
function clearBoard() {
  ctx.fillStyle = boardBackground
  ctx.fillRect(0, 0, gameWidth, gameHeight)
}
function createFood() {
  foodX = randomFood(0, gameWidth - unitSize)
  foodY = randomFood(0, gameHeight - unitSize)
}
function randomFood(min, max) {
  const randomNumb = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize
  return randomNumb
}

function drawFood() {
  ctx.fillStyle = foodColor
  ctx.strokeStyle = foodBorder
  ctx.fillRect(foodX, foodY, unitSize, unitSize)
  ctx.strokeRect(foodX, foodY, unitSize, unitSize)
}
function moveSnake() {
  const head = {
    x: snake[0].x + xVelocity,
    y: snake[0].y + yVelocity
  }
  snake.unshift(head)
  console.log(snake[0])
  if (snake[0].x == foodX && snake[0].y == foodY) {
    score++
    scoreText.textContent = score
    createFood()
  } else {
    snake.pop()
  }
}
function drawSnake() {
  ctx.fillStyle = snakeColor
  ctx.strokeStyle = snakeBorder
  snake.forEach(snakePart => {
    ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize)
    ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize)
  })
}
function changeDirections(event) {
  const keyPressed = event.keyCode
  const LEFT = 37
  const RIGHT = 39
  const UP = 38
  const DOWN = 40

  const goingUP = (yVelocity == -unitSize)
  const goingDOWN = (yVelocity == unitSize)
  const goingLEFT = (xVelocity == -unitSize)
  const goingRIGHT = (xVelocity == unitSize)

  switch (true) {
    case (keyPressed == LEFT && !goingRIGHT):
      xVelocity = -unitSize
      yVelocity = 0
      break
    case (keyPressed == RIGHT && !goingLEFT):
      xVelocity = unitSize
      yVelocity = 0
      break
    case (keyPressed == UP && !goingDOWN):
      xVelocity = 0
      yVelocity = -unitSize
      break
    case (keyPressed == DOWN && !goingUP):
      xVelocity = 0
      yVelocity = unitSize
      break
    default:
      break
  }
}

function teleport() {
  snake.forEach(snakePart => {
    if (snakePart.x < 0) {
      snakePart.x = (gameWidth - unitSize)
    } else if (snakePart.x > gameWidth) {
      snakePart.x = 0
    } else if (snakePart.y < 0) {
      snakePart.y = (gameHeight - unitSize)
    } else if (snakePart.y > gameHeight) {
      snakePart.y = 0
    } else {
      return
    }
  })
}

function checkGameOver() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      running = false
    }
  }
}
function displayGameOver() {
  ctx.font = "50px MV Boli"
  ctx.fillStyle = "black"
  ctx.textAlign = "center"
  ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2)
  running = false
}
function resetGame() {
  score = 0
  xVelocity = unitSize
  yVelocity = 0
  snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 }
  ]
  clearTimeout(gameTimer)
  gameStart()
  console.log(xVelocity)
}

// Colision between snake and apple
// function colisionDetect(x1,x2){
//   return(x1 > x2 && x1 < x2 + w2 && y1 > y2 && y1 < y2 + h2)
// }
