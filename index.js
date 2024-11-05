
import { textTransforms } from "./text_transforms.js"; 
import pkg from 'websocket';
const {client} = pkg;
const myTransform = new textTransforms();

let NYTIMES_URL = "https://static01.nyt.com/elections-assets/2020/data/api/2020-11-03/votes-remaining-page/national/president.json"

let settings = { method: "Get" };







async function main(connection){
  while(1){

    fetch(NYTIMES_URL, settings)
    .then(res => res.json())
    .then((json) => {
        let trumpElectoral = 0
        let bidenElectoral = 0 
        for (let i in json["data"]["races"]){
            for (let z in json["data"]["races"][i]["candidates"]){
                if (json["data"]["races"][i]["candidates"][z]["last_name"] == "Trump")
                    trumpElectoral = trumpElectoral + json["data"]["races"][i]["candidates"][z]["electoral_votes"]
                if (json["data"]["races"][i]["candidates"][z]["last_name"] == "Biden")
                    bidenElectoral = bidenElectoral + json["data"]["races"][i]["candidates"][z]["electoral_votes"]
                else
                    continue
            }
        }
        console.log(bidenElectoral.toString())
        console.log(bidenElectoral.toString().length)
        let stringValueForTrump = "0".repeat(3 - trumpElectoral.toString().length) +  trumpElectoral.toString()
        let stringValueForBiden =  "0".repeat(3 - bidenElectoral.toString().length) +  bidenElectoral.toString()
        console.log(trumpElectoral)
        console.log(stringValueForBiden)
        console.log(stringValueForTrump)
        let finalString = "Trump  " + stringValueForTrump + "    " + "Biden  " + stringValueForBiden + "    "
        console.log(finalString)


        var array = new Uint8Array(32);
        array[0]=0x80;
        array[1]=0x83;
        array[2]=0x00;
        let hexVar = myTransform.transformStringToHexArray(finalString)
        for (let i = 0; i<myTransform.transformStringToHexArray(finalString).length; i++){
          array[i+3]= hexVar[i];
        }
        array[31]=0x8F;
        console.log(array);
        connection.sendUTF(array);

    });

    await sleep(60000*1);
  }

}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  



var clientWeb = new client();
await sleep(5000*1);

clientWeb.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

clientWeb.on('connect', async function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });
    const mainFunction = await main(connection);

});

clientWeb.connect('ws://100.87.201.36:5000/ws');
