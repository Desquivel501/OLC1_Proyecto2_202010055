import { Ambito } from "../Misc/Ambito";
import { Instruccion } from "./Instruccion";
import { Program } from "../Misc/Program";
import { Type } from "../Expresion/Retorno";
export class Statement extends Instruccion{
    public nombre:string = null;
    constructor(private codigo:Instruccion[], linea, columna){
        super(linea, columna)
    }

    public execute(ambito: Ambito) {
        const newAmbito = new Ambito(ambito,this.nombre);
        for(const inst of this.codigo){
            try{
                const element = inst.execute(newAmbito);
                if(element != null || element != undefined){
                    if(!(element.type == Type.VOID)){
                        return element;
                    }
                } 
            }catch(error){
                console.log(error)
            }
        }
    }

    public graficar(padre:number){
        let declaracion = Program.getNodo()

        Program.AST += "Nodo" + declaracion + '[label="cuerpo"]'+ "\n"
        Program.AST += "Nodo" + padre + " -> Nodo" + declaracion+ "\n"

        for(const inst of this.codigo){
            inst.graficar(declaracion)
        }

    }
}