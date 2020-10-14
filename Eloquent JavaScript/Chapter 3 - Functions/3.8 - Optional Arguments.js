function square(x) {
  return x * x;
}

console.log(square(4, true, "hedgehog"));

// ************************************************
function minus(a, b) {
  if (b === undefined) {
    return -a;
  }
  else {
    return a - b;
  }
}

console.log(minus(10));
console.log(minus(10, 5));

// ************************************************
function power(base, exponent=2) {
  let result = 1;
  for (let count = 0; count < exponent; count++) {
    result *= base;
  }
  return result;
}

console.log(power(4));
console.log(power(2, 6));