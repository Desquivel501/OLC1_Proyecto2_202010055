import {Expresion} from "./Expresion";
import {Retorno, Type} from "./Retorno";
import { Ambito } from "../Misc/Ambito";
import { Error_ } from "../Error/Error";

export class Casteo extends Expresion{

    constructor(private nuevoTipo: Type, private valor:Expresion, linea: number, columna: number){
        super(linea, columna);
    }

    public execute(ambito:Ambito): Retorno {
        let valorActual = this.valor.execute(ambito);
        const casteo = this.casteoValido(valorActual.type, this.nuevoTipo);
        if(casteo == 1){
            switch(valorActual.type){
                case Type.NUMBER:{
                    if(this.nuevoTipo == Type.NUMBER){
                        return{value:(valorActual.value), type: Type.NUMBER}
                    }else if(this.nuevoTipo == Type.DOBLE){
                        return{value:(valorActual.value), type: Type.DOBLE}
                    }else if(this.nuevoTipo == Type.CHAR){
                        return{value:(String.fromCharCode(valorActual.value)), type: Type.CHAR}
                    }else{
                        throw new Error_(this.linea, this.columna, "Semantico", "No se puede castear de INT a " + Type[this.nuevoTipo]);
                    }
                }

                case Type.DOBLE:{
                    if(this.nuevoTipo == Type.NUMBER){
                        return{value:(Math.trunc(valorActual.value)), type: Type.NUMBER}
                    }else if(this.nuevoTipo == Type.DOBLE){
                        return{value:(valorActual.value), type: Type.DOBLE}
                    }else{
                        throw new Error_(this.linea, this.columna, "Semantico", "No se puede castear de DOBLE a " + Type[this.nuevoTipo]);
                    }
                }

                case Type.CHAR:{
                    if(this.nuevoTipo == Type.NUMBER){
                        return{value:(valorActual.value.toString().fromCharCodeAt(0)), type: Type.NUMBER}
                    }else if(this.nuevoTipo == Type.DOBLE){
                        return{value:(valorActual.value.toString().fromCharCodeAt(0)), type: Type.DOBLE}
                    }else if(this.nuevoTipo == Type.CHAR){
                        return{value:(valorActual.value), type: Type.CHAR}
                    }else{
                        throw new Error_(this.linea, this.columna, "Semantico", "No se puede castear de CHAR a " + Type[this.nuevoTipo]);
                    }
                }
            }
        }else{
            throw new Error_(this.linea, this.columna, "Semantico", "No se puede castear de " + Type[valorActual.type] + " a " + Type[this.nuevoTipo]);
        }
        
    }

}

