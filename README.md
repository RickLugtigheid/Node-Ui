# Node Ui
[![module version](https://img.shields.io/npm/v/@rick_lugtigheid/js_utils)](#version-log)
[![downloads](https://img.shields.io/npm/dm/@rick_lugtigheid/js_utils)](https://www.npmjs.com/package/@rick_lugtigheid/js_utils) Note for self: edit shield links!


## Installation

```bash
$ npm i node_ui 
```

## Getting Started
When you have installed this module than you can start using it.
```js
//I like to import the module like this since it only has 2 functions
const {createElement, createWindow} = require('./lib/nodeUi');

//if that presents some difficulties you can import it like this
const nodeUi = require('./lib/nodeUi');
//Note: when you do this you have to call the functions like this:
nodeUi.createElement();
```
when you have done this you need to create a window object and add elements to it.
```js
//hello world program
const {createElement, createWindow} = require('./lib/nodeUi');

//create the window
let win = createWindow(100, 100, "test window");

//add elements to the window
win.addElement(
    createElement('label', {x: win.width/2, y: win.width/2, heigth: 2, width: 8, text: "Hello world"})
);

//show the window
win.run();
```

## Documentation
##### [Table of contents](https://github.com/RickLugtigheid/Node-Ui/wiki)


## Version Log
| Version  | added |
| ------------- | ------------- |
| [v1.0.0]      | Window, (button and label)Elements |
----