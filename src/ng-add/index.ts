import { Rule, Tree, SchematicContext, applyToSubtree, chain, mergeWith, apply, url, template, move, FileEntry, forEach, MergeStrategy } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { getWorkspace } from '@schematics/angular/utility/config';
import { getProjectFromWorkspace } from '@angular/cdk/schematics';
import { addModuleImportToRootModule } from '@angular/cdk/schematics';
import { Schema as NgNewSchema } from '@schematics/angular/ng-new/schema';

import * as figlet from 'figlet';

import { addPackageToPackageJson, addPngAliasToPackageJson } from '../utils/package';
import { Schema } from './schema';
import { Schema as DashboardSchema} from '../ng-generate/dashboard/schema';
import { addThemeToAppStyles, importThemeInStyles, modifyAppComponentTemplate } from './theming';
import { versions } from '../utils/versions';
import { addDefaultCli } from '../utils';


/**
 * Scaffolds the basics of a PrimeNG application, this includes:
 *  - Add Packages to package.json
 *  - Adds pre-built themes to styles.ext
 *  - Adds Browser Animation to app.momdule
 */
export default function(options: Schema & NgNewSchema): Rule {
  console.log(`\n${figlet.textSync('ng add')}\n`);
  const rules: Rule[] = [];
  if (options.changeThemeOnly) {
    rules.push(importThemeInStyles(options.theme));
  }
  else {
    !options.skipPackageJson && rules.push(addPrimengToPackageJson(options));
    rules.push((tree: Tree): Tree => addPngAliasToPackageJson(tree));
    rules.push(addThemeToAppStyles(options));
    rules.push(addAnimationRootConfig(options)); 
    if (options.createSample) {
      rules.push(createSample(options));
      if (options.workingDirectory) {
        rules.push(modifyAppComponentTemplate());
        rules.push((tree: Tree): Tree => { 
          overwriteAppSpecFile(options, tree);
          return tree;
        });
      }
    }
    options.setDefaultCollection && rules.push((tree: Tree): Tree => addDefaultCli(tree));
  }

  const wd = options.workingDirectory;
  return wd ? applyToSubtree(wd, rules) : chain(rules);
}

/**
 * overwrite app.component.spec.ts file
 */
function overwriteAppSpecFile(options: Schema & NgNewSchema, tree: Tree) {
  const path = 'src/app';
  return mergeWith(apply(url('./files'), [
    forEach((file: FileEntry) => {
      const filePath = `${path}/${file.path}`;
      if (tree.exists(filePath)) {
        tree.overwrite(filePath, file.content);
      }
      return file;
    }),
    template({
      ...options,
      routing: tree.exists(`${path}/app-routing.module.ts`),
      name: options.workingDirectory
    }),
    move(path)
  ]), MergeStrategy.Overwrite);
}

/**
 * Add primeng packages to package.json if not already present.
 */
function addPrimengToPackageJson(options: Schema) {
  return (tree: Tree, context: SchematicContext) => {
    addPackageToPackageJson(tree, 'dependencies', '@angular/animations', versions.angular);
    addPackageToPackageJson(tree, 'dependencies', '@angular/cdk', versions.angular);
    addPackageToPackageJson(tree, 'dependencies', 'primeng', versions.primeng);
    addPackageToPackageJson(tree, 'dependencies', 'primeicons', versions.primeicons);

    if (options.addChartJs) {
      addPackageToPackageJson(tree, 'dependencies', 'chart.js', versions.chartjs);
    }
    if (options.addPrimeFlex) {
      addPackageToPackageJson(tree, 'dependencies', 'primeflex', versions.primeflex);
    }
    if (options.addPrimengSchematics) {
      addPackageToPackageJson(tree, 'dependencies', 'primeng-schematics', versions.primengSchematics);
    }
    
    context.addTask(new NodePackageInstallTask(options.workingDirectory || undefined));
    return tree;
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

/**
 * Add browser animation module to app.module.
 */
function createSample(options: Schema) {
  const dashboardOptions: DashboardSchema = {
    prefix: 'sample',
    name: 'dashboard'
  };
  options.workingDirectory && (dashboardOptions.workingDirectory = options.workingDirectory);
  
  return (tree: Tree, _context: SchematicContext) => {
    _context.addTask(new RunSchematicTask('dashboard', dashboardOptions));
    return tree;
  }
}