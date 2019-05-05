"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const ast_utils_1 = require("@schematics/angular/utility/ast-utils");
const schematics_2 = require("@angular/cdk/schematics");
const config_1 = require("@schematics/angular/utility/config");
const schema_json_1 = require("@schematics/angular/ng-new/schema.json");
const ts = require("typescript");
/**
 * Add pre-built styles to the main project style file.
 */
function addThemeToAppStyles(options) {
    return function (tree) {
        const workspace = config_1.getWorkspace(tree);
        const project = schematics_2.getProjectFromWorkspace(workspace, options.project);
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
exports.addThemeToAppStyles = addThemeToAppStyles;
function modifyAppComponentTemplate() {
    return function (tree) {
        const filePath = 'src/app/app.component.ts';
        if (tree.exists(filePath)) {
            const fileSource = schematics_2.getSourceFile(tree, filePath);
            ast_utils_1.getSourceNodes(fileSource).some((node) => {
                const name = 'name' in node && node.name.getText();
                if (node.kind === ts.SyntaxKind.PropertyAssignment && ['template', 'templateUrl'].includes(name)) {
                    const content = '<sample-dashboard></sample-dashboard>';
                    if (name === 'template') {
                        const recorder = tree.beginUpdate(filePath);
                        recorder.remove(node.getStart(), node.getWidth());
                        recorder.insertRight(node.getStart(), `template: '${content}'`);
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
exports.modifyAppComponentTemplate = modifyAppComponentTemplate;
/**
 * Add pre-built styles to the main project style file.
 */
function importThemeInStyles(theme) {
    return function (tree) {
        importThemeInStylesInner(tree, theme);
        return tree;
    };
}
exports.importThemeInStyles = importThemeInStyles;
function importThemeInStylesInner(tree, theme) {
    const cssExtensions = schema_json_1.properties.style['x-prompt'].items.map((item) => item.value);
    cssExtensions.some((ext) => {
        const filePath = `src/styles.${ext}`;
        if (tree.exists(filePath)) {
            const fileSource = schematics_2.getSourceFile(tree, filePath);
            let themeImportFound = false;
            const themeImportText = `@import "~primeng/resources/themes/${theme}/theme.css";`;
            ast_utils_1.getSourceNodes(fileSource).forEach((node) => {
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
function insertPrebuiltTheme(project, tree, theme, workspace, addModules = {}) {
    importThemeInStylesInner(tree, theme);
    const themeFilePaths = [
        'node_modules/primeicons/primeicons.css',
        'node_modules/primeng/resources/primeng.min.css'
    ];
    if (project.architect) {
        themeFilePaths.forEach(filePath => {
            addStyleToTarget(project.architect['build'], tree, filePath, workspace);
            addStyleToTarget(project.architect['test'], tree, filePath, workspace);
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
    }
    else {
        throw new schematics_1.SchematicsException('The project does not have an architect configuration');
    }
}
/**
 * Adds a style entry to the given target.
 */
function addStyleToTarget(target, tree, asset, workspace) {
    const styleEntry = { input: asset };
    // We can't assume that any of these properties are defined, so safely add them as we go
    // if necessary.
    if (!target.options) {
        target.options = { styles: [styleEntry] };
    }
    else if (!target.options.styles) {
        target.options.styles = [styleEntry];
    }
    else {
        const existingStyles = target.options.styles.map((s) => typeof s === 'string' ? s : s.input);
        const hasGivenTheme = existingStyles.find((s) => s.includes(asset));
        if (!hasGivenTheme) {
            target.options.styles.splice(0, 0, styleEntry);
        }
    }
    tree.overwrite('angular.json', JSON.stringify(workspace, null, 2));
}
/**
 * Adds a style entry to the given target.
 */
function addScriptToTarget(target, tree, asset, workspace) {
    const entry = { input: asset };
    // We can't assume that any of these properties are defined, so safely add them as we go
    // if necessary.
    if (!target.options) {
        target.options = { scripts: [entry] };
    }
    else if (!target.options.scripts) {
        target.options.scripts = [entry];
    }
    else {
        const existingAssets = target.options.styles.map((s) => typeof s === 'string' ? s : s.input);
        const hasGivenAsset = existingAssets.find((s) => s.includes(asset));
        if (!hasGivenAsset) {
            target.options.scripts.splice(0, 0, entry);
        }
    }
    tree.overwrite('angular.json', JSON.stringify(workspace, null, 2));
}
/**
 * Throws if the project is not using the default build and test config.
 */
function assertDefaultProjectConfig(project) {
    if (!isProjectUsingDefaultConfig(project)) {
        throw new schematics_1.SchematicsException('Your project is not using the default configuration for ' +
            'build and test. The Prime NG schematics can only be used with the default ' +
            'configuration');
    }
}
/**
 * Gets whether the Angular CLI project is using the default build configuration.
 */
function isProjectUsingDefaultConfig(project) {
    const defaultBuilder = '@angular-devkit/build-angular:browser';
    return project.architect &&
        project.architect['build'] &&
        project.architect['build']['builder'] === defaultBuilder &&
        project.architect['test'] &&
        project.architect['build']['builder'] === defaultBuilder;
}
//# sourceMappingURL=theming.js.map