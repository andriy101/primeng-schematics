import { SchematicsException, Tree } from '@angular-devkit/schematics';
import {
  getProjectFromWorkspace,
  getWorkspace,
  Project,
  Workspace,
} from '../utils/devkit-utils/config';
import {Schema} from './schema';

/**
 * Add pre-built styles to the main project style file.
 */
export function addThemeToAppStyles(options: Schema): (host: Tree) => Tree {
  return function(host: Tree): Tree {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);

    // Because the build setup for the Angular CLI can be changed so dramatically, we can't know
    // where to generate anything if the project is not using the default config for build and test.
    assertDefaultProjectConfig(project);

    const themeName = options.theme || 'omega';
    insertPrebuiltTheme(project, host, themeName, workspace);

    return host;
  };
}

/**
 * Insert a pre-built theme and its dependencies into the angular.json file.
 */
function insertPrebuiltTheme(project: Project, host: Tree, theme: string, workspace: Workspace) {
  const themeFilePaths = [
    'node_modules/font-awesome/css/font-awesome.css',
    'node_modules/primeicons/primeicons.css',
    `node_modules/primeng/resources/themes/${theme}/theme.css`,
    'node_modules/primeng/resources/primeng.min.css'
  ];

  themeFilePaths.forEach(filePath => {
    if (project.architect) {
      addStyleToTarget(project.architect['build'], host, filePath, workspace);
      addStyleToTarget(project.architect['test'], host, filePath, workspace);
    } else {
      throw new SchematicsException(`${project.name} does not have an architect configuration`);
    }
  });
}

/**
 * Adds a style entry to the given target.
 */
function addStyleToTarget(target: any, host: Tree, asset: string, workspace: Workspace) {
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

  host.overwrite('angular.json', JSON.stringify(workspace, null, 2));
}

/**
 * Throws if the project is not using the default build and test config.
 */
function assertDefaultProjectConfig(project: Project) {
  if (!isProjectUsingDefaultConfig(project)) {
    throw new SchematicsException('Your project is not using the default configuration for ' +
     'build and test. The Prime NG schematics can only be used with the default ' +
     'configuration');
  }
}

/**
 * Gets whether the Angular CLI project is using the default build configuration.
 */
function isProjectUsingDefaultConfig(project: Project) {
  const defaultBuilder = '@angular-devkit/build-angular:browser';

  return project.architect &&
      project.architect['build'] &&
      project.architect['build']['builder'] === defaultBuilder &&
      project.architect['test'] &&
      project.architect['build']['builder'] === defaultBuilder;
}
