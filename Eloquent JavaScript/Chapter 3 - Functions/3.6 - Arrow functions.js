const power = (base, exponent) => {
  let result = 1;
  for (let count = 0; count < exponent; count++) {
    result *= base
  }
  console.log(result)
};

power(2, 10);

// *********************************************
const square1 = (x) => {
  return x * x;
};

console.log(square1(3));

// *********************************************
const horn = () => {
  console.log("Toot!")
};

horn();
