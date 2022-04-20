import { Error_ } from "../Error/Error";
import { Ambito } from "../Misc/Ambito";
import { Expresion } from "./Expresion";
import { Retorno, Type, defaults } from "./Retorno";

export class AccesoVector1 extends Expresion{
    constructor(private id:string, private index, linea:number, columna:number){
        super(linea, columna)
    }

    public execute(ambito: Ambito): Retorno {
        const index = this.index.execute(ambito)
        const value = ambito.getVector1(this.id)

        if(index.type != Type.NUMBER){
            throw new Error_(this.linea, this.columna, 'Semantico', "Indice no Valido");
        }
        if(value.largo > index.value ){
            if(value != null){
                const res = value.valor[index.value]
                if(res != undefined){
                    return {value:res, type:value.type}
                }else{
                    const def = defaults[value.type]
                    return {value:def, type:value.type}
                }
                
            } else{
                throw new Error_(this.linea, this.columna, 'Semantico', `No se encuentra la variable "${this.id}"`);
            }
        }
        throw new Error_(this.linea, this.columna, 'Semantico', "Indice fuera del rango");
        
    }
}

export class AccesoVector2 extends Expresion{
    constructor(private id:string, private index_i, private index_j, linea:number, columna:number){
        super(linea, columna)
    }

    public execute(ambito: Ambito): Retorno {
        const index_i = this.index_i.execute(ambito)
        const index_j = this.index_j.execute(ambito)

        const value = ambito.getVector2(this.id)

        if(index_i.type != Type.NUMBER || index_j.type != Type.NUMBER){
            throw new Error_(this.linea, this.columna, 'Semantico', "Indice no Valido");
        }
        if(value.largo_i > index_i.value && value.largo_j > index_j.value){
            if(value != null){
                const res = value.valor[index_i.value][index_j.value]
                if(res != undefined){
                    return {value:res, type:value.type}
                }else{
                    const def = defaults[value.type]
                    return {value:def, type:value.type}
                }
                
            } else{
                throw new Error_(this.linea, this.columna, 'Semantico', `No se encuentra la variable "${this.id}"`);
            }
        }
        throw new Error_(this.linea, this.columna, 'Semantico', "Indice fuera del rango");
        
    }
}
