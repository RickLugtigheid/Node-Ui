const fs = require('fs'); 
const path = require('path'); 
 
const MAIN_DIR = __dirname.replace(/framework|lib|node_modules|\\node_ui.build\\/g, '');
//create main folder
fs.mkdir(path.join(MAIN_DIR, 'View'), (err) => { 
    if (err) { 
        return console.error(err); 
    } 
    console.log('Directory created successfully!'); 

    fs.writeFileSync(MAIN_DIR + "/router.js", 
    'const { router, render } = require("node_ui.build")\n'  + 
    'module.exports = {\n'  + 
    '   init(){\n'  + 
    "      render('index')\n"  +
    '   },\n'  + 
    '   get routes(){\n'  + 
    '      return{\n'  +
    `         'index': {'path': "/index"}\n` +
    '      }\n'  + 
    '   },\n'  + 
    '   get public(){\n'  + 
    '      return {\n'  + 
    '      }\n'  + 
    '   },\n'  + 
    '   core: new router\n'  + 
    '}\n');

    fs.writeFileSync(MAIN_DIR + "/View/index.js", 
    'const { createElement, createWindow, render, router } = require("node_ui.build")\n'  + 
    'module.exports = {\n'  + 
    '    window: createWindow(200, 200, "Main"),\n'  + 
    "    run_settings: {'resizable': false},\n" +
    '    init(...params) {\n'  + 
    '        //this.window.stylesheet = style;\n'  + 
    '    },\n'  + 
    '    get elements(){\n'  + 
    '        const WIDTH = this.window.width;\n'  + 
    '        const HEIGTH = this.window.height;\n'  + 
    '        return[\n'  + 
    '        ]\n'  + 
    '    }\n'  + 
    '}\n');
    console.log("index.js added successfully!\nRouter.js added successfully!\n----------[ Done ]----------")
});