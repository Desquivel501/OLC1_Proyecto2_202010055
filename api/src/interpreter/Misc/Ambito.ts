import { Error_ } from "../Error/Error";
import { Type } from "../Expresion/Retorno";
import { Simbolo } from "./Simbolo";
import { Vector1, Vector2 } from "./Vector";
import { Funcion } from "../Instruccion/Funcion";
import { Program } from "./Program";
import { SimboloTabla } from "./SimboloTabla";

export class Ambito{
    public variables:Map<string, Simbolo>;
    public funciones:Map<string, Funcion>;
    public vectores1:Map<string, Vector1>;
    public vectores2:Map<string, Vector2>;

    constructor(public anterior: Ambito |null, public nombre:String){
        this.variables = new Map()
        this.funciones = new Map()
        this.vectores1 = new Map()
        this.vectores2 = new Map()
    }

    public setVal(id:string, value:any, type:Type, linea: number, columna: number){
        let env: Ambito | null = this;

        while(env != null){
            if(env.variables.has(id)){
                const val = env.variables.get(id)
                if(val.type == type){
                    env.variables.set(id, new Simbolo(value,id,type))
                }else if (val.type == Type.DOBLE && type == Type.INTEGER){
                    env.variables.set(id, new Simbolo(value,id,type))
                }else{
                    throw new Error_(linea, columna, 'Semantico', 'No se puede asignar: ' + Type[type] + ' a ' + Type[val.type]);
                }
            }
            env = env.anterior
        }
        this.variables.set(id, new Simbolo(value,id,type))
        Program.agregarTabla(new SimboloTabla(id,"Variable",Type[type],this.nombre,linea,columna))
    }

    public getVal(id:string):Simbolo{
        let env: Ambito | null = this
        while(env!=null){
            if(env.variables.has(id)){
                return env.variables.get(id)
            }
            env = env.anterior
        }
        return null
    }

    public guardarFuncion(id: string, funcion: Funcion){
        this.funciones.set(id,funcion);

        if(funcion.tipo == Type.VOID){
            Program.agregarTabla(new SimboloTabla(id,"Metodo","VOID",this.nombre,funcion.linea,funcion.columna))
        }else{
            Program.agregarTabla(new SimboloTabla(id,"Funcion",Type[funcion.tipo],this.nombre,funcion.linea,funcion.columna))
        }
        
    }

    public getFuncion(id: string): Funcion | undefined {

        let env: Ambito | null = this;

        while(env != null){
            if(env.funciones.has(id)){
                return env.funciones.get(id);
            }
            env = env.anterior;
        }
        return undefined;
    }

    public getGlobal(): Ambito{
        let env: Ambito | null = this;
        while (env?.anterior != null) {
            env = env.anterior;
        }
        return env;
    }


    public crearVector1(id:string, type:Type, largo:number, linea: number, columna: number){
        Program.agregarTabla(new SimboloTabla(id,"Vector",Type[type],this.nombre,linea,columna))
        this.vectores1.set(id, new Vector1(new Array(largo),id,largo,type))
    }

    public setVector1(id:string, value:any, type:Type, index:number, linea: number, columna: number){
        let env: Ambito | null = this;

        while(env != null){
            if(env.vectores1.has(id)){
                const vector = env.vectores1.get(id)
                if(vector.type == type){
                    if(vector.largo > index){
                        vector.valor[index] = value;
                        env.vectores1.set(id, new Vector1(vector.valor,id,vector.largo,type))
                        return
                    }else{
                        throw new Error_(linea, columna, 'Semantico', "Indice fuera del rango");
                    }
                    
                }else{
                    console.log("here")
                    throw new Error_(linea, columna, 'Semantico', 'No se puede asignar ' + Type[type] + ' a ' + Type[vector.type]);
                }
            }
            env = env.anterior
        }
        throw new Error_(linea, columna, 'Semantico', 'El vector "' + id + '" no ha sido declarado');
    }

    public setLergoVector1(id:string,largo:number){
        let env: Ambito | null = this;

        while(env != null){
            if(env.vectores1.has(id)){
                const vector = env.vectores1.get(id)
                env.vectores1.set(id, new Vector1(vector.valor,id,largo,vector.type))
            }
            env = env.anterior
        }
        return null
    }

    public getVector1(id:string):Vector1{
        let env: Ambito | null = this;

        while(env != null){
            if(env.vectores1.has(id)){
                return env.vectores1.get(id);
            }
            env = env.anterior
        }
        return null
    }


    public crearVector2(id:string, type:Type, largo_i:number, largo_j:number, linea: number, columna: number , vacio:boolean){
        if(vacio){
            this.vectores2.set(id, new Vector2([], id, largo_i, largo_j, type))
            Program.agregarTabla(new SimboloTabla(id,"Vector",Type[type],this.nombre,linea,columna))
        }else{
            let array = [];

            for(let i = 0; i < largo_i; i++){
                let array2 = new Array(largo_j);
                array.push(array2)
                console.log()
            }

            console.log("array: " + array)

            this.vectores2.set(id, new Vector2(array, id, largo_i, largo_j, type))
            Program.agregarTabla(new SimboloTabla(id,"Vector",Type[type],this.nombre,linea,columna))
        }
    }

    public setVector2(id:string, value:any, type:Type, index_i:number, index_j:number, linea: number, columna: number){
        let env: Ambito | null = this;

        while(env != null){
            if(env.vectores2.has(id)){
                const vector = env.vectores2.get(id)
                console.log(vector)
                if(vector.type == type){
                    if(vector.largo_i > index_i && vector.largo_j > index_j  ){
                        vector.valor[index_i][index_j] = value;
                        env.vectores2.set(id, new Vector2(vector.valor, id, vector.largo_i, vector.largo_j, type))
                        return
                    }else{
                        throw new Error_(linea, columna, 'Semantico', "Indice fuera del rango");
                    }
                    
                }else{
                    console.log("here")
                    throw new Error_(linea, columna, 'Semantico', 'No se puede asignar ' + Type[type] + ' a ' + Type[vector.type]);
                }
            }
            env = env.anterior
        }
        throw new Error_(linea, columna, 'Semantico', 'El vector "' + id + '" no ha sido declarado');
    }

    public pushVector(id:string, value:any, type:Type){
        let env: Ambito | null = this;

        while(env != null){
            if(env.vectores2.has(id)){
                const vector = env.vectores2.get(id)
                vector.valor.push(value)
                env.vectores2.set(id, new Vector2(vector.valor, id, vector.largo_i, vector.largo_j, type))
            }
            env = env.anterior
        }
    }

    public setLergoVector2(id:string,largo_i:number,largo_j:number){
        let env: Ambito | null = this;

        while(env != null){
            if(env.vectores2.has(id)){
                const vector = env.vectores2.get(id)
                env.vectores2.set(id, new Vector2(vector.valor, id, vector.largo_i, vector.largo_j, vector.type))
            }
            env = env.anterior
        }
        return null
    }

    public getVector2(id:string):Vector2{
        let env: Ambito | null = this;

        while(env != null){
            if(env.vectores2.has(id)){
                return env.vectores2.get(id);
            }
            env = env.anterior
        }
        return null
    }
    
    public getVector2_2(id:string, index:number):Vector2{
        let env: Ambito | null = this;

        while(env != null){
            if(env.vectores2.has(id)){
                return env.vectores2.get(id);
            }
            env = env.anterior
        }
        return null
    }

    public tipoVector(id:string):Number{
        let res1 = this.getVector1(id)
        if(res1 != null) return 1
        let res2 = this.getVector2(id)
        if(res2 != null) return 2
        return 0
    }







}