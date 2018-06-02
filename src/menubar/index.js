"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const ast_1 = require("../utils/ast");
const component_1 = require("../utils/devkit-utils/component");
/**
 * Scaffolds a new menu bar component.
 * Internally it bootstraps the base component schematic
 */
function default_1(options) {
    return schematics_1.chain([
        component_1.buildComponent(Object.assign({}, options)),
        options['skipImport'] ? schematics_1.noop() : addMenubarModulesToModule(options)
    ]);
}
exports.default = default_1;
/**
 * Adds the required modules to the relative module.
 */
function addMenubarModulesToModule(options) {
    return (host) => {
        const modulePath = ast_1.findModuleFromOptions(host, options) || null;
        if (modulePath) {
            ast_1.addModuleImportToModule(host, modulePath, 'MenubarModule', 'primeng/menubar');
            ast_1.addModuleImportToModule(host, modulePath, 'ButtonModule', 'primeng/button');
            ast_1.addModuleImportToModule(host, modulePath, 'InputTextModule', 'primeng/inputtext');
        }
        return host;
    };
}
//# sourceMappingURL=index.js.map