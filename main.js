const newGameButton = document.getElementById("new-game-button");
const cells = document.querySelectorAll("[data-cell]");
const scoreboard = document.querySelector(".scoreboard");
const player1Score = document.getElementById("player1-score");
const player1CurrentScore = document.getElementById("player1-current-score");
const player2Score = document.getElementById("player2-score");
const player2CurrentScore = document.getElementById("player2-current-score");
let currentPlayer = 0;
let gameBoard = ["", "", "", "", "", "", "", "", ""];

// Add event listener to each cell
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (gameBoard[index] === "") {
      gameBoard[index] = currentPlayer;
      cell.textContent = currentPlayer;
      if (checkWin(currentPlayer)) {
        setTimeout(() => {
          alert(`Player ${currentPlayer} wins! \n This Game Is Made By CodeKoji`);
          newGame();
        }, 100);
      } else if (checkDraw()) {
        setTimeout(() => {
          alert("It's a draw! This Game Is Made By CodeKoji");
          newGame();
        }, 100);
      } else {
        currentPlayer = currentPlayer === "X" ? 0 : "X";
        scoreboard.classList.toggle("player-2-turn");
      }
    }
  });
});

// Check for win condition
function checkWin(player) {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    if (gameBoard[a] === player && gameBoard[b] === player && gameBoard[c] === player) {
      return true;
    }
  }
  return false;
}

// Check for draw condition
function checkDraw() {
  return gameBoard.every((cell) => cell !== "");
}

// Reset game state
function newGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => (cell.textContent = ""));
  scoreboard.classList.remove("player-2-turn");
  player1CurrentScore.textContent = parseInt(player1CurrentScore.textContent) + 1;
  player1Score.textContent = player1CurrentScore.textContent;
}

// Start new game on button click
newGameButton.addEventListener("click", newGame);