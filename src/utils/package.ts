import { Tree } from '@angular-devkit/schematics';

/**
 * Adds a package to the package.json
 */
export function addPackageToPackageJson(tree: Tree, type: string, pkg: string, version: string): Tree {
  if (tree.exists('package.json')) {
    const sourceText = tree.read('package.json')!.toString('utf-8');
    const json = JSON.parse(sourceText);
    if (!json[type]) {
      json[type] = {};
    }

    if (!json[type][pkg]) {
      json[type][pkg] = version;
    }

    tree.overwrite('package.json', JSON.stringify(json, null, 2));
  }

  return tree;
}

/**
 * Adds a png alias to the package.json's scripts
 */
export function addPngAliasToPackageJson(tree: Tree): Tree {
  if (tree.exists('package.json')) {
    const sourceText = tree.read('package.json')!.toString('utf-8');
    const json = JSON.parse(sourceText);
    if (!json.scripts) {
      json.scripts = {};
    }

    if (!json.scripts.png) {
      json.scripts.png = 'png';
    }

    tree.overwrite('package.json', JSON.stringify(json, null, 2));
  }

  return tree;
}
