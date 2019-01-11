/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { 
  Rule, 
  // chain, 
  externalSchematic,
  // schematic
} from '@angular-devkit/schematics';
import * as a from '@angular-devkit/schematics';

export default function myComponent(options: any): Rule {

  // const ngNew = a.apply(a.empty(), [
  //   externalSchematic('@schematics/angular', 'ng-new', options)
  // ]);

  const ngNew: a.Rule = externalSchematic('@schematics/angular', 'ng-new', options);
  const ngAdd: a.Rule = a.schematic('ng-add', {});
  const ngNewMerge: a.Rule = a.branchAndMerge(ngNew);
  return a.mergeWith(a.apply(
    a.asSource(ngNewMerge),
    [ngAdd])
  );
  // return chain([
  //   a.branchAndMerge(
  //     externalSchematic('@schematics/angular', 'ng-new', options)
  //   ),
  //   a.branchAndMerge(
  //     a.schematic('ng-add', {})
  //   ),
  //   (_host: a.Tree) => {
  //     console.log(_host.exists('angular.json'));
      
  //     // , context: a.SchematicContext
  //   }
  //   // externalSchematic('@schematics/angular', 'ng-new', options),
  //   // a.schematic('ng-add', {})
  // ]);
}