const ALPHA = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*_-+=";


const createPassword = (length = "8", hasNumbers = true, hasSymbols = true) => {
  let chars = ALPHA;
  hasNumbers ? (chars += NUMBERS) : "";
  hasSymbols ? (chars += SYMBOLS) : "";
  return generatePassword(length, chars);
};

const generatePassword = (length, chars) => {
  let password = "";

  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

module.exports = createPassword;