"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const figlet = require('figlet');
const chalk = require('chalk');
/**
 * Adds a package to the package.json
 */
function printSectionTitle(title, chalkFunc) {
    title = figlet.textSync(title);
    console.log('');
    console.log(chalkFunc ? chalk[chalkFunc](title) : title);
    console.log('');
}
exports.printSectionTitle = printSectionTitle;
/**
 * Adds a default collection to angular.json
 */
function addDefaultCli(tree) {
    if (tree.exists('angular.json')) {
        const sourceText = tree.read('angular.json').toString('utf-8');
        const json = JSON.parse(sourceText);
        if (!json.cli) {
            json.cli = {};
        }
        json.cli.defaultCollection = 'primeng-schematics';
        tree.overwrite('angular.json', JSON.stringify(json, null, 2));
    }
    return tree;
}
exports.addDefaultCli = addDefaultCli;
//# sourceMappingURL=index.js.map