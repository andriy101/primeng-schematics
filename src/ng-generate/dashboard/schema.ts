import { Schema as ComponentSchema } from '@schematics/angular/component/schema';

export interface Schema extends ComponentSchema {
  /** Used when called from parent tree (internal use only). */
  workingDirectory?: string;
}
