import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { getSourceNodes } from '@schematics/angular/utility/ast-utils';
import { getProjectFromWorkspace, getSourceFile } from '@angular/cdk/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { properties } from '@schematics/angular/ng-new/schema.json';
import { WorkspaceProject, WorkspaceSchema } from '@angular-devkit/core/src/workspace';

import * as ts from 'typescript';

import { Schema } from './schema';

/**
 * Add pre-built styles to the main project style file.
 */
export function addThemeToAppStyles(options: Schema): (tree: Tree) => Tree {
  
  return function(tree: Tree): Tree {
    const workspace = getWorkspace(tree);
    const project = getProjectFromWorkspace(workspace, options.project);

    // Because the build setup for the Angular CLI can be changed so dramatically, we can't know
    // where to generate anything if the project is not using the default config for build and test.
    assertDefaultProjectConfig(project);

    const themeName = options.theme || 'rhea';
    insertPrebuiltTheme(project, tree, themeName, workspace, {
      chartJs: !!options.addChartJs,
      primeFlex: !!options.addPrimeFlex
    });

    return tree;
  };
}

export function modifyAppComponentTemplate(): (tree: Tree) => Tree {
  return function(tree: Tree): Tree {
    const filePath = 'src/app/app.component.ts';
    if (tree.exists(filePath)) {
      const fileSource = getSourceFile(tree, filePath);
      getSourceNodes(fileSource).some((node: ts.Node | any) => {
        const name = 'name' in node && node.name.getText();
        if (node.kind === ts.SyntaxKind.PropertyAssignment && ['template', 'templateUrl'].includes(name)) {
          const content = '<sample-dashboard></sample-dashboard>';
          if (name === 'template') {
            const recorder = tree.beginUpdate(filePath);
            recorder.remove(node.getStart(), node.getWidth());
            recorder.insertRight(node.getStart(), `template: '${content}'`,);
            tree.commitUpdate(recorder);
          }
          else {
            const templateUrl = `src/app/${node.initializer.text}`;
            if (tree.exists(templateUrl)) {
              tree.overwrite(templateUrl, content);
            }
          }
          return true;
        }
        return false;
      });
    }
    return tree;
  };
}

/**
 * Add pre-built styles to the main project style file.
 */
export function importThemeInStyles(theme: string): (tree: Tree) => Tree {
  return function(tree: Tree): Tree {
    importThemeInStylesInner(tree, theme);
    return tree;
  };
}

function importThemeInStylesInner(tree: Tree, theme: string) {
  const cssExtensions = properties.style['x-prompt'].items.map((item: any) => item.value);
  cssExtensions.some((ext: string) => {
    const filePath = `src/styles.${ext}`;
    if (tree.exists(filePath)) {
      const fileSource = getSourceFile(tree, filePath);
      let themeImportFound = false;
      const themeImportText = `@import "~primeng/resources/themes/${theme}/theme.css";`;
      getSourceNodes(fileSource).forEach((node: ts.Node | any) => {
        if (node.kind === ts.SyntaxKind.ImportDeclaration && !node.moduleSpecifier.getText().includes(theme)) {
          const currentThemePath = node.moduleSpecifier.getText();
          // theme import found
          if (currentThemePath.includes('~primeng/resources/themes/')) {
            themeImportFound = true;
            // theme import contains different theme
            if (!currentThemePath.includes(theme)) {
              const recorder = tree.beginUpdate(filePath);
              recorder.remove(node.getStart(), node.getWidth());
              recorder.insertRight(node.getStart(), themeImportText);
              tree.commitUpdate(recorder);
            }
          }
        }
      });
      // no theme import found - insert it at the beginning
      if (!themeImportFound) {
        const recorder = tree.beginUpdate(filePath);
        recorder.insertRight(0, `${themeImportText}\n\n`);
        tree.commitUpdate(recorder);
      }
      return true;
    }
    return false;
  });
}

/**
 * Insert a pre-built theme and its dependencies into the angular.json file.
 */
function insertPrebuiltTheme(project: WorkspaceProject, tree: Tree, theme: string, workspace: WorkspaceSchema, addModules: {[key: string]: boolean} = {}) {
  importThemeInStylesInner(tree, theme);
  const themeFilePaths = [
    'node_modules/primeicons/primeicons.css',
    'node_modules/primeng/resources/primeng.min.css'
  ];

  if (project.architect) {
    themeFilePaths.forEach(filePath => {
      addStyleToTarget(project.architect!['build'], tree, filePath, workspace);
      addStyleToTarget(project.architect!['test'], tree, filePath, workspace);
    });

    if (addModules.chartJs) {
      const filePath = 'node_modules/chart.js/dist/Chart.js';
      addScriptToTarget(project.architect['build'], tree, filePath, workspace);
      addScriptToTarget(project.architect['test'], tree, filePath, workspace);
    }
    if (addModules.primeFlex) {
      const filePath = 'node_modules/primeflex/primeflex.css';
      addStyleToTarget(project.architect['build'], tree, filePath, workspace);
      addStyleToTarget(project.architect['test'], tree, filePath, workspace);
    }
  } else {
    throw new SchematicsException('The project does not have an architect configuration');
  }
}

/**
 * Adds a style entry to the given target.
 */
function addStyleToTarget(target: any, tree: Tree, asset: string, workspace: WorkspaceSchema) {
  const styleEntry = {input: asset};

  // We can't assume that any of these properties are defined, so safely add them as we go
  // if necessary.
  if (!target.options) {
    target.options = {styles: [styleEntry]};
  } else if (!target.options.styles) {
    target.options.styles = [styleEntry];
  } else {
    const existingStyles = target.options.styles.map((s: any) => typeof s === 'string' ? s : s.input);
    const hasGivenTheme = existingStyles.find((s: any) => s.includes(asset));

    if (!hasGivenTheme) {
      target.options.styles.splice(0, 0, styleEntry);
    }
  }

  tree.overwrite('angular.json', JSON.stringify(workspace, null, 2));
}

/**
 * Adds a style entry to the given target.
 */
function addScriptToTarget(target: any, tree: Tree, asset: string, workspace: WorkspaceSchema) {
  const entry = {input: asset};

  // We can't assume that any of these properties are defined, so safely add them as we go
  // if necessary.
  if (!target.options) {
    target.options = {scripts: [entry]};
  } else if (!target.options.scripts) {
    target.options.scripts = [entry];
  } else {
    const existingAssets = target.options.styles.map((s: any) => typeof s === 'string' ? s : s.input);
    const hasGivenAsset = existingAssets.find((s: any) => s.includes(asset));

    if (!hasGivenAsset) {
      target.options.scripts.splice(0, 0, entry);
    }
  }

  tree.overwrite('angular.json', JSON.stringify(workspace, null, 2));
}

/**
 * Throws if the project is not using the default build and test config.
 */
function assertDefaultProjectConfig(project: WorkspaceProject) {
  if (!isProjectUsingDefaultConfig(project)) {
    throw new SchematicsException('Your project is not using the default configuration for ' +
     'build and test. The Prime NG schematics can only be used with the default ' +
     'configuration');
  }
}

/**
 * Gets whether the Angular CLI project is using the default build configuration.
 */
function isProjectUsingDefaultConfig(project: WorkspaceProject) {
  const defaultBuilder = '@angular-devkit/build-angular:browser';

  return project.architect &&
      project.architect['build'] &&
      project.architect['build']['builder'] === defaultBuilder &&
      project.architect['test'] &&
      project.architect['build']['builder'] === defaultBuilder;
}
