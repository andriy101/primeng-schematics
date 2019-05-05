"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular-devkit/schematics/testing");
const test_1 = require("@schematics/angular/utility/test");
const testing_2 = require("../../utils/testing");
describe('PrimeNG dashboard', () => {
    let runner;
    const baseOptions = {
        name: 'foo',
        project: 'prime-ng',
    };
    beforeEach(() => {
        runner = new testing_1.SchematicTestRunner('schematics', require.resolve('../../collection.json'));
    });
    it('should add dashboard imports to module', () => {
        const tree = runner.runSchematic('menubar', baseOptions, testing_2.createTestApp());
        const moduleContent = test_1.getFileContent(tree, '/src/app/app.module.ts');
        expect(moduleContent).toContain(`import { PanelModule } from 'primeng/panel';`);
    });
});
//# sourceMappingURL=index.spec.js.map