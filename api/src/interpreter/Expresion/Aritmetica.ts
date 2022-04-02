import { Error_ } from "../Error/Error";
import {Expresion} from "./Expresion";
import {Retorno, Type} from "./Retorno";
import { Ambito } from "../Misc/Ambito";

export class Aritmetica extends Expresion{

    constructor(private left:Expresion, private right: Expresion, private tipo: TipoAritmetico, linea: number, columna: number){
        super(linea, columna);
    }

    public execute(ambito:Ambito): Retorno{
        const leftValue = this.left.execute(ambito);
        const rightValue = this.right.execute(ambito);
        const tipoDominante = this.tipoDominante(leftValue.type, rightValue.type);

        switch(this.tipo){
            case TipoAritmetico.SUMA:{

                switch(tipoDominante){
                    case Type.NUMBER:{
                        if(leftValue.type == Type.CHAR && rightValue.type != Type.CHAR){
                            return{value:(leftValue.value.toString().charCodeAt(0) + rightValue.value), type: Type.NUMBER}
                        }
                        if(leftValue.type != Type.CHAR && rightValue.type == Type.CHAR){
                            return{value:(leftValue.value + rightValue.value.toString().charCodeAt(0)), type: Type.NUMBER}
                        }
                        return{value:(leftValue.value + rightValue.value), type: Type.NUMBER}
                    }
                    case Type.STRING:{
                        return{value:(leftValue.value.toString() + rightValue.value.toString()), type: Type.STRING}

                    }
                    case Type.DOBLE:{
                        return{value: leftValue.value + rightValue.value, type: Type.DOBLE}
                    }
                    default:{
                        throw new Error_(this.linea, this.columna, "SEMANTICO", "TIPOS INCOMPATIBLES");
                    }
                }
                break;
            }
            case TipoAritmetico.RESTA:{

                switch(tipoDominante){
                    case Type.NUMBER:{
                        if(leftValue.type == Type.CHAR && rightValue.type != Type.CHAR){
                            return{value:(leftValue.value.toString().charCodeAt(0) - rightValue.value), type: Type.NUMBER}
                        }
                        if(leftValue.type != Type.CHAR && rightValue.type == Type.CHAR){
                            return{value:(leftValue.value - rightValue.value.toString().charCodeAt(0)), type: Type.NUMBER}
                        }
                        return{value:(leftValue.value - rightValue.value), type: Type.NUMBER}
                    }
                    case Type.DOBLE:{
                        return{value:(leftValue.value - rightValue.value), type: Type.DOBLE}
                    }
                    default:{
                        throw new Error_(this.linea, this.columna, "SEMANTICO", "TIPOS INCOMPATIBLES");
                    }
                }
                break;
            }
            case TipoAritmetico.DIVISION:{
                if(leftValue.type == Type.BOOLEAN ||  rightValue.type == Type.BOOLEAN){
                    throw new Error_(this.linea, this.columna, "SEMANTICO", "TIPOS INCOMPATIBLES");
                }
                switch(tipoDominante){
                    case Type.NUMBER:{
                        if(rightValue.value == 0){
                            throw new Error_(this.linea, this.columna, "SEMANTICO", "NO SE PUEDE DIVIDIR ENTRE 0");
                        }
                        return{value:(leftValue.value / rightValue.value), type: Type.DOBLE}
                    }
                    case Type.DOBLE:{
                        if(rightValue.value == 0){
                            throw new Error_(this.linea, this.columna, "SEMANTICO", "NO SE PUEDE DIVIDIR ENTRE 0");
                        }
                        return{value:(leftValue.value / rightValue.value), type: Type.DOBLE}
                    }
                    default:{
                        throw new Error_(this.linea, this.columna, "SEMANTICO", "TIPOS INCOMPATIBLES");
                    }
                }
                break;
            }
            case TipoAritmetico.MULTIPLICACION:{

                if(leftValue.type == Type.BOOLEAN ||  rightValue.type == Type.BOOLEAN){
                    throw new Error_(this.linea, this.columna, "SEMANTICO", "TIPOS INCOMPATIBLES");
                }
                switch(tipoDominante){
                    case Type.NUMBER:{
                        return{value:(leftValue.value * rightValue.value), type: Type.NUMBER}
                    }
                    case Type.DOBLE:{
                        return{value:(leftValue.value * rightValue.value), type: Type.DOBLE}
                    }
                    default:{
                        throw new Error_(this.linea, this.columna, "SEMANTICO", "TIPOS INCOMPATIBLES");
                    }
                }
                break;
            }
            case TipoAritmetico.POTENCIA:{
                if(leftValue.type == Type.BOOLEAN ||  rightValue.type == Type.BOOLEAN){
                    throw new Error_(this.linea, this.columna, "SEMANTICO", "TIPOS INCOMPATIBLES");
                }
                if(leftValue.type == Type.CHAR ||  rightValue.type == Type.CHAR){
                    throw new Error_(this.linea, this.columna, "SEMANTICO", "TIPOS INCOMPATIBLES");
                }

                switch(tipoDominante){
                    case Type.NUMBER:{
                        return{value:(Math.pow(leftValue.value, rightValue.value)), type: Type.NUMBER}
                    }
                    case Type.DOBLE:{
                        return{value:(Math.pow(leftValue.value, rightValue.value)), type: Type.DOBLE}
                    }
                    default:{
                        throw new Error_(this.linea, this.columna, "SEMANTICO", "TIPOS INCOMPATIBLES");
                    }
                }
            }

            case TipoAritmetico.MODULO:{
                if(leftValue.type == Type.BOOLEAN ||  rightValue.type == Type.BOOLEAN){
                    throw new Error_(this.linea, this.columna, "SEMANTICO", "TIPOS INCOMPATIBLES");
                }
                if(leftValue.type == Type.CHAR ||  rightValue.type == Type.CHAR){
                    throw new Error_(this.linea, this.columna, "SEMANTICO", "TIPOS INCOMPATIBLES");
                }

                switch(tipoDominante){
                    case Type.NUMBER:{
                        return{value:(leftValue.value % rightValue.value), type: Type.NUMBER}
                    }
                    case Type.DOBLE:{
                        return{value:(leftValue.value % rightValue.value), type: Type.DOBLE}
                    }
                    default:{
                        throw new Error_(this.linea, this.columna, "SEMANTICO", "TIPOS INCOMPATIBLES");
                    }
                }
            }
        }

    }
}

export enum TipoAritmetico{
    SUMA,
    RESTA,
    DIVISION,
    MULTIPLICACION,
    POTENCIA,
    MODULO
}