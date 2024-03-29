import { Expresion } from "../Expresion/Expresion";
import { Ambito } from "../Misc/Ambito";
import { Instruccion } from "./Instruccion";
import { Error_ } from "../Error/Error";
import {Type} from "../Expresion/Retorno";
import { format } from "path";
import { Program } from "../Misc/Program";

export class ModVector1 extends Instruccion{
    constructor(private id:string, private index, private value:Expresion,linea:number, columna:number){
        super(linea, columna)
    }

    public execute(ambito: Ambito) {
        const index = this.index.execute(ambito)

        if(index.type != Type.INTEGER){
            throw new Error_(this.linea, this.columna, 'Semantico', "Indice no Valido");
        }

        const vector = ambito.getVector1(this.id)
        const valor = this.value.execute(ambito)
        ambito.setVector1(this.id,valor.value,valor.type,index.value,this.linea,this.columna)
    }

    
    public graficar(padre:number){
        let declaracion = Program.getNodo()
        let indice = Program.getNodo()
        let igual = Program.getNodo()
        let valor = Program.getNodo()
        let id = Program.getNodo()

        Program.AST += "Nodo" + declaracion + '[label="modificar vector"]'+ "\n"
        Program.AST += "Nodo" + padre + " -> Nodo" + declaracion+ "\n"


        Program.AST += "Nodo" + id + '[label="' + this.id +'"]'+ "\n"
        Program.AST += "Nodo" + declaracion + " -> Nodo" + id+ "\n"


        Program.AST += "Nodo" + indice + '[label="[indice]"]'+ "\n"
        Program.AST += "Nodo" + declaracion + " -> Nodo" + indice+ "\n"

        this.index.graficar(indice)

        Program.AST += "Nodo" + igual + '[label="igual"]'+ "\n"
        Program.AST += "Nodo" + declaracion + " -> Nodo" + igual+ "\n"

        Program.AST += "Nodo" + valor + '[label="valor"]'+ "\n"
        Program.AST += "Nodo" + declaracion + " -> Nodo" + valor+ "\n"

        this.value.graficar(valor)
    }
}

export class ModVector2 extends Instruccion{
    constructor(private id:string, private index_i, private index_j, private value:Expresion,linea:number, columna:number){
        super(linea, columna)
    }

    public execute(ambito: Ambito) {
        const index_i = this.index_i.execute(ambito)
        const index_j = this.index_j.execute(ambito)

        if(index_i.type != Type.INTEGER || index_j.type != Type.INTEGER){
            throw new Error_(this.linea, this.columna, 'Semantico', "Indice no Valido");
        }

        const vector = ambito.getVector1(this.id)
        const valor = this.value.execute(ambito)
        ambito.setVector2(this.id, valor.value, valor.type, index_i.value, index_j.value, this.linea, this.columna)
    }

    public graficar(padre:number){
        let declaracion = Program.getNodo()
        let indice = Program.getNodo()
        let indice2 = Program.getNodo()
        let igual = Program.getNodo()
        let valor = Program.getNodo()
        let id = Program.getNodo()
        
        Program.AST += "Nodo" + declaracion + '[label="modificar vector"]'+ "\n"
        Program.AST += "Nodo" + padre + " -> Nodo" + declaracion+ "\n"


        Program.AST += "Nodo" + id + '[label="' + this.id +'"]'+ "\n"
        Program.AST += "Nodo" + declaracion + " -> Nodo" + id+ "\n"


        Program.AST += "Nodo" + indice + '[label="[indice]"]'+ "\n"
        Program.AST += "Nodo" + declaracion + " -> Nodo" + indice+ "\n"

        this.index_i.graficar(indice)

        Program.AST += "Nodo" + indice2 + '[label="[indice]"]'+ "\n"
        Program.AST += "Nodo" + declaracion + " -> Nodo" + indice2+ "\n"

        this.index_j.graficar(indice)

        Program.AST += "Nodo" + igual + '[label="igual"]'+ "\n"
        Program.AST += "Nodo" + declaracion + " -> Nodo" + igual+ "\n"

        Program.AST += "Nodo" + valor + '[label="valor"]'+ "\n"
        Program.AST += "Nodo" + declaracion + " -> Nodo" + valor+ "\n"

        this.value.graficar(valor)
    }
}
