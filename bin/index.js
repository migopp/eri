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
    .option('c', {
        alias: 'compare',
        describe: 'Compare subjects: `-c <flag> <args>`',
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
    .option('ammo', {
        describe: 'Ammo inquiry',
        type: 'string',
        demandOption: false,
    })
    .option('armor', {
        describe: 'Armor inquiry',
        type: 'string',
        demandOption: false,
    })
    .option('ashe', {
        describe: 'Ashes of War inquiry',
        type: 'string',
        demandOption: false,
    })
    .option('boss', {
        describe: 'Boss inquiry',
        type: 'string',
        demandOption: false,
    })
    .option('class', {
        describe: 'Class inquiry',
        type: 'string',
        demandOption: false,
    })
    .option('creature', {
        describe: 'Creature inquiry',
        type: 'string',
        demandOption: false,
    })
    .option('incantation', {
        describe: 'Incantation inquiry',
        type: 'string',
        demandOption: false,
    })
    .option('item', {
        describe: 'Item inquiry',
        type: 'string',
        demandOption: false,
    })
    .option('location', {
        describe: 'Location inquiry',
        type: 'string',
        demandOption: false,
    })
    .option('npc', {
        describe: 'NPC inquiry',
        type: 'string',
        demandOption: false,
    })
    .option('shield', {
        describe: 'Shield inquiry',
        type: 'string',
        demandOption: false,
    })
    .option('sorcery', {
        describe: 'Sorcery inquiry',
        type: 'string',
        demandOption: false,
    })
    .option('spirit', {
        describe: 'Spirit inquiry',
        type: 'string',
        demandOption: false,
    })
    .option('talisman', {
        describe: 'Talisman inquiry',
        type: 'string',
        demandOption: false,
    })
    .option('weapon', {
        describe: 'Weapon inquiry',
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

if (yargs.argv.ammo) {
    const attr = new Set(['name', 'description', 'type', 'passive', 'attackPower']);
    eriProcess('ammo', 'ammos', attr);
}

if (yargs.argv.armor) {
    const attr = new Set(['name', 'description', 'category', 'weight', 'dmgNegation', 'resistance']);
    eriProcess('armor', 'armors', attr);
}

if (yargs.argv.ashe) {
    const attr = new Set(['name', 'description', 'affinity', 'skill']);
    eriProcess('ashe', 'ashes', attr);
}

if (yargs.argv.boss) {
    const attr = new Set(['name', 'description', 'location', 'drops', 'healthPoints']);
    eriProcess('boss', 'bosses', attr);
}

if (yargs.argv.class) {
    const attr = new Set(['name', 'description', 'stats']);
    eriProcess('class', 'classes', attr);
}

if (yargs.argv.creature) {
    const attr = new Set(['name', 'description', 'location', 'drops']);
    eriProcess('creature', 'creatures', attr);
}

if (yargs.argv.incantation) {
    const attr = new Set(['name', 'description', 'stats']);
    eriProcess('incantation', 'incantations', attr);
}

if (yargs.argv.item) {
    const attr = new Set(['name', 'description', 'type', 'effect']);
    eriProcess('item', 'items', attr);
}

if (yargs.argv.location) {
    const attr = new Set(['name', 'description']);
    eriProcess('location', 'locations', attr);
}

if (yargs.argv.npc) {
    const attr = new Set(['name', 'description', 'location', 'quote']);
    eriProcess('npc', 'npcs', attr);
}

if (yargs.argv.shield) {
    const attr = new Set(['name', 'description', 'category', 'weight', 'attack', 'defence', 'requiredAttributes', 'scalesWith']);
    eriProcess('shield', 'shields', attr);
}

if (yargs.argv.sorcery) {
    const attr = new Set(['name', 'description', 'type', 'cost', 'slots', 'effects', 'requires']);
    eriProcess('sorcery', 'sorceries', attr);
}

if (yargs.argv.spirit) {
    const attr = new Set(['name', 'description', 'fpCost', 'hpCost', 'effects']);
    eriProcess('spirit', 'spirits', attr);
}

if (yargs.argv.talisman) {
    const attr = new Set(['name', 'description', 'effects']);
    eriProcess('talisman', 'talismans', attr);
}

if (yargs.argv.weapon) {
    const attr = new Set(['name', 'description', 'category', 'weight', 'attack', 'defence', 'requiredAttributes', 'scalesWith']);
    eriProcess('weapon', 'weapons', attr);
}

function eriProcess(cat, pCat, attr) {
    if (yargs.argv.c || yargs.argv.compare) {
        process.processQuery(yargs.argv[cat], pCat).then(res => {
            const first = res;
            first['request'] = yargs.argv[cat];
            process.processQuery(yargs.argv._, pCat).then(res => {
                const second = res;
                second['request'] = yargs.argv._[0];
                process.printComparison(first, second, attr);
            })
        });
    } else {
        process
            .processQuery(yargs.argv[cat], pCat)
            .then((res) => process.printData(res, attr));
    }
}
