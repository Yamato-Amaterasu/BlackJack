////////// THE RULES SO FAR \\\\\\\\\\
// 1. the goal is to have a higher total than the other players but not over 21
// 2. if higher than 21 then you "bust" and lose
// 3. the game starts with the players placing bets
// 4. then the dealer deals one card facing up to each player then to themselves(the dealer)
// 5. everyone is delt one more more card facing up besides the dealer
// 5.5 so the dealer has 1 card facing up and the 2nd one not showing while the other players have 2 cards facing up
// 6. cards 2 through 10 have the value of their number ( so 2 is 2 points etc)
// 7. J Q K are worth 10 points. the ace can be either 1 or 11 points you can change it in the middle of the round
// 8. if your first 2 cards are worth 21, then you win 1.5 times your bet from the dealer and you are done for the rest of the game
// 9. theres no limit on how many cards you can have.  you can say "hit " to get another card or say "stay " to not get a card
// 10. once the dealer has gone over all the player and circle back to said dealer, the dealer shows their 2nd card thats not flipped
// 11. if the dealers total is 16 or under they must take another card. if its 17 or higher they must stay with their cards
// 12. if the dealer busts all players win  twice their bet. if the dealer doesnt bust, only the player that is higher than the dealer wins twice their bet. all other players lose their bet.
// 13. thats the end of one round so another rounds starts and we start over from step 3

let gameState = {
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
    playerOne: {
      username: "Player One",
      deck: [],
      score: 0,
      currentbet: 0,
      credits: 1500,
    },
  },

  turnCount: 1,
};

const resetState = () => {
  gameState.players.dealer.deck = [];
  gameState.players.dealer.score = 0;
  gameState.players.playerOne.deck = [];
  gameState.players.playerOne.score = 0;
  gameState.players.playerOne.currentbet = 0;
  gameState.turnCount = 1;
};

// ***************** Query Selectors ***************** \\
const table = document.querySelector(".playingTable");
const drawButton = document.querySelector(".drawButton");
const skipButton = document.querySelector(".skipButton");
const playerTurn = document.querySelector(".playerTurn");
const dealerDeck = document.querySelector("#dealer");
const playerOneDeck = document.querySelector("#playerOne");
const playerOneCredits = document.querySelector("#playerOneCredits");

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

const dealerAi = () => {
  if (gameState.turnCount === 1) {
    if (gameState.players.dealer.score < 17) {
      pickRandomCard();
      turnCounter();
      gameLogic();
    }
  }
};

const luckyDraw = () => {
  if (gameState.players.dealer.score === 21) {
    drawButton.style.visibility = "hidden";
    skipButton.style.visibility = "hidden";
    playerTurn.innerHTML = `<button class="restartButton"> Restart Game!</button>
    <p> Oh No! The Dealer Got BlackJack. </p> `;
    const restartButton = document.querySelector(".restartButton");
    const card = document.querySelectorAll(".card");
    restartButton.addEventListener("click", () => {
      card.forEach((element) => {
        element.remove();
      });
      resetState();
      render();
    });
  }

  if (gameState.players.playerOne.score === 21) {
    drawButton.style.visibility = "hidden";
    skipButton.style.visibility = "hidden";
    playerTurn.innerHTML = `<button class="restartButton"> Restart Game!</button>
  <p> congratulations! You Got BlackJack!</p> `;

    gameState.players.playerOne.credits =
      gameState.players.playerOne.credits +
      gameState.players.playerOne.currentbet * 1.5;

    const restartButton = document.querySelector(".restartButton");
    const card = document.querySelectorAll(".card");
    restartButton.addEventListener("click", () => {
      card.forEach((element) => {
        element.remove();
      });
      resetState();
      render();
    });
  }
};

const dealerAiForStand = () => {
  if (gameState.players.dealer.score < 17) {
    turnCounter();
    pickRandomCard();
    turnCounter();
    gameLogic();
  }
};

const gameLogic = () => {
  if (gameState.players.playerOne.score > 21) {
    drawButton.style.visibility = "hidden";
    skipButton.style.visibility = "hidden";
    playerTurn.innerHTML = `<button class="restartButton"> Restart Game!</button>
    <p> Oh No! You've Busted Out. </p> `;
    const restartButton = document.querySelector(".restartButton");
    const card = document.querySelectorAll(".card");
    restartButton.addEventListener("click", () => {
      card.forEach((element) => {
        element.remove();
      });
      resetState();
      render();
    });
  }

  if (gameState.players.dealer.score > 21) {
    drawButton.style.visibility = "hidden";
    skipButton.style.visibility = "hidden";
    playerTurn.innerHTML = `<button class="restartButton"> Restart Game!</button>
  <p> congratulations! The Dealer Busted Out!</p> `;

    gameState.players.playerOne.credits =
      gameState.players.playerOne.credits +
      gameState.players.playerOne.currentbet * 2;

    const restartButton = document.querySelector(".restartButton");
    const card = document.querySelectorAll(".card");
    restartButton.addEventListener("click", () => {
      card.forEach((element) => {
        element.remove();
      });
      resetState();
      render();
    });
  }

  if (gameState.players.dealer.deck.length === 5) {
    drawButton.style.visibility = "hidden";
    skipButton.style.visibility = "hidden";
    playerTurn.innerHTML = `<button class="restartButton"> Restart Game!</button>
  <p> Oh No! The Dealer Won. </p> `;

    const restartButton = document.querySelector(".restartButton");
    const card = document.querySelectorAll(".card");
    restartButton.addEventListener("click", () => {
      card.forEach((element) => {
        element.remove();
      });
      resetState();
      render();
    });
  }
  if (gameState.players.playerOne.deck.length === 5) {
    drawButton.style.visibility = "hidden";
    skipButton.style.visibility = "hidden";
    playerTurn.innerHTML = `<button class="restartButton"> Restart Game!</button>
  <p> congratulations! You Won! </p> `;

    gameState.players.playerOne.credits =
      gameState.players.playerOne.credits +
      gameState.players.playerOne.currentbet * 2;

    const restartButton = document.querySelector(".restartButton");
    const card = document.querySelectorAll(".card");
    restartButton.addEventListener("click", () => {
      card.forEach((element) => {
        element.remove();
      });
      resetState();
      render();
    });
  }
};

const stand = () => {
  dealerAiForStand();

  if (gameState.players.dealer.score > gameState.players.playerOne.score) {
    drawButton.style.visibility = "hidden";
    skipButton.style.visibility = "hidden";
    playerTurn.innerHTML = `<button class="restartButton"> Restart Game!</button>
    <p> Oh No! The Dealer Won. </p> `;
    const restartButton = document.querySelector(".restartButton");
    const card = document.querySelectorAll(".card");
    restartButton.addEventListener("click", () => {
      card.forEach((element) => {
        element.remove();
      });
      resetState();
      render();
    });
  }

  if (gameState.players.dealer.score < gameState.players.playerOne.score) {
    drawButton.style.visibility = "hidden";
    skipButton.style.visibility = "hidden";
    playerTurn.innerHTML = `<button class="restartButton"> Restart Game!</button>
  <p> congratulations! You Won!</p> `;

    gameState.players.playerOne.credits =
      gameState.players.playerOne.credits +
      gameState.players.playerOne.currentbet * 2;

    const restartButton = document.querySelector(".restartButton");
    const card = document.querySelectorAll(".card");
    restartButton.addEventListener("click", () => {
      card.forEach((element) => {
        element.remove();
      });
      resetState();
      render();
    });
  }

  if (gameState.players.dealer.score === gameState.players.playerOne.score) {
    drawButton.style.visibility = "hidden";
    skipButton.style.visibility = "hidden";
    playerTurn.innerHTML = `<button class="restartButton"> Restart Game!</button>
    <p> Well That's Boring. You Tied. </p> `;
    const restartButton = document.querySelector(".restartButton");
    const card = document.querySelectorAll(".card");
    restartButton.addEventListener("click", () => {
      card.forEach((element) => {
        element.remove();
      });
      resetState();
      render();
    });
  }
};

const render = () => {
  renderScoreAndCredits();
  drawButton.style.visibility = "hidden";
  skipButton.style.visibility = "hidden";

  playerTurn.innerHTML = `
    
    <input id="player1Bet" name="player1Bet" placeholder="Enter Bet Here">
    <input id="player1Name" name="player1Name" placeholder="Enter Username Here">
    <span class='popuptext' id='myPopup'> You do not have enough credits </span>
    <button class="startButton"> Start Game!</button>
    `;
};

const renderScoreAndCredits = () => {
  playerOneCredits.innerHTML = `
  <p> Credits Availible: ${gameState.players.playerOne.credits} </p>
  <p> Current Bet: ${gameState.players.playerOne.currentbet} </p>
  <p>Current Score: ${gameState.players.playerOne.score} </p>`;
};

function currentPlayer() {
  if (gameState.turnCount === 1) {
    return gameState.players.dealer;
  } else if (gameState.turnCount === 2) {
    return gameState.players.playerOne;
  }
}
const turnCounter = () => {
  if (gameState.turnCount < Object.keys(gameState.players).length) {
    gameState.turnCount = gameState.turnCount + 1;
  } else gameState.turnCount = 1;

  console.log(gameState.turnCount);

  const playerName = currentPlayer().username;

  if (gameState.turnCount === 2) {
    playerTurn.innerHTML = `
    <p class= "turnReminder"> It is currently ${playerName}'s turn!</p>`;
  }
};

const betPopup = () => {
  const popup = document.getElementById("myPopup");

  popup.classList.add("show");
};

const playerNames = () => {
  const player1NameInput = document.querySelector("input[name=player1Name]");

  if (player1NameInput.value != "") {
    gameState.players.playerOne.username = player1NameInput.value;
  }
};

const playerBet = () => {
  const player1BetInput = document.querySelector("input[name=player1Bet]");
  if (player1BetInput.value <= gameState.players.playerOne.credits) {
    if (player1BetInput.value === "") {
      player1BetInput.value = 0;
    }
    gameState.players.playerOne.currentbet = player1BetInput.value;
    gameState.players.playerOne.credits =
      gameState.players.playerOne.credits -
      gameState.players.playerOne.currentbet;
    return true;
  } else return false;
};

const cardPics = (randomCard) => {
  if (randomCard === "ace") {
    return `<img class="cardPNG" src="/PNG-cards-1.3/ace_of_spades.png">
        
      </img>`;
  }
  if (randomCard === "two") {
    return `<img class="cardPNG" src="/PNG-cards-1.3/ace_of_spades.png">
        
      </img>`;
  }
  if (randomCard === "ace") {
    return `<img class="cardPNG" src="/PNG-cards-1.3/2_of_clubs.png">
       
      </img>`;
  }
  if (randomCard === "three") {
    return `<img class="cardPNG" src="/PNG-cards-1.3/3_of_diamonds.png">
       
      </img>`;
  }
  if (randomCard === "four") {
    return `<img class="cardPNG" src="/PNG-cards-1.3/4_of_clubs.png">
        
      </img>`;
  }
  if (randomCard === "five") {
    return `<img class="cardPNG" src="/PNG-cards-1.3/5_of_clubs.png">
        
      </img>`;
  }
  if (randomCard === "six") {
    return `<img class="cardPNG" src="/PNG-cards-1.3/6_of_clubs.png">
        
      </img>`;
  }
  if (randomCard === "seven") {
    return `<img class="cardPNG" src="/PNG-cards-1.3/7_of_spades.png">
        
      </img>`;
  }
  if (randomCard === "eight") {
    return `<img class="cardPNG" src="/PNG-cards-1.3/8_of_diamonds.png">
        
      </img>`;
  }
  if (randomCard === "nine") {
    return `<img class="cardPNG" src="/PNG-cards-1.3/9_of_hearts.png">
        
      </img>`;
  }
  if (randomCard === "ten") {
    return `<img class="cardPNG" src="/PNG-cards-1.3/10_of_diamonds.png">
        
      </img>`;
  }
  if (randomCard === "jack") {
    return `<img class="cardPNG" src="/PNG-cards-1.3/jack_of_diamonds2.png">
        
      </img>`;
  }
  if (randomCard === "queen") {
    return `<img class="cardPNG" src="/PNG-cards-1.3/queen_of_hearts2.png">
        
      </img>`;
  }
  if (randomCard === "king") {
    return `<img class="cardPNG" src="/PNG-cards-1.3/king_of_diamonds2.png">
        
      </img>`;
  }
};

const pickRandomCard = () => {
  const cardElem = document.createElement("div");
  cardElem.classList.add("card");
  let randomCard = gameState.deck[Math.floor(Math.random() * 13)][1];
  cardElem.innerHTML = `${cardPics(randomCard)}`;

  if (gameState.turnCount === 1) {
    currentPlayer().deck.push(randomCard);
    dealerDeck.appendChild(cardElem);
  } else if (gameState.turnCount === 2) {
    currentPlayer().deck.push(randomCard);
    playerOneDeck.appendChild(cardElem);
  }
  cardValue(randomCard);
};

render();

drawButton.addEventListener("click", () => {
  pickRandomCard();
  turnCounter();
  renderScoreAndCredits();
  gameLogic();
  dealerAi();
});

skipButton.addEventListener("click", () => {
  // turnCounter();
  // renderScoreAndCredits();
  stand();
});

playerTurn.addEventListener("click", (event) => {
  if (event.target.className === "startButton") {
    if (playerBet() === false) {
      betPopup();
    } else {
      renderScoreAndCredits();
      playerNames();
      pickRandomCard();
      turnCounter();
      pickRandomCard();
      turnCounter();
      dealerAi();
      pickRandomCard();

      drawButton.style.visibility = "visible";
      skipButton.style.visibility = "visible";
    }
  }
});
