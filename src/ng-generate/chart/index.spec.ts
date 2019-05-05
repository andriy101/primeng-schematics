import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { getFileContent } from '@schematics/angular/utility/test';
import { createTestApp } from '../../utils/testing';
import { Schema } from './schema';

describe('PrimeNG charts', () => {
  let runner: SchematicTestRunner;

  const baseOptions: Schema = {
    name: 'foo',
    project: 'prime-ng',
    type: 'line'
  };

  beforeEach(() => {
    runner = new SchematicTestRunner('schematics', require.resolve('../../collection.json'));
  });

  it('should add charts imports to module', () => {
    const tree = runner.runSchematic('bar-chart', baseOptions, createTestApp());
    const moduleContent = getFileContent(tree, '/src/app/app.module.ts');

    expect(moduleContent).toContain(`import { ChartModule } from 'primeng/chart';`);
  });
});