import { EventEmitter } from "events"


const myEmitter = new EventEmitter();

function greetHandler(name) {
  console.log("hello", name)
}

function goodbyeHandler(name) {
  console.log("bye", name)
}

// register event listeners
myEmitter.on("greet", greetHandler);
myEmitter.on("goodbye", goodbyeHandler);

// emit events
myEmitter.emit("greet", "John");
myEmitter.emit("goodbye", "John");

// error handling
myEmitter.on("error", error => console.log(error))

// simulate error
myEmitter.emit("error", new Error("error"))
