import { chain, Rule, noop, Tree } from '@angular-devkit/schematics';
import { Schema } from './schema';
import { addModuleImportToModule, findModuleFromOptions } from '../utils/ast';
import { buildComponent } from '../utils/devkit-utils/component';

/**
 * Scaffolds a new tree table component.
 * Internally it bootstraps the base component schematic
 */
export default function(options: Schema): Rule {
  return chain([
    buildComponent({ ...options }),
    options['skipImport'] ? noop() : addComponentModulesToModule(options)
  ]);
}

/**
 * Adds the required modules to the relative module.
 */
function addComponentModulesToModule(options: Schema) {
  return (host: Tree) => {
    const modulePath = findModuleFromOptions(host, options) || null;
    if (modulePath) {
      addModuleImportToModule(host, modulePath, 'TreeTableModule', 'primeng/treetable');
    }
    return host;
  };
}
