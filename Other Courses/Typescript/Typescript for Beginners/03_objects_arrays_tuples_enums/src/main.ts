// arrays
let stringArr = ["one", "hey", "Dave"];

let guitars = ["Start", "Les Paul", 5150];

let mixedData = ["EVH", 1984, true];

stringArr[0] = "John";
stringArr.push("hey");

guitars[0] = 1984;
guitars.unshift("Jim");

let test = [];
let bands: string[] = [];
bands.push("Van Halen");

// tuple
let myTuple: [string, number, boolean] = ["Dave", 42, true];

let mixed = ["John", 1, false];

mixed = myTuple;
// myTuple = mixed;
myTuple[1] = 42;

// objects
let myObj: object;
myObj = [];
console.log(typeof myObj);
myObj = bands;
myObj = [];

const exampleObj = {
  prop1: "Dave",
  prop2: true
};

// exampleObj.prop2 = 42
exampleObj.prop1 = "John";

type Guitarist = {
  name: string,
  active?: boolean,
  albums: (string | number)[]
};

interface IGuitarist {
  name?: string,
  active: boolean,
  albums: (string | number)[]
};

let evh: IGuitarist = {
  name: "Eddie",
  active: false,
  albums: [1984, 5150, "OU812"]
};

let jp: IGuitarist = {
  active: true,
  albums: ["I", "II", "IV"]
};

evh = jp;
// evh.years = 1940

const greetGuitarist = (guitarist: IGuitarist) => {
  if (guitarist.name) {
    return `Hello ${guitarist.name.toUpperCase()}`;
  }
  return "Hello!";
};

console.log(greetGuitarist(jp));

// enums
// unlike the most TS features, Enums are not a type-level addition to JS but something
// added to the language and runtime
enum Grade {
  U = 1,
  D,
  C,
  B,
  A
};

console.log(Grade.U);
