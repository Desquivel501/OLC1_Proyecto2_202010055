import { Ambito } from "../Misc/Ambito";
import { Instruccion } from "./Instruccion";

export class Break extends Instruccion {
    constructor(linea, columna) {
        super(linea, columna)
    }

    public execute(ambito: Ambito) {
        return { type: 'Break', line: this.linea, column: this.columna}
    }
}