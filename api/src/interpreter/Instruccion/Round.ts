import { Expresion } from "../Expresion/Expresion";
import { Ambito } from "../Misc/Ambito";
import { Instruccion } from "./Instruccion";
import { Type } from "../Expresion/Retorno";
import { Error_ } from "../Error/Error";
import { Program } from "../Misc/Program";

export class Round extends Instruccion{
    constructor(private value:Expresion, linea, columna){
        super(linea, columna)
    }

    public execute(ambito: Ambito) {

        const valorActual = this.value.execute(ambito);
        if(valorActual.type == Type.DOBLE || valorActual.type == Type.INTEGER){
            const cadena = valorActual.value;
            return {value: Math.round(cadena) , type: Type.INTEGER}
        }else{
            throw new Error_(this.linea, this.columna, "Semantico", "El valor de la funcion toLower() debe ser de tipo numerico");
        }
    }

    public graficar(padre:number){
        let declaracion = Program.getNodo()

        Program.AST += "Nodo" + declaracion + '[label="round"]'+ "\n"
        Program.AST += "Nodo" + padre + " -> Nodo" + declaracion+ "\n"

        this.value.graficar(declaracion);

    }
}