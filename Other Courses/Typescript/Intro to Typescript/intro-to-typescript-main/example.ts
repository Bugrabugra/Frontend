// Type Annotations
// let myName: string = "CJ";
// let isCool: boolean = true;
// let favNumber: number = 42;
//
// function add(a: number, b: number) {
//   return a + b;
// }
//
// console.log(add(4, 2));

// Inferred Types
let myName = "CJ";
let isCool: boolean = true;
let favNumber: number = 42;

// myName = 42;

function add(a: number, b: number) {
  return a + b;
}

let result = add(40, 2);
console.log(result);

const numbers = [4, 7, 13, 42];

// Union Types
const numbersAndStrings: (string | number)[] = [4, 7, "CJ", 42];
console.log(numbersAndStrings);

let theAnswer: string | number = 42;
theAnswer = "42"

// Objects and Interfaces

// Optional Properties

// Classes

// Generics

// any, unknown, never

// Type Assertions

// @ts-ignore / @ts-nocheck
