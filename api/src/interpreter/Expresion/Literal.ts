import {Expresion} from "./Expresion";
import {Retorno, Type} from "./Retorno";
import { Ambito } from "../Misc/Ambito";

export class Literal extends Expresion{

    constructor(private valor:any, private tipo: TipoLiteral, linea: number, columna: number){
        super(linea, columna);
    }

    public execute(ambito:Ambito): Retorno {

        switch(this.tipo){
            case TipoLiteral.NUMBER:{
                return {value: Number(this.valor), type: Type.NUMBER}
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
}

export enum TipoLiteral{
    NUMBER,
    DOBLE,
    BOOLEAN,
    CHAR,
    STRING
}