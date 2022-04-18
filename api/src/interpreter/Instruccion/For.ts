import { Ambito } from "../Misc/Ambito";
import { Instruccion } from "./Instruccion";
import { Case } from "./Case";
import { Error_ } from "../Error/Error";
import { Type } from "../Expresion/Retorno";

export class While extends Instruccion{
    constructor(private condicion, private cuerpo: Instruccion , linea, columna){
        super(linea, columna)
    }

    public execute(ambito: Ambito) {

        var condicion = this.condicion.execute(ambito);

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
                    }
                }
                condicion = this.condicion.execute(ambito);
            }
        }
    }   
}