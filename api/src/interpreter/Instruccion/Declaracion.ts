import { Expresion } from "../Expresion/Expresion";
import { Ambito } from "../Misc/Ambito";
import { Instruccion } from "./Instruccion";
import { Error_ } from "../Error/Error";
import {Type} from "../Expresion/Retorno";

export class Declaracion extends Instruccion{
    constructor(private tipo:Type, private id:string, private value:Expresion, linea, columna){
        super(linea, columna)
    }

    public execute(ambito: Ambito) {
        const val = this.value.execute(ambito)
        if(val.type == this.tipo){
            ambito.setVal(this.id, val.value, val.type, this.linea, this.columna)
        }else{
            throw new Error_(this.linea, this.columna, 'Semantico', 'No se puede asignar: ' + this.tipo + ' a ' + val.type);
        }
        
    }
}