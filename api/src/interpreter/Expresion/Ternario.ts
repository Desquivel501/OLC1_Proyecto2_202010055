import {Expresion} from "./Expresion";
import {Retorno, Type} from "./Retorno";
import { Ambito } from "../Misc/Ambito";
import { Error_ } from "../Error/Error";
import { Program } from "../Misc/Program";

export class Ternario extends Expresion{

    constructor(private condicion: Expresion, private left:Expresion, private right: Expresion, linea: number, columna: number){
        super(linea, columna);
    }

    public execute(ambito:Ambito): Retorno {
        const leftValue = this.left.execute(ambito);
        const rightValue = this.right.execute(ambito);
        const condicionValue = this.condicion.execute(ambito);

        console.log(condicionValue.value);
        if(condicionValue.value){
            return{value:(leftValue.value ), type: leftValue.type}
        }else{
            return{value:(rightValue.value), type: rightValue.type}
        }
    }

    public graficar(padre:number){
        let ternario = Program.NODO
        Program.NODO++
        
        let inte = Program.NODO;
        Program.NODO++
        
        let dos_p = Program.NODO;
        Program.NODO++

        Program.AST += "Nodo" + ternario + '[label="Ternario"]'+ "\n"
        Program.AST += "Nodo" + padre + " -> Nodo" + ternario+ "\n"

        this.condicion.graficar(ternario)

        Program.AST += "Nodo" + inte + '[label="?"]'+ "\n"
        Program.AST += "Nodo" + ternario + " -> Nodo" + inte+ "\n"

        this.left.graficar(ternario)

        Program.AST += "Nodo" + dos_p + '[label=":"]'+ "\n"
        Program.AST += "Nodo" + ternario + " -> Nodo" + dos_p+ "\n"

        this.right.graficar(ternario)

        
    }
}
