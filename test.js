const { createElement, createWindow, tags, keys } = require('./lib/nodeUi');

let win = createWindow(200, 200, "test", require("./test_style.json"));

win.addElement([
    createElement(tags.TEXTBOX, self => {
        self.onReturn(value => {
            second_window(value)
        })
    }, x=100, y=100, width=8),
    win.createMenu(self => {
        self.createSubmenu("test", [
            self.createItem('command', text="test", onClick=()=>{
                console.log("click")
            })
        ])
    })
])

win.run();

function second_window(value){
    let win2 = createWindow(300, 150, "Lees mij", require("./readme.json"));
    win2.addElement(
        createElement(tags.LABEL, null, x=150, y=win2.height/2, text=value, height=20, width=40)
    )
    win2.bindKey(keys.ESCAPE, () => {
        win2.close();
    })
    win2.run({"resizable": false})
}