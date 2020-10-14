function isEven(n) {
  absN = Math.abs(n)
  if (absN === 0){
    return true
  } else if (absN === 1) {
    return false
  } else {
    return isEven(absN - 2);
  }
}

console.log(isEven(-9));