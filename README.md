[![PrimeNG](http://www.primetek.com.tr/img/primeng.png)](https://www.primefaces.org/primeng)

### PrimeNG schematics (V7)

[![npm version](https://img.shields.io/npm/v/primeng-schematics.svg?style=flat)](https://www.npmjs.com/package/primeng-schematics)
[![npm](https://img.shields.io/npm/dt/primeng-schematics.svg)](https://npm-stat.com/charts.html?package=primeng-schematics)
[![GitHub license](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/andriy101/primeng-schematics/blob/master/LICENSE)

This project is inspired by [Angular Material Schematics](https://material.angular.io/guide/schematics) and adds [PrimeNG (V7)](https://www.primefaces.org/primeng) support to your Angular (V7) project.

### Create a new angular project with PrimeNG support
with [**npm init**](https://docs.npmjs.com/cli/init#examples)
```bash
$ npm init primeng my-primeng-app
```
or [**yarn create**](https://yarnpkg.com/lang/en/docs/cli/create/)
```bash
$ yarn create primeng my-primeng-app
```
No globally installed NPM modules are required.
Executing one of these commands will:
1. create a new Angular 7 project called "my-primeng-app" (_**angular ng-new**_ schematic)
2. add PrimeNg support to the newly created project (_**primeng-schematics add**_ schematic)
_**-**_ ensure project dependencies in `package.json`
_**-**_ ensure project dependencies in your app module
_**-**_ add prebuilt PrimeNG theme into `angular.json` and `styles.<EXTENSION>` files
_**-**_ add [Prime icons](http://primefaces.org/primeng/#/icons)
_**-**_ add [Flex grid](https://www.primefaces.org/primeng/#/flexgrid)
_**-**_ add [Chart.js](https://www.primefaces.org/primeng/#/chart)
_**-**_ run npm install
3. create sample dashboard component (_**png g dbr**_ schematic), which includes:
_**-**_ primeNG menubar (_**png g mb**_ schematic)
_**-**_ six types of primeNG charts (_**png g chr --type <TYPE>**_ schematic)
_**-**_ primeNG table (_**png g t**_ schematic)
4. run _**ng serve -o**_ command

Any additional **Angular NG NEW** or **PrimeNG ADD** options may be passed along with this command:
```bash
$ npm init primeng my-primeng-app --minimal --interactive false --theme luna-amber
```
Test your new app (if the app was created without **--minimal** flag):
```bash
$ npm test
```

### Global installs
You may install **@angular/cli**, and **primeng-schematics** globally, which will expose **ng** and **primeng-schematics** (along with its alias **png**) global executables respectively:

```bash
$ npm i @angular/cli primeng-schematics -g
```

In further examples I will assume that these packages are installed globally. It is also possible to use local or temporary cached with **npx** packages. So instead of running
```bash
$ ng add c componentName
```
alternatives ways may be used:
```bash
# using npx
$ npx @angular/cli c componentName
# using local package (must be run from the project root)
$ npm run ng -- c componentName
# the same using npm bin (note use of back ticks)
$ `npm bin`/ng c componentName
# the same using relative path
$ node_modules/.bin/ng c componentName
```
Similarly, instead of running
```bash
$ png help
```
alternatives ways are:
```bash
# using npx
$ npx primeng-schematics help
# using local package (must be run from the project root)
$ npm run png -- help
# the same using npm bin (note use of back ticks)
$ `npm bin`/png help
# the same using relative path
$ node_modules/.bin/png c componentName
```


To see **Angular NG NEW** options run:
```bash
$ ng new --help
```

To see **PrimeNG ADD** options run:
```bash
$ png add --help
```

### Change theme palette (even while app is running)
```bash
$ png theme
```
and then choose the theme from the dialog or pass it with **--theme** flag, for example:
```bash
$ png theme --theme rhea
```
to see available themes:
```bash
$ png theme help
```

### Generator Schematics

In addition to the install, PrimeNG schematic module has currently six schematics it comes packaged with:
* [Menu bar](https://www.primefaces.org/primeng/#/menubar)
* [Organization chart](https://www.primefaces.org/primeng/#/organizationchart) (including PrimeNG growl)
* [Side bar](https://www.primefaces.org/primeng/#/sidebar)
* [Table with a new state storage](https://www.primefaces.org/primeng/#/table/state)
* [Chart](https://www.primefaces.org/primeng/#/chart)
* Dashboard: a collection of different charts and table, using Prime flex and [panels](https://www.primefaces.org/primeng/#/panel)


Each component schematic will create a new angular component that includes PrimeNG component. (`ng g` is an alias for `ng generate`)

#### Menu bar schematics
```bash
$ ng g menubar <COMPONENT_NAME>
```

#### Organization chart schematics
```bash
$ ng g org-chart <COMPONENT_NAME>
```

#### Side bar schematics
```bash
$ ng g sidebar <COMPONENT_NAME>
```

#### Table
```bash
$ ng g table <COMPONENT_NAME> [--storage [none, session, local]]
```

#### Chart
```bash
$ ng g chart <COMPONENT_NAME> [--type [line, bar, doughnut, pie, polarArea, radar]]
```

#### Dashboard

```bash
$ ng g dashboard <COMPONENT_NAME>
```
You may also use **png g** command instead of **ng g**:
```bash
$ png g dashboard my-dashboard
```
Too see components' aliases and options:
```bash
$ png g help
$ png generate help
```

After executing one of these commands, a new angular component will be created with provided name. After this point you can add this new component to any existing component.

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

### GENERAL HELP
```bash
$ png help
```

### TODOS
* Improve / fix / add tests
* Implement ng-update schematic