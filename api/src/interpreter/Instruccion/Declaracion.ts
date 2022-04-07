import { Expresion } from "../Expresion/Expresion";
import { Ambito } from "../Misc/Ambito";
import { Instruccion } from "./Instruccion";
import { Error_ } from "../Error/Error";
import {Type} from "../Expresion/Retorno";
import { format } from "path";

export class Declaracion extends Instruccion{
    constructor(private tipo:Type, private ids:string[], private value:Expresion, private nueva:boolean, linea, columna){
        super(linea, columna)
    }

    public execute(ambito: Ambito) {
        if(this.nueva){
            if(this.value != null){
                const val = this.value.execute(ambito)
                if(val.type == this.tipo){
                    for(const id of this.ids){
                        if(ambito.getVal(id) != null){
                            throw new Error_(this.linea, this.columna, 'Semantico', 'La variable "' + id + '" ya ha sido declarada');
                        }
                        ambito.setVal(id, val.value, val.type, this.linea, this.columna)
                    }
                }else{
                    throw new Error_(this.linea, this.columna, 'Semantico', 'No se puede asignar: ' +  Type[val.type] + ' a ' + Type[this.tipo]);
                }
            }else{
                for(const id of this.ids){
                    const valor = defaults[this.tipo]
                    ambito.setVal(id, valor, this.tipo, this.linea, this.columna)
                }
            }
        }else{
            
            for(const id of this.ids){
                if(ambito.getVal(id) != null){
                    const val = this.value.execute(ambito)
                    console.log(id," ",val.value)
                    ambito.setVal(id, val.value, val.type, this.linea, this.columna)
                }else{
                    throw new Error_(this.linea, this.columna, 'Semantico', 'La variable "' + id + '" no ha sido declarada');
                }
            }
        }
    }
}

export const defaults = [
    0,
    0.0,
    true,
    "0",
    ""
]