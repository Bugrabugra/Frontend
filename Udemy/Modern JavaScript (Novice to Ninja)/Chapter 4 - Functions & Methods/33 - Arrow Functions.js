// Regular function
const calcArea = function(radius) {
  return 3.14 * radius ** 2;
};

// Arrow function
const calcArea2 = radius => {
  return 3.14 * radius ** 2;
};

const calcArea3 = radius => 3.14 * radius ** 2;

const area = calcArea2(5);
console.log("area is:", area);

// Practise arrow functions
const greet = function() {
  return "hello world!";
};

const greet2 = () => "hello world!";

console.log(greet());
console.log(greet2());

const bill = function(products, tax) {
  let total = 0;
  for (let i = 0; i < products.length; i++) {
    total += products[i] + products[i] * tax;
  }
  return total;
};

console.log(bill([10, 15, 30], 0.18));

const bill2 = (products, tax) => {
  let total = 0;
  for (let i = 0; i < products.length; i++) {
    total += products[i] + products[i] * tax;
  }
  return total;
};

console.log(bill2([10, 15, 30], 0.18));
