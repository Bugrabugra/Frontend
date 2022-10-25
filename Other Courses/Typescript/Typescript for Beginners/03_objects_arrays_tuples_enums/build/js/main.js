"use strict";
// arrays
let stringArr = ["one", "hey", "Dave"];
let guitars = ["Start", "Les Paul", 5150];
let mixedData = ["EVH", 1984, true];
stringArr[0] = "John";
stringArr.push("hey");
guitars[0] = 1984;
guitars.unshift("Jim");
let test = [];
let bands = [];
bands.push("Van Halen");
// tuple
let myTuple = ["Dave", 42, true];
let mixed = ["John", 1, false];
mixed = myTuple;
// myTuple = mixed;
myTuple[1] = 42;
// objects
let myObj;
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
;
let evh = {
    name: "Eddie",
    active: false,
    albums: [1984, 5150, "OU812"]
};
let jp = {
    active: true,
    albums: ["I", "II", "IV"]
};
evh = jp;
// evh.years = 1940
const greetGuitarist = (guitarist) => {
    if (guitarist.name) {
        return `Hello ${guitarist.name.toUpperCase()}`;
    }
    return "Hello!";
};
console.log(greetGuitarist(jp));
// enums
// unlike the most TS features, Enums are not a type-level addition to JS but something
// added to the language and runtime
var Grade;
(function (Grade) {
    Grade[Grade["U"] = 1] = "U";
    Grade[Grade["D"] = 2] = "D";
    Grade[Grade["C"] = 3] = "C";
    Grade[Grade["B"] = 4] = "B";
    Grade[Grade["A"] = 5] = "A";
})(Grade || (Grade = {}));
;
console.log(Grade.U);
