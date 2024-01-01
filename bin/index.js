#! /usr/bin/env node
const yargs = require('yargs');
const usage = '\nUsage: eri <flags> <args>';
const options = yargs
	.usage(usage)
	.option('h', {
		alias: 'help',
		describe: 'Show help',
		type: 'boolean',
		demandOption: false,
	})
	.option('about', {
		describe: 'About eri',
		type: 'boolean',
		demandOption: false,
	})
	.option('omen', {
		type: 'boolean',
		demandOption: false,
	})
	.option('i', {
		alias: 'item',
		describe: 'Item inquiry',
		type: 'string',
		demandOption: false,
	})
	.help(true).argv;
const art = require('./art.js');
const process = require('./process.js');

if (yargs.argv.about) {
	art.drawAbout();
}

if (yargs.argv.omen) {
	art.drawOmen();
}

if (yargs.argv.i || yargs.argv.item) {
	var item = yargs.argv.i || yargs.argv.item;
	process.processQuery(item, 'items');
}
