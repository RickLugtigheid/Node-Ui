const spawn = require("child_process").spawn;

module.exports = {
    createConn(elements, window_obj, listner){
        //add the window element
        elements.unshift(window_obj)

        //events
        let events = [];

        elements.forEach(element => {
            //push the element to window
            // json_data[element.id] = {
            //     'id': element.id,
            //     'type': element.tag, 
            //     'pos': [element.x, element.y],
            //     'transform':[element.height, element.width], 
            //     'misc': element.misc
            // }

            //look for event listners
            if(typeof element.onClick == 'function'){
                events.push({'id': element.id, 'event': element.onClick});
            }
        });
        let conn = spawn('python',[__dirname+"/window.py", JSON.stringify(elements)/*, load_Styleheet(window_obj.stylesheet)*/]);
        
        //#region [data manager]
        conn.stdout.on('data', (buffer) => {
            //data should be a json object
            try{
                var data = JSON.parse(buffer.toString().replace(/(\r\n|\n|\r)/gm,""));
            }catch{
                var data = buffer.toString().replace(/(\r\n|\n|\r)/gm,"");
            }
            console.log('recived data => ')
            console.log(data);

            //look for any matching events
            events.forEach(event => {
                //check if the id matches
                if(data == event.id){
                    event.event();
                }
            })
        })
        //on send command
        listner.on('send', (msg) => {
            console.log('sending: '+msg)
            conn.stdout.emit('msg', msg)
        })
        //window close event
        conn.stdout.on('close', () => { window_obj.onClose(); })
        listner.on('close',() => { conn.kill(); })
        //#endregion
    }
}

//loads the data from our stylesheet
function load_Styleheet(path){
    const fs = require('fs');
    fs.exists(path, exists => {
        if(exists){
            let raw_data = fs.readFileSync(path)
            return JSON.stringify(JSON.parse(raw_data));
        }
        return null;
    })
}