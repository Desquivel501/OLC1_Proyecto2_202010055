import { Ambito } from "../Misc/Ambito";
import { Instruccion } from "./Instruccion";
import { Error_ } from "../Error/Error";
import { Type } from "../Expresion/Retorno";

export class If extends Instruccion{
    constructor(private condicion, private cuerpo: Instruccion, private Else: Instruccion, linea, columna){
        super(linea, columna)
    }

    public execute(ambito: Ambito) {
        const valor = this.condicion.execute(ambito);

        if(valor.type != Type.BOOLEAN){
            throw new Error_(this.linea, this.columna, "Semantico", "La condicion de un If debe ser de tipo BOOLEAN");
        }
        if(valor.value){
            return this.cuerpo.execute(ambito)
        }else if(this.Else != null){
            return this.Else.execute(ambito)
        }
    }
}