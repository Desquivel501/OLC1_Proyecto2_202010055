
import { Console } from "console";
import express from "express";
import { Ambito } from "./interpreter/Misc/Ambito";
import { Program } from "./interpreter/Misc/Program";
import { Funcion} from "./interpreter/Instruccion/Funcion";

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
  });

  app.post('/',cors(), (req,res)=>{
    res.set('Access-Control-Allow-Origin', '*');
    const entrada = req.body.exp
    console.log(entrada)
    if(entrada == ""){
      alert("Entrada Vacia")
      return res.send("Cadena Vacia")
    }

    Program.reset()
    let result= parser.parse(entrada)    

    console.log(result)

    Program.AST = "digraph G{\n"
    let declaracion = Program.getNodo()
    Program.AST += "Nodo" + declaracion + '[label="instruciones"]'+ "\n"


    try{
      const ambito = new Ambito(null,"-")

      for(const inst of result){
        if(inst instanceof Funcion){
          inst.execute(ambito)
        }
      }

      for(const inst of result){
        if(!(inst instanceof Funcion)){
          inst.execute(ambito);
        }
        inst.graficar(declaracion);
      }
    }catch(error){
        console.log(error)
    }

    Program.AST += "}\n"
    
    console.log(Program.consola)

    const jsonData = {
      "res": String(Program.consola),
      "ast": Program.AST,
      "tabla":Program.imprimirTabla(),
      "errores":Program.imprimirErrores()
    }
    
    return res.send(JSON.stringify(jsonData))

  });


app.use(express.json())
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );



