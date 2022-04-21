import { Expresion } from "../Expresion/Expresion";
import { Ambito } from "../Misc/Ambito";
import { Instruccion } from "./Instruccion";
import { Type } from "../Expresion/Retorno";
import { Error_ } from "../Error/Error";

export class Length extends Instruccion{
    constructor(private value:Expresion, linea, columna){
        super(linea, columna)
    }

    public execute(ambito: Ambito) {

        const valorActual = this.value.execute(ambito);

        if(valorActual.type == Type.STRING){
            const cadena = valorActual.value;
            return {value: cadena.length, type: Type.NUMBER}
        }else if(valorActual.type == Type.VECTOR){
            const vector = valorActual.value
            return {value: vector.length, type: Type.NUMBER}
            
        }
        
        else{
            throw new Error_(this.linea, this.columna, "Semantico", "El valor de la funcion length() debe ser de tipo STRING o VECTOR");
        }
    }
}