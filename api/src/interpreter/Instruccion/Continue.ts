import { Ambito } from "../Misc/Ambito";
import { Instruccion } from "./Instruccion";
import { Program } from "../Misc/Program";

export class Continue extends Instruccion {
    constructor(linea, columna) {
        super(linea, columna)
    }

    public execute(ambito: Ambito) {
        return { type: 'Continue', line: this.linea, column: this.columna}
    }

    public graficar(padre:number){
        let nodo = Program.getNodo()

        Program.AST += "Nodo" + nodo + '[label="Continue"]'+ "\n"
        Program.AST += "Nodo" + padre + " -> Nodo" + nodo+ "\n"
    }
}