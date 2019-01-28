"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const schematics_2 = require("@angular/cdk/schematics");
/**
 * Scaffolds a new menu bar component.
 * Internally it bootstraps the base component schematic
 */
function default_1(options) {
    return schematics_1.chain([
        schematics_2.buildComponent(Object.assign({}, options)),
        options['skipImport'] ? schematics_1.noop() : addComponentModulesToModule(options)
    ]);
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