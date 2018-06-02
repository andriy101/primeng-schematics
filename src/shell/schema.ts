export interface Schema {
  /** Whether to skip package.json install. */
  skipPackageJson: boolean;

  /** Name of pre-built theme to install. */
  theme: 'omega' | 'flick' | 'lightness' | 'kasper' | 'start';

  /** Name of the project to target. */
  project?: string;
}