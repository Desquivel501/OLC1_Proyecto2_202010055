
import { Ambito } from "../Misc/Ambito";

export abstract class Instruccion{
    constructor(public linea: number, public columna: number) {
    }

    public abstract execute(ambito:Ambito);
}
