import { Ambito } from "../Misc/Ambito";
import { Parametro } from "../Misc/Parametro";
import { Instruccion } from "./Instruccion";
import { Error_ } from "../Error/Error";
import { Type } from "../Expresion/Retorno";

export class Funcion extends Instruccion{
    constructor(public id, public statement: Instruccion, public parametros: Array<Parametro>, public tipo: Type, linea, columna){
        super(linea, columna)
    }

    public execute(ambito: Ambito) {
        ambito.guardarFuncion(this.id, this);
    }
}