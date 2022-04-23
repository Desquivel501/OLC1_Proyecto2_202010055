import { Error_ } from "../Error/Error";
import { Ambito } from "../Misc/Ambito";
import { Expresion } from "./Expresion";
import { Retorno } from "./Retorno";
import {Type, defaults} from "../Expresion/Retorno";
import { Program } from "../Misc/Program";

export class Acceso extends Expresion{
    constructor(private id:string, linea:number, columna:number){
        super(linea, columna)
    }

    public execute(ambito: Ambito): Retorno {
        const value = ambito.getVal(this.id)
        if(value != null) return {value:value.valor, type:value.type}

        if(ambito.tipoVector(this.id) == 1){
            const vec = ambito.getVector1(this.id)
            return {value: vec.valor, type: Type.VECTOR}

        }else if(ambito.tipoVector(this.id) == 2){

            const vec = ambito.getVector2(this.id)
            let vector =[]
            for(const val_i of vec.valor){
                let sub_vector = []
                for(const val_j of val_i){
                    if(val_j != undefined){
                        sub_vector.push(val_j)
                    }else{
                        const def = defaults[vec.type]
                        sub_vector.push(def)
                    }
                    
                }
                vector.push(sub_vector)
            }
            return {value: vector, type: Type.VECTOR}
        }

        throw new Error_(this.linea, this.columna, 'Semantico', `No se encuentra la variable "${this.id}"`);
    }

    public graficar(padre:number){
        let acceso = Program.NODO
        Program.NODO++
        let id = Program.NODO;
        Program.NODO++

        Program.AST += "Nodo" + acceso + '[label="Acceso"]'+ "\n"
        Program.AST += "Nodo" + padre + " -> Nodo" + acceso+ "\n"

        Program.AST += "Nodo" + id + '[label="' +  this.id +  '"]'+ "\n"
        Program.AST += "Nodo" + acceso + " -> Nodo" + id+ "\n"
    }
}
