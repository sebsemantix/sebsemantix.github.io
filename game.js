const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const gridSize = 20;
const width = canvas.width / gridSize;
const height = canvas.height / gridSize;
// Initialize the snake
let snake = [{ x: 5, y: 5 }];
let food = { x: 10, y: 10 };

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
        alert("Game over!");
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
    snake.unshift({ x: x + 1, y: y });

    // Check if the snake has eaten the food
    if (x + 1 === food.x && y === food.y) {
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

setInterval(moveSnake, 500);