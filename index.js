//////// Inspired by Chris Ferdinandi at GoMakeThings: https://gomakethings.com/vanilla-js-project-creating-digital-dice/

//// Variables
// Dice arrays
var dice = {
  d4: [1, 2, 3, 4],
  d6: [1, 2, 3, 4, 5, 6],
  d8: [1, 2, 3, 4, 5, 6, 7, 8],
  d10: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  d12: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  d20: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
};

var result = document.querySelector("#result");

var bestWorst = document.querySelector("#best-worst");

// Placeholder for die rolls
var rolls;

//// Methods
/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
var shuffle = function (array) {
  var currentIndex = array.length;
  var temporaryValue, randomIndex;

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
};

/**
 * Shuffle the dice on page load
 */
var startingShuffle = function () {
  for (var key in dice) {
    if (dice.hasOwnProperty(key)) {
      shuffle(dice[key]);
    }
  }
};

/**
 * Roll the dice
 * @param  {String} d The die size to use
 */
var roll = function (d) {
  shuffle(dice[d]);
  rolls.push(dice[d][0]);
};

//// Event Handlers
var clickHandler = function (event) {
  // Only run on [data-roll] elements
  var d = event.target.getAttribute("data-roll");
  if (!d) return;

  // Clear the rolls array
  rolls = [];

  // Roll the dice
  roll(d);

  // If best of/worst of, roll again
  if (bestWorst.checked) {
    roll(d);
  }

  // Render the result in the UI
  result.textContent = rolls.join(" - ");
};

//// Inits
// Shuffle the dice numbers on load
startingShuffle();

//// Events
document.addEventListener("click", clickHandler);
