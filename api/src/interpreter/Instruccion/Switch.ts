import { Ambito } from "../Misc/Ambito";
import { Instruccion } from "./Instruccion";
import { Case } from "./Case";
import { Error_ } from "../Error/Error";
import { Type } from "../Expresion/Retorno";

export class Switch extends Instruccion{
    constructor(private condicion, private Case: Case[], private Default: Instruccion, linea, columna){
        super(linea, columna)
    }

    public execute(ambito: Ambito) {
        const valor = this.condicion.execute(ambito);
        if(this.Case != null){
            for(const cas of this.Case){
                const val_case = cas.condicion.execute(ambito)
                if(val_case.value == valor.value){
                    cas.cuerpo.execute(ambito);
                }
            }
        }
        if(this.Default != null){
            this.Default.execute(ambito);
        }
    }   
}