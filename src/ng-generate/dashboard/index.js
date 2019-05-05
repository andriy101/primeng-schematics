"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const schematics_2 = require("@angular/cdk/schematics");
const strings_1 = require("@angular-devkit/core/src/utils/strings");
const tasks_1 = require("@angular-devkit/schematics/tasks");
const figlet = require("figlet");
/**
 * Scaffolds a new dashboard component.
 * Internally it bootstraps the base component schematic
 */
function default_1(options) {
    console.log(`\n${figlet.textSync('ng g dashboard')}\n`);
    const opts = {
        prefix: 'sample',
        path: `src/app/${strings_1.dasherize(options.name)}/components`,
        workingDirectory: options.workingDirectory || undefined
    };
    const charts = ['bar', 'line', 'pie', 'radar', 'doughnut', 'polarArea'].map(type => (tree, _context) => {
        _context.addTask(new tasks_1.RunSchematicTask('chart', Object.assign({}, opts, { name: `${type}Chart`, type })));
        return tree;
    });
    const otherComponents = ['menubar', 'table', 'sidebar'].map(name => (tree, _context) => {
        _context.addTask(new tasks_1.RunSchematicTask(name, Object.assign({}, opts, { name })));
        return tree;
    });
    const rules = [
        schematics_2.buildComponent(Object.assign({}, options)),
        options.skipImport ? schematics_1.noop() : addComponentModulesToModule(options),
        ...charts,
        ...otherComponents
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
            schematics_2.addModuleImportToModule(host, modulePath, 'PanelModule', 'primeng/panel');
        }
        return host;
    };
}
//# sourceMappingURL=index.js.map