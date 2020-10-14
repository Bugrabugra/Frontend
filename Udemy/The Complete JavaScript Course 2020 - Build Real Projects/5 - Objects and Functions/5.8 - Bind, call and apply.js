let john = {
  name: "John",
  age: 26,
  job: "teacher",
  presentation: function (style, timeOfDay) {
    if (style === "formal") {
      console.log("Good " + timeOfDay + ", Ladies and gentlemen! I'm " +
                    this.name + ", I'm a " +
                    this.job + " and I'm " +
                    this.age + " years old.");
    } else if (style === "friendly") {
      console.log("Good " + timeOfDay + ", Ladies and gentlemen! I'm " +
                    this.name + ", I'm a " +
                    this.job + " and I'm " +
                    this.age + " years old. Have a nice " +
                    timeOfDay + ".");
    }
  }
};

let emily = {
  name: "Emily",
  age: 35,
  job: "designer"
};

john.presentation("formal", "morning");
john.presentation.call(emily, "friendly", "afternoon");
// john.presentation.apply(emily, ["friendly", "afternoon"]);

let johnFriendly = john.presentation.bind(john, "friendly");
johnFriendly("morning");
johnFriendly("night");

let emilyFormal = john.presentation.bind(emily, "formal");
emilyFormal("afternoon");

let years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
  let arrResult = [];
  for (let i = 0; i < arr.length; i++) {
    arrResult.push(fn(arr[i]));
  }
  return arrResult;
}

function calculateAge(el) {
  return 2016 - el;
}

function isFullAge(limit, el) {
  return el >= limit;
}

let ages = arrayCalc(years, calculateAge);
let fullJapan = arrayCalc(ages, isFullAge.bind(this, 20));

console.log(ages);
console.log(fullJapan);