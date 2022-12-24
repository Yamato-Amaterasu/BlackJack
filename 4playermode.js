const gameState = {
  deck: [
    ["ace", "ace", "ace", "ace"],
    ["two", "two", "two", "two"],
    ["three", "three", "three", "three"],
    ["four", "four", "four", "four"],
    ["five", "five", "five", "five"],
    ["six", "six", "six", "six"],
    ["seven", "seven", "seven", "seven"],
    ["eight", "eight", "eight", "eight"],
    ["nine", "nine", "nine", "nine"],
    ["ten", "ten", "ten", "ten"],
    ["jack", "jack", "jack", "jack"],
    ["queen", "queen", "queen", "queen"],
    ["king", "king", "king", "king"],
  ],
  players: {
    dealer: {
      username: "The Dealer",
      deck: [],
      score: 0,
      credits: 1500,
    },
    playerTwo: {
      username: "Player Two",
      deck: [],
      score: 0,
      credits: 1500,
    },
    playerThree: {
      username: "Player Three",
      deck: [],
      score: 0,
      credits: 1500,
    },
    playerFour: {
      username: "Player Four",
      deck: [],
      score: 0,
      credits: 1500,
    },
  },

  turnCount: 1,
  roundCount: 0,
};

// ***************** Query Selectors ***************** \\
const table = document.querySelector(".playingTable");
const drawButton = document.querySelector(".drawButton");
const playerTurn = document.querySelector(".playerTurn");
const dealerDeck = document.querySelector("#dealer");
const playerTwoDeck = document.querySelector("#playerTwo");
const playerThreeDeck = document.querySelector("#playerThree");
const playerFourDeck = document.querySelector("#playerFour");

const cardValue = (card) => {
  const currentScore = currentPlayer();
  console.log(currentScore);

  if (card === "ace") {
    currentPlayer().score = currentPlayer().score + 11;
  } else if (card === "two") {
    currentPlayer().score = currentPlayer().score + 2;
  } else if (card === "three") {
    currentPlayer().score = currentPlayer().score + 3;
  } else if (card === "four") {
    currentPlayer().score = currentPlayer().score + 4;
  } else if (card === "five") {
    currentPlayer().score = currentPlayer().score + 5;
  } else if (card === "six") {
    currentPlayer().score = currentPlayer().score + 6;
  } else if (card === "seven") {
    currentPlayer().score = currentPlayer().score + 7;
  } else if (card === "eight") {
    currentPlayer().score = currentPlayer().score + 8;
  } else if (card === "nine") {
    currentPlayer().score = currentPlayer().score + 9;
  } else if (card === "ten" || "jack" || "queen" || "king") {
    currentPlayer().score = currentPlayer().score + 10;
  }
};

const render = () => {
  if (gameState.turnCount === 1) {
    drawButton.style.visibility = "hidden";

    playerTurn.innerHTML = `
      <input id="player1Name" name="player1Name" placeholder="Enter Player 1">
      <input id="player2Name" name="player2Name" placeholder="Enter Player 2">
      <input id="player3Name" name="player3Name" placeholder="Enter Player 3">
      <input id="player4Name" name="player4Name" placeholder="Enter Player 4">
      <button class="startButton"> Start Game!</button>`;
  }
};

function currentPlayer() {
  if (gameState.turnCount === 1) {
    return gameState.players.dealer;
  } else if (gameState.turnCount === 2) {
    return gameState.players.playerTwo;
  } else if (gameState.turnCount === 3) {
    return gameState.players.playerThree;
  } else gameState.turnCount === 4;
  return gameState.players.playerFour;
}
const turnCounter = () => {
  if (gameState.turnCount < Object.keys(gameState.players).length) {
    gameState.turnCount = gameState.turnCount + 1;
  } else gameState.turnCount = 1;

  console.log(gameState.turnCount);

  const playerName = currentPlayer().username;
  // console.log(playerName);

  if (gameState.turnCount > 0) {
    playerTurn.innerHTML = `
      <p class= "turnReminder"> It is currently ${playerName}'s turn!</p>`;
  }
};

const playerNames = () => {
  const player1NameInput = document.querySelector("input[name=player1Name]");
  const player2NameInput = document.querySelector("input[name=player2Name]");
  const player3NameInput = document.querySelector("input[name=player3Name]");
  const player4NameInput = document.querySelector("input[name=player4Name]");

  gameState.players.dealer.username = player1NameInput.value;
  gameState.players.playerTwo.username = player2NameInput.value;
  gameState.players.playerThree.username = player3NameInput.value;
  gameState.players.playerFour.username = player4NameInput.value;
};

const pickRandomCard = () => {
  const cardElem = document.createElement("div");
  let randomCard = gameState.deck[Math.floor(Math.random() * 13)][1];
  cardElem.innerHTML = `${randomCard}`;

  if (gameState.turnCount === 1) {
    currentPlayer().deck.push(randomCard);
    dealerDeck.appendChild(cardElem);
  } else if (gameState.turnCount === 2) {
    currentPlayer().deck.push(randomCard);
    playerTwoDeck.appendChild(cardElem);
  } else if (gameState.turnCount === 3) {
    currentPlayer().deck.push(randomCard);
    playerThreeDeck.appendChild(cardElem);
  } else if (gameState.turnCount === 4) {
    currentPlayer().deck.push(randomCard);
    playerFourDeck.appendChild(cardElem);
  }
  cardValue(randomCard);
};

render();

drawButton.addEventListener("click", () => {
  pickRandomCard();
  turnCounter();
});

playerTurn.addEventListener("click", (event) => {
  if (event.target.className === "startButton") {
    playerNames();
    pickRandomCard();
    turnCounter();
    drawButton.style.visibility = "visible";
  }
});
