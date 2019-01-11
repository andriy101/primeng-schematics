"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const schematics_1 = require("@angular-devkit/schematics");
const a = require("@angular-devkit/schematics");
function myComponent(options) {
    // const ngNew = a.apply(a.empty(), [
    //   externalSchematic('@schematics/angular', 'ng-new', options)
    // ]);
    const ngNew = schematics_1.externalSchematic('@schematics/angular', 'ng-new', options);
    const ngAdd = a.schematic('ng-add', {});
    const ngNewMerge = a.branchAndMerge(ngNew);
    return a.mergeWith(a.apply(a.asSource(ngNewMerge), [ngAdd]));
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
exports.default = myComponent;
//# sourceMappingURL=index.js.map