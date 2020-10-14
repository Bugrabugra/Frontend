let Question = function(question, answers, correctAnswer) {
  this.question = question;
  this.answers = answers;
  this.correctAnswer = correctAnswer;
};

Question.prototype.showQuestion = function() {
  console.log(this.question);
  for (let i = 0; i < this.answers.length; i++) {
    console.log(i + " " + this.answers[i]);
  }
};

Question.prototype.checkAnswer = function(userAnswer, callback) {
  let sc;
  if (userAnswer === this.correctAnswer) {
    console.log("***Correct!***");
    sc = callback(true);
  } else {
    console.log("***Wrong!***");
    sc = callback(false);
  }
  this.displayScore(sc)
};

Question.prototype.displayScore = function(score) {
  console.log("Your current score is: " + score);
  console.log("----------------------------------")
}

let question1 = new Question("What is your first boss' name?", ["Ahmet", "Önder", "Mehmet"], 1);
let question2 = new Question("Which city were you born in?", ["İstanbul", "Uşak", "Muğla"], 0);
let question3 = new Question("What is your mother's name?", ["Ayşe", "Fatma", "Nilüfer"], 2);

let questions = [question1, question2, question3];

function score() {
  let sc = 0;
  return function(correct) {
    if (correct) {
      sc++;
    }
    return sc;
  }
}

let keepScore = score();

function game() {
  let randomNumber = Math.floor(Math.random() * questions.length);
  questions[randomNumber].showQuestion();
  let userAnswer = prompt("Please type the correct answer");


  if (userAnswer !== "exit") {
    questions[randomNumber].checkAnswer(parseInt(userAnswer), keepScore);
    game();
  }
}

game();


