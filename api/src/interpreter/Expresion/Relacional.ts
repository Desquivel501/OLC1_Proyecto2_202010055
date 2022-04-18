import {Expresion} from "./Expresion";
import {Retorno, Type} from "./Retorno";
import { Ambito } from "../Misc/Ambito";
import { Error_ } from "../Error/Error";

export class Relacional extends Expresion{

    constructor(private left:Expresion, private right: Expresion, private tipo: TipoRelacional, linea: number, columna: number){
        super(linea, columna);
    }

    public execute(ambito:Ambito): Retorno {
        const leftValue = this.left.execute(ambito);
        const rightValue = this.right.execute(ambito);
        const tipoR = this.tipoRelacional(leftValue.type, rightValue.type)

        if(this.tipo == TipoRelacional.NOT){
            if(leftValue.type == Type.BOOLEAN){
                return{value:(!leftValue.value), type: Type.BOOLEAN}
            }else{
                throw new Error_(this.linea, this.columna, "Semantico", "No se puede realizar operacion logica en  " + Type[leftValue.type]);
            }
        }

        if(leftValue.type == Type.CHAR && rightValue.type != Type.CHAR){
            leftValue.value = leftValue.value.toString().charCodeAt(0)
        }
        if(leftValue.type != Type.CHAR && rightValue.type == Type.CHAR){
            rightValue.value = rightValue.value.toString().charCodeAt(0)
        }
        if(leftValue.type == Type.CHAR && rightValue.type == Type.CHAR){
            leftValue.value = leftValue.value.toString().charCodeAt(0)
            rightValue.value = rightValue.value.toString().charCodeAt(0)
        }


        if(tipoR == 1){
            switch(this.tipo){
                case TipoRelacional.MAYOR:{
                    return{value:(leftValue.value > rightValue.value), type: Type.BOOLEAN}
                }
                case TipoRelacional.MENOR:{
                    return{value:(leftValue.value < rightValue.value), type: Type.BOOLEAN}
                }
                case TipoRelacional.DIFERENTE:{
                    return{value:(leftValue.value != rightValue.value), type: Type.BOOLEAN}
                }
                case TipoRelacional.IGUAL_IGUAL:{
                    return{value:(leftValue.value == rightValue.value), type: Type.BOOLEAN}
                }
                case TipoRelacional.MAYOR_IGUAL:{
                    return{value:(leftValue.value >= rightValue.value), type: Type.BOOLEAN}
                }
                case TipoRelacional.MENOR_IGUAL:{
                    return{value:(leftValue.value <= rightValue.value), type: Type.BOOLEAN}
                }
                case TipoRelacional.AND:{
                    if(leftValue.value == true && rightValue.value == true){
                        return{value:(true), type: Type.BOOLEAN}
                    }else{
                        return{value:(false), type: Type.BOOLEAN}
                    }

                }
                case TipoRelacional.OR:{
                    if(leftValue.value == true || rightValue.value == true){
                        return{value:(true), type: Type.BOOLEAN}
                    }else{
                        return{value:(false), type: Type.BOOLEAN}
                    }

                }
            }
        }else{
            throw new Error_(this.linea, this.columna, "Semantico", "No se puede realizar operacion relacional entre " + Type[leftValue.type] + " y " + Type[rightValue.type]);
        }

    }
}

export enum TipoRelacional{
    MAYOR,
    MENOR,
    DIFERENTE,
    IGUAL_IGUAL,
    MAYOR_IGUAL,
    MENOR_IGUAL,
    NOT,
    AND,
    OR
}