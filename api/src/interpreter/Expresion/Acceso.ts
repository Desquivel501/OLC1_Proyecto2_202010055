import { Error_ } from "../Error/Error";
import { Ambito } from "../Misc/Ambito";
import { Expresion } from "./Expresion";
import { Retorno } from "./Retorno";
import {Type, defaults} from "../Expresion/Retorno";
import { Program } from "../Misc/Program";
import { REFUSED } from "dns";

export class Acceso extends Expresion{
    constructor(private id:string, linea:number, columna:number){
        super(linea, columna)
    }

    public execute(ambito: Ambito): Retorno {
        const value = ambito.getVal(this.id)
        if(value != null) return {value:value.valor, type:value.type}

        console.log(this.id)

        if(ambito.tipoVector(this.id) == 1){
            console.log("here1")
            const vec = ambito.getVector1(this.id)

            

            return {value: vec.valor, type: this.getTipo(vec.type)}

             
        }else if(ambito.tipoVector(this.id) == 2){
            console.log("here2")
            const vec = ambito.getVector2(this.id)
            
            let vector = []
            for(const val_i of vec.valor){

                let sub_vector = [];
                // if(val_i == undefined || val_i == null) continue;   
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
            return {value: vector, type: this.getTipo(vec.type)}
        }

        throw new Error_(this.linea, this.columna, 'Semantico', `No se encuentra la variable "${this.id}"`);
    }

    private getTipo(tipo:Type){
        switch(tipo){
            case Type.INTEGER:
                return Type.VECTOR_INTEGER
            case Type.DOBLE:
                return Type.VECTOR_DOBLE 
            case Type.CHAR:
                return Type.VECTOR_CHAR
            case Type.BOOLEAN:
                return Type.VECTOR_BOOLEAN
            case Type.STRING:
                return Type.VECTOR_STRING  
        }
    }

    public graficar(padre:number){
        let acceso = Program.getNodo()
        let id = Program.getNodo()

        Program.AST += "Nodo" + acceso + '[label="Acceso"]'+ "\n"
        Program.AST += "Nodo" + padre + " -> Nodo" + acceso+ "\n"

        Program.AST += "Nodo" + id + '[label="' +  this.id +  '"]'+ "\n"
        Program.AST += "Nodo" + acceso + " -> Nodo" + id+ "\n"
    }
}
