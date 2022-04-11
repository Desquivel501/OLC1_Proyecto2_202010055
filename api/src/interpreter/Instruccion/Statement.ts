import { Ambito } from "../Misc/Ambito";
import { Instruccion } from "./Instruccion";

export class Statement extends Instruccion{
    constructor(private codigo:Instruccion[], linea, columna){
        super(linea, columna)
    }

    public execute(ambito: Ambito) {
        const newAmbito = new Ambito(ambito);
        for(const inst of this.codigo){
            try{
                const element = inst.execute(newAmbito);
                if(element != null || element != undefined) return element;
            }catch(error){
                console.log(error)
            }
        }
    }
}