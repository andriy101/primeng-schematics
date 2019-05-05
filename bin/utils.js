#!/usr/bin/env node
'use strict';

const { dasherize } = require('@angular-devkit/core/src/utils/strings');
const figlet = require('figlet');
const chalk = require('chalk');
const { printSectionTitle } = require('../src/utils');

if (process.argv[2] === 'dasherize' && process.argv[3]) {
  console.log(dasherize(process.argv[3]));
}

else if (process.argv[2] === 'figlet' && process.argv[3]) {
  console.log(figlet.textSync(process.argv[3]));
}

else if (process.argv[2] === 'chalk' && process.argv[3] && process.argv[4]) {
  const [,,, text, chalkFunc1, chalkFunc2] = process.argv;
  if (chalkFunc2) {
    console.log(chalk[chalkFunc1][chalkFunc2](text));
  }
  else {
    console.log(chalk[chalkFunc1](text));
  }
}

else if (process.argv[2] === 'help') {
  if (process.argv[3] === 'new') {
    printSectionTitle('png new help', 'yellow');

    console.log(`
  ${chalk.yellow.bold('USAGE EXAMPLE FOR CREATING A NEW APPLICATION:')}
  
    ${chalk.cyan('# two fastest ways using')} ${chalk.cyan.bold('NPM')}
    ${chalk.italic('npm init primeng <APP_NAME> [NG_NEW_OPTIONS]')}
    ${chalk.cyan('# or')} ${chalk.cyan.bold('YARN')}
    ${chalk.italic('yarn create primeng <APP_NAME> [NG_NEW_OPTIONS]')}

    ${chalk.cyan('# using NPX (without primeng-schematics installed globally)')}
    ${chalk.italic('npx primeng-schematics new <APP_NAME> [NG_NEW_OPTIONS]')}

    ${chalk.cyan('# primeng-schematics is installed globally')}
    ${chalk.italic('png new <APP_NAME> [NG_NEW_OPTIONS]')}

    ${chalk.cyan('# @angular/cli@7 is installed globally')}
    ${chalk.italic('ng new <APP_NAME> -c primeng-schematics [NG_NEW_OPTIONS]')}

    ${[
      chalk.cyan('# to see available'),
      chalk.cyan.italic('NG_NEW_OPTIONS'),
      chalk.cyan('(if @angular/cli is installed globally)')
    ].join(' ')}
    ${chalk.italic('ng new --help')}

    ${chalk.cyan('# +++++++ TRY IT OUT +++++++ #')}
    ${chalk.italic('npm init my-png-app --minimal --interactive false')}
    `);
  }
  else if (['g', 'generate'].includes(process.argv[3])) {
    printSectionTitle('png g help', 'yellow');

    console.log(`
  ${chalk.yellow.bold('AVAILABLE PRIME NG COMPONENTS:')}
    ${chalk.yellow.italic('(aliases are shown under the component name)')}

    ${chalk.cyan('table')}\thttps://www.primefaces.org/primeng/#/table
    (t)\t\t${chalk.yellow('unique options:')}
    \t\t  ${chalk.cyan('--storage')} - state storage (pager, sorting, etc...) to use
    \t\t    ${chalk.yellow('allowed values:')} none, session, local

    ${chalk.cyan('chart')}\thttps://www.primefaces.org/primeng/#/chart/bar
    (ch)\t${chalk.yellow('unique options:')}
    \t\t  ${chalk.cyan('--type')} \t Chart.js' chart type
    \t\t    ${chalk.yellow('allowed values:')} bar, line, doughnut, pie, polarArea, radar

    ${chalk.cyan('menubar')}\thttps://www.primefaces.org/primeng/#/menubar
    (mb)\t${chalk.italic('horizontal menu components with support for nested submenus.')}

    ${chalk.cyan('org-chart')}\thttps://www.primefaces.org/primeng/#/organizationchart
    (oc)\t${chalk.italic('Organization Chart visualized hierarchical organization data.')}

    ${chalk.cyan('sidebar')}\thttps://www.primefaces.org/primeng/#/sidebar
    (sb)\t${chalk.italic('Panel component displayed as an overlay.')}

    ${chalk.cyan('dashboard')}\tPrime NG grid including six types of chart component and a table
    (dbr)

    All components also share angular component's options.

  ${chalk.yellow.bold('USAGE EXAMPLE FOR CREATING NEW PRIME NG COMPONENTS:')}
    ${chalk.yellow.italic('(aliases may be used instead of component name)')}

    ${chalk.cyan('# primeng schematics is installed globally')}
    ${chalk.italic('png g <COMPONENT_TYPE_OR_ALIAS> <COMPONENT_NAME> [UNIQUE_OPTIONS] [NG_COMPONENT_OPTIONS]')}

    ${chalk.cyan('# @angular/cli@7 is installed globally')}
    ${chalk.italic('ng g <COMPONENT_TYPE_OR_ALIAS> <COMPONENT_NAME> [UNIQUE_OPTIONS] [NG_COMPONENT_OPTIONS]')}

    ${chalk.cyan('# using NPM script with png')}
    ${chalk.italic('npm run png -- g <COMPONENT_TYPE_OR_ALIAS> <COMPONENT_NAME> [UNIQUE_OPTIONS] [NG_COMPONENT_OPTIONS]')}

    ${chalk.cyan('# using NPM script with ng')}
    ${chalk.italic('npm run ng -- g <COMPONENT_TYPE_OR_ALIAS> <COMPONENT_NAME> [UNIQUE_OPTIONS] [NG_COMPONENT_OPTIONS]')}

    ${chalk.cyan('# +++++++ TRY IT OUT +++++++ #')}
    ${chalk.italic('npm run png -- g t my-png-table --storage local')}
    `);
  }
  else if (process.argv[3] === 'add') {
    printSectionTitle('png add help', 'yellow');

    console.log(`
  ${chalk.yellow.italic('Add primeNG support to existing or new NG7 application')}

    ${chalk.cyan('# primeng schematics is installed globally')}
    ${chalk.italic('png add [PNG_ADD_OPTIONS]')}

    ${chalk.cyan('# using NPX without primeng schematics installed globally')}
    ${chalk.italic('npx primeng-schematics add [PNG_ADD_OPTIONS]')}

    ${chalk.cyan('# @angular/cli@7 is installed globally')}
    ${chalk.italic('ng add primeng-schematics [PNG_ADD_OPTIONS]')}

  ${chalk.yellow.italic('Available options:')}

    ${chalk.cyan('addChartJs')}\t\tWhether to add chart.js library ${chalk.italic('(default: true)')}
    ${chalk.cyan('addPrimeFlex')}\tWhether to add prime flex library ${chalk.italic('(default: true)')}
    ${chalk.cyan('theme')}\t\tprimeNG theme ${chalk.italic('(default: rhea)')}
    ${chalk.cyan('changeThemeOnly')}\tWill change theme only (theme value is required)
    ${chalk.cyan('createSample')}\tWhether to create a sample dashboard component 
    \t\t\tand insert it into app.component (via ng-new)
    `);
  }

  else if (process.argv[3] === 'theme') {
    printSectionTitle('png theme help', 'yellow');

    console.log(`
  ${chalk.yellow.italic('Modify primeNG theme only')}

    ${chalk.cyan('# primeng schematics is installed globally')}
    ${chalk.italic('png theme [--theme <PRIMRNG_THEME>]')}

    ${chalk.cyan('# primeng schematics is installed locally only')}
    ${chalk.italic('npm run png -- theme [--theme <PRIMRNG_THEME>]')}

  ${chalk.yellow.italic('Available themes:')}
  
    ${chalk.cyan('luna-amber')}
    ${chalk.cyan('luna-blue')}
    ${chalk.cyan('luna-green')}
    ${chalk.cyan('luna-pink')}
    ${chalk.cyan('nova-colored')}
    ${chalk.cyan('nova-dark')}
    ${chalk.cyan('nova-light')}
    ${chalk.cyan('rhea')} ${chalk.italic('(default)')}
    `);
  }
  else if (!process.argv[3]) {
    printSectionTitle('png help', 'yellow');

    console.log(`
  ${chalk.yellow.italic('Help topics (with primeng-schematics installed globally):')}

    ${chalk.cyan('# help with creating new application')}
    ${chalk.italic('$ png new help')}

    ${chalk.cyan('# help with creating new primeNG component')}
    ${chalk.italic('$ png generate help')}

    ${chalk.cyan('# help with adding primeNG support to existing or new NG7 application')}
    ${chalk.italic('$ png add help')}

    ${chalk.cyan('# help with modifying primeNG theme')}
    ${chalk.italic('$ png theme help')}
    `);
  }
}