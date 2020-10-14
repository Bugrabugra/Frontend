function centuryFromYear(year) {
  const whole = year / 100;
  if (whole > year % 100) {
    return Math.floor(year / 100) + 1
  } else {
    return Math.floor(year / 100)
  }
}

// Best
console.log(Math.ceil(year / 100));