import { chain, noop, Rule, Tree, SchematicContext } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { getWorkspace } from '@schematics/angular/utility/config';
import { getProjectFromWorkspace } from '@angular/cdk/schematics';
import { addModuleImportToRootModule } from '@angular/cdk/schematics';

import { addPackageToPackageJson } from '../utils/package';
import { Schema } from './schema';
import { addThemeToAppStyles } from './theming';
import { 
  primengVersion, 
  primeiconsVersion, 
  angularVersion
} from '../utils/versions';


/**
 * Scaffolds the basics of a PrimeNG application, this includes:
 *  - Add Packages to package.json
 *  - Adds pre-built themes to styles.ext
 *  - Adds Browser Animation to app.momdule
 */
export default function(options: Schema): Rule {
  return chain([
    options && options.skipPackageJson ? noop() : addPrimengToPackageJson(),
    addThemeToAppStyles(options),
    addAnimationRootConfig(options)
  ]);
}

/**
 * Add primeng packages to package.json if not already present.
 */
function addPrimengToPackageJson() {
  return (host: Tree, context: SchematicContext) => {
    addPackageToPackageJson(host, 'dependencies', '@angular/animations', angularVersion);
    addPackageToPackageJson(host, 'dependencies', 'primeng', primengVersion);
    addPackageToPackageJson(host, 'dependencies', 'primeicons', primeiconsVersion);
    
    context.addTask(new NodePackageInstallTask());
    return host;
  };
}

/**
 * Add browser animation module to app.module.
 */
function addAnimationRootConfig(options: Schema) {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);

    addModuleImportToRootModule(
        host,
        'BrowserAnimationsModule',
        '@angular/platform-browser/animations',
        project);

    return host;
  };
}

