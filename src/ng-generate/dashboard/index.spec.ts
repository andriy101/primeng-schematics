import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { getFileContent } from '@schematics/angular/utility/test';
import { createTestApp } from '../../utils/testing';
import { Schema } from './schema';

describe('PrimeNG dashboard', () => {
  let runner: SchematicTestRunner;

  const baseOptions: Schema = {
    name: 'foo',
    project: 'prime-ng',
  };

  beforeEach(() => {
    runner = new SchematicTestRunner('schematics', require.resolve('../../collection.json'));
  });

  it('should add dashboard imports to module', () => {
    const tree = runner.runSchematic('menubar', baseOptions, createTestApp());
    const moduleContent = getFileContent(tree, '/src/app/app.module.ts');

    expect(moduleContent).toContain(`import { PanelModule } from 'primeng/panel';`);
  });
});