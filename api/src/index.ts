
import { Console } from "console";
import express from "express";
import { Ambito } from "./interpreter/Misc/Ambito";
import { Program } from "./interpreter/Misc/Program";

const parser = require("./interpreter/grammar/grammar.js")
var bodyParser = require('body-parser')
const app = express();
const port = 5000; // default port to listen
const path = require('path');
const router = express.Router();
const cors =require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/views/index.html'));
    //__dirname : It will resolve to your project folder.
  });

  app.post('/',cors(), (req,res)=>{
    res.set('Access-Control-Allow-Origin', '*');
    const entrada = req.body.exp
    console.log(entrada)
    if(entrada == ""){
      alert("Entrada Vacia")
      return res.send("Cadena Vacia")
    }
    const result = parser.parse(entrada)
    console.log(result)
    var consola = "";
    try{
      Program.consola = "";
      const ambito = new Ambito(null)
      for(const inst of result){
        inst.execute(ambito);
        // if( cadenaActual != undefined){
        //   consola += cadenaActual;
        // }
      }
    }catch(error){
        // console.log(error)
        Program.consola += error.getError()
    }
    console.log(Program.consola)

    const jsonData = {
      "res": String(Program.consola),
      "obj": result
    }

    return res.send(JSON.stringify(jsonData))

  });


app.use(express.json())
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );

