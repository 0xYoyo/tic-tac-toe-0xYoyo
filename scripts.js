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
  const confirmMarking = (index) => {
    if (gameBoard.myBoard[index] === "") {
      if (currentMarker === player1.marker) {
        player1.mark(index);
        currentMarker = player2.marker;
      } else {
        player2.mark(index);
        currentMarker = player1.marker;
      }
    }
  };
  return { currentMarker, confirmMarking };
})();

const displayController = (() => {
  const cells = document.querySelectorAll("li");
  const renderBoard = () => {
    cells.forEach((li) => {
      const placement = li.getAttribute("data-");
      li.textContent = gameBoard.myBoard[placement];
    });
  };
  cells.forEach((li) => {
    li.addEventListener("click", function () {
      const placement = li.getAttribute("data-");
      gameFlow.confirmMarking(placement);
      renderBoard();
    });
  });
})();
