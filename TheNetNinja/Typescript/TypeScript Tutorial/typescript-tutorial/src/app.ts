import {Invoice} from "./classes/Invoice.js";
import {Payments} from "./classes/Payments.js";
import {HasFormatter} from "./interfaces/HasFormatter.js";
import {ListTemplate} from "./classes/ListTemplate.js";

let docOne: HasFormatter;
let docTwo: HasFormatter;

docOne = new Invoice("yoshi", "web work", 250);
docTwo = new Payments("mario", "plumbing work", 200);

let docs: HasFormatter[] = [];
docs.push(docOne);
docs.push(docTwo);

// console.log(docs);

// Interfaces
interface IsPerson {
  name: string;
  age: number;
  speak(a: string): void;
  spend(a: number): number;
}

const me: IsPerson = {
  name: "shaun",
  age: 30,
  speak(text: string): void {
    // console.log(text);
  },
  spend(amount: number): number {
    // console.log("I spent", amount);
    return amount;
  }
};

const greetPerson = (person: IsPerson) => {
  // console.log("hello", person.name);
}

greetPerson(me);
// console.log(me);


// Modules
import {Invoice} from "./classes/Invoice.js";
import {ListTemplate} from "./classes/ListTemplate";

const invOne = new Invoice("mario", "work on the mario website", 250);
const invTwo = new Invoice("luigi", "work on the luigi website", 300);

let invoices: Invoice[] = [];
invoices.push(invOne);
invoices.push(invTwo);

invoices.forEach(invoice => {
  // invoice.client = "lalala"; // Olmaz çünkü readonly
  // console.log(invoice.client, invoice.amount, invoice.format());
})

// DOM
const anchor = document.querySelector("a");

// console.log(anchor.href); // DOM'a development sırasında erişemediği için göremez
if (anchor) { // ,ya if ile kontrol edersin ya da queryselectorun sonuna "!" koyarsın.
  // console.log(anchor.href);
}

// const form = document.querySelector("form")!;
const form = document.querySelector(".new-item-form") as HTMLFormElement; // class belirttiğin için ve classlar her tag'te olabileceği için erişemez, o yüzden ayrıca belirtmelisin
// console.log(form.children);

// Inputs
const type = document.querySelector("#type") as HTMLSelectElement;
const toFrom = document.querySelector("#toFrom") as HTMLInputElement;
const details = document.querySelector("#details") as HTMLInputElement;
const amount = document.querySelector("#amount") as HTMLInputElement;

// List template instance
const ul = document.querySelector("ul")!;
const list = new ListTemplate(ul);

form.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  let values: [string, string, number];
  values = [toFrom.value, details.value, amount.valueAsNumber];

  let doc: HasFormatter;
  if (type.value === "invoice") {
    doc = new Invoice(...values);
  } else {
    doc = new Payments(toFrom.value, details.value, amount.valueAsNumber)
  }

  list.render(doc, type.value, "end");
})

// Generics
const addUID = <T extends {name: string}>(obj: T) => {
  let uid = Math.floor(Math.random() * 100);
  return {...obj, uid};
}

let docOne_ = addUID({name: "yoshi", age: 40});

console.log(docOne_.name);

// With interfaces
interface Resource<T> {
  uid: number;
  resourceName: string;
  data: T;
}

const docThree: Resource<string> = {
  uid: 1,
  resourceName: "person",
  data: "shaun"
}

const docFour: Resource<string[]> = {
  uid: 2,
  resourceName: "test",
  data: ["bread", "milk"]
}

console.log(docThree, docFour);

// ENUMS
enum ResourceType {BOOK, AUTHOR, FILM, DIRECTOR, PERSON}

interface Resource2<T> {
  uid: number,
  resourceType: number,
  data: T
}

const docFive: Resource2<object> = {
  uid: 1,
  resourceType: ResourceType.DIRECTOR,
  data: {title: "name of the wind"}
}

const docSix: Resource2<object> = {
  uid: 10,
  resourceType: ResourceType.PERSON,
  data: {name: "yoshi"}
}

console.log(docFive, docSix);

// Tuples
let arr = ["ryu", 25, true];
arr[0] = "yoshi";
arr = [30, false, "yoshi"];

let tup: [string, number, boolean] = ["hello", 40, false];
tup[0] = "ken";
tup[1] = 30;
tup[2] = true;

let student: [string, number];
student = ["chun-li", 2332];
