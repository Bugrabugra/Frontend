import { Invoice } from "./classes/Invoice.js";
import { Payments } from "./classes/Payments.js";
import { ListTemplate } from "./classes/ListTemplate.js";
let docOne;
let docTwo;
docOne = new Invoice("yoshi", "web work", 250);
docTwo = new Payments("mario", "plumbing work", 200);
let docs = [];
docs.push(docOne);
docs.push(docTwo);
const me = {
    name: "shaun",
    age: 30,
    speak(text) {
        // console.log(text);
    },
    spend(amount) {
        // console.log("I spent", amount);
        return amount;
    }
};
const greetPerson = (person) => {
    // console.log("hello", person.name);
};
greetPerson(me);
const invOne = new Invoice("mario", "work on the mario website", 250);
const invTwo = new Invoice("luigi", "work on the luigi website", 300);
let invoices = [];
invoices.push(invOne);
invoices.push(invTwo);
invoices.forEach(invoice => {
    // invoice.client = "lalala"; // Olmaz çünkü readonly
    // console.log(invoice.client, invoice.amount, invoice.format());
});
// DOM
const anchor = document.querySelector("a");
// console.log(anchor.href); // DOM'a development sırasında erişemediği için göremez
if (anchor) { // ,ya if ile kontrol edersin ya da queryselectorun sonuna "!" koyarsın.
    // console.log(anchor.href);
}
// const form = document.querySelector("form")!;
const form = document.querySelector(".new-item-form"); // class belirttiğin için ve classlar her tag'te olabileceği için erişemez, o yüzden ayrıca belirtmelisin
// console.log(form.children);
// Inputs
const type = document.querySelector("#type");
const toFrom = document.querySelector("#toFrom");
const details = document.querySelector("#details");
const amount = document.querySelector("#amount");
// List template instance
const ul = document.querySelector("ul");
const list = new ListTemplate(ul);
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let values;
    values = [toFrom.value, details.value, amount.valueAsNumber];
    let doc;
    if (type.value === "invoice") {
        doc = new Invoice(...values);
    }
    else {
        doc = new Payments(toFrom.value, details.value, amount.valueAsNumber);
    }
    list.render(doc, type.value, "end");
});
// Generics
const addUID = (obj) => {
    let uid = Math.floor(Math.random() * 100);
    return Object.assign(Object.assign({}, obj), { uid });
};
let docOne_ = addUID({ name: "yoshi", age: 40 });
console.log(docOne_.name);
const docThree = {
    uid: 1,
    resourceName: "person",
    data: "shaun"
};
const docFour = {
    uid: 2,
    resourceName: "test",
    data: ["bread", "milk"]
};
console.log(docThree, docFour);
// ENUMS
var ResourceType;
(function (ResourceType) {
    ResourceType[ResourceType["BOOK"] = 0] = "BOOK";
    ResourceType[ResourceType["AUTHOR"] = 1] = "AUTHOR";
    ResourceType[ResourceType["FILM"] = 2] = "FILM";
    ResourceType[ResourceType["DIRECTOR"] = 3] = "DIRECTOR";
    ResourceType[ResourceType["PERSON"] = 4] = "PERSON";
})(ResourceType || (ResourceType = {}));
const docFive = {
    uid: 1,
    resourceType: ResourceType.DIRECTOR,
    data: { title: "name of the wind" }
};
const docSix = {
    uid: 10,
    resourceType: ResourceType.PERSON,
    data: { name: "yoshi" }
};
console.log(docFive, docSix);
// Tuples
let arr = ["ryu", 25, true];
arr[0] = "yoshi";
arr = [30, false, "yoshi"];
let tup = ["hello", 40, false];
tup[0] = "ken";
tup[1] = 30;
tup[2] = true;
let student;
student = ["chun-li", 2332];
