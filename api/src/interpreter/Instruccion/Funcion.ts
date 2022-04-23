import { Ambito } from "../Misc/Ambito";
import { Parametro } from "../Misc/Parametro";
import { Instruccion } from "./Instruccion";
import { Error_ } from "../Error/Error";
import { Type } from "../Expresion/Retorno";
import { Program } from "../Misc/Program";

export class Funcion extends Instruccion{
    constructor(public id, public statement: Instruccion, public parametros: Array<Parametro>, public tipo: Type, linea, columna){
        super(linea, columna)
    }

    public execute(ambito: Ambito) {
        ambito.guardarFuncion(this.id, this);
    }

    public graficar(padre:number){
        let declaracion = Program.NODO
        Program.NODO++
        
        let id = Program.NODO;
        Program.NODO++

        let parametros = Program.NODO;
        Program.NODO++

        Program.AST += "Nodo" + declaracion + '[label="declaracion funcion"]'+ "\n"
        Program.AST += "Nodo" + padre + " -> Nodo" + declaracion+ "\n"

        Program.AST += "Nodo" + id + '[label="' + this.id +'"]'+ "\n"
        Program.AST += "Nodo" + declaracion + " -> Nodo" + id+ "\n"

        Program.AST += "Nodo" + parametros + '[label="parametros"]'+ "\n"
        Program.AST += "Nodo" + declaracion + " -> Nodo" + parametros + "\n"

        for(const val of this.parametros){
            let par = Program.NODO;
            Program.AST += "Nodo" + par + '[label="' + val.id +'"]'+ "\n"
            Program.AST += "Nodo" + parametros + " -> Nodo" + par + "\n"
            Program.NODO++
        }

        this.statement.graficar(declaracion)

    }
}