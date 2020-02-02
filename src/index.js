var ttt = {
  board: [], //array to hold the current game
  reset: function() {
    // reset the game
    // Reset the board and get HTML container
    ttt.board = [];
    var container = document.getElementById("ttt-game");
    var paragraph = document.getElementById("paragraph");
    container.innerHTML = "";
    paragraph.style.display = "none";
    // Redraw the squares
    for (let i = 0; i < 9; i++) {
      ttt.board.push(null); //doubt
      var square = document.createElement("div");
      square.innerHTML = "&nbsp;";
      square.dataset.idx = i;
      square.id = "ttt-" + i;
      square.addEventListener("click", ttt.play);
      container.appendChild(square);
    }
  },
  play: function() {
    // ttt.play(): when the player selects a square
    // Player's move - Mark with "0"
    var move = this.dataset.idx;
    ttt.board[move] = 0;
    this.innerHTML = "O";
    this.classList.add("player");
    this.removeEventListener("click", ttt.play);

    // No more moves available - no winner
    if (ttt.board.indexOf(null) === -1) {
      alert("No Winner");
      ttt.reset();
    }

    // Computer's move - Mark with "X"
    // Using dumb AI(optional)
    else {
      move = ttt.dumbAI();
      ttt.board[move] = 1;
      var square = document.getElementById("ttt-" + move);
      square.innerHTML = "X";
      square.classList.add("computer");
      square.removeEventListener("click", ttt.play);
    }

    // Who won?
    var win = null;
    // Horizontal row checks
    for (let i = 0; i < 9; i += 3) {
      if (
        ttt.board[i] != null &&
        ttt.board[i + 1] != null &&
        ttt.board[i + 2] != null
      ) {
        if (
          ttt.board[i] === ttt.board[i + 1] &&
          ttt.board[i + 1] === ttt.board[i + 2]
        ) {
          win = ttt.board[i];
        }
      }
      //if we get a win value
      if (win !== null) {
        break;
      }
    }
    // Vertical row checks
    if (win === null) {
      for (let i = 0; i < 3; i++) {
        if (
          ttt.board[i] != null &&
          ttt.board[i + 3] != null &&
          ttt.board[i + 6] != null
        ) {
          if (
            ttt.board[i] === ttt.board[i + 3] &&
            ttt.board[i + 3] === ttt.board[i + 6]
          ) {
            win = ttt.board[i];
          }
          if (win !== null) {
            break;
          }
        }
      }
    }
    // Diagonal row check
    if (win === null) {
      if (
        ttt.board[0] != null &&
        ttt.board[4] != null &&
        ttt.board[8] != null
      ) {
        if (ttt.board[0] === ttt.board[4] && ttt.board[4] === ttt.board[8]) {
          win = ttt.board[4];
        }
      }
    }
    if (win === null) {
      if (
        ttt.board[2] != null &&
        ttt.board[4] != null &&
        ttt.board[6] != null
      ) {
        if (ttt.board[2] === ttt.board[4] && ttt.board[4] === ttt.board[6]) {
          win = ttt.board[2];
        }
      }
    }

    // We have a winner
    if (win !== null) {
      alert("Winner - " + (win === 0 ? "Player" : "Computer"));
      ttt.reset();
    }
  },

  dumbAI: function() {
    // randomly chooses an empty slot

    // Extract out all open slots
    var open = [];
    for (let i = 0; i < 9; i++) {
      if (ttt.board[i] === null) {
        open.push(i);
      }
    }

    // Randomly chooses an open slot
    var random = Math.floor(Math.random() * (open.length - 1));
    return open[random];
  }
};

window.addEventListener("click", ttt.reset, { once: true });
//window load wasnt working in code sandbox
