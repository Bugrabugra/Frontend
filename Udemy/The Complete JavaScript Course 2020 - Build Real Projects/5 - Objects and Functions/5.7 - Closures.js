function retirement(retirementAge) {
  let a = " years left until retirement.";
  return function(yearOfBirth) {
    let age = 2016 - yearOfBirth;
    console.log((retirementAge - age) + a);
  }
}

let retirementUS = retirement(66);
let retirementGermany = retirement(65);
let retirementIceland = retirement(67);

retirementUS(1990);
retirementGermany(1990);
retirementIceland(1990);

retirement(66)(1990);


function interviewQuestion(job) {
  let sentence;
  return function(name) {
    switch (job) {
      case "designer":
        sentence = name + ", can you please explain what UX design is?";
        break;
      case "teacher":
        sentence = "What subject do you teach, " + name + "?";
        break;
      default:
        sentence = "Hello " + name + ", what do you do?";
    }
    console.log(sentence);
  }
}

interviewQuestion("teacher")("John");