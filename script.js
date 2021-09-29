"use strict";
// Select elements
const playerOneElem = document.querySelector(".player--0");
const playerTwoElem = document.querySelector(".player--1");
const scoreOneElem = document.getElementById("score--0");
const scoreTwoElem = document.getElementById("score--1");
const currentScoreOneElem = document.getElementById("current--0");
const currentScoreTwoElem = document.getElementById("current--1");
const diceElem = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const winningScore = 100;
let currentScore = 0;
let currentPlayer = 1;
const totalScores = {
  player1: 0,
  player2: 0,
};

scoreOneElem.textContent = totalScores.player1;
scoreTwoElem.textContent = totalScores.player2;
diceElem.classList.add("hidden");

btnNew.addEventListener("click", () => {
  btnRoll.disabled = false;
  btnHold.disabled = false;
  btnNew.disabled = true;
  currentScore = 0;
  totalScores.player1 = 0;
  totalScores.player2 = 0;
  currentPlayer = 1;
  scoreOneElem.textContent = 0;
  scoreTwoElem.textContent = 0;
  currentScoreOneElem.textContent = 0;
  currentScoreTwoElem.textContent = 0;
  playerOneElem.classList.remove("player--winner");
  playerTwoElem.classList.remove("player--winner");
  playerOneElem.classList.add("player--active");
});

btnHold.addEventListener("click", () => {
  // add the current players current score to his total score
  if (currentPlayer === 1) {
    totalScores.player1 += currentScore;
    scoreOneElem.textContent = totalScores.player1;
  } else {
    totalScores.player2 += currentScore;
    scoreTwoElem.textContent = totalScores.player2;
  }

  if (
    totalScores.player1 >= winningScore ||
    totalScores.player2 >= winningScore
  ) {
    setTimeout(() => endGame(currentPlayer), 0);
  } else {
    changeCurrentPlayer();
  }
});

btnRoll.addEventListener("click", () => {
  // 1. Generate a random dice roll
  const diceValue = rollDice();

  // 2. Display dice
  const diceUrl = `dice-${diceValue}.png`;
  diceElem.setAttribute("src", diceUrl);
  diceElem.classList.remove("hidden");

  // 3. Check if rolled value is 1 and switch to next player if so
  if (diceValue !== 1) {
    // Add dice value to current score
    currentScore += diceValue;
    if (currentPlayer === 1) {
      currentScoreOneElem.textContent = currentScore;
    } else {
      currentScoreTwoElem.textContent = currentScore;
    }
  } else {
    // switch to the next player
    changeCurrentPlayer();
  }
});

function rollDice() {
  return Math.ceil(Math.random() * 6);
}

function changeCurrentPlayer() {
  if (currentPlayer === 1) {
    currentPlayer = 2;
    currentScoreOneElem.textContent = 0;
  } else {
    currentPlayer = 1;
    currentScoreTwoElem.textContent = 0;
  }
  currentScore = 0;
  playerOneElem.classList.toggle("player--active");
  playerTwoElem.classList.toggle("player--active");
}

function endGame(player) {
  btnHold.disabled = true;
  btnRoll.disabled = true;
  btnNew.disabled = false;
  diceElem.classList.add("hidden");
  if (player === 1) {
    playerOneElem.classList.add("player--winner");
    playerOneElem.classList.remove("player--active");
  } else {
    playerTwoElem.classList.add("player--winner");
    playerTwoElem.classList.remove("player--active");
  }
}
