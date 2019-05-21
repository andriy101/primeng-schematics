"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
const config_1 = require("@schematics/angular/utility/config");
const schematics_2 = require("@angular/cdk/schematics");
const schematics_3 = require("@angular/cdk/schematics");
const figlet = require("figlet");
const package_1 = require("../utils/package");
const theming_1 = require("./theming");
const versions_1 = require("../utils/versions");
const utils_1 = require("../utils");
/**
 * Scaffolds the basics of a PrimeNG application, this includes:
 *  - Add Packages to package.json
 *  - Adds pre-built themes to styles.ext
 *  - Adds Browser Animation to app.momdule
 */
function default_1(options) {
    console.log(`\n${figlet.textSync('ng add')}\n`);
    const rules = [];
    if (options.changeThemeOnly) {
        rules.push(theming_1.importThemeInStyles(options.theme));
    }
    else {
        !options.skipPackageJson && rules.push(addPrimengToPackageJson(options));
        rules.push((tree) => package_1.addPngAliasToPackageJson(tree));
        rules.push(theming_1.addThemeToAppStyles(options));
        rules.push(addAnimationRootConfig(options));
        if (options.createSample) {
            rules.push(createSample(options));
            if (options.workingDirectory) {
                rules.push(theming_1.modifyAppComponentTemplate());
                rules.push((tree) => overwriteAppSpecFile(options, tree));
            }
        }
        options.setDefaultCollection && rules.push((tree) => utils_1.addDefaultCli(tree));
    }
    const wd = options.workingDirectory;
    return wd ? schematics_1.applyToSubtree(wd, rules) : schematics_1.chain(rules);
}
exports.default = default_1;
/**
 * overwrite app.component.spec.ts file
 */
function overwriteAppSpecFile(options, tree) {
    const path = 'src/app';
    const specFilePath = `${path}/app.component.spec.ts`;
    if (tree.exists(specFilePath)) {
        tree.delete(specFilePath);
        return schematics_1.mergeWith(schematics_1.apply(schematics_1.url('./files'), [
            // forEach((file: FileEntry) => {
            //   const filePath = `${path}${file.path}`;
            //   if (tree.exists(filePath)) {
            //     tree.delete(filePath);
            //   }
            //   return file;
            // }),
            schematics_1.template(Object.assign({}, options, { routing: false, name: options.workingDirectory })),
            schematics_1.move(path)
        ]));
    }
}
/**
 * Add primeng packages to package.json if not already present.
 */
function addPrimengToPackageJson(options) {
    return (tree, context) => {
        package_1.addPackageToPackageJson(tree, 'dependencies', '@angular/animations', versions_1.versions.angular);
        package_1.addPackageToPackageJson(tree, 'dependencies', '@angular/cdk', versions_1.versions.angular);
        package_1.addPackageToPackageJson(tree, 'dependencies', 'primeng', versions_1.versions.primeng);
        package_1.addPackageToPackageJson(tree, 'dependencies', 'primeicons', versions_1.versions.primeicons);
        if (options.addChartJs) {
            package_1.addPackageToPackageJson(tree, 'dependencies', 'chart.js', versions_1.versions.chartjs);
        }
        if (options.addPrimeFlex) {
            package_1.addPackageToPackageJson(tree, 'dependencies', 'primeflex', versions_1.versions.primeflex);
        }
        if (options.addPrimengSchematics) {
            package_1.addPackageToPackageJson(tree, 'dependencies', 'primeng-schematics', versions_1.versions.primengSchematics);
        }
        context.addTask(new tasks_1.NodePackageInstallTask(options.workingDirectory || undefined));
        return tree;
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
/**
 * Add browser animation module to app.module.
 */
function createSample(options) {
    const dashboardOptions = {
        prefix: 'sample',
        name: 'dashboard'
    };
    options.workingDirectory && (dashboardOptions.workingDirectory = options.workingDirectory);
    return (tree, _context) => {
        _context.addTask(new tasks_1.RunSchematicTask('dashboard', dashboardOptions));
        return tree;
    };
}
//# sourceMappingURL=index.js.map