const colors = require("colors");
const {types} = require("./values");


// Export function to list coffee
module.exports = () => {
  console.log("Coffee menu");
  console.log("-------------");

  // List on separate lines
  types.forEach(type => {
    console.log(`${colors.bold(type.name)} ${colors.grey("/ " + type.price)}`);
  })
}