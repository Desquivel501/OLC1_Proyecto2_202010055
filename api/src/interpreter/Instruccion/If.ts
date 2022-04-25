import { Ambito } from "../Misc/Ambito";
import { Instruccion } from "./Instruccion";
import { Error_ } from "../Error/Error";
import { Type } from "../Expresion/Retorno";
import { Program } from "../Misc/Program";
import { Statement } from "./Statement";

export class If extends Instruccion{
    constructor(private condicion, private cuerpo: Statement, private Else: Statement, linea, columna){
        super(linea, columna)
    }

    public execute(ambito: Ambito) {
        const valor = this.condicion.execute(ambito);
        const nombre = "If (" + Program.noIf + ")"
        Program.noIf++

        if(valor.type != Type.BOOLEAN){
            throw new Error_(this.linea, this.columna, "Semantico", "La condicion de un If debe ser de tipo BOOLEAN");
        }
        if(valor.value){
            this.cuerpo.nombre = nombre
            return this.cuerpo.execute(ambito)
        }else if(this.Else != null){
            this.Else.nombre = nombre
            return this.Else.execute(ambito)
        }
    }

    public graficar(padre:number){
        let declaracion = Program.getNodo()
        let IF = Program.getNodo()
        let condicion = Program.getNodo()
        let Else = Program.getNodo()

        Program.AST += "Nodo" + declaracion + '[label="if"]'+ "\n"
        Program.AST += "Nodo" + padre + " -> Nodo" + declaracion+ "\n"

        Program.AST += "Nodo" + IF + '[label="if"]'+ "\n"
        Program.AST += "Nodo" + declaracion + " -> Nodo" + IF+ "\n"

        Program.AST += "Nodo" + condicion + '[label="condicion"]'+ "\n"
        Program.AST += "Nodo" + declaracion + " -> Nodo" + condicion+ "\n"

        this.condicion.graficar(condicion)

        // Program.AST += "Nodo" + cuerpo + '[label="cuerpo"]'+ "\n"
        // Program.AST += "Nodo" + declaracion + " -> Nodo" + cuerpo+ "\n"

        this.cuerpo.graficar(declaracion)

        if(this.Else != null){
            Program.AST += "Nodo" + Else + '[label="else"]'+ "\n"
            Program.AST += "Nodo" + declaracion + " -> Nodo" + Else+ "\n"

            this.Else.graficar(Else)
        }

    }
}