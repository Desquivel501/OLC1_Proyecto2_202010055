import { Expresion } from "../Expresion/Expresion";
import { Ambito } from "../Misc/Ambito";
import { Instruccion } from "./Instruccion";
import { Program } from "../Misc/Program";
import {Type} from "../Expresion/Retorno";

export class Print extends Instruccion{
    constructor(private values:Expresion[], private newLine:boolean, linea, columna){
        super(linea, columna)
    }

    public execute(ambito: Ambito) {
        for (const value of this.values) {
            const val = value.execute(ambito)
            let cadena = val.value;

            if(val.value == null || val.value == undefined){
                continue;
            }

            if(typeof cadena == "string"){
                cadena = cadena.replace(/\\n/,"\n")
                cadena = cadena.replace(/\\\\/,"\\")
                cadena = cadena.replace(/\\"/,"\"")
                cadena = cadena.replace(/\\'/,"\'")
                cadena = cadena.replace(/\\t/,"\t")
            }

            if(this.isVector(val.type)){
                if(Array.isArray(val.value)){
                    let vector = ""
                    for(const valor of val.value){
                        vector += "[" + valor + "],"
                    }
                    vector = vector.substring(0,vector.length-1)
                    Program.consola += "[" + vector + "]"
                    
                }else{
                    Program.consola += "[" + val.value + "]"
                }
            }else{
                Program.consola += cadena
            }

        }
        if(this.newLine){
            Program.consola += "\n";
        }
    }

    private isVector(tipo:Type){
        switch(tipo){
            case Type.VECTOR_INTEGER:
                return true
            case Type.VECTOR_DOBLE:
                return true
            case Type.VECTOR_CHAR:
                return true
            case Type.VECTOR_BOOLEAN:
                return true
            case Type.VECTOR_STRING:  
                return true
            default:
                return false
        }
    }

    public graficar(padre:number){
        let declaracion = Program.getNodo()

        if(this.newLine){
            Program.AST += "Nodo" + declaracion + '[label="println"]'+ "\n"
            Program.AST += "Nodo" + padre + " -> Nodo" + declaracion+ "\n"
        }else{
            Program.AST += "Nodo" + declaracion + '[label="print"]'+ "\n"
            Program.AST += "Nodo" + padre + " -> Nodo" + declaracion+ "\n"
        }

        for(const exp of this.values){
            exp.graficar(declaracion)
        }
    }
}