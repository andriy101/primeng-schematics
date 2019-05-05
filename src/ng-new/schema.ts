import { Schema as NgNewSchema } from '@schematics/angular/ng-new/schema';

export interface Schema extends NgNewSchema {
  /** Whether to skip package.json install. */
  skipPackageJson: boolean;

  /** Name of the project to target. */
  project?: string;

  /** Used for calling ng-add schematics (internal use only). */
  workingDirectory?: string;
}