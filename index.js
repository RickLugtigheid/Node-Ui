let {createElement, createWindow} = require('./lib/nodeUi');

let win = createWindow(250, 500, 'testwindow', "./style.json");

let btn = createElement('button', {x: win.width/2, y: win.height/2, heigth: 2, width: 7, text: 'Button'})//[10, 10], [100, 200]

win.addElement([
    createElement('label', {x: win.width / 2, y: 0, width: 20, heigth: 10, text: 'Hello world'}),
    btn,
    createElement('button', {x: win.width - 50, y: win.height/2, heigth: 2, width: 12, text: 'Close window'}, (self) =>{
        self.onClick(() => win.close())
    })
])

//#region [events]
btn.onClick(() => {
    console.log('Button clicked');
    //win.send({button: {x: + 10}}) //comming sooon
})

win.onClose(()=>{
    console.log('window closed');
})
//#endregion

//run the window
win.run();