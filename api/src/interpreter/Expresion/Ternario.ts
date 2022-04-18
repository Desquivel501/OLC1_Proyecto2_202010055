import {Expresion} from "./Expresion";
import {Retorno, Type} from "./Retorno";
import { Ambito } from "../Misc/Ambito";
import { Error_ } from "../Error/Error";

export class Ternario extends Expresion{

    constructor(private condicion: Expresion, private left:Expresion, private right: Expresion, linea: number, columna: number){
        super(linea, columna);
    }

    public execute(ambito:Ambito): Retorno {
        let leftValue = this.left.execute(ambito);
        let rightValue = this.right.execute(ambito);
        let condicionValue = this.condicion.execute(ambito);

        console.log(condicionValue.value);
        if(condicionValue.value){
            return{value:(leftValue.value ), type: leftValue.type}
        }else{
            return{value:(rightValue.value), type: rightValue.type}
        }
    }
}