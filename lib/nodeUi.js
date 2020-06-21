const { error } = require("console");

/**
 * @author Rick Lugtigheid
 */
module.exports = {
    /**
     * @param {string} title 
     * @param {jsonObject} stylesheet 
     */
    createWindow(width = 0, height = 0, title, stylesheet){ return new window(height, width, title, stylesheet); },
    //to add  | "textbox" | "labelFrame" | "menu" [https://www.dummies.com/programming/python/using-tkinter-widgets-in-python/]
    /**
     * @param {"button" | "checkbox" | "label" | "combobox"} tag The type of element this function should create
     * @param {Object} options
     * @param {number} options.x
     * @param {number} options.y
     * @param {number} options.width
     * @param {number} options.height
     * @param {string} options.text
     * @param {Array} options.values
     * @param {number} options.default
     * @param {(self = new element)=>} callback Can be used to setup the elements events
     */
    createElement(tag, options, callback){
    switch(tag){
        case 'button':
            return new button(tag, [options['x'], options['y']], [options['height'], options['width']], [options['text']], callback);
        break;
        case 'checkbox':
            return new button(tag, [options['x'], options['y']], [options['height'], options['width']], [options['text']], callback);
            break;
        case 'label':
                return new label(tag, [options['x'], options['y']], [options['height'], options['width']], [options['text']], callback);
            break;
        case 'combobox':
                return new Combobox(tag, [options['x'], options['y']], [options['height'], options['width']], [options['values'], options['default']], callback);
            break;
        // case 'textbox':
        //     return new label(tag, [options['x'], options['y']], [options['height'], options['width']], [options['text']], callback);
        default:
            throw new Error('Invalid tag given');
            break;
        }
    }
}

class window{
    constructor(height, width, title, stylesheet = null){
        this.bounds = []

        this.stylesheet = stylesheet; //comming soon
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
                this.#elements.push(e);
            });
        }else if(typeof element == "object"){ this.#elements.push(element); }
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
     * @param {'<F1>' | '<Escape>' | '<Return>' | '<Tab>' | '<Caps_Lock>' | '<BackSpace>' | '<KeyPress>' | '<KeyRelease>' | <key_name> } key
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
        if(typeof callback == "function"){ callback(this); }//we make a callback and give this object for [for example events]
    }
}

//elements
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