import { Expresion } from "../Expresion/Expresion";
import { Ambito } from "../Misc/Ambito";
import { Instruccion } from "./Instruccion";
import { Program } from "../Misc/Program";

export class Print extends Instruccion{
    constructor(private values:Expresion[], private newLine:boolean, linea, columna){
        super(linea, columna)
    }

    public execute(ambito: Ambito) {
        var cadena = "";
        for (const value of this.values) {
            const val = value.execute(ambito)
            if(this.newLine){
                Program.consola += val.value + "\n";
            }else{
                Program.consola += val.value;
            }
        }
    }
}