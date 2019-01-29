"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular-devkit/schematics/testing");
const test_1 = require("@schematics/angular/utility/test");
const testing_2 = require("../../utils/testing");
describe('PrimrNG sidebar', () => {
    let runner;
    const baseOptions = {
        name: 'foo',
        project: 'prime-ng',
    };
    beforeEach(() => {
        runner = new testing_1.SchematicTestRunner('schematics', require.resolve('../../collection.json'));
    });
    it('should create sidebar files and add them to module', () => {
        const tree = runner.runSchematic('primengSidebar', Object.assign({}, baseOptions), testing_2.createTestApp());
        const files = tree.files;
        expect(files).toContain('/src/app/foo/foo.component.css');
        expect(files).toContain('/src/app/foo/foo.component.html');
        expect(files).toContain('/src/app/foo/foo.component.spec.ts');
        expect(files).toContain('/src/app/foo/foo.component.ts');
        const moduleContent = test_1.getFileContent(tree, '/src/app/app.module.ts');
        expect(moduleContent).toMatch(/import.*Foo.*from '.\/foo\/foo.component'/);
        expect(moduleContent).toMatch(/declarations:\s*\[[^\]]+?,\r?\n\s+FooComponent\r?\n/m);
    });
    it('should add sidebar imports to module', () => {
        const tree = runner.runSchematic('primengSidebar', Object.assign({}, baseOptions), testing_2.createTestApp());
        const moduleContent = test_1.getFileContent(tree, '/src/app/app.module.ts');
        expect(moduleContent).toContain('SidebarModule');
        expect(moduleContent).toContain('ButtonModule');
    });
});
//# sourceMappingURL=index.spec.js.map