import { Tree } from "@angular-devkit/schematics";

const figlet = require('figlet');
const chalk = require('chalk');

/**
 * Adds a package to the package.json
 */
export function printSectionTitle(title: string, chalkFunc?: string) {
  title = figlet.textSync(title);
  console.log('');
  console.log(chalkFunc ? chalk[chalkFunc](title) : title);
  console.log('');
}

/**
 * Adds a default collection to angular.json
 */
export function addDefaultCli(tree: Tree): Tree {
  if (tree.exists('angular.json')) {
    const sourceText = tree.read('angular.json')!.toString('utf-8');
    const json = JSON.parse(sourceText);
    if (!json.cli) {
      json.cli = {};
    }
    json.cli.defaultCollection = 'primeng-schematics';

    tree.overwrite('angular.json', JSON.stringify(json, null, 2));
  }

  return tree;
}
