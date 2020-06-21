const {createElement, createWindow} = require('./lib/nodeUi');

let win = createWindow(600, 400, 'testwindow', require('./style.json'));

let btn = createElement('checkbox', {x: win.width/2, y: win.height/2, height: 2, width: 7})//[10, 10], [100, 200]

win.addElement([
    createElement('label', {x: win.width / 2, y: 300, width: 10, height: 5, text: 'Hello world'}),
    btn,
    createElement('button', {x: win.width - 50, y: win.height/2, height: 2, width: 12, text: 'Close window'}, self =>{
        self.onClick(() => win.close())
    }),
    createElement('combobox', {x: win.width / 2, y: 50, width: 20, height: 10, values: ["value 1", "value 2", "value 3"], default: 1}, self => {
        self.onChange(value => {
            console.log("selected value: " + value)
        });
    })
])

//#region [events]
btn.onClick(state => {
    console.log('checkbox state: '+state);
    //win.send({button: {x: + 10}}) //comming sooon
})

// win.onUpdate(() => {
//     console.log('loop me');
// })

win.bindKey('<KeyPress>', key => {
    switch(key){
        case 'w':
            console.log('UP')
            break;
        case 's':
            console.log('DOWN')
            break;
        case 'a':
            console.log('LEFT')
            break;
        case 'd':
            console.log('RIGHT')
            break;
    }
})

win.bindKey("<Escape>", () => { win.close(); })

win.onClose(()=>{
    console.log('window closed');
})
//#endregion

//run the window
win.run();