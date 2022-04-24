import { Expresion } from "../Expresion/Expresion";
import { Ambito } from "../Misc/Ambito";
import { Instruccion } from "./Instruccion";
import { Type } from "../Expresion/Retorno";
import { Error_ } from "../Error/Error";
import { Program } from "../Misc/Program";

export class ToUpper extends Instruccion{
    constructor(private value:Expresion, linea, columna){
        super(linea, columna)
    }

    public execute(ambito: Ambito) {

        const valorActual = this.value.execute(ambito);
        if(valorActual.type == Type.STRING){
            const cadena = valorActual.value;
            return {value: cadena.toUpperCase() , type: Type.STRING}
        }
        else{
            throw new Error_(this.linea, this.columna, "Semantico", "El valor de la funcion toUpper() debe ser de tipo STRING");
        }
    }

    public graficar(padre:number){
        let declaracion = Program.getNodo()
        
        Program.AST += "Nodo" + declaracion + '[label="toupper"]'+ "\n"
        Program.AST += "Nodo" + padre + " -> Nodo" + declaracion+ "\n"

        this.value.graficar(declaracion);

    }
}