const fs = require("fs");
const path = require("path");
const os = require("os");
const chalk = require("chalk");


const savePassword = (password) => {
  fs.open(path.join(__dirname, "../", "passwords.txt"), "a", 666, (error, id) => {
    fs.write(id, password + os.EOL, null, "utf-8", () => {
      fs.close(id, () => {
        console.log(chalk.red("Password saved to passwords.txt"));
      })
    })
  });
};

module.exports = savePassword;