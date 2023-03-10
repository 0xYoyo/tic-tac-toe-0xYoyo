const gameBoard = (() => {
  const myBoard = [];
  const len = 9;
  const initBoard = () => {
    for (let arrI = 0; arrI < len; arrI++) {
      myBoard[arrI] = "";
    }
  };
  return { myBoard, initBoard };
})();

const playerMaker = (name, marker) => {
  const score = 0;
  const mark = (i) => {
    gameBoard.myBoard[i] = marker;
    console.log(gameBoard.myBoard[i]);
  };
  return { name, marker, mark, score };
};

const gameFlow = (() => {
  gameBoard.initBoard();
  const player1 = playerMaker("Player 1", "X");
  const player2 = playerMaker("Player 2", "O");
  let currentMarker = player1.marker;
  console.log(currentMarker);

  const checkForWin = (currentPlayer) => {
    const board = gameBoard.myBoard;
    if (
      // rows
      (board[0] !== "" && board[0] === board[1] && board[0] === board[2]) ||
      (board[3] !== "" && board[3] === board[4] && board[3] === board[5]) ||
      (board[6] !== "" && board[6] === board[7] && board[6] === board[8]) ||
      // columns
      (board[0] !== "" && board[0] === board[3] && board[0] === board[6]) ||
      (board[1] !== "" && board[1] === board[4] && board[1] === board[7]) ||
      (board[2] !== "" && board[2] === board[5] && board[2] === board[8]) ||
      // diagonals
      (board[0] !== "" && board[0] === board[4] && board[0] === board[8]) ||
      (board[2] !== "" && board[2] === board[4] && board[2] === board[6])
    ) {
      currentPlayer.name += " has won this round!";
      currentPlayer.score++;
      displayController.freeze();
    } else if (!board.includes("")) {
      player1.name += ` has tied with Player 2!`;
      player2.name += ` has tied with Player 1!`;
    }
  };

  const confirmMarking = (index) => {
    if (gameBoard.myBoard[index] === "") {
      if (currentMarker === player1.marker) {
        player1.mark(index);
        checkForWin(player1);
        currentMarker = player2.marker;
      } else {
        player2.mark(index);
        checkForWin(player2);
        currentMarker = player1.marker;
      }
    }
  };

  const newRound = () => {
    player1.name = "Player 1";
    player2.name = "Player 2";
    gameBoard.myBoard.forEach((element, index) => {
      gameBoard.myBoard[index] = "";
    });
  };

  const newGame = () => {
    player1.name = "Player 1";
    player2.name = "Player 2";
    player1.score = 0;
    player2.score = 0;
    gameBoard.myBoard.forEach((element, index) => {
      gameBoard.myBoard[index] = "";
    });
  };
  return { currentMarker, confirmMarking, player1, player2, newRound, newGame };
})();

const displayController = (() => {
  const cells = document.querySelectorAll("li");
  const roundBtn = document.querySelector("#round");
  const gameBtn = document.querySelector("#game");
  const scoreL = document.querySelector("#scoreL");
  const scoreR = document.querySelector("#scoreR");
  const nameL = document.querySelector("#nameL");
  const nameR = document.querySelector("#nameR");
  const renderBoard = () => {
    cells.forEach((li) => {
      const placement = li.getAttribute("data-");
      li.textContent = gameBoard.myBoard[placement];
      scoreL.textContent = gameFlow.player1.score;
      scoreR.textContent = gameFlow.player2.score;
      nameL.textContent = gameFlow.player1.name;
      nameR.textContent = gameFlow.player2.name;
    });
  };
  const freeze = () => {
    cells.forEach((li) => {
      li.classList.add("freeze");
    });
  };
  const unfreeze = () => {
    cells.forEach((li) => {
      if (li.classList.contains("freeze")) {
        li.classList.remove("freeze");
      }
    });
  };
  // event listeners
  cells.forEach((li) => {
    li.addEventListener("click", function () {
      const placement = li.getAttribute("data-");
      gameFlow.confirmMarking(placement);
      renderBoard();
    });
  });
  roundBtn.addEventListener("click", function () {
    gameFlow.newRound();
    renderBoard();
    unfreeze();
  });
  gameBtn.addEventListener("click", function () {
    gameFlow.newGame();
    renderBoard();
    unfreeze();
  });
  return { freeze };
})();
