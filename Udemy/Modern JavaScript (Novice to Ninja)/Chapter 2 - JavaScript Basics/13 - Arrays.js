let ninjas = ["shaun", "ryu", "chun-li"];

ninjas[1] = "ken";
console.log(ninjas[1]);
console.log(ninjas);

let ages = [20, 25, 30, 35];
console.log(ages[2]);

let random = ["shaun", "crystal", 30, 20];
console.log(random);
console.log(ninjas.length);

// Array methods
let result = ninjas.join(",");
let result2 = ninjas.indexOf("chun-li");
let result3 = ninjas.concat(["ken", "crystal"]);
let result4 = ninjas.push("ken");
let result5 = ninjas.pop();

console.log(result);
console.log(result2);
console.log(result3);
console.log(result4);
console.log(result5);
