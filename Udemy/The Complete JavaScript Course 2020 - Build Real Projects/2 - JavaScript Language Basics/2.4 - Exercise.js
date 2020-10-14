let weightMark = 78;
let weightJohn = 73;
let heightMark = 1.73;
let heightJohn = 1.86;

let bmiMark = weightMark / heightMark**2;
let bmiJohn = weightJohn / heightJohn**2;

result = bmiMark > bmiJohn;
console.log("Is Mark's BMI higher than John's?", result);
