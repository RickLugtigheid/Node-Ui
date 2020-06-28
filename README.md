# Node Ui
[![module version](https://img.shields.io/npm/v/node_ui.build)](#version-log)
[![downloads](https://img.shields.io/npm/dm/node_ui.build)](https://www.npmjs.com/package/@rick_lugtigheid/js_utils)
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
```

## Documentation
##### [Table of contents](https://github.com/RickLugtigheid/Node-Ui/wiki)


## Version Log
[changed added removed fixed improved]

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