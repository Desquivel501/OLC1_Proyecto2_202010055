import { Ambito } from "../Misc/Ambito";
import { Parametro } from "../Misc/Parametro";
import { Instruccion } from "./Instruccion";
import { Error_ } from "../Error/Error";
import { Type } from "../Expresion/Retorno";
import { Expresion } from "../Expresion/Expresion";

export class Llamada extends Instruccion{
    constructor(public id, private listaExpresiones: Array<Expresion> , linea, columna){
        super(linea, columna)
    }

    public execute(ambito: Ambito) {
        const funcion = ambito.getFuncion(this.id);
        if(funcion == null){
            throw new Error_(this.linea, this.columna, 'Semantico', 'La funcion "' + this.id + '" no se ha encontrado');
        }
        if(this.listaExpresiones.length != funcion.parametros.length){
            throw new Error_(this.linea, this.columna, 'Semantico', 'Cantidad de parametros incorrecta');
        }

        const newEnv = new Ambito(ambito.getGlobal());
        for(let i = 0; i < this.listaExpresiones.length; i++){
            const value = this.listaExpresiones[i].execute(ambito);
            if(funcion.parametros[i].type != value.type){
                throw new Error_(this.linea, this.columna, 'Semantico', 'Tipo incorrecto en el parametro "' + funcion.parametros[i].id + '"');
            }else{
                newEnv.setVal(funcion.parametros[i].id, value.value, value.type, this.linea, this.columna)
            }
        }
        const res = funcion.statement.execute(newEnv);

        if(funcion.tipo != Type.VOID){
            if(res?.type == "Return"){

                if(res.value.type == funcion.tipo){
                    return {value:res.value.value, type: res.value.type}
                }else{
                    throw new Error_(this.linea, this.columna, 'Semantico', 'La funcion "' + funcion.id + '" debe poseer un Return de tipo ' + Type[funcion.tipo]);
                }
            }else{
                throw new Error_(this.linea, this.columna, 'Semantico', 'La funcion "' + funcion.id + '" debe poseer un Return de tipo ' + Type[funcion.tipo]);
            }
        }

        return {value:null, type: Type.VOID}
    }
}