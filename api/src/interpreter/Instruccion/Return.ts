import { Expresion } from "../Expresion/Expresion";
import { Ambito } from "../Misc/Ambito";
import { Instruccion } from "./Instruccion";

export class Return extends Instruccion {
    constructor(public value: Expresion, linea, columna) {
        super(linea, columna)
    }

    public execute(ambito: Ambito) {
        const valor = this.value.execute(ambito)
        return { type: 'Return', value: valor , line: this.linea, column: this.columna}
    }
}