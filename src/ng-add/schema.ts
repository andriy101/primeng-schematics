export interface Schema {
  /** Whether to skip package.json install. */
  skipPackageJson: boolean;

  /** Whether to add chart.js library. */
  addChartJs: boolean;

  /** Whether to add prime flex library. */
  addPrimeFlex: boolean;

  /** Whether to create a sample dashboard component and insert it into app.component. */
  createSample: boolean;

  /** Name of pre-built theme to install. */
  theme: 'luna-amber' | 'luna-blue' | 'luna-green' | 'luna-pink' | 'nova-colored' | 'nova-dark' | 'nova-light' | 'rhea';

  /** Name of the project to target. */
  project?: string;

  /** Used when called from parent tree (internal use only). */
  workingDirectory?: string;

  /** Will only change a theme. */
  changeThemeOnly: boolean;

  /** Set default collection in angular json file */
  setDefaultCollection: boolean

  /** Whether to add primeng-schematics to package.json */
  addPrimengSchematics: boolean
}