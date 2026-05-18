// Loads score saved into local storage
let score = JSON.parse(localStorage.getItem("score")) || {
    wins: 0,
    losses: 0,
    ties: 0,
};

updateScoreElement();

// Function to autoplay game
let isAutoPlaying = false;
let intervalId;

function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
        const playerMove = pickComputerMove()
        playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;

    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
}

// Eventlisteners for buttons clicks
document.querySelector('.js-rock-button')
.addEventListener('click', () => {playGame('rock');});

document.querySelector('.js-paper-button')
.addEventListener('click', () => {playGame('paper');})

document.querySelector('.js-scissors-button')
.addEventListener('click', () => {playGame('scissors');})

document.querySelector('.js-reset-button')
.addEventListener('click', () => {score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        updateScoreElement();})

document.querySelector('.js-autoplay-button')
.addEventListener('click', () => {autoPlay();});

// EventListeners for keyboard inputs
document.body.addEventListener('keydown', (event) => { //Every keyboard clck is saved in event
    if (event.key === 'r') {
        playGame('rock')
    } else if (event.key === 'p') {
        playGame('paper')
    } else if (event.key === 's') {
        playGame('scissors')
    }
})

// Function for deciding outcome
function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = "";
    if (playerMove === "scissors") {
        if (computerMove === "rock") {
        result = "You lose";
        } else if (computerMove === "paper") {
        result = "You win";
        } else if (computerMove === "scissors") {
        result = "Tie";
        }
    } else if (playerMove === "paper") {
        if (computerMove === "rock") {
        result = "You win";
        } else if (computerMove === "paper") {
        result = "Tie";
        } else if (computerMove === "scissors") {
        result = "You lose";
        }
    } else if (playerMove === "rock") {
        if (computerMove === "rock") {
        result = "Tie";
        } else if (computerMove === "paper") {
        result = "You lose";
        } else if (computerMove === "scissors") {
        result = "You win";
        }
    }

    //Increment score by 1
    if (result === "You win") {
        score.wins++;
    } else if (result === "You lose") {
        score.losses++;
    } else if (result === "Tie") {
        score.ties++;
    }

// Local storage saves score into storage, more permanent than variables
localStorage.setItem("score", JSON.stringify(score)); // Name, Item. Online supports strings

updateScoreElement();

// Dynamically updates HTML
document.querySelector(".js-result").innerHTML = result;

document.querySelector(".js-moves").innerHTML =
    `You <img src="../../Images/${playerMove}-emoji.png" alt="Player Move" class="move-icon" />
<img src="../../Images/${computerMove}-emoji.png" alt="Computer Move" class="move-icon" />
Computer;`;
}

// Function that updates score
function updateScoreElement() {
    document.querySelector(".js-score").innerHTML =
        `Wins: ${score.wins}, Losses: ${score.losses}, Ties ${score.ties}`;
}

// Function for picking the computer move
function pickComputerMove() {
    const randomNumber = Math.random(); // Generates random number between 0 and 1

    let computerMove = "";

    if (randomNumber >= 0 && randomNumber <= 1 / 3) {
        computerMove = "rock";
    } else if (randomNumber > 1 / 3 && randomNumber <= 2 / 3) {
        computerMove = "paper";
    } else {
        computerMove = "scissors";
    }

    return computerMove; // Returns a value from a function or undefined if empty
}