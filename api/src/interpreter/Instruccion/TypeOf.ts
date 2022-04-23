import { Expresion } from "../Expresion/Expresion";
import { Ambito } from "../Misc/Ambito";
import { Instruccion } from "./Instruccion";
import { Type } from "../Expresion/Retorno";
import { Error_ } from "../Error/Error";
import { Program } from "../Misc/Program";

export class TypeOf extends Instruccion{
    constructor(private value:Expresion, linea, columna){
        super(linea, columna)
    }

    public execute(ambito: Ambito) {

        const valor = this.value.execute(ambito);
        return{value: Type[valor.type] , type: Type.STRING}
    }

    public graficar(padre:number){
        let declaracion = Program.NODO
        Program.NODO++

        Program.AST += "Nodo" + declaracion + '[label="typeof"]'+ "\n"
        Program.AST += "Nodo" + padre + " -> Nodo" + declaracion+ "\n"

        this.value.graficar(declaracion);

    }
}