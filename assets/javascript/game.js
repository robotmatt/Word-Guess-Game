const wordList = [
    {
        spelling: "ENTER SANDMAN",
        media: '<iframe width="1" height="1" src="https://www.youtube.com/embed/CD-E-LDc384?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    },
    {
        spelling: "TECH TRIUMPH",
        media: '<iframe width="1" height="1" src="https://www.youtube.com/embed/2NDdc4xYKX8?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    },
    {
        spelling: "GOBBLER",
        media: '<iframe width="1" height="1" src="https://www.youtube.com/embed/9Mb90E-jxPY?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    },
    {
        spelling: "LETS GO",
        media: '<iframe width="1" height="1" src="https://www.youtube.com/embed/2i6Db1mSYI0?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    },
    {
        spelling: "STICK IT IN",
        media: '<iframe width="1" height="1" src="https://www.youtube.com/embed/RcLILCU6AVU?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    }
];

let guess = {
    guessCount: 0,
    guessRemaining: 15,
    lettersGuessed: [],
    wordArray: []
};

let wordIndex = 0;

let wins = 0;

function renderWord() {
    //if the guessCount is 0, then it's a new game
    if (guess.guessCount === 0) {
        guess.wordArray = wordList[wordIndex].spelling.replace(/[A-Z]/g, '_').split('');
    }
    document.querySelector("#current-word").innerHTML = guess.wordArray.join('');
}

// Function that updates the score...
function updateScore() {
    document.querySelector("#win-count").innerHTML = wins;
}

function updateGuessCount() {
    document.querySelector("#guess-remaining").innerHTML = guess.guessRemaining;
}
function updateGuessLetters(letter) {
    document.querySelector("#letters-guessed").innerHTML += " " + letter;
}
function resetGame() {
    guess.guessCount = 0;
    guess.guessRemaining = 15;
    guess.lettersGuessed = [];
    guess.wordArray = [];
    updateGuessCount();
    document.querySelector("#letters-guessed").innerHTML = "";
    updateScore();
}
function checkWin() {
    if (!guess.wordArray.includes("_")) {
        document.querySelector("#song").innerHTML = wordList[wordIndex].media;
        wins++;
        wordIndex++;

        resetGame();
    }
}




// MAIN PROCESS
// ==============================================================================

// Calling functions to start the game.
renderWord();
updateScore();
updateGuessCount();

document.onkeyup = function (event) {
    // Captures the key press, converts it to lowercase, and saves it to a variable.
    let keyPress = event.key.toUpperCase();

    console.log(keyPress);

    if (guess.guessCount === 0 && wins === 0) {
        guess.guessCount++;
    } else {
        if (!guess.lettersGuessed.includes(keyPress)) {
            guess.guessCount++;
            guess.guessRemaining--;
            guess.lettersGuessed.push(keyPress);
            updateGuessCount();
            updateGuessLetters(keyPress);

            var word = wordList[wordIndex].spelling.split('');
            word.forEach(function (wordLetters, index) {
                if (wordLetters === keyPress) {
                    guess.wordArray[index] = keyPress;
                }
            });

            checkWin();
            renderWord();
        }

    }
};