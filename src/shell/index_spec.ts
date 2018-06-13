import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { join } from 'path';
import { getFileContent } from '@schematics/angular/utility/test';
import { createTestApp } from '../utils/testing';

const collectionPath = join(__dirname, '../collection.json');

describe('primeng-shell-schematic', () => {
  let runner: SchematicTestRunner;
  let appTree: Tree;

  beforeEach(() => {
    appTree = createTestApp();
    runner = new SchematicTestRunner('schematics', collectionPath);
  });

  it('should update package.json', () => {
    const tree = runner.runSchematic('primeng-shell', {}, appTree);
    const packageJson = JSON.parse(getFileContent(tree, '/package.json'));

    expect(packageJson.dependencies['primeng']).toBeDefined();
    expect(packageJson.dependencies['font-awesome']).toBeDefined();
  });
});