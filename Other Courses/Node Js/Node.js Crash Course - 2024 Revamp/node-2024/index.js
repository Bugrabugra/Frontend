// const { generateRandomNumber, celsiusToFahrenheit } = require("./utils");
import getPosts, { getPostsLength } from "./postController.js";

// console.log(`Random number ${generateRandomNumber()}`)
// console.log(`Celsius to fahrenheit ${celsiusToFahrenheit(0)}`)

console.log(getPosts())
console.log("Posts length: ", getPostsLength())

