let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "Max";

if (typeof userInput === "string") {
  userName = userInput;
}

const generateError = (message: string, code: number): never => {
  throw {message: message, errorCode: code};
}

const result = generateError("An error occurred!", 500);
console.log(result);