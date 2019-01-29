[![Prime NG](http://www.primetek.com.tr/img/primeng.png)](https://www.primefaces.org/primeng)

### Prime NG schematics (V7)

[![npm version](https://img.shields.io/npm/v/primeng-schematics.svg?style=flat)](https://www.npmjs.com/package/primeng-schematics)
[![npm](https://img.shields.io/npm/dt/primeng-schematics.svg)](https://npm-stat.com/charts.html?package=primeng-schematics)
[![GitHub license](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/andriy101/primeng-schematics/blob/master/LICENSE)

This project is heavily inspired by [Angular Material Schematics](https://material.angular.io/guide/schematics) and adds [Prime NG (V7)](https://www.primefaces.org/primeng) support to your Angular (V7) project.

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
* Adds prebuilt Prime NG theme into `angular.json`
* Adds [Prime icons](http://primefaces.org/primeng/#/icons)

### Generator Schematics

In addition to the install, Prime NG schematic module has currently four (more to come soon) schematics it comes packaged with:
* [Menu bar](https://www.primefaces.org/primeng/#/menubar)
* [Organization chart](https://www.primefaces.org/primeng/#/organizationchart) (including Prime NG growl)
* [Side bar](https://www.primefaces.org/primeng/#/sidebar)
* [Table with a new state storage](https://www.primefaces.org/primeng/#/table/state)


Each component schematic will create a new angular component that includes Prime NG component. (`ng g` is an alias for `ng generate`)

#### Menu bar schematics

```bash
ng g primeng-schematics:menubar <component-name>
# or with mb alias
ng g primeng-schematics:mb <component-name>
```

#### Organization chart schematics

```bash
ng g primeng-schematics:org-chart <component-name>
# or with oc alias
ng g primeng-schematics:oc <component-name>
```

#### Side bar schematics

```bash
# or with sb alias
ng g primeng-schematics:sb <component-name>
```

#### Table

```bash
ng g primeng-schematics:table <component-name>
# or with t alias
ng g primeng-schematics:t <component-name>
```

After executing one of those commands, a new angular component will be created with provided name. After this point you can add this new component to any existing component.

For example, assuming that you created `<app-mb>`, `<app-oc>`, `<app-sb>` and `<app-t>` components (menu bar, organization chart, side menu and table), you may modify your `app.component.html` file to something like:

```html
<app-mb></app-mb>
<app-sb></app-sb>
<h1>
  Welcome to {{ title }}! 
</h1>
<app-oc></app-oc>
<app-t></app-t>
```


### TODOS
* Improve / fix / add tests
* Implement ng-new schematic
* Implement ng-update schematic