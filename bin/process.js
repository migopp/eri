module.exports = {
    processQuery: processQuery,
    printData: printData,
};

const chalk = require('chalk');

const name = chalk.bold.underline;
const quote = chalk.italic;
const attrName = chalk.bold.red;

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
    for (const data in info.data) {
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~\n');
        for (const category in info.data[data]) {
            if (args.has(category)) {
                const categoryData = info.data[data][category];
                if (!categoryData) {
                    continue;
                } else if (categoryData.constructor === Array) {
                    printFromObjectList(category, categoryData);
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

function printFromObjectList(categoryName, categoryObjList) {
    const updatedCategoryName = correctName(categoryName);
    console.log(attrName(`${updatedCategoryName}:`));
    for (const categoryObj in categoryObjList) {
        for (const attribute in categoryObjList[categoryObj]) {
            process.stdout.write(`\t${categoryObjList[categoryObj][attribute]} `);
        }
        console.log();
    }
}

function printFromObject(categoryName, categoryObj) {
    const updatedCategoryName = correctName(categoryName);
    console.log(attrName(`${updatedCategoryName}:`));
    for (const attribute in categoryObj) {
        process.stdout.write(`\t${attribute.slice(0, 5)} \t${categoryObj[attribute]}`);
        console.log();
    }
}

function printField(categoryName, categoryData) {
    switch (categoryName) {
        case "name":
            console.log(name(categoryData));
            break;
        case "quote":
            console.log(quote(`"${categoryData}"`));
            break;
        case "location":
            console.log(`${attrName('Located @ ')}${categoryData}`);
            break;
        default:
            const updatedCategoryName = correctName(categoryName);
            console.log(`${attrName(`${updatedCategoryName}:`)} ${categoryData}`);
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
