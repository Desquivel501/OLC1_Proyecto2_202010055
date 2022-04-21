import { Expresion } from "../Expresion/Expresion";
import { Ambito } from "../Misc/Ambito";
import { Instruccion } from "./Instruccion";
import { Error_ } from "../Error/Error";
import {Type} from "../Expresion/Retorno";
import { format } from "path";
import { If } from "./If";

export class DeclararVector1 extends Instruccion{
    constructor(private tipo1:Type, private tipo2:Type, private id:string, private values:Expresion[], private length:Expresion, linea, columna){
        super(linea, columna)
    }

    public execute(ambito: Ambito) {
        if(this.tipo1 != this.tipo2){
            throw new Error_(this.linea, this.columna, 'Semantico', 'Los tipos del vector no coinciden');
        }
        const largo = this.length.execute(ambito)
        console.log(largo)

        if(ambito.getVal(this.id) != null ){
            throw new Error_(this.linea, this.columna, 'Semantico', 'El nombre del vector "' + this.id + '" ya esta en uso');
        }

        if(ambito.tipoVector(this.id) != 0){
            throw new Error_(this.linea, this.columna, 'Semantico', 'El vector "' + this.id + '" ya ha sido declarado');
        }

        if(largo.value == -999){
            if(this.values.length > 0){
                console.log(this.tipo1)
                ambito.crearVector1(this.id, this.tipo1, this.values.length, this.linea, this.columna)

                let i = 0;
                for (const value of this.values) {
                    const val = value.execute(ambito);
                    ambito.setVector1(this.id,val.value,val.type,i,this.linea,this.columna);
                    i++;
                } 
                // ambito.setLergoVector1(this.id,i)
                
            }
        }else if(largo.value  > 0){
            ambito.crearVector1(this.id, this.tipo1, largo.value , this.linea, this.columna)
        }else{
            throw new Error_(this.linea, this.columna, 'Semantico', 'Largo del vector invalido');
        }
    }
}

export class DeclararVector2 extends Instruccion{
    constructor(private tipo1:Type, private tipo2:Type, private id:string, private values:Expresion[][], private length1:Expresion, private length2:Expresion, linea, columna){
        super(linea, columna)
    }

    public execute(ambito: Ambito) {

        if(this.tipo1 != this.tipo2){
            throw new Error_(this.linea, this.columna, 'Semantico', 'Los tipos del vector no coinciden');
        }

        if(ambito.getVal(this.id) != null ){
            throw new Error_(this.linea, this.columna, 'Semantico', 'El nombre del vector "' + this.id + '" ya esta en uso');
        }

        if(ambito.tipoVector(this.id) != 0){
            throw new Error_(this.linea, this.columna, 'Semantico', 'El vector "' + this.id + '" ya ha sido declarado');
        }

        const largo1 = this.length1.execute(ambito)
        const largo2 = this.length2.execute(ambito)

        if(largo1.value == -999){

            for(const val of this.values){
                if(val.length != this.values[0].length){
                    throw new Error_(this.linea, this.columna, 'Semantico', 'Largo del vector incorrecto');
                }
            }

            if(this.values.length > 0 && this.values[0].length > 0){
                console.log(this.tipo1)
                ambito.crearVector2(this.id,this.tipo1,this.values.length,this.values[0].length,this.linea,this.columna);

                let i = 0;
                let j = 0;
                for (const val_i of this.values) {

                    const array = []
                    for(const val_j of val_i){
                        const val = val_j.execute(ambito);
                        if(val.type != this.tipo1){
                            throw new Error_(this.linea, this.columna, 'Semantico', 'No se puede asignar ' + Type[val.type] + ' a ' + Type[this.tipo1]);
                        }
                        array.push(val.value)
                        j++;
                    }
                    ambito.pushVector(this.id,array,this.tipo1);
                    j = 0;
                    i++;
                } 
                // ambito.setLergoVector1(this.id,i)
                
            }
        }else if(largo1.value  > 0 && largo2.value > 0){
            ambito.crearVector2(this.id, this.tipo1, largo1.value, largo2.value, this.linea, this.columna);
        }else{
            throw new Error_(this.linea, this.columna, 'Semantico', 'Largo del vector invalido');
        }
    }
}