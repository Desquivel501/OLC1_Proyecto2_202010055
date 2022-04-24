
import { Console } from "console";
import express from "express";
import { Ambito } from "./interpreter/Misc/Ambito";
import { Program } from "./interpreter/Misc/Program";

const parser = require("./interpreter/grammar/grammar.js")
const bodyParser = require('body-parser')
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
    // __dirname : It will resolve to your project folder.
  });

  app.post('/',cors(), (req,res)=>{
    res.set('Access-Control-Allow-Origin', '*');
    const entrada = req.body.exp
    console.log(entrada)
    if(entrada == ""){
      alert("Entrada Vacia")
      return res.send("Cadena Vacia")
    }
    Program.consola = "";
    const result = parser.parse(entrada)
    console.log(result)
    try{
      const ambito = new Ambito(null)
      for(const inst of result){
        inst.execute(ambito);
      }
    }catch(error){
        console.log(error)
        Program.consola += error.getError()
    }
    console.log(Program.consola)

    const jsonData = {
      "res": String(Program.consola),
      "obj": result
    }

    return res.send(JSON.stringify(jsonData))

  });

  app.post('/ast',cors(), (req,res)=>{
    res.set('Access-Control-Allow-Origin', '*');
    const entrada = req.body.exp
    console.log(entrada)
    if(entrada == ""){
      console.log("Entrada Vacia")
      return res.send("Cadena Vacia")
    }

    const result = parser.parse(entrada)

    Program.AST += "digraph G{\n"

    let declaracion = Program.getNodo()
    Program.AST += "Nodo" + declaracion + '[label="instruciones"]'+ "\n"

    try{
      for(const inst of result){
        inst.graficar(declaracion);
      }
    }catch(error){
        console.log(error)
    }
    Program.AST += "}\n"
    console.log(Program.AST)

    const jsonData = {
      "res": Program.AST,
    }
    Program.AST = ""
    Program.NODO = 0
    return res.send(JSON.stringify(jsonData))

  });


app.use(express.json())
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );

