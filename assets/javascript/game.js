const wordList = [
    {
        spelling: "ENTER SANDMAN",
        media: null
    },
    {
        spelling: "TECH TRIUMPH",
        media: null
    },
    {
        spelling: "GOBBLER",
        media: null
    }
];

let guess = {
    guessCount: 0,
    guessRemaining: 15,
    letters: []
};

let wordIndex = 0;

let wins = 0;

function renderWord() {
    // If there are still more questions, render the next one.
    if (wordIndex <= (wordList.length - 1)) {
        document.querySelector("#current-word").innerHTML = wordList[wordIndex].spelling.replace(/[A-Z]/g, '_');
    }
    // If there aren't, render the end game screen.
    else {
        document.querySelector("#question").innerHTML = "Game Over!";
        document.querySelector("#score").innerHTML = "Final Score: " + wins + " out of " + wordList.length;
    }
}

// Function that updates the score...
function updateScore() {
    document.querySelector("#win-count").innerHTML = wins;
}

function updateGuessCount(){
    document.querySelector("#guess-remaining").innerHTML = guess.guessRemaining;
}
function updateGuessLetters(letter){
    document.querySelector("#letters-guessed").innerHTML += " " + letter;
}

function checkLetter(word, letter){
    
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

    if (guess.guessCount === 0) {
        guess.guessCount++;
    } else {
        if (!guess.letters.includes(keyPress)) {
            guess.guessCount++;
            guess.guessRemaining--;
            updateGuessCount();
            guess.letters.push(keyPress);
            console.log(keyPress);
            updateGuessLetters(keyPress);
        }

    }
};