let years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
  let arrResult = [];
  for (let i = 0; i < arr.length; i++) {
    arrResult.push(fn(arr[i]));
  }
  return arrResult;
}

function calculateAge(el) {
  return 2016 - el;
}

function isFullAge(el) {
  return el >= 18;
}

function maxHeartRate(el) {
  if (el >= 18 && el <= 81) {
    return Math.round(206.9 - (0.67 * el));
  } else {
    return -1;
  }
}

let ages = arrayCalc(years, calculateAge);
console.log(ages);

let fullAges = arrayCalc(ages, isFullAge);
console.log(fullAges);

let rates = arrayCalc(ages, maxHeartRate);
console.log(rates);