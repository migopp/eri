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
        describe: 'Compare subjects',
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
    if (yargs.argv.c || yargs.argv.compare) {
        process.processQuery(yargs.argv.ammo, 'ammos').then(res => {
            const first = res;
            process.processQuery(yargs.argv._, 'ammos').then(res => {
                const second = res;
                process.printComparison(first, second, attr);
            })
        });
    } else {
        process
            .processQuery(yargs.argv.ammo, 'ammos')
            .then((res) => process.printData(res, attr));
    }
}

if (yargs.argv.armor) {
    const attr = new Set(['name', 'description', 'category', 'weight', 'dmgNegation', 'resistance']);
    if (yargs.argv.c || yargs.argv.compare) {
        process.processQuery(yargs.argv.armor, 'armors').then(res => {
            const first = res;
            process.processQuery(yargs.argv._, 'armors').then(res => {
                const second = res;
                process.printComparison(first, second, attr);
            })
        });
    } else {
        process
            .processQuery(yargs.argv.armor, 'armors')
            .then((res) => process.printData(res, attr));
    }
}

if (yargs.argv.ashe) {
    const attr = new Set(['name', 'description', 'affinity', 'skill']);
    if (yargs.argv.c || yargs.argv.compare) {
        process.processQuery(yargs.argv.ashe, 'ashes').then(res => {
            const first = res;
            process.processQuery(yargs.argv._, 'ashes').then(res => {
                const second = res;
                process.printComparison(first, second, attr);
            })
        });
    } else {
        process
            .processQuery(yargs.argv.ashe, 'ashes')
            .then((res) => process.printData(res, attr));
    }
}

if (yargs.argv.boss) {
    const attr = new Set(['name', 'description', 'location', 'drops', 'healthPoints']);
    if (yargs.argv.c || yargs.argv.compare) {
        process.processQuery(yargs.argv.boss, 'bosses').then(res => {
            const first = res;
            first['request'] = yargs.argv.boss;
            process.processQuery(yargs.argv._, 'bosses').then(res => {
                const second = res;
                second['request'] = yargs.argv._;
                process.printComparison(first, second, attr);
            })
        });
    } else {
        process
            .processQuery(yargs.argv.boss, 'bosses')
            .then((res) => process.printData(res, attr));
    }
}

if (yargs.argv.class) {
    const attr = new Set(['name', 'description', 'stats']);
    if (yargs.argv.c || yargs.argv.compare) {
        process.processQuery(yargs.argv.class, 'classes').then(res => {
            const first = res;
            process.processQuery(yargs.argv._, 'classes').then(res => {
                const second = res;
                process.printComparison(first, second, attr);
            })
        });
    } else {
        process
            .processQuery(yargs.argv.class, 'classes')
            .then((res) => process.printData(res, attr));
    }
}

if (yargs.argv.creature) {
    const attr = new Set(['name', 'description', 'location', 'drops']);
    if (yargs.argv.c || yargs.argv.compare) {
        process.processQuery(yargs.argv.creature, 'creatures').then(res => {
            const first = res;
            process.processQuery(yargs.argv._, 'creatures').then(res => {
                const second = res;
                process.printComparison(first, second, attr);
            })
        });
    } else {
        process
            .processQuery(yargs.argv.creature, 'creatures')
            .then((res) => process.printData(res, attr));
    }
}

if (yargs.argv.incantation) {
    const attr = new Set(['name', 'description', 'stats']);
    if (yargs.argv.c || yargs.argv.compare) {
        process.processQuery(yargs.argv.class, 'classes').then(res => {
            const first = res;
            process.processQuery(yargs.argv._, 'classes').then(res => {
                const second = res;
                process.printComparison(first, second, attr);
            })
        });
    } else {
        process
            .processQuery(yargs.argv.class, 'classes')
            .then((res) => process.printData(res, attr));
    }

    process.processQuery(yargs.argv.incantation, 'incantations').then((res) => process.printData(
        res,
        new Set(['name', 'description', 'type', 'cost', 'slots', 'effects', 'requires'])
    ));
}

if (yargs.argv.item) {
    const attr = new Set(['name', 'description', 'type', 'effect']);
    if (yargs.argv.c || yargs.argv.compare) {
        process.processQuery(yargs.argv.item, 'items').then(res => {
            const first = res;
            process.processQuery(yargs.argv._, 'items').then(res => {
                const second = res;
                process.printComparison(first, second, attr);
            })
        });
    } else {
        process
            .processQuery(yargs.argv.item, 'items')
            .then((res) => process.printData(res, attr));
    }
}

if (yargs.argv.location) {
    const attr = new Set(['name', 'description']);
    if (yargs.argv.c || yargs.argv.compare) {
        process.processQuery(yargs.argv.location, 'locations').then(res => {
            const first = res;
            process.processQuery(yargs.argv._, 'locations').then(res => {
                const second = res;
                process.printComparison(first, second, attr);
            })
        });
    } else {
        process
            .processQuery(yargs.argv.location, 'locations')
            .then((res) => process.printData(res, attr));
    }
}

if (yargs.argv.npc) {
    const attr = new Set(['name', 'description', 'location', 'quote']);
    if (yargs.argv.c || yargs.argv.compare) {
        process.processQuery(yargs.argv.npc, 'npcs').then(res => {
            const first = res;
            process.processQuery(yargs.argv._, 'npcs').then(res => {
                const second = res;
                process.printComparison(first, second, attr);
            })
        });
    } else {
        process
            .processQuery(yargs.argv.npc, 'npcs')
            .then((res) => process.printData(res, attr));
    }
}

if (yargs.argv.shield) {
    const attr = new Set(['name', 'description', 'category', 'weight', 'attack', 'defence', 'requiredAttributes', 'scalesWith']);
    if (yargs.argv.c || yargs.argv.compare) {
        process.processQuery(yargs.argv.shield, 'shields').then(res => {
            const first = res;
            process.processQuery(yargs.argv._, 'shields').then(res => {
                const second = res;
                process.printComparison(first, second, attr);
            })
        });
    } else {
        process
            .processQuery(yargs.argv.shield, 'shields')
            .then((res) => process.printData(res, attr));
    }
}

if (yargs.argv.sorcery) {
    const attr = new Set(['name', 'description', 'type', 'cost', 'slots', 'effects', 'requires']);
    if (yargs.argv.c || yargs.argv.compare) {
        process.processQuery(yargs.argv.sorcery, 'sorceries').then(res => {
            const first = res;
            process.processQuery(yargs.argv._, 'sorceries').then(res => {
                const second = res;
                process.printComparison(first, second, attr);
            })
        });
    } else {
        process
            .processQuery(yargs.argv.sorcery, 'sorceries')
            .then((res) => process.printData(res, attr));
    }
}

if (yargs.argv.spirit) {
    const attr = new Set(['name', 'description', 'fpCost', 'hpCost', 'effects']);
    if (yargs.argv.c || yargs.argv.compare) {
        process.processQuery(yargs.argv.spirit, 'spirits').then(res => {
            const first = res;
            process.processQuery(yargs.argv._, 'spirit').then(res => {
                const second = res;
                process.printComparison(first, second, attr);
            })
        });
    } else {
        process
            .processQuery(yargs.argv.spirit, 'spirits')
            .then((res) => process.printData(res, attr));
    }
}

if (yargs.argv.talisman) {
    const attr = new Set(['name', 'description', 'effects']);
    if (yargs.argv.c || yargs.argv.compare) {
        process.processQuery(yargs.argv.talisman, 'talismans').then(res => {
            const first = res;
            process.processQuery(yargs.argv._, 'talismans').then(res => {
                const second = res;
                process.printComparison(first, second, attr);
            })
        });
    } else {
        process
            .processQuery(yargs.argv.talisman, 'talismans')
            .then((res) => process.printData(res, attr));
    }
}

if (yargs.argv.weapon) {
    const attr = new Set(['name', 'description', 'category', 'weight', 'attack', 'defence', 'requiredAttributes', 'scalesWith']);
    if (yargs.argv.c || yargs.argv.compare) {
        process.processQuery(yargs.argv.weapon, 'weapons').then(res => {
            const first = res;
            process.processQuery(yargs.argv._, 'weapons').then(res => {
                const second = res;
                process.printComparison(first, second, attr);
            })
        });
    } else {
        process
            .processQuery(yargs.argv.weapon, 'weapons')
            .then((res) => process.printData(res, attr));
    }
}
