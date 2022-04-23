import { Ambito } from "../Misc/Ambito";
import { Instruccion } from "./Instruccion";
import { Program } from "../Misc/Program";

export class Break extends Instruccion {
    constructor(linea, columna) {
        super(linea, columna)
    }

    public execute(ambito: Ambito) {
        return { type: 'Break', line: this.linea, column: this.columna}
    }

    public graficar(padre:number){
        let nodo = Program.NODO
        Program.NODO++

        Program.AST += "Nodo" + nodo + '[label="Break"]'+ "\n"
        Program.AST += "Nodo" + padre + " -> Nodo" + nodo+ "\n"
    }
}