import { 
  Rule, 
  chain,
  externalSchematic,
  Tree, 
  SchematicContext } from '@angular-devkit/schematics';
import { RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { Schema as NgNewSchema } from '@schematics/angular/ng-new/schema';

import * as figlet from 'figlet';

import { Schema } from './schema';

/**
 * Combines Angular ng-new and PrimeNG ng-add schematics
 */
export default function(options: Schema & NgNewSchema): Rule {
  console.log(`\n${figlet.textSync('ng new')}\n`);
  const name = (options as any)['--'] && (options as any)['--'][0] || process.argv[3];
  const ngNewOptions = {
    ...options,
    skipInstall: true,
    name
  };
  delete ngNewOptions.project;
  delete ngNewOptions.workingDirectory;
  delete ngNewOptions.skipPackageJson;

  return chain([
    externalSchematic('@schematics/angular', 'ng-new', ngNewOptions),
    (tree: Tree, _context: SchematicContext) => {
      _context.addTask(new RunSchematicTask('ng-add', {
        ...options,
        workingDirectory: name,
        addChartJs: true,
        addPrimeFlex: true
      },));
      return tree;
    }
  ]);
}