function arrayToList(array) {
  let list = null;
  for (let i = array.length - 1; i >= 0; i--) {
    list = {value: array[i], rest: list};
  }
  return list;
}
console.log(arrayToList([10, 20, 30]));


function listToArray(list) {
  let array = [];
  while (list.rest !== null) {
    array.push(list.value);
    list = list.rest;
  }
  return array;
}
console.log(listToArray(arrayToList([10, 20, 30])));


function prepend(value, list) {
  return {value, rest: list}
}
console.log(prepend(10, prepend(20, null)));


function nth(list, index) {

}
console.log(nth(arrayToList([10, 20, 30]), 1));
