import { Console } from "console";

export class Error_{
    constructor(public line:number, public column:number, public tipo: string, public mensaje: string){
        console.log(tipo + ", " + mensaje)
    }

    public getError(){
        return "Error " + this.tipo + " - " + this.mensaje + " (Linea " + this.line + "; Columna " + this.column + ")"
    }
}