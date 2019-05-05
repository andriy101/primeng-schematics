"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
const figlet = require("figlet");
/**
 * Combines Angular ng-new and PrimeNG ng-add schematics
 */
function default_1(options) {
    console.log(`\n${figlet.textSync('ng new')}\n`);
    const name = options['--'] && options['--'][0] || process.argv[3];
    const ngNewOptions = Object.assign({}, options, { skipInstall: true, name });
    delete ngNewOptions.project;
    delete ngNewOptions.workingDirectory;
    delete ngNewOptions.skipPackageJson;
    return schematics_1.chain([
        schematics_1.externalSchematic('@schematics/angular', 'ng-new', ngNewOptions),
        (tree, _context) => {
            _context.addTask(new tasks_1.RunSchematicTask('ng-add', Object.assign({}, options, { workingDirectory: name, addChartJs: true, addPrimeFlex: true })));
            return tree;
        }
    ]);
}
exports.default = default_1;
//# sourceMappingURL=index.js.map