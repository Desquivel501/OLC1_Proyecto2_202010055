import {Expresion} from "./Expresion";
import {Retorno, Type} from "./Retorno";
import { Ambito } from "../Misc/Ambito";
import { Program } from "../Misc/Program";

export class Literal extends Expresion{

    constructor(private valor:any, private tipo: TipoLiteral, linea: number, columna: number){
        super(linea, columna);
    }

    public execute(ambito:Ambito): Retorno {

        switch(this.tipo){
            case TipoLiteral.NUMBER:{
                return {value: Number(this.valor), type: Type.INTEGER}
            }
            case TipoLiteral.DOBLE:{
                return {value: Number(this.valor), type: Type.DOBLE}
            }
            case TipoLiteral.BOOLEAN:{
                if(this.valor.toString().toLowerCase() == "true"){
                    return {value: true, type: Type.BOOLEAN}
                }
                return {value: false, type: Type.BOOLEAN}
            }
            case TipoLiteral.CHAR:{
                return {value: this.valor.toString(), type: Type.CHAR}
            }
            case TipoLiteral.STRING:{
                return {value: this.valor.toString(), type: Type.STRING}
            }
        }
    }

    public graficar(padre:number){
        let acceso = Program.getNodo()
        let id = Program.getNodo()

        Program.AST += "Nodo" + acceso + '[label="Literal"]'+ "\n"
        Program.AST += "Nodo" + padre + " -> Nodo" + acceso+ "\n"

        Program.AST += "Nodo" + id + '[label="' +  this.valor  +  '\"]'+ "\n"
        Program.AST += "Nodo" + acceso + " -> Nodo" + id+ "\n"
    }
}

export enum TipoLiteral{
    NUMBER,
    DOBLE,
    BOOLEAN,
    CHAR,
    STRING
}