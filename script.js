const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const resetBtn = document.querySelector('.reset-btn');
const winnerPopup = document.querySelector('.winner-popup');
const winnerMsg = document.getElementById('winner-msg');
const closeBtn = document.querySelector('.close-btn');
const themeBtn = document.getElementById('theme-btn');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]              // Diagonals
];

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

  if (gameState[clickedCellIndex] !== '' || !gameActive) return;

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  clickedCell.classList.add(currentPlayer);

  checkForWinner();
}

function checkForWinner() {
  let roundWon = false;

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') continue;

    if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    winnerMsg.textContent = `Player ${currentPlayer} Wins!`;
    winnerPopup.classList.remove('hide');
    gameActive = false;
    triggerConfetti();
    return;
  }

  if (!gameState.includes('')) {
    winnerMsg.textContent = 'Draw!';
    winnerPopup.classList.remove('hide');
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function resetGame() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X', 'O');
  });
  winnerPopup.classList.add('hide');
}

function triggerConfetti() {
  confetti({
    particleCount: 200,
    spread: 120,
    origin: { y: 0.6 },
    colors: ['#ff0000', '#00ff00', '#0000ff', '#ffcc00', '#ff00ff'],
  });
}

function toggleTheme() {
  document.body.classList.toggle('light-theme');
  themeBtn.textContent = document.body.classList.contains('light-theme') ? '🌞' : '🌙';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
closeBtn.addEventListener('click', () => {
  winnerPopup.classList.add('hide');
  resetGame();
});
themeBtn.addEventListener('click', toggleTheme);