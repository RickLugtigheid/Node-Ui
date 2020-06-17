module.exports = {
    /**
     * @param {string} title 
     * @param {import("fs").PathLike} stylesheet 
     */
    createWindow(height = 0, width = 0, title, stylesheet){ return new window(height, width, title, stylesheet); },

    /**
     * @param tag {"button" | "label" | "textbox" | "checkbox"}
     * @param {Object} options - start of an options parameter
     * @param {number} options.x
     * @param {number} options.y
     * @param {number} options.width
     * @param {number} options.heigth
     * @param {string} options.text
     * @param {Function} callback
     */
    createElement(tag, options, callback){
    switch(tag){
        case 'button':
            return new button(tag, [options['x'], options['y']], [options['heigth'], options['width']], [options['text']], callback);
        break;
        case 'label':
                return new label(tag, [options['x'], options['y']], [options['heigth'], options['width']], [options['text']], callback);
            break;
        case 'textbox':
            return new textBox(tag, [options['x'], options['y']], [options['heigth'], options['width']], [options['text']], callback);
        default:
            return console.error('ERROR, invalid tag!');
            break;
    }
}
}

class window{
    constructor(height, width, title, stylesheet){
        this.stylesheet = this.stylesheet;
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
                console.log(e)
                this.#elements.push(e);
            });
        }else if(typeof element == "object"){ this.#elements.push(element); }
    }
    send(msg){
        this.emiter.emit('send', msg);
    }
    run(){
        let conn = require('./gui/conn_manager');
        conn.createConn(this.#elements, this, this.emiter);
        console.log("Window running...");
    }
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
    name = this.misc[0];
    
    //set even
    onClick(callback = function(){}){this.onClick = callback;}
}
class label extends element{
    text = this.misc[0];
}
class textBox extends label{
    
}