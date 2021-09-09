window.addEventListener("load", init);

// Globals
let time = 5;
let score = 0;
let isPlaying;

// Available levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 2
}

// To change level
const currentLevel = levels.easy;

// DOM Elements
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");

const WORDS = [
  'hat',
  'river',
  'lucky',
  'statue',
  'generate',
  'stubborn',
  'cocktail',
  'runaway',
  'joke',
  'developer',
  'establishment',
  'hero',
  'javascript',
  'nutrition',
  'revolver',
  'echo',
  'siblings',
  'investigate',
  'horrendous',
  'symptom',
  'laughter',
  'magic',
  'master',
  'space',
  'definition'
];

// Initialize Game
function init() {
  // Show number of seconds in UI
  seconds.innerHTML = currentLevel;
  // Load word from array
  showWord(WORDS);
  // Start matching on word input
  wordInput.addEventListener("input", startMatch);
  // Call countdown every second
  setInterval(countdown, 1000);
  // Check game status
  setInterval(checkStatus, 50);
}

const startMatch = () => {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(WORDS);
    wordInput.value = "";
    score++;
  }

  // If score is -1, display 0
  score === -1 ? scoreDisplay.innerHTML = 0 : scoreDisplay.innerHTML = score.toString();
}

// Match currentWord to wordInput
const matchWords = () => {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = "Correct!!!";
    return true;
  } else {
    message.innerHTML = "";
    return false
  }
}

// Pick & show random word
const showWord = (words) => {
  // Generate random array index
  const randomIndex = Math.floor(Math.random() * words.length);
  // Output random word
  currentWord.innerHTML = WORDS[randomIndex];
}

// Countdown timer
const countdown = () => {
  // Make sure time is not run out
  if (time > 0) {
    // Decrement
    time--;
  } else if (time === 0) {
    isPlaying = false;
  }
  // Show time
  timeDisplay.innerHTML = time.toString();
}

// Check game status
const checkStatus = () => {
  if (!isPlaying && time === 0) {
    message.innerHTML = "Game Over!!!";
    score = -1;
  }
}