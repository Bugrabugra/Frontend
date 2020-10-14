let mark = {
  fullName: "Mark",
  mass: 86,
  height: 1.75,
  calculateBMI: function() {
    this.BMI = this.mass / this.height**2;
    return this.BMI;
  }
};

let john = {
  fullName: "John",
  mass: 73,
  height: 1.85,
  calculateBMI: function() {
    this.BMI = this.mass / this.height**2;
    return this.BMI;
  }
};

mark.calculateBMI();
john.calculateBMI();

console.log(mark);
console.log(john);

if (mark.BMI > john.BMI) {
  console.log(mark.fullName + " has the highest BMI with " + mark.BMI);
} else if (john.BMI > mark.BMI) {
  console.log(john.fullName + " has the highest BMI with " + john.BMI);
} else {
  console.log("They has the same BMI with " + john.BMI);
}
