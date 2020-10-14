function range(start, end, step = start < end ? 1 : -1) {
  let result = [];
  for (let i = start; i <= end; i += step) {
    result.push(i);
  }
  return result;
}

console.log(range(1, 10, 3));

// ************************************
function sum(array) {
  let result = 0;
  for (let i = 0; i < array.length; i++) {
    result += array[i];
  }
  return result;
}

console.log(sum([1, 2, 3, 4,  5, 6, 7, 8, 9, 10]));

// ************************************
