const spawn = require("child_process").spawn;

module.exports = {
    createConn(elements, window_obj, listner){
        //add the window element
        elements.unshift(window_obj)

        //events
        let events = [];

        elements.forEach(element => {
            //look for event listners
            if(typeof element.onClick == 'function'){
                events.push({'id': element.id, 'event': element.onClick});
            }else if(typeof element.onChange == 'function'){
                events.push({'id': element.id, 'event': element.onChange});
            }
        });
        window_obj.bounds.forEach(key => {
            events.push({'id': key.id, 'event': key.callback});
        })
        let conn = spawn('python',[__dirname+"/window.py", JSON.stringify(elements), JSON.stringify(window_obj.bounds), JSON.stringify(window_obj.stylesheet) || '{}']);
        if(window_obj.update){
            let loop = setInterval(()=>{
                window_obj.update();
                if(conn.killed){ clearInterval(loop); }        
            })
        }
        //#region [data manager]
        conn.stdout.on('data', (buffer) => {
            //data should be a json object
            try{
                var data = JSON.parse(buffer.toString().replace(/(\r\n|\n|\r)/gm,""));
            }catch{
                var data = buffer.toString().replace(/(\r\n|\n|\r)/gm,"");
            }
            //for debugging
            // console.log('recived data => ')
            // console.log(data);

            //look for any matching events
            events.forEach(event => {
                //check if the id matches
                if(data == event.id){
                    event.event();
                }else if(typeof data == "string" && data.includes('<')){
                    let msg = data.substring(data.lastIndexOf("<") + 1, data.lastIndexOf(">"));
                    let id = data.substring(0, data.lastIndexOf("<"));
                    if(id == event.id){ event.event(msg); }
                }
            })
        })
        //on send command
        // listner.on('send', (msg) => {
        //     console.log('sending: '+msg)
        //     conn.stdout.emit('msg', msg)
        // })
        //window close event
        conn.stdout.on('close', () => { window_obj.onClose(); })
        listner.on('close',() => { conn.kill(); })
        //#endregion
    }
}

//loads the data from our stylesheet
function load_Styleheet(path){ //comming soon
    const fs = require('fs');
    console.log(path)
    fs.exists(path, exists => {
        if(exists){
            let raw_data = fs.readFileSync(path)
            return JSON.stringify(JSON.parse(raw_data));
        }
    })
    return {}
}