const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const gridSize = 20;
const width = canvas.width / gridSize;
const height = canvas.height / gridSize;
// Initialize the snake
let snake = [{ x: 5, y: 5 }];
let food = { x: 10, y: 10 };
let keyPressed = ""
let lastMove = "right";


addEventListener("keydown", (event) => {
  if (event.isComposing || event.keyCode === 40) {
    keyPressed = 'down'
  }
  if (event.isComposing || event.keyCode === 37) {
    keyPressed = 'left'
  }
  if (event.isComposing || event.keyCode === 38) {
    keyPressed = 'up'
  }
  if (event.isComposing || event.keyCode === 39) {
    keyPressed = 'right'
  }
  // do something
});
// Draw the snake on the canvas
function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = "green";
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
      });
    }

// Draw the food on the canvas
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}
// Clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
// Move the snake
function moveSnake() {
    let x = snake[0].x;
    let y = snake[0].y;
    // Check if the snake has hit the edge of the canvas
    if (x < 0 || x >= width || y < 0 || y >= height) {
        return;
    }
    // Check if the snake has hit itself
    for (let i = 1; i < snake.length; i++) {
        if (x === snake[i].x && y === snake[i].y) {
            alert("Game over!");
            return;
        }
    }

    // Move the snake
    snake.pop();
    switch (keyPressed) {
        case 'up':
            moveSnakeUp(x, y)
            break;
        case 'down':
            moveSnakeDown(x, y)
            break;
        case 'left':
            moveSnakeLeft(x, y)
            break;
        case 'right':
            moveSnakeRight(x, y)
            break;
        default:
            snake.unshift({ x: x + 1, y: y });
            break;
    }

    // Check if the snake has eaten the food
    if (x === food.x && y === food.y) {
        snake.push({});
        food = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height)
        };
    }
    clearCanvas();
    drawFood();
    drawSnake();
}

function moveSnakeUp(x, y) {
    if (lastMove != "down") {
        snake.unshift({ x: x, y: y - 1 });
        lastMove = "up";
    } else {
        snake.unshift({ x: x, y: y + 1 });
    }
}
function moveSnakeDown(x, y) {
    if (lastMove != "up") {
        snake.unshift({ x: x, y: y + 1 });
        lastMove = "down";
    } else {
        snake.unshift({ x: x, y: y - 1 });
    }
}
function moveSnakeLeft(x, y) {
    if (lastMove != "right") {
        snake.unshift({ x: x - 1, y: y });
        lastMove = "left";
    } else {
        snake.unshift({ x: x + 1, y: y });
    }
}
function moveSnakeRight(x, y) {
    if (lastMove != "left") {
        snake.unshift({ x: x + 1, y: y });
        lastMove = "right";
    } else {
        snake.unshift({ x: x - 1, y: y });
    }
}

function startGame() {
    setInterval(moveSnake, 100);
}
function resetGame() {
    snake = [{ x: 5, y: 5 }];
    food = { x: 10, y: 10 };
    keyPressed = ""
    clearInterval(moveSnake)
    setInterval(moveSnake, 100);
}