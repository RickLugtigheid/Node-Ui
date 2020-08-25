/**
 * @author Rick Lugtigheid
 */
module.exports = {
    tags: {
        BUTTON: "button",
        CHECKBOX: "checkbox",
        LABEL: "label",
        COMBOBOX: "combobox",
        TEXTBOX: "textbox",
        LISTBOX: "listbox"
    },
    keys: {
        F1: '<F1>',
        ESCAPE: '<Escape>',
        RETURN: '<Return>',
        TAB: '<Tab>',
        CAPSLOCK: '<Caps_Lock>',
        SHIFT: '<Shift>',
        CONTROL: '<Control>',
        BACKSPACE: '<BackSpace>',
        KEY_PRESS: '<KeyPress>',
        KEY_RELEASE: '<KeyRelease>'
    },
    /**
     * @param {string} title 
     * @param {jsonObject} stylesheet 
     */
    createWindow(width = 0, height = 0, title, stylesheet){ return new window(height, width, title, stylesheet); },
    //to add kijk naar trello en [https://www.dummies.com/programming/python/using-tkinter-widgets-in-python/]
    /**
     * @param {String} tag - The type of element this function should create. https://github.com/RickLugtigheid/Node-Ui/wiki/Elements#tags
     * @param {*} options - [ x | y | width | height | text | hidden | items | startIndex ] = value
     * @param {(self = new element)=>} callback Can be used to setup the elements events
     */
    createElement(tag = this.tags, callback, ...options){
        //default values
        if(typeof width == "undefined") width = 8;
        if(typeof height == "undefined") height = 2;

        //check if there is an array in items
        if(typeof items != "undefined" && Array.isArray(items)){
            for(let i = 0; i < items.length; i++){
                if(Array.isArray(items[i])){
                    items[i].forEach(item => {
                        items.push(item)
                    });
                    items[i] = null;
                }
            }
        }
        switch(tag){
            case 'button':
                return new button(tag, [x, y], [height, width], [text], callback);
            case 'checkbox':
                return new button(tag, [x, y], [height, width], [text], callback);
            case 'label':
                return new label(tag, [x, y], [height, width], [text], callback);
            case 'combobox':
                if(typeof startIndex == "undefined") startIndex = 0;
                return new Combobox(tag, [x, y], [height, width], [items, startIndex], callback);
            case 'textbox':
                if(typeof hidden == "undefined") hidden = false;
                return new texbox(tag, [x, y], [0, width], [hidden], callback);
            case 'listbox':
                return new listbox(tag, [x, y], [height, width], [items], callback);
            default:
                throw new ReferenceError('Invalid tag given');
        }
    }
}

//#region Math functions
Math.pct = function(value, percentage){ return value/100 * percentage };
//#endregion
let routing = require('./framework/routing');
module.exports.render = routing.render;
module.exports.router = routing.router;

class window{
    static isElement(obj){
        if(obj && obj['tag']) return true;
        return false;
    }
    constructor(height, width, title, stylesheet = {}){
        this.bounds = []

        this.stylesheet = stylesheet;
        this.height = height;
        this.width = width;
        this.title = title;
        let { EventEmitter } = require("events");
        this.#emiter = new EventEmitter();
    }
    #elements = [];
    #emiter = null;

    addElement(element){
        if(Array.isArray(element)){
            element.forEach(e => {
                if(window.isElement(e)) this.#elements.push(e);
            });
        }else if(window.isElement(element)) this.#elements.push(element);
    }
    createMenu(callback = (self = new menu)=>{}){
        return new menu(callback)
    }
    /**
     * starts the window
     */
    run(options = {'resizable': true}){
        this.resize = options.resizable;

        let conn = require('./gui/conn_manager');
        conn.createConn(this.#elements, events, this, this.#emiter);
    }
    /**
     * This event will be triggerd on keypress. https://github.com/RickLugtigheid/Node-Ui/wiki/Window#bindkeyv002 
     * @param {"<keyname>"} key
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
    close(){this.#emiter.emit('close');};
}

//the base element
let id = 0;
let events = []
class element{
    constructor(tag, [x, y], [height, width], misc = [], callback){
        this.id = {}

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
    onClick(callback = function(){}){ events.push({'id': id, 'event': callback}); this.id.click = id; id++; }
}
class label extends element{
    text = this.misc[0];
}
class listbox extends element{
    items = this.misc[0] || [];
    onSelect(callback = function(value){}){ events.push({'id': id, 'event': callback}); this.id.select = id; id++; }
}
class Combobox extends listbox{
    startIndex = this.misc[1] || 0;
}
class texbox extends element{
    hidden = this.misc[0];
    onReturn(callback = function(text){}){ events.push({'id': id, 'event': callback}); this.id.retrun = id; id++; }
    onChange(callback = function(value){}){ events.push({'id': id, 'event': callback}); this.id.change = id; id++; }
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
                events.push({'id': id, 'event': onClick})
                return {text: text, type: type, id: id}
            case 'separator':
                return {type: type}
        }
    }
    //https://www.tutorialspoint.com/python/tk_menu.htm
}
//#endregion