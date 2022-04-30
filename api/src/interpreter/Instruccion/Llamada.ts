import { Ambito } from "../Misc/Ambito";
import { Parametro } from "../Misc/Parametro";
import { Instruccion } from "./Instruccion";
import { Error_ } from "../Error/Error";
import { Type } from "../Expresion/Retorno";
import { Expresion } from "../Expresion/Expresion";
import { Program } from "../Misc/Program";
import { Print } from "./Print";

export class Llamada extends Instruccion{
    constructor(public id, private listaExpresiones: Array<Expresion> , private main: boolean, linea, columna){
        super(linea, columna)
    }

    public execute(ambito: Ambito) {

        if(!this.main){
            throw new Error_(this.linea, this.columna, 'Semantico', 'Funcion "' + this.id + '" llamada sin el comando "Run"');
        }

        const funcion = ambito.getFuncion(this.id);
        if(funcion == null){
            
            throw new Error_(this.linea, this.columna, 'Semantico', 'La funcion "' + this.id + '" no se ha encontrado');
        }
        if(this.listaExpresiones.length != funcion.parametros.length){
            throw new Error_(this.linea, this.columna, 'Semantico', 'Cantidad de parametros incorrecta');
        }


        const nombre = "Funcion " + this.id;
    

        const newEnv = new Ambito(ambito.getGlobal(), nombre);
        for(let i = 0; i < this.listaExpresiones.length; i++){
            const value = this.listaExpresiones[i].execute(ambito);

            if(funcion.parametros[i].vector || this.isVector(value.type)){
                console.log("vector-------------------------------------------------------------")

                console.log(Type[funcion.parametros[i].type] + " -- " + Type[this.getTipo(value.type)] + "-" + value.type)

                if(funcion.parametros[i].type == this.getTipo(value.type)){
                    console.log("vector-------------------------------------------------------------2")
                    if(Array.isArray(value.value[0])){
                        let length_i = 0;
                        let length_j = 0;
                        let first = true
                        let array = []
                        length_i = value.value.length
                        for(const val of value.value){
                            array.push(val)
                            if(first){
                                length_j = val.length
                                first = false
                            }else{
                                if(val.length != length_j){
                                    throw new Error_(this.linea, this.columna, 'Semantico', 'Largo del vector incorrecto');
                                }
                            }
                        }

                        newEnv.crearVector2(funcion.parametros[i].id,this.getTipo(value.type),length_i,length_j,this.linea,this.columna,true)
                       for(const val of array){
                            newEnv.pushVector(funcion.parametros[i].id,val,this.getTipo(value.type))
                       }
                    }else{
                        newEnv.crearVector1(funcion.parametros[i].id,this.getTipo(value.type),value.value.length,this.linea,this.columna)

                        let j = 0;
                        for (const val of value.value) {     
                            newEnv.setVector1(funcion.parametros[i].id,val,this.getTipo(value.type),j,this.linea,this.columna);
                            j++;
                        } 
                    }
                }
            }

            else if(funcion.parametros[i].type != value.type){
                throw new Error_(this.linea, this.columna, 'Semantico', 'Tipo incorrecto en el parametro "' + funcion.parametros[i].id + '"');
            }
            else{
                newEnv.setVal(funcion.parametros[i].id, value.value, value.type, this.linea, this.columna)
            }
        }
        funcion.statement.nombre = nombre
        const res = funcion.statement.execute(newEnv);

        if(funcion.tipo != Type.VOID){
            
            if(res?.type == "Return"){

                if(res.value.type == funcion.tipo){
                    return {value:res.value.value, type: res.value.type}
                }
                
                else{
                    throw new Error_(this.linea, this.columna, 'Semantico', 'La funcion "' + funcion.id + '" debe poseer un Return de tipo ' + Type[funcion.tipo]);
                }
            }else{
                throw new Error_(this.linea, this.columna, 'Semantico', 'La funcion "' + funcion.id + '" debe poseer un Return de tipo ' + Type[funcion.tipo]);
            }
        }
        return {value:null, type: Type.VOID}
    }

    private isVector(tipo:Type){
        switch(tipo){
            case Type.VECTOR_INTEGER:
                return true
            case Type.VECTOR_DOBLE:
                return true
            case Type.VECTOR_CHAR:
                return true
            case Type.VECTOR_BOOLEAN:
                return true
            case Type.VECTOR_STRING:  
                return true
            default:
                return false
        }
    }

    private getTipo(tipo:Type){
        switch(tipo){
            case Type.VECTOR_INTEGER:
                return Type.INTEGER
            case Type.VECTOR_DOBLE :
                return Type.DOBLE 
            case Type.VECTOR_CHAR:
                return Type.CHAR
            case Type.VECTOR_BOOLEAN:
                return Type.BOOLEAN
            case Type.VECTOR_STRING  :
                return Type.STRING  
        }
    }

    public graficar(padre:number){
        let declaracion = Program.getNodo()
        let id = Program.getNodo()
        let parametros = Program.getNodo()

        Program.AST += "Nodo" + declaracion + '[label="llamada funcion"]'+ "\n"
        Program.AST += "Nodo" + padre + " -> Nodo" + declaracion+ "\n"

        Program.AST += "Nodo" + id + '[label="' + this.id +'"]'+ "\n"
        Program.AST += "Nodo" + declaracion + " -> Nodo" + id+ "\n"

        Program.AST += "Nodo" + parametros + '[label="parametros"]'+ "\n"
        Program.AST += "Nodo" + declaracion + " -> Nodo" + parametros + "\n"

        for(const val of this.listaExpresiones){
            val.graficar(parametros)
        }

    }
}