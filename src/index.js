//////// Inspired by Chris Ferdinandi at GoMakeThings: https://gomakethings.com/vanilla-js-project-creating-digital-dice/

//// Variables
// Dice arrays
const dice = {
  d4: [1, 2, 3, 4],
  d6: [1, 2, 3, 4, 5, 6],
  d8: [1, 2, 3, 4, 5, 6, 7, 8],
  d10: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  d12: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  d20: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  d100: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
};

const result = document.querySelector("#result");

const bestWorst = document.querySelector("#best-worst");

const diceLog = document.querySelector("#diceLog");

const diceLogContent = document.querySelector("#diceLogContent");

const total = document.querySelector("#total");

const d6animation = document.querySelector("#d6animation");

const d6animationContainer = document.querySelector("#d6animationContainer");

let rolls = [];

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function startingShuffle() {
  for (let key in dice) {
    if (dice.hasOwnProperty(key)) {
      shuffle(dice[key]);
    }
  }
}

function roll(d) {
  shuffle(dice[d]);
  rolls.push(dice[d][0]);

  if (d === "d6") {
    d6animationContainer.classList.add("show");

    d6animation.classList.remove("show-1");
    d6animation.classList.remove("show-2");
    d6animation.classList.remove("show-3");
    d6animation.classList.remove("show-4");
    d6animation.classList.remove("show-5");
    d6animation.classList.remove("show-6");

    d6animation.classList.add("show-" + dice[d][0]);
  } else {
    d6animationContainer.classList.remove("show");
  }
}

//// Event Handlers
function clickHandler(event) {
  if (event.target.matches("#clear")) {
    rolls = [];
    diceLogContent.textContent = "0";
    total.textContent = "0";
  } else {
    const d = event.target.getAttribute("data-roll");
    if (!d) return;

    // Roll the dice
    roll(d);

    // Render the result in the UI
    result.textContent = rolls[rolls.length - 1];

    diceLogContent.textContent = rolls.join(" + ");

    total.textContent = rolls.reduce(function (cur, arr) {
      return arr + cur;
    });
  }
}

//// Inits
// Shuffle the dice numbers on load
startingShuffle();

//// Events
document.addEventListener("click", clickHandler);
