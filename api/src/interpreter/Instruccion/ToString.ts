import { Expresion } from "../Expresion/Expresion";
import { Ambito } from "../Misc/Ambito";
import { Instruccion } from "./Instruccion";
import { Type } from "../Expresion/Retorno";
import { Error_ } from "../Error/Error";
import { Program } from "../Misc/Program";

export class ToString extends Instruccion{
    constructor(private value:Expresion, linea, columna){
        super(linea, columna)
    }

    public execute(ambito: Ambito) {

        const valorActual = this.value.execute(ambito);
        if(valorActual.type == Type.BOOLEAN || valorActual.type == Type.DOBLE || valorActual.type == Type.INTEGER){
            const cadena = valorActual.value;
            return {value: cadena , type: Type.STRING}
        }else{
            throw new Error_(this.linea, this.columna, "Semantico", "El valor de la funcion toString() debe ser de tipo INTEGER, DOUBLE o BOOLEAN");
        }
    }

    public graficar(padre:number){
        let declaracion = Program.getNodo()

        Program.AST += "Nodo" + declaracion + '[label="toString"]'+ "\n"
        Program.AST += "Nodo" + padre + " -> Nodo" + declaracion+ "\n"

        this.value.graficar(declaracion);

    }
}