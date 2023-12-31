#! /usr/bin/env node
const yargs = require("yargs");
const usage = "\nUsage: eri <flag> <args>";
const options = yargs
  .usage(usage)
  .option("i", {
    alias: "inquire",
    describe: "Inquire about item",
    type: "string",
    demandOption: false,
  })
  .help(true).argv;

if (yargs.argv.i || yargs.argv.inquire) {
  console.log(yargs.argv.i);
}
