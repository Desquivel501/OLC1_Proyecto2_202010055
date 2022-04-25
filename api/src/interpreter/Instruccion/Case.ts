import { Ambito } from "../Misc/Ambito";
import { Instruccion } from "./Instruccion";
import { Program } from "../Misc/Program";
import { Statement } from "./Statement";

export class Case extends Instruccion{
    constructor(public condicion, public cuerpo:Statement, linea, columna){
        super(linea, columna)
    }
    public execute(ambito: Ambito) {}

    public graficar(padre:number){
        let declaracion = Program.getNodo()
        let condicion = Program.getNodo()

        Program.AST += "Nodo" + declaracion + '[label="case"]'+ "\n"
        Program.AST += "Nodo" + padre + " -> Nodo" + declaracion+ "\n"

        
        Program.AST += "Nodo" + condicion + '[label="condicion"]'+ "\n"
        Program.AST += "Nodo" + declaracion + " -> Nodo" + condicion+ "\n"

        this.condicion.graficar(condicion)

        
        // Program.AST += "Nodo" + cuerpo + '[label="cuerpo"]'+ "\n"
        // Program.AST += "Nodo" + declaracion + " -> Nodo" + cuerpo+ "\n"

        this.cuerpo.graficar(declaracion)

    }
}