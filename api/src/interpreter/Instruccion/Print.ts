import { Expresion } from "../Expresion/Expresion";
import { Ambito } from "../Misc/Ambito";
import { Instruccion } from "./Instruccion";

export class Print extends Instruccion{
    constructor(private values:Expresion[],linea, columna){
        super(linea, columna)
    }

    public execute(ambito: Ambito) {
        for (const value of this.values) {
            const val = value.execute(ambito)
            console.log(val.value)
        }
    }
}