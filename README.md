# 🎮 Tic-Tac-Toe Game

A modern, browser-based **Tic-Tac-Toe** game built with **HTML**, **CSS**, and **JavaScript**.  
You can play **Player vs Player** or challenge the **AI opponent** that learns and blocks your moves intelligently.  
All scores are saved automatically using your browser’s **localStorage**.

---

## 📸 Screenshot
<img width="602" height="524" alt="Screenshot 2026-01-24 164945" src="https://github.com/user-attachments/assets/5791923f-e38d-40b5-a526-8cb4ec1d5372" />

---

## 🧱 Project Structure

```
📁 Tic-Tac-Toe/
├── index.html        # Main HTML structure
├── style.css         # Layout, animations, and design
├── main.js           # UI flow & game initialization
├── game.js           # Core game logic and AI strategy
├── storage.js        # Local storage and score tracking
└── README.md         # Documentation (this file)
```

---

## ✨ Features

- 👥 **Two Game Modes**
  - Player vs Player  
  - Player vs AI  

- 🧠 **Smart AI**
  - Uses logic to win, block, and take the best position  

- 💾 **Persistent Score Tracking**
  - Scores are stored locally using `localStorage`

- 📱 **Responsive Design**
  - Works on desktop and mobile browsers

- 🎨 **Animated & Minimal UI**
  - Smooth transitions and a modern color palette

- 🔄 **Restart Anytime**
  - Restart or reset your scores easily

---

## 🚀 How to Run Locally

### Option 1: Open Directly
Just double-click **`index.html`** to launch the game in your browser.

### Option 2: Run on Localhost
You can also use a simple local server:
```bash
# Python 3
python -m http.server
```
Then open [http://localhost:8000](http://localhost:8000)

---

## 🧩 Game Logic Overview

The game board is a **3×3 grid**.  
Each move checks for:
- **Win condition**
- **Draw condition**
- **Next player’s turn**

The AI follows a **priority-based decision tree**:
1. Try to **win**  
2. **Block** opponent’s win  
3. Take **center**  
4. Take **corner**  
5. Pick **random cell**

Scores and turns are handled automatically by `game.js` and saved with `storage.js`.

---

## 🕹️ How to Play

1. Select **Player vs Player** or **Player vs AI** mode.  
2. The first player starts with **X**.  
3. Click on an empty square to place your mark.  
4. The first player to align **three symbols in a row, column, or diagonal** wins.  
5. Click **Restart** to play again.  

---

## 🧰 Built With

| Category | Technology |
|-----------|-------------|
| Frontend  | HTML5, CSS3 |
| Scripting | JavaScript (ES6) |
| Storage   | Browser `localStorage` |
| Editor    | VS Code |

---

## 💡 Future Improvements

- 🧩 Add **difficulty levels** (Easy, Normal, Hard)  
- 🎵 Add **sound effects** for moves/wins  
- 🌙 Add **Dark Mode / Theme Switcher**  
- 📲 Convert into a **Progressive Web App (PWA)**  

---

## 👨‍💻 Author

**By:** (sunshine_wrlld)  
💬 _“A creative front-end student developer exploring interactive web apps.”_

---

## 📜 License

This project is open for educational and personal use.  
Feel free to fork, modify, and improve — with proper credit.

---

### ⭐ Don’t forget to star this repo if you like it!
