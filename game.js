class TicTacToeGame {
  constructor(storage) {
    this.storage = storage;
    this.board = Array(9).fill(null);
    this.currentPlayer = 'X';
    this.gameActive = true;
    this.mode = null;
    this.scores = { X: 0, O: 0, draw: 0 };

    this.winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    this.cells = document.querySelectorAll('[data-cell]');
    this.currentPlayerDisplay = document.getElementById('current-player');
    this.gameMessage = document.getElementById('game-message');
    this.messageText = document.getElementById('message-text');
    this.scoreXDisplay = document.getElementById('score-x');
    this.scoreODisplay = document.getElementById('score-o');
    this.scoreDrawDisplay = document.getElementById('score-draw');
  }

  setMode(mode) {
    this.mode = mode;
  }

  init() {
    this.board = Array(9).fill(null);
    this.currentPlayer = 'X';
    this.gameActive = true;
    this.updateDisplay();
    this.attachEventListeners();
    this.updateScoreDisplay();
  }

  attachEventListeners() {
    this.cells.forEach((cell, index) => {
      cell.replaceWith(cell.cloneNode(true));
    });

    this.cells = document.querySelectorAll('[data-cell]');

    this.cells.forEach((cell, index) => {
      cell.addEventListener('click', () => this.handleCellClick(index));
    });
  }

  handleCellClick(index) {
    if (!this.gameActive || this.board[index] !== null) {
      return;
    }

    if (this.mode === 'ai' && this.currentPlayer === 'O') {
      return;
    }

    this.makeMove(index);

    if (this.mode === 'ai' && this.gameActive && this.currentPlayer === 'O') {
      setTimeout(() => {
        this.makeAIMove();
      }, 500);
    }
  }

  makeMove(index) {
    this.board[index] = this.currentPlayer;
    this.cells[index].classList.add(this.currentPlayer.toLowerCase());

    this.saveState();

    const result = this.checkGameEnd();

    if (result) {
      this.handleGameEnd(result);
    } else {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      this.updateDisplay();
      this.saveState();
    }
  }

  makeAIMove() {
    if (!this.gameActive) return;

    const bestMove = this.findBestMove();
    this.makeMove(bestMove);
  }

  findBestMove() {
    const aiPlayer = 'O';
    const humanPlayer = 'X';

    const winMove = this.findWinningMove(aiPlayer);
    if (winMove !== -1) return winMove;

    const blockMove = this.findWinningMove(humanPlayer);
    if (blockMove !== -1) return blockMove;

    if (this.board[4] === null) return 4;

    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(i => this.board[i] === null);
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    const availableMoves = this.board
      .map((cell, index) => cell === null ? index : null)
      .filter(val => val !== null);

    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }

  findWinningMove(player) {
    for (let combo of this.winningCombinations) {
      const [a, b, c] = combo;
      const values = [this.board[a], this.board[b], this.board[c]];
      const playerCount = values.filter(v => v === player).length;
      const emptyCount = values.filter(v => v === null).length;

      if (playerCount === 2 && emptyCount === 1) {
        if (this.board[a] === null) return a;
        if (this.board[b] === null) return b;
        if (this.board[c] === null) return c;
      }
    }
    return -1;
  }

  checkGameEnd() {
    for (let combo of this.winningCombinations) {
      const [a, b, c] = combo;
      if (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        return { winner: this.board[a], combo };
      }
    }

    if (this.board.every(cell => cell !== null)) {
      return { winner: 'draw' };
    }

    return null;
  }

  handleGameEnd(result) {
    this.gameActive = false;

    if (result.winner === 'draw') {
      this.scores.draw++;
      this.messageText.textContent = "It's a Draw!";
    } else {
      this.scores[result.winner]++;
      const winnerName = this.mode === 'ai' && result.winner === 'O' ? 'Computer' : `Player ${result.winner}`;
      this.messageText.textContent = `${winnerName} Wins!`;

      result.combo.forEach(index => {
        this.cells[index].classList.add('winning');
      });
    }

    this.updateScoreDisplay();
    this.saveState();

    setTimeout(() => {
      this.gameMessage.classList.remove('hidden');
    }, 500);
  }

  updateDisplay() {
    this.currentPlayerDisplay.textContent = this.currentPlayer;
  }

  updateScoreDisplay() {
    this.scoreXDisplay.textContent = this.scores.X;
    this.scoreODisplay.textContent = this.scores.O;
    this.scoreDrawDisplay.textContent = this.scores.draw;
  }

  playAgain() {
    this.gameMessage.classList.add('hidden');
    this.board = Array(9).fill(null);
    this.currentPlayer = 'X';
    this.gameActive = true;

    this.cells.forEach(cell => {
      cell.classList.remove('x', 'o', 'winning');
    });

    this.updateDisplay();
    this.saveState();

    if (this.mode === 'ai' && this.currentPlayer === 'O') {
      setTimeout(() => {
        this.makeAIMove();
      }, 500);
    }
  }

  resetGame() {
    this.board = Array(9).fill(null);
    this.currentPlayer = 'X';
    this.gameActive = true;
    this.scores = { X: 0, O: 0, draw: 0 };

    this.cells.forEach(cell => {
      cell.classList.remove('x', 'o', 'winning');
    });

    this.gameMessage.classList.add('hidden');
    this.updateDisplay();
    this.updateScoreDisplay();
    this.storage.clearState();
  }

  saveState() {
    const state = {
      board: this.board,
      currentPlayer: this.currentPlayer,
      gameActive: this.gameActive,
      mode: this.mode,
      scores: this.scores
    };
    this.storage.saveState(state);
  }

  restoreState(state) {
    this.board = state.board || Array(9).fill(null);
    this.currentPlayer = state.currentPlayer || 'X';
    this.gameActive = state.gameActive !== undefined ? state.gameActive : true;
    this.scores = state.scores || { X: 0, O: 0, draw: 0 };

    this.cells.forEach((cell, index) => {
      cell.classList.remove('x', 'o', 'winning');
      if (this.board[index]) {
        cell.classList.add(this.board[index].toLowerCase());
      }
    });

    this.updateDisplay();
    this.updateScoreDisplay();
    this.attachEventListeners();

    if (!this.gameActive) {
      const result = this.checkGameEnd();
      if (result && result.combo) {
        result.combo.forEach(index => {
          this.cells[index].classList.add('winning');
        });
      }
    }
  }
}
