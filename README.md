# Node Ui
[![module version](https://img.shields.io/npm/v/node_ui.build)](#version-log)
[![downloads](https://img.shields.io/npm/dm/node_ui.build)](https://www.npmjs.com/package/node_ui.build)
[![last comit](https://img.shields.io/github/last-commit/RickLugtigheid/Node-Ui)](https://github.com/RickLugtigheid/Node-Ui/commits/master)
[![size](https://img.shields.io/github/repo-size/RickLugtigheid/Node-Ui)]()


## Installation

```bash
$ npm i node_ui.build
```

## Getting Started
When you have installed this module than you can start using it.
```js
//I like to import the module like this since it only has 2 functions
const {createElement, createWindow} = require("node_ui.build")

//if that presents some difficulties you can import it like this
const nodeUi = require("node_ui.build");
//Note: when you do this you have to call the functions like this:
nodeUi.createElement();
```
when you have done this you need to create a window object and add elements to it.
```js
//hello world program
const {createElement, createWindow} = require("node_ui.build");

//create the window
let win = createWindow(100, 100, "test window"/*, require('./style.json')*/);

//add elements to the window
win.addElement(
    //we dont want to use the callback so we set it to null
    createElement('label', null, x=win.width/2, y=win.width/2, heigth=2, width=8, text="Hello world")
);

//show the window
win.run();
//or win.run({'resizable': false});
```

## Initializing framework
Run this command to install the [framework](https://github.com/RickLugtigheid/Node-Ui/wiki).
```bash
$ npm explore node_ui.build -- npm run init
```
Add router file to package.json
```json
  "router": "router.js",
```

## Documentation
##### [Table of contents](https://github.com/RickLugtigheid/Node-Ui/wiki)


## Version Log

## v0.0.6

### Added
- label text wrap
- textbox style
- "enums" for selecting elements and keys to bind (the old way of doing it still works)

### Changed
- text-color is now under font (in a stylesheet)

### Fixed
- textbox not showing bug
- menu not showing bug

## v0.0.4 / v0.0.5

### Added
- textbox option: hidden
- listbox element
    - onSelect
    - items
- framework
    - render [function]
    - router [class]
        - .GET
        - .SET
    - router file
        - init()
        - get routes()
        - get public()
        - core: new router
    - window file
        - window: createWindow(*Options*)
        - run_settings: {'resizable': false},
        - init(...params)
        - get elements()
        - *optional* onClose()
    - init command
- window run options
    - resizable
- Math.pct()

### Changed
- combobox
    - values to items
    - onChange to onSelect

### Fixed
- v0.0.4 bug that broke the module
- spelling error in textbox.onReturn
- support for multiple events per element

## v0.0.3

### Added
- window.createMenu
- menu and textbox elements
    - textbox.onReturn
    - menu.createSubmenu
    - menu.createItem
- stylesheet
    - -hover and -active events
    - style Schema

### Changed
- createElement
    - options from {options} to ...options

### Improved
- error checking
- @params and comments on the functions

## v0.0.2

### Added
- window.onUpdate
- window.bindKey
- checkbox element
    - checkbox.onClick
- Stylesheet V1

## v0.0.1

### Added
- createWindow
    - window.close
    - window.onClose
- createElement
- button, label and combobox elements
    - button.onClick
    - combobox.onChange