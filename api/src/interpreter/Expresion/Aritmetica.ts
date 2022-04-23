import { Error_ } from "../Error/Error";
import {Expresion} from "./Expresion";
import {Retorno, Type} from "./Retorno";
import { Ambito } from "../Misc/Ambito";
import { Program } from "../Misc/Program";

export class Aritmetica extends Expresion{

    constructor(private left:Expresion, private right: Expresion, private tipo: TipoAritmetico, linea: number, columna: number){
        super(linea, columna);
    }

    public execute(ambito:Ambito): Retorno{

        if(this.tipo == TipoAritmetico.INCRE){
            const leftValue = this.left.execute(ambito);
            if(leftValue.type == Type.NUMBER){
                return{value:(leftValue.value+1), type: Type.NUMBER}
            }else{
                throw new Error_(this.linea, this.columna, "Semantico", "Tipos Incompatibles");
            }

        }
        if(this.tipo == TipoAritmetico.DECRE){
            const leftValue = this.left.execute(ambito);
            if(leftValue.type == Type.NUMBER){
                return{value:(leftValue.value-1), type: Type.NUMBER}
            }else{
                throw new Error_(this.linea, this.columna, "Semantico", "Tipos Incompatibles");
            }
        }

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
                        throw new Error_(this.linea, this.columna, "Semantico", "Tipos Incompatibles");
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
                        throw new Error_(this.linea, this.columna, "Semantico", "Tipos Incompatibles");
                    }
                }
                break;
            }
            case TipoAritmetico.DIVISION:{
                if(leftValue.type == Type.BOOLEAN ||  rightValue.type == Type.BOOLEAN){
                    throw new Error_(this.linea, this.columna, "Semantico", "Tipos Incompatibles");
                }
                switch(tipoDominante){
                    case Type.NUMBER:{
                        if(rightValue.value == 0){
                            throw new Error_(this.linea, this.columna, "Semantico", "No se puede dividir entre 0");
                        }
                        return{value:(leftValue.value / rightValue.value), type: Type.DOBLE}
                    }
                    case Type.DOBLE:{
                        if(rightValue.value == 0){
                            throw new Error_(this.linea, this.columna, "Semantico", "No se puede dividir entre 0");
                        }
                        return{value:(leftValue.value / rightValue.value), type: Type.DOBLE}
                    }
                    default:{
                        throw new Error_(this.linea, this.columna, "Semantico", "Tipos Incompatibles");
                    }
                }
                break;
            }
            case TipoAritmetico.MULTIPLICACION:{

                if(leftValue.type == Type.BOOLEAN ||  rightValue.type == Type.BOOLEAN){
                    throw new Error_(this.linea, this.columna, "Semantico", "Tipos Incompatibles");
                }
                switch(tipoDominante){
                    case Type.NUMBER:{
                        return{value:(leftValue.value * rightValue.value), type: Type.NUMBER}
                    }
                    case Type.DOBLE:{
                        return{value:(leftValue.value * rightValue.value), type: Type.DOBLE}
                    }
                    default:{
                        throw new Error_(this.linea, this.columna, "Semantico", "Tipos Incompatibles");
                    }
                }
                break;
            }
            case TipoAritmetico.POTENCIA:{
                if(leftValue.type == Type.BOOLEAN ||  rightValue.type == Type.BOOLEAN){
                    throw new Error_(this.linea, this.columna, "Semantico", "Tipos Incompatibles");
                }
                if(leftValue.type == Type.CHAR ||  rightValue.type == Type.CHAR){
                    throw new Error_(this.linea, this.columna, "Semantico", "Tipos Incompatibles");
                }

                switch(tipoDominante){
                    case Type.NUMBER:{
                        return{value:(Math.pow(leftValue.value, rightValue.value)), type: Type.NUMBER}
                    }
                    case Type.DOBLE:{
                        return{value:(Math.pow(leftValue.value, rightValue.value)), type: Type.DOBLE}
                    }
                    default:{
                        throw new Error_(this.linea, this.columna, "Semantico", "Tipos Incompatibles");
                    }
                }
            }

            case TipoAritmetico.MODULO:{
                if(leftValue.type == Type.BOOLEAN ||  rightValue.type == Type.BOOLEAN){
                    throw new Error_(this.linea, this.columna, "Semantico", "Tipos Incompatibles");
                }
                if(leftValue.type == Type.CHAR ||  rightValue.type == Type.CHAR){
                    throw new Error_(this.linea, this.columna, "Semantico", "Tipos Incompatibles");
                }

                switch(tipoDominante){
                    case Type.NUMBER:{
                        return{value:(leftValue.value % rightValue.value), type: Type.NUMBER}
                    }
                    case Type.DOBLE:{
                        return{value:(leftValue.value % rightValue.value), type: Type.DOBLE}
                    }
                    default:{
                        throw new Error_(this.linea, this.columna, "Semantico", "Tipos Incompatibles");
                    }
                }
            }

        }

    }

    
    public graficar(padre:number){
        let aritmetica = Program.NODO
        Program.NODO++
        
        let op = Program.NODO;
        Program.NODO++

        Program.AST += "Nodo" + aritmetica + '[label="Aritmetica"]'+ "\n"
        Program.AST += "Nodo" + padre + " -> Nodo" + aritmetica+ "\n"

        if(this.tipo == TipoAritmetico.INCRE || this.tipo == TipoAritmetico.DECRE){

            this.left.graficar(aritmetica)
            Program.AST += "Nodo" + op + '[label=" ' + this.getOp() + ' "]'+ "\n"
            Program.AST += "Nodo" + aritmetica + " -> Nodo" + op+ "\n"
        }else{

            this.left.graficar(aritmetica)
            Program.AST += "Nodo" + op + '[label=" ' + this.getOp() + ' "]'+ "\n"
            Program.AST += "Nodo" + aritmetica + " -> Nodo" + op+ "\n"
            this.right.graficar(aritmetica)
        }

        
    }

    getOp(){
        switch(this.tipo){
            case TipoAritmetico.SUMA:
                return "+"
            case TipoAritmetico.RESTA:
                return "-"
            case TipoAritmetico.DIVISION:
                return "/"
            case TipoAritmetico.MULTIPLICACION:
                return "*"
            case TipoAritmetico.POTENCIA:
                return "^"
            case TipoAritmetico.MODULO:
                return "%"
            case TipoAritmetico.INCRE:
                return ""
        }
    }
}

export enum TipoAritmetico{
    SUMA,
    RESTA,
    DIVISION,
    MULTIPLICACION,
    POTENCIA,
    MODULO,
    INCRE,
    DECRE
}