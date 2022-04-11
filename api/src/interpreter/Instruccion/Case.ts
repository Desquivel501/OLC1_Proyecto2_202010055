import { Ambito } from "../Misc/Ambito";
import { Instruccion } from "./Instruccion";

export class Case extends Instruccion{
    constructor(public condicion, public cuerpo:Instruccion, linea, columna){
        super(linea, columna)
    }

    public execute(ambito: Ambito) {

    }   
    
}