module.exports = {
    processQuery: processQuery,
    printData: printData,
    printComparison: printComparison,
};

const chalk = require('chalk');

const name = chalk.bold.underline;
const quote = chalk.italic;
const attrName = chalk.bold.yellow;

const erapi = 'https://eldenring.fanapis.com/api/';

async function processQuery(name, type) {
    let url = `${erapi}${type}?name=${encodeURIComponent(name)}`;
    let info = await grabInfo(url);
    return info;
}

async function grabInfo(url) {
    try {
        let response = await fetch(url);
        let info = await response.json();
        return info;
    } catch (error) {
        console.log(`E01: Failed to fetch ${url}`);
        return;
    }
}

function printData(info, args) {
    if (info.data.length === 0) {
        console.log('E02: Found no data for request')
        return;
    }

    for (const data in info.data) {
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~\n');
        for (const category in info.data[data]) {
            if (args.has(category)) {
                const categoryData = info.data[data][category];
                if (!categoryData) {
                    continue;
                } else if (categoryData.constructor === Array) {
                    printFromList(category, categoryData);
                } else if (categoryData.constructor === Object) {
                    printFromObject(category, categoryData);
                } else {
                    printField(category, categoryData);
                }
                console.log();
            }
        }
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~');
    }
}

function printComparison(first, second, args) {
    if (first.data.length === 0) {
        console.log(`E03: Found no data for argument "${first.request}" of \`-c\` request`);
        return;
    } else if (second.data.length === 0) {
        console.log(`E03: Found no data for argument "${second.request}" of \`-c\` request`);
        return;
    }

    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~');
    for (const category in first.data[0]) {
        if (args.has(category)) {
            const firstData = first.data[0][category];
            const secondData = second.data[0][category];
            if (!firstData || !secondData) {
                continue;
            } else if (firstData.constructor === Array) {
                printFromList(category, firstData, secondData);
            } else if (firstData.constructor === Object) {
                printFromObject(category, firstData, secondData);
            } else {
                printField(category, firstData, secondData);
            }
            console.log();
        }
    }
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~');
}

function printFromList(categoryName, categoryList, optList) {
    const updatedCategoryName = correctName(categoryName);
    console.log(attrName(`${updatedCategoryName}:`));

    for (const element in categoryList) {
        if (categoryList[element].constructor === Object) {
            for (const attribute in categoryList[element]) {
                const catData = categoryList[element][attribute] === null ?
                    0 : categoryList[element][attribute];
                const optData = optList && optList[element] ?
                    optList[element][attribute] : undefined;

                const corrCatData = attribute === 'name' && catData.length > 5 ? catData.slice(0, 5) : catData;
                process.stdout.write(`\t${corrCatData}`);

                if (typeof optData != 'undefined') {
                    if (attribute === 'amount' || attribute === 'scaling') {
                        const highlight = determineColoring(catData, optData, categoryName);
                        process.stdout.write(`\t<>\t${highlight(optData)}`);
                    }
                } else if (optList) {
                    if (attribute !== 'name') {
                        process.stdout.write(`\t<>\t${chalk.green('N/A')}`);
                    }
                }
            }
        } else {
            process.stdout.write(`\t${categoryList[element]}`)
            if (optList && typeof optList[element] != 'undefined') {
                process.stdout.write(`  <>  ${optList[element]}`);
            }
        }
        console.log();
    }

    if (optList && (optList.length > categoryList.length)) {
        for (let index = categoryList.length; index < optList.length; index++) {
            if (optList[index].constructor === Object) {
                for (const attribute in optList[index]) {
                    const optData = optList[index][attribute];

                    if (attribute !== 'name') {
                        process.stdout.write(`\tN/A\t<>`);
                    }

                    const highlight = attribute === 'name' ?
                        chalk.reset : categoryName === 'scalesWith' ?
                            chalk.green : chalk.red;
                    process.stdout.write(`\t${highlight(optData)}`);
                }
            } else {
                process.stdout.write(`N/A  <>  ${optList[index]}`);
            }
        }
        console.log();
    }
}

function printFromObject(categoryName, categoryObj, optObj) {
    const updatedCategoryName = correctName(categoryName);
    console.log(attrName(`${updatedCategoryName}:`));

    for (const attribute in categoryObj) {
        process.stdout.write(`\t${attribute.slice(0, 5)} \t${categoryObj[attribute]}`);

        if (typeof optObj != 'undefined') {
            const highlight = determineColoring(categoryObj[attribute], optObj[attribute], categoryName);
            process.stdout.write(`\t<>\t${highlight(optObj[attribute])}`);
        }
        console.log();
    }
}

function printField(categoryName, categoryData, optData) {
    switch (categoryName) {
        case "name":
            process.stdout.write(name(categoryData));

            if (optData) {
                process.stdout.write(` <> ${name(optData)}`);
            }

            console.log();
            break;
        case "quote":
            console.log(quote(`"${categoryData}"`));

            if (optData) {
                console.log(`\n${quote(`"${optData}"`)}`);
            }

            break;
        case "location":
            process.stdout.write(`${attrName('Located @ ')}${categoryData}`);

            if (optData) {
                process.stdout.write(` and ${optData}`);
            }

            console.log();
            break;
        default:
            const updatedCategoryName = correctName(categoryName);
            process.stdout.write(`${attrName(`${updatedCategoryName}:`)} ${categoryData}`);

            if (typeof optData != 'undefined') {
                const highlight = determineColoring(categoryData, optData, categoryName);
                process.stdout.write(` <> ${highlight(optData)}`);
            }

            console.log();
            break;
    }
}

function correctName(name) {
    switch (name) {
        case "attackPower":
            return "Attack Power";
        case "dmgNegation":
            return "Damage Negation";
        case "healthPoints":
            return "HP";
        case "defence":
            return "Defense";
        case "requiredAttributes":
            return "Requirements";
        case "scalesWith":
            return "Scales With";
        case "fpCost":
            return "FP Cost";
        case "hpCost":
            return "HP Cost";
        default:
            return `${name.substring(0, 1).toUpperCase()}${name.substring(1)}`
    }
}

const coloringBlacklist = new Set([
    'description', 'category', 'effects', 'type', 'location',
    'quote', 'drops', 'affinity', 'skill', 'passive']);
const coloringInvertList = new Set(['scalesWith', 'requiredAttributes']);
function determineColoring(first, second, category) {
    if (first === second || coloringBlacklist.has(category)) {
        return chalk.reset;
    } else if (coloringInvertList.has(category)) {
        return first > second ? chalk.green : chalk.red;
    } else {
        return first > second ? chalk.red : chalk.green;
    }
}

