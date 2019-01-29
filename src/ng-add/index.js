"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
const config_1 = require("@schematics/angular/utility/config");
const schematics_2 = require("@angular/cdk/schematics");
const schematics_3 = require("@angular/cdk/schematics");
const package_1 = require("../utils/package");
const theming_1 = require("./theming");
const versions_1 = require("../utils/versions");
/**
 * Scaffolds the basics of a PrimeNG application, this includes:
 *  - Add Packages to package.json
 *  - Adds pre-built themes to styles.ext
 *  - Adds Browser Animation to app.momdule
 */
function default_1(options) {
    return schematics_1.chain([
        options && options.skipPackageJson ? schematics_1.noop() : addPrimengToPackageJson(),
        theming_1.addThemeToAppStyles(options),
        addAnimationRootConfig(options)
    ]);
}
exports.default = default_1;
/**
 * Add primeng packages to package.json if not already present.
 */
function addPrimengToPackageJson() {
    return (host, context) => {
        package_1.addPackageToPackageJson(host, 'dependencies', '@angular/animations', versions_1.angularVersion);
        package_1.addPackageToPackageJson(host, 'dependencies', 'primeng', versions_1.primengVersion);
        package_1.addPackageToPackageJson(host, 'dependencies', 'primeicons', versions_1.primeiconsVersion);
        context.addTask(new tasks_1.NodePackageInstallTask());
        return host;
    };
}
/**
 * Add browser animation module to app.module.
 */
function addAnimationRootConfig(options) {
    return (host) => {
        const workspace = config_1.getWorkspace(host);
        const project = schematics_2.getProjectFromWorkspace(workspace, options.project);
        schematics_3.addModuleImportToRootModule(host, 'BrowserAnimationsModule', '@angular/platform-browser/animations', project);
        return host;
    };
}
//# sourceMappingURL=index.js.map