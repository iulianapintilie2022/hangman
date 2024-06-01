const input = require("sync-input");
let VICTORIES = 0;
let LOSSES = 0;

console.log("H A N G M A N");
// let userAction = input(`Type "play" to play the game, "results" to show the scoreboard, and "exit" to quit:`);

while (true) {
  let userAction = input(
    `Type "play" to play the game, "results" to show the scoreboard, and "exit" to quit:`,
  );
  switch (userAction) {
    case "play":
      play();
      break;
    case "results":
      showResults();
      break;
    case "exit":
      console.log("Shutting down the Coffee Machine. Goodbye!");
      return;
    default:
      let userAction = input(
        `Type "play" to play the game, "results" to show the scoreboard, and "exit" to quit:`,
      );
  }
}

function play() {
  const guessWords = ["python", "java", "swift", "javascript"];
  let tries = 8;
  let guessWord = guessWords[Math.floor(Math.random() * 4)];
  let hint = "-".repeat(guessWord.length);
  const newHiddenWord = new Array(hint.length);
  const triedLetters = [];

  do {
    console.log(hint);
    if (hint == guessWord && tries !== 0) {
      VICTORIES++;
      console.log(`You guessed the word ${guessWord}!`);
      console.log("You survived!");
      break;
    }

    let userInput = input(`Input a letter: \n`);

    if (userInput.length > 1 || userInput == "") {
      console.log("Please, input a single letter.\n");
    } else if (userInput.match(/[a-z]/)) {
      if (!triedLetters.includes(userInput)) {
        triedLetters.push(userInput);
      } else {
        console.log("You've already guessed this letter.\n");
      }
      if (guessWord.includes(userInput)) {
        for (let i = 0; i < guessWord.length; i++) {
          if (userInput == guessWord[i]) {
            if (userInput !== newHiddenWord[i]) {
              newHiddenWord[i] = userInput;
            }
          } else {
            newHiddenWord[i] = hint[i];
          }
        }
        hint = newHiddenWord.join("");
      } else if (!triedLetters.includes(userInput)) {
        console.log("That letter doesn't appear in the word.\n");
        tries--;
      } else {
        console.log("That letter doesn't appear in the word.\n");
        tries--;
      }
    } else {
      console.log(
        "Please, enter a lowercase letter from the English alphabet./n",
      );
    }
  } while (tries > 0);

  if (tries == 0) {
    console.log("You lost!");
    LOSSES++;
  }
}

function showResults() {
  console.log(`You won: ${VICTORIES} times.`);
  console.log(`You lost: ${LOSSES} times.`);
}

