# COMING REALLY VERY SOON, 
# DO NOT USE current 0.0.0 version

This project is heavily enspired by [Angular Material Schematics](Angular Material Schematics) and adds [Prime NG](https://www.primefaces.org/primeng) support to your Angular project.

### Install Schematics

No need (although possible and harmless) in running `npm i primeng-schematics`, running `ng add` will handle it for you.

```bash
ng add primeng-schematics
```

The command will help you quickly add Prime NG to a new project. This schematic will:
* Ensure project dependencies in `package.json`
* Ensure project dependencies in your app module
* Adds prebuilt Prime NG theme into `angular-cli.json`
* Adds Font Awesome fonts

### Generator Schematics

In addition to the install schematic Prime NG has currently one (more to come very soon :)) schematic it comes packaged with:
* [Menubar](https://www.primefaces.org/primeng/#/menubar)
* Many more to come very soon...

#### Menubar Schematic

The menubar schematic will create a new component that includes Prime NG Menubar component.

```bash
ng generate primeng-schematics:primeng-menubar --name <component-name>
```

[Code on Github](https://github.com/andriy101/primeng-schematics)