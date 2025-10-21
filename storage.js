class GameStorage {
  constructor() {
    this.storageKey = 'ticTacToeGameState';
  }

  saveState(state) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  }

  loadState() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Error loading game state:', error);
      return null;
    }
  }

  clearState() {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.error('Error clearing game state:', error);
    }
  }
}
