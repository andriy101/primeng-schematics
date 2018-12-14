### Prime NG schematics

[![npm version](https://img.shields.io/npm/v/primeng-schematics.svg?style=flat)](https://www.npmjs.com/package/primeng-schematics)
[![npm](https://img.shields.io/npm/dt/primeng-schematics.svg)](https://npm-stat.com/charts.html?package=primeng-schematics)
[![GitHub license](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/andriy101/primeng-schematics/blob/master/LICENSE)

This project is heavily inspired by [Angular Material Schematics](https://material.angular.io/guide/schematics) and adds [Prime NG](https://www.primefaces.org/primeng) support to your Angular project.

[![Prime NG](https://www.primefaces.org/primeng/assets/showcase/images/logo.png)](https://www.primefaces.org/primeng)

### Install Schematics

First create an empty project as usually:

```bash
ng new <YOUR-APP-NAME>
```

No need (although possible and harmless) in running `npm i primeng-schematics`, running `ng add` will handle it for you.

```bash
ng add primeng-schematics
```

The command will help you quickly add Prime NG to a new project. This schematic will:
* Ensure project dependencies in `package.json`
* Ensure project dependencies in your app module
* Adds prebuilt Prime NG theme into `angular-cli.json`
* Adds Font Awesome fonts and new prime icons

### Generator Schematics

In addition to the install schematic Prime NG has currently four (more to come soon) schematics it comes packaged with:
* [Menu bar](https://www.primefaces.org/primeng/#/menubar)
* [Organization chart](https://www.primefaces.org/primeng/#/organizationchart) (including Prime NG growl)
* [Side bar](https://www.primefaces.org/primeng/#/sidebar)
* [Tree table](https://www.primefaces.org/primeng/#/treetable)


Each component schematic will create a new angular component that includes Prime NG component. (`ng g` is an alias for `ng generate`)

#### Menu bar schematics

```bash
ng g primeng-schematics:primeng-menubar --name <component-name>
```

#### Organization chart schematics

```bash
ng g primeng-schematics:primeng-org-chart --name <component-name>
```

#### Side bar schematics

```bash
ng g primeng-schematics:primeng-sidebar --name <component-name>
```

#### Tree table

```bash
ng g primeng-schematics:primeng-tree-table --name <component-name>
```

After executing one of those commands, a new angular component will be created with provided name. After this point you can add this new component to any existing component.

For example, assuming that you created `<mb>`, `<oc>`, `<sb>` and `<tt>` components (menu bar, organization chart, side menu and tree table), you may modify your `app.component.html` file to something like:

```html
<mb></mb>
<sb></sb>
<h1>
  Welcome to {{ title }}! 
</h1>
<oc></oc>
<tt></tt>
```


### TODOS
* Improve / fix / add tests
* Implement ng-new schematic
* Implement ng-update schematic
* Refactor code to use imported from angular functions, instead of copied devkit utils

[Code on Github](https://github.com/andriy101/primeng-schematics)