"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const ast_1 = require("../utils/ast");
const ast_2 = require("../utils/ast");
const component_1 = require("../utils/devkit-utils/component");
const os = require("os");
const asd = require('@schematics/angular/utility/ast-utils');
/**
 * Scaffolds a new menu bar component.
 * Internally it bootstraps the base component schematic
 */
function default_1(options) {
    return schematics_1.chain([
        component_1.buildComponent(Object.assign({}, options)),
        options['skipImport'] ? schematics_1.noop() : addComponentModulesToModule(options)
    ]);
}
exports.default = default_1;
/**
 * Adds the required modules to the relative module.
 */
function addComponentModulesToModule(options) {
    return (host) => {
        const modulePath = ast_1.findModuleFromOptions(host, options) || null;
        if (modulePath) {
            ast_1.addModuleImportToModule(host, modulePath, 'SidebarModule', 'primeng/sidebar');
            ast_1.addModuleImportToModule(host, modulePath, 'ButtonModule', 'primeng/button');
        
const fName = modulePath.replace('module.ts', 'component.spec.ts');
asd.insertAfterLastOccurrence(asd.getSourceNodes(fName), 'import { AppComponentXX } from \'./app.componentXX\;', fName);
    if (host.exists(fName)) {
        ast_1.addModuleImportToModule(host, fName, 'XXXXXXSidebarModule', 'XXXXXXprimeng/sidebar');
        // const sourceText = host.read(fName).toString('utf-8').split(os.EOL);
        // sourceText.unshift("import { NgModuleXX } from '@angular/coreXX';");
        // sourceText.unshift("");

        // host.overwrite(fName, sourceText.join(os.EOL));

ast_1.addModuleImportToModule(host, fName, 'ZZZZZZZ2222222', 'AAAAAAA2222222');
    }
        }
        return host;
    };
}
//# sourceMappingURL=index.js.map