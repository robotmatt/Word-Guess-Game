const wordList = [
    {
        spelling: "LETS GO",
        description: "Let's Go Chant",
        media: '<iframe width="1" height="1" src="https://www.youtube.com/embed/2i6Db1mSYI0?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        image: '<img src="assets/images/lets-go-hokes.jpg">'
    },
    {
        spelling: "ENTER SANDMAN",
        description: "Enter Sandman by Metallica",
        media: '<iframe width="1" height="1" src="https://www.youtube.com/embed/CD-E-LDc384?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        image: null
    },
    {
        spelling: "TECH TRIUMPH",
        description: "Tech Triumph Fight Song",
        media: '<iframe width="1" height="1" src="https://www.youtube.com/embed/2NDdc4xYKX8?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        image: null
    },
    {
        spelling: "STICK IT IN",
        description: "Stick it in, Sitck it in, Sitck it in",
        media: '<iframe width="1" height="1" src="https://www.youtube.com/embed/RcLILCU6AVU?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        image: null
    },
    {
        spelling: "GOBBLER",
        description: "Army of Turkeys",
        media: '<iframe width="1" height="1" src="https://www.youtube.com/embed/Q9zvgcOrTtw?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        image: null
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
        document.querySelector("#image").innerHTML = wordList[wordIndex].image;
        document.querySelector("#description").innerHTML = wordList[wordIndex].description;
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

    //ignore non alphabet characters
    var regex = new RegExp("^[a-zA-Z\b]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }
    else {
        if (guess.guessRemaining > 0) {
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
        } else {
            //you lose!!
        }
    }



};