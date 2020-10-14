const question = new Map();
question.set("question", "What is the official name of the latest major Javascript version?");
question.set(1, "ES5");
question.set(2, "ES6");
question.set(3, "ES2015");
question.set(4, "ES7");
question.set("correct", 3);
question.set(true, "Correct answer :D");
question.set(false, "Wrong, please try again!");

console.log(question);

console.log(question.get("question"));
console.log(question.size);

if (question.has(4)) {
  console.log("Answer 4 is here!");
}

// question.clear();
console.log(question);

question.forEach((value, key) => console.log(`This is "${key}" and it's set to "${value}"`));

console.log("************************");


for (let [key, value] of question.entries()) {
  if (typeof(key) === "number") {
    console.log(`This is "${key}" and it's set to "${value}"`);    
  }
}

const ans = parseInt(prompt("Write the correct answer"));

console.log(question.get(ans === question.get("correct")));