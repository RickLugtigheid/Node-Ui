let publicList;
const MAIN_DIR = __dirname.replace(/\\framework|lib|node_modules|\\node_ui.build\\/g, '');

class router{
    constructor(){
        //Use fucntion because constructor can't be async
        this.start();
    }
    async start(){
        await 0;//await so we dont run before object creation

        let config = require(MAIN_DIR + "/package.json");

        this.core = require(MAIN_DIR + config.router);
        
        this.routes = this.core.routes;
        //add the public variables (if there are any)
        if(this.core.public) publicList = this.core.public;

        //now we call the init function
        this.core.init();
    }
    /**
     * Gets the value of a 'public' variable
     * @param {string|string[]} key - Key is the name of the public variable you want to get
     */
    static GET(key){
        //check if is array [path_array]
        if(Array.isArray(key) && key[0] in publicList['const']) return key.reduce((o, n) => o[n], publicList['const']);
        else if(Array.isArray(key) && key[0] != 'const') return key.reduce((o, n) => o[n], publicList);
        //check if key exists
        if(key in publicList && key != 'const') return publicList[key];
        else if(key in publicList['const']) return publicList['const'][key];
        return undefined;
    }
    /**
     * Sets the value of a 'public non-constant' variable
     * @param {string|string[]} key - Key is the name of the public variable you want to overide
     * @param {*} to 
     */
    static SET(key, to){
        //if key is array path
        if(Array.isArray(key)){
            if(key[0] in publicList['const'] || key[0] == 'const') throw new TypeError("Assignment to constant variable")
    
            var _json = publicList;
            var property = key[0];
            for(var i = 1; i < key.length; i++) {
              property += "." + key[i];
            }

            //set the key to value
            if(typeof to == "string") property = "_json." + property + " = \"" + to + "\"";
            else if(typeof to == "object") property = "_json." + property + " = " + JSON.stringify(to);
            else property = "_json." + property + " = " + to;
            eval(property)
            return; //retrun so we dont throw a error (in else)
        }

        //check if key is not constant
        if(key in publicList['const']) throw new TypeError("Assignment to constant variable")
        //if the key exist we overide it
        if(key in publicList) publicList[key] = to;
        //else we throw an error
        else throw new ReferenceError(`No key named '${key}' to overwrite`)
    }
}

module.exports = {
    /**
     * Renders a window
     * @param {string} route - the name of the 'route' you want to call 
     * - in => get routes()
     * - at => routing file
     * @param  {...any} params - the parameters you want to give to the route
     */
    render(route, ...params){
    //get window file from folder called windows
    let config = require(MAIN_DIR + "/package.json");
    
    let main = require(MAIN_DIR + config.router).routes[route];
    if(!main) throw new TypeError(`Routes does not contain '${route}'\n    at ${config.router}.routes (${MAIN_DIR + config.router})`)

    //get extra params
    let styleObj = {}
    if(main['style']) styleObj = require(MAIN_DIR + '/View' + main['style']);

    let win = require(MAIN_DIR + '/View' + main['path']);
    //run the init function on the window
    if(!win.init) throw new TypeError(`'${main['path']} does not contain 'init()'`)
    win.init(style=styleObj, params)

    //add all the elements to the window
    if(!win.elements) throw new TypeError(`'${main['path']} does not contain 'get elements()'`)
    win.window.addElement(win.elements)

    //add events
    if(win.onClose) win.window.onClose(win.onClose);

    //start the window
    win.window.run(win.run_settings);
    },
    router: router
}