import { Schema as ComponentSchema } from '@schematics/angular/component/schema';

export interface Schema extends ComponentSchema {
  /** chart's type to be applied */
  type: string  

  /** Used when called from parent tree (internal use only). */
  workingDirectory?: string;
}
