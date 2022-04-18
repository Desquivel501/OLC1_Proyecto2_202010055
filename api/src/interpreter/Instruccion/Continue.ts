import { Ambito } from "../Misc/Ambito";
import { Instruccion } from "./Instruccion";

export class Continue extends Instruccion {
    constructor(linea, columna) {
        super(linea, columna)
    }

    public execute(ambito: Ambito) {
        return { type: 'Continue', line: this.linea, column: this.columna}
    }
}