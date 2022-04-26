import { Console } from "console";
import { Program } from "../Misc/Program";

export class Error_{
    constructor(public line:any, public column:any , public tipo: string, public mensaje: string){
        Program.consola += "\n" +  this.getError() + "\n";
        Program.listaErrores.push(this)
    }

    public getError(){
        console.log(this.tipo + ", " + this.mensaje)
        return "Error " + this.tipo + " - " + this.mensaje + " (Linea " + this.line + "; Columna " + this.column + ")"
    }
}