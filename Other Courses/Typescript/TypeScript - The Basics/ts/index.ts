import * as _ from "lodash"

async function hello() {
  return "world";
}

type Style = "bold" | "italic";
let font: Style;

interface Person {
  first: string;
  last: string;
  [key: string]: any
}

const person: Person = {
  first: "Jeff",
  last: "Delaney"
};

const person2: Person = {
  first: "Usain",
  last: "Bolt",
  fast: true
};

// functions
function pow(x: number, y:number): void {
  Math.pow(x, y).toString();
}

pow(5, 10);

// arrays
const arr: Person[] = [];
arr.push({first: "Buğra", last: "Otken"});

type MyList = [number?, string?, boolean?];
const arr2: MyList = [];
arr2.push(1);
arr2.push("23");
arr2.push(false);

// generics
class Observable<T> {
  constructor(public value: T) {}
}

let x: Observable<number>;
let y: Observable<Person>;
let z = new Observable(23);

