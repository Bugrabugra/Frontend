#!/usr/bin/env node
const program = require("commander");

// Import function to list coffee menu
const list = require("../lib/list");

// Import function to order a coffee
const order = require("../lib/order");

// Print coffee drinks menu
// $ coffee-shop list
// $ coffee-shop ls

program
  .command("list") // sub-command menu
  .alias("ls") // alternative sub-command is "ls"
  .description("list coffee menu") // command description

  // Function to execute when command is used
  .action(() => {
    list();
  });

// Order a coffee
// $ coffee-shop order
// $ coffee-shop o
program
  .command('order') // sub-command name
  .alias('o') // alternative sub-command is `o`
  .description('Order a coffee') // command description

  // function to execute when command is uses
  .action(() => {
    order();
  });

// Allow commander to parse "process.argv"
program.parse(process.argv);