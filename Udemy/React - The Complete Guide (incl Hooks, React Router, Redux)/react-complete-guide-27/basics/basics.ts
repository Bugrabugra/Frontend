// primitives: number, string, boolean
// more complex: arrays, objects
// function types, parameters

// primitives
let age: number;
age = 12;

let userName: string;
userName = "Max";

let isInstructor: boolean;
isInstructor = true;

// more complex
let hobbies: string[];
hobbies = ["Sports", "Cooking"];

type Person = {
  name: string,
  age: number
};

let person: Person;
person = {
  name: "Max",
  age: 32
};

let people: Person[];

people = [{name: "Buğra", age: 36}, {name: "Burcu", age: 36}];

// type inference
let course: string | number = "React - The Complete Guide";
course = 12341

// functions and types
function add(a: number, b: number) {
  return a + b;
};

// generics
function insertAtBeginning<T>(array: T[], value: T) {
  const newArray = [value, ...array];
  return newArray;
};

const demoArray = [1, 2, 3];

const updatedArray = insertAtBeginning(demoArray, -1);
const stringArray = insertAtBeginning(["a", "b", "c"], "d");

// updatedArray[0].split("");
stringArray[0].split("");