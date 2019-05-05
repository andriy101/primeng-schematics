"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const schematics_2 = require("@angular/cdk/schematics");
const figlet = require("figlet");
/**
 * Scaffolds a new menu bar component.
 * Internally it bootstraps the base component schematic
 */
function default_1(options) {
    console.log(`\n${figlet.textSync('ng g menubar')}\n`);
    const rules = [
        schematics_2.buildComponent(Object.assign({}, options)),
        options.skipImport ? schematics_1.noop() : addComponentModulesToModule(options)
    ];
    const wd = options.workingDirectory;
    return wd ? schematics_1.applyToSubtree(wd, rules) : schematics_1.chain(rules);
}
exports.default = default_1;
/**
 * Adds the required modules to the relative module.
 */
function addComponentModulesToModule(options) {
    return (host) => {
        const modulePath = schematics_2.findModuleFromOptions(host, options) || null;
        if (modulePath) {
            schematics_2.addModuleImportToModule(host, modulePath, 'MenubarModule', 'primeng/menubar');
            schematics_2.addModuleImportToModule(host, modulePath, 'ButtonModule', 'primeng/button');
            schematics_2.addModuleImportToModule(host, modulePath, 'InputTextModule', 'primeng/inputtext');
        }
        return host;
    };
}
//# sourceMappingURL=index.js.map