var userInput;
var userName;
userInput = 5;
userInput = "Max";
if (typeof userInput === "string") {
    userName = userInput;
}
var generateError = function (message, code) {
    throw { message: message, errorCode: code };
};
var result = generateError("An error occurred!", 500);
console.log(result);
