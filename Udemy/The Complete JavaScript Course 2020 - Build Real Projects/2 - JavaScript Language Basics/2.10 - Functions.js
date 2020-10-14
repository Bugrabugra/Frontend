function calculateAge(birthYear) {
  return 2018 - birthYear;
}

let ageJohn = calculateAge(1990);
let ageMike = calculateAge(1948);
let ageJane = calculateAge(1969);

console.log(ageJohn, ageMike, ageJane);


function yearsUntilRetirement(year, firstName) {
  let age = calculateAge(year);
  let retirement = 65 - age;
  if (retirement > 0) {
    console.log(firstName + " retires in " + retirement + " years.");
  } else {
    console.log(firstName + " is already retired.")
  }
}

yearsUntilRetirement(1990, "John");


