import { assert } from "console";
import express from "express";

const parser = require("./interpreter/grammar/grammar.js")
var bodyParser = require('body-parser')
const app = express();
const port = 3000; // default port to listen
const path = require('path');
const router = express.Router();


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/views/index.html'));
    //__dirname : It will resolve to your project folder.
  });

  app.post('/', (req,res)=>{
    const exp = req.body.exp
    const result = parser.parse(exp)
    console.log(result)
    return res.send(result.execute())

  });


app.use(express.json())
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );