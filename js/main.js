"use strict";

let currentScore = 0;
let activePlayer = 0;

const score0Element = document.getElementById("score--0");
const score1Element = document.getElementById("score--1");
const current0Element = document.getElementById("current--0");
const current1Element = document.getElementById("current--1");
const player0Element = document.getElementsByClassName("player--0")[0];
const player1Element = document.getElementsByClassName("player--1")[0];
const dice = document.getElementsByClassName("dice")[0];
const newGameButton = document.getElementsByClassName("btn--new")[0];
const rollButton = document.getElementsByClassName("btn--roll")[0];
const holdButton = document.getElementsByClassName("btn--hold")[0];
const scores = [0, 0];
const restart = function () {
    scores[0] = 0;
    scores[1] = 0;
    currentScore = 0;
    activePlayer = 0;
    score0Element.textContent = 0;
    score1Element.textContent = 0;
    current0Element.textContent = 0;
    current1Element.textContent = 0;
    if (!player0Element.classList.contains("player--active")) {
        player1Element.classList.remove("player--active");
        player0Element.classList.add("player--active");
    }
    if (player0Element.classList.contains("player--winner")) {
        player0Element.classList.remove("player--winner");
    } else if (player1Element.classList.contains("player--winner")) {
        player1Element.classList.remove("player--winner");
    }
    dice.classList.add("hidden");
    gameOver = false;
};
const rollDice = function () {
    const number = Math.floor(Math.random() * 6) + 1;
    dice.classList.contains("hidden") ? dice.classList.remove("hidden") : 0;
    // switch (number) {
    //     case 1:
    //         dice.setAttribute("src", "./img/dice-1.png");
    //         break;
    //     case 2:
    //         dice.setAttribute("src", "./img/dice-2.png");
    //         break;
    //     case 3:
    //         dice.setAttribute("src", "./img/dice-3.png");
    //         break;
    //     case 4:
    //         dice.setAttribute("src", "./img/dice-4.png");
    //         break;
    //     case 5:
    //         dice.setAttribute("src", "./img/dice-5.png");
    //         break;
    //     case 6:
    //         dice.setAttribute("src", "./img/dice-6.png");
    //         break;
    //     default:
    //         break;
    // }
    dice.src = `./img/dice-${number}.png`;
    return number;
};
const rollFunction = function () {
    if (!gameOver) {
        let number = rollDice();
        if (document.getElementsByClassName("player--active")[0].classList.contains("player--0")) {
            if (number !== 1) {
                currentScore += number;
                current0Element.textContent = currentScore;
            } else {
                currentScore = 0;
                current0Element.textContent = 0;
                player0Element.classList.remove("player--active");
                player1Element.classList.add("player--active");
                activePlayer = 1;
            }
        } else {
            if (number !== 1) {
                currentScore += number;
                current1Element.textContent = currentScore;
            } else {
                currentScore = 0;
                current1Element.textContent = 0;
                player1Element.classList.remove("player--active");
                player0Element.classList.add("player--active");
                activePlayer = 0;
            }
        }
    }
};
const holdFunction = function () {
    if (document.getElementsByClassName("player--active")[0].classList.contains("player--0")) {
        scores[0] += currentScore;
        score0Element.textContent = scores[0];
        current0Element.textContent = 0;
        if (Number(score0Element.textContent) < 100) {
            player0Element.classList.remove("player--active");
            player1Element.classList.add("player--active");
            activePlayer = 1;
        } else {
            player0Element.classList.add("player--winner");
            gameOver = true;
        }
    } else {
        scores[1] += currentScore;
        score1Element.textContent = scores[1];
        current1Element.textContent = 0;
        if (Number(score1Element.textContent) < 100) {
            player1Element.classList.remove("player--active");
            player0Element.classList.add("player--active");
            activePlayer = 0;
        } else {
            player1Element.classList.add("player--winner");
            gameOver = true;
        }
    }
    currentScore = 0;
};
let gameOver = false;
restart();

rollButton.addEventListener("click", rollFunction);
holdButton.addEventListener("click", holdFunction);
newGameButton.addEventListener("click", restart);
