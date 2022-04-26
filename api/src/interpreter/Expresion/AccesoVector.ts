import { Error_ } from "../Error/Error";
import { Ambito } from "../Misc/Ambito";
import { Expresion } from "./Expresion";
import { Retorno, Type, defaults } from "./Retorno";
import { Program } from "../Misc/Program";

export class AccesoVector1 extends Expresion{
    constructor(private id:string, private index, linea:number, columna:number){
        super(linea, columna)
    }

    public execute(ambito: Ambito): Retorno {
        const index = this.index.execute(ambito)
        let value = ambito.getVector1(this.id)

        if(index.type != Type.INTEGER){
            throw new Error_(this.linea, this.columna, 'Semantico', "Indice no Valido");
        }
        console.log(ambito.tipoVector(this.id))
        if(ambito.tipoVector(this.id) == 2){
            console.log("here");
            const vec = ambito.getVector2(this.id)

            if( vec.valor[index.value] == undefined){
                return {value: new Array(vec.largo_j), type: Type.VECTOR, }
            }

            let array = []
            for(const val of  vec.valor[index.value]){
                if(val != undefined){
                    array.push(val)
                }else{
                    const def = defaults[vec.type]
                    array.push(def)
                }
            }

            return {value:array, type: Type.VECTOR, }
            
        }else{
            if(value != null){
                if(value.largo > index.value ){
                    
                        const res = value.valor[index.value]
                        if(res != undefined){
                            return {value:res, type:value.type}
                        }else{
                            const def = defaults[value.type]
                            return {value:def, type:value.type}
                        }
                        
                    }else{
                        throw new Error_(this.linea, this.columna, 'Semantico', "Indice fuera del rango");
                    }
            }else{
                throw new Error_(this.linea, this.columna, 'Semantico', `No se encuentra la variable "${this.id}"`);
            }
            
        }
    }

    public graficar(padre:number){
        let acceso = Program.getNodo()
        let vector = Program.getNodo()
        let indice = Program.getNodo()
        let id = Program.getNodo()

        Program.AST += "Nodo" + acceso + '[label="Vector"]'
        Program.AST += "Nodo" + padre + " -> Nodo" + acceso

        Program.AST += "Nodo" + vector + '[label="id"]'
        Program.AST += "Nodo" + acceso + " -> Nodo" + vector

        Program.AST += "Nodo" + id + '[label="' + this.id + '"]'
        Program.AST += "Nodo" + vector + " -> Nodo" + id

        Program.AST += "Nodo" + indice + '[label="indice"]'
        Program.AST += "Nodo" + acceso + " -> Nodo" + indice

        this.index.graficar(indice)

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

        if(index_i.type != Type.INTEGER || index_j.type != Type.INTEGER){
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
    
    public graficar(padre:number){

        let acceso = Program.getNodo()
        let vector = Program.getNodo()
        let indice_i = Program.getNodo()
        let indice_j = Program.getNodo()
        let id = Program.getNodo()

        Program.AST += "Nodo" + acceso + '[label="Vector"]'+ "\n"
        Program.AST += "Nodo" + padre + " -> Nodo" + acceso+ "\n"

        Program.AST += "Nodo" + vector + '[label="id"]'+ "\n"
        Program.AST += "Nodo" + acceso + " -> Nodo" + vector+ "\n"

        Program.AST += "Nodo" + id + '[label="' + this.id + '"]'+ "\n"
        Program.AST += "Nodo" + vector + " -> Nodo" + id+ "\n"

        Program.AST += "Nodo" + indice_i + '[label="indice"]'+ "\n"
        Program.AST += "Nodo" + acceso + " -> Nodo" + indice_i+ "\n"

        this.index_i.graficar(indice_i)

        Program.AST += "Nodo" + indice_j + '[label="indice"]'+ "\n"
        Program.AST += "Nodo" + acceso + " -> Nodo" + indice_j+ "\n"

        this.index_j.graficar(indice_j)

    }
}
