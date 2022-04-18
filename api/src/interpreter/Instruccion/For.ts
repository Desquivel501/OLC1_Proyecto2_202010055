import { Ambito } from "../Misc/Ambito";
import { Instruccion } from "./Instruccion";
import { Case } from "./Case";
import { Error_ } from "../Error/Error";
import { Type } from "../Expresion/Retorno";

export class For extends Instruccion{
    constructor(private variable, private condicion, private actualizacion, private cuerpo: Instruccion , linea, columna){
        super(linea, columna)
    }

    public execute(ambito: Ambito) {
        const newAmbito = new Ambito(ambito);

        this.variable.execute(newAmbito);
        let variableID = this.variable.ids[0]
        let condicion = this.condicion.execute(newAmbito);

        if(condicion.type != Type.BOOLEAN){
            throw new Error_(this.linea, this.columna, "Semantico", "La condicion de un While debe ser de tipo BOOLEAN");
        }

        if(this.cuerpo != null){
            while(condicion.value){
                const res = this.cuerpo.execute(newAmbito);
                if (res != null && res != undefined) {
                    if (res.type == 'Break') {
                        break
                    }else if(res.type == "Continue"){
                        continue
                    }
                }

                const nuevoVal = this.actualizacion.execute(newAmbito)

                newAmbito.setVal(variableID, nuevoVal.value, nuevoVal.type, this.linea, this.columna)

                condicion = this.condicion.execute(newAmbito);
            }
        }

    }
}