const playboard = document.querySelector(".playboard");
const scoreElement = document.querySelector(".score");
const recordLElement = document.querySelector(".record");
const controls = document.querySelectorAll(".controls i");
let score = 0;
let record = 0 || localStorage.getItem("record");
let gameOver = false;
let snakeX = 5;
let snakeY = 5;
let velocityX = 0;
let velocityY = 0;
let foodX, foodY;
let snakeBody = [];
let setIntervalid;
recordLElement.textContent = record;
const foodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};
const handleGameover = () => {
  clearInterval(setIntervalid);
  alert("Game Over! Press OK to replay");
  location.reload();
};
const changeDirections = (event) => {
  if (event.key === "ArrowLeft" && velocityX !== 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (event.key === "ArrowRight" && velocityX !== -1) {
    velocityX = 1;
    velocityY = 0;
  } else if (event.key === "ArrowDown" && velocityY !== -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (event.key === "ArrowUp" && velocityY !== 1) {
    velocityX = 0;
    velocityY = -1;
  }
  console.log(velocityX, velocityY);
};
controls.forEach((button) => {
  button.addEventListener("click", () => {
    changeDirections({ key: button.dataset.key });
  });
});
document.addEventListener("keydown", changeDirections);
const updatePosition = () => {
  snakeX += velocityX;
  snakeY += velocityY;
};
const initGame = () => {
  if (gameOver) return handleGameover();
  updatePosition();
  let html = `<i class="food fa-solid fa-apple-whole" style="grid-area: ${foodY}/${foodX};"></i>`;
  if (snakeX === foodX && snakeY === foodY) {
    foodPosition();
    snakeBody.push([foodY, foodX]);
    score++;
    record = score >= record ? score : record;
    localStorage.setItem("record", record);
    scoreElement.textContent = score;
    recordLElement.textContent = record;
  }
  // updatePosition();
  for (let index = snakeBody.length - 1; index > 0; index--) {
    snakeBody[index] = snakeBody[index - 1];
  }
  snakeBody[0] = [snakeX, snakeY];
  if (snakeX > 30 || snakeY > 30 || snakeX <= 0 || snakeY <= 0) {
    return (gameOver = true);
  }
  for (let index = 0; index < snakeBody.length; index++) {
    html += `<div class="head" style="grid-area: ${snakeBody[index][1]}/${snakeBody[index][0]};"></div>`;
    if (
      index !== 0 &&
      snakeBody[0][1] === snakeBody[index][1] &&
      snakeBody[0][0] === snakeBody[index][0]
    ) {
      gameOver = true;
    }
  }

  playboard.innerHTML = html;
};
foodPosition();
setIntervalid = setInterval(initGame, 100);
