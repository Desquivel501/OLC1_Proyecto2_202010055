import { Expresion } from "../Expresion/Expresion";
import { Ambito } from "../Misc/Ambito";
import { Instruccion } from "./Instruccion";
import { Error_ } from "../Error/Error";
import {Type} from "../Expresion/Retorno";
import { format } from "path";


export class ModVector1 extends Instruccion{
    constructor(private id:string, private index, private value:Expresion,linea:number, columna:number){
        super(linea, columna)
    }

    public execute(ambito: Ambito) {
        const index = this.index.execute(ambito)

        if(index.type != Type.NUMBER){
            throw new Error_(this.linea, this.columna, 'Semantico', "Indice no Valido");
        }

        const vector = ambito.getVector1(this.id)
        const valor = this.value.execute(ambito)
        ambito.setVector1(this.id,valor.value,valor.type,index.value,this.linea,this.columna)
    }
}

export class ModVector2 extends Instruccion{
    constructor(private id:string, private index_i, private index_j, private value:Expresion,linea:number, columna:number){
        super(linea, columna)
    }

    public execute(ambito: Ambito) {
        const index_i = this.index_i.execute(ambito)
        const index_j = this.index_j.execute(ambito)

        if(index_i.type != Type.NUMBER || index_j.type != Type.NUMBER){
            throw new Error_(this.linea, this.columna, 'Semantico', "Indice no Valido");
        }

        const vector = ambito.getVector1(this.id)
        const valor = this.value.execute(ambito)
        ambito.setVector2(this.id, valor.value, valor.type, index_i.value, index_j.value, this.linea, this.columna)
    }
}
