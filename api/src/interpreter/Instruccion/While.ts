import { Ambito } from "../Misc/Ambito";
import { Instruccion } from "./Instruccion";
import { Error_ } from "../Error/Error";
import { Type } from "../Expresion/Retorno";
import { Program } from "../Misc/Program";
import { Statement } from "./Statement";

export class While extends Instruccion{
    constructor(private condicion, private cuerpo: Statement , linea, columna){
        super(linea, columna)
    }

    public execute(ambito: Ambito) {

        let condicion = this.condicion.execute(ambito);
        const nombre = "While (" + Program.noWhile + ")"
        Program.noWhile++;
        this.cuerpo.nombre = nombre;
        if(condicion.type != Type.BOOLEAN){
            throw new Error_(this.linea, this.columna, "Semantico", "La condicion de un While debe ser de tipo BOOLEAN");
        }

        if(this.cuerpo != null){
            while(condicion.value){
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
            }
        }
    }

    public graficar(padre:number){
        let declaracion = Program.getNodo()
        let While = Program.getNodo()
        let condicion = Program.getNodo()

        Program.AST += "Nodo" + declaracion + '[label="while"]'+ "\n"
        Program.AST += "Nodo" + padre + " -> Nodo" + declaracion+ "\n"

        Program.AST += "Nodo" + While + '[label="while"]'+ "\n"
        Program.AST += "Nodo" + declaracion + " -> Nodo" + While+ "\n"

        Program.AST += "Nodo" + condicion + '[label="condicion"]'+ "\n"
        Program.AST += "Nodo" + declaracion + " -> Nodo" + condicion+ "\n"

        this.condicion.graficar(condicion)

        this.cuerpo.graficar(declaracion)



    }
}