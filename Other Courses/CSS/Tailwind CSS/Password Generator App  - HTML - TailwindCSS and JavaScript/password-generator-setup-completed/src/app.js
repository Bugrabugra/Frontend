import { passwordStrength } from "check-password-strength";


const length = document.querySelector("#length");
const lengthText = document.querySelector("#lengthText");
const password = document.querySelector("#password");
const strength = document.querySelector("#strength");
const generateBtn = document.querySelector("#generate");

const letters = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
  'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const symbols = [
  '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '{',
  '}', '[', ']', '|', '\\', ':', ';', '"', '\'', '<', '>', ',', '.', '?', '/',
  '~', '`'
];

const utils = {
  getRandomNumBetween: (min, max) => Math.floor(Math.random() * (max - min + 1) + min),
  getCharsFromArray: (array, num) => {
    let chars = "";
    for (let i = 0; i < num; i++) {
      const randomNumber = utils.getRandomNumBetween(0, array.length - 1);
      randomNumber % 2 === 0 ? chars += array[randomNumber] : chars += array[randomNumber].toUpperCase();
    }
    return chars;
  }
};


const generatePassword = () => {
  const passLength = length.value;
  const includeNumbers = document.querySelector("#includeNumbers").checked;
  const includeSymbols = document.querySelector("#includeSymbols").checked;

  let tempPassword = "";

  if (includeNumbers) {
    tempPassword += utils.getCharsFromArray(numbers, utils.getRandomNumBetween(3, passLength / 3));
  }
  if (includeSymbols) {
    tempPassword += utils.getCharsFromArray(symbols, utils.getRandomNumBetween(3, passLength / 3));
  }

  tempPassword += utils.getCharsFromArray(letters, passLength - tempPassword.length);
  password.value = tempPassword.split("").sort(() => Math.random() - 0.5).join("");

  const passwordQuality = passwordStrength(tempPassword, [
    { id: 0, value: "Too weak", minDiversity: 0, minLength: 8 },
    { id: 1, value: "Weak", minDiversity: 2, minLength: 8 },
    { id: 2, value: "Medium", minDiversity: 4, minLength: 12 },
    { id: 3, value: "Strong", minDiversity: 4, minLength: 16 }
  ]);

  switch (passwordQuality.value) {
    case "Too weak":
      strength.value = utils.getRandomNumBetween(0, 10);
      break;
    case "Weak":
      strength.value = utils.getRandomNumBetween(10, 30);
      break;
    case "Medium":
      strength.value = utils.getRandomNumBetween(30, 70);
      break;
    case "Strong":
      strength.value = utils.getRandomNumBetween(75, 100);
      break;
  }
};

const handlePasswordClick = (e) => {
  if (e.currentTarget.value === "") {
    return;
  }
  const passwordToCopy = password.value;
  navigator.clipboard.writeText(passwordToCopy);
  password.value = "Copied";
  setTimeout(() => {
    password.value = passwordToCopy;
  }, 1000);
};

password.addEventListener("click", handlePasswordClick);
generateBtn.addEventListener("click", generatePassword);
length.addEventListener("change", (e) => lengthText.textContent = e.currentTarget.value);

