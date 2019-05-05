import { chain, Rule, noop, Tree, applyToSubtree, SchematicContext } from '@angular-devkit/schematics';
import {
  addModuleImportToModule,
  buildComponent,
  findModuleFromOptions,
} from '@angular/cdk/schematics';
import { dasherize } from '@angular-devkit/core/src/utils/strings';
import { RunSchematicTask } from '@angular-devkit/schematics/tasks';

import * as figlet from 'figlet';

import { Schema } from './schema';

/**
 * Scaffolds a new dashboard component.
 * Internally it bootstraps the base component schematic
 */
export default function(options: Schema): Rule {
  console.log(`\n${figlet.textSync('ng g dashboard')}\n`);
  const opts = {
    prefix: 'sample',
    path: `src/app/${dasherize(options.name)}/components`,
    workingDirectory: options.workingDirectory || undefined
  };
  const charts = ['bar', 'line', 'pie', 'radar', 'doughnut', 'polarArea'].map(type => (tree: Tree, _context: SchematicContext) => {
    _context.addTask(new RunSchematicTask('chart', {
      ...opts,
      name: `${type}Chart`,
      type
    }));
    return tree;
  });
  const otherComponents = ['menubar', 'table', 'sidebar'].map(name => (tree: Tree, _context: SchematicContext) => {
    _context.addTask(new RunSchematicTask(name, {
      ...opts,
      name
    }));
    return tree;
  });

  const rules: Rule[] = [
    buildComponent({ ...options }),
    options.skipImport ? noop() : addComponentModulesToModule(options),
    ...charts,
    ...otherComponents
  ];

  const wd = options.workingDirectory;
  return wd ? applyToSubtree(wd, rules) : chain(rules);
}

/**
 * Adds the required modules to the relative module.
 */
function addComponentModulesToModule(options: Schema) {
  return (host: Tree) => {
    const modulePath = findModuleFromOptions(host, options) || null;
    if (modulePath) {
      addModuleImportToModule(host, modulePath, 'PanelModule', 'primeng/panel');
    }
    return host;
  };
}
