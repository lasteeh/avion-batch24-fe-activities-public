const mainMenu = document.querySelector("#game-menu");
const startGameButton = document.querySelector("#startGame");
const charSelect = document.querySelector("#character-select");
const charSelectMessage = document.querySelector("#character-select .message");
const characters = charSelect.querySelector("#characters");
const genderSpans = characters.querySelectorAll(".gender");
const selectPokemonButton = charSelect.querySelector("#select-pokemon");
const playGameButton = document.querySelector("#playGame:enabled");
const errorScreen = document.querySelector("#error");
const mainGame = document.querySelector("#game");
const cells = document.querySelectorAll(".cell");
const gameControls = mainGame.querySelector("#controls");
const gameMessage = mainGame.querySelector(".message");
const restartGameButton = document.querySelector("#restartGame");
const previousButton = document.querySelector("#previous-btn");
const nextButton = document.querySelector("#next-btn");
const changePokemon = mainGame.querySelector("#changePokemon");

// hide function
function hide(object) {
  object.style.opacity = "0";
  object.style.visibility = "hidden";
}
// show function
function show(object) {
  object.style.opacity = "1";
  object.style.visibility = "visible";
}
// disable button
function disable(object) {
  object.disabled = true;
  object.style.filter = "grayscale(100%)";
}
// enable button
function enable(object) {
  object.disabled = false;
  object.style.filter = "grayscale(0%)";
}
// error message
function error(object) {
  errorScreen.showModal();
  errorScreen.querySelector("p").textContent = object;
}
errorScreen.querySelector("button").addEventListener("click", () => {
  errorScreen.close();
});
// game message
function showGameMessage(object) {
  gameMessage.querySelector("p").textContent = object;
}

// MAIN: setup game
let currentPlayer;
let p1;
let p2;
let running;
let boardHistory;
let counter;

show(mainMenu);

genderSpans.forEach(genderizer);

startGameButton.addEventListener("click", () => {
  setupGame();
  setTimeout(() => {
    startGameButton.classList.add("blink");
    hide(mainMenu.querySelector(".background"));
  }, 0);

  setTimeout(() => {
    hide(mainMenu);
    showPlayerSelect();
    show(charSelect);
  }, 1500);

  disable(playGameButton);

  setTimeout(() => {
    startGameButton.classList.remove("blink");
  }, 2000);
});

function setupGame() {
  characters.classList.remove("p2");
  characters.classList.add("p1");

  show(selectPokemonButton);
  hide(document.querySelector("#game"));

  characters
    .querySelectorAll(".character")
    .forEach((character) => character.classList.remove("p1", "p2"));

  p1 = { name: "Player 1", class: "p1", value: 1, pokemon: "" };
  p2 = { name: "Player 2", class: "p2", value: -1, pokemon: "" };
  running = false;
  currentPlayer = p1;

  characters.addEventListener("click", selectPokemon);
}

function showPlayerSelect(playerName = currentPlayer.name) {
  charSelectMessage.textContent = playerName + " - Choose a Pokémon";
}

// SUB: choose character
let otherClass;
let otherPlayer;

function selectPokemon(e) {
  let pokemon = e.target.closest(".character");

  let children = characters.querySelectorAll(".character");

  switch (currentPlayer.class) {
    case "p1":
      otherClass = "p2";
      validateSelection();

      break;
    case "p2":
      otherClass = "p1";
      validateSelection();
      break;
  }

  function validateSelection() {
    let pattern = /^[A-Za-z]+$/;
    if (pokemon.classList.contains(otherClass)) {
      return;
    }
    if (pokemon.classList.contains(currentPlayer.class)) {
      pokemon.classList.remove(currentPlayer.class);
      currentPlayer["pokemon"] = "";
    } else {
      children.forEach((child) => child.classList.remove(currentPlayer.class));

      pokemon.classList.add(currentPlayer.class);
      currentPlayer["pokemon"] = pokemon.querySelector("h4").innerText;
      currentPlayer["mark"] = pokemon.querySelector(".pokeball");
    }
  }
}

selectPokemonButton.addEventListener("click", lockIn);

function lockIn() {
  // SUB: switches player select
  switch (currentPlayer.class) {
    case "p1":
      otherPlayer = p2.name;

      if (!currentPlayer.pokemon) {
        error("Select a Pokemon");
      } else {
        showPlayerSelect(otherPlayer);

        currentPlayer = p2;

        characters.classList.remove("p1");
        characters.classList.add("p2");
      }

      break;
    case "p2":
      otherPlayer = p1.name;

      if (!currentPlayer.pokemon) {
        error("Select a Pokemon");
      } else {
        currentPlayer = p1;

        charSelectMessage.textContent = "Let's Play!";
        disable(selectPokemonButton);
        characters.removeEventListener("click", selectPokemon);
        enable(playGameButton);

        playGameButton.addEventListener("click", initialize);
      }

      break;
  }
}

// MAIN:  initialize game
let boardData = [];

function initialize() {
  playGameButton.removeEventListener("click", initialize);

  currentPlayer = p1;
  running = true;
  boardData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  boardHistory = [
    [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
  ];

  showGameMessage(currentPlayer.name + "'s turn");

  hide(charSelect);
  show(mainGame);
  hide(gameControls);
  placePokeball();
}

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    // update cell
    updateCell(index);
  });
});

function updateCell(index) {
  // check row and column from index
  let col = index % 3;
  let row = (index - col) / 3;

  // check if clicked cell is empty
  if (boardData[row][col] === 0 && running === true) {
    boardData[row][col] = currentPlayer.value;
    // save board state in history
    let currentBoardState = structuredClone(boardData);
    saveHistory(currentBoardState);
    // change player
    switch (currentPlayer.class) {
      case "p1":
        currentPlayer = p2;
        addMarktoMessage();
        showGameMessage(currentPlayer.name + "'s turn");
        break;
      case "p2":
        currentPlayer = p1;
        addMarktoMessage();
        showGameMessage(currentPlayer.name + "'s turn");
        break;
    }
    // place pokeball
    placePokeball();
    // check winner
    checkResult();
  }
}

function placePokeball() {
  removeMarktoMessage();
  addMarktoMessage();
  // iterate over rows
  for (let row = 0; row < 3; row++) {
    // iterate over columns
    for (let col = 0; col < 3; col++) {
      // check for empty cells
      if (boardData[row][col] === 0) {
        cells[row * 3 + col].innerHTML = "";
      }
      // check if player 1's pokeball
      if (boardData[row][col] === 1) {
        // check if marked
        if (!cells[row * 3 + col].hasChildNodes()) {
          // update cell with player 1's pokeball
          cells[row * 3 + col].append(p1["mark"].cloneNode(true));
        }
      }
      if (boardData[row][col] === -1) {
        if (!cells[row * 3 + col].hasChildNodes()) {
          // update cell with player 2's pokeball
          cells[row * 3 + col].append(p2["mark"].cloneNode(true));
        }
      }
    }
  }
}

function checkResult() {
  // check rows and columns
  for (let i = 0; i < 3; i++) {
    let rowSum = boardData[i][0] + boardData[i][1] + boardData[i][2];
    let colSum = boardData[0][i] + boardData[1][i] + boardData[2][i];

    if (rowSum === 3 || colSum === 3) {
      // player 1 wins
      endGame(p1.name);
      stopAnim();
      return;
    }
    if (rowSum === -3 || colSum === -3) {
      // player 2 wins
      endGame(p2.name);
      stopAnim();
      return;
    }
  }
  // check diagonals
  let diagonalSum1 = boardData[0][0] + boardData[1][1] + boardData[2][2];
  let diagonalSum2 = boardData[0][2] + boardData[1][1] + boardData[2][0];
  if (diagonalSum1 === 3 || diagonalSum2 === 3) {
    // player 1 wins
    endGame(p1.name);
    stopAnim();
    return;
  }
  if (diagonalSum1 === -3 || diagonalSum2 === -3) {
    // player 2 wins
    endGame(p2.name);
    stopAnim();
    return;
  }
  // check for draw
  if (
    boardData[0].indexOf(0) == -1 &&
    boardData[1].indexOf(0) == -1 &&
    boardData[2].indexOf(0) == -1
  ) {
    endGame(0);
    return;
  }
}

function endGame(winner) {
  // trigger game over
  running = false;
  // check if game ended in a draw
  if (winner === 0) {
    showGameMessage("Draw");
  } else {
    showGameMessage(`${winner} wins`);
  }
  show(gameControls);
}

// restart game
restartGameButton.addEventListener("click", () => {
  initialize();
  placePokeball();
});

// store board state in history
function saveHistory(currentBoardState) {
  counter = structuredClone(boardHistory.length);
  boardHistory.push(currentBoardState);
  return counter;
}

// see history

previousButton.addEventListener("click", () => {
  if (counter === 0) {
    return;
  } else {
    counter--;
    updateBoard(counter);
    return counter;
  }
});
nextButton.addEventListener("click", () => {
  if (counter >= boardHistory.length - 1) {
    return;
  } else {
    counter++;
    updateBoard(counter);
    return counter;
  }
});

// update board
function updateBoard(index) {
  boardData = boardHistory[index];
  placePokeball();
  stopAnim();
}

// change pokemon
changePokemon.addEventListener("click", switchPokemon);
function switchPokemon() {
  setupGame();
  hide(mainMenu);
  hide(mainGame);
  hide(gameControls);
  showPlayerSelect();
  show(charSelect);
  enable(selectPokemonButton);
  disable(playGameButton);
  playGameButton.removeEventListener("click", initialize);
}

// gender randomizer
function genderizer(object) {
  let gender;
  let switcheroo = Math.floor(Math.random() * (10 - 1) + 1);
  if (switcheroo % 2 === 0) {
    gender = "♂";
    object.style.color = "blue";
  } else {
    gender = "♁";
    object.style.color = "red";
  }
  object.textContent = gender;
}

// mouse hover on cell

// TODO: hover cell mark appears

function addMarktoMessage() {
  let markClone = currentPlayer["mark"].cloneNode(true);
  gameMessage.append(markClone);
}
function removeMarktoMessage() {
  let markClone = gameMessage.querySelectorAll(".pokeball");
  markClone.forEach((clone) => clone.remove());
}

// stop animation on loser
function stopAnim() {
  for (let row = 0; row < 3; row++) {
    // iterate over columns
    for (let col = 0; col < 3; col++) {
      // check for loser cells
      if (boardData[row][col] === currentPlayer.value) {
        // update cell with other players pokemon Anim
        let loserPokemon = cells[row * 3 + col].querySelector(".pokemon");
        loserPokemon.style.animationName = "none";
      }
    }
  }
}
