const inquirer = require("inquirer");
const colors = require('colors');
const pad = require("pad");
const values = require("../lib/values");


const questions = [
  {type: "checkbox", name: "others", message: "Choose additional services", choices: [{name: "Birthday present box", checked: true}, {name: "Ordinary box", checked: false}]},
  {type: 'rawlist', name: 'coffeeType', message: 'Choose coffee type', choices: values.typesPlain},
  {type: 'rawlist', name: 'sugarLevel', message: 'Choose your sugar level', choices: values.sugarPlain},
  {type: 'confirm', name: 'decaf', message: 'Do you prefer your coffee to be decaf?', default: false},
  {type: 'confirm', name: 'cold', message: 'Do you prefer your coffee to be cold?', default: false},
  {type: 'rawlist', name: 'servedIn', message: 'How do you prefer your coffee to be served in', choices: values.servedIn},
  {type: 'confirm', name: 'stirrer', message: 'Do you prefer your coffee with a stirrer?', default: true},
];

module.exports = () => {
    inquirer
      .prompt(questions)
      .then(answers => {
          console.log("Your order");
          console.log("----------------");

          console.log(pad(colors.grey('Coffee type: '), 30), answers.coffeeType);
          console.log(pad(colors.grey('Sugar level: '), 30), answers.sugarLevel);
          console.log(pad(colors.grey('Decaf: '), 30), answers.decaf);
          console.log(pad(colors.grey('Cold: '), 30), answers.cold);
          console.log(pad(colors.grey('Served in: '), 30), answers.servedIn);
          console.log(pad(colors.grey('With stirrer: '), 30), answers.stirrer);
      })
}
