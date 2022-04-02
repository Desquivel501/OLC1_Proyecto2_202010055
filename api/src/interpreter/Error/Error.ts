import { Console } from "console";

export class Error_{
    constructor(public line:number, public column:number, public tipo: string, public mensaje: string){
        console.log(tipo + ", " + mensaje)
    }
}