import { Error_ } from "../Error/Error";
import { Ambito } from "../Misc/Ambito";
import { Expresion } from "./Expresion";
import { Retorno } from "./Retorno";

export class Acceso extends Expresion{
    constructor(private id:string, linea:number, columna:number){
        super(linea, columna)
    }

    public execute(ambito: Ambito): Retorno {
        const value = ambito.getVal(this.id)
        if(value != null) return {value:value.valor, type:value.type}
        throw new Error_(this.linea, this.columna, 'Semantico', `No se encuentra la variable "${this.id}"`);
    }
}
