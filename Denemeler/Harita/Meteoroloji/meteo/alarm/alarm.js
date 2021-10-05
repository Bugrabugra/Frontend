const cron = require("node-cron");

// # ┌────────────── second (optional)
// # │ ┌──────────── minute
// # │ │ ┌────────── hour
// # │ │ │ ┌──────── day of month
// # │ │ │ │ ┌────── month
// # │ │ │ │ │ ┌──── day of week
// # │ │ │ │ │ │
// # │ │ │ │ │ │
// # * * * * * *
let number = 0;
setInterval(() => {
  console.log(number);
  number++;
}, 1000);

const task = cron.schedule('*/1 * * * *', () => {
  console.log("test")
}, {});

task.start();
