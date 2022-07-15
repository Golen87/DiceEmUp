# Dice 'Em Up

Bullet hell through dawn and dusk. Made during Global Game Jam 2022.

## Installation

* `git@github.com:Golen87/DiceEmUp.git`
* `cd DiceEmUp`
* `yarn`

## Usage

### Cleaning
Run these commands to clean up the directory
``` bash
# Cleans up the build and dist folders
yarn clean

# Cleans up the builds, build cache, and node modules
yarn superclean
```

### Web development
Run these commands to build and run the web app
``` bash
# Webpack serves the code at localhost:8080
$ yarn serve

# Webpack bundles the code into a minimized product build
$ yarn public
```

### Application development
Run these commands to build and run the Electron app
``` bash
# Parcel bundles the code
$ yarn build

# Parcel bundles the code and watches for changes
$ yarn watch

# Run the electron app
$ yarn app

# Run the electron app with options for a debugger to attach to the render process
$ yarn debug
```

### Production mode and packaging app
Run this command to bundle code in production mode
``` bash
# Create windows executables
$ yarn windows

# Create mac executables
$ yarn mac

# Create linux executables
$ yarn linux
```