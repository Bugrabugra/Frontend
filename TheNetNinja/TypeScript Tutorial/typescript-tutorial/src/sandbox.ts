// Numbers - Strings
let character = 'mario';
let age = 30;
let isBlackBelt = false;

character = "luigi";
age = 40;
isBlackBelt = true

const circ = (diameter: number) => {
  return diameter * Math.PI;
}

console.log(circ(8))

// Arrays
let names = ["luigi", "mario", "yoshi"];
names.push("toad");
// names.push(3);
// names[0] = 3;
// names = "mario"

let numbers = [10, 20, 30, 40];
numbers.push(25);
// numbers.push("shaun");
// numbers[1] = "shaun";

let mixed = ["ken", 4, "chun-li", 8, 9, true];
mixed.push("ryu");
mixed.push(10);
mixed[0] = 5;

// Objects
let ninja = {
  name: "mario",
  belt: "black",
  age: 30
}

ninja.age = 40;
ninja.name = "ryu";
// ninja.age = "30"
// ninja.skills = ["fighting", "sneaking"]

// ninja = {
//   nameeee: "yoshi",
//   belt: "orange",
//   age: 40,
//   skills: []
// }

// Explicit types
let character_: string;
let age_: number;
let isLoggedIn: boolean;

// age_ = "luigi"
// isLoggedIn = 25;
isLoggedIn = true;

// Arrays
let ninjas: string[] = [];
// ninjas = [10, 23]
ninjas = ["yoshi"];
ninjas.push("mario");

// Union types
let mixed_: (string|number|boolean)[] = [];
mixed_.push("hello");
mixed_.push(20);
mixed_.push(false)
console.log(mixed_);

let uid: string|number;
uid = 23;
uid = "mario"

// Objects
let ninjaOne: object;
ninjaOne = {
  name: "yoshi",
  age: 30
}

let ninjaTwo: {
  name: string,
  age: number,
  beltColor: string
}

ninjaTwo = {
  name: "mario",
  age: 20,
  beltColor: "black"
}

let age__: any = 25;
age__ = true;

let mixed__: any[] = [];
mixed__.push(5);
mixed__.push("mario");
mixed__.push(false);
console.log(mixed__);

let ninja_: {name: any, age: any};
ninja_ = {name: "yoshi", age: 25};
console.log(ninja_);

// Functions
let greet: Function;
greet = () => {
  console.log("hello again");
}


const add = (a: number, b: number, c?: number|string) => { // Optionallar sona eklenir
  console.log(a + b);
  console.log(c);
}

add(5, 10);

const minus = (a: number, b: number): number => { // İstersen belirtebilirsin sonucunun typeını
  return a - b;
};

let result = minus(10, 7);

// Type aliases
type StringOrNum = string | number;
type objWithName = {name: string, uid: StringOrNum};

const logDetails = (uid: StringOrNum, item: string) => {
  console.log(`${item} has a uid of ${uid}`);
}

const greet_ = (user: objWithName) => {
  console.log(`${user.name} says hello`);
}

// Function signatures
// let greet__: Function;

// Example 1
let greet__: (a: string, b: string) => void;

greet = (name: string, greeting: string) => {
  console.log(`${name} says ${greeting}`);
}

// Example 2
let calc: (a: number, b: number, c: string) => number;

calc = (numOne: number, numTwo: number, action: string) => {
  if (action === "add") {
    return numOne + numTwo;
  } else {
    return numOne - numTwo;
  }
}

// Example 3
let logDetails_: (obj: {name: string, age: number}) => void;
type person = {name: string, age: number};

logDetails_ = (ninja: person) => {
  console.log(`${ninja.name} is ${ninja.age} years old`);
}
