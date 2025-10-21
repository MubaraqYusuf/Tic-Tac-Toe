const gameStorage = new GameStorage();
const game = new TicTacToeGame(gameStorage);

const modeSelection = document.getElementById('mode-selection');
const gameContainer = document.getElementById('game-container');
const modeButtons = document.querySelectorAll('.mode-btn');
const resetBtn = document.getElementById('reset-btn');
const changeModeBtn = document.getElementById('change-mode-btn');
const playAgainBtn = document.getElementById('play-again-btn');

modeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const mode = button.dataset.mode;
    game.setMode(mode);
    modeSelection.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    game.init();
  });
});

resetBtn.addEventListener('click', () => {
  game.resetGame();
});

changeModeBtn.addEventListener('click', () => {
  gameContainer.classList.add('hidden');
  modeSelection.classList.remove('hidden');
  game.resetGame();
});

playAgainBtn.addEventListener('click', () => {
  game.playAgain();
});

window.addEventListener('load', () => {
  const savedState = gameStorage.loadState();
  if (savedState && savedState.mode) {
    game.setMode(savedState.mode);
    modeSelection.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    game.restoreState(savedState);
  }
});
