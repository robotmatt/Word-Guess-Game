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
    lettersGuessed: [],
    wordArray: []
};

let wordIndex = 0;

let wins = 0;

function renderWord() {
    //if the guessCount is 0, then it's a new game
    if(guess.guessCount === 0){
        guess.wordArray = wordList[wordIndex].spelling.replace(/[A-Z]/g, '_').split('');
    }
    document.querySelector("#current-word").innerHTML = guess.wordArray.join('');
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
    
    if (guess.guessCount === 0) {
        guess.guessCount++;
    } else {
        if (!guess.lettersGuessed.includes(keyPress)) {
            guess.guessCount++;
            guess.guessRemaining--;
            guess.lettersGuessed.push(keyPress);
            updateGuessCount();
            updateGuessLetters(keyPress);
            
            var word =  wordList[wordIndex].spelling.split('');
            word.forEach(function(wordLetters, index){
                if(wordLetters === keyPress){
                    guess.wordArray[index] = keyPress;
                }
            });

            renderWord();
            
        }

    }
};