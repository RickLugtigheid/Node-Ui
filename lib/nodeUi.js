/**
 * @author Rick Lugtigheid
 */
module.exports = {
    /**
     * @param {string} title 
     * @param {jsonObject} stylesheet 
     */
    createWindow(width = 0, height = 0, title, stylesheet){ return new window(height, width, title, stylesheet); },
    //to add kijk naar trello en [https://www.dummies.com/programming/python/using-tkinter-widgets-in-python/]
    /**
     * @param {"button" | "textbox" | "checkbox" | "label" | "combobox" | "menu" } tag - The type of element this function should create. https://github.com/RickLugtigheid/Node-Ui/wiki/Elements#tags
     * @param {*} options - [ x | y | width | height | text | values | startIndex ] = value
     * @param {(self = new element)=>} callback Can be used to setup the elements events
     */
    createElement(tag, callback, ...options){
        try{
            switch(tag){
                case 'button':
                    return new button(tag, [x, y], [height, width], [text], callback);
                break;
                case 'checkbox':
                    return new button(tag, [x, y], [height, width], [text], callback);
                    break;
                case 'label':
                        return new label(tag, [x, y], [height, width], [text], callback);
                    break;
                case 'combobox':
                        return new Combobox(tag, [x, y], [height, width], [values, startIndex], callback);
                    break;
                case 'textbox':
                    return new texbox(tag, [x, y], [null, width], [], callback);
                default:
                    throw new Error('Invalid tag given');
                    break;
                }
        }catch{ throw new Error("Not all needed options are filled in") }
    }
}

function isElement(check){
    if(check['tag']) return true;
    return false;
}

class window{
    constructor(height, width, title, stylesheet = null){
        this.bounds = []

        this.stylesheet = stylesheet;
        this.height = height;
        this.width = width;
        this.title = title;
        let { EventEmitter } = require("events");
        this.emiter = new EventEmitter();
    }
    #elements = [];
    addElement(element){
        if(Array.isArray(element)){
            element.forEach(e => {
                if(isElement(e)) this.#elements.push(e);
            });
        }else if(isElement(element)) this.#elements.push(element);
    }
    createMenu(callback = (self = new menu)=>{}){
        return new menu(callback)
    }
    // send(msg){
    //     this.emiter.emit('send', msg);
    // }
    /**
     * starts the window
     */
    run(){
        let conn = require('./gui/conn_manager');
        conn.createConn(this.#elements, this, this.emiter);
        console.log("Window running...");
    }
    /**
     * This event will be triggerd on keypress. https://github.com/RickLugtigheid/Node-Ui/wiki/Window#bindkeyv002 
     * @param {'<F1>' | '<Escape>' | '<Return>' | '<Tab>' | '<Caps_Lock>' | '<BackSpace>' | '<KeyPress>' | '<KeyRelease>' | '<key_name>' } key
     */
    bindKey(key, callback = function(key){}){
        this.bounds.push({'id': id, 'key': key, 'callback': callback});
        id++;
    }
    /**
     * @param {function} callback Runs this callback every window update
     */
    onUpdate(callback){this.update = callback;}
    onClose(callback = function(){}){this.onClose = callback;}
    close(){this.emiter.emit('close');};
}

//the base element
let id = 0;
class element{
    constructor(tag, [x, y], [height, width], misc = [], callback){
        //give every element an id
        this.id = id;
        id++;
                
        this.tag = tag;
        this.x = x, this.y = y;
        this.height = height, this.width = width;
        this.misc = misc;
        if(typeof callback == "function") callback(this); //we make a callback and give this object for [for example events]
    }
}

//#region elements
class button extends element{
    name = this.misc[0] || '';
    /**
     * This event is run when the button/checkbox is clicked
     */
    onClick(callback = function(){}){this.onClick = callback;}
}
class label extends element{
    text = this.misc[0];
}
class Combobox extends element{
    values = this.misc[0] || [];
    default = this.misc[1] || 0;
    onChange(callback = function(value){}){this.onChange = callback;}
}
class texbox extends element{
    onRetrun(callback = function(text){}){this.onChange = callback;}
}
class menu{
    constructor(callback = null){
        this.tag = 'menu'

        this.elements = []
        if(typeof callback == "function") callback(this);
    }
    /**
     * @param {string} name 
     * @param {object[]} items
     */
    createSubmenu(name, items){
        this.elements.push({text: name, elements: items});
    }

    /**
     * @param {'command' | 'separator'} type 
     * @param {*} options - Options: [text | onClick] = value 
     */
    createItem(type, ...options){
        switch(type){
            case 'command':
                id++;
                return {text: text, type: type, id: id, onClick: onClick}
            case 'separator':
                return {type: type}
        }
    }
    //https://www.tutorialspoint.com/python/tk_menu.htm
}
//#endregion