import { Ambito } from "../Misc/Ambito";
import { Instruccion } from "./Instruccion";
import { Case } from "./Case";
import { Error_ } from "../Error/Error";
import { Type } from "../Expresion/Retorno";
import { Program } from "../Misc/Program";

export class DoWhile extends Instruccion{
    constructor(private condicion, private cuerpo: Instruccion , linea, columna){
        super(linea, columna)
    }

    public execute(ambito: Ambito) {

        let condicion = this.condicion.execute(ambito);

        if(condicion.type != Type.BOOLEAN){
            throw new Error_(this.linea, this.columna, "Semantico", "La condicion de un While debe ser de tipo BOOLEAN");
        }

        if(this.cuerpo != null){
            do {
                const res = this.cuerpo.execute(ambito);
                if (res != null && res != undefined) {
                    if (res.type == 'Break') {
                        break
                    }else if(res.type == "Continue"){
                        continue
                    }else if(res.type == "Return"){
                        return res;
                    }
                }
                condicion = this.condicion.execute(ambito);
            } while(condicion.value)
        }
    }

    public graficar(padre:number){
        let declaracion = Program.getNodo()
        let Do = Program.getNodo()
        let While = Program.getNodo()
        let cuerpo = Program.getNodo()
        let condicion = Program.getNodo()

        Program.AST += "Nodo" + declaracion + '[label="do while"]'+ "\n"
        Program.AST += "Nodo" + padre + " -> Nodo" + declaracion+ "\n"

        Program.AST += "Nodo" + Do + '[label="do"]'+ "\n"
        Program.AST += "Nodo" + declaracion + " -> Nodo" + Do+ "\n"

        // Program.AST += "Nodo" + cuerpo + '[label="cuerpo"]'+ "\n"
        // Program.AST += "Nodo" + declaracion + " -> Nodo" + cuerpo+ "\n"

        this.cuerpo.graficar(declaracion)

        Program.AST += "Nodo" + While + '[label="while"]'+ "\n"
        Program.AST += "Nodo" + declaracion + " -> Nodo" + While+ "\n"

        Program.AST += "Nodo" + condicion + '[label="condicion"]'+ "\n"
        Program.AST += "Nodo" + declaracion + " -> Nodo" + condicion+ "\n"

        this.condicion.graficar(condicion)

    }
}