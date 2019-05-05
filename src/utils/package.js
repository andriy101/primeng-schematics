"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Adds a package to the package.json
 */
function addPackageToPackageJson(tree, type, pkg, version) {
    if (tree.exists('package.json')) {
        const sourceText = tree.read('package.json').toString('utf-8');
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
exports.addPackageToPackageJson = addPackageToPackageJson;
/**
 * Adds a png alias to the package.json's scripts
 */
function addPngAliasToPackageJson(tree) {
    if (tree.exists('package.json')) {
        const sourceText = tree.read('package.json').toString('utf-8');
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
exports.addPngAliasToPackageJson = addPngAliasToPackageJson;
//# sourceMappingURL=package.js.map