"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular-devkit/schematics/testing");
const test_1 = require("@schematics/angular/utility/test");
const testing_2 = require("../../utils/testing");
describe('PrimeNG menubar', () => {
    let runner;
    const baseOptions = {
        name: 'foo',
        project: 'prime-ng',
    };
    beforeEach(() => {
        runner = new testing_1.SchematicTestRunner('schematics', require.resolve('../../collection.json'));
    });
    it('should add menubar imports to module', () => {
        const tree = runner.runSchematic('menubar', baseOptions, testing_2.createTestApp());
        const moduleContent = test_1.getFileContent(tree, '/src/app/app.module.ts');
        expect(moduleContent).toContain(`import { MenubarModule } from 'primeng/menubar';`);
        expect(moduleContent).toContain(`import { ButtonModule } from 'primeng/button';`);
        expect(moduleContent).toContain(`import { InputTextModule } from 'primeng/inputtext';`);
    });
});
//# sourceMappingURL=index.spec.js.map