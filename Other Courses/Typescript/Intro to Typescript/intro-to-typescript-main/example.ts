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
// let myName = "CJ";
// let isCool: boolean = true;
// let favNumber: number = 42;

// myName = 42;

// function add(a: number, b: number) {
//   return a + b;
// }

// let result = add(40, 2);
// console.log(result);
//
// const numbers = [4, 7, 13, 42];

// Union Types
// const numbersAndStrings: (string | number)[] = [4, 7, "CJ", 42];
// console.log(numbersAndStrings);
//
// let theAnswer: string | number = 42;
// theAnswer = "42"

// Objects and Interfaces
// interface Person {
//   name: string;
//   favNumber: number;
// }
//
// function greet(person: Person) {
//   return `Hello ${person.name}`;
// }
//
// console.log(greet({
//   name: "CJ",
//   favNumber: 42
// }));

// Optional Properties
// type StreamerType = "affiliate" | "partner";

// interface Person {
//   name: string;
//   favNumber: number;
//   dogName?: string;
//   streamerType: StreamerType;
//   currentTime?(): Date;
// }

// function greet(person: Person) {
//   if (person.currentTime) {
//     return `Hello ${person.name} it is ${person.currentTime()}`;
//   }
//   return `Hello ${person.name}`;
// }

// console.log(greet({
//   name: "CJ",
//   favNumber: 42,
//   streamerType: "partner",
//   currentTime(): Date {
//     return new Date();
//   }
// }));

// function greetPersonAndDog(person: Person) {
//   if (person.dogName) {
//     return `Hello ${person.name} and their dog ${person.dogName}`;
//   }
//   return greet(person);
// }

// console.log(greetPersonAndDog({
//   name: "Chris",
//   favNumber: 13,
//   dogName: "fu",
//   streamerType: "affiliate",
//   currentTime(): Date {
//     return new Date();
//   }
// }))

// Classes
// class Person {
//   name: string;
//   dogName: string;
//   favNumber: number;
//
//   constructor(name: string, dogName: string, favNumber: number) {
//     this.name = name;
//     this.dogName = dogName;
//     this.favNumber = favNumber;
//   }
// }

class Person {
  static species = "Homosapien"
  constructor(
    public name: string,
    public dogName: string,
    public favNumber: number,
    protected internalSecret: string,
    private privateSecret: string
  ) {}
}

const cj = new Person("CJ", "Panzer", 42, "super-secret", "super-super-secret");
console.log(cj);

function greet(person: Person) {
  return `Hello ${person.name}`;
}

// Generics
function sortItems<T>(items: T[], compareFn: (a: T, b: T) => number): T[] {
  return items.sort(compareFn)
}

const numbers = [42, 3, 77, 13, 104, 82];

const sortedNumbers = sortItems<number>(numbers, (a, b) => a - b);

console.log(sortedNumbers)

// any, unknown, never

// Type Assertions

// @ts-ignore / @ts-nocheck
