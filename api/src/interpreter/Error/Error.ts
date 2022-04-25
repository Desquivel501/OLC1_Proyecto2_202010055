import { Console } from "console";
import { Program } from "../Misc/Program";

export class Error_{
    constructor(public line:number, public column:number, public tipo: string, public mensaje: string){
        console.log(tipo + ", " + mensaje)
        Program.listaErrores.push(this)
    }

    public getError(){
        return "Error " + this.tipo + " - " + this.mensaje + " (Linea " + this.line + "; Columna " + this.column + ")"
    }
}