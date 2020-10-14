function max(...numbers) {
  let result = -Infinity;
  for (let number of numbers) {
    if (number > result) {
      result = number;
    }
  }
  return result;
}

console.log(max(4, 1, 9, -2));

// ****************************************
let numbers = [5, 1, 7];
console.log(max(...numbers));

let words = ["never", "fully"];
console.log(["will", ...words, "understand"]);
